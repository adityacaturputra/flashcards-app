// src/components/organisms/FlashcardList.tsx
import React, { useState, useEffect } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';
import usePagination from '../../hooks/usePagination';
import { useAppContext } from '@/context/appContext';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { useBulkFlashcards } from '@/hooks/useBulkFlashcards';
import BulkActionButtons from '../atoms/BulkActionButtons';
import { useFlashcardSort } from '@/hooks/useFlashcardSort';
import { useAnkiDeck } from '@/hooks/useAnkiDeck';
import { useFlashcardFilter } from '@/hooks/useFlashcardFilter';
import {
  FlashcardFilterControls,
  FlashcardReviewSection,
  FlashcardBrowseSection,
  FlashcardPagination,
} from '../molecules/flashcardList';

type FlashcardListProps = {
  flashcards: Flashcard[];
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  handleOpenCategoryModal: () => void;
  onDelete: (id: string) => Promise<void>;
  selectedProgression: Progression | null;
  isReviewMode: boolean;
  onExitReviewMode?: () => void;
};

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  onUpdate,
  onDelete,
  selectedProgression,
  isReviewMode,
  onExitReviewMode,
  handleOpenCategoryModal,
}) => {
  const { handleRefetchFlashCards, categories, loadingCategories, dataSource } =
    useAppContext();
  const { openModal } = useSearchTemplateContext();

  const [showQuestionAsAnswer, setShowQuestionAsAnswer] = useState(false);
  const pageSize = 10;
  const [lastBulkResult, setLastBulkResult] = useState<{
    changed: number;
    noChange: number;
    failed: number;
    action: string;
  } | null>(null);

  // Bulk selection hook
  const {
    isUpdating,
    isBulkModeEnabled,
    toggleSelection,
    selectAll,
    clearSelection,
    bulkUpdateProgression,
    isSelected,
    getSelectedCount,
    enableBulkMode,
    disableBulkMode,
  } = useBulkFlashcards(dataSource);

  // Anki Spaced Repetition queue & session hook for Review Mode
  const {
    currentCard,
    totalCardsToday,
    completedCount,
    remainingDueCount,
    remainingNewCount,
    isDeckComplete,
    dailyTarget,
    addExtraCards,
    handleCardReviewed,
    todayReviewedCards,
    todayReviewedCount,
    isTodayBoxOpen,
    toggleTodayBox,
    totalDueBacklog,
    forecast,
    isForecastOpen,
    openForecast,
    closeForecast,
  } = useAnkiDeck({
    flashcards,
    isActive: isReviewMode,
  });

  // Filter flashcards based on selected progression, category, and search query
  const {
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredFlashcards,
  } = useFlashcardFilter({
    flashcards,
    selectedProgression,
  });

  // Sort flashcards
  const { sortOption, setSortOption, sortedFlashcards, totalCount } =
    useFlashcardSort(flashcards, filteredFlashcards, isReviewMode);

  // Pagination hook
  const {
    currentItems,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handleFirstPage,
    handleLastPage,
    setCurrentPage,
  } = usePagination<Flashcard>({ items: sortedFlashcards, pageSize });

  // Reset page to 1 when search query, category, progression, or sort changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    searchQuery,
    selectedCategoryId,
    selectedProgression,
    sortOption,
    setCurrentPage,
  ]);

  // Bulk action handlers
  const handleBulkIncrease = async () => {
    try {
      const result = await bulkUpdateProgression('increase');
      await handleRefetchFlashCards();
      if (result) {
        setLastBulkResult({
          changed: result.changed || 0,
          noChange: result.noChange || 0,
          failed: result.failed || 0,
          action: 'increase',
        });
      }
    } catch (error) {
      console.error('Failed to increase progression:', error);
    }
  };

  const handleBulkCurrent = async () => {
    try {
      const result = await bulkUpdateProgression('current');
      await handleRefetchFlashCards();
      if (result) {
        setLastBulkResult({
          changed: result.changed || 0,
          noChange: result.noChange || 0,
          failed: result.failed || 0,
          action: 'current',
        });
      }
    } catch (error) {
      console.error('Failed to set current progression:', error);
    }
  };

  const handleBulkDecrease = async () => {
    try {
      const result = await bulkUpdateProgression('decrease');
      await handleRefetchFlashCards();
      if (result) {
        setLastBulkResult({
          changed: result.changed || 0,
          noChange: result.noChange || 0,
          failed: result.failed || 0,
          action: 'decrease',
        });
      }
    } catch (error) {
      console.error('Failed to decrease progression:', error);
    }
  };

  const handleBulkCancel = () => {
    clearSelection();
  };

  return (
    <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
      {/* Controls Section (Browsing Mode only) */}
      {!isReviewMode && (
        <FlashcardFilterControls
          categories={categories}
          loadingCategories={loadingCategories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onOpenCategoryModal={handleOpenCategoryModal}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearchQuery}
          onOpenSearchTemplates={openModal}
          isBulkModeEnabled={isBulkModeEnabled}
          selectedBulkCount={getSelectedCount()}
          onToggleBulkMode={() => {
            if (isBulkModeEnabled) {
              disableBulkMode();
            } else {
              enableBulkMode();
            }
          }}
          showQuestionAsAnswer={showQuestionAsAnswer}
          onToggleReverseQA={() => setShowQuestionAsAnswer(!showQuestionAsAnswer)}
          onRefresh={handleRefetchFlashCards}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalCount={totalCount}
        />
      )}

      {/* Review Mode View vs Browsing Mode View */}
      {isReviewMode? (
        <FlashcardReviewSection
          remainingDueCount={remainingDueCount}
          remainingNewCount={remainingNewCount}
          completedCount={completedCount}
          totalCardsToday={totalCardsToday}
          dailyTarget={dailyTarget}
          todayReviewedCount={todayReviewedCount}
          totalDueBacklog={totalDueBacklog}
          isTodayBoxOpen={isTodayBoxOpen}
          toggleTodayBox={toggleTodayBox}
          isForecastOpen={isForecastOpen}
          openForecast={openForecast}
          closeForecast={closeForecast}
          forecast={forecast}
          isDeckComplete={isDeckComplete}
          todayReviewedCards={todayReviewedCards}
          addExtraCards={addExtraCards}
          currentCard={currentCard}
          showQuestionAsAnswer={showQuestionAsAnswer}
          onUpdate={onUpdate}
          onDelete={onDelete}
          categories={categories}
          handleCardReviewed={handleCardReviewed}
          onExitReviewMode={onExitReviewMode}
        />
      ) : (
        <FlashcardBrowseSection
          currentItems={currentItems}
          showQuestionAsAnswer={showQuestionAsAnswer}
          onUpdate={onUpdate}
          onDelete={onDelete}
          categories={categories}
          isBulkModeEnabled={isBulkModeEnabled}
          isSelected={(id) => isSelected(id)}
          toggleSelection={toggleSelection}
        />
      )}

      {/* Modern Pagination Controls (Browsing Mode only) */}
      {!isReviewMode && (
        <FlashcardPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          totalItems={sortedFlashcards.length}
          onFirstPage={handleFirstPage}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onLastPage={handleLastPage}
          onSelectPage={setCurrentPage}
        />
      )}

      {/* Bulk Action Buttons */}
      <BulkActionButtons
        isVisible={isBulkModeEnabled && getSelectedCount() > 0}
        selectedCount={getSelectedCount()}
        isUpdating={isUpdating}
        onIncrease={handleBulkIncrease}
        onCurrent={handleBulkCurrent}
        onDecrease={handleBulkDecrease}
        onCancel={handleBulkCancel}
        onSelectAll={() => {
          selectAll(
            currentItems
              .map((f) => f._id)
              .filter((id) => id !== undefined) as string[],
          );
        }}
        lastResult={lastBulkResult}
      />
    </div>
  );
};

export default FlashcardList;
