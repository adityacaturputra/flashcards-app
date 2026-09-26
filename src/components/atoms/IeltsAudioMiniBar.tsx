'use client';
import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { AUDIO_SKIP_SECONDS, AudioSkipSeconds } from '@/types/cambridgeTests';
import IeltsAudioSkipButton from './IeltsAudioSkipButton';

interface IeltsAudioMiniBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkip: (seconds: AudioSkipSeconds) => void;
}

export const IeltsAudioMiniBar: React.FC<IeltsAudioMiniBarProps> = ({
  isPlaying,
  onTogglePlay,
  onSkip,
}) => {
  return (
    <div className='flex items-center justify-between p-2 px-3 gap-2'>
      <button
        type='button'
        onClick={onTogglePlay}
        className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition-all shrink-0'
        title={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
      >
        {isPlaying ? (
          <FaPause className='h-3 w-3' />
        ) : (
          <FaPlay className='h-3 w-3 ml-0.5' />
        )}
      </button>
      <div className='flex items-center gap-1.5'>
        <IeltsAudioSkipButton
          seconds={AUDIO_SKIP_SECONDS.REWIND_5}
          onSkip={onSkip}
        />
        <IeltsAudioSkipButton
          seconds={AUDIO_SKIP_SECONDS.FORWARD_5}
          onSkip={onSkip}
        />
      </div>
    </div>
  );
};

export default IeltsAudioMiniBar;
