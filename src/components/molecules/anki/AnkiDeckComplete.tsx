'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCircleCheck,
  FaCalendarDay,
  FaPlus,
  FaChartColumn,
  FaArrowRightFromBracket,
  FaClock,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import { AnkiForecastDay, ReviewedTodayItem } from '@/types/anki';
import { AnkiTodayReviewedBox } from './AnkiTodayReviewedBox';

interface AnkiDeckCompleteProps {
  completedCount: number;
  todayReviewedCards: ReviewedTodayItem[];
  tomorrowForecast?: AnkiForecastDay;
  dailyTarget?: number;
  totalDueBacklog?: number;
  onLearnMore: () => void;
  onOpenForecast: () => void;
  onExitReview: () => void;
}

export const AnkiDeckComplete: React.FC<AnkiDeckCompleteProps> = ({
  completedCount,
  todayReviewedCards,
  tomorrowForecast,
  dailyTarget = 10,
  totalDueBacklog = 0,
  onLearnMore,
  onOpenForecast,
  onExitReview,
}) => {
  const tomorrowDue = tomorrowForecast?.dueCount ?? 0;
  const tomorrowNew = tomorrowForecast?.newCount ?? 0;
  const tomorrowTotal = tomorrowForecast?.total ?? (tomorrowDue + tomorrowNew);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='w-full max-w-xl mx-auto rounded-3xl border p-5 sm:p-7 shadow-sm text-center space-y-5 my-4'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Celebratory Icon */}
      <div className='flex justify-center'>
        <div className='relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-500 ring-8 ring-emerald-500/10 dark:bg-emerald-500/20'>
          <FaCircleCheck className='h-8 w-8 sm:h-10 sm:w-10' />
        </div>
      </div>

      {/* Title & Congratulations */}
      <div className='space-y-1'>
        <h2 className='text-xl sm:text-2xl font-extrabold text-foreground tracking-tight'>
          You Have Finished This Deck For Today!
        </h2>
        <p className='text-xs sm:text-sm text-muted-foreground max-w-md mx-auto'>
          Great job! Consistent daily practice compounds exponentially for long-term retention.
        </p>
      </div>

      {/* Recap & Tomorrow Preview Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-left'>
        {/* Today's Completed Recap */}
        <div
          className='rounded-2xl border p-3.5 space-y-1'
          style={{
            background: 'var(--background)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='flex items-center justify-between text-muted-foreground text-xs font-semibold'>
            <span>Reviewed Today</span>
            <span className='h-2 w-2 rounded-full bg-emerald-500' />
          </div>
          <div className='text-2xl font-extrabold text-foreground'>
            {todayReviewedCards.length || completedCount}
          </div>
          <p className='text-[11px] text-muted-foreground'>
            cards reviewed and scheduled into memory
          </p>
        </div>

        {/* Tomorrow's Scheduled Forecast */}
        <div
          className='rounded-2xl border p-3.5 space-y-1'
          style={{
            background: 'var(--background)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='flex items-center justify-between text-muted-foreground text-xs font-semibold'>
            <span className='flex items-center gap-1.5'>
              <FaCalendarDay className='h-3 w-3 text-blue-500' /> Tomorrow
            </span>
            <span className='text-xs font-bold text-foreground'>
              {tomorrowTotal} cards
            </span>
          </div>

          <div className='flex items-center gap-2 pt-1'>
            <span className='inline-flex items-center gap-1 rounded-lg bg-rose-500/15 px-2 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400'>
              <FaClock className='h-2.5 w-2.5' /> {tomorrowDue} due
            </span>
            <span className='inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400'>
              <FaWandMagicSparkles className='h-2.5 w-2.5' /> +{tomorrowNew} new
            </span>
          </div>
          <p className='text-[11px] text-muted-foreground pt-0.5'>
            {totalDueBacklog > 0 ? `${totalDueBacklog} cards remaining in deck backlog` : 'ready for tomorrow session'}
          </p>
        </div>
      </div>

      {/* Kotak Today: Reviewed Cards History */}
      <AnkiTodayReviewedBox
        reviewedCards={todayReviewedCards}
        dailyTarget={dailyTarget}
        isCollapsible={true}
        defaultExpanded={true}
      />

      {/* Action Buttons */}
      <div className='space-y-2.5 pt-1'>
        {/* Eager Learner: Learn 5 More Cards */}
        <button
          onClick={onLearnMore}
          className='w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-semibold text-sm transition-all shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98]'
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <FaPlus className='h-3.5 w-3.5' />
          <span>Study 5 More Cards Today</span>
        </button>

        <div className='grid grid-cols-2 gap-2'>
          {/* View Forecast Modal */}
          <button
            onClick={onOpenForecast}
            className='flex items-center justify-center gap-2 rounded-2xl border py-2.5 px-3 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          >
            <FaChartColumn className='h-3.5 w-3.5 text-blue-500' />
            <span>7-Day Forecast</span>
          </button>

          {/* Exit Review */}
          <button
            onClick={onExitReview}
            className='flex items-center justify-center gap-2 rounded-2xl border py-2.5 px-3 text-xs font-semibold shadow-2xs transition-all hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40 active:scale-95'
          >
            <FaArrowRightFromBracket className='h-3.5 w-3.5' />
            <span>Exit Review</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnkiDeckComplete;
