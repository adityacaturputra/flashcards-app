'use client';
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRotateLeft } from 'react-icons/fa6';
import {
  REBUTTAL_PLAYBACK_SPEED,
  RebuttalPlaybackSpeed,
} from '@/types/rebuttal';

interface RebuttalAudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export const RebuttalAudioPlayer: React.FC<RebuttalAudioPlayerProps> = ({
  audioUrl,
  autoPlay = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [speed, setSpeed] = useState<RebuttalPlaybackSpeed>(
    REBUTTAL_PLAYBACK_SPEED.NORMAL
  );

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      audioRef.current.currentTime = 0;
      if (autoPlay) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [audioUrl, autoPlay, speed]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleSpeedChange = (newSpeed: RebuttalPlaybackSpeed) => {
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const formatSec = (secs: number) => {
    const s = Math.floor(secs % 60);
    const m = Math.floor(secs / 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className='rounded-xl border p-3 flex flex-col gap-2.5 shadow-xs transition-colors'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        preload='metadata'
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <button
            onClick={togglePlay}
            className='flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white hover:bg-teal-700 active:scale-95 transition-all shadow-xs'
            title={isPlaying ? 'Jeda Audio' : 'Putar Audio Cuplikan Cambridge'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause className='h-4 w-4' /> : <FaPlay className='h-4 w-4 ml-0.5' />}
          </button>

          <button
            onClick={handleReplay}
            className='flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 hover:bg-secondary active:scale-95 transition-all text-muted-foreground hover:text-foreground'
            title='Ulangi dari Awal'
            aria-label='Replay'
          >
            <FaRotateLeft className='h-3.5 w-3.5' />
          </button>

          <span className='text-xs font-mono text-muted-foreground font-medium pl-1'>
            {formatSec(currentTime)} / {formatSec(duration)}
          </span>
        </div>

        {/* Speed Switcher */}
        <div className='flex items-center gap-1 rounded-lg bg-secondary/80 p-0.5 border border-border/50 text-[11px] font-semibold'>
          {([0.8, 1.0, 1.2] as RebuttalPlaybackSpeed[]).map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-2 py-0.5 rounded-md transition-all ${
                speed === s
                  ? 'bg-card text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className='h-1.5 w-full bg-secondary rounded-full overflow-hidden'>
        <div
          className='h-full bg-teal-600 transition-all duration-150 rounded-full'
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default RebuttalAudioPlayer;
