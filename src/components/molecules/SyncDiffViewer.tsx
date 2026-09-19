'use client';
import React from 'react';
import { SyncCardDiff } from '@/services/syncService';
import ConflictResolverCard from './ConflictResolverCard';

interface SyncDiffViewerProps {
  item: SyncCardDiff;
  onResolved?: (cardId: string) => void;
}

export const SyncDiffViewer: React.FC<SyncDiffViewerProps> = ({
  item,
  onResolved,
}) => {
  // If card is modified, render interactive conflict resolver
  if (item.status === 'modified') {
    return <ConflictResolverCard item={item} onResolved={onResolved} />;
  }

  // Local Only or Cloud Only card presentation
  return (
    <div
      className='rounded-xl border p-3.5 space-y-2.5 text-xs transition-all shadow-2xs'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Card Header & Status */}
      <div className='flex items-start justify-between gap-2'>
        <div className='font-semibold text-foreground text-sm line-clamp-2'>
          &quot;{item.question}&quot;
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
            item.status === 'localOnly'
              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
          }`}
        >
          {item.status === 'localOnly' ? 'Local Only' : 'Cloud Only'}
        </span>
      </div>

      {/* Answer Preview if present */}
      {item.localCard?.answer && (
        <div className='text-muted-foreground text-xs line-clamp-2'>
          {item.localCard.answer}
        </div>
      )}
      {item.cloudCard?.answer && (
        <div className='text-muted-foreground text-xs line-clamp-2'>
          {item.cloudCard.answer}
        </div>
      )}

      {/* Local Only Explanatory Note */}
      {item.status === 'localOnly' && (
        <div className='rounded-lg bg-amber-500/10 p-2.5 text-amber-800 dark:text-amber-300 flex items-center gap-2'>
          <span className='font-bold text-amber-600 dark:text-amber-400'>+</span>
          <span>
            Card exists only in Local repository. Clicking <strong>Push Local to Cloud</strong> will upload this card to MongoDB.
          </span>
        </div>
      )}

      {/* Cloud Only Explanatory Note */}
      {item.status === 'cloudOnly' && (
        <div className='rounded-lg bg-blue-500/10 p-2.5 text-blue-800 dark:text-blue-300 flex items-center gap-2'>
          <span className='font-bold text-blue-600 dark:text-blue-400'>+</span>
          <span>
            Card exists only in Cloud (e.g. added via mobile). Clicking <strong>Pull Cloud to Local</strong> will save this card to local repository.
          </span>
        </div>
      )}
    </div>
  );
};

export default SyncDiffViewer;
