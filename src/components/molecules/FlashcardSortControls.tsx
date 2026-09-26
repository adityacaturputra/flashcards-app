'use client';
import React, { memo } from 'react';
import { FlashcardSortOption, FLASHCARD_SORT_OPTION } from '@/types/flashcard';

interface FlashcardSortControlsProps {
  sortOption: FlashcardSortOption;
  onSortChange: (option: FlashcardSortOption) => void;
  totalCount: number;
}

export const FlashcardSortControls: React.FC<FlashcardSortControlsProps> = memo(
  ({ sortOption, onSortChange, totalCount }) => {
    return (
      <div
        className='mt-3 flex flex-wrap items-center justify-between gap-2.5 border-t pt-2.5'
        style={{ borderColor: 'var(--border)' }}
      >
        <div className='flex items-center gap-1.5 sm:gap-2'>
          <span
            className='text-xs font-semibold'
            style={{ color: 'var(--muted-foreground)' }}
          >
            Urutkan:
          </span>
          <div
            className='flex items-center rounded-xl border p-1 shadow-inner'
            style={{
              background: 'var(--muted)',
              borderColor: 'var(--border)',
            }}
          >
            <button
              onClick={() => onSortChange(FLASHCARD_SORT_OPTION.RECENT)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                sortOption === FLASHCARD_SORT_OPTION.RECENT
                  ? 'shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background:
                  sortOption === FLASHCARD_SORT_OPTION.RECENT ? 'var(--card)' : 'transparent',
                color:
                  sortOption === FLASHCARD_SORT_OPTION.RECENT
                    ? 'var(--primary)'
                    : 'var(--foreground)',
              }}
              title='Tampilkan kartu yang baru ditambahkan di paling atas'
            >
              <span>🕒 Terbaru</span>
            </button>

            <button
              onClick={() => onSortChange(FLASHCARD_SORT_OPTION.PROGRESSION)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                sortOption === FLASHCARD_SORT_OPTION.PROGRESSION
                  ? 'shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background:
                  sortOption === FLASHCARD_SORT_OPTION.PROGRESSION ? 'var(--card)' : 'transparent',
                color:
                  sortOption === FLASHCARD_SORT_OPTION.PROGRESSION
                    ? 'var(--primary)'
                    : 'var(--foreground)',
              }}
              title='Urutkan berdasarkan tingkat hafalan (New -> Retry -> Hard...)'
            >
              <span>🎯 Level Hafalan</span>
            </button>

            <button
              onClick={() => onSortChange(FLASHCARD_SORT_OPTION.ALPHABETICAL)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                sortOption === FLASHCARD_SORT_OPTION.ALPHABETICAL
                  ? 'shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background:
                  sortOption === FLASHCARD_SORT_OPTION.ALPHABETICAL ? 'var(--card)' : 'transparent',
                color:
                  sortOption === FLASHCARD_SORT_OPTION.ALPHABETICAL
                    ? 'var(--primary)'
                    : 'var(--foreground)',
              }}
              title='Urutkan alfabetis (A - Z)'
            >
              <span>🔤 A - Z</span>
            </button>
          </div>
        </div>

        <div
          className='text-xs font-medium'
          style={{ color: 'var(--muted-foreground)' }}
        >
          Menampilkan: <span className='font-bold text-foreground'>{totalCount}</span> kartu
        </div>
      </div>
    );
  }
);

FlashcardSortControls.displayName = 'FlashcardSortControls';

export default FlashcardSortControls;
