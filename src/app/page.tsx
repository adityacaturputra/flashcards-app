'use client';
import React, {
  useState,
  memo,
  useCallback,
  lazy,
  Suspense,
  useEffect,
} from 'react';
import { useAppContext } from '@/context/appContext';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { Progression } from '@/types/flashcard';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaPlay, FaStop, FaCog, FaPlus, FaTable } from 'react-icons/fa';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import PendingUpdatesIndicator from '@/components/atoms/PendingUpdatesIndicator';
import DataSourceToggle from '@/components/atoms/DataSourceToggle';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering client-side elements after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFilterChange = useCallback((progression: Progression | null) => {
    setSelectedProgression(progression);
  }, []);

  const handleNavigateToCategoryPage = useCallback(() => {
    window.location.href = APP_ROUTES.ADD_CATEGORY;
  }, []);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (isMobileMenuOpen && !(e.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen],
  );

  return (
    <div onClick={handleClickOutside}>
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
              <div className='hidden md:block'>
                <DataSourceToggle compact={false} />
              </div>
            </div>

            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='md:hidden'>
                <DataSourceToggle compact={true} />
              </div>

              {/* Review Mode Button - Always visible */}
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
                <div className='flex items-center gap-1'>
                  {isReviewMode ? (
                    <FaStop className='h-3 w-3' />
                  ) : (
                    <FaPlay className='h-3 w-3' />
                  )}
                  <span className='hidden sm:inline'>
                    {isReviewMode ? 'Exit Review' : 'Review Mode'}
                  </span>
                </div>
              </motion.button>

              {/* Desktop Menu - Hidden on mobile */}
              {!isReviewMode && (
                <div className='hidden items-center gap-2 sm:flex'>
                  <motion.button
                    className='rounded-lg px-4 py-2 text-sm font-medium transition-all hover:scale-105'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--secondary-foreground)',
                    }}
                    onClick={() => (window.location.href = APP_ROUTES.MAPPING)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className='flex items-center gap-1.5'>
                      <FaTable className='h-3.5 w-3.5' />
                      <span>Mapping Table</span>
                    </div>
                  </motion.button>

                  <motion.button
                    className='rounded-lg px-4 py-2 text-sm font-medium transition-all hover:scale-105'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--secondary-foreground)',
                    }}
                    onClick={() => (window.location.href = APP_ROUTES.SEARCH_TEMPLATES)}
                    whileTap={{ scale: 0.95 }}
                  >
                    Search Templates
                  </motion.button>

                  <motion.button
                    className='rounded-lg px-4 py-2 text-sm font-medium transition-all hover:scale-105'
                    style={{
                      background: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                    onClick={() => (window.location.href = APP_ROUTES.ADD_FLASHCARD)}
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add Flashcard
                  </motion.button>
                </div>
              )}

              {/* Mobile Hamburger Menu - Only show on mobile when not in review mode */}
              {isClient && !isReviewMode && (
                <div className='mobile-menu sm:hidden'>
                  <motion.button
                    className='rounded-lg p-2 transition-all hover:scale-105'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--secondary-foreground)',
                    }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMobileMenuOpen ? (
                      <FaTimes className='h-4 w-4' />
                    ) : (
                      <FaBars className='h-4 w-4' />
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isClient && isMobileMenuOpen && !isReviewMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='mobile-menu sm:hidden'
        >
          <div className='border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-700'>
                <span className='text-xs font-semibold text-zinc-400'>Source:</span>
                <DataSourceToggle compact={false} />
              </div>

              <motion.button
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-700'
                style={{ color: 'white' }}
                onClick={() => {
                  window.location.href = APP_ROUTES.MAPPING;
                  setIsMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTable className='h-4 w-4' style={{ color: '#94a3b8' }} />
                Mapping Table
              </motion.button>

              <motion.button
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-700'
                style={{ color: 'white' }}
                onClick={() => {
                  window.location.href = APP_ROUTES.SEARCH_TEMPLATES;
                  setIsMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCog className='h-4 w-4' style={{ color: '#94a3b8' }} />
                Search Templates
              </motion.button>

              <motion.button
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-700'
                style={{ color: 'white' }}
                onClick={() => {
                  window.location.href = APP_ROUTES.ADD_FLASHCARD;
                  setIsMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPlus className='h-4 w-4' style={{ color: '#94a3b8' }} />
                Add Flashcard
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

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
