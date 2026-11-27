'use client';
import React, { useState, useEffect } from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { COMMUTE_CARD_LIMITS, COMMUTE_SESSION_SIZES } from '@/types/commute';
import {
  CommuteBatchWindow,
  estimateCommuteMp3SizeMb,
  parsePositiveIntInput,
} from '@/utils/commuteBatch';

interface CommuteCardRangeSelectorProps {
  cardCount: number;
  startIndex: number;
  matchingCount: number;
  batchWindow: CommuteBatchWindow;
  estimatedMinutes: number;
  onChangeCardCount: (cardCount: number) => void;
  onChangeStartIndex: (startIndex: number) => void;
}

export const CommuteCardRangeSelector: React.FC<CommuteCardRangeSelectorProps> = ({
  cardCount,
  startIndex,
  matchingCount,
  batchWindow,
  estimatedMinutes,
  onChangeCardCount,
  onChangeStartIndex,
}) => {
  const [countDraft, setCountDraft] = useState(String(cardCount));
  const [startDraft, setStartDraft] = useState(String(startIndex));

  useEffect(() => {
    setCountDraft(String(cardCount));
  }, [cardCount]);

  useEffect(() => {
    setStartDraft(String(startIndex));
  }, [startIndex]);

  const maxCount = Math.max(COMMUTE_CARD_LIMITS.MIN_COUNT, batchWindow.availableFromStart);
  const maxStart = Math.max(COMMUTE_CARD_LIMITS.MIN_START_INDEX, matchingCount);
  const isLargeBatch =
    batchWindow.effectiveCount > COMMUTE_CARD_LIMITS.LARGE_BATCH_WARNING_THRESHOLD;

  const handleCountChange = (raw: string) => {
    setCountDraft(raw.replace(/\D/g, ''));
    const parsed = parsePositiveIntInput(raw);
    if (parsed !== null) {
      onChangeCardCount(Math.min(parsed, maxCount));
    }
  };

  const handleCountBlur = () => {
    const parsed = parsePositiveIntInput(countDraft);
    const clamped = Math.min(
      Math.max(parsed ?? COMMUTE_CARD_LIMITS.MIN_COUNT, COMMUTE_CARD_LIMITS.MIN_COUNT),
      maxCount
    );
    setCountDraft(String(clamped));
    onChangeCardCount(clamped);
  };

  const handleStartChange = (raw: string) => {
    setStartDraft(raw.replace(/\D/g, ''));
    const parsed = parsePositiveIntInput(raw);
    if (parsed !== null) {
      onChangeStartIndex(Math.min(parsed, maxStart));
    }
  };

  const handleStartBlur = () => {
    const parsed = parsePositiveIntInput(startDraft);
    const clamped = Math.min(
      Math.max(
        parsed ?? COMMUTE_CARD_LIMITS.MIN_START_INDEX,
        COMMUTE_CARD_LIMITS.MIN_START_INDEX
      ),
      maxStart
    );
    setStartDraft(String(clamped));
    onChangeStartIndex(clamped);
  };

  return (
    <div className='space-y-2.5'>
      <div className='flex items-center justify-between gap-2'>
        <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
          3. Jumlah Kartu
        </label>
        <span className='text-xs font-semibold text-foreground'>
          {batchWindow.effectiveCount > 0
            ? `#${batchWindow.safeStartIndex}–${batchWindow.endIndex} · ≈ ${estimatedMinutes} mnt`
            : '0 kartu'}
        </span>
      </div>

      {/* Quick Preset Pills */}
      <div
        className='flex items-center gap-1 p-1 rounded-xl overflow-hidden'
        style={{ background: 'var(--secondary)' }}
      >
        {COMMUTE_SESSION_SIZES.map((size) => {
          const active = cardCount === size;
          return (
            <button
              key={size}
              type='button'
              onClick={() => onChangeCardCount(size)}
              className={`flex-1 min-w-0 min-h-[44px] rounded-lg text-xs transition-all border ${
                active
                  ? 'font-bold text-foreground shadow-sm'
                  : 'font-medium text-muted-foreground border-transparent'
              }`}
              style={{
                background: active ? 'var(--card)' : 'transparent',
                borderColor: active ? 'var(--border)' : 'transparent',
              }}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Custom Count & Batch Offset Inputs */}
      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <div className='flex items-center justify-between gap-1'>
            <label
              htmlFor='commute-custom-count'
              className='text-[11px] font-semibold text-muted-foreground'
            >
              Custom (maks. {batchWindow.availableFromStart})
            </label>
          </div>
          <input
            id='commute-custom-count'
            type='text'
            inputMode='numeric'
            value={countDraft}
            onChange={(e) => handleCountChange(e.target.value)}
            onBlur={handleCountBlur}
            aria-label='Jumlah kartu custom'
            placeholder='mis. 50'
            className='w-full min-h-[44px] rounded-xl border px-3 text-sm font-semibold text-foreground'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          />
        </div>

        <div className='space-y-1'>
          <label
            htmlFor='commute-start-index'
            className='block text-[11px] font-semibold text-muted-foreground truncate'
          >
            Mulai dari kartu ke-
          </label>
          <input
            id='commute-start-index'
            type='text'
            inputMode='numeric'
            value={startDraft}
            onChange={(e) => handleStartChange(e.target.value)}
            onBlur={handleStartBlur}
            aria-label='Mulai dari kartu ke'
            placeholder='1'
            className='w-full min-h-[44px] rounded-xl border px-3 text-sm font-semibold text-foreground'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          />
        </div>
      </div>

      {/* Gentle Warning for Large Batches (> 60 cards) */}
      {isLargeBatch && (
        <div className='flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300 leading-snug'>
          <FaTriangleExclamation className='h-3.5 w-3.5 mt-0.5 shrink-0' />
          <span>
            Batch besar ({batchWindow.effectiveCount} kartu · ≈{' '}
            {estimateCommuteMp3SizeMb(estimatedMinutes)} MB): stitching MP3 di Safari
            iPhone mungkin butuh waktu sedikit lebih lama.
          </span>
        </div>
      )}
    </div>
  );
};

export default CommuteCardRangeSelector;
