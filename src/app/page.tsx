'use client';
import React, { useState, useEffect } from 'react';
import FlashcardForm from '@/components/molecules/FlashcardForm';
import FlashcardList from '@/components/organisms/FlashcardList';
import { useAppContext } from '@/context/appContext';
import { Flashcard } from '@/types/flashcard';

const Home: React.FC = () => {
  const { flashcards, addFlashcard, updateFlashcard, deleteFlashcard } =
    useAppContext();
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null,
  );

  useEffect(() => {
    // Fetch flashcards from the context or API if needed
  }, []);

  return (
    <div className='p-10'>
      <h1 className='mb-6 text-3xl font-bold'>Flashcard App</h1>
      <FlashcardForm
        addFlashcard={addFlashcard}
        selectedFlashcard={selectedFlashcard}
        setSelectedFlashcard={setSelectedFlashcard}
      />
      <FlashcardList
        flashcards={flashcards}
        onUpdate={updateFlashcard}
        onDelete={deleteFlashcard}
      />
    </div>
  );
};

export default Home;
