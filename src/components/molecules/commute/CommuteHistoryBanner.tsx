'use client';
import React from 'react';
import { FaPlay, FaRotateLeft, FaTrashCan } from 'react-icons/fa6';
import { COMMUTE_MODE_META, CommuteSessionRecord } from '@/types/commute';
import {
  AudioPlaybackProgress,
  formatAudioClock,
  isResumableProgress,
} from '@/utils/audioPlaybackProgress';

interface CommuteHistoryBannerProps {
  latestSession: CommuteSessionRecord;
  lastProgress?: AudioPlaybackProgress | null;
  isGenerating: boolean;
  onContinueSession: (record: CommuteSessionRecord) => void;
  onQuickRecallSession: (record: CommuteSessionRecord) => void;
  onClearHistory: () => void;
}

export const CommuteHistoryBanner: React.FC<CommuteHistoryBannerProps> = ({
  latestSession,
  lastProgress,
  isGenerating,
  onContinueSession,
  onQuickRecallSession,
  onClearHistory,
}) => {
  const formattedTime = new Date(latestSession.createdAt).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const hasResumableTime = isResumableProgress(lastProgress ?? null);
  const modeTitle = COMMUTE_MODE_META[latestSession.mode]?.title ?? latestSession.mode;
  const continueLabel =
    hasResumableTime && lastProgress
      ? `Lanjutkan Sesi Terakhir (${formatAudioClock(lastProgress.currentTimeSec)})`
      : 'Lanjutkan Sesi Terakhir';

  return (
    <div
      className='rounded-2xl border p-4 flex flex-col gap-3'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[11px] font-bold uppercase'>
              Sesi Terakhir
            </span>
            <span className='text-xs text-muted-foreground'>{formattedTime}</span>
          </div>
          <p className='mt-1 text-sm font-semibold text-foreground truncate'>
            {latestSession.title}
          </p>
          <p className='text-xs text-muted-foreground'>
            {latestSession.cardCount} kartu · {modeTitle}
          </p>
          {lastProgress && lastProgress.currentTimeSec > 0 && (
            <p className='mt-1 text-xs font-medium text-foreground tabular-nums'>
              Terakhir di {formatAudioClock(lastProgress.currentTimeSec)}
              {lastProgress.durationSec > 0
                ? ` / ${formatAudioClock(lastProgress.durationSec)}`
                : ''}
            </p>
          )}
        </div>

        <button
          type='button'
          onClick={onClearHistory}
          aria-label='Hapus riwayat sesi'
          title='Hapus riwayat sesi'
          className='min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border text-muted-foreground hover:text-foreground transition-colors shrink-0'
          style={{ borderColor: 'var(--border)' }}
        >
          <FaTrashCan className='h-3.5 w-3.5' />
        </button>
      </div>

      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2'>
        <button
          type='button'
          disabled={isGenerating}
          onClick={() => onContinueSession(latestSession)}
          className='min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50'
          style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
          }}
        >
          <FaPlay className='h-3.5 w-3.5' />
          <span>{continueLabel}</span>
        </button>

        <button
          type='button'
          disabled={isGenerating}
          onClick={() => onQuickRecallSession(latestSession)}
          className='min-h-[44px] sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-foreground hover:opacity-80 transition-all disabled:opacity-50'
          style={{
            background: 'var(--secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <FaRotateLeft className='h-3.5 w-3.5' />
          <span>Quick Recall Pulang</span>
        </button>
      </div>
    </div>
  );
};

export default CommuteHistoryBanner;
