/**
 * English Alphabet & Letter Recognition Types
 * Single source of truth for the 26 English letters, rhyme families, confusion pairs, and ear training exercises.
 */

export const RHYME_GROUP_ID = {
  EI: 'ei', // /eɪ/: A, H, J, K
  II: 'ii', // /iː/: B, C, D, E, G, P, T, V, Z (US)
  E: 'e',   // /ɛ/: F, L, M, N, S, X, Z (UK/AU)
  AI: 'ai', // /aɪ/: I, Y
  UU: 'uu', // /uː/: Q, U, W
  OU: 'ou', // /oʊ/: O
  AR: 'ar', // /ɑː(r)/: R
} as const;

export type RhymeGroupId = (typeof RHYME_GROUP_ID)[keyof typeof RHYME_GROUP_ID];

export interface AlphabetLetter {
  char: string; // Uppercase 'A' .. 'Z'
  lower: string; // Lowercase 'a' .. 'z'
  name: string; // Phonetic spelling name: 'ay', 'bee', 'cee', 'dee', etc.
  ipa: string; // IPA notation: '/eɪ/', '/biː/', etc.
  ipaUk?: string; // Regional variant (e.g. Z: '/zɛd/' in UK vs '/ziː/' in US)
  nato: string; // NATO code word: 'Alpha', 'Bravo', 'Charlie', etc.
  rhymeGroup: RhymeGroupId;
  rhymeIpa: string; // e.g. '/eɪ/'
  confusionPartners: string[]; // Letters commonly mixed up with this one
  exampleWord: string; // e.g. 'Apple'
  exampleIpa: string; // e.g. '/ˈæp.əl/'
  tip: string; // Auditory recognition tip & mouth position
  isVowel: boolean;
}

export interface RhymeGroupInfo {
  id: RhymeGroupId;
  ipa: string;
  name: string;
  letters: string[];
  description: string;
  articulationTip: string;
}

export interface RhymeClusterTrap {
  soundCategory: string; // e.g. '/eɪ/ Sound'
  ipa: string; // e.g. '/eɪ/'
  letters: string[]; // e.g. ['A', 'H', 'J', 'K']
  nonNativeTrap: string; // Titik rawan kebingungan bagi non-native
}

export interface ConfusionPairItem {
  id: string;
  title: string;
  letters: string[];
  whyConfusing: string;
  acousticClue: string;
  articulatoryDifference: string;
  ieltsTrapContext: string;
}

export interface SpellingConventionItem {
  title: string;
  rule: string;
  example: string;
}

export interface SpellingExercise {
  id: string;
  target: string; // Word or alphanumeric code to spell out, e.g. "BRADFORD"
  category:
    | 'Surname'
    | 'Postcode'
    | 'Reference Code'
    | 'Street Name'
    | 'Airport Code'
    | 'Flight Code';
  context: string;
  hint: string;
}

export const ALPHABET_VIEW_TAB = {
  EXPLORER: 'explorer',
  QUIZ: 'quiz',
  CONFUSION: 'confusion',
  SPELLING: 'spelling',
} as const;

export type AlphabetViewTab = (typeof ALPHABET_VIEW_TAB)[keyof typeof ALPHABET_VIEW_TAB];
