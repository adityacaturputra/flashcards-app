'use client';
import React from 'react';
import { FaClock, FaVolumeHigh, FaMagnifyingGlass } from 'react-icons/fa6';
import { ReviewedTodayItem, ANKI_CONFIG } from '@/types/anki';
import { Progression } from '@/types/flashcard';
import { formatNextReviewLabel } from '@/utils/ankiAlgorithm';

interface AnkiHistoryCardRowProps {
  card: ReviewedTodayItem;
  index: number;
  audioFieldKey: string;
  isAudioPlaying: boolean;
  audioButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onSelect: (card: ReviewedTodayItem) => void;
  onQuickSearch: (e: React.MouseEvent, question: string) => void;
}

const PROGRESSION_BADGE_STYLES: Record<string, string> = {
  [Progression.Perfect]: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  [Progression.Good]: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  [Progression.Normal]: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  [Progression.Hard]: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  [Progression.Retry]: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
};

/**
 * Reusable history card row showing current SRS status (progression, interval,
 * easeFactor, repetitions, lapses, nextReviewDate) plus quick audio & search actions.
 */
export const AnkiHistoryCardRow: React.FC<AnkiHistoryCardRowProps> = ({
  card,
  index,
  isAudioPlaying,
  audioButtonProps,
  onSelect,
  onQuickSearch,
}) => {
  const nextLabel = formatNextReviewLabel(card.nextReviewDate);
  const isDueNow = nextLabel === 'Due now';
  const isRetry = card.progression === Progression.Retry;
  const intervalDays = card.interval ?? 0;
  const ease = (card.easeFactor ?? ANKI_CONFIG.DEFAULT_EASE_FACTOR).toFixed(2);
  const reps = card.repetitions ?? 0;
  const lapses = card.lapses ?? 0;
  const badgeStyle =
    PROGRESSION_BADGE_STYLES[card.progression] ??
    'bg-slate-500/15 text-slate-600 dark:text-slate-300';

  return (
    <div
      onClick={() => onSelect(card)}
      className='p-2.5 sm:px-4 space-y-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors text-xs group'
    >
      {/* Top Line: Index, Question/Answer, Quick Actions */}
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0 flex items-start gap-2 flex-1'>
          <span className='text-[10px] font-bold text-muted-foreground shrink-0 pt-0.5 w-5'>
            #{index + 1}
          </span>
          <div className='min-w-0 flex-1 space-y-0.5'>
            <div className='font-bold text-foreground truncate group-hover:text-blue-500 transition-colors'>
              {card.question}
            </div>
            <div className='text-[11px] text-muted-foreground truncate'>
              {card.answer}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-1 shrink-0'>
          <button
            {...audioButtonProps}
            onClick={(e) => {
              e.stopPropagation();
              audioButtonProps.onClick?.(e);
            }}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all ${
              isAudioPlaying
                ? 'bg-blue-500 text-white animate-pulse'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground'
            }`}
            style={{ borderColor: 'var(--border)' }}
          >
            <FaVolumeHigh className='h-3 w-3' />
          </button>

          <button
            type='button'
            onClick={(e) => onQuickSearch(e, card.question)}
            className='flex h-7 w-7 items-center justify-center rounded-lg border text-muted-foreground hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all'
            style={{ borderColor: 'var(--border)' }}
            title='Google search'
            aria-label='Google search'
          >
            <FaMagnifyingGlass className='h-3 w-3' />
          </button>
        </div>
      </div>

      {/* Bottom Line: Current SRS Metrics & Next Review */}
      <div className='pl-7 flex flex-wrap items-center justify-between gap-1.5 text-[10px]'>
        <div className='flex flex-wrap items-center gap-1'>
          <span className={`rounded-md px-1.5 py-0.5 font-bold capitalize ${badgeStyle}`}>
            {card.progression}
          </span>
          <span className='rounded-md px-1.5 py-0.5 font-semibold text-muted-foreground bg-slate-100 dark:bg-slate-800'>
            {intervalDays}d
          </span>
          <span className='rounded-md px-1.5 py-0.5 font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800'>
            {ease}x
          </span>
          <span className='rounded-md px-1.5 py-0.5 font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800'>
            {reps}x rep
          </span>
          {lapses > 0 && (
            <span
              className={`rounded-md px-1.5 py-0.5 font-bold ${
                lapses >= ANKI_CONFIG.HIGH_LAPSE_THRESHOLD
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
              }`}
            >
              {lapses} lapse
            </span>
          )}
        </div>

        <span
          className={`inline-flex items-center gap-1 font-medium shrink-0 ${
            isRetry || isDueNow
              ? 'text-rose-500 font-bold'
              : nextLabel === 'Tomorrow'
                ? 'text-blue-500 font-semibold'
                : 'text-muted-foreground'
          }`}
        >
          <FaClock className='h-2.5 w-2.5 shrink-0' />
          <span>{nextLabel}</span>
        </span>
      </div>
    </div>
  );
};

export default AnkiHistoryCardRow;
