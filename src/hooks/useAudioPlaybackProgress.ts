'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  AUDIO_PROGRESS_SAVE_INTERVAL_MS,
  AudioPlaybackProgress,
  clearAudioProgress,
  getResumeTargetSec,
  isResumableProgress,
  loadAudioProgress,
  saveAudioProgress,
} from '@/utils/audioPlaybackProgress';

export interface UseAudioPlaybackProgressOptions {
  episodeKey: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  activeChapterIndex: number;
  onSeek: (timeSec: number) => void;
  onPlay?: () => void;
}

/**
 * Reusable hook for throttled audio progress persistence (every 4s while playing,
 * on pause, on seek, and on iOS Safari visibilitychange/pagehide) plus 1-tap resume.
 */
export function useAudioPlaybackProgress({
  episodeKey,
  audioRef,
  isPlaying,
  currentTime,
  duration,
  activeChapterIndex,
  onSeek,
  onPlay,
}: UseAudioPlaybackProgressOptions) {
  const [savedProgress, setSavedProgress] = useState<AudioPlaybackProgress | null>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  const lastSavedAtRef = useRef<number>(0);
  const latestStateRef = useRef({
    episodeKey,
    currentTime,
    duration,
    activeChapterIndex,
  });

  latestStateRef.current = {
    episodeKey,
    currentTime,
    duration,
    activeChapterIndex,
  };

  // Load saved progress whenever a new episodeKey is mounted
  useEffect(() => {
    lastSavedAtRef.current = 0;
    if (!episodeKey) {
      setSavedProgress(null);
      setShowResumePrompt(false);
      return;
    }
    const existing = loadAudioProgress(episodeKey);
    setSavedProgress(existing);
    setShowResumePrompt(isResumableProgress(existing));
  }, [episodeKey]);

  const persistNow = useCallback(
    (overrideTimeSec?: number) => {
      const {
        episodeKey: key,
        currentTime: stateTime,
        duration: stateDuration,
        activeChapterIndex: chapterIdx,
      } = latestStateRef.current;

      if (!key) return;
      const audio = audioRef.current;
      const liveTime =
        overrideTimeSec !== undefined
          ? overrideTimeSec
          : audio && Number.isFinite(audio.currentTime)
            ? audio.currentTime
            : stateTime;
      const liveDuration =
        audio && Number.isFinite(audio.duration) && audio.duration > 0
          ? audio.duration
          : stateDuration;

      if (!Number.isFinite(liveTime) || liveTime < 0) return;

      const record: AudioPlaybackProgress = {
        episodeKey: key,
        currentTimeSec: Math.round(liveTime * 10) / 10,
        durationSec: Math.round(Math.max(0, liveDuration) * 10) / 10,
        activeChapterIndex: chapterIdx,
        updatedAt: new Date().toISOString(),
      };

      saveAudioProgress(record);
      lastSavedAtRef.current = Date.now();
    },
    [audioRef]
  );

  // Throttled auto-save every 4s while playing
  useEffect(() => {
    if (!episodeKey || !isPlaying) return;
    const now = Date.now();
    if (now - lastSavedAtRef.current >= AUDIO_PROGRESS_SAVE_INTERVAL_MS) {
      persistNow();
    }
  }, [episodeKey, isPlaying, currentTime, persistNow]);

  // Immediate save on pause, seeked, visibilitychange (iOS Safari -> Google Maps), and pagehide
  useEffect(() => {
    if (!episodeKey) return;

    const audio = audioRef.current;
    const handlePauseOrSeek = () => {
      persistNow();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        persistNow();
      }
    };
    const handlePageHide = () => {
      persistNow();
    };

    audio?.addEventListener('pause', handlePauseOrSeek);
    audio?.addEventListener('seeked', handlePauseOrSeek);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      audio?.removeEventListener('pause', handlePauseOrSeek);
      audio?.removeEventListener('seeked', handlePauseOrSeek);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [episodeKey, audioRef, persistNow]);

  const handleResume = useCallback(() => {
    if (!savedProgress) return;
    const targetSec = getResumeTargetSec(savedProgress.currentTimeSec);
    onSeek(targetSec);
    setShowResumePrompt(false);
    persistNow(targetSec);
    onPlay?.();
  }, [savedProgress, onSeek, onPlay, persistNow]);

  const handleStartFromBeginning = useCallback(() => {
    if (episodeKey) {
      clearAudioProgress(episodeKey);
    }
    onSeek(0);
    setSavedProgress(null);
    setShowResumePrompt(false);
  }, [episodeKey, onSeek]);

  return {
    savedProgress,
    showResumePrompt,
    persistNow,
    handleResume,
    handleStartFromBeginning,
  };
}
