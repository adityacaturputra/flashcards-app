'use client';
import React from 'react';
import { FaWandMagicSparkles, FaStop } from 'react-icons/fa6';
import { FlashcardCategory } from '@/types/flashcard';
import {
  COMMUTE_CARD_FILTER,
  COMMUTE_FILTER_LABELS,
  COMMUTE_MODE,
  COMMUTE_MODE_META,
  COMMUTE_SESSION_SIZES,
  CommuteCardFilter,
  CommuteConfig,
  CommuteMode,
} from '@/types/commute';
import AccentToggle from '@/components/atoms/AccentToggle';

interface CommuteSessionConfiguratorProps {
  config: CommuteConfig;
  categories: FlashcardCategory[];
  matchingCount: number;
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

  return (
    <section
      className='rounded-2xl border p-4 sm:p-6 space-y-5'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* 1. Learning Mode Presets */}
      <div className='space-y-2'>
        <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
          1. Pola Belajar Ilmiah
        </label>
        <div
          className='grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl overflow-hidden'
          style={{ background: 'var(--secondary)' }}
        >
          {(Object.values(COMMUTE_MODE) as CommuteMode[]).map((mode) => {
            const meta = COMMUTE_MODE_META[mode];
            const active = config.mode === mode;
            return (
              <button
                key={mode}
                type='button'
                onClick={() => onChangeConfig({ mode })}
                className={`!flex !flex-col !items-stretch !justify-start w-full min-w-0 !whitespace-normal !text-left rounded-xl p-3 transition-all border ${
                  active ? 'shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{
                  background: active ? 'var(--card)' : 'transparent',
                  borderColor: active ? 'var(--border)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  whiteSpace: 'normal',
                  textAlign: 'left',
                }}
              >
                <div className='flex items-center justify-between gap-2 w-full min-w-0'>
                  <span
                    className={`text-sm truncate ${
                      active ? 'font-bold text-foreground' : 'font-semibold text-muted-foreground'
                    }`}
                  >
                    {meta.title}
                  </span>
                  <span
                    className='rounded-md px-1.5 py-0.5 text-[10px] font-bold shrink-0'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {meta.badge}
                  </span>
                </div>
                <p className='mt-1.5 text-xs text-muted-foreground leading-snug break-words whitespace-normal'>
                  {meta.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

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
            className='w-full h-11 py-0 rounded-xl border px-3 text-sm font-medium text-foreground leading-normal'
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
            className='w-full h-11 py-0 rounded-xl border px-3 text-sm font-medium text-foreground leading-normal'
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

      {/* 3. Session Size & Accent */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <div className='flex items-center justify-between'>
            <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
              3. Jumlah Kartu
            </label>
            <span className='text-xs font-semibold text-foreground'>
              ≈ {estimatedMinutes} menit
            </span>
          </div>
          <div
            className='flex items-center gap-1 p-1 rounded-xl overflow-hidden'
            style={{ background: 'var(--secondary)' }}
          >
            {COMMUTE_SESSION_SIZES.map((size) => {
              const active = config.cardCount === size;
              return (
                <button
                  key={size}
                  type='button'
                  onClick={() => onChangeConfig({ cardCount: size })}
                  className={`flex-1 min-w-0 min-h-[40px] rounded-lg text-xs transition-all border ${
                    active
                      ? 'font-bold text-foreground shadow-sm'
                      : 'font-medium text-muted-foreground border-transparent'
                  }`}
                  style={{
                    background: active ? 'var(--card)' : 'transparent',
                    borderColor: active ? 'var(--border)' : 'transparent',
                  }}
                >
                  {size} kartu
                </button>
              );
            })}
          </div>
        </div>

        <div className='space-y-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Aksen Suara Inggris (Neural)
          </label>
          <div className='overflow-hidden'>
            <AccentToggle compact className='w-full' />
          </div>
        </div>
      </div>

      {/* 4. Optional Fields */}
      <div className='flex flex-wrap items-center gap-4 pt-1'>
        <label className='inline-flex items-center gap-2 text-sm text-foreground cursor-pointer select-none min-h-[36px]'>
          <input
            type='checkbox'
            checked={config.includeCollocations}
            onChange={(e) =>
              onChangeConfig({ includeCollocations: e.target.checked })
            }
            className='rounded'
          />
          <span>Bacakan Common Collocations</span>
        </label>

        <label className='inline-flex items-center gap-2 text-sm text-foreground cursor-pointer select-none min-h-[36px]'>
          <input
            type='checkbox'
            checked={config.includeTips}
            onChange={(e) => onChangeConfig({ includeTips: e.target.checked })}
            className='rounded'
          />
          <span>Bacakan Tips Mengingat</span>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className='rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400'>
          {error}
        </div>
      )}

      {/* Primary Action / Progress */}
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
              style={{
                width: `${progressPct}%`,
                background: 'var(--foreground)',
              }}
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
          disabled={matchingCount === 0}
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
            Generate Episode Audio ({Math.min(config.cardCount, matchingCount)} kartu · ≈{' '}
            {estimatedMinutes} mnt)
          </span>
        </button>
      )}
    </section>
  );
};

export default CommuteSessionConfigurator;
