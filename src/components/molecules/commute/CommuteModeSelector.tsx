'use client';
import React from 'react';
import {
  COMMUTE_MODE,
  COMMUTE_MODE_META,
  CommuteMode,
} from '@/types/commute';

interface CommuteModeSelectorProps {
  selectedMode: CommuteMode;
  onSelectMode: (mode: CommuteMode) => void;
}

export const CommuteModeSelector: React.FC<CommuteModeSelectorProps> = ({
  selectedMode,
  onSelectMode,
}) => (
  <div className='space-y-2'>
    <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
      1. Pola Belajar Ilmiah
    </label>
    <div
      className='grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl overflow-hidden'
      style={{ background: 'var(--secondary)' }}
    >
      {(Object.values(COMMUTE_MODE) as CommuteMode[]).map((mode) => {
        const meta = COMMUTE_MODE_META[mode];
        const active = selectedMode === mode;
        return (
          <button
            key={mode}
            type='button'
            onClick={() => onSelectMode(mode)}
            className={`!flex !flex-col !items-stretch !justify-start w-full min-w-0 min-h-[44px] !whitespace-normal !text-left rounded-xl p-3 transition-all border ${
              active ? 'shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
            }`}
            style={{
              background: active ? 'var(--card)' : 'transparent',
              borderColor: active ? 'var(--border)' : 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              whiteSpace: 'normal',
              textAlign: 'left',
            }}
          >
            <div className='flex items-center justify-between gap-2 w-full min-w-0'>
              <span
                className={`text-sm truncate ${
                  active
                    ? 'font-bold text-foreground'
                    : 'font-semibold text-muted-foreground'
                }`}
              >
                {meta.title}
              </span>
              <span
                className='rounded-md px-1.5 py-0.5 text-[10px] font-bold shrink-0'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--foreground)',
                }}
              >
                {meta.badge}
              </span>
            </div>
            <p className='mt-1.5 text-xs text-muted-foreground leading-snug break-words whitespace-normal'>
              {meta.description}
            </p>
          </button>
        );
      })}
    </div>
  </div>
);

export default CommuteModeSelector;
