'use client';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Flashcard } from '@/types/flashcard';
import { AccentPreference } from '@/types/phonemic';
import {
  COMMUTE_AUDIO_BASE_PATH,
  COMMUTE_AUDIO_MANIFEST_URL,
  COMMUTE_MODE_META,
  CommuteAudioField,
  CommuteAudioManifest,
  CommuteConfig,
  CommuteEpisode,
} from '@/types/commute';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { buildCommuteScript } from '@/utils/commuteScriptBuilder';
import { resolveCommuteVoiceProfile } from '@/utils/commuteVoices';
import { stitchEpisodeMp3 } from '@/utils/mp3Stitcher';

const CONCURRENCY_LIMIT = 4;

interface GenerationProgress {
  completed: number;
  total: number;
}

interface ClipFetchTask {
  staticUrl: string | null;
  voice: string;
  rate: string;
  pitch: string;
  text: string;
}

export function useCommuteEpisodeGenerator() {
  const [episode, setEpisode] = useState<CommuteEpisode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({
    completed: 0,
    total: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [manifest, setManifest] = useState<CommuteAudioManifest | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const clipCacheRef = useRef<Map<string, Uint8Array>>(new Map());
  const activeBlobUrlRef = useRef<string | null>(null);

  // Load pre-generated static Neural audio manifest once
  useEffect(() => {
    let active = true;
    fetch(COMMUTE_AUDIO_MANIFEST_URL)
      .then((res) => (res.ok ? (res.json() as Promise<CommuteAudioManifest>) : null))
      .then((data) => {
        if (active && data?.cards) {
          setManifest(data);
        }
      })
      .catch(() => {
        // Manifest optional when no static clips have been generated yet
      });
    return () => {
      active = false;
    };
  }, []);

  const pregeneratedCardIds = useMemo(
    () => new Set<string>(manifest ? Object.keys(manifest.cards) : []),
    [manifest]
  );

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

  const hasStaticClip = useCallback(
    (cardId: string, field: CommuteAudioField): boolean => {
      const fields = manifest?.cards?.[cardId];
      return Array.isArray(fields) && fields.includes(field);
    },
    [manifest]
  );

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

        // Deduplicate clip fetches; prefer pre-generated static Neural MP3 by cardId/field
        const uniqueTasks = new Map<string, ClipFetchTask>();
        for (const seg of segments) {
          const profile = resolveCommuteVoiceProfile(seg.lang, accent, seg.field);
          const staticAvailable = hasStaticClip(seg.cardId, seg.field);
          const cacheKey = staticAvailable
            ? `static::${seg.cardId}/${seg.field}`
            : `tts::${profile.voice}::${profile.rate}::${seg.text}`;

          if (!uniqueTasks.has(cacheKey) && !clipCacheRef.current.has(cacheKey)) {
            uniqueTasks.set(cacheKey, {
              staticUrl: staticAvailable
                ? `${COMMUTE_AUDIO_BASE_PATH}/${seg.cardId}/${seg.field}.mp3`
                : null,
              voice: profile.voice,
              rate: profile.rate,
              pitch: profile.pitch,
              text: seg.text,
            });
          }
        }

        const queue = Array.from(uniqueTasks.entries());
        const total = queue.length;
        let completed = 0;
        setProgress({ completed: 0, total: Math.max(total, 1) });

        let cursor = 0;
        const worker = async () => {
          while (cursor < queue.length) {
            if (controller.signal.aborted) return;
            const currentIdx = cursor++;
            const [cacheKey, task] = queue[currentIdx];

            let bytes: Uint8Array | null = null;

            // 1. Try static pre-generated Neural MP3 first (instant from CDN, zero 403)
            if (task.staticUrl) {
              const staticRes = await fetch(task.staticUrl, {
                signal: controller.signal,
              });
              if (staticRes.ok) {
                bytes = new Uint8Array(await staticRes.arrayBuffer());
              }
            }

            // 2. Fallback to dynamic /api/commute/tts for cards not yet pre-generated
            if (!bytes) {
              const response = await fetch(API_ENDPOINTS.COMMUTE_TTS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  voice: task.voice,
                  rate: task.rate,
                  pitch: task.pitch,
                  text: task.text,
                }),
                signal: controller.signal,
              });

              if (!response.ok) {
                throw new Error(`TTS gagal (${response.status}). Coba lagi.`);
              }
              bytes = new Uint8Array(await response.arrayBuffer());
            }

            clipCacheRef.current.set(cacheKey, bytes);
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
          const profile = resolveCommuteVoiceProfile(seg.lang, accent, seg.field);
          const staticKey = `static::${seg.cardId}/${seg.field}`;
          return (
            clipCacheRef.current.get(staticKey) ??
            clipCacheRef.current.get(`tts::${profile.voice}::${profile.rate}::${seg.text}`)
          );
        });

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
    [hasStaticClip]
  );

  return {
    episode,
    isGenerating,
    progress,
    error,
    pregeneratedCardIds,
    pregeneratedCount: pregeneratedCardIds.size,
    generateEpisode,
    cancelGeneration,
  };
}
