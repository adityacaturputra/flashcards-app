/**
 * English Phonemics & Pronunciation Type Definitions
 */
import {
  PhonemeCategory,
  MonophthongSubCategory,
  DiphthongSubCategory,
  ConsonantSubCategory,
  VoicingType,
  ConnectedSpeechCategory,
} from '@/constants/phonemic';

export * from '@/constants/phonemic';

export type PhonemeSubCategory =
  | MonophthongSubCategory
  | DiphthongSubCategory
  | ConsonantSubCategory;

export interface ArticulatoryGuide {
  lips: string; // e.g. 'Spread', 'Rounded', 'Neutral / Relaxed'
  jaw: string; // e.g. 'Close / High', 'Mid', 'Open / Low'
  tongue: string; // e.g. 'High front', 'Central', 'Low back'
  vocalCords: string; // e.g. 'Vibrating (Voiced)', 'No vibration (Unvoiced / Breath)'
}

export interface SpellingPattern {
  pattern: string; // e.g. 'ee', 'ea', 'ie'
  examples: string[]; // e.g. ['see', 'tree'], ['meat', 'tea']
}

export interface PhonemeItem {
  id: string; // e.g. 'p-i-long'
  ipa: string; // e.g. '/iː/'
  name: string; // e.g. 'Long E sound'
  category: PhonemeCategory;
  subCategory: PhonemeSubCategory;
  voicing: VoicingType;
  exampleWord: string; // e.g. 'sheep'
  exampleIpa: string; // e.g. '/ʃiːp/'
  description: string; // Concise explanation of how the sound is produced
  articulatoryGuide: ArticulatoryGuide;
  spellingPatterns: SpellingPattern[];
  ieltsWords: { word: string; ipa: string; meaning: string }[];
  audioText: string; // Word used for speech synthesis audio
}

export interface MinimalPairItem {
  id: string;
  phoneme1: string; // e.g. '/ɪ/'
  phoneme2: string; // e.g. '/iː/'
  word1: string; // e.g. 'ship'
  ipa1: string; // e.g. '/ʃɪp/'
  meaning1: string;
  word2: string; // e.g. 'sheep'
  ipa2: string; // e.g. '/ʃiːp/'
  meaning2: string;
  contrastTip: string; // Educational tip explaining physical difference
}

export interface WeakFormExample {
  word: string; // e.g. 'can'
  strongIpa: string; // e.g. '/kæn/'
  weakIpa: string; // e.g. '/kən/'
  contextExample: string; // e.g. "I can go tomorrow."
}

export interface ConnectedSpeechLesson {
  id: string;
  title: string;
  category: ConnectedSpeechCategory;
  summary: string;
  rule: string;
  ieltsBand7Benefit: string;
  examples: {
    beforeText: string;
    afterText: string;
    phoneticNote: string;
    audioPrompt: string;
  }[];
}
