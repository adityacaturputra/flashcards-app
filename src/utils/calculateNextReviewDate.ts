// src/utils/calculateNextReviewDate.ts
import { Progression } from '@/types/flashcard';

const calculateNextReviewDate = (progression: Progression): Date => {
  const currentDate = new Date();
  const nextReviewDate = new Date(currentDate);

  switch (progression) {
    case Progression.New:
      nextReviewDate.setTime(nextReviewDate.getTime() + 24 * 60 * 60 * 1000); // 1 day from now
      break;
    case Progression.Retry:
      nextReviewDate.setTime(nextReviewDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour from now
      break;
    case Progression.Hard:
      nextReviewDate.setTime(nextReviewDate.getTime() + 24 * 60 * 60 * 1000); // 1 day from now
      break;
    case Progression.Normal:
      nextReviewDate.setTime(
        nextReviewDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      ); // 1 week from now
      break;
    case Progression.Good:
      nextReviewDate.setTime(
        nextReviewDate.getTime() + 14 * 24 * 60 * 60 * 1000,
      ); // 2 weeks from now
      break;
    case Progression.Perfect:
      nextReviewDate.setTime(
        nextReviewDate.getTime() + 30 * 24 * 60 * 60 * 1000,
      ); // 1 month from now
      break;
    default:
      nextReviewDate.setTime(nextReviewDate.getTime() + 24 * 60 * 60 * 1000); // Default to 1 day from now
  }

  return nextReviewDate;
};

export default calculateNextReviewDate;
