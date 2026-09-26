/**
 * Cambridge IELTS Audio Utility Functions
 * Pure helpers for time formatting and skip button labels.
 */

/**
 * Format duration in seconds to MM:SS or HH:MM:SS format
 */
export const formatAudioDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');

  if (hrs > 0) {
    const paddedHrs = String(hrs).padStart(2, '0');
    return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
  }

  return `${paddedMins}:${paddedSecs}`;
};

/**
 * Formats skip label for accessibility
 */
export const getSkipAriaLabel = (seconds: number): string => {
  if (seconds < 0) {
    return `Rewind ${Math.abs(seconds)} seconds`;
  }
  return `Fast forward ${seconds} seconds`;
};
