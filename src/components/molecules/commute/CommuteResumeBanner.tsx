'use client';
import React from 'react';
import { FaRotateLeft } from 'react-icons/fa6';
import {
  AUDIO_PROGRESS_REWIND_CONTEXT_SEC,
  AudioPlaybackProgress,
  formatAudioClock,
  getResumeTargetSec,
} from '@/utils/audioPlaybackProgress';

interface CommuteResumeBannerProps {
  savedProgress: AudioPlaybackProgress;
  onResume?: () => void;
  onRestart: () => void;
}

export const CommuteResumeBanner: React.FC<CommuteResumeBannerProps> = ({
  savedProgress,
  onRestart,
}) => {
  const targetSec = getResumeTargetSec(savedProgress.currentTimeSec);
  const targetLabel = formatAudioClock(targetSec);

  return (
    <div
      className='rounded-xl border px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2'
      style={{
        background: 'var(--secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <p className='text-xs font-medium text-foreground tabular-nums'>
        Otomatis siap dilanjutkan dari{' '}
        <span className='font-bold'>{targetLabel}</span>{' '}
        <span className='text-muted-foreground'>
          (-{AUDIO_PROGRESS_REWIND_CONTEXT_SEC}s)
        </span>
      </p>

      <button
        type='button'
        onClick={onRestart}
        className='min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold text-foreground hover:opacity-80 transition-opacity shrink-0'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <FaRotateLeft className='h-3 w-3' />
        <span>Mulai dari 0:00</span>
      </button>
    </div>
  );
};

export default CommuteResumeBanner;
