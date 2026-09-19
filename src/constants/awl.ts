/**
 * Academic Word List (AWL) Constants & Types
 * Single Source of Truth for AWL Enums & Configurations
 */

export const AWL_PART_OF_SPEECH = {
  VERB: 'Verb',
  NOUN: 'Noun',
  ADJECTIVE: 'Adjective',
  ADVERB: 'Adverb',
} as const;

export type AwlPartOfSpeech =
  (typeof AWL_PART_OF_SPEECH)[keyof typeof AWL_PART_OF_SPEECH];

export const AWL_PRIMARY_POS = {
  VERB: 'verb',
  NOUN: 'noun',
  ADJECTIVE: 'adjective',
} as const;

export type AwlPrimaryPos =
  (typeof AWL_PRIMARY_POS)[keyof typeof AWL_PRIMARY_POS];

export const AWL_TAB_MODE = {
  EXPLORER: 'explorer',
  PARAPHRASE: 'paraphrase',
  QUIZ: 'quiz',
  GUIDE: 'guide',
} as const;

export type AwlTabMode = (typeof AWL_TAB_MODE)[keyof typeof AWL_TAB_MODE];

export const AWL_SUBLIST_FILTER = {
  ALL: 'all',
} as const;

export type AwlSublistFilter =
  | (typeof AWL_SUBLIST_FILTER)[keyof typeof AWL_SUBLIST_FILTER]
  | number;
