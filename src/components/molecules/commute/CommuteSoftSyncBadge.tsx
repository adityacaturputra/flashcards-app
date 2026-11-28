'use client';
import React from 'react';
import { FaCircleCheck, FaCloudArrowUp, FaRotate } from 'react-icons/fa6';
import {
  COMMUTE_SOFT_SYNC_STATUS,
  CommuteSoftSyncSummary,
} from '@/types/commute';

interface CommuteSoftSyncBadgeProps {
  softSync: CommuteSoftSyncSummary;
}

export const CommuteSoftSyncBadge: React.FC<CommuteSoftSyncBadgeProps> = ({
  softSync,
}) => {
  if (!softSync.enabled) {
    return null;
  }

  const isSyncing = softSync.status === COMMUTE_SOFT_SYNC_STATUS.SYNCING;
  const isAllSynced = softSync.status === COMMUTE_SOFT_SYNC_STATUS.SYNCED;

  return (
    <div
      className='flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2'
      style={{
        background: 'var(--secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='inline-flex items-center gap-2 text-xs font-semibold text-foreground'>
        {isSyncing ? (
          <FaRotate className='h-3.5 w-3.5 animate-spin text-muted-foreground shrink-0' />
        ) : (
          <FaCircleCheck
            className={`h-3.5 w-3.5 shrink-0 ${
              isAllSynced
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-muted-foreground'
            }`}
          />
        )}
        <span>
          Selesai didengar: {softSync.listenedCount}/{softSync.totalCards} · Tersinkron Anki: {softSync.syncedCount}
        </span>
      </div>

      {softSync.pendingCount > 0 && (
        <button
          type='button'
          disabled={isSyncing}
          onClick={softSync.onSyncNow}
          className='min-h-[36px] inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold text-foreground shadow-sm transition-opacity hover:opacity-85 disabled:opacity-50'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <FaCloudArrowUp className='h-3.5 w-3.5 shrink-0' />
          <span>
            {isSyncing
              ? 'Menyimpan...'
              : `Simpan Progress Didengar (${softSync.pendingCount} kartu)`}
          </span>
        </button>
      )}
    </div>
  );
};

export default CommuteSoftSyncBadge;
