'use client';
import React, {
  useState,
  memo,
  useCallback,
  lazy,
  Suspense,
} from 'react';
import { useAppContext } from '@/context/appContext';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { Progression } from '@/types/flashcard';
import { motion } from 'framer-motion';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import PendingUpdatesIndicator from '@/components/atoms/PendingUpdatesIndicator';
import AppHeader from '@/components/organisms/AppHeader';
import { APP_ROUTES } from '@/constants/routes';

// Lazy load heavy components
const FlashcardList = lazy(
  () => import('@/components/organisms/FlashcardList'),
);
const SearchTemplateModal = lazy(
  () => import('@/components/organisms/SearchTemplateModal'),
);

const Home: React.FC = memo(() => {
  const {
    flashcards,
    updateFlashcard,
    deleteFlashcard,
    loading,
    pendingUpdates,
    isProcessingQueue,
    retryQueue,
    clearQueue,
  } = useAppContext();
  const { isModalOpen, closeModal, selectedTemplate, setSelectedTemplate } =
    useSearchTemplateContext();

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [selectedProgression, setSelectedProgression] =
    useState<Progression | null>(null);

  const handleFilterChange = useCallback((progression: Progression | null) => {
    setSelectedProgression(progression);
  }, []);

  const handleNavigateToCategoryPage = useCallback(() => {
    window.location.href = APP_ROUTES.ADD_CATEGORY;
  }, []);

  return (
    <div>
      {/* Modern Responsive Header */}
      <AppHeader
        flashcardsCount={flashcards.length}
        isReviewMode={isReviewMode}
        setIsReviewMode={setIsReviewMode}
      />
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
            <Suspense fallback={<SkeletonLoader count={5} />}>
              <FlashcardList
                flashcards={flashcards}
                onUpdate={updateFlashcard}
                onDelete={deleteFlashcard}
                selectedProgression={selectedProgression}
                isReviewMode={isReviewMode}
                handleOpenCategoryModal={handleNavigateToCategoryPage}
              />
            </Suspense>
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

      {/* Search Template Modal */}
      <Suspense fallback={null}>
        <SearchTemplateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
      </Suspense>

      {/* Pending Updates Indicator */}
      <PendingUpdatesIndicator
        pendingCount={pendingUpdates.length}
        isProcessing={isProcessingQueue}
        onRetry={retryQueue}
        onClear={clearQueue}
        pendingUpdates={pendingUpdates}
      />

      {/* Test button to simulate failed update - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => {
            // Simulate adding a pending update to localStorage
            const testUpdate = {
              id: `test-${Date.now()}`,
              flashcardId: 'test-card-123',
              flashcardQuestion: `Test Card ${Date.now().toString().slice(-4)}`,
              updates: { progression: 'hard' },
              timestamp: Date.now(),
              retryCount: 0,
            };
            const existing = JSON.parse(localStorage.getItem('flashcard_update_queue') || '[]');
            localStorage.setItem('flashcard_update_queue', JSON.stringify([...existing, testUpdate]));
            window.location.reload();
          }}
          className='fixed bottom-20 left-4 z-50 rounded bg-yellow-500 px-2 py-1 text-xs text-white'
          title='Test: Simulate failed update'
        >
          Test Fail
        </button>
      )}
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
