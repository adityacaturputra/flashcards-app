import { AudiobookEpisodeProgress } from '@/types/audiobook';

/**
 * Format seconds into mm:ss (e.g. 125 -> "02:05").
 */
export function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Compute playback progress percentage clamped between 0 and 100.
 */
export function getProgressPercent(currentTime: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const pct = (currentTime / duration) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

/**
 * Build a concise Indonesian status label for an episode's saved progress.
 */
export function getEpisodeStatusLabel(
  progress?: AudiobookEpisodeProgress
): string {
  if (!progress) return 'Belum diputar';
  if (progress.completed) return 'Selesai';
  if (progress.lastPlayTime >= 3) {
    return `Lanjut ${formatAudioTime(progress.lastPlayTime)}`;
  }
  return 'Belum diputar';
}
