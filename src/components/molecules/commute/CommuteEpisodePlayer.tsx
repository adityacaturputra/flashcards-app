'use client';
import React from 'react';
import {
  FaPlay,
  FaPause,
  FaBackwardStep,
  FaForwardStep,
  FaRotateLeft,
  FaRotateRight,
  FaRepeat,
  FaDownload,
  FaHeadphones,
} from 'react-icons/fa6';
import {
  COMMUTE_PHASE_LABELS,
  COMMUTE_PLAYBACK_SPEEDS,
  CommuteChapterMarker,
  CommuteEpisode,
  CommutePlaybackSpeed,
} from '@/types/commute';

interface CommuteEpisodePlayerProps {
  episode: CommuteEpisode;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: CommutePlaybackSpeed;
  isLooping: boolean;
  activeChapter: CommuteChapterMarker | null;
  activeChapterIndex: number;
  onTogglePlay: () => void;
  onSeek: (timeSec: number) => void;
  onSkip: (deltaSec: number) => void;
  onJumpToChapter: (index: number) => void;
  onSetPlaybackSpeed: (speed: CommutePlaybackSpeed) => void;
  onToggleLoop: () => void;
  onDownloadMp3: () => void;
}

function formatClock(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const mins = Math.floor(safe / 60);
  const rem = safe % 60;
  return `${mins}:${rem.toString().padStart(2, '0')}`;
}

