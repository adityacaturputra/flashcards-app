// src/components/organisms/FlashcardList.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlashcardComponent from '../atoms/FlashcardComponent';
import {
  Flashcard,
  progressionOrder,
  Progression,
} from '../../types/flashcard';
import usePagination from '../../hooks/usePagination';

type FlashcardListProps = {
  flashcards: Flashcard[];
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  onDelete: (id: string) => Promise<void>;
  selectedProgression: Progression | null;
};

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  onUpdate,
  onDelete,
  selectedProgression,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 10; // Number of flashcards per page

  // Filter flashcards based on the selected progression and search query
  const filteredFlashcards = selectedProgression
    ? flashcards.filter(
        (flashcard) =>
          flashcard.progression === selectedProgression &&
          (flashcard.question
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            flashcard.answer.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : flashcards.filter(
        (flashcard) =>
          flashcard.question
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          flashcard.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  // Sort the filtered flashcards based on the progression order and nextReviewDate
  const sortedFlashcards = [...filteredFlashcards].sort((a, b) => {
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
    <div className='space-y-4'>
      {/* Search Bar */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by question or answer'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
        />
      </div>

      <motion.div
        className='space-y-4'
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

      {/* Pagination Controls */}
      <div className='mt-8 flex justify-center'>
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
    </div>
  );
};

export default FlashcardList;
