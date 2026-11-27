'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Flashcard } from '@/types/flashcard';
import {
  COMMUTE_SOFT_SYNC_STATUS,
  CommuteEpisode,
  CommuteSoftSyncStatus,
  CommuteSoftSyncSummary,
} from '@/types/commute';
import { calculateAudioExposureCredit } from '@/utils/ankiAlgorithm';

interface UseCommuteSoftSyncParams {
  episode: CommuteEpisode | null;
  currentTime: number;
  isPlaying: boolean;
  enabled: boolean;
  flashcards: Flashcard[];
  updateFlashcard: (id: string, patch: Partial<Flashcard>) => Promise<void>;
}

const CHAPTER_COMPLETION_TOLERANCE_SEC = 0.5;

export function useCommuteSoftSync({
  episode,
  currentTime,
  isPlaying,
  enabled,
  flashcards,
  updateFlashcard,
}: UseCommuteSoftSyncParams): CommuteSoftSyncSummary {
  const [listenedCardIds, setListenedCardIds] = useState<string[]>([]);
  const [syncedCardIds, setSyncedCardIds] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncingRef = useRef(false);
  const prevPlayingRef = useRef(false);
  const listenedSetRef = useRef<Set<string>>(new Set());
  const syncedSetRef = useRef<Set<string>>(new Set());

  // Reset tracking state when a new episode is loaded
  useEffect(() => {
    listenedSetRef.current = new Set();
    syncedSetRef.current = new Set();
    setListenedCardIds([]);
    setSyncedCardIds([]);
    setIsSyncing(false);
    prevPlayingRef.current = false;
  }, [episode?.id]);

  // Track chapters that have been finished listening (currentTime >= chapter.endTimeSec - 0.5)
  useEffect(() => {
    if (!episode || !enabled || currentTime <= 0) return;

    let added = false;
    for (const chapter of episode.chapters) {
      if (
        currentTime >= chapter.endTimeSec - CHAPTER_COMPLETION_TOLERANCE_SEC &&
        !listenedSetRef.current.has(chapter.cardId)
      ) {
        listenedSetRef.current.add(chapter.cardId);
        added = true;
      }
    }

    if (added) {
      setListenedCardIds(Array.from(listenedSetRef.current));
    }
  }, [episode, enabled, currentTime]);

  const cardById = useMemo(() => {
    const map = new Map<string, Flashcard>();
    for (const card of flashcards) {
      if (card._id) map.set(card._id, card);
      map.set(card.question, card);
    }
    return map;
  }, [flashcards]);

  const syncPendingCards = useCallback(async () => {
    if (!episode || !enabled || syncingRef.current) return;

    const pendingIds = Array.from(listenedSetRef.current).filter(
      (id) => !syncedSetRef.current.has(id)
    );
    if (pendingIds.length === 0) return;

    syncingRef.current = true;
    setIsSyncing(true);
    const now = new Date();

    try {
      for (const cardId of pendingIds) {
        const card = cardById.get(cardId);
        if (!card?._id) {
          syncedSetRef.current.add(cardId);
          continue;
        }

        const result = calculateAudioExposureCredit(card, episode.mode, now);
        if (!result.skipped) {
          await updateFlashcard(card._id, {
            progression: result.progression,
            repetitions: result.repetitions,
            interval: result.interval,
            easeFactor: result.easeFactor,
            lapses: result.lapses,
            lastReviewedDate: result.lastReviewedDate,
            nextReviewDate: result.nextReviewDate,
          });
        }
        syncedSetRef.current.add(cardId);
      }
      setSyncedCardIds(Array.from(syncedSetRef.current));
    } finally {
      syncingRef.current = false;
      setIsSyncing(false);
    }
  }, [episode, enabled, cardById, updateFlashcard]);

  // Auto-sync batch when playback pauses or episode finishes (true -> false transition)
  useEffect(() => {
    if (prevPlayingRef.current && !isPlaying && enabled) {
      void syncPendingCards();
    }
    prevPlayingRef.current = isPlaying;
  }, [isPlaying, enabled, syncPendingCards]);

  const pendingCount = Math.max(0, listenedCardIds.length - syncedCardIds.length);
  const totalCards = episode?.cardCount ?? 0;

  let status: CommuteSoftSyncStatus = COMMUTE_SOFT_SYNC_STATUS.IDLE;
  if (!enabled) {
    status = COMMUTE_SOFT_SYNC_STATUS.OFF;
  } else if (isSyncing) {
    status = COMMUTE_SOFT_SYNC_STATUS.SYNCING;
  } else if (syncedCardIds.length > 0 && pendingCount === 0) {
    status = COMMUTE_SOFT_SYNC_STATUS.SYNCED;
  }

  return {
    enabled,
    listenedCount: listenedCardIds.length,
    syncedCount: syncedCardIds.length,
    pendingCount,
    totalCards,
    status,
    onSyncNow: () => {
      void syncPendingCards();
    },
  };
}
