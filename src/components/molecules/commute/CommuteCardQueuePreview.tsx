'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaListUl, FaRotateLeft, FaXmark } from 'react-icons/fa6';
import { Flashcard } from '@/types/flashcard';
import { extractFlashcardNarrationFields } from '@/utils/commuteScriptBuilder';
import { getCommuteCardStatusBadge } from '@/utils/commuteBatch';

interface CommuteCardQueuePreviewProps {
  cards: Flashcard[];
  startIndex: number;
  reserveCount: number;
  excludedCount: number;
  onExcludeCard: (cardId: string) => void;
  onResetExcluded: () => void;
}

export const CommuteCardQueuePreview: React.FC<CommuteCardQueuePreviewProps> = ({
  cards,
  startIndex,
  reserveCount,
  excludedCount,
  onExcludeCard,
  onResetExcluded,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className='rounded-xl border overflow-hidden'
      style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
    >
      <div className='flex items-center justify-between gap-2 px-3 py-1'>
        <button
          type='button'
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className='flex-1 min-w-0 min-h-[44px] flex items-center gap-2 text-left text-xs sm:text-sm font-semibold text-foreground'
        >
          <FaListUl className='h-3.5 w-3.5 shrink-0 text-muted-foreground' />
          <span className='truncate'>
            Preview Kartu yang Akan Diputar ({cards.length} kartu)
          </span>
          {isExpanded ? (
            <FaChevronUp className='h-3 w-3 shrink-0 ml-auto text-muted-foreground' />
          ) : (
            <FaChevronDown className='h-3 w-3 shrink-0 ml-auto text-muted-foreground' />
          )}
        </button>

        {excludedCount > 0 && (
          <button
            type='button'
            onClick={onResetExcluded}
            className='shrink-0 min-h-[44px] px-2.5 inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors'
          >
            <FaRotateLeft className='h-3 w-3' />
            <span>Reset Skip ({excludedCount})</span>
          </button>
        )}
      </div>

      {isExpanded && (
        <div className='border-t' style={{ borderColor: 'var(--border)' }}>
          <div
            className='px-3 py-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground border-b'
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <span>
              {reserveCount > 0
                ? `+${reserveCount} kartu cadangan tersedia`
                : 'Tidak ada kartu cadangan tersisa'}
            </span>
            <span>Tap × untuk skip &amp; ganti</span>
          </div>

          {cards.length === 0 ? (
            <div className='px-3 py-5 text-center text-xs text-muted-foreground'>
              Tidak ada kartu tersisa. Klik Reset Skip atau ubah filter.
            </div>
          ) : (
            <ul className='max-h-[300px] overflow-y-auto divide-y' style={{ borderColor: 'var(--border)' }}>
              {cards.map((card, idx) => {
                const cardId = card._id ?? card.question;
                const { meaningId } = extractFlashcardNarrationFields(card);
                const badge = getCommuteCardStatusBadge(card);
                return (
                  <li
                    key={cardId}
                    className='flex items-center gap-2.5 pl-3 pr-1.5 py-1.5'
                    style={{ background: 'var(--card)' }}
                  >
                    <span className='w-6 shrink-0 text-[11px] font-mono text-muted-foreground text-right'>
                      {startIndex + idx}.
                    </span>
                    <div className='flex-1 min-w-0 py-0.5'>
                      <div className='flex items-center gap-1.5 min-w-0'>
                        <span className='text-xs sm:text-sm font-semibold text-foreground truncate'>
                          {card.question}
                        </span>
                        <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold leading-none ${badge.className}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className='text-[11px] text-muted-foreground truncate mt-0.5'>
                        {meaningId || card.answer}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={() => onExcludeCard(cardId)}
                      aria-label={`Skip ${card.question}`}
                      title='Skip & ganti dengan kartu berikutnya'
                      className='shrink-0 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors'
                    >
                      <FaXmark className='h-4 w-4' />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CommuteCardQueuePreview;
