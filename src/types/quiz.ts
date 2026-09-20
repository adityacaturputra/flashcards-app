// src/types/quiz.ts
import React from 'react';

export const QUIZ_DIFFICULTY = {
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_4: 4,
  LEVEL_5: 5,
} as const;

export type QuizDifficultyLevel = (typeof QUIZ_DIFFICULTY)[keyof typeof QUIZ_DIFFICULTY];

export interface StructuralBreakdown {
  headSubject: string;
  headNumber: 'singular' | 'plural';
  distractor: string;
  distractorType: string;
  bracketedSentence: string;
  targetVerb: string;
}

export interface QuizQuestion {
  id: string;
  sentence: string; // Contains `[ ___ ]` as the target slot
  options: string[];
  correctAnswer: string;
  explanation: string;
  structuralBreakdown: StructuralBreakdown;
  difficultyLevel: QuizDifficultyLevel;
  category: string;
}

export interface QuestionAnswerRecord {
  question: QuizQuestion;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentMs?: number;
}

export interface RubricScoreResult {
  score: number; // 1.0 to 5.0
  maxScore: 5;
  tier: 'Master' | 'Advanced' | 'Competent' | 'Developing' | 'Novice';
  cefrLevel: string; // e.g., 'C1/C2', 'B2', 'B1', 'A2'
  ieltsEquivalent: string; // e.g., 'Band 7.5 - 9.0'
  accuracyPercentage: number;
  totalAnswered: number;
  totalCorrect: number;
  feedbackMessage: string;
  categoryAnalysis: Record<
    string,
    {
      total: number;
      correct: number;
      accuracy: number;
    }
  >;
}

export interface QuizSessionOptions {
  count?: number;
  targetLevel?: QuizDifficultyLevel;
}

/**
 * Pure, serializable metadata for an English skill module.
 * Safe for JSON transfer between Server and Client.
 */
export interface QuizModuleMeta {
  id: string;
  title: string;
  shortTitle: string;
  rubricTitle: string; // e.g. "Ketepatan penggunaan Subject-Verb Agreement pada kalimat panjang: [ /5]"
  description: string;
  targetCefr: string;
  iconName: string;
  accentColor: string;
  availableLevels?: number[];
}

/**
 * Client-side module representation.
 * Pairs pure metadata with client components (like the interactive theory guide).
 */
export interface QuizClientModule extends QuizModuleMeta {
  renderTheoryGuide: () => React.ReactNode;
}

/**
 * Legacy Strategy Pattern alias for backwards compatibility.
 */
export interface QuizModuleStrategy extends QuizModuleMeta {
  generateSession?: (options?: QuizSessionOptions) => QuizQuestion[];
  calculateRubricScore?: (records: QuestionAnswerRecord[]) => RubricScoreResult;
  renderTheoryGuide?: () => React.ReactNode;
}

