// src/types/flashcard.ts
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

export interface Flashcard {
  _id?: string;
  question: string;
  answer: string;
  progression: Progression; // Use the enum here
  nextReviewDate: Date;
  dynamicFields?: Record<string, string>; // Added to store dynamic fields
  key?: string;
  categories?: string[]; // Many-to-many relationship, references FlashcardCategory _id
}

export interface FlashcardCategory {
  _id?: string;
  name: string;
  description?: string;
}
