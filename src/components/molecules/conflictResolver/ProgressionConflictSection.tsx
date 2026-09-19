'use client';
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa6';
import { Flashcard } from '@/types/flashcard';
import { SyncSource, SYNC_SOURCE } from '@/types/sync';

interface ProgressionConflictSectionProps {
  localCard?: Flashcard;
  cloudCard?: Flashcard;
  progressionChoice: SyncSource;
  onChoiceChange: (choice: SyncSource) => void;
}

export const ProgressionConflictSection: React.FC<ProgressionConflictSectionProps> = ({
  localCard,
  cloudCard,
  progressionChoice,
  onChoiceChange,
}) => {
  return (
    <div className='rounded-lg border overflow-hidden' style={{ borderColor: 'var(--border)' }}>
      {/* Header Bar */}
      <div
        className='flex items-center justify-between px-3 py-1.5 border-b'
        style={{
          background: 'var(--secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='flex items-center gap-1.5 min-w-0'>
          <FaGraduationCap className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
          <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground truncate'>
            <span className='hidden xs:inline'>Difficulty / Progression & </span>Anki SRS
          </span>
        </div>
        <div className='flex items-center gap-1.5 shrink-0'>
          <button
            onClick={() => onChoiceChange(SYNC_SOURCE.LOCAL)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
              progressionChoice === SYNC_SOURCE.LOCAL
                ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {progressionChoice === SYNC_SOURCE.LOCAL ? '✓ ' : ''}Local
          </button>
          <button
            onClick={() => onChoiceChange(SYNC_SOURCE.CLOUD)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
              progressionChoice === SYNC_SOURCE.CLOUD
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {progressionChoice === SYNC_SOURCE.CLOUD ? '✓ ' : ''}Cloud
          </button>
        </div>
      </div>

      {/* Comparison Details */}
      <div className='p-2.5 space-y-2 font-mono text-[11px]'>
        {/* Local Difficulty Details */}
        <div
          onClick={() => onChoiceChange(SYNC_SOURCE.LOCAL)}
          className={`p-2.5 rounded-md cursor-pointer border transition-all ${
            progressionChoice === SYNC_SOURCE.LOCAL
              ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-300 ring-1 ring-red-500/30'
              : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
          }`}
        >
          <div className='flex items-center justify-between mb-1.5'>
            <span className='font-bold select-none text-red-500'>- Local:</span>
            <span className='font-sans font-bold uppercase text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'>
              {localCard?.progression || 'new'}
            </span>
          </div>
          <div className='text-[10px] font-sans flex flex-wrap items-center gap-2 text-muted-foreground'>
            <span>Interval: <strong className='text-foreground'>{localCard?.interval ?? 0}d</strong></span>
            <span>•</span>
            <span>Ease: <strong className='text-foreground'>{Math.round((localCard?.easeFactor ?? 2.5) * 100)}%</strong></span>
            <span>•</span>
            <span>Reps: <strong className='text-foreground'>{localCard?.repetitions ?? 0}</strong></span>
            <span>•</span>
            <span>Lapses: <strong className='text-foreground'>{localCard?.lapses ?? 0}</strong></span>
          </div>
        </div>

        {/* Cloud Difficulty Details */}
        <div
          onClick={() => onChoiceChange(SYNC_SOURCE.CLOUD)}
          className={`p-2.5 rounded-md cursor-pointer border transition-all ${
            progressionChoice === SYNC_SOURCE.CLOUD
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
              : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
          }`}
        >
          <div className='flex items-center justify-between mb-1.5'>
            <span className='font-bold select-none text-emerald-500'>+ Cloud:</span>
            <span className='font-sans font-bold uppercase text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'>
              {cloudCard?.progression || 'new'}
            </span>
          </div>
          <div className='text-[10px] font-sans flex flex-wrap items-center gap-2 text-muted-foreground'>
            <span>Interval: <strong className='text-foreground'>{cloudCard?.interval ?? 0}d</strong></span>
            <span>•</span>
            <span>Ease: <strong className='text-foreground'>{Math.round((cloudCard?.easeFactor ?? 2.5) * 100)}%</strong></span>
            <span>•</span>
            <span>Reps: <strong className='text-foreground'>{cloudCard?.repetitions ?? 0}</strong></span>
            <span>•</span>
            <span>Lapses: <strong className='text-foreground'>{cloudCard?.lapses ?? 0}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressionConflictSection;
