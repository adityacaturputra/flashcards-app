/**
 * src/utils/ankiAlgorithm.ts
 * Mathematical implementation of Anki's modified SuperMemo-2 (SM-2) Spaced Repetition Algorithm.
 */

import { Flashcard, Progression } from '@/types/flashcard';
import {
  AnkiCardState,
  AnkiReviewResult,
  AnkiDailyQueue,
  AnkiForecastDay,
  ReviewedTodayItem,
  ANKI_CONFIG,
} from '@/types/anki';

export * from '@/types/anki';
export const ANKI_DEFAULT_EASE_FACTOR = ANKI_CONFIG.DEFAULT_EASE_FACTOR;
export const ANKI_MIN_EASE_FACTOR = ANKI_CONFIG.MIN_EASE_FACTOR;

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

/**
 * Checks whether a card is currently due for review (overdue, due today, or lapsed).
 */
export function isCardDue(card: Flashcard, referenceDate: Date = new Date()): boolean {
  if (isCardNew(card)) return false;
  if (card.progression === Progression.Retry) return true;
  if (!card.nextReviewDate) return true;

  const reviewDate = new Date(card.nextReviewDate);
  const endOfToday = new Date(referenceDate);
  endOfToday.setHours(23, 59, 59, 999);

  return reviewDate <= endOfToday;
}

/**
 * Checks whether a card is brand new / unlearned.
 */
export function isCardNew(card: Flashcard): boolean {
  if (card.progression === Progression.New) return true;
  if (!card.progression && (card.repetitions ?? 0) === 0 && !card.lastReviewedDate) return true;
  return false;
}

/**
 * Checks whether a card was already reviewed today (calendar day match).
 */
export function isCardReviewedToday(card: Flashcard, referenceDate: Date = new Date()): boolean {
  if (!card.lastReviewedDate) return false;
  const reviewed = new Date(card.lastReviewedDate);
  return (
    reviewed.getFullYear() === referenceDate.getFullYear() &&
    reviewed.getMonth() === referenceDate.getMonth() &&
    reviewed.getDate() === referenceDate.getDate()
  );
}

/**
 * Partitions flashcards into Anki's daily study queue strictly capped at dailyTarget (default: 10 cards).
 * 1. Prioritizes due reviews (cards from yesterday or overdue backlog).
 * 2. If due cards < dailyTarget, fills the remaining slots with new cards.
 * 3. Tracks all cards reviewed today for the "Today's History" box.
 */
export function getAnkiDailyQueue(
  flashcards: Flashcard[],
  dailyTarget: number = ANKI_CONFIG.DAILY_TARGET,
  referenceDate: Date = new Date(),
): AnkiDailyQueue {
  const todayReviewedCards: ReviewedTodayItem[] = [];
  const allDue: Flashcard[] = [];
  const allNew: Flashcard[] = [];

  for (const card of flashcards) {
    if (isCardReviewedToday(card, referenceDate)) {
      todayReviewedCards.push({
        id: card._id || '',
        question: card.question,
        answer: card.answer,
        progression: card.progression,
        repetitions: card.repetitions,
        interval: card.interval,
        easeFactor: card.easeFactor,
        nextReviewDate: card.nextReviewDate,
        lastReviewedDate: card.lastReviewedDate!,
        dynamicFields: card.dynamicFields,
      });
    }

    if (isCardDue(card, referenceDate)) {
      allDue.push(card);
    } else if (isCardNew(card)) {
      allNew.push(card);
    }
  }

  // Sort todayReviewedCards by most recently reviewed first
  todayReviewedCards.sort(
    (a, b) => new Date(b.lastReviewedDate).getTime() - new Date(a.lastReviewedDate).getTime(),
  );

  // Sort due cards: most overdue first
  allDue.sort((a, b) => {
    const timeA = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
    const timeB = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
    return timeA - timeB;
  });

  const todayReviewedCount = todayReviewedCards.length;
  const isGoalCompletedToday = todayReviewedCount >= dailyTarget;

  // Remaining slots to study today to reach dailyTarget
  const remainingQuota = Math.max(0, dailyTarget - todayReviewedCount);

  // Take due cards first, then fill remainder with new cards
  const dueSlots = Math.min(allDue.length, remainingQuota);
  const newSlots = Math.min(allNew.length, remainingQuota - dueSlots);

  const dueCards = allDue.slice(0, dueSlots);
  const newCards = allNew.slice(0, newSlots);
  const queue = [...dueCards, ...newCards];

  return {
    dueCards,
    newCards,
    queue,
    totalCount: queue.length,
    todayReviewedCards,
    todayReviewedCount,
    isGoalCompletedToday,
    totalDueBacklog: allDue.length,
    totalNewPool: allNew.length,
  };
}

/**
 * Calculates a multi-day forecast (default: 7 days) of upcoming due reviews and new cards quota.
 * Each day guarantees a sustainable, balanced load capped at dailyTarget (default: 10 cards).
 */
export function getAnkiForecast(
  flashcards: Flashcard[],
  days: number = ANKI_CONFIG.FORECAST_DAYS,
  dailyTarget: number = ANKI_CONFIG.DAILY_TARGET,
  referenceDate: Date = new Date(),
): AnkiForecastDay[] {
  const forecast: AnkiForecastDay[] = [];
  const totalNewCards = flashcards.filter(isCardNew).length;

  for (let d = 0; d < days; d++) {
    const targetDate = new Date(referenceDate);
    targetDate.setDate(targetDate.getDate() + d);

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Count due cards scheduled for this calendar day
    let dueCount = 0;
    for (const card of flashcards) {
      if (isCardNew(card)) continue;
      if (!card.nextReviewDate) {
        if (d === 0) dueCount++;
        continue;
      }
      const reviewDate = new Date(card.nextReviewDate);
      if (d === 0) {
        if (reviewDate <= endOfDay || card.progression === Progression.Retry) {
          dueCount++;
        }
      } else {
        if (
          reviewDate >= startOfDay &&
          reviewDate <= endOfDay &&
          card.progression !== Progression.Retry
        ) {
          dueCount++;
        }
      }
    }

    // Prioritize due reviews up to dailyTarget, then fill remainder with new cards
    const scheduledDue = Math.min(dueCount, dailyTarget);
    const scheduledNew = Math.min(
      dailyTarget - scheduledDue,
      Math.max(0, totalNewCards - d * dailyTarget),
    );
    const totalDay = Math.min(dailyTarget, scheduledDue + scheduledNew);

    let dayLabel = targetDate.toLocaleDateString('en-US', { weekday: 'short' });
    if (d === 0) dayLabel = 'Today';
    else if (d === 1) dayLabel = 'Tomorrow';

    const dateString = targetDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    forecast.push({
      date: targetDate,
      dayIndex: d,
      dayLabel,
      dateString,
      dueCount: scheduledDue,
      newCount: scheduledNew,
      total: totalDay,
    });
  }

  return forecast;
}

export default calculateAnkiReview;

