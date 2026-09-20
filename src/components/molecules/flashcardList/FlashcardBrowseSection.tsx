// src/components/molecules/flashcardList/FlashcardBrowseSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { HiExclamationCircle } from 'react-icons/hi';
import FlashcardComponent from '../../atoms/FlashcardComponent';
import { Flashcard, FlashcardCategory } from '@/types/flashcard';
import { applyReverseQA, unreverseUpdates } from '@/utils/flashcardReverseQA';

export interface FlashcardBrowseSectionProps {
  currentItems: Flashcard[];
  showQuestionAsAnswer: boolean;
  onUpdate: (id: string, updates: Partial<Flashcard>) => Promise<void> | void;
  onDelete: (id: string) => Promise<void>;
  categories: FlashcardCategory[];
  isBulkModeEnabled: boolean;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
}

export const FlashcardBrowseSection: React.FC<FlashcardBrowseSectionProps> = ({
  currentItems,
  showQuestionAsAnswer,
  onUpdate,
  onDelete,
  categories,
  isBulkModeEnabled,
  isSelected,
  toggleSelection,
}) => {
  return (
    <div>
      {currentItems.length > 0 ? (
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
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <FlashcardComponent
                flashcard={applyReverseQA(flashcard, showQuestionAsAnswer)}
                onUpdate={async (id: string, updates: Partial<Flashcard>) => {
                  return await onUpdate(
                    id,
                    unreverseUpdates(updates, showQuestionAsAnswer),
                  );
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
  );
};

export default FlashcardBrowseSection;
