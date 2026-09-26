'use client';
import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { AUDIO_SKIP_SECONDS, AudioSkipSeconds } from '@/types/cambridgeTests';
import IeltsAudioSkipButton from './IeltsAudioSkipButton';

interface IeltsAudioControlsRowProps {
  isPlaying: boolean;
  isLoading?: boolean;
  onTogglePlay: () => void;
  onSkip: (seconds: AudioSkipSeconds) => void;
}

export const IeltsAudioControlsRow: React.FC<IeltsAudioControlsRowProps> = ({
  isPlaying,
  isLoading = false,
  onTogglePlay,
  onSkip,
}) => {
  return (
    <div className='flex items-center justify-center gap-1.5'>
      <IeltsAudioSkipButton
        seconds={AUDIO_SKIP_SECONDS.REWIND_10}
        onSkip={onSkip}
        disabled={isLoading}
      />
      <IeltsAudioSkipButton
        seconds={AUDIO_SKIP_SECONDS.REWIND_5}
        onSkip={onSkip}
        disabled={isLoading}
      />

      <button
        type='button'
        onClick={onTogglePlay}
        disabled={isLoading}
        className='mx-1 flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-40'
        title={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
      >
        {isPlaying ? (
          <FaPause className='h-4 w-4' />
        ) : (
          <FaPlay className='h-4 w-4 ml-0.5' />
        )}
      </button>

      <IeltsAudioSkipButton
        seconds={AUDIO_SKIP_SECONDS.FORWARD_5}
        onSkip={onSkip}
        disabled={isLoading}
      />
      <IeltsAudioSkipButton
        seconds={AUDIO_SKIP_SECONDS.FORWARD_10}
        onSkip={onSkip}
        disabled={isLoading}
      />
    </div>
  );
};

export default IeltsAudioControlsRow;
