/**
 * Pure utilities for persisting and restoring audio playback progress
 * across /commute episodes and future audiobook players.
 */

export const AUDIO_PROGRESS_STORAGE_KEY = 'flashcards_audio_progress_v1';
export const AUDIO_PROGRESS_MAX_ENTRIES = 50;
export const AUDIO_PROGRESS_MIN_RESUME_SEC = 5;
export const AUDIO_PROGRESS_COMPLETION_RATIO = 0.98;
export const AUDIO_PROGRESS_REWIND_CONTEXT_SEC = 3;
export const AUDIO_PROGRESS_SAVE_INTERVAL_MS = 4000;

export interface AudioPlaybackProgress {
  episodeKey: string;
  currentTimeSec: number;
  durationSec: number;
  activeChapterIndex: number;
  updatedAt: string;
}

type AudioProgressStore = Record<string, AudioPlaybackProgress>;

/**
 * Formats seconds into M:SS or H:MM:SS clock display.
 */
export function formatAudioClock(sec: number): string {
  const safe = Math.max(0, Math.floor(Number.isFinite(sec) ? sec : 0));
  const hours = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const rem = safe % 60;
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  }
  return `${mins}:${rem.toString().padStart(2, '0')}`;
}

/**
 * Deterministic 32-bit FNV-1a hash encoded in base36 for compact storage keys.
 */
function hashString(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Builds a deterministic episodeKey from commute mode + sorted cardIds
 * so regenerating the same episode automatically matches its saved progress.
 */
export function buildCommuteEpisodeKey(mode: string, cardIds: readonly string[]): string {
  const normalized = [...cardIds].map((id) => id.trim()).sort().join('|');
  return `commute:${mode}:${cardIds.length}:${hashString(`${mode}::${normalized}`)}`;
}

/**
 * Checks whether a saved progress entry is eligible for a Resume prompt
 * (> 5 seconds in and < 98% completed).
 */
export function isResumableProgress(progress: AudioPlaybackProgress | null): boolean {
  if (!progress) return false;
  if (progress.currentTimeSec <= AUDIO_PROGRESS_MIN_RESUME_SEC) return false;
  if (
    progress.durationSec > 0 &&
    progress.currentTimeSec / progress.durationSec >= AUDIO_PROGRESS_COMPLETION_RATIO
  ) {
    return false;
  }
  return true;
}

/**
 * Computes the context-aware resume timestamp (rewound by 3 seconds).
 */
export function getResumeTargetSec(savedTimeSec: number): number {
  return Math.max(0, savedTimeSec - AUDIO_PROGRESS_REWIND_CONTEXT_SEC);
}

function readProgressStore(): AudioProgressStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(AUDIO_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as AudioProgressStore;
    }
  } catch {
    // Ignore storage read/parse errors
  }
  return {};
}

function writeProgressStore(store: AudioProgressStore): void {
  if (typeof window === 'undefined') return;
  try {
    const entries = Object.values(store)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, AUDIO_PROGRESS_MAX_ENTRIES);
    const trimmed: AudioProgressStore = {};
    for (const entry of entries) {
      trimmed[entry.episodeKey] = entry;
    }
    window.localStorage.setItem(AUDIO_PROGRESS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadAudioProgress(episodeKey: string): AudioPlaybackProgress | null {
  if (!episodeKey) return null;
  const store = readProgressStore();
  return store[episodeKey] ?? null;
}

export function saveAudioProgress(progress: AudioPlaybackProgress): void {
  if (!progress.episodeKey) return;
  const store = readProgressStore();
  store[progress.episodeKey] = progress;
  writeProgressStore(store);
}

export function clearAudioProgress(episodeKey: string): void {
  if (!episodeKey) return;
  const store = readProgressStore();
  if (episodeKey in store) {
    delete store[episodeKey];
    writeProgressStore(store);
  }
}
