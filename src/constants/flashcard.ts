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

export const WORD_FAMILY_KEYWORDS = [
  'verb',
  'noun',
  'adjective',
  'adverb',
  'rumpun',
] as const;

export const COLLOCATION_KEYWORDS = [
  'kolokasi',
  'collocation',
  'rumus',
] as const;

export const SENTENCE_TRANSFORMATION_KEYWORDS = [
  'transformasi',
  'sehari-hari',
  'band 8',
  'upgrade',
] as const;
