/**
 * Quiz & Skill Assessment Constants & Single Source of Truth
 * Strictly adheres to BESTPRACTICE.md (§13.1 as const dictionary + derived union type pattern).
 */

export const QUIZ_DIFFICULTY = {
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_4: 4,
  LEVEL_5: 5,
} as const;

export type QuizDifficultyLevel =
  (typeof QUIZ_DIFFICULTY)[keyof typeof QUIZ_DIFFICULTY];

export const QUIZ_CATEGORY = {
  GRAMMAR: 'grammar',
  VOCABULARY: 'vocabulary',
  STAMINA: 'stamina',
} as const;

export type QuizCategory =
  (typeof QUIZ_CATEGORY)[keyof typeof QUIZ_CATEGORY];

export const QUIZ_SECTION = {
  A: 'A',
  B: 'B',
  C: 'C',
} as const;

export type QuizSection =
  (typeof QUIZ_SECTION)[keyof typeof QUIZ_SECTION];

export const QUIZ_SECTION_FILTER = {
  ALL: 'all',
  A: 'A',
  B: 'B',
  C: 'C',
} as const;

export type QuizSectionFilter =
  (typeof QUIZ_SECTION_FILTER)[keyof typeof QUIZ_SECTION_FILTER];

export const RUBRIC_TIER = {
  MASTER: 'Master',
  ADVANCED: 'Advanced',
  COMPETENT: 'Competent',
  DEVELOPING: 'Developing',
  NOVICE: 'Novice',
} as const;

export type RubricTier =
  (typeof RUBRIC_TIER)[keyof typeof RUBRIC_TIER];

export const GRAMMATICAL_NUMBER = {
  SINGULAR: 'singular',
  PLURAL: 'plural',
} as const;

export type GrammaticalNumber =
  (typeof GRAMMATICAL_NUMBER)[keyof typeof GRAMMATICAL_NUMBER];

export const QUIZ_TAB = {
  PRACTICE: 'practice',
  THEORY: 'theory',
} as const;

export type QuizTab =
  (typeof QUIZ_TAB)[keyof typeof QUIZ_TAB];

