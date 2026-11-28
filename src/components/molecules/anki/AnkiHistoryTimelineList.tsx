'use client';
import React from 'react';
import { FaCircleCheck, FaCalendarDay } from 'react-icons/fa6';
import { AnkiHistoryDayGroup, ReviewedTodayItem } from '@/types/anki';
import { AnkiHistoryCardRow } from './AnkiHistoryCardRow';

interface AnkiHistoryTimelineListProps {
  groups: AnkiHistoryDayGroup[];
  dailyTarget: number;
  emptyMessage: string;
  isPlaying: (key?: string) => boolean;
  getAudioButtonProps: (
    field: string,
    text: string,
    label: string,
    overrideCardId?: string,
  ) => React.ButtonHTMLAttributes<HTMLButtonElement>;
  onSelectCard: (card: ReviewedTodayItem) => void;
  onQuickSearch: (e: React.MouseEvent, question: string) => void;
}

/**
 * Renders date-grouped review history sections (Hari Ini, Kemarin, 25 Nov, etc.)
 * with per-day count, target badge, rating breakdown, and card rows.
 */
export const AnkiHistoryTimelineList: React.FC<AnkiHistoryTimelineListProps> = ({
  groups,
  dailyTarget,
  emptyMessage,
  isPlaying,
  getAudioButtonProps,
  onSelectCard,
  onQuickSearch,
}) => {
  if (groups.length === 0) {
    return (
      <div className='p-6 text-center text-xs text-muted-foreground space-y-1'>
        <FaCalendarDay className='h-6 w-6 mx-auto text-muted-foreground/40' />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className='max-h-80 sm:max-h-96 overflow-y-auto divide-y' style={{ borderColor: 'var(--border)' }}>
      {groups.map((group) => (
        <div key={group.dateKey}>
          {/* Sticky Day Header */}
          <div
            className='sticky top-0 z-10 px-3 py-2 sm:px-4 flex flex-wrap items-center justify-between gap-2 border-b text-[11px]'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            <div className='flex items-center gap-2'>
              <span className='font-bold text-foreground'>{group.label}</span>
              <span className='text-muted-foreground'>{group.subLabel}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                  group.isGoalMet
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                }`}
              >
                {group.totalCount}/{dailyTarget}
                {group.isGoalMet && <FaCircleCheck className='h-2.5 w-2.5' />}
              </span>
            </div>

            <div className='flex items-center gap-1 text-[10px] font-bold'>
              {group.breakdown.perfect > 0 && (
                <span className='text-purple-600 dark:text-purple-400'>
                  P:{group.breakdown.perfect}
                </span>
              )}
              {group.breakdown.good > 0 && (
                <span className='text-emerald-600 dark:text-emerald-400'>
                  G:{group.breakdown.good}
                </span>
              )}
              {group.breakdown.normal > 0 && (
                <span className='text-blue-600 dark:text-blue-400'>
                  N:{group.breakdown.normal}
                </span>
              )}
              {group.breakdown.hard > 0 && (
                <span className='text-amber-600 dark:text-amber-400'>
                  H:{group.breakdown.hard}
                </span>
              )}
              {group.breakdown.retry > 0 && (
                <span className='text-rose-600 dark:text-rose-400'>
                  R:{group.breakdown.retry}
                </span>
              )}
            </div>
          </div>

          {/* Cards in this day */}
          <div className='divide-y' style={{ borderColor: 'var(--border)' }}>
            {group.cards.map((card, idx) => {
              const audioKey = `${group.dateKey}-${card.id || idx}`;
              return (
                <AnkiHistoryCardRow
                  key={`${group.dateKey}-${card.id || idx}`}
                  card={card}
                  index={idx}
                  audioFieldKey={audioKey}
                  isAudioPlaying={isPlaying(audioKey)}
                  audioButtonProps={getAudioButtonProps(
                    audioKey,
                    card.question,
                    'Pronounce word',
                    card.id,
                  )}
                  onSelect={onSelectCard}
                  onQuickSearch={onQuickSearch}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnkiHistoryTimelineList;
