'use client';
import React from 'react';
import { FaWandMagicSparkles, FaStop, FaHeadphones } from 'react-icons/fa6';
import { FlashcardCategory } from '@/types/flashcard';
import {
  COMMUTE_CARD_FILTER,
  COMMUTE_FILTER_LABELS,
  CommuteCardFilter,
  CommuteConfig,
} from '@/types/commute';
import { CommuteBatchWindow } from '@/utils/commuteBatch';
import CommuteModeSelector from '@/components/molecules/commute/CommuteModeSelector';
import CommuteCardRangeSelector from '@/components/molecules/commute/CommuteCardRangeSelector';

interface CommuteSessionConfiguratorProps {
  config: CommuteConfig;
  categories: FlashcardCategory[];
  matchingCount: number;
  batchWindow: CommuteBatchWindow;
  collocationsAvailable: number;
  tipsAvailable: number;
  estimatedMinutes: number;
  isGenerating: boolean;
  progress: { completed: number; total: number };
  error: string | null;
  onChangeConfig: (patch: Partial<CommuteConfig>) => void;
  onGenerate: () => void;
  onCancel: () => void;
}

export const CommuteSessionConfigurator: React.FC<
  CommuteSessionConfiguratorProps
> = ({
  config,
  categories,
  matchingCount,
  batchWindow,
  collocationsAvailable,
  tipsAvailable,
  estimatedMinutes,
  isGenerating,
  progress,
  error,
  onChangeConfig,
  onGenerate,
  onCancel,
}) => {
  const progressPct =
    progress.total > 0
      ? Math.min(100, Math.round((progress.completed / progress.total) * 100))
      : 0;
  const selectedBatchSize = batchWindow.effectiveCount;
  const rangeLabel =
    batchWindow.safeStartIndex > 1 && selectedBatchSize > 0
      ? ` · #${batchWindow.safeStartIndex}–${batchWindow.endIndex}`
      : '';

  return (
    <section
      className='rounded-2xl border p-4 sm:p-6 space-y-5'
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <CommuteModeSelector
        selectedMode={config.mode}
        onSelectMode={(mode) => onChangeConfig({ mode })}
      />

      {/* 2. Source Filter & Category */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            2. Filter Deck ({matchingCount} tersedia)
          </label>
          <select
            value={config.filter}
            onChange={(e) =>
              onChangeConfig({ filter: e.target.value as CommuteCardFilter })
            }
            className='w-full min-h-[44px] py-0 rounded-xl border px-3 text-sm font-medium text-foreground leading-normal'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            {(Object.values(COMMUTE_CARD_FILTER) as CommuteCardFilter[]).map((f) => (
              <option key={f} value={f}>
                {COMMUTE_FILTER_LABELS[f]}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Kategori
          </label>
          <select
            value={config.categoryId}
            onChange={(e) => onChangeConfig({ categoryId: e.target.value })}
            className='w-full min-h-[44px] py-0 rounded-xl border px-3 text-sm font-medium text-foreground leading-normal'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            <option value='all'>Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat._id ?? cat.name} value={cat._id ?? cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Card Count, Offset & Narrator */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-start'>
        <CommuteCardRangeSelector
          cardCount={config.cardCount}
          startIndex={config.startIndex}
          matchingCount={matchingCount}
          batchWindow={batchWindow}
          estimatedMinutes={estimatedMinutes}
          onChangeCardCount={(cardCount) => onChangeConfig({ cardCount })}
          onChangeStartIndex={(startIndex) => onChangeConfig({ startIndex })}
        />

        <div className='space-y-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Suara Narator (Pre-Generated)
          </label>
          <div
            className='min-h-[44px] rounded-xl border px-3 py-2 flex items-center gap-2 text-xs font-medium text-foreground'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            <FaHeadphones className='h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400' />
            <span className='truncate'>
              Tri-Voice Neural · US (Brian &amp; Ava) + ID (Ardi)
            </span>
          </div>
        </div>
      </div>

      {/* 4. Contextual Optional Fields */}
      <div className='flex flex-wrap items-center gap-4 pt-1'>
        <label
          className={`inline-flex items-center gap-2 text-sm select-none min-h-[44px] ${
            collocationsAvailable === 0
              ? 'opacity-45 cursor-not-allowed text-muted-foreground'
              : 'cursor-pointer text-foreground'
          }`}
        >
          <input
            type='checkbox'
            disabled={collocationsAvailable === 0}
            checked={collocationsAvailable > 0 && config.includeCollocations}
            onChange={(e) =>
              onChangeConfig({ includeCollocations: e.target.checked })
            }
            className='rounded'
          />
          <span>
            Bacakan Collocations ({collocationsAvailable}/{selectedBatchSize} kartu)
          </span>
        </label>

        <label
          className={`inline-flex items-center gap-2 text-sm select-none min-h-[44px] ${
            tipsAvailable === 0
              ? 'opacity-45 cursor-not-allowed text-muted-foreground'
              : 'cursor-pointer text-foreground'
          }`}
        >
          <input
            type='checkbox'
            disabled={tipsAvailable === 0}
            checked={tipsAvailable > 0 && config.includeTips}
            onChange={(e) => onChangeConfig({ includeTips: e.target.checked })}
            className='rounded'
          />
          <span>
            Bacakan Tips Mengingat ({tipsAvailable}/{selectedBatchSize} kartu)
          </span>
        </label>

        <label className='inline-flex items-center gap-2 text-sm select-none min-h-[44px] cursor-pointer text-foreground'>
          <input
            type='checkbox'
            checked={config.syncToAnki}
            onChange={(e) => onChangeConfig({ syncToAnki: e.target.checked })}
            className='rounded'
          />
          <span>Catat Soft Progress ke Anki</span>
        </label>
      </div>

      {error && (
        <div className='rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400'>
          {error}
        </div>
      )}

      {isGenerating ? (
        <div className='space-y-2.5'>
          <div className='flex items-center justify-between text-xs font-semibold text-foreground'>
            <span>
              Merangkai episode MP3 ({progress.completed}/{progress.total} klip unik)...
            </span>
            <span>{progressPct}%</span>
          </div>
          <div
            className='h-2.5 w-full rounded-full overflow-hidden'
            style={{ background: 'var(--secondary)' }}
          >
            <div
              className='h-full rounded-full transition-all duration-300'
              style={{ width: `${progressPct}%`, background: 'var(--foreground)' }}
            />
          </div>
          <button
            type='button'
            onClick={onCancel}
            className='min-h-[44px] w-full inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold text-foreground'
            style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
          >
            <FaStop className='h-3.5 w-3.5' />
            <span>Batalkan</span>
          </button>
        </div>
      ) : (
        <button
          type='button'
          disabled={selectedBatchSize === 0}
          onClick={onGenerate}
          className='min-h-[48px] w-full inline-flex items-center justify-center gap-2 rounded-xl px-3.5 sm:px-5 py-3 text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-[0.99] disabled:opacity-40 !whitespace-normal'
          style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
            whiteSpace: 'normal',
          }}
        >
          <FaWandMagicSparkles className='h-4 w-4 shrink-0' />
          <span>
            Generate Episode Audio ({selectedBatchSize} kartu{rangeLabel} · ≈{' '}
            {estimatedMinutes} mnt)
          </span>
        </button>
      )}
    </section>
  );
};

export default CommuteSessionConfigurator;
