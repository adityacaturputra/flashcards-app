'use client';
import React from 'react';
import {
  FaCheck,
  FaRotate,
  FaCloudArrowUp,
  FaCloudArrowDown,
} from 'react-icons/fa6';
import { SyncTarget, SYNC_TARGET } from '@/types/sync';

interface ConflictResolverFooterProps {
  isResolving: boolean;
  errorMessage: string | null;
  resolvedSuccess: string | null;
  onResolve: (target: SyncTarget) => void;
}

export const ConflictResolverFooter: React.FC<ConflictResolverFooterProps> = ({
  isResolving,
  errorMessage,
  resolvedSuccess,
  onResolve,
}) => {
  return (
    <>
      {/* Feedback Messages */}
      {errorMessage && (
        <div className='rounded-lg bg-red-500/10 border border-red-500/30 p-2 text-xs text-red-600 dark:text-red-400'>
          {errorMessage}
        </div>
      )}

      {resolvedSuccess && (
        <div className='rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2'>
          <FaCheck className='h-3.5 w-3.5 shrink-0' />
          <span>{resolvedSuccess}</span>
        </div>
      )}

      {/* Conflict Resolution Action Buttons */}
      <div
        className='flex flex-wrap items-center justify-between gap-2 pt-2 border-t'
        style={{ borderColor: 'var(--border)' }}
      >
        <div className='text-[11px] text-muted-foreground'>
          Choose where to apply this merged card:
        </div>

        <div className='flex items-center gap-2'>
          {/* Secondary: Apply to Local Only */}
          <button
            onClick={() => onResolve(SYNC_TARGET.LOCAL)}
            disabled={isResolving}
            className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            title='Update Local Repository only with the merged card'
          >
            <FaCloudArrowDown className='h-3 w-3 text-amber-500' />
            <span>Apply to Local</span>
          </button>

          {/* Secondary: Apply to Cloud Only */}
          <button
            onClick={() => onResolve(SYNC_TARGET.CLOUD)}
            disabled={isResolving}
            className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            title='Update MongoDB Cloud only with the merged card'
          >
            <FaCloudArrowUp className='h-3 w-3 text-blue-500' />
            <span>Apply to Cloud</span>
          </button>

          {/* Primary: Resolve & Sync Both (Recommended) */}
          <button
            onClick={() => onResolve(SYNC_TARGET.BOTH)}
            disabled={isResolving}
            className='flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition-all disabled:opacity-50'
            title='Save to both Local and Cloud, completely resolving the conflict'
          >
            {isResolving ? (
              <FaRotate className='h-3 w-3 animate-spin' />
            ) : (
              <FaCheck className='h-3 w-3' />
            )}
            <span>Resolve & Sync Both</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ConflictResolverFooter;
