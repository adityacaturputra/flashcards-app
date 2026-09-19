/**
 * src/utils/ankiAlgorithm.ts
 * Mathematical implementation of Anki's modified SuperMemo-2 (SM-2) Spaced Repetition Algorithm.
 */

import { Progression } from '@/types/flashcard';

export interface AnkiCardState {
  repetitions?: number; // Count of consecutive successful reviews (0, 1, 2, ...)
  interval?: number; // Current review interval in days
  easeFactor?: number; // Ease Factor multiplier (default: 2.5, floor: 1.3)
  lapses?: number; // Number of times card was forgotten / failed
  lastReviewedDate?: Date | string;
  nextReviewDate?: Date | string;
}

export interface AnkiReviewResult {
  repetitions: number;
  interval: number; // in days (can be 0 for relearn step)
  easeFactor: number;
  lapses: number;
  lastReviewedDate: Date;
  nextReviewDate: Date;
}

export const ANKI_DEFAULT_EASE_FACTOR = 2.5;
export const ANKI_MIN_EASE_FACTOR = 1.3;

/**
 * Calculates the next review date and Anki SRS variables for a card based on user progression rating.
 *
 * Anki SM-2 Formula rules:
 * - Retry (Again, q=1):
 *   - repetitions = 0 (reset)
 *   - lapses = lapses + 1
 *   - easeFactor = max(1.3, easeFactor - 0.20)
 *   - interval = 0 -> review in 1 hour (relearning step)
 * - Hard (q=2):
 *   - repetitions = repetitions + 1
 *   - easeFactor = max(1.3, easeFactor - 0.15)
 *   - interval = previousInterval === 0 ? 1 : max(1, Math.round(previousInterval * 1.2))
 * - Normal (Good Base, q=3):
 *   - repetitions = repetitions + 1
 *   - easeFactor unchanged
 *   - interval: rep 1 -> 1 day, rep 2 -> 6 days, rep > 2 -> round(previousInterval * easeFactor)
 * - Good (Good+, q=3.5):
 *   - repetitions = repetitions + 1
 *   - easeFactor = easeFactor + 0.05
 *   - interval: rep 1 -> 2 days, rep 2 -> 7 days, rep > 2 -> round(previousInterval * easeFactor * 1.15)
 * - Perfect (Easy, q=4):
 *   - repetitions = repetitions + 1
 *   - easeFactor = easeFactor + 0.15
 *   - interval: rep 1 -> 4 days, rep 2 -> 10 days, rep > 2 -> round(previousInterval * easeFactor * 1.3)
 */
export function calculateAnkiReview(
  card: AnkiCardState = {},
  progression: Progression,
  referenceDate: Date = new Date(),
): AnkiReviewResult {
  const currentReps = card.repetitions ?? 0;
  const currentInterval = card.interval ?? 0;
  const currentEase = card.easeFactor ?? ANKI_DEFAULT_EASE_FACTOR;
  const currentLapses = card.lapses ?? 0;

  let newReps = currentReps;
  let newInterval = currentInterval;
  let newEase = currentEase;
  let newLapses = currentLapses;
  const nextReviewDate = new Date(referenceDate);

  switch (progression) {
    case Progression.Retry: {
      newReps = 0;
      newLapses = currentLapses + 1;
      newEase = Math.max(ANKI_MIN_EASE_FACTOR, Number((currentEase - 0.2).toFixed(2)));
      newInterval = 0;
      // Relearning step: 1 hour from now
      nextReviewDate.setTime(referenceDate.getTime() + 1 * 60 * 60 * 1000);
      break;
    }

    case Progression.Hard: {
      newReps = currentReps + 1;
      newEase = Math.max(ANKI_MIN_EASE_FACTOR, Number((currentEase - 0.15).toFixed(2)));
      if (currentInterval === 0) {
        newInterval = 1;
      } else {
        newInterval = Math.max(1, Math.round(currentInterval * 1.2));
      }
      nextReviewDate.setTime(referenceDate.getTime() + newInterval * 24 * 60 * 60 * 1000);
      break;
    }

    case Progression.Normal: {
      newReps = currentReps + 1;
      // Ease remains unchanged in standard Anki Good
      if (newReps === 1) {
        newInterval = 1;
      } else if (newReps === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.max(1, Math.round(currentInterval * currentEase));
      }
      nextReviewDate.setTime(referenceDate.getTime() + newInterval * 24 * 60 * 60 * 1000);
      break;
    }

    case Progression.Good: {
      newReps = currentReps + 1;
      newEase = Number((currentEase + 0.05).toFixed(2));
      if (newReps === 1) {
        newInterval = 2;
      } else if (newReps === 2) {
        newInterval = 7;
      } else {
        newInterval = Math.max(1, Math.round(currentInterval * currentEase * 1.15));
      }
      nextReviewDate.setTime(referenceDate.getTime() + newInterval * 24 * 60 * 60 * 1000);
      break;
    }

    case Progression.Perfect: {
      newReps = currentReps + 1;
      newEase = Number((currentEase + 0.15).toFixed(2));
      if (newReps === 1) {
        newInterval = 4;
      } else if (newReps === 2) {
        newInterval = 10;
      } else {
        newInterval = Math.max(1, Math.round(currentInterval * currentEase * 1.3));
      }
      nextReviewDate.setTime(referenceDate.getTime() + newInterval * 24 * 60 * 60 * 1000);
      break;
    }

    case Progression.New:
    default: {
      newReps = 0;
      newInterval = 1;
      nextReviewDate.setTime(referenceDate.getTime() + 24 * 60 * 60 * 1000);
      break;
    }
  }

  return {
    repetitions: newReps,
    interval: newInterval,
    easeFactor: newEase,
    lapses: newLapses,
    lastReviewedDate: referenceDate,
    nextReviewDate,
  };
}

export default calculateAnkiReview;
