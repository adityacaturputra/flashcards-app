'use client';
import React from 'react';
import { FaCodeFork, FaRotate, FaWandMagicSparkles, FaCloud, FaFolderClosed } from 'react-icons/fa6';
import { BulkResolveStrategy, BULK_RESOLVE_STRATEGY } from '@/types/sync';

interface BulkResolveToolbarProps {
  totalModified: number;
  selectedCount: number;
  isAllSelected: boolean;
  isResolving: boolean;
  onToggleSelectAll: () => void;
  onBulkResolve: (strategy: BulkResolveStrategy) => void;
}

export const BulkResolveToolbar: React.FC<BulkResolveToolbarProps> = ({
  totalModified,
  selectedCount,
  isAllSelected,
  isResolving,
  onToggleSelectAll,
  onBulkResolve,
}) => {
  const isSelective = selectedCount > 0;
  const countLabel = isSelective ? `${selectedCount} of ${totalModified}` : `${totalModified}`;

  return (
    <div
      className='rounded-xl border p-2.5 sm:p-3 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-3 shadow-xs'
      style={{
        background: 'var(--secondary)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left: Checkbox & Count */}
      <div className='flex items-center gap-2.5 min-w-0'>
        <label className='flex items-center gap-2 cursor-pointer select-none'>
          <input
            type='checkbox'
            checked={isAllSelected}
            onChange={onToggleSelectAll}
            disabled={isResolving}
            className='h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:opacity-50'
          />
          <div className='flex items-center gap-1.5'>
            <FaCodeFork className='h-3.5 w-3.5 text-purple-500 shrink-0' />
            <span className='font-bold text-xs text-foreground truncate'>
              {isSelective ? (
                <>
                  Selected <strong className='text-purple-600 dark:text-purple-400'>{countLabel}</strong> modified
                </>
              ) : (
                <>
                  <strong className='text-purple-600 dark:text-purple-400'>{totalModified}</strong> Modified Cards
                </>
              )}
            </span>
          </div>
        </label>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className='flex items-center gap-1.5 shrink-0 flex-wrap sm:flex-nowrap w-full sm:w-auto'>
        {/* Smart Latest Reviews (Recommended) */}
        <button
          onClick={() => onBulkResolve(BULK_RESOLVE_STRATEGY.LATEST)}
          disabled={isResolving}
          className='flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all shadow-xs active:scale-95 disabled:opacity-50 bg-emerald-600 hover:bg-emerald-700 text-white'
          title='Automatically resolve conflicts by preserving the latest study/review session and syncing both repositories'
        >
          {isResolving ? (
            <FaRotate className='h-3 w-3 animate-spin shrink-0' />
          ) : (
            <FaWandMagicSparkles className='h-3 w-3 shrink-0 text-amber-200' />
          )}
          <span className='truncate'>
            {isSelective ? `✨ Keep Latest (${selectedCount})` : '✨ Keep Latest & Sync'}
          </span>
        </button>

        {/* Use All Cloud */}
        <button
          onClick={() => onBulkResolve(BULK_RESOLVE_STRATEGY.CLOUD)}
          disabled={isResolving}
          className='flex-1 sm:flex-initial flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-all active:scale-95 disabled:opacity-50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30'
          title='Adopt Cloud data for all modified cards and sync both repositories'
        >
          <FaCloud className='h-3 w-3 shrink-0' />
          <span className='truncate'>
            {isSelective ? `Cloud (${selectedCount})` : 'All Cloud'}
          </span>
        </button>

        {/* Use All Local */}
        <button
          onClick={() => onBulkResolve(BULK_RESOLVE_STRATEGY.LOCAL)}
          disabled={isResolving}
          className='flex-1 sm:flex-initial flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-all active:scale-95 disabled:opacity-50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30'
          title='Adopt Local data for all modified cards and sync both repositories'
        >
          <FaFolderClosed className='h-3 w-3 shrink-0' />
          <span className='truncate'>
            {isSelective ? `Local (${selectedCount})` : 'All Local'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default BulkResolveToolbar;
