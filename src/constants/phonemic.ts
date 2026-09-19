/**
 * English Phonemics & Pronunciation Constants & Types
 * Single Source of Truth for Phonemic Enums & Modes
 */

export const PHONEMIC_VIEW_TAB = {
  CHART: 'chart',
  MINIMAL_PAIRS: 'minimal-pairs',
  CONNECTED_SPEECH: 'connected-speech',
  ROADMAP: 'roadmap',
} as const;

export type PhonemicViewTab =
  (typeof PHONEMIC_VIEW_TAB)[keyof typeof PHONEMIC_VIEW_TAB];

export const ACCENT_PREFERENCE = {
  UK: 'uk',
  US: 'us',
} as const;

export type AccentPreference =
  (typeof ACCENT_PREFERENCE)[keyof typeof ACCENT_PREFERENCE];

export const DEFAULT_ACCENT: AccentPreference = ACCENT_PREFERENCE.US;

export const PHONEME_CATEGORY = {
  MONOPHTHONG: 'monophthong',
  DIPHTHONG: 'diphthong',
  CONSONANT: 'consonant',
} as const;

export type PhonemeCategory =
  (typeof PHONEME_CATEGORY)[keyof typeof PHONEME_CATEGORY];

export const MONOPHTHONG_SUB_CATEGORY = {
  SHORT: 'short',
  LONG: 'long',
} as const;

export type MonophthongSubCategory =
  (typeof MONOPHTHONG_SUB_CATEGORY)[keyof typeof MONOPHTHONG_SUB_CATEGORY];

export const DIPHTHONG_SUB_CATEGORY = {
  CLOSING_I: 'closing-i',
  CLOSING_U: 'closing-u',
  CENTRING: 'centring',
} as const;

export type DiphthongSubCategory =
  (typeof DIPHTHONG_SUB_CATEGORY)[keyof typeof DIPHTHONG_SUB_CATEGORY];

export const CONSONANT_SUB_CATEGORY = {
  PLOSIVE: 'plosive',
  FRICATIVE: 'fricative',
  AFFRICATE: 'affricate',
  NASAL: 'nasal',
  APPROXIMANT: 'approximant',
  GLOTTAL: 'glottal',
} as const;

export type ConsonantSubCategory =
  (typeof CONSONANT_SUB_CATEGORY)[keyof typeof CONSONANT_SUB_CATEGORY];

export const VOICING_TYPE = {
  VOICED: 'voiced',
  UNVOICED: 'unvoiced',
  VOICED_VOWEL: 'voiced-vowel',
} as const;

export type VoicingType =
  (typeof VOICING_TYPE)[keyof typeof VOICING_TYPE];

export const CONNECTED_SPEECH_CATEGORY = {
  SCHWA: 'schwa',
  WEAK_FORMS: 'weak-forms',
  LINKING: 'linking',
  ELISION: 'elision',
  STRESS: 'stress',
} as const;

export type ConnectedSpeechCategory =
  (typeof CONNECTED_SPEECH_CATEGORY)[keyof typeof CONNECTED_SPEECH_CATEGORY];

export const UNDERHILL_FILTER_OPTION = {
  ALL: 'all',
  MONOPHTHONGS: 'monophthongs',
  DIPHTHONGS: 'diphthongs',
  CONSONANTS: 'consonants',
  VOICED: 'voiced',
  UNVOICED: 'unvoiced',
} as const;

export type UnderhillFilterOption =
  (typeof UNDERHILL_FILTER_OPTION)[keyof typeof UNDERHILL_FILTER_OPTION];

export const MINIMAL_PAIRS_MODE = {
  STUDY: 'study',
  QUIZ: 'quiz',
} as const;

export type MinimalPairsMode =
  (typeof MINIMAL_PAIRS_MODE)[keyof typeof MINIMAL_PAIRS_MODE];
