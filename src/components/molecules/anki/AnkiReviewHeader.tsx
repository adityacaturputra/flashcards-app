'use client';
import React from 'react';
import {
  FaChartColumn,
  FaArrowRightFromBracket,
  FaClock,
  FaWandMagicSparkles,
  FaClockRotateLeft,
} from 'react-icons/fa6';

interface AnkiReviewHeaderProps {
  remainingDue: number;
  remainingNew: number;
  completedCount: number;
  totalCardsToday: number;
  dailyTarget: number;
  todayReviewedCount: number;
  totalDueBacklog?: number;
  onOpenForecast: () => void;
  onToggleTodayBox: () => void;
  onExitReview: () => void;
}

export const AnkiReviewHeader: React.FC<AnkiReviewHeaderProps> = ({
  remainingDue,
  remainingNew,
  completedCount,
  totalCardsToday,
  dailyTarget,
  todayReviewedCount,
  totalDueBacklog = 0,
  onOpenForecast,
  onToggleTodayBox,
  onExitReview,
}) => {
  const currentCardNumber = Math.min(completedCount + 1, totalCardsToday);
  const progressPercent =
    totalCardsToday > 0
      ? Math.round((completedCount / totalCardsToday) * 100)
      : 100;

  return (
    <div
      className='rounded-2xl border p-3 sm:p-4 mb-4 shadow-2xs space-y-2.5 transition-all'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Top Bar: Live Queue Counters & Action Buttons */}
      <div className='flex flex-wrap items-center justify-between gap-2'>
        {/* Left: Queue Status Pills */}
        <div className='flex items-center gap-1.5 sm:gap-2 min-w-0'>
          {/* Due Reviews Badge */}
          <div
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold border transition-all ${
              remainingDue > 0
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground border-transparent'
            }`}
            title={`${remainingDue} due cards in today's study session (${totalDueBacklog} total overdue cards in deck backlog)`}
          >
            <FaClock className='h-3 w-3 shrink-0' />
            <span>{remainingDue} Due</span>
          </div>

          {/* New Cards Badge */}
          <div
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold border transition-all ${
              remainingNew > 0
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground border-transparent'
            }`}
            title={`Today's unlearned words quota (daily limit: ${dailyTarget})`}
          >
            <FaWandMagicSparkles className='h-3 w-3 shrink-0' />
            <span>{remainingNew} New</span>
          </div>

          {/* Progress Tracker */}
          <span className='text-[11px] text-muted-foreground font-medium hidden xs:inline ml-1'>
            {totalCardsToday > 0 ? `${currentCardNumber} of ${totalCardsToday}` : 'All caught up'}
          </span>
        </div>

        {/* Right: Today's History, Forecast Modal Trigger & Exit Review */}
        <div className='flex items-center gap-1.5 shrink-0'>
          {/* Today's History Button */}
          <button
            onClick={onToggleTodayBox}
            className='flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            title="View cards reviewed today"
          >
            <FaClockRotateLeft className='h-3 w-3 text-purple-500 shrink-0' />
            <span className='hidden sm:inline'>{todayReviewedCount} Reviewed</span>
            <span className='sm:hidden'>{todayReviewedCount} Done</span>
          </button>

          {/* 7-Day Forecast Button */}
          <button
            onClick={onOpenForecast}
            className='flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            title='View Anki 7-Day Spaced Repetition Workload Forecast'
          >
            <FaChartColumn className='h-3 w-3 text-blue-500 shrink-0' />
            <span className='hidden sm:inline'>Forecast</span>
          </button>

          {/* Exit Review Button */}
          <button
            onClick={onExitReview}
            className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40 active:scale-95'
            title='Exit Review Mode and return to deck view'
          >
            <FaArrowRightFromBracket className='h-3 w-3 shrink-0' />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden'>
        <div
          className='bg-emerald-500 h-full transition-all duration-300 rounded-full'
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default AnkiReviewHeader;
