import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Flashcard } from '@/types/flashcard';
import { SyncSource, SYNC_SOURCE } from '@/types/sync';

dayjs.extend(relativeTime);

/**
 * Determines which flashcard has the more recent review/study progress
 * based on lastReviewedDate, repetitions count, and review interval.
 */
export function getLatestReviewSource(
  localCard?: Flashcard,
  cloudCard?: Flashcard,
): SyncSource {
  if (!localCard && cloudCard) return SYNC_SOURCE.CLOUD;
  if (!cloudCard && localCard) return SYNC_SOURCE.LOCAL;
  if (!localCard || !cloudCard) return SYNC_SOURCE.LOCAL;

  const localTime = localCard.lastReviewedDate
    ? new Date(localCard.lastReviewedDate).getTime()
    : 0;
  const cloudTime = cloudCard.lastReviewedDate
    ? new Date(cloudCard.lastReviewedDate).getTime()
    : 0;

  // 1. Primary: Explicit timestamp comparison if available
  if (cloudTime > localTime) return SYNC_SOURCE.CLOUD;
  if (localTime > cloudTime) return SYNC_SOURCE.LOCAL;

  // 2. Secondary: If timestamps are identical or neither has a review timestamp,
  // compare review repetitions count (higher reps implies studied further)
  const localReps = localCard.repetitions ?? 0;
  const cloudReps = cloudCard.repetitions ?? 0;
  if (cloudReps > localReps) return SYNC_SOURCE.CLOUD;
  if (localReps > cloudReps) return SYNC_SOURCE.LOCAL;

  // 3. Tertiary: Compare interval
  const localInterval = localCard.interval ?? 0;
  const cloudInterval = cloudCard.interval ?? 0;
  if (cloudInterval > localInterval) return SYNC_SOURCE.CLOUD;
  if (localInterval > cloudInterval) return SYNC_SOURCE.LOCAL;

  // Default to local if completely tied
  return SYNC_SOURCE.LOCAL;
}

/**
 * Checks whether two flashcards have differing SRS review states
 */
export function hasSrsDifference(
  localCard?: Flashcard,
  cloudCard?: Flashcard,
): boolean {
  if (!localCard || !cloudCard) return false;

  const localTime = localCard.lastReviewedDate
    ? new Date(localCard.lastReviewedDate).getTime()
    : 0;
  const cloudTime = cloudCard.lastReviewedDate
    ? new Date(cloudCard.lastReviewedDate).getTime()
    : 0;

  return (
    localCard.progression !== cloudCard.progression ||
    (localCard.interval ?? 0) !== (cloudCard.interval ?? 0) ||
    (localCard.repetitions ?? 0) !== (cloudCard.repetitions ?? 0) ||
    Math.abs((localCard.easeFactor ?? 2.5) - (cloudCard.easeFactor ?? 2.5)) >= 0.01 ||
    Math.abs(localTime - cloudTime) > 1000
  );
}

/**
 * Formats a review timestamp for friendly display with both relative and absolute representation
 */
export function formatReviewDate(
  date?: Date | string | null,
): { relative: string; absolute: string } | null {
  if (!date) return null;
  const d = dayjs(date);
  if (!d.isValid()) return null;

  return {
    relative: d.fromNow(),
    absolute: d.format('MMM D, YYYY h:mm A'),
  };
}

/**
 * Automatically merges two conflicting cards by prioritizing the latest review
 * state for SRS, merging dynamic fields, unioning categories, and preserving
 * content.
 */
export function buildSmartResolvedCard(
  localCard: Flashcard,
  cloudCard: Flashcard,
  cardId: string,
): Flashcard {
  const latestSrsSource = getLatestReviewSource(localCard, cloudCard);
  const srsSource = latestSrsSource === SYNC_SOURCE.CLOUD ? cloudCard : localCard;

  // Merge dynamic fields (preserving unique keys from both sides)
  const mergedDynamic: Record<string, string> = {
    ...(localCard.dynamicFields || {}),
    ...(cloudCard.dynamicFields || {}),
  };

  // Union categories
  const localCats = (localCard.categories || []).map((c) => c?.toString() || '');
  const cloudCats = (cloudCard.categories || []).map((c) => c?.toString() || '');
  const mergedCategories = Array.from(new Set([...localCats, ...cloudCats])).filter(Boolean);

  const chosenQuestion =
    (latestSrsSource === SYNC_SOURCE.CLOUD ? cloudCard.question : localCard.question) ||
    localCard.question ||
    cloudCard.question;
  const chosenAnswer =
    (latestSrsSource === SYNC_SOURCE.CLOUD ? cloudCard.answer : localCard.answer) ||
    localCard.answer ||
    cloudCard.answer;

  return {
    ...localCard,
    _id: cardId,
    question: chosenQuestion,
    answer: chosenAnswer,
    progression: srsSource.progression,
    repetitions: srsSource.repetitions ?? 0,
    interval: srsSource.interval ?? 0,
    easeFactor: srsSource.easeFactor ?? 2.5,
    lapses: srsSource.lapses ?? 0,
    nextReviewDate: srsSource.nextReviewDate,
    lastReviewedDate: srsSource.lastReviewedDate,
    dynamicFields: Object.keys(mergedDynamic).length > 0 ? mergedDynamic : undefined,
    categories: mergedCategories,
  };
}
