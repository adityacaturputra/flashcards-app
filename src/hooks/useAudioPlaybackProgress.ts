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
  audioSrc?: string | null;
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
 * on pause, on seek, and on iOS Safari visibilitychange/pagehide) plus hands-free
 * auto-resume on `loadedmetadata` with anti-overwrite protection.
 */
export function useAudioPlaybackProgress({
  episodeKey,
  audioSrc,
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
  const pendingAutoResumeSecRef = useRef<number | null>(null);
  const onSeekRef = useRef(onSeek);
  const latestStateRef = useRef({
    episodeKey,
    currentTime,
    duration,
    activeChapterIndex,
  });

  onSeekRef.current = onSeek;
  latestStateRef.current = {
    episodeKey,
    currentTime,
    duration,
    activeChapterIndex,
  };

  const applyPendingAutoResume = useCallback(() => {
    const targetSec = pendingAutoResumeSecRef.current;
    const audio = audioRef.current;
    if (targetSec === null || !audio) return false;
    if (audio.readyState < 1) return false;

    pendingAutoResumeSecRef.current = null;
    onSeekRef.current(targetSec);
    return true;
  }, [audioRef]);

  // Load saved progress and arm hands-free auto-resume whenever a new episode or audioSrc mounts
  useEffect(() => {
    lastSavedAtRef.current = 0;
    pendingAutoResumeSecRef.current = null;

    if (!episodeKey) {
      setSavedProgress(null);
      setShowResumePrompt(false);
      return;
    }

    const existing = loadAudioProgress(episodeKey);
    const resumable = isResumableProgress(existing);
    setSavedProgress(existing);
    setShowResumePrompt(resumable);

    if (!resumable || !existing) return;

    const targetSec = getResumeTargetSec(existing.currentTimeSec);
    pendingAutoResumeSecRef.current = targetSec;

    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      applyPendingAutoResume();
    };

    if (audio.readyState >= 1) {
      applyPendingAutoResume();
    } else {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [episodeKey, audioSrc, audioRef, applyPendingAutoResume]);

  const persistNow = useCallback(
    (overrideTimeSec?: number) => {
      // Block auto-save while initial auto-resume seek is still pending (prevents 0:00 overwrite)
      if (pendingAutoResumeSecRef.current !== null && overrideTimeSec === undefined) {
        return;
      }

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

  // Dismiss the auto-resume status strip once playback actively begins
  useEffect(() => {
    if (isPlaying && showResumePrompt) {
      setShowResumePrompt(false);
    }
  }, [isPlaying, showResumePrompt]);

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
    pendingAutoResumeSecRef.current = null;
    const targetSec = getResumeTargetSec(savedProgress.currentTimeSec);
    onSeek(targetSec);
    setShowResumePrompt(false);
    persistNow(targetSec);
    onPlay?.();
  }, [savedProgress, onSeek, onPlay, persistNow]);

  const handleStartFromBeginning = useCallback(() => {
    pendingAutoResumeSecRef.current = null;
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
    applyPendingAutoResume,
    handleResume,
    handleStartFromBeginning,
  };
}
