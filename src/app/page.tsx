// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import FlashcardForm from '@/components/molecules/FlashcardForm';
import FlashcardList from '@/components/organisms/FlashcardList';
import { useAppContext } from '@/context/appContext';
import { Flashcard } from '@/types/flashcard';
import { motion } from 'framer-motion';
import Modal from '@/components/atoms/Modal'; // New import for Modal component

const Home: React.FC = () => {
  const { flashcards, addFlashcard, updateFlashcard, deleteFlashcard } =
    useAppContext();
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFlashcard = async (newFlashcard: Flashcard) => {
    addFlashcard(newFlashcard);
    setIsModalOpen(false); // Close the modal after adding flashcard
  };

  return (
    <div className='p-10'>
      <h1 className='mb-6 text-3xl font-bold'>Flashcard App</h1>
      <FlashcardList
        flashcards={flashcards}
        onUpdate={updateFlashcard}
        onDelete={deleteFlashcard}
      />

      {/* Floating Button to Open Modal */}
      <motion.button
        className='absolute right-5 bottom-5 z-10 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none'
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        whileTap={{ scale: 0.9 }}
      >
        + Add Flashcard
      </motion.button>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <FlashcardForm
            addFlashcard={handleAddFlashcard}
            selectedFlashcard={selectedFlashcard}
            setSelectedFlashcard={setSelectedFlashcard}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
