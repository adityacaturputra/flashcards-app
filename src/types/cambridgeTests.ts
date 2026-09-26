/**
 * Cambridge IELTS Tests & Interactive Practice Types
 * Single source of truth for Cambridge books, tests, audio tracks, and PDF viewers.
 * Strictly adheres to BESTPRACTICE.md (as const object constants + derived union types).
 */

export const CAMBRIDGE_SECTION = {
  PART_1: 1,
  PART_2: 2,
  PART_3: 3,
  PART_4: 4,
} as const;

export type CambridgeSection =
  (typeof CAMBRIDGE_SECTION)[keyof typeof CAMBRIDGE_SECTION];

export const AUDIO_SKIP_SECONDS = {
  REWIND_10: -10,
  REWIND_5: -5,
  FORWARD_5: 5,
  FORWARD_10: 10,
} as const;

export type AudioSkipSeconds =
  (typeof AUDIO_SKIP_SECONDS)[keyof typeof AUDIO_SKIP_SECONDS];

export const AUDIO_PLAYBACK_SPEED = {
  SLOW: 0.75,
  NORMAL: 1.0,
  MEDIUM_FAST: 1.25,
  FAST: 1.5,
  DOUBLE: 2.0,
} as const;

export type AudioPlaybackSpeed =
  (typeof AUDIO_PLAYBACK_SPEED)[keyof typeof AUDIO_PLAYBACK_SPEED];

export const PDF_VIEWER_MODE = {
  NATIVE: 'native',
  GOOGLE_DOCS: 'google_docs',
} as const;

export type PdfViewerMode =
  (typeof PDF_VIEWER_MODE)[keyof typeof PDF_VIEWER_MODE];

export const PLAYER_DOCK_MODE = {
  FLOATING: 'floating',
  DOCKED_BOTTOM: 'docked_bottom',
} as const;

export type PlayerDockMode =
  (typeof PLAYER_DOCK_MODE)[keyof typeof PLAYER_DOCK_MODE];

export interface CambridgeTrack {
  section: CambridgeSection;
  title: string;
  audioUrl: string;
  remoteAudioUrl?: string;
  durationLabel?: string;
}

export interface CambridgeTestItem {
  id: string; // e.g. "c14-t1"
  testNumber: number; // 1, 2, 3, 4
  title: string; // e.g. "Test 1"
  pdfPageHint?: number; // approximate starting page in PDF
  tracks: CambridgeTrack[];
}

export interface CambridgeBookItem {
  id: string; // e.g. "cambridge-14"
  bookNumber: number; // 14
  title: string; // "Cambridge IELTS 14 Academic"
  badge: string; // "Official Cambridge"
  pdfUrl: string; // Local static URL or served path
  remotePdfUrl?: string; // Archive.org fallback URL
  pdfFallbackUrl?: string; // Alternative mirror
  totalTests: number;
  tests: CambridgeTestItem[];
}
