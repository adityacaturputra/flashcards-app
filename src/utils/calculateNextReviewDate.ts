// src/utils/calculateNextReviewDate.ts
import { Progression } from '@/types/flashcard';
import { calculateAnkiReview, AnkiCardState } from '@/utils/ankiAlgorithm';

export const calculateNextReviewDate = (
  progression: Progression,
  cardState?: AnkiCardState,
): Date => {
  const result = calculateAnkiReview(cardState, progression);
  return result.nextReviewDate;
};

export default calculateNextReviewDate;