export const CommuteEpisodePlayer: React.FC<CommuteEpisodePlayerProps> = ({
  episode,
  audioRef,
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  isLooping,
  activeChapter,
  activeChapterIndex,
  onTogglePlay,
  onSeek,
  onSkip,
  onJumpToChapter,
  onSetPlaybackSpeed,
  onToggleLoop,
  onDownloadMp3,
}) => {
  const totalSec = duration || episode.totalDurationSec;

  return (
    <section
      className='rounded-2xl border p-4 sm:p-6 shadow-sm space-y-5'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <audio ref={audioRef} preload='metadata' playsInline className='hidden' />

      {/* Top status bar */}
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[11px] font-bold'>
              <FaHeadphones className='h-3 w-3' />
              iOS Safari Background Ready
            </span>
            {activeChapter && (
              <span
                className='rounded-full px-2.5 py-0.5 text-[11px] font-semibold'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--foreground)',
                }}
              >
                {COMMUTE_PHASE_LABELS[activeChapter.phase]}
              </span>
            )}
          </div>
          <h2 className='mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground truncate'>
            {activeChapter?.cardQuestion ?? episode.title}
          </h2>
          <p className='text-xs text-muted-foreground mt-0.5'>
            {episode.title} · Segmen {Math.max(1, activeChapterIndex + 1)}/{episode.chapters.length}
          </p>
        </div>

        <button
          type='button'
          onClick={onDownloadMp3}
          className='min-h-[44px] inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold text-foreground hover:opacity-80 transition-opacity shrink-0'
          style={{
            background: 'var(--secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <FaDownload className='h-3.5 w-3.5' />
          <span>MP3</span>
        </button>
      </div>

      {/* Scrubber */}
      <div className='space-y-1.5'>
        <input
          type='range'
          min={0}
          max={Math.max(totalSec, 1)}
          step={0.5}
          value={Math.min(currentTime, totalSec)}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-label='Audio timeline scrubber'
          className='w-full accent-foreground cursor-pointer h-2'
        />
        <div className='flex justify-between text-xs font-medium text-muted-foreground tabular-nums'>
          <span>{formatClock(currentTime)}</span>
          <span>{formatClock(totalSec)}</span>
        </div>
      </div>

      {/* Large Mount-Friendly Transport Controls (48px–56px targets) */}
      <div className='flex items-center justify-center gap-3 sm:gap-5'>
        <button
          type='button'
          onClick={() => onJumpToChapter(Math.max(0, activeChapterIndex - 1))}
          aria-label='Kartu sebelumnya'
          className='min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full border text-foreground hover:opacity-80 transition-opacity'
          style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
        >
          <FaBackwardStep className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => onSkip(-10)}
          aria-label='Mundur 10 detik'
          className='min-h-[48px] min-w-[48px] !inline-flex !flex-col items-center justify-center rounded-full border text-foreground hover:opacity-80 transition-opacity'
          style={{
            borderColor: 'var(--border)',
            background: 'var(--secondary)',
            flexDirection: 'column',
          }}
        >
          <FaRotateLeft className='h-3.5 w-3.5' />
          <span className='text-[9px] font-bold leading-none mt-0.5'>10s</span>
        </button>

        <button
          type='button'
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Jeda audio' : 'Putar audio'}
          className='h-14 w-14 inline-flex items-center justify-center rounded-full shadow-md transition-transform active:scale-95'
          style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
          }}
        >
          {isPlaying ? (
            <FaPause className='h-5 w-5' />
          ) : (
            <FaPlay className='h-5 w-5 ml-0.5' />
          )}
        </button>

        <button
          type='button'
          onClick={() => onSkip(10)}
          aria-label='Maju 10 detik'
          className='min-h-[48px] min-w-[48px] !inline-flex !flex-col items-center justify-center rounded-full border text-foreground hover:opacity-80 transition-opacity'
          style={{
            borderColor: 'var(--border)',
            background: 'var(--secondary)',
            flexDirection: 'column',
          }}
        >
          <FaRotateRight className='h-3.5 w-3.5' />
          <span className='text-[9px] font-bold leading-none mt-0.5'>10s</span>
        </button>

        <button
          type='button'
          onClick={() =>
            onJumpToChapter(Math.min(episode.chapters.length - 1, activeChapterIndex + 1))
          }
          aria-label='Kartu berikutnya'
          className='min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full border text-foreground hover:opacity-80 transition-opacity'
          style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
        >
          <FaForwardStep className='h-4 w-4' />
        </button>
      </div>

      {/* Speed & Loop Row */}
      <div className='flex flex-wrap items-center justify-between gap-2 pt-2 border-t' style={{ borderColor: 'var(--border)' }}>
        <div
          className='inline-flex items-center rounded-xl p-1 gap-1'
          style={{ background: 'var(--secondary)' }}
        >
          {COMMUTE_PLAYBACK_SPEEDS.map((speed) => {
            const active = playbackSpeed === speed;
            return (
              <button
                key={speed}
                type='button'
                onClick={() => onSetPlaybackSpeed(speed)}
                className={`min-h-[36px] rounded-lg px-3 text-xs transition-all ${
                  active
                    ? 'font-bold text-foreground shadow-sm border'
                    : 'font-medium text-muted-foreground'
                }`}
                style={{
                  background: active ? 'var(--card)' : 'transparent',
                  borderColor: active ? 'var(--border)' : 'transparent',
                }}
              >
                {speed}x
              </button>
            );
          })}
        </div>

        <button
          type='button'
          onClick={onToggleLoop}
          className={`min-h-[40px] inline-flex items-center gap-1.5 rounded-xl border px-3 text-xs transition-all ${
            isLooping ? 'font-bold text-foreground shadow-sm' : 'font-medium text-muted-foreground'
          }`}
          style={{
            background: isLooping ? 'var(--card)' : 'var(--secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <FaRepeat className='h-3.5 w-3.5' />
          <span>{isLooping ? 'Loop Aktif' : 'Loop Episode'}</span>
        </button>
      </div>

      <p className='text-[11px] text-muted-foreground leading-relaxed'>
        Tips iOS Safari: Tekan <strong>Play</strong> dulu, lalu langsung pindah ke{' '}
        <strong>Google Maps / Apple Maps</strong>. Audio akan tetap berjalan di background dan otomatis mengecil saat navigasi Maps berbicara.
      </p>
    </section>
  );
};

export default CommuteEpisodePlayer;
