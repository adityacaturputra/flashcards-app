'use client';
import React, { useState } from 'react';
import FlashcardList from '@/components/organisms/FlashcardList';
import { useAppContext } from '@/context/appContext';
import { Progression } from '@/types/flashcard';
import { motion } from 'framer-motion';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const Home: React.FC = () => {
  const { flashcards, updateFlashcard, deleteFlashcard, loading } =
    useAppContext();

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [selectedProgression, setSelectedProgression] =
    useState<Progression | null>(null);

  const handleFilterChange = (progression: Progression | null) => {
    setSelectedProgression(progression);
  };

  const handleNavigateToCategoryPage = () => {
    window.location.href = '/add-category';
  };

  return (
    <>
      {/* Modern Header */}
      <header
        className='backdrop-blur-glass sticky top-0 z-50 border-b'
        style={{
          borderColor: 'var(--border)',
        }}
      >
        <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 sm:gap-4'>
              <h1 className='gradient-text-accent text-xl font-bold sm:text-2xl lg:text-3xl'>
                <span className='hidden sm:inline'>Flashcard App</span>
                <span className='sm:hidden'>Flashcards</span>
              </h1>
              <div
                className='rounded-full px-2 py-1 text-xs font-medium sm:px-3 sm:text-sm'
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {flashcards.length}
              </div>
            </div>

            <div className='flex items-center gap-2 sm:gap-3'>
              <motion.button
                className='rounded-lg px-2 py-2 text-xs font-medium transition-all hover:scale-105 sm:px-4 sm:text-sm'
                style={{
                  background: isReviewMode
                    ? 'var(--destructive)'
                    : 'var(--secondary)',
                  color: isReviewMode
                    ? 'var(--destructive-foreground)'
                    : 'var(--secondary-foreground)',
                }}
                onClick={() => setIsReviewMode((prev) => !prev)}
                whileTap={{ scale: 0.95 }}
              >
                <span className='hidden sm:inline'>
                  {isReviewMode ? 'Exit Review' : 'Review Mode'}
                </span>
                <span className='sm:hidden'>
                  {isReviewMode ? 'Exit' : 'Review'}
                </span>
              </motion.button>

              {!isReviewMode && (
                <motion.button
                  className='rounded-lg px-2 py-2 text-xs font-medium transition-all hover:scale-105 sm:px-4 sm:text-sm'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  onClick={() => (window.location.href = '/add-flashcard')}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='hidden sm:inline'>+ Add Flashcard</span>
                  <span className='sm:hidden'>+</span>
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
        <div className='fade-in-up mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8'>
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
              handleOpenCategoryModal={handleNavigateToCategoryPage}
            />
          )}
          <div className='h-[120px]' />
        </div>
      </main>

      {/* Modern Progression Filter Tabs */}
      {!isReviewMode && (
        <div
          className='backdrop-blur-glass card-shadow fixed right-0 bottom-0 left-0 z-40 border-t'
          style={{
            borderColor: 'var(--border)',
          }}
        >
          <div className='mx-auto max-w-7xl px-3 py-2 sm:px-6 sm:py-4'>
            <div className='flex items-center gap-1 overflow-x-auto sm:gap-2'>
              <span
                className='mr-3 hidden text-sm font-medium whitespace-nowrap sm:inline'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Filter by progress:
              </span>
              {Object.values(Progression).map((progression) => (
                <motion.button
                  key={progression}
                  className='rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap transition-all hover:scale-105 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm'
                  style={{
                    background:
                      selectedProgression === progression
                        ? 'var(--primary)'
                        : 'var(--secondary)',
                    color:
                      selectedProgression === progression
                        ? 'var(--primary-foreground)'
                        : 'var(--secondary-foreground)',
                  }}
                  onClick={() => handleFilterChange(progression)}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='hidden sm:inline'>
                    {progression.charAt(0).toUpperCase() + progression.slice(1)}
                  </span>
                  <span className='sm:hidden'>
                    {progression === 'perfect'
                      ? 'Perf'
                      : progression === 'good'
                        ? 'Good'
                        : progression === 'normal'
                          ? 'Norm'
                          : progression === 'hard'
                            ? 'Hard'
                            : progression === 'retry'
                              ? 'Retry'
                              : 'New'}
                  </span>
                </motion.button>
              ))}
              <motion.button
                className='rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap transition-all hover:scale-105 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm'
                style={{
                  background:
                    selectedProgression === null
                      ? 'var(--primary)'
                      : 'var(--secondary)',
                  color:
                    selectedProgression === null
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
