'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Flashcard } from '@/types/flashcard';
import { DataSource } from '@/types/dataSource';
import { API_ENDPOINTS } from '@/constants/endpoints';
import {
  COMMUTE_SOFT_SYNC_CONFIG,
  COMMUTE_SOFT_SYNC_STATUS,
  CommuteEpisode,
  CommuteSoftSyncStatus,
  CommuteSoftSyncSummary,
} from '@/types/commute';
import { BulkFlashcardReviewUpdate } from '@/services/dataProviders/types';
import {
  buildCommuteBulkReviewBatch,
  chunkItems,
  CommutePendingSyncItem,
  enqueueCommutePendingSyncItems,
  loadCommutePendingSyncQueue,
  removeCommutePendingSyncIds,
} from '@/utils/commuteSoftSyncQueue';

interface UseCommuteSoftSyncParams {
  episode: CommuteEpisode | null;
  currentTime: number;
  isPlaying: boolean;
  enabled: boolean;
  flashcards: Flashcard[];
  dataSource: DataSource;
  onFlashcardsSynced?: (updates: BulkFlashcardReviewUpdate[]) => void;
}

export function useCommuteSoftSync({
  episode,
  currentTime,
  isPlaying,
  enabled,
  flashcards,
  dataSource,
  onFlashcardsSynced,
}: UseCommuteSoftSyncParams): CommuteSoftSyncSummary {
  const [listenedCardIds, setListenedCardIds] = useState<string[]>([]);
  const [syncedCardIds, setSyncedCardIds] = useState<string[]>([]);
  const [queuedCount, setQueuedCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncingRef = useRef(false);
  const pendingReflushRef = useRef(false);
  const startupDrainedRef = useRef(false);
  const prevPlayingRef = useRef(false);
  const listenedSetRef = useRef<Set<string>>(new Set());
  const syncedSetRef = useRef<Set<string>>(new Set());

  const cardById = useMemo(() => {
    const map = new Map<string, Flashcard>();
    for (const card of flashcards) {
      if (card._id) map.set(card._id, card);
      map.set(card.question, card);
    }
    return map;
  }, [flashcards]);

  const markEpisodeCardsSynced = useCallback((cardIds: readonly string[]) => {
    let changed = false;
    for (const cardId of cardIds) {
      if (
        listenedSetRef.current.has(cardId) &&
        !syncedSetRef.current.has(cardId)
      ) {
        syncedSetRef.current.add(cardId);
        changed = true;
      }
    }
    if (changed) {
      setSyncedCardIds(Array.from(syncedSetRef.current));
    }
  }, []);

  const flushQueue = useCallback(
    async (options?: { keepalive?: boolean }) => {
      const keepalive = options?.keepalive ?? false;
      if (flashcards.length === 0) return;

      const queue = loadCommutePendingSyncQueue();
      setQueuedCount(queue.length);
      if (queue.length === 0) return;

      if (!keepalive && syncingRef.current) {
        pendingReflushRef.current = true;
        return;
      }

      const { updates, updateCardIds, skippedCardIds, missingCardIds } =
        buildCommuteBulkReviewBatch(queue, cardById);

      const immediatelyResolvedIds = [...skippedCardIds, ...missingCardIds];
      if (immediatelyResolvedIds.length > 0) {
        const remaining = removeCommutePendingSyncIds(immediatelyResolvedIds);
        setQueuedCount(remaining.length);
        markEpisodeCardsSynced(immediatelyResolvedIds);
      }

      if (updates.length === 0) return;

      if (!keepalive) {
        syncingRef.current = true;
        setIsSyncing(true);
      }

      const endpoint = API_ENDPOINTS.FLASHCARDS_BULK_REVIEW(dataSource);
      const paired = updates.map((update, idx) => ({
        update,
        cardId: updateCardIds[idx],
      }));
      const chunks = chunkItems(
        paired,
        COMMUTE_SOFT_SYNC_CONFIG.KEEPALIVE_CHUNK_SIZE,
      );

      try {
        for (const chunk of chunks) {
          const chunkUpdates = chunk.map((entry) => entry.update);
          const chunkCardIds = chunk.map((entry) => entry.cardId);

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ updates: chunkUpdates }),
            keepalive,
          });

          if (!response.ok) {
            throw new Error(`Bulk review sync failed with ${response.status}`);
          }

          const remaining = removeCommutePendingSyncIds(chunkCardIds);
          setQueuedCount(remaining.length);
          markEpisodeCardsSynced(chunkCardIds);
          onFlashcardsSynced?.(chunkUpdates);
        }
      } catch (error) {
        console.error('Commute soft-sync flush error:', error);
      } finally {
        if (!keepalive) {
          syncingRef.current = false;
          setIsSyncing(false);
          if (pendingReflushRef.current) {
            pendingReflushRef.current = false;
            void flushQueue({ keepalive: false });
          }
        }
      }
    },
    [flashcards.length, cardById, dataSource, markEpisodeCardsSynced, onFlashcardsSynced],
  );

  // Startup drain: flush any leftover queue items from a previous session
  useEffect(() => {
    if (startupDrainedRef.current || flashcards.length === 0) return;
    startupDrainedRef.current = true;
    const existing = loadCommutePendingSyncQueue();
    setQueuedCount(existing.length);
    if (existing.length > 0) {
      void flushQueue({ keepalive: false });
    }
  }, [flashcards.length, flushQueue]);

  // Reset per-episode counters when a new episode is loaded
  useEffect(() => {
    listenedSetRef.current = new Set();
    syncedSetRef.current = new Set();
    setListenedCardIds([]);
    setSyncedCardIds([]);
    prevPlayingRef.current = false;
  }, [episode?.id]);

  // Track finished chapters, persist to localStorage queue, and auto-flush every 5 cards
  useEffect(() => {
    if (!episode || !enabled || currentTime <= 0) return;

    const newlyFinished: CommutePendingSyncItem[] = [];
    const nowIso = new Date().toISOString();

    for (const chapter of episode.chapters) {
      if (
        currentTime >=
          chapter.endTimeSec -
            COMMUTE_SOFT_SYNC_CONFIG.CHAPTER_COMPLETION_TOLERANCE_SEC &&
        !listenedSetRef.current.has(chapter.cardId)
      ) {
        listenedSetRef.current.add(chapter.cardId);
        newlyFinished.push({
          cardId: chapter.cardId,
          mode: episode.mode,
          listenedAt: nowIso,
        });
      }
    }

    if (newlyFinished.length > 0) {
      setListenedCardIds(Array.from(listenedSetRef.current));
      const updatedQueue = enqueueCommutePendingSyncItems(newlyFinished);
      setQueuedCount(updatedQueue.length);

      if (
        updatedQueue.length >= COMMUTE_SOFT_SYNC_CONFIG.AUTO_FLUSH_BATCH_SIZE
      ) {
        void flushQueue({ keepalive: false });
      }
    }
  }, [episode, enabled, currentTime, flushQueue]);

  // Flush remaining queue on pause/end (true -> false transition)
  useEffect(() => {
    if (prevPlayingRef.current && !isPlaying && enabled) {
      void flushQueue({ keepalive: true });
    }
    prevPlayingRef.current = isPlaying;
  }, [isPlaying, enabled, flushQueue]);

  // Flush with keepalive when tab goes hidden or page closes (iOS Safari safe)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        void flushQueue({ keepalive: true });
      }
    };
    const handlePageHide = () => {
      void flushQueue({ keepalive: true });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [flushQueue]);

  const episodePendingCount = Math.max(
    0,
    listenedCardIds.length - syncedCardIds.length,
  );
  const pendingCount = Math.max(episodePendingCount, queuedCount);
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
      void flushQueue({ keepalive: false });
    },
  };
}
