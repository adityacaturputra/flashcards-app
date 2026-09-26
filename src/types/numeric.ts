/**
 * Types for IELTS Numeric Precision (Pilar 2: Dekoding Angka, Telepon, & Kode Pos)
 * Adheres strictly to BESTPRACTICE.md (Section 4: Discriminated Unions & Enums as Const Objects)
 */

export const NUMERIC_DICTATION_CATEGORY = {
  TELEPHONE: 'Telephone',
  POSTCODE: 'Postcode',
  REFERENCE_NO: 'Reference No',
  CURRENCY_PRICE: 'Currency/Price',
  DATE: 'Date',
} as const;

export type NumericDictationCategory =
  (typeof NUMERIC_DICTATION_CATEGORY)[keyof typeof NUMERIC_DICTATION_CATEGORY];

export const PHONE_RULE_BADGE = {
  CRUCIAL: 'Paling Krusial',
  FAST_PATTERN: 'Pola Cepat',
  RHYTHM: 'Ritme Dengar',
} as const;

export type PhoneRuleBadge = (typeof PHONE_RULE_BADGE)[keyof typeof PHONE_RULE_BADGE];

export interface TeenTyPair {
  id: string;
  teenNum: number; // e.g. 13
  teenWord: string; // "Thirteen"
  teenIpa: string; // "/θɜːˈtiːn/"
  teenStress: string; // "Tekanan di akhir: -TEEN (panjang & jelas)"
  tyNum: number; // e.g. 30
  tyWord: string; // "Thirty"
  tyIpa: string; // "/ˈθɜːti/"
  tyStress: string; // "Tekanan di awal: THIR- (pendek & cepat)"
  acousticTrap: string; // Titik jebakan bagi telinga non-native
}

export interface PhoneNumberRule {
  id: string;
  title: string;
  ruleBadge: PhoneRuleBadge;
  description: string;
  spokenExample: string;
  writtenTarget: string;
  note: string;
}

export interface NumericDictationItem {
  id: string;
  category: NumericDictationCategory;
  context: string; // e.g. "Customer booking contact number"
  spokenScript: string; // text read by TTS, e.g. "oh eight hundred, double four, five double seven"
  targetDisplay: string; // "0800 44 577"
  hint: string;
}
