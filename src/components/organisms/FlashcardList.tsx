// src/components/organisms/FlashcardList.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FlashcardComponent from '../atoms/FlashcardComponent';
import {
  Flashcard,
  progressionOrder,
  Progression,
} from '../../types/flashcard';
import usePagination from '../../hooks/usePagination';
import {
  HiExclamationCircle,
  HiRefresh,
  HiSwitchHorizontal,
  HiXCircle,
} from 'react-icons/hi'; // Import the empty state icon and refresh icon
import { useAppContext } from '@/context/appContext';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { FiLoader } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { useBulkFlashcards } from '@/hooks/useBulkFlashcards';
import BulkActionButtons from '../atoms/BulkActionButtons';

type FlashcardListProps = {
  flashcards: Flashcard[];
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  handleOpenCategoryModal: () => void;
  onDelete: (id: string) => Promise<void>;
  selectedProgression: Progression | null;
  isReviewMode: boolean; // Adding isReviewMode prop
};

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  onUpdate,
  onDelete,
  selectedProgression,
  isReviewMode,
  handleOpenCategoryModal,
}) => {
  const { handleRefetchFlashCards, categories, loadingCategories } =
    useAppContext();
  const { openModal } = useSearchTemplateContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuestionAsAnswer, setShowQuestionAsAnswer] = useState(false); // New state to track toggle
  const pageSize = isReviewMode ? 1 : 10; // Set page size based on mode
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
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
  } = useBulkFlashcards();

  // State to hold randomized flashcards
  const [randomizedFlashcards, setRandomizedFlashcards] = useState<Flashcard[]>(
    [],
  );

  useEffect(() => {
    // Randomize flashcards when entering review mode
    if (isReviewMode) {
      const randomCards = [...flashcards].sort(() => Math.random() - 0.5);
      setRandomizedFlashcards(randomCards);
    } else {
      setRandomizedFlashcards([]);
    }
  }, [flashcards, isReviewMode]);

  // Filter flashcards based on the selected progression, category, and search query
  let filteredFlashcards = isReviewMode ? randomizedFlashcards : flashcards;
  filteredFlashcards = filteredFlashcards.filter((flashcard) => {
    const progressionMatch =
      selectedProgression === null ||
      flashcard.progression === selectedProgression;
    const categoryMatch =
      selectedCategoryId === '' ||
      (flashcard.categories &&
        flashcard.categories.includes(selectedCategoryId));
    const searchMatch =
      flashcard.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flashcard.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return progressionMatch && categoryMatch && searchMatch;
  });

  // Sort the filtered flashcards based on the progression order and nextReviewDate if not in review mode
  const sortedFlashcards = isReviewMode
    ? filteredFlashcards
    : [...filteredFlashcards].sort((a, b) => {
        const progressionComparison =
          progressionOrder[a.progression] - progressionOrder[b.progression];
        if (progressionComparison === 0) {
          return (
            new Date(a.nextReviewDate).getTime() -
            new Date(b.nextReviewDate).getTime()
          );
        }
        return progressionComparison;
      });

  // Use the pagination hook
  const {
    currentItems,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handleFirstPage,
    handleLastPage,
    setCurrentPage, // Add setCurrentPage to control the page manually
  } = usePagination<Flashcard>({ items: sortedFlashcards, pageSize });

  // Effect to reset page to 1 when search query, category filter, or progression filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, selectedCategoryId, selectedProgression, setCurrentPage]);

  // Bulk action handlers
  const handleBulkIncrease = async () => {
    try {
      const result = await bulkUpdateProgression('increase');
      handleRefetchFlashCards();
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
      handleRefetchFlashCards();
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
      handleRefetchFlashCards();
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
      {/* Controls Section */}
      {!isReviewMode && (
        <div className='mb-8 space-y-6'>
          {/* Category Filter and Management */}
          <div className='mb-3 sm:mb-4'>
            <h3 className='mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-sm font-semibold text-transparent sm:mb-3 sm:text-base'>
              Filter by Category
            </h3>

            {loadingCategories ? (
              <div className='flex items-center justify-center py-4'>
                <FiLoader
                  className='h-6 w-6 animate-spin'
                  style={{ color: 'var(--primary)' }}
                />
              </div>
            ) : (
              <>
                {/* Category Tags */}
                <div className='mb-3 flex flex-wrap gap-1 sm:gap-2'>
                  <label
                    className='flex cursor-pointer items-center gap-1 rounded-full border px-2 py-1 transition-all hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5'
                    style={{
                      background:
                        selectedCategoryId === ''
                          ? 'var(--primary)'
                          : 'var(--muted)',
                      borderColor: 'var(--border)',
                      color:
                        selectedCategoryId === ''
                          ? 'var(--primary-foreground)'
                          : 'var(--foreground)',
                    }}
                  >
                    <input
                      type='radio'
                      name='categoryFilter'
                      value=''
                      checked={selectedCategoryId === ''}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className='sr-only'
                    />
                    <span className='text-xs font-medium'>All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label
                      key={category._id}
                      className='flex cursor-pointer items-center gap-1 rounded-full border px-2 py-1 transition-all hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5'
                      style={{
                        background:
                          selectedCategoryId === category._id
                            ? 'var(--primary)'
                            : 'var(--muted)',
                        borderColor: 'var(--border)',
                        color:
                          selectedCategoryId === category._id
                            ? 'var(--primary-foreground)'
                            : 'var(--foreground)',
                      }}
                    >
                      <input
                        type='radio'
                        name='categoryFilter'
                        value={category._id}
                        checked={selectedCategoryId === category._id}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        className='sr-only'
                      />
                      <span className='text-xs font-medium'>
                        {category.name}
                      </span>
                    </label>
                  ))}
                  {/* Manage Categories Button */}
                  <motion.button
                    className='rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 sm:py-2 sm:text-sm'
                    style={{
                      background: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                    onClick={handleOpenCategoryModal}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className='inline'>+</span>
                  </motion.button>
                </div>
              </>
            )}
          </div>

          {/* Search and Action Controls */}
          <div className='relative'>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <div className='flex flex-1 gap-2'>
                <div className='relative flex-1'>
                  <input
                    type='text'
                    placeholder='Search flashcards...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full rounded-lg border-2 px-4 py-3 pr-10 text-base transition-colors focus:border-blue-500 focus:outline-none'
                    style={{
                      background: 'var(--input)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                  />
                  {searchQuery && (
                    <motion.button
                      className='hover:bg-opacity-10 absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 transition-colors'
                      onClick={() => setSearchQuery('')}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiXCircle
                        className='h-5 w-5'
                        style={{ color: 'var(--muted-foreground)' }}
                      />
                    </motion.button>
                  )}
                </div>
              </div>

              <div className='flex gap-2'>
                <motion.button
                  className='rounded-lg p-3 transition-all hover:scale-105 hover:shadow-md'
                  style={{
                    background: 'var(--background)',
                    color: '#4285f4', // Google Blue
                    border: '1px solid var(--border)',
                  }}
                  onClick={openModal}
                  whileTap={{ scale: 0.95 }}
                  title='Search Template Settings'
                >
                  <FaGoogle className='h-5 w-5' />
                </motion.button>

                {/* Bulk Selection Toggle */}
                <motion.button
                  className='rounded-lg p-3 transition-all hover:scale-105 hover:shadow-md'
                  style={{
                    background: isBulkModeEnabled
                      ? getSelectedCount() > 0
                        ? 'var(--destructive)'
                        : 'var(--primary)'
                      : 'var(--background)',
                    color: isBulkModeEnabled
                      ? getSelectedCount() > 0
                        ? 'var(--destructive-foreground)'
                        : 'var(--primary-foreground)'
                      : 'var(--foreground)',
                    border: '1px solid var(--border)',
                  }}
                  onClick={() => {
                    if (isBulkModeEnabled) {
                      disableBulkMode();
                    } else {
                      enableBulkMode();
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={
                    isBulkModeEnabled ? 'Disable Bulk Mode' : 'Enable Bulk Mode'
                  }
                >
                  {isBulkModeEnabled ? (
                    <span className='text-xs font-bold'>
                      {getSelectedCount() > 0 ? getSelectedCount() : '✓'}
                    </span>
                  ) : (
                    <span className='text-xs font-bold'>⚡</span>
                  )}
                </motion.button>

                <motion.button
                  className='rounded-lg p-3 transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none'
                  style={{
                    background: showQuestionAsAnswer
                      ? 'var(--primary)'
                      : 'var(--secondary)',
                    color: showQuestionAsAnswer
                      ? 'var(--primary-foreground)'
                      : 'var(--secondary-foreground)',
                  }}
                  onClick={() => setShowQuestionAsAnswer(!showQuestionAsAnswer)}
                  title='Toggle Question/Answer'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiSwitchHorizontal className='h-5 w-5' />
                </motion.button>

                <motion.button
                  className='rounded-lg p-3 transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                  onClick={handleRefetchFlashCards}
                  title='Refresh Flashcards'
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiRefresh className='h-5 w-5' />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcard List */}
      <div
        className={`${isReviewMode ? `absolute bottom-40 max-w-[80vw]` : ''}`}
      >
        {currentItems.length > 0 ? (
          <motion.div
            className={'space-y-4'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentItems.map((flashcard, index) => (
              <motion.div
                key={flashcard._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <FlashcardComponent
                  flashcard={{
                    ...flashcard,
                    question: showQuestionAsAnswer
                      ? flashcard.answer
                      : flashcard.question,
                    answer: showQuestionAsAnswer
                      ? flashcard.question
                      : flashcard.answer,
                  }}
                  onUpdate={async (id: string, updates: Partial<Flashcard>) => {
                    console.log({ updates });
                    // If the card is reversed, we need to swap the question/answer back
                    if (
                      showQuestionAsAnswer &&
                      (updates.question || updates.answer)
                    ) {
                      const correctedUpdates = { ...updates };
                      if (updates.question) {
                        correctedUpdates.answer = updates.question;
                      }
                      if (updates.answer) {
                        correctedUpdates.question = updates.answer;
                      }
                      onUpdate(id, correctedUpdates);
                    } else {
                      onUpdate(id, updates);
                    }
                  }}
                  onDelete={onDelete}
                  categories={categories}
                  isBulkMode={isBulkModeEnabled}
                  isSelected={isSelected(flashcard._id || '')}
                  onToggleSelection={toggleSelection}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className='mt-16 flex flex-col items-center justify-center'>
            <HiExclamationCircle className='mb-4 text-8xl text-gray-400' />
            <p className='text-2xl text-gray-600'>No flashcards found</p>
          </div>
        )}
      </div>

      {/* Modern Pagination Controls */}
      {!isReviewMode && currentItems.length > 0 && totalPages > 1 && (
        <div className='mt-6 mb-6 flex flex-col items-center gap-3'>
          {/* Page Info */}
          <div className='text-center'>
            <p
              className='text-xs font-medium sm:text-sm'
              style={{ color: 'var(--muted-foreground)' }}
            >
              <span className='hidden sm:inline'>
                Showing {currentPage * pageSize + 1} to{' '}
                {Math.min(
                  (currentPage + 1) * pageSize,
                  sortedFlashcards.length,
                )}{' '}
                of {sortedFlashcards.length} flashcards
              </span>
              <span className='sm:hidden'>
                {currentPage + 1} / {totalPages}
              </span>
            </p>
          </div>

          {/* Pagination Buttons */}
          <div className='flex items-center gap-1'>
            {/* First Page Button */}
            <button
              className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
              style={{
                background:
                  currentPage === 0 ? 'var(--muted)' : 'var(--primary)',
                color:
                  currentPage === 0
                    ? 'var(--muted-foreground)'
                    : 'var(--primary-foreground)',
              }}
              onClick={handleFirstPage}
              disabled={currentPage === 0}
              title='First page'
            >
              <svg
                className='h-3 w-3 sm:h-4 sm:w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Previous Page Button */}
            <button
              className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
              style={{
                background:
                  currentPage === 0 ? 'var(--muted)' : 'var(--primary)',
                color:
                  currentPage === 0
                    ? 'var(--muted-foreground)'
                    : 'var(--primary-foreground)',
              }}
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              title='Previous page'
            >
              <svg
                className='h-3 w-3 sm:h-4 sm:w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className='flex items-center gap-0.5'>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 3) {
                  pageNumber = i;
                } else if (currentPage < 2) {
                  pageNumber = i;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 3 + i;
                } else {
                  pageNumber = currentPage - 1 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className='flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-all hover:scale-105 sm:h-7 sm:w-7 sm:text-sm'
                    style={{
                      background:
                        currentPage === pageNumber
                          ? 'var(--primary)'
                          : 'var(--muted)',
                      color:
                        currentPage === pageNumber
                          ? 'var(--primary-foreground)'
                          : 'var(--foreground)',
                    }}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setCurrentPage(pageNumber);
                    }}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
              style={{
                background:
                  currentPage === totalPages - 1
                    ? 'var(--muted)'
                    : 'var(--primary)',
                color:
                  currentPage === totalPages - 1
                    ? 'var(--muted-foreground)'
                    : 'var(--primary-foreground)',
              }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              title='Next page'
            >
              <svg
                className='h-3 w-3 sm:h-4 sm:w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>

            {/* Last Page Button */}
            <button
              className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
              style={{
                background:
                  currentPage === totalPages - 1
                    ? 'var(--muted)'
                    : 'var(--primary)',
                color:
                  currentPage === totalPages - 1
                    ? 'var(--muted-foreground)'
                    : 'var(--primary-foreground)',
              }}
              onClick={handleLastPage}
              disabled={currentPage === totalPages - 1}
              title='Last page'
            >
              <svg
                className='h-3 w-3 sm:h-4 sm:w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 5l7 7-7 7M5 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
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
