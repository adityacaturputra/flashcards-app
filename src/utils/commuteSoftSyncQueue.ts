import { Flashcard } from '@/types/flashcard';
import {
  COMMUTE_SOFT_SYNC_QUEUE_STORAGE_KEY,
  CommuteMode,
} from '@/constants/commute';
import { BulkFlashcardReviewUpdate } from '@/services/dataProviders/types';
import { calculateAudioExposureCredit } from '@/utils/ankiAlgorithm';

export interface CommutePendingSyncItem {
  cardId: string;
  mode: CommuteMode;
  listenedAt: string;
}

export interface CommuteBulkReviewBatch {
  updates: BulkFlashcardReviewUpdate[];
  updateCardIds: string[];
  skippedCardIds: string[];
  missingCardIds: string[];
}

function isValidPendingSyncItem(value: unknown): value is CommutePendingSyncItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.cardId === 'string' &&
    item.cardId.length > 0 &&
    typeof item.mode === 'string' &&
    typeof item.listenedAt === 'string'
  );
}

/**
 * Loads the persistent commute Anki soft-sync queue from localStorage (SSR-safe).
 */
export function loadCommutePendingSyncQueue(): CommutePendingSyncItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(COMMUTE_SOFT_SYNC_QUEUE_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidPendingSyncItem);
  } catch {
    return [];
  }
}

/**
 * Persists the commute Anki soft-sync queue to localStorage (SSR-safe).
 */
export function saveCommutePendingSyncQueue(
  items: readonly CommutePendingSyncItem[],
): void {
  if (typeof window === 'undefined') return;
  try {
    if (items.length === 0) {
      window.localStorage.removeItem(COMMUTE_SOFT_SYNC_QUEUE_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(
      COMMUTE_SOFT_SYNC_QUEUE_STORAGE_KEY,
      JSON.stringify(items),
    );
  } catch {
    // Ignore storage quota / private-browsing errors
  }
}

/**
 * Enqueues newly finished chapters into the persistent queue, deduplicating by cardId.
 */
export function enqueueCommutePendingSyncItems(
  newItems: readonly CommutePendingSyncItem[],
): CommutePendingSyncItem[] {
  const existing = loadCommutePendingSyncQueue();
  if (newItems.length === 0) return existing;

  const existingIds = new Set(existing.map((item) => item.cardId));
  let mutated = false;
  const merged = [...existing];

  for (const item of newItems) {
    if (!existingIds.has(item.cardId)) {
      existingIds.add(item.cardId);
      merged.push(item);
      mutated = true;
    }
  }

  if (mutated) {
    saveCommutePendingSyncQueue(merged);
  }
  return merged;
}

/**
 * Removes confirmed-synced or skipped cardIds from the persistent queue.
 */
export function removeCommutePendingSyncIds(
  cardIds: readonly string[],
): CommutePendingSyncItem[] {
  const existing = loadCommutePendingSyncQueue();
  if (cardIds.length === 0 || existing.length === 0) return existing;

  const removeSet = new Set(cardIds);
  const remaining = existing.filter((item) => !removeSet.has(item.cardId));

  if (remaining.length !== existing.length) {
    saveCommutePendingSyncQueue(remaining);
  }
  return remaining;
}

/**
 * Computes Anki partial-credit patches for all queued items using current flashcard state.
 */
export function buildCommuteBulkReviewBatch(
  queue: readonly CommutePendingSyncItem[],
  cardById: ReadonlyMap<string, Flashcard>,
): CommuteBulkReviewBatch {
  const updates: BulkFlashcardReviewUpdate[] = [];
  const updateCardIds: string[] = [];
  const skippedCardIds: string[] = [];
  const missingCardIds: string[] = [];

  for (const item of queue) {
    const card = cardById.get(item.cardId);
    if (!card?._id) {
      missingCardIds.push(item.cardId);
      continue;
    }

    const parsedDate = new Date(item.listenedAt);
    const referenceDate = Number.isNaN(parsedDate.getTime())
      ? new Date()
      : parsedDate;
    const result = calculateAudioExposureCredit(card, item.mode, referenceDate);

    if (result.skipped) {
      skippedCardIds.push(item.cardId);
      continue;
    }

    updates.push({
      id: card._id,
      patch: {
        progression: result.progression,
        repetitions: result.repetitions,
        interval: result.interval,
        easeFactor: result.easeFactor,
        lapses: result.lapses,
        lastReviewedDate: result.lastReviewedDate,
        nextReviewDate: result.nextReviewDate,
      },
    });
    updateCardIds.push(item.cardId);
  }

  return { updates, updateCardIds, skippedCardIds, missingCardIds };
}

/**
 * Splits an array into fixed-size chunks (used to stay under fetch keepalive 64KB limit).
 */
export function chunkItems<T>(items: readonly T[], chunkSize: number): T[][] {
  if (items.length === 0 || chunkSize <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}
