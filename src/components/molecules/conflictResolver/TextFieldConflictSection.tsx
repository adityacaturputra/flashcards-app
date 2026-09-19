'use client';
import React from 'react';
import { SyncSource, SYNC_SOURCE } from '@/types/sync';

interface TextFieldConflictSectionProps {
  label: string;
  localValue?: string;
  cloudValue?: string;
  choice: SyncSource;
  onChoiceChange: (choice: SyncSource) => void;
  isPreWrap?: boolean;
}

export const TextFieldConflictSection: React.FC<TextFieldConflictSectionProps> = ({
  label,
  localValue,
  cloudValue,
  choice,
  onChoiceChange,
  isPreWrap = false,
}) => {
  return (
    <div className='rounded-lg border overflow-hidden' style={{ borderColor: 'var(--border)' }}>
      {/* Header Bar with Toggle Buttons */}
      <div
        className='flex items-center justify-between px-3 py-1.5 border-b'
        style={{
          background: 'var(--secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground'>
          {label}
        </span>
        <div className='flex items-center gap-1.5'>
          <button
            onClick={() => onChoiceChange(SYNC_SOURCE.LOCAL)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
              choice === SYNC_SOURCE.LOCAL
                ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {choice === SYNC_SOURCE.LOCAL ? '✓ ' : ''}Local
          </button>
          <button
            onClick={() => onChoiceChange(SYNC_SOURCE.CLOUD)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
              choice === SYNC_SOURCE.CLOUD
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {choice === SYNC_SOURCE.CLOUD ? '✓ ' : ''}Cloud
          </button>
        </div>
      </div>

      {/* Comparison Boxes */}
      <div className='p-2.5 space-y-2 font-mono text-[11px]'>
        <div
          onClick={() => onChoiceChange(SYNC_SOURCE.LOCAL)}
          className={`p-2 rounded-md cursor-pointer border transition-all ${
            choice === SYNC_SOURCE.LOCAL
              ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-300 ring-1 ring-red-500/30'
              : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
          }`}
        >
          <span className='font-bold select-none text-red-500 mr-2'>- Local:</span>
          <span className={isPreWrap ? 'whitespace-pre-wrap' : ''}>
            {localValue || '(empty)'}
          </span>
        </div>
        <div
          onClick={() => onChoiceChange(SYNC_SOURCE.CLOUD)}
          className={`p-2 rounded-md cursor-pointer border transition-all ${
            choice === SYNC_SOURCE.CLOUD
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
              : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
          }`}
        >
          <span className='font-bold select-none text-emerald-500 mr-2'>+ Cloud:</span>
          <span className={isPreWrap ? 'whitespace-pre-wrap' : ''}>
            {cloudValue || '(empty)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextFieldConflictSection;
