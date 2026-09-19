/**
 * src/constants/flashcard.ts
 * Single source of truth for flashcard field constants and identifiers.
 */

export const FLASHCARD_FIELD = {
  QUESTION: 'question',
  ANSWER: 'answer',
  CORRECTION: 'correction',
} as const;

export type FlashcardField = (typeof FLASHCARD_FIELD)[keyof typeof FLASHCARD_FIELD];
