// components/organisms/FlashcardList.tsx
import React from 'react';
import FlashcardComponent from '../atoms/FlashcardComponent';
import { Flashcard, progressionOrder } from '../../types/flashcard';

type FlashcardListProps = {
  flashcards: Flashcard[];
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  onDelete: (id: string) => Promise<void>;
};

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards, onUpdate, onDelete }) => {

  // Sort flashcards based on the progression order and nextReviewDate
  const sortedFlashcards = [...flashcards].sort((a, b) => {
    const progressionComparison = progressionOrder[a.progression] - progressionOrder[b.progression];
    if (progressionComparison === 0) {
      return new Date(a.nextReviewDate).getTime() - new Date(a.nextReviewDate).getTime();
    }
    return progressionComparison;
  });

  return (
    <div className="space-y-4">
      {sortedFlashcards.map((flashcard) => (
        <FlashcardComponent key={flashcard._id} flashcard={flashcard} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default FlashcardList;