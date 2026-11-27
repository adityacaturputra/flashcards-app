'use client';
import React from 'react';
import { FaPlay, FaRotateLeft } from 'react-icons/fa6';
import {
  AudioPlaybackProgress,
  formatAudioClock,
} from '@/utils/audioPlaybackProgress';

interface CommuteResumeBannerProps {
  savedProgress: AudioPlaybackProgress;
  onResume: () => void;
  onRestart: () => void;
}

export const CommuteResumeBanner: React.FC<CommuteResumeBannerProps> = ({
  savedProgress,
  onResume,
  onRestart,
}) => {
  const resumeLabel = formatAudioClock(savedProgress.currentTimeSec);
  const totalLabel =
    savedProgress.durationSec > 0
      ? ` / ${formatAudioClock(savedProgress.durationSec)}`
      : '';

  return (
    <div
      className='rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3'
      style={{
        background: 'var(--secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='min-w-0'>
        <p className='text-xs font-bold text-foreground'>
          Posisi terakhir tersimpan ({resumeLabel}
          {totalLabel})
        </p>
        <p className='text-[11px] text-muted-foreground mt-0.5'>
          Lanjutkan otomatis mundur 3 detik agar konteks kalimat tetap nyambung.
        </p>
      </div>

      <div className='flex items-center gap-2 shrink-0'>
        <button
          type='button'
          onClick={onResume}
          className='min-h-[48px] flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-sm transition-transform active:scale-95'
          style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
          }}
        >
          <FaPlay className='h-3.5 w-3.5' />
          <span>Lanjutkan dari {resumeLabel}</span>
        </button>

        <button
          type='button'
          onClick={onRestart}
          className='min-h-[48px] inline-flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold text-foreground hover:opacity-80 transition-opacity'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <FaRotateLeft className='h-3 w-3' />
          <span>Mulai dari 0:00</span>
        </button>
      </div>
    </div>
  );
};

export default CommuteResumeBanner;
