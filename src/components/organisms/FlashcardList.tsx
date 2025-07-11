// components/organisms/FlashcardList.tsx
import React from 'react';
import { motion } from 'framer-motion';
import FlashcardComponent from '../atoms/FlashcardComponent';
import { Flashcard, progressionOrder } from '../../types/flashcard';

type FlashcardListProps = {
  flashcards: Flashcard[];
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  onDelete: (id: string) => Promise<void>;
};

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  onUpdate,
  onDelete,
}) => {
  // Sort flashcards based on the progression order and nextReviewDate
  const sortedFlashcards = [...flashcards].sort((a, b) => {
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

  return (
    <motion.div
      className='space-y-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {sortedFlashcards.map((flashcard, index) => (
        <motion.div
          key={flashcard._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          drag='y'
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
  );
};

export default FlashcardList;
