'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  AUDIO_PLAYBACK_SPEED,
  AudioPlaybackSpeed,
} from '@/types/cambridgeTests';

interface UseIeltsAudioPlayerOptions {
  audioUrl: string;
  fallbackAudioUrl?: string;
  autoPlayOnChange?: boolean;
}

export const useIeltsAudioPlayer = ({
  audioUrl,
  fallbackAudioUrl,
  autoPlayOnChange = false,
}: UseIeltsAudioPlayerOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState<AudioPlaybackSpeed>(
    AUDIO_PLAYBACK_SPEED.NORMAL
  );
  const [isLoading, setIsLoading] = useState(false);

  // Sync playback speed whenever audio element or speed state changes
  const setPlaybackSpeed = useCallback((speed: AudioPlaybackSpeed) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  // Handle URL change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    audio.load();

    if (autoPlayOnChange) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [audioUrl, autoPlayOnChange]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      audio.playbackRate = playbackSpeed;
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      if (fallbackAudioUrl && audio.src !== fallbackAudioUrl) {
        audio.src = fallbackAudioUrl;
        audio.load();
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [playbackSpeed, fallbackAudioUrl]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(time, audio.duration || 0));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const skip = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const target = Math.max(
      0,
      Math.min(audio.currentTime + seconds, audio.duration || 0)
    );
    audio.currentTime = target;
    setCurrentTime(target);
  }, []);

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    togglePlay,
    seek,
    skip,
    setPlaybackSpeed,
  };
};
