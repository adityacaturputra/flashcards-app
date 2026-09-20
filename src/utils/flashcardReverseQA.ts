// src/utils/flashcardReverseQA.ts
import { Flashcard } from '@/types/flashcard';

/**
 * Returns a flashcard with question and answer swapped if isReversed is true.
 */
export function applyReverseQA(card: Flashcard, isReversed: boolean): Flashcard {
  if (!isReversed) return card;
  return {
    ...card,
    question: card.answer,
    answer: card.question,
  };
}

/**
 * Adjusts partial update payload when card is edited while reverse Q/A mode is enabled.
 * Since the user edited the 'question' field on the UI (which represents the original 'answer'),
 * we swap the fields back before persisting the update.
 */
export function unreverseUpdates(
  updates: Partial<Flashcard>,
  isReversed: boolean,
): Partial<Flashcard> {
  if (!isReversed || (!updates.question && !updates.answer)) {
    return updates;
  }

  const corrected = { ...updates };
  if (updates.question) {
    corrected.answer = updates.question;
    delete corrected.question;
  }
  if (updates.answer) {
    corrected.question = updates.answer;
    delete corrected.answer;
  }

  return corrected;
}
