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
import Select from '../atoms/Select';
import { FiLoader } from 'react-icons/fi';

type FlashcardListProps = {
  flashcards: Flashcard[];
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
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
}) => {
  const {
    handleRefetchFlashCards,
    loadingAction,
    categories,
    loadingCategories,
  } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuestionAsAnswer, setShowQuestionAsAnswer] = useState(false); // New state to track toggle
  const pageSize = isReviewMode ? 1 : 10; // Set page size based on mode
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

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
    setCurrentPage, // Add setCurrentPage to control the page manually
  } = usePagination<Flashcard>({ items: sortedFlashcards, pageSize });

  // Effect to reset page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, setCurrentPage]);

  return (
    <div className={`space-y-4`}>
      {/* Search Bar and Refetch Icon */}
      {!isReviewMode && (
        <>
          {/* Category Filter */}
          {loadingCategories && !isReviewMode && (
            <div className='flex items-center justify-center'>
              <FiLoader />
            </div>
          )}
          {!isReviewMode && (
            <div className='mt-4'>
              <Select
                label='Filter by Category'
                options={[
                  { _id: '', name: 'All Categories' },
                  ...categories,
                ].map((cat) => ({
                  value: cat._id!,
                  label: cat.name,
                }))}
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
              />
            </div>
          )}
          <div className='relative mb-4'>
            <div className='flex items-center gap-2'>
              <input
                type='text'
                placeholder='Search by question or answer'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none`}
              />
              {searchQuery && (
                <motion.button
                  className='transform rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none'
                  onClick={() => setSearchQuery('')}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiXCircle className='text-xl' />
                </motion.button>
              )}
            </div>
            <motion.button
              className='absolute -top-24 right-9 -translate-y-1/2 transform rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none'
              onClick={() => setShowQuestionAsAnswer(!showQuestionAsAnswer)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.9 }}
            >
              <HiSwitchHorizontal className='text-xl' />
            </motion.button>
            <motion.button
              className='absolute -top-24 -right-3 -translate-y-1/2 transform rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none'
              onClick={handleRefetchFlashCards}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.9 }}
            >
              <HiRefresh className='text-xl' />
            </motion.button>
          </div>
        </>
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
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  categories={categories}
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

      {/* Pagination Controls */}
      {!isReviewMode && currentItems.length > 0 && totalPages > 1 && (
        <div className='mt-8 mb-8 flex justify-center'>
          <button
            className='mr-2 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500'
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <div className='flex items-center'>
            <span className='px-6 py-3 text-lg text-gray-700'>
              {currentPage + 1} / {totalPages}
            </span>
          </div>
          <button
            className='ml-2 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500'
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}

      {loadingAction && (
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-gray-500'>
            <span>Loading...</span>
            <div className='ml-2'>
              <svg
                className='h-5 w-5 animate-spin'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8s-3.589-8-8-8S4 7.589 4 12h4.188c0 2.434.63 4.685 1.645 6.291z'
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardList;
