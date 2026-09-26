/**
 * IELTS Rebuttal Signposts & Distractor Avoidance Types (Pilar 3)
 * Single source of truth for self-correction patterns, distractor types, and practice items.
 * Strictly adheres to BESTPRACTICE.md (as const enum pattern + derived types).
 */

export const REBUTTAL_CATEGORY = {
  DIRECT_CORRECTION: 'direct_correction',
  APOLOGY_RETRACTION: 'apology_retraction',
  TIME_CHANGE: 'time_change',
  EXCEPTION_CONTRAST: 'exception_contrast',
} as const;

export type RebuttalCategory =
  (typeof REBUTTAL_CATEGORY)[keyof typeof REBUTTAL_CATEGORY];

export const REBUTTAL_CATEGORY_META: Record<
  RebuttalCategory,
  {
    id: RebuttalCategory;
    title: string;
    subtitle: string;
    badgeColor: string;
    triggerPhrases: string[];
    description: string;
    effectOnPreviousData: string;
  }
> = {
  [REBUTTAL_CATEGORY.DIRECT_CORRECTION]: {
    id: REBUTTAL_CATEGORY.DIRECT_CORRECTION,
    title: 'Koreksi Langsung',
    subtitle: 'Direct Correction',
    badgeColor: 'emerald',
    triggerPhrases: ['Actually', 'In fact', 'To be precise', 'As a matter of fact'],
    description: 'Pembicara menyebutkan data pertama, lalu membatalkannya seketika dengan data riil.',
    effectOnPreviousData: 'Membatalkan informasi pertama seketika.',
  },
  [REBUTTAL_CATEGORY.APOLOGY_RETRACTION]: {
    id: REBUTTAL_CATEGORY.APOLOGY_RETRACTION,
    title: 'Penyesalan / Ralat',
    subtitle: 'Apology & Retraction',
    badgeColor: 'rose',
    triggerPhrases: ['Sorry', 'My mistake', 'I stand corrected', 'Let me verify', 'Let me check'],
    description: 'Menandakan pembicara salah membaca dokumen, formulir jadwal, atau layar sistem.',
    effectOnPreviousData: 'Menandakan kekeliruan pembacaan dokumen.',
  },
  [REBUTTAL_CATEGORY.TIME_CHANGE]: {
    id: REBUTTAL_CATEGORY.TIME_CHANGE,
    title: 'Perubahan Waktu',
    subtitle: 'Past vs Present / Outdated',
    badgeColor: 'amber',
    triggerPhrases: ['Originally', 'Previously', 'Used to', 'No longer', 'Until recently'],
    description: 'Audio menyebut data terdahulu, padahal formulir soal menanyakan data saat ini (current/now).',
    effectOnPreviousData: 'Menunjukkan data tersebut sudah usang (obsolete).',
  },
  [REBUTTAL_CATEGORY.EXCEPTION_CONTRAST]: {
    id: REBUTTAL_CATEGORY.EXCEPTION_CONTRAST,
    title: 'Pengecualian / Kontras',
    subtitle: 'Exception & Contrast Limit',
    badgeColor: 'sky',
    triggerPhrases: ['Except', 'However', 'Unfortunately', 'Although', 'Mind you'],
    description: 'Informasi awal tampak lengkap sebelum pembicara membatasi cakupan dengan syarat khusus.',
    effectOnPreviousData: 'Membatasi cakupan informasi sebelumnya.',
  },
};

export interface TranscriptSnippetLine {
  speaker: string;
  text: string;
  isDistractor?: boolean;
  isSignpost?: boolean;
  isAnswer?: boolean;
}

export interface RebuttalQuestionItem {
  id: string;
  cambridgeSource: string; // e.g. "Cambridge IELTS 14 • Test 1 Section 1"
  category: RebuttalCategory;
  title: string; // e.g. "Louise's Nationality"
  questionPrompt: string; // e.g. "What is the caller's nationality?"
  formFieldLabel: string; // e.g. "Nationality:"
  audioUrl: string; // e.g. "/audio/rebuttal-signposts/c14_t1_q1_canadian.mp3"
  distractorValue: string; // e.g. "British"
  targetAnswer: string; // e.g. "Canadian"
  signpostWords: string[]; // e.g. ["actually", "though"]
  options: string[]; // 4 options for ear training
  fieldPencilNote: string; // e.g. "~British~ ➔ Canadian"
  explanationMarkdown: string; // In-depth pedagogical markdown breakdown
  transcript: TranscriptSnippetLine[];
}

export const REBUTTAL_PLAYBACK_SPEED = {
  SLOW: 0.8,
  NORMAL: 1.0,
  FAST: 1.2,
} as const;

export type RebuttalPlaybackSpeed =
  (typeof REBUTTAL_PLAYBACK_SPEED)[keyof typeof REBUTTAL_PLAYBACK_SPEED];
