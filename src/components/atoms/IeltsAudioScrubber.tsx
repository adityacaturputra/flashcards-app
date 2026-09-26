'use client';
import React from 'react';
import { formatAudioDuration } from '@/utils/cambridgeAudioUtils';

interface IeltsAudioScrubberProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

export const IeltsAudioScrubber: React.FC<IeltsAudioScrubberProps> = ({
  currentTime,
  duration,
  onSeek,
  disabled = false,
}) => {
  return (
    <div className='flex flex-col gap-1 w-full select-none'>
      <div className='relative flex items-center w-full group'>
        <input
          type='range'
          min={0}
          max={duration || 100}
          step={0.5}
          value={currentTime}
          disabled={disabled || duration === 0}
          onChange={(e) => onSeek(Number(e.target.value))}
          className='w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-hidden disabled:opacity-40'
        />
      </div>

      <div className='flex items-center justify-between text-[11px] font-mono font-medium text-muted-foreground'>
        <span>{formatAudioDuration(currentTime)}</span>
        <span>{formatAudioDuration(duration)}</span>
      </div>
    </div>
  );
};

export default IeltsAudioScrubber;
