'use client';
import React from 'react';
import { FaFire, FaLayerGroup, FaGaugeHigh, FaTriangleExclamation } from 'react-icons/fa6';
import { AnkiHistoryHealthSummary, ANKI_CONFIG } from '@/types/anki';

interface AnkiHistoryHealthBarProps {
  health: AnkiHistoryHealthSummary;
  showOnlyHighLapses: boolean;
  onToggleHighLapses: () => void;
}

/**
 * Compact Current vs Historical Health summary bar:
 * Active Streak, Total Reviewed, Avg Ease Factor, Mastery distribution, & High-Lapse filter toggle.
 */
export const AnkiHistoryHealthBar: React.FC<AnkiHistoryHealthBarProps> = ({
  health,
  showOnlyHighLapses,
  onToggleHighLapses,
}) => {
  const { activeStreakDays, totalEverReviewed, avgEaseFactor, masteryBreakdown, highLapseCards } =
    health;
  const totalMastery = Math.max(totalEverReviewed, 1);

  const segments = [
    { key: 'perfect', count: masteryBreakdown.perfect, color: 'bg-purple-500', label: 'Perfect' },
    { key: 'good', count: masteryBreakdown.good, color: 'bg-emerald-500', label: 'Good' },
    { key: 'normal', count: masteryBreakdown.normal, color: 'bg-blue-500', label: 'Normal' },
    { key: 'hard', count: masteryBreakdown.hard, color: 'bg-amber-500', label: 'Hard' },
    { key: 'retry', count: masteryBreakdown.retry, color: 'bg-rose-500', label: 'Retry' },
  ];

  return (
    <div
      className='px-3 py-2.5 sm:px-4 border-b space-y-2.5'
      style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
    >
      {/* Key Health Metrics */}
      <div className='grid grid-cols-3 gap-2'>
        <div
          className='rounded-xl border px-2.5 py-1.5 flex items-center gap-2 min-w-0'
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <FaFire className='h-3.5 w-3.5 text-amber-500 shrink-0' />
          <div className='min-w-0'>
            <div className='text-xs font-extrabold text-foreground leading-tight'>
              {activeStreakDays}h
            </div>
            <div className='text-[10px] text-muted-foreground truncate'>Streak</div>
          </div>
        </div>

        <div
          className='rounded-xl border px-2.5 py-1.5 flex items-center gap-2 min-w-0'
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <FaLayerGroup className='h-3.5 w-3.5 text-blue-500 shrink-0' />
          <div className='min-w-0'>
            <div className='text-xs font-extrabold text-foreground leading-tight'>
              {totalEverReviewed}
            </div>
            <div className='text-[10px] text-muted-foreground truncate'>Pernah Review</div>
          </div>
        </div>

        <div
          className='rounded-xl border px-2.5 py-1.5 flex items-center gap-2 min-w-0'
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <FaGaugeHigh className='h-3.5 w-3.5 text-emerald-500 shrink-0' />
          <div className='min-w-0'>
            <div className='text-xs font-extrabold text-foreground leading-tight'>
              {avgEaseFactor.toFixed(2)}x
            </div>
            <div className='text-[10px] text-muted-foreground truncate'>Avg Ease</div>
          </div>
        </div>
      </div>

      {/* Mastery Distribution Bar + High-Lapse Filter Pill */}
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex-1 min-w-[140px] space-y-1'>
          <div className='h-1.5 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-700'>
            {segments.map((seg) =>
              seg.count > 0 ? (
                <div
                  key={seg.key}
                  className={seg.color}
                  style={{ width: `${(seg.count / totalMastery) * 100}%` }}
                  title={`${seg.label}: ${seg.count}`}
                />
              ) : null,
            )}
          </div>
          <div className='flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground'>
            {segments
              .filter((s) => s.count > 0)
              .map((s) => (
                <span key={s.key} className='inline-flex items-center gap-1'>
                  <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                  {s.label} {s.count}
                </span>
              ))}
          </div>
        </div>

        {highLapseCards.length > 0 && (
          <button
            type='button'
            onClick={onToggleHighLapses}
            className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-[11px] font-bold border transition-all shrink-0 ${
              showOnlyHighLapses
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={
              !showOnlyHighLapses
                ? { background: 'var(--card)', borderColor: 'var(--border)' }
                : undefined
            }
          >
            <FaTriangleExclamation className='h-3 w-3 text-rose-500' />
            <span>
              Lapses ≥{ANKI_CONFIG.HIGH_LAPSE_THRESHOLD}: {highLapseCards.length}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnkiHistoryHealthBar;
