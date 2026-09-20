/**
 * src/constants/anki.ts
 * Single source of truth for Anki SRS queue, limits, and forecast constants.
 * Adheres strictly to BESTPRACTICE.md (§13.1 as const + derived union types).
 */

export const ANKI_CONFIG = {
  DAILY_TARGET: 10,
  DEFAULT_NEW_LIMIT: 10,
  DEFAULT_REVIEW_LIMIT: 10,
  EXTRA_INCREMENT: 5,
  EXTRA_NEW_INCREMENT: 5,
  EXTRA_REVIEW_INCREMENT: 5,
  FORECAST_DAYS: 7,
  DEFAULT_EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
} as const;

export const ANKI_CARD_QUEUE = {
  DUE: 'due',
  NEW: 'new',
} as const;

export type AnkiCardQueue = (typeof ANKI_CARD_QUEUE)[keyof typeof ANKI_CARD_QUEUE];
