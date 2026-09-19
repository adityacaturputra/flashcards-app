/**
 * Academic Word List (AWL) Type Definitions
 * Based on Averil Coxhead's 570 Word Families Research (Victoria University of Wellington)
 */
import {
  AwlPartOfSpeech,
  AwlPrimaryPos,
} from '@/constants/awl';

export * from '@/constants/awl';

export interface WordFamilyVariants {
  verbs: string[];
  nouns: string[];
  adjectives: string[];
  adverbs: string[];
  antonyms?: string[];
}

export interface AwlItem {
  id: string; // e.g. 'awl-analyse'
  headword: string; // e.g. 'analyse'
  sublist: number; // 1 to 10
  ipa: string; // e.g. '/ˈæn.əl.aɪz/'
  definitionId: string; // Indonesian definition
  definitionEn: string; // English definition
  primaryPartOfSpeech: AwlPrimaryPos;
  family: WordFamilyVariants;
  stressShiftNote?: string; // e.g. "e-CO-no-my (/ɪˈkɒn.ə.mi/) ➔ e-co-NO-mic (/ˌiː.kəˈnɒm.ɪk/)"
  collocations: string[]; // e.g. ['conduct an analysis', 'in-depth analysis']
  band5Example: string; // Everyday English sentence
  band8Example: string; // Academic IELTS Writing Task 2 upgraded sentence
}

export interface AwlParaphraseExample {
  id: string;
  topic: string; // e.g. 'Environment & Global Warming'
  band5Text: string;
  band8Text: string;
  keyReplacements: {
    everydayWord: string;
    awlWord: string;
    explanation: string;
  }[];
}

export interface AwlQuizQuestion {
  id: string;
  headword: string;
  sentencePrompt: string; // "The empirical data provides strong ______ for the theory."
  correctOption: string; // "evidence"
  requiredPartOfSpeech: AwlPartOfSpeech;
  options: string[]; // ['evident', 'evidence', 'evidently', 'evidentially']
  grammarClue: string; // "Diikuti kata sifat 'strong', dibutuhkan Kata Benda (Noun)."
}
