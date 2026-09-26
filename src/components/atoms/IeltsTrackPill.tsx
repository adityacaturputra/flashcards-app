'use client';
import React from 'react';
import { CambridgeTrack } from '@/types/cambridgeTests';

interface IeltsTrackPillProps {
  track: CambridgeTrack;
  isActive: boolean;
  onSelect: (track: CambridgeTrack) => void;
}

export const IeltsTrackPill: React.FC<IeltsTrackPillProps> = ({
  track,
  isActive,
  onSelect,
}) => {
  return (
    <button
      type='button'
      onClick={() => onSelect(track)}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
        isActive
          ? 'bg-card text-foreground font-bold shadow-xs border border-border scale-[1.02]'
          : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
      }`}
      style={{
        background: isActive ? 'var(--card)' : 'transparent',
      }}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? 'bg-purple-500 animate-pulse' : 'bg-muted-foreground/40'
        }`}
      />
      <span>Part {track.section}</span>
    </button>
  );
};

export default IeltsTrackPill;
