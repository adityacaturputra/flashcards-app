'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import FlashcardForm from '@/components/molecules/FlashcardForm';
import { useAppContext } from '@/context/appContext';
import { Flashcard } from '@/types/flashcard';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';

const AddFlashcardPage: React.FC = () => {
  const router = useRouter();
  const { addFlashcard } = useAppContext();

  const handleAddFlashcard = async (newFlashcard: Flashcard) => {
    await addFlashcard(newFlashcard);
    router.back(); // Go back to the previous page
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      className='min-h-screen'
      style={{
        background: 'var(--background)',
      }}
    >
      {/* Header */}
      <header
        className='backdrop-blur-glass sticky top-0 z-50 border-b'
        style={{
          borderColor: 'var(--border)',
          background: 'var(--background)',
        }}
      >
        <div className='mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-5'>
          <div className='flex items-center gap-4'>
            <motion.button
              className='rounded-lg p-2 transition-all hover:scale-105'
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
              onClick={handleGoBack}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className='h-5 w-5' />
            </motion.button>

            <h1 className='gradient-text-accent text-xl font-bold sm:text-2xl'>
              Add Flashcard
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FlashcardForm
            addFlashcard={handleAddFlashcard}
            selectedFlashcard={null}
            setSelectedFlashcard={() => {}}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default AddFlashcardPage;
