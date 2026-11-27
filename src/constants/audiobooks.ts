/**
 * Centralized constants for the Next Level Stories Audiobook Player.
 */

export const AUDIOBOOK_SPEEDS = {
  SLOW: 0.85,
  NORMAL: 1,
  FAST: 1.15,
} as const;

export const AUDIOBOOK_SPEED_OPTIONS = [
  AUDIOBOOK_SPEEDS.SLOW,
  AUDIOBOOK_SPEEDS.NORMAL,
  AUDIOBOOK_SPEEDS.FAST,
] as const;

export const AUDIOBOOK_SKIP_SECONDS = 10;

export const AUDIOBOOK_COMPLETION_THRESHOLD = 0.92;

export const AUDIOBOOK_SAVE_INTERVAL_MS = 2000;

export const AUDIOBOOK_STORAGE_KEY = 'next_level_audiobooks_progress_v1';

export const AUDIOBOOK_LAST_EPISODE_KEY = 'next_level_audiobooks_last_ep_v1';

export const AUDIOBOOK_AUDIO_BASE_URL =
  process.env.NEXT_PUBLIC_AUDIOBOOK_AUDIO_BASE_URL ?? '/audio/audiobooks';

export const AUDIOBOOK_SCRIPT_BASE_URL =
  process.env.NEXT_PUBLIC_AUDIOBOOK_SCRIPT_BASE_URL ?? '/audiobooks/scripts';

export const AUDIOBOOK_SERIES_META = {
  TITLE: 'Next Level Stories',
  ARTIST: 'Bima & Sarah · Duet Storytelling',
  ALBUM: 'Next Level English Audiobooks',
} as const;
