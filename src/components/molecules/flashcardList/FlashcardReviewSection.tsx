// src/components/molecules/flashcardList/FlashcardReviewSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { HiExclamationCircle } from 'react-icons/hi';
import FlashcardComponent from '../../atoms/FlashcardComponent';
import { Flashcard, FlashcardCategory } from '@/types/flashcard';
import { AnkiForecastDay, ReviewedTodayItem } from '@/types/anki';
import {
  AnkiReviewHeader,
  AnkiForecastModal,
  AnkiDeckComplete,
  AnkiTodayReviewedBox,
} from '../anki';
import { applyReverseQA, unreverseUpdates } from '@/utils/flashcardReverseQA';

export interface FlashcardReviewSectionProps {
  remainingDueCount: number;
  remainingNewCount: number;
  completedCount: number;
  totalCardsToday: number;
  dailyTarget: number;
  todayReviewedCount: number;
  totalDueBacklog: number;
  isTodayBoxOpen: boolean;
  toggleTodayBox: () => void;
  isForecastOpen: boolean;
  openForecast: () => void;
  closeForecast: () => void;
  forecast: AnkiForecastDay[];
  isDeckComplete: boolean;
  todayReviewedCards: ReviewedTodayItem[];
  addExtraCards: (count: number) => void;
  currentCard: Flashcard | null;
  showQuestionAsAnswer: boolean;
  onUpdate: (id: string, updates: Partial<Flashcard>) => Promise<void> | void;
  onDelete: (id: string) => Promise<void>;
  categories: FlashcardCategory[];
  handleCardReviewed: (id: string) => void;
  onExitReviewMode?: () => void;
}

export const FlashcardReviewSection: React.FC<FlashcardReviewSectionProps> = ({
  remainingDueCount,
  remainingNewCount,
  completedCount,
  totalCardsToday,
  dailyTarget,
  todayReviewedCount,
  totalDueBacklog,
  isTodayBoxOpen,
  toggleTodayBox,
  isForecastOpen,
  openForecast,
  closeForecast,
  forecast,
  isDeckComplete,
  todayReviewedCards,
  addExtraCards,
  currentCard,
  showQuestionAsAnswer,
  onUpdate,
  onDelete,
  categories,
  handleCardReviewed,
  onExitReviewMode,
}) => {
  return (
    <div className='mx-auto w-full max-w-2xl py-2 sm:py-4'>
      {/* Anki Review Header with due/new counters, progress bar, & forecast trigger */}
      <AnkiReviewHeader
        remainingDue={remainingDueCount}
        remainingNew={remainingNewCount}
        completedCount={completedCount}
        totalCardsToday={totalCardsToday}
        dailyTarget={dailyTarget}
        todayReviewedCount={todayReviewedCount}
        totalDueBacklog={totalDueBacklog}
        onOpenForecast={openForecast}
        onToggleTodayBox={toggleTodayBox}
        onExitReview={() => onExitReviewMode?.()}
      />

      {/* Collapsible Kotak Today when user toggles it during review */}
      {isTodayBoxOpen && !isDeckComplete && (
        <div className='mb-4'>
          <AnkiTodayReviewedBox
            reviewedCards={todayReviewedCards}
            dailyTarget={dailyTarget}
            defaultExpanded={true}
          />
        </div>
      )}

      {/* Anki 7-Day Spaced Repetition Workload Forecast Modal */}
      <AnkiForecastModal
        isOpen={isForecastOpen}
        onClose={closeForecast}
        forecast={forecast}
        dailyTarget={dailyTarget}
        totalDueBacklog={totalDueBacklog}
      />

      {/* Active Card or Deck Completion Screen */}
      {isDeckComplete ? (
        <AnkiDeckComplete
          completedCount={completedCount}
          todayReviewedCards={todayReviewedCards}
          tomorrowForecast={forecast[1]}
          dailyTarget={dailyTarget}
          totalDueBacklog={totalDueBacklog}
          onLearnMore={() => addExtraCards(5)}
          onOpenForecast={openForecast}
          onExitReview={() => onExitReviewMode?.()}
        />
      ) : currentCard ? (
        <motion.div
          key={currentCard._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <FlashcardComponent
            flashcard={applyReverseQA(currentCard, showQuestionAsAnswer)}
            onUpdate={async (id: string, updates: Partial<Flashcard>) => {
              // When progression rating is assigned, record card review in Anki daily queue
              if (updates.progression) {
                handleCardReviewed(id);
              }
              return await onUpdate(
                id,
                unreverseUpdates(updates, showQuestionAsAnswer),
              );
            }}
            onDelete={onDelete}
            categories={categories}
            isBulkMode={false}
            isSelected={false}
            onToggleSelection={() => {}}
          />
        </motion.div>
      ) : (
        <div className='mt-16 flex flex-col items-center justify-center'>
          <HiExclamationCircle className='mb-4 text-8xl text-gray-400' />
          <p className='text-2xl text-gray-600'>No flashcards found</p>
        </div>
      )}
    </div>
  );
};

export default FlashcardReviewSection;
