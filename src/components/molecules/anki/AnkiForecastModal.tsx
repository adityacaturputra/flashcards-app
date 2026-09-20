'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartColumn,
  FaXmark,
  FaClock,
  FaWandMagicSparkles,
  FaCircleInfo,
} from 'react-icons/fa6';
import { AnkiForecastDay } from '@/types/anki';

interface AnkiForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
  forecast: AnkiForecastDay[];
  dailyTarget?: number;
  totalDueBacklog?: number;
}

export const AnkiForecastModal: React.FC<AnkiForecastModalProps> = ({
  isOpen,
  onClose,
  forecast,
  dailyTarget = 10,
  totalDueBacklog = 0,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate stats across the 7-day forecast window
  const totalDueWeek = forecast.reduce((acc, d) => acc + d.dueCount, 0);
  const totalNewWeek = forecast.reduce((acc, d) => acc + d.newCount, 0);
  const grandTotal = totalDueWeek + totalNewWeek;
  const maxDayTotal = Math.max(...forecast.map((d) => d.total), 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto'>
          {/* Backdrop Blur */}
          <motion.div
            className='fixed inset-0 bg-black/60 backdrop-blur-xs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-labelledby='forecast-modal-title'
            className='relative z-10 w-full max-w-lg rounded-2xl border shadow-xl overflow-hidden'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className='flex items-center justify-between border-b px-4 py-3.5 sm:px-5'>
              <div className='flex items-center gap-2.5'>
                <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 dark:bg-blue-500/20'>
                  <FaChartColumn className='h-4 w-4' />
                </div>
                <div>
                  <h3
                    id='forecast-modal-title'
                    className='text-base font-bold text-foreground'
                  >
                    7-Day Study Forecast
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    Anki Spaced Repetition projected workload
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label='Close modal'
                className='flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800'
              >
                <FaXmark className='h-4 w-4' />
              </button>
            </div>

            {/* Content Body */}
            <div className='max-h-[75vh] overflow-y-auto p-4 sm:p-5 space-y-4'>
              {/* Summary Metric Cards */}
              <div className='grid grid-cols-3 gap-2 sm:gap-3'>
                <div
                  className='rounded-xl border p-2.5 sm:p-3 text-center'
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span className='text-[11px] font-medium text-muted-foreground block'>
                    7-Day Total
                  </span>
                  <span className='text-lg sm:text-xl font-extrabold text-foreground'>
                    {grandTotal}
                  </span>
                  <span className='text-[10px] text-muted-foreground block'>cards</span>
                </div>

                <div
                  className='rounded-xl border p-2.5 sm:p-3 text-center'
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span className='text-[11px] font-medium text-muted-foreground block'>
                    Daily Target
                  </span>
                  <span className='text-lg sm:text-xl font-extrabold text-blue-600 dark:text-blue-400'>
                    {dailyTarget}
                  </span>
                  <span className='text-[10px] text-muted-foreground block'>cards/day</span>
                </div>

                <div
                  className='rounded-xl border p-2.5 sm:p-3 text-center'
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span className='text-[11px] font-medium text-muted-foreground block'>
                    Overdue Backlog
                  </span>
                  <span className='text-lg sm:text-xl font-extrabold text-rose-600 dark:text-rose-400'>
                    {totalDueBacklog > 0 ? totalDueBacklog : totalDueWeek}
                  </span>
                  <span className='text-[10px] text-muted-foreground block'>cards waiting</span>
                </div>
              </div>

              {/* Forecast Day Breakdown List */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs font-semibold text-muted-foreground px-1'>
                  <span>Day & Date</span>
                  <div className='flex items-center gap-3'>
                    <span className='flex items-center gap-1 text-rose-500'>
                      <FaClock className='h-2.5 w-2.5' /> Due
                    </span>
                    <span className='flex items-center gap-1 text-emerald-500'>
                      <FaWandMagicSparkles className='h-2.5 w-2.5' /> New
                    </span>
                    <span className='text-foreground'>Total</span>
                  </div>
                </div>

                <div className='space-y-2'>
                  {forecast.map((item) => {
                    const dueRatio = (item.dueCount / maxDayTotal) * 100;
                    const newRatio = (item.newCount / maxDayTotal) * 100;
                    const isToday = item.dayIndex === 0;
                    const isTomorrow = item.dayIndex === 1;

                    return (
                      <div
                        key={item.dayIndex}
                        className={`rounded-xl border p-2.5 sm:p-3 transition-all ${
                          isToday
                            ? 'ring-2 ring-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20'
                            : isTomorrow
                              ? 'bg-muted/30'
                              : 'bg-card'
                        }`}
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className='flex items-center justify-between text-xs mb-1.5'>
                          <div className='flex items-center gap-1.5'>
                            <span
                              className={`font-bold ${
                                isToday
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : isTomorrow
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                              }`}
                            >
                              {item.dayLabel}
                            </span>
                            <span className='text-[11px] text-muted-foreground'>
                              ({item.dateString})
                            </span>
                          </div>

                          <div className='flex items-center gap-2.5 font-semibold text-xs'>
                            <span className='text-rose-600 dark:text-rose-400 min-w-[20px] text-right'>
                              {item.dueCount}
                            </span>
                            <span className='text-emerald-600 dark:text-emerald-400 min-w-[20px] text-right'>
                              {item.newCount}
                            </span>
                            <span className='text-foreground font-bold min-w-[24px] text-right'>
                              {item.total}
                            </span>
                          </div>
                        </div>

                        {/* Stacked Proportional Bar */}
                        <div className='w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex'>
                          {item.dueCount > 0 && (
                            <div
                              className='bg-rose-500 h-full transition-all duration-300'
                              style={{ width: `${dueRatio}%` }}
                              title={`${item.dueCount} due reviews`}
                            />
                          )}
                          {item.newCount > 0 && (
                            <div
                              className='bg-emerald-500 h-full transition-all duration-300'
                              style={{ width: `${newRatio}%` }}
                              title={`${item.newCount} new cards`}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cognitive Science Explanation Callout */}
              <div
                className='rounded-xl border p-3 text-xs leading-relaxed flex gap-2.5 items-start text-muted-foreground'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                }}
              >
                <FaCircleInfo className='h-4 w-4 text-blue-500 shrink-0 mt-0.5' />
                <div>
                  <span className='font-bold text-foreground block mb-0.5'>
                    Balanced Daily Quota: 10 Cards / Day
                  </span>
                  Each day prioritizes due reviews (cards needing review from yesterday or earlier backlog). If fewer than 10 cards are due, the remaining slots are filled with new vocabulary up to exactly 10 cards total. This guarantees a sustainable, stress-free habit!
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='border-t px-4 py-3 sm:px-5 flex justify-end bg-muted/20'>
              <button
                onClick={onClose}
                className='rounded-xl px-4 py-2 text-xs font-semibold border shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnkiForecastModal;
