'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaGraduationCap,
  FaListUl,
} from 'react-icons/fa6';
import { ALL_IELTS_CHAPTERS, getIeltsChapterById } from '@/data/ielts';
import { IeltsChapter } from '@/types/ielts';
import IeltsCurriculumSidebar from '@/components/organisms/IeltsCurriculumSidebar';
import IeltsChapterReader from '@/components/organisms/IeltsChapterReader';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import { APP_ROUTES } from '@/constants/routes';

export default function IeltsPage() {
  const router = useRouter();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    ALL_IELTS_CHAPTERS[0]?.id || 'ch-01'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  // Handle ESC key to dismiss drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen]);

  const activeChapter = useMemo(() => {
    return getIeltsChapterById(selectedChapterId) || ALL_IELTS_CHAPTERS[0];
  }, [selectedChapterId]);

  const currentIndex = useMemo(() => {
    return ALL_IELTS_CHAPTERS.findIndex((c) => c.id === activeChapter.id);
  }, [activeChapter]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ALL_IELTS_CHAPTERS.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedChapterId(ALL_IELTS_CHAPTERS[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setSelectedChapterId(ALL_IELTS_CHAPTERS[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectChapter = (ch: IeltsChapter) => {
    setSelectedChapterId(ch.id);
    setIsMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div
        className='min-h-screen pb-16'
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        {/* Sticky Header */}
        <header
          className='backdrop-blur-glass sticky top-0 z-40 border-b'
          style={{
            borderColor: 'var(--border)',
            background: 'var(--background)',
          }}
        >
          <div className='mx-auto max-w-7xl px-3.5 py-2.5 sm:px-6 sm:py-3.5'>
            <div className='flex items-center justify-between gap-3'>
              {/* Left: Back & Title */}
              <div className='flex items-center gap-2.5 sm:gap-3.5 min-w-0'>
                <button
                  onClick={() => router.push(APP_ROUTES.HOME)}
                  className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all hover:scale-105 active:scale-95'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                  }}
                  title='Kembali ke Beranda'
                >
                  <FaArrowLeft className='h-3.5 w-3.5' />
                </button>

                <div className='flex items-center gap-2 min-w-0'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0'>
                    <FaGraduationCap className='h-4 w-4' />
                  </div>
                  <div className='min-w-0'>
                    <h1 className='text-sm sm:text-base font-bold tracking-tight text-foreground truncate'>
                      IELTS Band 7+ Complete Prep
                    </h1>
                    <p className='text-[10px] sm:text-xs text-muted-foreground truncate'>
                      Modul Pembelajaran & Panduan Belajar Strategis
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Mobile Curriculum Toggle (strictly hidden on desktop lg) */}
              <div className='flex lg:hidden items-center gap-2'>
                <button
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted active:scale-95'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <FaListUl className='h-3 w-3' />
                  <span>Daftar Bab</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Drawer (Clean full-height slide-over, strictly hidden on desktop lg) */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <div className='fixed inset-0 z-50 flex lg:hidden'>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='fixed inset-0 backdrop-blur-xs'
                style={{ background: 'rgba(0, 0, 0, 0.65)' }}
                onClick={() => setIsMobileDrawerOpen(false)}
              />

              {/* Drawer Panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className='relative z-10 w-[85vw] max-w-sm h-full flex flex-col shadow-2xl border-r overflow-hidden'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--card-foreground)',
                }}
              >
                <IeltsCurriculumSidebar
                  activeChapterId={selectedChapterId}
                  onSelectChapter={handleSelectChapter}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  isDrawer={true}
                  onCloseDrawer={() => setIsMobileDrawerOpen(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Layout */}
        <main className='mx-auto max-w-7xl px-3.5 py-4 sm:px-6 sm:py-6'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
            {/* Desktop Sidebar (4 cols) */}
            <div className='hidden lg:block lg:col-span-4 xl:col-span-4 sticky top-[75px] h-[calc(100vh-95px)]'>
              <IeltsCurriculumSidebar
                activeChapterId={selectedChapterId}
                onSelectChapter={handleSelectChapter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Main Chapter Reader (8 cols) */}
            <div className='lg:col-span-8 xl:col-span-8'>
              {activeChapter ? (
                <IeltsChapterReader
                  chapter={activeChapter}
                  onPrevChapter={handlePrev}
                  onNextChapter={handleNext}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                />
              ) : (
                <div className='rounded-2xl border p-8 text-center bg-card' style={{ borderColor: 'var(--border)' }}>
                  Pilih bab dari daftar materi untuk memulai belajar.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
