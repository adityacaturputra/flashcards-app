'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AUDIOBOOK_COMPLETION_THRESHOLD,
  AUDIOBOOK_LAST_EPISODE_KEY,
  AUDIOBOOK_SAVE_INTERVAL_MS,
  AUDIOBOOK_STORAGE_KEY,
} from '@/constants/audiobooks';
import {
  AudiobookEpisodeProgress,
  AudiobookProgressMap,
} from '@/types/audiobook';

function readProgressFromStorage(): AudiobookProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(AUDIOBOOK_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AudiobookProgressMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeProgressToStorage(map: AudiobookProgressMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(AUDIOBOOK_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage quota or private-mode errors
  }
}

export function readLastEpisodeId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(AUDIOBOOK_LAST_EPISODE_KEY);
  } catch {
    return null;
  }
}

export function writeLastEpisodeId(episodeId: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(AUDIOBOOK_LAST_EPISODE_KEY, episodeId);
  } catch {
    // Ignore storage errors
  }
}

export function useAudiobookProgress() {
  const [progressMap, setProgressMap] = useState<AudiobookProgressMap>({});
  const lastSaveTimeRef = useRef<number>(0);

  useEffect(() => {
    setProgressMap(readProgressFromStorage());
  }, []);

  const saveProgress = useCallback(
    (
      episodeId: string,
      lastPlayTime: number,
      duration: number,
      force = false
    ) => {
      const now = Date.now();
      if (!force && now - lastSaveTimeRef.current < AUDIOBOOK_SAVE_INTERVAL_MS) {
        return;
      }
      lastSaveTimeRef.current = now;

      setProgressMap((prev) => {
        const existing = prev[episodeId];
        const safeDuration =
          Number.isFinite(duration) && duration > 0
            ? duration
            : existing?.duration ?? 0;
        const safeTime = Number.isFinite(lastPlayTime)
          ? Math.max(0, lastPlayTime)
          : 0;
        const reachedEnd =
          safeDuration > 0 &&
          safeTime / safeDuration >= AUDIOBOOK_COMPLETION_THRESHOLD;

        const nextEntry: AudiobookEpisodeProgress = {
          lastPlayTime: reachedEnd ? 0 : safeTime,
          duration: safeDuration,
          completed: Boolean(existing?.completed || reachedEnd),
          updatedAt: now,
        };

        const next = { ...prev, [episodeId]: nextEntry };
        writeProgressToStorage(next);
        return next;
      });
    },
    []
  );

  const toggleCompleted = useCallback((episodeId: string) => {
    setProgressMap((prev) => {
      const existing = prev[episodeId];
      const nextCompleted = !existing?.completed;
      const next: AudiobookProgressMap = {
        ...prev,
        [episodeId]: {
          lastPlayTime: nextCompleted ? 0 : existing?.lastPlayTime ?? 0,
          duration: existing?.duration ?? 0,
          completed: nextCompleted,
          updatedAt: Date.now(),
        },
      };
      writeProgressToStorage(next);
      return next;
    });
  }, []);

  const completedCount = Object.values(progressMap).filter(
    (entry) => entry.completed
  ).length;

  return {
    progressMap,
    completedCount,
    saveProgress,
    toggleCompleted,
  };
}
