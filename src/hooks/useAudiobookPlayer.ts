'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  AUDIOBOOK_SERIES_META,
  AUDIOBOOK_SKIP_SECONDS,
  AUDIOBOOK_SPEEDS,
} from '@/constants/audiobooks';
import {
  AudiobookEpisode,
  AudiobookPlaybackSpeed,
} from '@/types/audiobook';

interface NavigatorWithAudioSession extends Navigator {
  audioSession?: { type: string };
}

interface UseAudiobookPlayerOptions {
  episode: AudiobookEpisode;
  initialTimeSec: number;
  onSaveProgress: (
    episodeId: string,
    currentTime: number,
    duration: number,
    force?: boolean
  ) => void;
  onPreviousEpisode: () => void;
  onNextEpisode: () => void;
}

export function useAudiobookPlayer({
  episode,
  initialTimeSec,
  onSaveProgress,
  onPreviousEpisode,
  onNextEpisode,
}: UseAudiobookPlayerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const resumeTimeRef = useRef<number>(initialTimeSec);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTimeSec);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] =
    useState<AudiobookPlaybackSpeed>(AUDIOBOOK_SPEEDS.NORMAL);

  const ensureIosAudioSession = useCallback(() => {
    if (typeof navigator === 'undefined') return;
    const nav = navigator as NavigatorWithAudioSession;
    if (nav.audioSession) {
      try {
        nav.audioSession.type = 'playback';
      } catch {
        // Ignore unsupported audioSession mutation
      }
    }
  }, []);

  // Load new episode & prepare resume timestamp
  useEffect(() => {
    resumeTimeRef.current = initialTimeSec;
    setCurrentTime(initialTimeSec);
    setDuration(0);
    setIsPlaying(false);

    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = episode.audioUrl;
    audio.load();
  }, [episode.id, episode.audioUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // Audio element event bindings + flush progress on pause/ended/visibilitychange
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        const resumeAt = resumeTimeRef.current;
        if (resumeAt > 0 && resumeAt < audio.duration - 2) {
          audio.currentTime = resumeAt;
          setCurrentTime(resumeAt);
        }
      }
      audio.playbackRate = playbackSpeed;
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onSaveProgress(episode.id, audio.currentTime, audio.duration, false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      onSaveProgress(episode.id, audio.currentTime, audio.duration, true);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      onSaveProgress(episode.id, audio.duration, audio.duration, true);
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        onSaveProgress(episode.id, audio.currentTime, audio.duration, true);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [episode.id, playbackSpeed, onSaveProgress]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureIosAudioSession();
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [ensureIosAudioSession]);

  const seekTo = useCallback(
    (timeSec: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const maxDur = Number.isFinite(audio.duration) ? audio.duration : duration;
      const clamped = Math.max(0, Math.min(maxDur || timeSec, timeSec));
      audio.currentTime = clamped;
      setCurrentTime(clamped);
      onSaveProgress(episode.id, clamped, maxDur, true);
    },
    [duration, episode.id, onSaveProgress]
  );

  const skipBy = useCallback(
    (deltaSec: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      seekTo(audio.currentTime + deltaSec);
    },
    [seekTo]
  );

  const setPlaybackSpeed = useCallback((speed: AudiobookPlaybackSpeed) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, []);

  // Media Session API for iOS Lock Screen & helmet intercom controls
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }
    const ms = navigator.mediaSession;
    try {
      ms.metadata = new MediaMetadata({
        title: `Ep ${String(episode.episodeNumber).padStart(2, '0')}: ${episode.title}`,
        artist: AUDIOBOOK_SERIES_META.ARTIST,
        album: `Modul ${episode.moduleId}: ${episode.moduleTitle}`,
      });
      ms.playbackState = isPlaying ? 'playing' : 'paused';

      ms.setActionHandler('play', () => {
        ensureIosAudioSession();
        audioRef.current?.play().catch(() => {});
      });
      ms.setActionHandler('pause', () => audioRef.current?.pause());
      ms.setActionHandler('seekbackward', (details) => {
        skipBy(-(details.seekOffset ?? AUDIOBOOK_SKIP_SECONDS));
      });
      ms.setActionHandler('seekforward', (details) => {
        skipBy(details.seekOffset ?? AUDIOBOOK_SKIP_SECONDS);
      });
      ms.setActionHandler('previoustrack', onPreviousEpisode);
      ms.setActionHandler('nexttrack', onNextEpisode);
      ms.setActionHandler('seekto', (details) => {
        if (typeof details.seekTime === 'number') seekTo(details.seekTime);
      });
    } catch {
      // Ignore unsupported Media Session handlers
    }
  }, [
    episode,
    isPlaying,
    ensureIosAudioSession,
    skipBy,
    seekTo,
    onPreviousEpisode,
    onNextEpisode,
  ]);

  // Sync Media Session position state for Lock Screen scrubber
  useEffect(() => {
    if (
      typeof navigator === 'undefined' ||
      !('mediaSession' in navigator) ||
      typeof navigator.mediaSession.setPositionState !== 'function' ||
      duration <= 0
    ) {
      return;
    }
    try {
      navigator.mediaSession.setPositionState({
        duration,
        playbackRate: playbackSpeed,
        position: Math.min(currentTime, duration),
      });
    } catch {
      // Ignore invalid position state
    }
  }, [currentTime, duration, playbackSpeed]);

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    togglePlay,
    seekTo,
    skipBy,
    setPlaybackSpeed,
  };
}
