'use client';
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { Flashcard } from '@/types/flashcard';

interface MergedCardPreviewProps {
  mergedCard: Flashcard;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export const MergedCardPreview: React.FC<MergedCardPreviewProps> = ({
  mergedCard,
  showPreview,
  onTogglePreview,
}) => {
  return (
    <div className='pt-1'>
      <button
        onClick={onTogglePreview}
        className='flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors'
      >
        {showPreview ? <FaChevronUp className='h-3 w-3' /> : <FaChevronDown className='h-3 w-3' />}
        <span>{showPreview ? 'Hide Merged Card Preview' : 'Preview Merged Card Result'}</span>
      </button>

      {showPreview && (
        <div
          className='mt-2 rounded-lg border p-3 font-mono text-[11px] space-y-2'
          style={{
            background: 'var(--secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <div>
            <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
              Resolved Question:
            </span>
            <div className='text-foreground font-medium'>{mergedCard.question}</div>
          </div>
          <div>
            <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
              Resolved Answer:
            </span>
            <div className='text-foreground font-medium whitespace-pre-wrap'>{mergedCard.answer}</div>
          </div>
          <div>
            <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
              Resolved Difficulty / Anki SRS:
            </span>
            <div className='text-foreground font-medium flex items-center gap-1.5 font-sans text-xs'>
              <span className='uppercase font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700'>
                {mergedCard.progression}
              </span>
              <span>•</span>
              <span>{mergedCard.interval ?? 0}d</span>
              <span>•</span>
              <span>{Math.round((mergedCard.easeFactor ?? 2.5) * 100)}%</span>
              <span>•</span>
              <span>Reps: {mergedCard.repetitions ?? 0}</span>
              <span>•</span>
              <span>Lapses: {mergedCard.lapses ?? 0}</span>
            </div>
          </div>
          {Object.keys(mergedCard.dynamicFields || {}).length > 0 && (
            <div>
              <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
                Resolved Dynamic Fields:
              </span>
              <pre className='text-foreground text-[10px] overflow-x-auto whitespace-pre-wrap font-mono'>
                {JSON.stringify(mergedCard.dynamicFields, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MergedCardPreview;
