'use client';
import React from 'react';
import {
  COMMUTE_PHASE_LABELS,
  CommuteChapterMarker,
} from '@/types/commute';

interface CommuteTranscriptTimelineProps {
  chapters: CommuteChapterMarker[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
}

function formatStamp(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const mins = Math.floor(safe / 60);
  const rem = safe % 60;
  return `${mins}:${rem.toString().padStart(2, '0')}`;
}

export const CommuteTranscriptTimeline: React.FC<
  CommuteTranscriptTimelineProps
> = ({ chapters, activeChapterIndex, onSelectChapter }) => {
  if (chapters.length === 0) return null;

  return (
    <section
      className='rounded-2xl border p-4 sm:p-5 space-y-3'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-bold text-foreground'>
          Susunan Chapter Episode ({chapters.length} segmen)
        </h3>
        <span className='text-xs text-muted-foreground'>Ketuk untuk lompat</span>
      </div>

      <div className='max-h-80 overflow-y-auto divide-y' style={{ borderColor: 'var(--border)' }}>
        {chapters.map((chapter, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={`${chapter.cardId}-${idx}`}
              type='button'
              onClick={() => onSelectChapter(idx)}
              className={`w-full min-h-[44px] px-3 py-2.5 !flex items-center !justify-between gap-3 !text-left !whitespace-normal rounded-lg transition-colors ${
                isActive ? 'font-bold' : 'hover:opacity-80'
              }`}
              style={{
                background: isActive ? 'var(--secondary)' : 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'left',
                whiteSpace: 'normal',
              }}
            >
              <div className='min-w-0 flex items-center gap-2.5'>
                <span className='text-xs font-mono text-muted-foreground w-10 shrink-0 tabular-nums'>
                  {formatStamp(chapter.startTimeSec)}
                </span>
                <div className='min-w-0'>
                  <div className='text-sm text-foreground truncate'>
                    {chapter.cardQuestion}
                  </div>
                  <div className='text-[11px] text-muted-foreground'>
                    {COMMUTE_PHASE_LABELS[chapter.phase]}
                  </div>
                </div>
              </div>
              {isActive && (
                <span className='rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold shrink-0'>
                  Playing
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CommuteTranscriptTimeline;
