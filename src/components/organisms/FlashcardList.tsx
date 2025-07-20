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
import { HiExclamationCircle, HiRefresh } from 'react-icons/hi'; // Import the empty state icon and refresh icon
import { useAppContext } from '@/context/appContext';

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
  const { handleRefetchFlashCards } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = isReviewMode ? 1 : 10; // Set page size based on mode

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

  // Filter flashcards based on the selected progression and search query
  let filteredFlashcards = isReviewMode ? randomizedFlashcards : flashcards;
  filteredFlashcards = filteredFlashcards.filter(
    (flashcard) =>
      (selectedProgression === null ||
        flashcard.progression === selectedProgression) &&
      (flashcard.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flashcard.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  );

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
  } = usePagination<Flashcard>({ items: sortedFlashcards, pageSize });

  return (
    <div className={`space-y-4`}>
      {/* Search Bar and Refetch Icon */}
      {!isReviewMode && (
        <div className='relative mb-4'>
          <input
            type='text'
            placeholder='Search by question or answer'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded border border-gray-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none' // Added pr-10 to make space for the icon
          />
          <motion.button
            className='absolute -top-11 right-0 -translate-y-1/2 transform rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none'
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
                dragConstraints={{ top: 0, bottom: 0 }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <FlashcardComponent
                  flashcard={flashcard}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
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
    </div>
  );
};

export default FlashcardList;
