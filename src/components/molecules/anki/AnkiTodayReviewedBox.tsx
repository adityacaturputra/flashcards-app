'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaClockRotateLeft,
  FaChevronDown,
  FaChevronUp,
  FaCircleCheck,
  FaCalendarDay,
  FaMagnifyingGlass,
  FaXmark,
} from 'react-icons/fa6';
import { Flashcard } from '@/types/flashcard';
import {
  ReviewedTodayItem,
  ANKI_CONFIG,
  ANKI_HISTORY_TAB,
  ANKI_HISTORY_RANGE,
  AnkiHistoryTab,
  AnkiHistoryRange,
} from '@/types/anki';
import {
  getAnkiReviewHistoryByDate,
  getAnkiActivityStrip,
  getAnkiHistoryHealthSummary,
} from '@/utils/ankiAlgorithm';
import { useSpeechPlayback } from '@/hooks/useSpeechPlayback';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { openGoogleSearchInNewTab } from '@/utils/externalLinks';
import { AnkiCardDetailModal } from './AnkiCardDetailModal';
import { AnkiHistoryActivityStrip } from './AnkiHistoryActivityStrip';
import { AnkiHistoryHealthBar } from './AnkiHistoryHealthBar';
import { AnkiHistoryCardRow } from './AnkiHistoryCardRow';
import { AnkiHistoryTimelineList } from './AnkiHistoryTimelineList';

