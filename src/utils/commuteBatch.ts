/**
 * Pure Batch Window & Estimation Helpers for Commute Audio Sessions
 */
import { COMMUTE_CARD_LIMITS } from '@/constants/commute';

export interface CommuteBatchWindow {
  safeStartIndex: number;
  startOffset: number;
  endIndex: number;
  availableFromStart: number;
  effectiveCount: number;
}

/**
 * Resolve a safe 1-based batch window (startIndex..endIndex) within totalCount.
 */
export function resolveCommuteBatchWindow(
  totalCount: number,
  startIndex: number,
  cardCount: number
): CommuteBatchWindow {
  if (totalCount <= 0) {
    return {
      safeStartIndex: COMMUTE_CARD_LIMITS.MIN_START_INDEX,
      startOffset: 0,
      endIndex: 0,
      availableFromStart: 0,
      effectiveCount: 0,
    };
  }

  const safeStartIndex = Math.min(
    Math.max(COMMUTE_CARD_LIMITS.MIN_START_INDEX, Math.floor(startIndex || 1)),
    totalCount
  );
  const startOffset = safeStartIndex - 1;
  const availableFromStart = totalCount - startOffset;
  const clampedCount = Math.max(
    COMMUTE_CARD_LIMITS.MIN_COUNT,
    Math.floor(cardCount || COMMUTE_CARD_LIMITS.MIN_COUNT)
  );
  const effectiveCount = Math.min(clampedCount, availableFromStart);
  const endIndex = safeStartIndex + effectiveCount - 1;

  return {
    safeStartIndex,
    startOffset,
    endIndex,
    availableFromStart,
    effectiveCount,
  };
}

/**
 * Estimate stitched MP3 file size in MB based on 48kbps mono bitrate.
 */
export function estimateCommuteMp3SizeMb(estimatedMinutes: number): string {
  const mb = Math.max(
    0.4,
    estimatedMinutes * COMMUTE_CARD_LIMITS.ESTIMATED_MB_PER_MINUTE
  );
  return mb >= 10 ? mb.toFixed(0) : mb.toFixed(1);
}

/**
 * Parse a positive integer from a numeric text input; returns null when empty/invalid.
 */
export function parsePositiveIntInput(raw: string): number | null {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return null;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
