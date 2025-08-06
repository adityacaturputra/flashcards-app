'use client';
import React, { useState } from 'react';
import FlashcardForm from '@/components/molecules/FlashcardForm';
import FlashcardList from '@/components/organisms/FlashcardList';
import CategoryForm from '@/components/molecules/CategoryForm';
import { useAppContext } from '@/context/appContext';
import { Flashcard, Progression } from '@/types/flashcard';
import { motion } from 'framer-motion';
import Modal from '@/components/atoms/Modal';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const Home: React.FC = () => {
  const {
    flashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    loading,
  } = useAppContext();

  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [selectedProgression, setSelectedProgression] =
    useState<Progression | null>(null);

  const handleAddFlashcard = async (newFlashcard: Flashcard) => {
    addFlashcard(newFlashcard);
    setIsModalOpen(false);
  };

  const handleFilterChange = (progression: Progression | null) => {
    setSelectedProgression(progression);
  };

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleSaveCategory = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <>
      <div className='relative h-screen p-10'>
        <h1 className='mb-6 text-3xl font-bold'>Flashcard App</h1>

        {/* Render Skeleton Loader or Flashcard List based on loading state */}
        {loading ? (
          <SkeletonLoader count={5} />
        ) : (
          <FlashcardList
            flashcards={flashcards}
            onUpdate={updateFlashcard}
            onDelete={deleteFlashcard}
            selectedProgression={selectedProgression}
            isReviewMode={isReviewMode}
            handleOpenCategoryModal={handleOpenCategoryModal}
          />
        )}
        <div className='h-[120px]' />

        <motion.button
          className='fixed bottom-20 left-5 z-10 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none'
          onClick={() => setIsReviewMode((prev) => !prev)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          whileTap={{ scale: 0.9 }}
        >
          {isReviewMode ? 'Exit Review Mode' : 'Enter Review Mode'}
        </motion.button>

        {/* Floating Button to Open Flashcard Modal */}
        {!isReviewMode && (
          <motion.button
            className='fixed right-5 bottom-20 z-10 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none'
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            whileTap={{ scale: 0.9 }}
          >
            + Add Flashcard
          </motion.button>
        )}
      </div>

      {/* Modal for Flashcard Form */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <FlashcardForm
            addFlashcard={handleAddFlashcard}
            selectedFlashcard={selectedFlashcard}
            setSelectedFlashcard={setSelectedFlashcard}
          />
        </Modal>
      )}

      {/* Modal for Category Form */}
      {isCategoryModalOpen && (
        <Modal isOpen={isCategoryModalOpen} onClose={handleCloseCategoryModal}>
          <CategoryForm
            onClose={handleCloseCategoryModal}
            onSave={handleSaveCategory}
          />
        </Modal>
      )}

      {/* Tabs for Progression Filtering */}
      {!isReviewMode && (
        <div className='bg-opacity-90 fixed right-0 bottom-0 left-0 z-10 flex items-center overflow-x-auto bg-white whitespace-nowrap'>
          <div className='flex space-x-4 p-4'>
            {Object.values(Progression).map((progression) => (
              <button
                key={progression}
                className={`rounded px-4 py-2 ${
                  selectedProgression === progression
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
                onClick={() => handleFilterChange(progression)}
              >
                {progression.charAt(0).toUpperCase() + progression.slice(1)}
              </button>
            ))}
            <button
              className={`rounded px-4 py-2 ${
                selectedProgression === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
              onClick={() => handleFilterChange(null)}
            >
              All
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