interface AnkiTodayReviewedBoxProps {
  reviewedCards: ReviewedTodayItem[];
  allFlashcards?: Flashcard[];
  dailyTarget?: number;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

const RANGE_OPTIONS: { value: AnkiHistoryRange; label: string }[] = [
  { value: ANKI_HISTORY_RANGE.DAYS_7, label: '7 Hari' },
  { value: ANKI_HISTORY_RANGE.DAYS_30, label: '30 Hari' },
  { value: ANKI_HISTORY_RANGE.ALL, label: 'Semua' },
];

export const AnkiTodayReviewedBox: React.FC<AnkiTodayReviewedBoxProps> = ({
  reviewedCards,
  allFlashcards = [],
  dailyTarget = ANKI_CONFIG.DAILY_TARGET,
  isCollapsible = true,
  defaultExpanded = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState<AnkiHistoryTab>(ANKI_HISTORY_TAB.TODAY);
  const [range, setRange] = useState<AnkiHistoryRange>(ANKI_HISTORY_RANGE.DAYS_30);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [showOnlyHighLapses, setShowOnlyHighLapses] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<ReviewedTodayItem | null>(null);

  const { generateSearchQuery } = useSearchTemplateContext();
  const { isPlaying, getAudioButtonProps } = useSpeechPlayback<string>({
    resetTriggers: [reviewedCards.length, activeTab],
  });

  const isGoalMet = reviewedCards.length >= dailyTarget;
  const queryLower = searchQuery.toLowerCase().trim();

  const filteredTodayCards = useMemo(() => {
    if (!queryLower) return reviewedCards;
    return reviewedCards.filter(
      (c) =>
        c.question.toLowerCase().includes(queryLower) ||
        c.answer.toLowerCase().includes(queryLower) ||
        c.progression?.toLowerCase().includes(queryLower),
    );
  }, [reviewedCards, queryLower]);

  const activityStrip = useMemo(
    () => getAnkiActivityStrip(allFlashcards, ANKI_CONFIG.ACTIVITY_STRIP_DAYS, dailyTarget),
    [allFlashcards, dailyTarget],
  );

  const healthSummary = useMemo(
    () => getAnkiHistoryHealthSummary(allFlashcards),
    [allFlashcards],
  );

  const filteredTimelineGroups = useMemo(() => {
    const groups = getAnkiReviewHistoryByDate(allFlashcards, range, dailyTarget);
    return groups
      .filter((g) => !selectedDateKey || g.dateKey === selectedDateKey)
      .map((g) => {
        const cards = g.cards.filter((c) => {
          if (showOnlyHighLapses && (c.lapses ?? 0) < ANKI_CONFIG.HIGH_LAPSE_THRESHOLD) {
            return false;
          }
          if (!queryLower) return true;
          return (
            c.question.toLowerCase().includes(queryLower) ||
            c.answer.toLowerCase().includes(queryLower) ||
            c.progression?.toLowerCase().includes(queryLower)
          );
        });
        return { ...g, cards };
      })
      .filter((g) => g.cards.length > 0);
  }, [allFlashcards, range, dailyTarget, selectedDateKey, showOnlyHighLapses, queryLower]);

  const handleQuickSearch = (e: React.MouseEvent, question: string) => {
    e.stopPropagation();
    openGoogleSearchInNewTab(generateSearchQuery(question));
  };

  return (
    <>
      <div
        className={`rounded-2xl border shadow-2xs overflow-hidden transition-all text-left ${className}`}
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {/* Header */}
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
                <h3 className='text-sm font-bold text-foreground'>Anki Review History</h3>
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
              </div>
              <p className='text-[11px] text-muted-foreground truncate'>
                {healthSummary.totalEverReviewed > 0
                  ? `${healthSummary.totalEverReviewed} kartu pernah di-review · Streak ${healthSummary.activeStreakDays}h`
                  : 'Belum ada kartu yang di-review'}
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

        {/* Body */}
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
              {/* Apple-style Segmented Tab Switch + Range Filter */}
              <div
                className='p-2.5 sm:px-4 border-b flex flex-wrap items-center justify-between gap-2'
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className='inline-flex p-1 rounded-xl gap-1 w-full sm:w-auto'
                  style={{ background: 'var(--secondary)' }}
                >
                  <button
                    type='button'
                    onClick={() => setActiveTab(ANKI_HISTORY_TAB.TODAY)}
                    className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg text-xs transition-all ${
                      activeTab === ANKI_HISTORY_TAB.TODAY
                        ? 'font-bold text-foreground shadow-sm border'
                        : 'font-medium text-muted-foreground hover:text-foreground'
                    }`}
                    style={
                      activeTab === ANKI_HISTORY_TAB.TODAY
                        ? { background: 'var(--card)', borderColor: 'var(--border)' }
                        : undefined
                    }
                  >
                    Hari Ini ({reviewedCards.length})
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab(ANKI_HISTORY_TAB.TIMELINE)}
                    className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg text-xs transition-all ${
                      activeTab === ANKI_HISTORY_TAB.TIMELINE
                        ? 'font-bold text-foreground shadow-sm border'
                        : 'font-medium text-muted-foreground hover:text-foreground'
                    }`}
                    style={
                      activeTab === ANKI_HISTORY_TAB.TIMELINE
                        ? { background: 'var(--card)', borderColor: 'var(--border)' }
                        : undefined
                    }
                  >
                    Riwayat Harian
                  </button>
                </div>

                {activeTab === ANKI_HISTORY_TAB.TIMELINE && (
                  <div
                    className='inline-flex p-0.5 rounded-lg gap-0.5 w-full sm:w-auto'
                    style={{ background: 'var(--secondary)' }}
                  >
                    {RANGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type='button'
                        onClick={() => {
                          setRange(opt.value);
                          setSelectedDateKey(null);
                        }}
                        className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md text-[11px] transition-all ${
                          range === opt.value
                            ? 'font-bold text-foreground shadow-xs'
                            : 'font-medium text-muted-foreground hover:text-foreground'
                        }`}
                        style={range === opt.value ? { background: 'var(--card)' } : undefined}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity Strip & Health Summary (Timeline Mode) */}
              {activeTab === ANKI_HISTORY_TAB.TIMELINE && (
                <>
                  <AnkiHistoryActivityStrip
                    days={activityStrip}
                    dailyTarget={dailyTarget}
                    selectedDateKey={selectedDateKey}
                    onSelectDateKey={setSelectedDateKey}
                  />
                  <AnkiHistoryHealthBar
                    health={healthSummary}
                    showOnlyHighLapses={showOnlyHighLapses}
                    onToggleHighLapses={() => setShowOnlyHighLapses((prev) => !prev)}
                  />
                </>
              )}

              {/* Search Bar */}
              <div className='p-2.5 sm:px-4 border-b bg-background' style={{ borderColor: 'var(--border)' }}>
                <div className='relative flex items-center'>
                  <FaMagnifyingGlass className='absolute left-3 h-3 w-3 text-muted-foreground pointer-events-none' />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      activeTab === ANKI_HISTORY_TAB.TODAY
                        ? 'Cari kartu yang di-review hari ini...'
                        : 'Cari riwayat kartu (kata, arti, atau status)...'
                    }
                    className='w-full rounded-xl border py-1.5 pl-8 pr-7 text-xs transition-colors focus:outline-hidden focus:border-blue-500'
                    style={{
                      background: 'var(--card)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                  />
                  {searchQuery && (
                    <button
                      type='button'
                      onClick={() => setSearchQuery('')}
                      className='absolute right-2.5 text-muted-foreground hover:text-foreground'
                      aria-label='Clear search'
                    >
                      <FaXmark className='h-3 w-3' />
                    </button>
                  )}
                </div>
              </div>

              {/* Content List */}
              {activeTab === ANKI_HISTORY_TAB.TODAY ? (
                <div className='max-h-72 overflow-y-auto divide-y' style={{ borderColor: 'var(--border)' }}>
                  {reviewedCards.length === 0 ? (
                    <div className='p-6 text-center text-xs text-muted-foreground space-y-1'>
                      <FaCalendarDay className='h-6 w-6 mx-auto text-muted-foreground/40' />
                      <p>Belum ada kartu yang di-review hari ini.</p>
                    </div>
                  ) : filteredTodayCards.length === 0 ? (
                    <div className='p-5 text-center text-xs text-muted-foreground'>
                      Tidak ada kartu yang cocok dengan &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    filteredTodayCards.map((card, idx) => {
                      const audioKey = `today-${card.id || idx}`;
                      return (
                        <AnkiHistoryCardRow
                          key={card.id || idx}
                          card={card}
                          index={idx}
                          audioFieldKey={audioKey}
                          isAudioPlaying={isPlaying(audioKey)}
                          audioButtonProps={getAudioButtonProps(
                            audioKey,
                            card.question,
                            'Pronounce word',
                          )}
                          onSelect={setSelectedCard}
                          onQuickSearch={handleQuickSearch}
                        />
                      );
                    })
                  )}
                </div>
              ) : (
                <AnkiHistoryTimelineList
                  groups={filteredTimelineGroups}
                  dailyTarget={dailyTarget}
                  emptyMessage={
                    selectedDateKey
                      ? 'Tidak ada kartu yang di-review pada tanggal ini.'
                      : 'Belum ada riwayat review pada rentang waktu ini.'
                  }
                  isPlaying={isPlaying}
                  getAudioButtonProps={getAudioButtonProps}
                  onSelectCard={setSelectedCard}
                  onQuickSearch={handleQuickSearch}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnkiCardDetailModal
        card={selectedCard}
        isOpen={Boolean(selectedCard)}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default AnkiTodayReviewedBox;
