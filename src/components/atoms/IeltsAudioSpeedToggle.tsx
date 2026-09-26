'use client';
import React from 'react';
import {
  AUDIO_PLAYBACK_SPEED,
  AudioPlaybackSpeed,
} from '@/types/cambridgeTests';

interface IeltsAudioSpeedToggleProps {
  currentSpeed: AudioPlaybackSpeed;
  onSelectSpeed: (speed: AudioPlaybackSpeed) => void;
  compact?: boolean;
}

const SPEED_OPTIONS: { label: string; value: AudioPlaybackSpeed }[] = [
  { label: '0.75x', value: AUDIO_PLAYBACK_SPEED.SLOW },
  { label: '1.0x', value: AUDIO_PLAYBACK_SPEED.NORMAL },
  { label: '1.25x', value: AUDIO_PLAYBACK_SPEED.MEDIUM_FAST },
  { label: '1.5x', value: AUDIO_PLAYBACK_SPEED.FAST },
  { label: '2.0x', value: AUDIO_PLAYBACK_SPEED.DOUBLE },
];

export const IeltsAudioSpeedToggle: React.FC<IeltsAudioSpeedToggleProps> = ({
  currentSpeed,
  onSelectSpeed,
  compact = false,
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-lg p-0.5 border ${
        compact ? 'gap-0.5' : 'gap-1'
      }`}
      style={{
        background: 'var(--secondary)',
        borderColor: 'var(--border)',
      }}
      role='group'
      aria-label='Audio playback speed'
    >
      {SPEED_OPTIONS.map((opt) => {
        const isActive = currentSpeed === opt.value;
        return (
          <button
            key={opt.value}
            type='button'
            onClick={() => onSelectSpeed(opt.value)}
            className={`rounded-md transition-all font-medium select-none ${
              compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'
            } ${
              isActive
                ? 'bg-card text-foreground font-bold shadow-xs border border-border/50 scale-[1.02]'
                : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default IeltsAudioSpeedToggle;
