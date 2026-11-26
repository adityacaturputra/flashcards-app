'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Flashcard } from '@/types/flashcard';
import { AccentPreference } from '@/types/phonemic';
import {
  CommuteConfig,
  CommuteEpisode,
  COMMUTE_MODE_META,
} from '@/types/commute';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { buildCommuteScript } from '@/utils/commuteScriptBuilder';
import { resolveCommuteVoice } from '@/utils/commuteVoices';
import { stitchEpisodeMp3 } from '@/utils/mp3Stitcher';

const CONCURRENCY_LIMIT = 4;

interface GenerationProgress {
  completed: number;
  total: number;
}

export function useCommuteEpisodeGenerator() {
  const [episode, setEpisode] = useState<CommuteEpisode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({
    completed: 0,
    total: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const clipCacheRef = useRef<Map<string, Uint8Array>>(new Map());
  const activeBlobUrlRef = useRef<string | null>(null);

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      if (activeBlobUrlRef.current) {
        URL.revokeObjectURL(activeBlobUrlRef.current);
      }
    };
  }, []);

  const cancelGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsGenerating(false);
  }, []);

  const generateEpisode = useCallback(
    async (
      cards: Flashcard[],
      config: CommuteConfig,
      accent: AccentPreference,
      customTitle?: string
    ): Promise<CommuteEpisode | null> => {
      if (cards.length === 0) {
        setError('Tidak ada kartu yang cocok dengan filter ini.');
        return null;
      }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsGenerating(true);
      setError(null);

      try {
        const segments = buildCommuteScript(cards, config);
        if (segments.length === 0) {
          throw new Error('Gagal menyusun naskah audio dari kartu terpilih.');
        }

        // Deduplicate (voice, text) pairs so repeated Pimsleur words are fetched only once
        const uniqueTasks = new Map<string, { voice: string; text: string }>();
        for (const seg of segments) {
          const voice = resolveCommuteVoice(seg.lang, accent);
          const key = `${voice}::${seg.text}`;
          if (!uniqueTasks.has(key) && !clipCacheRef.current.has(key)) {
            uniqueTasks.set(key, { voice, text: seg.text });
          }
        }

        const queue = Array.from(uniqueTasks.entries());
        const total = queue.length;
        let completed = 0;
        setProgress({ completed: 0, total: Math.max(total, 1) });

        // Concurrency pool worker
        let cursor = 0;
        const worker = async () => {
          while (cursor < queue.length) {
            if (controller.signal.aborted) return;
            const currentIdx = cursor++;
            const [cacheKey, payload] = queue[currentIdx];

            const response = await fetch(API_ENDPOINTS.COMMUTE_TTS, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
              signal: controller.signal,
            });

            if (!response.ok) {
              throw new Error(`TTS gagal (${response.status}). Coba lagi.`);
            }

            const arrayBuffer = await response.arrayBuffer();
            clipCacheRef.current.set(cacheKey, new Uint8Array(arrayBuffer));
            completed += 1;
            setProgress({ completed, total: Math.max(total, 1) });
          }
        };

        if (queue.length > 0) {
          const workers = Array.from(
            { length: Math.min(CONCURRENCY_LIMIT, queue.length) },
            () => worker()
          );
          await Promise.all(workers);
        }

        if (controller.signal.aborted) {
          return null;
        }

        const stitched = stitchEpisodeMp3(segments, (seg) => {
          const voice = resolveCommuteVoice(seg.lang, accent);
          return clipCacheRef.current.get(`${voice}::${seg.text}`);
        });

        // Revoke previous Blob URL to prevent memory leak
        if (activeBlobUrlRef.current) {
          URL.revokeObjectURL(activeBlobUrlRef.current);
        }
        activeBlobUrlRef.current = stitched.blobUrl;

        const nowIso = new Date().toISOString();
        const modeTitle = COMMUTE_MODE_META[config.mode].title;
        const newEpisode: CommuteEpisode = {
          id: `commute-${Date.now()}`,
          title: customTitle || `${modeTitle} (${cards.length} kartu)`,
          mode: config.mode,
          blob: stitched.blob,
          blobUrl: stitched.blobUrl,
          totalDurationSec: stitched.totalDurationSec,
          chapters: stitched.chapters,
          cardIds: cards.map((c) => c._id ?? c.question),
          cardCount: cards.length,
          createdAt: nowIso,
        };

        setEpisode(newEpisode);
        return newEpisode;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          return null;
        }
        const message =
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan saat membuat episode audio.';
        setError(message);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    episode,
    isGenerating,
    progress,
    error,
    generateEpisode,
    cancelGeneration,
  };
}
