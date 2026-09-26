'use client';
import React from 'react';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import { getSkipAriaLabel } from '@/utils/cambridgeAudioUtils';
import { AudioSkipSeconds } from '@/types/cambridgeTests';

interface IeltsAudioSkipButtonProps {
  seconds: AudioSkipSeconds;
  onSkip: (seconds: AudioSkipSeconds) => void;
  disabled?: boolean;
}

export const IeltsAudioSkipButton: React.FC<IeltsAudioSkipButtonProps> = ({
  seconds,
  onSkip,
  disabled = false,
}) => {
  const isRewind = seconds < 0;
  const absSeconds = Math.abs(seconds);

  return (
    <button
      type='button'
      onClick={() => onSkip(seconds)}
      disabled={disabled}
      aria-label={getSkipAriaLabel(seconds)}
      title={getSkipAriaLabel(seconds)}
      className='group relative flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-slate-100 hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-slate-800'
      style={{
        border: '1px solid var(--border)',
      }}
    >
      {isRewind ? (
        <FaRotateLeft className='h-3 w-3 transition-transform group-hover:-rotate-45' />
      ) : (
        <FaRotateRight className='h-3 w-3 transition-transform group-hover:rotate-45' />
      )}
      <span className='font-mono text-[11px] font-bold'>
        {isRewind ? `-${absSeconds}s` : `+${absSeconds}s`}
      </span>
    </button>
  );
};

export default IeltsAudioSkipButton;
