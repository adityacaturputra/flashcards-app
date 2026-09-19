// src/types/flashcard.ts
export * from '@/constants/flashcard';

export enum Progression {
  Perfect = 'perfect',
  Good = 'good',
  Normal = 'normal',
  Hard = 'hard',
  Retry = 'retry',
  New = 'new',
}

// Define the order for progression levels including 'new'
export const progressionOrder: { [key in Progression]: number } = {
  [Progression.New]: 0,
  [Progression.Retry]: 1,
  [Progression.Hard]: 2,
  [Progression.Normal]: 3,
  [Progression.Good]: 4,
  [Progression.Perfect]: 5,
};

export type FlashcardSortOption = 'recent' | 'progression' | 'alphabetical';

export interface Flashcard {
  _id?: string;
  question: string;
  answer: string;
  progression: Progression; // Use the enum here
  nextReviewDate: Date;
  dynamicFields?: Record<string, string>; // Added to store dynamic fields
  key?: string;
  categories?: string[]; // Many-to-many relationship, references FlashcardCategory _id

  // Anki Spaced Repetition (SM-2) Variables
  repetitions?: number; // Consecutive successful reviews
  interval?: number; // Current review interval in days
  easeFactor?: number; // Ease Factor multiplier (default 2.5, min 1.3)
  lapses?: number; // Count of times card lapsed (failed / Retry)
  lastReviewedDate?: Date; // Timestamp of previous review
}

export interface FlashcardCategory {
  _id?: string;
  name: string;
  description?: string;
}
