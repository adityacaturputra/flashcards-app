'use client';
import React from 'react';
import { FaCodeFork } from 'react-icons/fa6';
import { SyncSource, SYNC_SOURCE } from '@/types/sync';

interface ConflictResolverHeaderProps {
  question: string;
  isResolving: boolean;
  isAllLocalActive: boolean;
  isAllCloudActive: boolean;
  onSelectAll: (choice: SyncSource) => void;
}

export const ConflictResolverHeader: React.FC<ConflictResolverHeaderProps> = ({
  question,
  isResolving,
  isAllLocalActive,
  isAllCloudActive,
  onSelectAll,
}) => {
  return (
    <div
      className='flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b'
      style={{ borderColor: 'var(--border)' }}
    >
      <div className='flex items-center gap-2 min-w-0'>
        <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0'>
          <FaCodeFork className='h-3.5 w-3.5' />
        </div>
        <div className='font-semibold text-foreground text-sm truncate'>
          &quot;{question}&quot;
        </div>
      </div>

      {/* Bulk Card Level Shortcuts */}
      <div className='flex items-center gap-1.5 shrink-0 self-end sm:self-auto'>
        <span className='text-[10px] text-muted-foreground uppercase font-bold tracking-wider mr-1 hidden xs:inline'>
          Bulk Card:
        </span>
        <button
          onClick={() => onSelectAll(SYNC_SOURCE.LOCAL)}
          disabled={isResolving}
          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-all ${
            isAllLocalActive
              ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40 shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground border-transparent'
          }`}
          title='Set Question, Answer, Difficulty/SRS, and Dynamic Fields to Local'
        >
          Use All Local
        </button>
        <button
          onClick={() => onSelectAll(SYNC_SOURCE.CLOUD)}
          disabled={isResolving}
          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-all ${
            isAllCloudActive
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground border-transparent'
          }`}
          title='Set Question, Answer, Difficulty/SRS, and Dynamic Fields to Cloud'
        >
          Use All Cloud
        </button>
      </div>
    </div>
  );
};

export default ConflictResolverHeader;
