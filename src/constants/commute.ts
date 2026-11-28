/**
 * Commute Audio Vocabulary Module Constants
 * Single Source of Truth for modes, filters, phases, and defaults.
 */

export const COMMUTE_MODE = {
  PIMSLEUR_MICRO_BATCH: 'pimsleur-micro-batch',
  QUICK_RECALL: 'quick-recall',
  RELAXED_PODCAST: 'relaxed-podcast',
} as const;

export type CommuteMode = (typeof COMMUTE_MODE)[keyof typeof COMMUTE_MODE];

export const COMMUTE_CARD_FILTER = {
  DUE_TODAY: 'due-today',
  RICH_ONLY: 'rich-only',
  NEW_ONLY: 'new-only',
  HARD_AND_RETRY: 'hard-and-retry',
  ALL: 'all',
} as const;

export type CommuteCardFilter =
  (typeof COMMUTE_CARD_FILTER)[keyof typeof COMMUTE_CARD_FILTER];

export const COMMUTE_AUDIO_FIELD = {
  WORD: 'word',
  MEANING: 'meaning',
  EXAMPLE: 'example',
  COLLOCATIONS: 'collocations',
  TIPS: 'tips',
} as const;

export type CommuteAudioField =
  (typeof COMMUTE_AUDIO_FIELD)[keyof typeof COMMUTE_AUDIO_FIELD];

export const COMMUTE_AUDIO_BASE_PATH = '/audio/commute';
export const COMMUTE_AUDIO_MANIFEST_URL = `${COMMUTE_AUDIO_BASE_PATH}/manifest.json`;

export const COMMUTE_SEGMENT_PHASE = {
  INTRO: 'intro',
  ACTIVE_RECALL: 'active-recall',
  SPIRAL_REVIEW: 'spiral-review',
  FINAL_SWEEP: 'final-sweep',
  PODCAST: 'podcast',
} as const;

export type CommuteSegmentPhase =
  (typeof COMMUTE_SEGMENT_PHASE)[keyof typeof COMMUTE_SEGMENT_PHASE];

export const COMMUTE_VOICE_LANG = {
  EN: 'en',
  ID: 'id',
} as const;

export type CommuteVoiceLang =
  (typeof COMMUTE_VOICE_LANG)[keyof typeof COMMUTE_VOICE_LANG];

export const COMMUTE_PLAYBACK_SPEEDS = [0.85, 1.0, 1.15] as const;

export type CommutePlaybackSpeed = (typeof COMMUTE_PLAYBACK_SPEEDS)[number];

export const COMMUTE_SESSION_SIZES = [10, 20, 30, 40] as const;

export const COMMUTE_CARD_LIMITS = {
  MIN_COUNT: 1,
  MIN_START_INDEX: 1,
  LARGE_BATCH_WARNING_THRESHOLD: 60,
  ESTIMATED_MB_PER_MINUTE: 0.35, // 48kbps mono MP3 ≈ 360 KB/min
} as const;

export const COMMUTE_BATCH_SIZE = 5;

export const COMMUTE_HISTORY_STORAGE_KEY = 'flashcards_commute_history_v1';
export const COMMUTE_CONFIG_STORAGE_KEY = 'flashcards_commute_config_v1';
export const COMMUTE_SOFT_SYNC_QUEUE_STORAGE_KEY =
  'flashcards_commute_pending_sync_v1';
export const COMMUTE_MAX_HISTORY_ITEMS = 5;

export const COMMUTE_SOFT_SYNC_CONFIG = {
  AUTO_FLUSH_BATCH_SIZE: 5,
  KEEPALIVE_CHUNK_SIZE: 50,
  CHAPTER_COMPLETION_TOLERANCE_SEC: 0.5,
} as const;

export const COMMUTE_MODE_META: Record<
  CommuteMode,
  { title: string; badge: string; description: string }
> = {
  [COMMUTE_MODE.PIMSLEUR_MICRO_BATCH]: {
    title: 'Pimsleur Micro-Batch',
    badge: 'Ilmiah Terbaik',
    description:
      'Batch 5 kartu: Perkenalan → Active Recall (jeda 3.5s) → Spiral Review batch sebelumnya.',
  },
  [COMMUTE_MODE.QUICK_RECALL]: {
    title: 'Quick Recall Quiz',
    badge: 'Cocok Pulang',
    description:
      'Langsung tes ingatan: dengar kata Inggris → jeda mikir 4 detik → verifikasi arti & contoh.',
  },
  [COMMUTE_MODE.RELAXED_PODCAST]: {
    title: 'Relaxed Podcast',
    badge: 'Santai / Macet',
    description:
      'Mengalir santai tanpa jeda tebak-tebakan: Vocab (2x) → Arti → Contoh kalimat.',
  },
};

export const COMMUTE_FILTER_LABELS: Record<CommuteCardFilter, string> = {
  [COMMUTE_CARD_FILTER.DUE_TODAY]: 'Due Today (Anki)',
  [COMMUTE_CARD_FILTER.RICH_ONLY]: 'Kartu Lengkap (Ada Contoh & Penjelasan)',
  [COMMUTE_CARD_FILTER.NEW_ONLY]: 'New Cards',
  [COMMUTE_CARD_FILTER.HARD_AND_RETRY]: 'Hard & Retry',
  [COMMUTE_CARD_FILTER.ALL]: 'Semua Kartu',
};

export const COMMUTE_PHASE_LABELS: Record<CommuteSegmentPhase, string> = {
  [COMMUTE_SEGMENT_PHASE.INTRO]: 'Intro & Konteks',
  [COMMUTE_SEGMENT_PHASE.ACTIVE_RECALL]: 'Active Recall — Jawab Dulu!',
  [COMMUTE_SEGMENT_PHASE.SPIRAL_REVIEW]: 'Spiral Review',
  [COMMUTE_SEGMENT_PHASE.FINAL_SWEEP]: 'Final Consolidation',
  [COMMUTE_SEGMENT_PHASE.PODCAST]: 'Podcast Flow',
};

export const COMMUTE_SOFT_SYNC_STATUS = {
  OFF: 'off',
  IDLE: 'idle',
  SYNCING: 'syncing',
  SYNCED: 'synced',
} as const;

export type CommuteSoftSyncStatus =
  (typeof COMMUTE_SOFT_SYNC_STATUS)[keyof typeof COMMUTE_SOFT_SYNC_STATUS];

export const COMMUTE_AUTO_SYNC_FILTERS: readonly CommuteCardFilter[] = [
  COMMUTE_CARD_FILTER.DUE_TODAY,
  COMMUTE_CARD_FILTER.HARD_AND_RETRY,
] as const;

export function shouldDefaultSoftSync(filter: CommuteCardFilter): boolean {
  return COMMUTE_AUTO_SYNC_FILTERS.includes(filter);
}
