/**
 * src/types/anki.ts
 * Type definitions and contracts for Anki SRS calculation, daily queues, and forecasts.
 */

import { Flashcard, Progression } from './flashcard';
export * from '@/constants/anki';

export interface AnkiCardState {
  repetitions?: number;
  interval?: number;
  easeFactor?: number;
  lapses?: number;
  lastReviewedDate?: Date | string;
  nextReviewDate?: Date | string;
}

export interface AnkiReviewResult {
  repetitions: number;
  interval: number;
  easeFactor: number;
  lapses: number;
  lastReviewedDate: Date;
  nextReviewDate: Date;
}

export interface ReviewedTodayItem {
  id: string;
  question: string;
  answer: string;
  progression: Progression;
  repetitions?: number;
  interval?: number;
  easeFactor?: number;
  nextReviewDate?: Date | string;
  lastReviewedDate: Date | string;
  dynamicFields?: Record<string, string>;
}

export interface AnkiDailyQueue {
  dueCards: Flashcard[];
  newCards: Flashcard[];
  queue: Flashcard[];
  totalCount: number;
  todayReviewedCards: ReviewedTodayItem[];
  todayReviewedCount: number;
  isGoalCompletedToday: boolean;
  totalDueBacklog: number;
  totalNewPool: number;
}

export interface AnkiForecastDay {
  date: Date;
  dayIndex: number; // 0 for today, 1 for tomorrow, etc.
  dayLabel: string; // 'Today', 'Tomorrow', 'Mon', 'Tue', etc.
  dateString: string; // 'Sep 20', etc.
  dueCount: number;
  newCount: number;
  total: number;
}
