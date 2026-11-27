'use client';
import React from 'react';
import {
  FaBackwardStep,
  FaBookOpen,
  FaDownload,
  FaForwardStep,
  FaPause,
  FaPlay,
  FaRotateLeft,
  FaRotateRight,
} from 'react-icons/fa6';
import {
  AUDIOBOOK_SKIP_SECONDS,
  AUDIOBOOK_SPEED_OPTIONS,
} from '@/constants/audiobooks';
import { AudiobookEpisode, AudiobookPlaybackSpeed } from '@/types/audiobook';
import { formatAudioTime } from '@/utils/audiobookFormatters';

interface AudiobookPlayerCardProps {
  episode: AudiobookEpisode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: AudiobookPlaybackSpeed;
  hasPrevious: boolean;
  hasNext: boolean;
  onTogglePlay: () => void;
  onSeekTo: (timeSec: number) => void;
  onSkipBy: (deltaSec: number) => void;
  onSpeedChange: (speed: AudiobookPlaybackSpeed) => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenScript: () => void;
}

export const AudiobookPlayerCard: React.FC<AudiobookPlayerCardProps> = ({
  episode,
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  hasPrevious,
  hasNext,
  onTogglePlay,
  onSeekTo,
  onSkipBy,
  onSpeedChange,
  onPrevious,
  onNext,
  onOpenScript,
}) => {
  const safeDuration = duration > 0 ? duration : 0;

  return (
    <section
      className='rounded-2xl border p-4 sm:p-6 shadow-xs space-y-4'
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <span className='text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400'>
            Modul {episode.moduleId} · Episode{' '}
            {String(episode.episodeNumber).padStart(2, '0')}
          </span>
          <h2 className='text-base sm:text-lg font-bold text-foreground leading-snug mt-0.5'>
            {episode.title}
          </h2>
          <p className='text-xs text-muted-foreground mt-1 leading-relaxed'>
            {episode.focus}
          </p>
        </div>
      </div>

      {/* Progress Scrubber */}
      <div className='space-y-1.5'>
        <input
          type='range'
          min={0}
          max={safeDuration || 100}
          step={1}
          value={Math.min(currentTime, safeDuration || 100)}
          onChange={(e) => onSeekTo(Number(e.target.value))}
          aria-label='Posisi pemutaran audio'
          className='w-full accent-emerald-600 cursor-pointer h-2 rounded-lg'
        />
        <div className='flex items-center justify-between text-xs font-mono text-muted-foreground'>
          <span>{formatAudioTime(currentTime)}</span>
          <span>{formatAudioTime(safeDuration)}</span>
        </div>
      </div>

      {/* Primary Transport Controls (>= 44px touch targets) */}
      <div className='flex items-center justify-center gap-2 sm:gap-4'>
        <button
          type='button'
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-label='Episode sebelumnya'
          className='min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border text-foreground disabled:opacity-35 transition-opacity'
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
        >
          <FaBackwardStep className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => onSkipBy(-AUDIOBOOK_SKIP_SECONDS)}
          aria-label={`Mundur ${AUDIOBOOK_SKIP_SECONDS} detik`}
          className='min-h-[44px] px-3 inline-flex items-center gap-1.5 rounded-xl border text-xs font-bold text-foreground hover:opacity-85 transition-opacity'
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
        >
          <FaRotateLeft className='h-3.5 w-3.5' />
          <span>-{AUDIOBOOK_SKIP_SECONDS}s</span>
        </button>

        <button
          type='button'
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Jeda audiobook' : 'Putar audiobook'}
          className='min-h-[54px] min-w-[54px] inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors'
        >
          {isPlaying ? (
            <FaPause className='h-5 w-5' />
          ) : (
            <FaPlay className='h-5 w-5 ml-0.5' />
          )}
        </button>

        <button
          type='button'
          onClick={() => onSkipBy(AUDIOBOOK_SKIP_SECONDS)}
          aria-label={`Maju ${AUDIOBOOK_SKIP_SECONDS} detik`}
          className='min-h-[44px] px-3 inline-flex items-center gap-1.5 rounded-xl border text-xs font-bold text-foreground hover:opacity-85 transition-opacity'
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
        >
          <span>+{AUDIOBOOK_SKIP_SECONDS}s</span>
          <FaRotateRight className='h-3.5 w-3.5' />
        </button>

        <button
          type='button'
          onClick={onNext}
          disabled={!hasNext}
          aria-label='Episode berikutnya'
          className='min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border text-foreground disabled:opacity-35 transition-opacity'
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
        >
          <FaForwardStep className='h-4 w-4' />
        </button>
      </div>

      {/* Speed Selector & Secondary Actions */}
      <div className='flex flex-wrap items-center justify-between gap-2 pt-2 border-t' style={{ borderColor: 'var(--border)' }}>
        <div
          className='inline-flex items-center rounded-xl p-1 border'
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
        >
          {AUDIOBOOK_SPEED_OPTIONS.map((speed) => {
            const active = playbackSpeed === speed;
            return (
              <button
                key={speed}
                type='button'
                onClick={() => onSpeedChange(speed)}
                className={`min-h-[34px] px-2.5 rounded-lg text-xs transition-all ${
                  active
                    ? 'font-bold text-foreground shadow-xs'
                    : 'font-medium text-muted-foreground hover:text-foreground'
                }`}
                style={active ? { background: 'var(--card)' } : undefined}
              >
                {speed}x
              </button>
            );
          })}
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={onOpenScript}
            className='min-h-[40px] px-3 inline-flex items-center gap-1.5 rounded-xl border text-xs font-semibold text-foreground hover:opacity-85 transition-opacity'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            <FaBookOpen className='h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400' />
            <span>Baca Skrip</span>
          </button>

          <a
            href={episode.audioUrl}
            download={episode.downloadFilename}
            className='min-h-[40px] px-3 inline-flex items-center gap-1.5 rounded-xl border text-xs font-semibold text-foreground hover:opacity-85 transition-opacity'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            <FaDownload className='h-3.5 w-3.5 text-muted-foreground' />
            <span>MP3</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AudiobookPlayerCard;
