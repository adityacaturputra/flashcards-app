'use client';
import React from 'react';
import { AnkiActivityStripDay } from '@/types/anki';

interface AnkiHistoryActivityStripProps {
  days: AnkiActivityStripDay[];
  dailyTarget: number;
  selectedDateKey: string | null;
  onSelectDateKey: (dateKey: string | null) => void;
}

/**
 * Interactive 14-day Activity Heatmap / Mini Bar Strip.
 * Clicking a day filters the timeline to that date; clicking again clears the filter.
 */
export const AnkiHistoryActivityStrip: React.FC<AnkiHistoryActivityStripProps> = ({
  days,
  dailyTarget,
  selectedDateKey,
  onSelectDateKey,
}) => {
  const maxCount = Math.max(dailyTarget, ...days.map((d) => d.count), 1);

  return (
    <div
      className='px-3 py-2.5 sm:px-4 border-b space-y-2'
      style={{ borderColor: 'var(--border)' }}
    >
      <div className='flex items-center justify-between gap-2 text-[11px]'>
        <span className='font-semibold text-foreground'>
          Aktivitas {days.length} Hari Terakhir
        </span>
        {selectedDateKey ? (
          <button
            type='button'
            onClick={() => onSelectDateKey(null)}
            className='font-semibold text-blue-600 dark:text-blue-400 hover:underline'
          >
            Tampilkan semua tanggal
          </button>
        ) : (
          <span className='text-muted-foreground'>Klik tanggal untuk filter</span>
        )}
      </div>

      <div className='grid grid-cols-7 sm:grid-cols-14 gap-1'>
        {days.map((day) => {
          const isSelected = selectedDateKey === day.dateKey;
          const barHeightPct =
            day.count === 0 ? 12 : Math.max(24, Math.min(100, Math.round((day.count / maxCount) * 100)));

          const barColor =
            day.count === 0
              ? 'bg-slate-200 dark:bg-slate-700/60'
              : day.isGoalMet
                ? 'bg-emerald-500'
                : 'bg-blue-500/80';

          return (
            <button
              key={day.dateKey}
              type='button'
              onClick={() => onSelectDateKey(isSelected ? null : day.dateKey)}
              title={`${day.date.toLocaleDateString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}: ${day.count} kartu`}
              className={`flex flex-col items-center gap-1 rounded-xl py-1.5 px-0.5 transition-all border ${
                isSelected
                  ? 'shadow-sm ring-1 ring-blue-500/50'
                  : 'border-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
              style={
                isSelected
                  ? { background: 'var(--card)', borderColor: 'var(--border)' }
                  : undefined
              }
            >
              <span className='text-[9px] font-medium text-muted-foreground leading-none'>
                {day.shortDay}
              </span>
              <div className='h-7 w-2.5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-end overflow-hidden p-[1px]'>
                <div
                  className={`w-full rounded-full transition-all ${barColor}`}
                  style={{ height: `${barHeightPct}%` }}
                />
              </div>
              <span
                className={`text-[10px] leading-none ${
                  day.isToday || isSelected
                    ? 'font-bold text-foreground'
                    : 'font-medium text-muted-foreground'
                }`}
              >
                {day.dayNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnkiHistoryActivityStrip;
