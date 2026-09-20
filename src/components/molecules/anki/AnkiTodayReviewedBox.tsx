'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaClockRotateLeft,
  FaChevronDown,
  FaChevronUp,
  FaCircleCheck,
  FaClock,
  FaCalendarDay,
  FaVolumeHigh,
  FaMagnifyingGlass,
  FaXmark,
} from 'react-icons/fa6';
import { ReviewedTodayItem } from '@/types/anki';
import { Progression } from '@/types/flashcard';
import { AnkiCardDetailModal } from './AnkiCardDetailModal';
import { useSpeechPlayback } from '@/hooks/useSpeechPlayback';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { openGoogleSearchInNewTab } from '@/utils/externalLinks';

interface AnkiTodayReviewedBoxProps {
  reviewedCards: ReviewedTodayItem[];
  dailyTarget?: number;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

export const AnkiTodayReviewedBox: React.FC<AnkiTodayReviewedBoxProps> = ({
  reviewedCards,
  dailyTarget = 10,
  isCollapsible = true,
  defaultExpanded = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<ReviewedTodayItem | null>(null);

  const { generateSearchQuery } = useSearchTemplateContext();
  const { isPlaying, getAudioButtonProps } = useSpeechPlayback<string>({
    resetTriggers: [reviewedCards.length],
  });

  // Group stats by progression rating
  const stats = useMemo(() => {
    const counts: Record<string, number> = {
      good: 0,
      hard: 0,
      perfect: 0,
      retry: 0,
      normal: 0,
    };
    reviewedCards.forEach((c) => {
      const prog = c.progression?.toLowerCase() || 'normal';
      counts[prog] = (counts[prog] || 0) + 1;
    });
    return counts;
  }, [reviewedCards]);

  const isGoalMet = reviewedCards.length >= dailyTarget;

  // Filtered cards based on search query
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return reviewedCards;
    const q = searchQuery.toLowerCase().trim();
    return reviewedCards.filter(
      (c) =>
        c.question.toLowerCase().includes(q) ||
        c.answer.toLowerCase().includes(q) ||
        (c.progression && c.progression.toLowerCase().includes(q)),
    );
  }, [reviewedCards, searchQuery]);

  // Format next review helper
  const getNextReviewLabel = (nextDateStr?: Date | string) => {
    if (!nextDateStr) return 'Due now';
    const next = new Date(nextDateStr);
    const now = new Date();
    const diffHours = Math.round((next.getTime() - now.getTime()) / (1000 * 60 * 60));

    if (diffHours <= 1) return 'Review in 1h';
    if (diffHours < 24) return `in ${diffHours}h`;

    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return 'Tomorrow';
    return `in ${diffDays}d`;
  };

  const handleQuickSearch = (e: React.MouseEvent, question: string) => {
    e.stopPropagation();
    const query = generateSearchQuery(question);
    openGoogleSearchInNewTab(query);
  };

  return (
    <>
      <div
        className={`rounded-2xl border shadow-2xs overflow-hidden transition-all ${className}`}
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Box Header */}
        <div
          onClick={() => isCollapsible && setIsExpanded((prev) => !prev)}
          className={`flex items-center justify-between p-3.5 sm:p-4 ${
            isCollapsible ? 'cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/40' : ''
          } transition-colors`}
        >
          <div className='flex items-center gap-2.5 min-w-0'>
            <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 shrink-0'>
              <FaClockRotateLeft className='h-4 w-4' />
            </div>
            <div className='min-w-0'>
              <div className='flex items-center gap-2 flex-wrap'>
                <h3 className='text-sm font-bold text-foreground'>
                  Reviewed Today
                </h3>
                <span
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold ${
                    isGoalMet
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {reviewedCards.length} / {dailyTarget}
                  {isGoalMet && <FaCircleCheck className='h-3 w-3' />}
                </span>
                {isGoalMet && (
                  <span className='text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hidden sm:inline'>
                    Goal Met! 🎉
                  </span>
                )}
              </div>
              <p className='text-[11px] text-muted-foreground truncate'>
                {reviewedCards.length === 0
                  ? 'No cards reviewed yet today'
                  : `${reviewedCards.length} cards scheduled into memory (click row to see full details)`}
              </p>
            </div>
          </div>

          {isCollapsible && (
            <button
              type='button'
              className='flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors'
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <FaChevronUp className='h-3.5 w-3.5' /> : <FaChevronDown className='h-3.5 w-3.5' />}
            </button>
          )}
        </div>

        {/* Expandable Content Body */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='border-t'
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Rating Breakdown Badges */}
              {reviewedCards.length > 0 && (
                <div className='flex flex-wrap items-center gap-1.5 p-2.5 sm:px-4 bg-muted/20 border-b text-[11px] font-medium' style={{ borderColor: 'var(--border)' }}>
                  <span className='text-muted-foreground mr-1'>Ratings:</span>
                  {stats.good > 0 && (
                    <span className='rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-600 dark:text-emerald-400 font-bold'>
                      Good: {stats.good}
                    </span>
                  )}
                  {stats.hard > 0 && (
                    <span className='rounded-md bg-amber-500/15 px-2 py-0.5 text-amber-600 dark:text-amber-400 font-bold'>
                      Hard: {stats.hard}
                    </span>
                  )}
                  {stats.perfect > 0 && (
                    <span className='rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-600 dark:text-purple-400 font-bold'>
                      Perfect: {stats.perfect}
                    </span>
                  )}
                  {stats.retry > 0 && (
                    <span className='rounded-md bg-rose-500/15 px-2 py-0.5 text-rose-600 dark:text-rose-400 font-bold'>
                      Retry: {stats.retry}
                    </span>
                  )}
                </div>
              )}

              {/* Search Bar (if more than 3 cards) */}
              {reviewedCards.length > 3 && (
                <div className='p-2.5 sm:px-4 border-b bg-background' style={{ borderColor: 'var(--border)' }}>
                  <div className='relative flex items-center'>
                    <FaMagnifyingGlass className='absolute left-3 h-3 w-3 text-muted-foreground pointer-events-none' />
                    <input
                      type='text'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder='Search reviewed cards today...'
                      className='w-full rounded-xl border py-1.5 pl-8 pr-7 text-xs transition-colors focus:outline-hidden focus:border-blue-500'
                      style={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className='absolute right-2.5 text-muted-foreground hover:text-foreground'
                        aria-label='Clear search'
                      >
                        <FaXmark className='h-3 w-3' />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* List of Cards Reviewed Today with Capped Height & Internal Scroll */}
              <div className='max-h-64 sm:max-h-72 overflow-y-auto divide-y' style={{ borderColor: 'var(--border)' }}>
                {reviewedCards.length === 0 ? (
                  <div className='p-6 text-center text-xs text-muted-foreground space-y-1'>
                    <FaCalendarDay className='h-6 w-6 mx-auto text-muted-foreground/40' />
                    <p>No cards reviewed yet today.</p>
                    <p className='text-[11px]'>Start your 10-card daily study session to build your streak!</p>
                  </div>
                ) : filteredCards.length === 0 ? (
                  <div className='p-5 text-center text-xs text-muted-foreground'>
                    No reviewed cards match &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  filteredCards.map((card, idx) => {
                    const nextLabel = getNextReviewLabel(card.nextReviewDate);
                    const isTomorrow = nextLabel === 'Tomorrow';
                    const isRetry = card.progression === Progression.Retry;
                    const audioFieldKey = `today-${card.id}`;

                    return (
                      <div
                        key={card.id || idx}
                        onClick={() => setSelectedCard(card)}
                        className='p-2.5 sm:px-4 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors text-xs group'
                      >
                        {/* Left: Index, Truncated Question & Answer */}
                        <div className='min-w-0 flex items-center gap-2 flex-1'>
                          <span className='text-[10px] font-bold text-muted-foreground shrink-0 w-5'>
                            #{idx + 1}
                          </span>
                          <div className='min-w-0 flex-1 space-y-0.5'>
                            <div className='font-bold text-foreground truncate max-w-[150px] xs:max-w-[200px] sm:max-w-xs group-hover:text-blue-500 transition-colors'>
                              {card.question}
                            </div>
                            <div className='text-[11px] text-muted-foreground truncate max-w-[150px] xs:max-w-[200px] sm:max-w-xs'>
                              {card.answer}
                            </div>
                          </div>
                        </div>

                        {/* Right: Quick Audio & Search Buttons, Progression Pill & Next Due Label */}
                        <div className='flex items-center gap-1.5 sm:gap-2 shrink-0'>
                          {/* Quick Audio Pronunciation Button */}
                          <button
                            {...getAudioButtonProps(audioFieldKey, card.question, 'Pronounce word')}
                            onClick={(e) => {
                              e.stopPropagation();
                              getAudioButtonProps(audioFieldKey, card.question, 'Pronounce word').onClick(e);
                            }}
                            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all ${
                              isPlaying(audioFieldKey)
                                ? 'bg-blue-500 text-white animate-pulse'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground'
                            }`}
                            style={{ borderColor: 'var(--border)' }}
                            title='Listen to pronunciation'
                            aria-label='Pronounce word'
                          >
                            <FaVolumeHigh className='h-3 w-3' />
                          </button>

                          {/* Quick Google Search Button */}
                          <button
                            onClick={(e) => handleQuickSearch(e, card.question)}
                            className='flex h-7 w-7 items-center justify-center rounded-lg border text-muted-foreground hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all'
                            style={{ borderColor: 'var(--border)' }}
                            title='Google search'
                            aria-label='Google search'
                          >
                            <FaMagnifyingGlass className='h-3 w-3' />
                          </button>

                          {/* Progression Pill */}
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold capitalize ${
                              card.progression === Progression.Good
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                : card.progression === Progression.Hard
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : card.progression === Progression.Perfect
                                    ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {card.progression}
                          </span>

                          {/* Due Date Timing Badge */}
                          <span
                            className={`flex items-center gap-1 text-[10px] font-medium min-w-[50px] justify-end ${
                              isRetry
                                ? 'text-rose-500 font-bold'
                                : isTomorrow
                                  ? 'text-blue-500 font-semibold'
                                  : 'text-muted-foreground'
                            }`}
                          >
                            <FaClock className='h-2.5 w-2.5 shrink-0' />
                            <span>{nextLabel}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Detail Modal */}
      <AnkiCardDetailModal
        card={selectedCard}
        isOpen={Boolean(selectedCard)}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default AnkiTodayReviewedBox;
