'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  CommuteEpisode,
  CommutePlaybackSpeed,
} from '@/types/commute';

interface NavigatorWithAudioSession extends Navigator {
  audioSession?: {
    type: string;
  };
}

export function useCommuteAudioPlayer(episode: CommuteEpisode | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] =
    useState<CommutePlaybackSpeed>(1.0);
  const [isLooping, setIsLooping] = useState(false);

  // Sync audio session for iOS Safari 17+ so audio plays even when hardware ringer switch is muted
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

  // Reset player only when a new episode is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(episode?.totalDurationSec ?? 0);
    if (episode) {
      audio.src = episode.blobUrl;
      audio.load();
    }
  }, [episode]);

  // Keep loop & speed synced without interrupting active playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = isLooping;
    audio.playbackRate = playbackSpeed;
  }, [isLooping, playbackSpeed]);

  // Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
      audio.playbackRate = playbackSpeed;
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playbackSpeed]);

  const activeChapterIndex = useMemo(() => {
    if (!episode || episode.chapters.length === 0) return -1;
    for (let i = episode.chapters.length - 1; i >= 0; i--) {
      if (currentTime >= episode.chapters[i].startTimeSec - 0.15) {
        return i;
      }
    }
    return 0;
  }, [episode, currentTime]);

  const activeChapter =
    episode && activeChapterIndex >= 0
      ? episode.chapters[activeChapterIndex]
      : null;

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !episode) return;
    ensureIosAudioSession();

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [episode, ensureIosAudioSession]);

  const seek = useCallback(
    (timeSec: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const maxDuration = duration || episode?.totalDurationSec || 0;
      const clamped = Math.max(0, Math.min(timeSec, maxDuration));
      audio.currentTime = clamped;
      setCurrentTime(clamped);
    },
    [duration, episode]
  );

  const skip = useCallback(
    (deltaSec: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      seek(audio.currentTime + deltaSec);
    },
    [seek]
  );

  const jumpToChapter = useCallback(
    (index: number) => {
      if (!episode || !episode.chapters[index]) return;
      seek(episode.chapters[index].startTimeSec);
    },
    [episode, seek]
  );

  const setPlaybackSpeed = useCallback((speed: CommutePlaybackSpeed) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.loop = next;
      }
      return next;
    });
  }, []);

  // Register Media Session API for iOS Lock Screen, Control Center, and Bluetooth Helmet Controls
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator) || !episode) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: activeChapter?.cardQuestion ?? episode.title,
      artist: episode.title,
      album: 'Flashcards Commute Audio',
    });

    const safeSetHandler = (
      action: MediaSessionAction,
      handler: MediaSessionActionHandler | null
    ) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Some browsers do not support every action
      }
    };

    safeSetHandler('play', () => {
      ensureIosAudioSession();
      audioRef.current?.play().catch(() => {});
    });
    safeSetHandler('pause', () => {
      audioRef.current?.pause();
    });
    safeSetHandler('seekbackward', () => skip(-10));
    safeSetHandler('seekforward', () => skip(10));
    safeSetHandler('previoustrack', () => {
      const target = Math.max(0, activeChapterIndex - 1);
      jumpToChapter(target);
    });
    safeSetHandler('nexttrack', () => {
      const target = Math.min(episode.chapters.length - 1, activeChapterIndex + 1);
      jumpToChapter(target);
    });

    return () => {
      safeSetHandler('play', null);
      safeSetHandler('pause', null);
      safeSetHandler('seekbackward', null);
      safeSetHandler('seekforward', null);
      safeSetHandler('previoustrack', null);
      safeSetHandler('nexttrack', null);
    };
  }, [episode, activeChapter, activeChapterIndex, ensureIosAudioSession, skip, jumpToChapter]);

  const downloadEpisodeMp3 = useCallback(() => {
    if (!episode) return;
    const anchor = document.createElement('a');
    anchor.href = episode.blobUrl;
    const safeName = episode.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    anchor.download = `${safeName || 'commute-vocab'}.mp3`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [episode]);

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLooping,
    activeChapterIndex,
    activeChapter,
    togglePlay,
    seek,
    skip,
    jumpToChapter,
    setPlaybackSpeed,
    toggleLoop,
    downloadEpisodeMp3,
  };
}
