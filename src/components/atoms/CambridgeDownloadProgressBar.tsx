'use client';
import React from 'react';
import { FaCloudArrowDown } from 'react-icons/fa6';

interface CambridgeDownloadProgressBarProps {
  title: string;
  loadedMb: string;
  totalMb: string;
  progressPercent: number;
}

export const CambridgeDownloadProgressBar: React.FC<
  CambridgeDownloadProgressBarProps
> = ({ title, loadedMb, totalMb, progressPercent }) => {
  return (
    <div
      className='flex flex-col gap-2.5 rounded-2xl border p-4 sm:p-5 shadow-lg max-w-md w-full mx-auto select-none'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2 min-w-0'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0'>
            <FaCloudArrowDown className='h-4 w-4 animate-bounce' />
          </div>
          <div className='min-w-0'>
            <h4 className='text-xs sm:text-sm font-bold text-foreground truncate'>
              {title}
            </h4>
            <span className='text-[10px] text-muted-foreground'>
              Mengunduh dari arsip cloud Cambridge...
            </span>
          </div>
        </div>

        <span className='font-mono text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400'>
          {progressPercent}%
        </span>
      </div>

      {/* Progress Track */}
      <div className='h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border/50'>
        <div
          className='h-full bg-purple-600 transition-all duration-200 ease-out rounded-full'
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>

      {/* MB Counter Info */}
      <div className='flex items-center justify-between font-mono text-[11px] text-muted-foreground'>
        <span>
          {loadedMb} MB / {totalMb} MB
        </span>
        <span className='text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-medium'>
          Akan disimpan di cache browser
        </span>
      </div>
    </div>
  );
};

export default CambridgeDownloadProgressBar;
