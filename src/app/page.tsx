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
      {/* Modern Header */}
      <header 
        className='sticky top-0 z-50 backdrop-blur-glass border-b'
        style={{
          borderColor: 'var(--border)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <h1 
                className='text-3xl font-bold gradient-text-accent'
              >
                Flashcard App
              </h1>
              <div 
                className='px-3 py-1 rounded-full text-sm font-medium'
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {flashcards.length} cards
              </div>
            </div>
            
            <div className='flex items-center gap-3'>
              <motion.button
                className='px-4 py-2 rounded-lg font-medium transition-all hover:scale-105'
                style={{
                  background: isReviewMode ? 'var(--destructive)' : 'var(--secondary)',
                  color: isReviewMode ? 'var(--destructive-foreground)' : 'var(--secondary-foreground)',
                }}
                onClick={() => setIsReviewMode((prev) => !prev)}
                whileTap={{ scale: 0.95 }}
              >
                {isReviewMode ? 'Exit Review' : 'Review Mode'}
              </motion.button>
              
              {!isReviewMode && (
                <motion.button
                  className='px-4 py-2 rounded-lg font-medium transition-all hover:scale-105'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  onClick={() => setIsModalOpen(true)}
                  whileTap={{ scale: 0.95 }}
                >
                  + Add Flashcard
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className='min-h-screen'
        style={{
          background: 'var(--background)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6 py-8 fade-in-up'>
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
        </div>
      </main>

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

      {/* Modern Progression Filter Tabs */}
      {!isReviewMode && (
        <div 
          className='fixed bottom-0 left-0 right-0 z-40 backdrop-blur-glass border-t card-shadow'
          style={{
            borderColor: 'var(--border)',
          }}
        >
          <div className='max-w-7xl mx-auto px-6 py-4'>
            <div className='flex items-center gap-2 overflow-x-auto'>
              <span 
                className='text-sm font-medium mr-3 whitespace-nowrap'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Filter by progress:
              </span>
              {Object.values(Progression).map((progression) => (
                <motion.button
                  key={progression}
                  className='px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap hover:scale-105'
                  style={{
                    background: selectedProgression === progression 
                      ? 'var(--primary)' 
                      : 'var(--secondary)',
                    color: selectedProgression === progression 
                      ? 'var(--primary-foreground)' 
                      : 'var(--secondary-foreground)',
                  }}
                  onClick={() => handleFilterChange(progression)}
                  whileTap={{ scale: 0.95 }}
                >
                  {progression.charAt(0).toUpperCase() + progression.slice(1)}
                </motion.button>
              ))}
              <motion.button
                className='px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap hover:scale-105'
                style={{
                  background: selectedProgression === null 
                    ? 'var(--primary)' 
                    : 'var(--secondary)',
                  color: selectedProgression === null 
                    ? 'var(--primary-foreground)' 
                    : 'var(--secondary-foreground)',
                }}
                onClick={() => handleFilterChange(null)}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
