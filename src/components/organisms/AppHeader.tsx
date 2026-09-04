'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars,
  FaXmark,
  FaPlay,
  FaStop,
  FaTable,
  FaRobot,
  FaGear,
  FaPlus,
  FaFolderPlus,
  FaChevronRight,
} from 'react-icons/fa6';
import DataSourceToggle from '@/components/atoms/DataSourceToggle';
import { APP_ROUTES } from '@/constants/routes';

interface AppHeaderProps {
  flashcardsCount: number;
  isReviewMode: boolean;
  setIsReviewMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  flashcardsCount,
  isReviewMode,
  setIsReviewMode,
}) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavigate = useCallback(
    (route: string) => {
      setIsMenuOpen(false);
      router.push(route);
    },
    [router]
  );

  return (
    <header
      className='backdrop-blur-glass sticky top-0 z-50 border-b'
      style={{
        borderColor: 'var(--border)',
        background: 'var(--background)',
      }}
    >
      <div className='mx-auto max-w-7xl px-3.5 py-2.5 sm:px-6 sm:py-3.5'>
        <div className='flex items-center justify-between gap-3'>
          {/* Left: Brand & Card Count & Desktop Data Source */}
          <div className='flex items-center gap-2.5 sm:gap-4 min-w-0'>
            <div
              onClick={() => handleNavigate(APP_ROUTES.HOME)}
              className='cursor-pointer flex items-center gap-2 min-w-0'
            >
              <h1 className='gradient-text-accent text-lg sm:text-2xl font-bold tracking-tight whitespace-nowrap'>
                Flashcards
              </h1>
            </div>

            <span
              className='rounded-full px-2 py-0.5 text-xs font-semibold shrink-0'
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-foreground)',
              }}
              title='Total flashcards'
            >
              {flashcardsCount}
            </span>

            {/* Desktop Data Source Toggle (Visible on sm and up) */}
            <div className='hidden sm:block'>
              <DataSourceToggle compact={false} />
            </div>
          </div>

          {/* Right: Actions & Menu */}
          <div className='flex items-center gap-2 sm:gap-2.5'>
            {/* Desktop Quick Add Button */}
            {!isReviewMode && (
              <motion.button
                onClick={() => handleNavigate(APP_ROUTES.ADD_FLASHCARD)}
                className='hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-102 active:scale-98'
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPlus className='h-3 w-3' />
                <span>Add Card</span>
              </motion.button>
            )}

            {/* Review Mode Toggle Button */}
            <motion.button
              onClick={() => setIsReviewMode((prev) => !prev)}
              className='flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-102 active:scale-98'
              style={{
                background: isReviewMode
                  ? 'var(--destructive)'
                  : 'var(--secondary)',
                color: isReviewMode
                  ? 'var(--destructive-foreground)'
                  : 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={isReviewMode ? 'Exit Review Mode' : 'Start Review Mode'}
            >
              {isReviewMode ? (
                <>
                  <FaStop className='h-3 w-3' />
                  <span>Exit Review</span>
                </>
              ) : (
                <>
                  <FaPlay className='h-3 w-3' />
                  <span className='hidden xs:inline sm:inline'>Review</span>
                </>
              )}
            </motion.button>

            {/* Hamburger / Navigation Drawer Trigger & Popover Anchor */}
            <div className='relative'>
              <motion.button
                ref={buttonRef}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className='relative flex items-center justify-center rounded-xl border p-2 sm:p-2.5 transition-all hover:scale-105 active:scale-95'
                style={{
                  background: isMenuOpen
                    ? 'var(--primary)'
                    : 'var(--secondary)',
                  color: isMenuOpen
                    ? 'var(--primary-foreground)'
                    : 'var(--secondary-foreground)',
                  borderColor: 'var(--border)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label='Toggle navigation menu'
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <FaXmark className='h-4 w-4' />
                ) : (
                  <FaBars className='h-4 w-4' />
                )}
              </motion.button>

              {/* Popover Menu: Anchored directly below the button */}
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    {/* Mobile Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='fixed inset-0 top-[57px] bg-black/40 backdrop-blur-xs z-40 sm:hidden'
                      onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Popover Menu Container */}
                    <motion.div
                      ref={menuRef}
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className='fixed inset-x-3 top-[57px] z-50 overflow-hidden rounded-2xl border shadow-xl sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2.5 sm:w-84'
                      style={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--card-foreground)',
                      }}
                    >
                      <div className='p-3 sm:p-4 flex flex-col gap-3'>
                        {/* Mobile Data Source Section (Only on mobile since desktop already shows it in header) */}
                        <div
                          className='sm:hidden flex flex-col gap-1.5 pb-2.5 border-b'
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <span className='text-[11px] font-bold uppercase tracking-wider text-muted-foreground'>
                            Data Source
                          </span>
                          <div className='flex justify-center'>
                            <DataSourceToggle compact={false} />
                          </div>
                        </div>

                        {/* Primary Study Suites Section */}
                        <div className='flex flex-col gap-1'>
                          <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5'>
                            Study Suites
                          </span>

                          {/* Mapping Table */}
                          <button
                            onClick={() => handleNavigate(APP_ROUTES.MAPPING)}
                            className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform'>
                                <FaTable className='h-4 w-4' />
                              </div>
                              <div className='flex flex-col items-start text-left'>
                                <div className='text-sm font-semibold text-foreground text-left'>
                                  Mapping Table
                                </div>
                                <div className='text-xs text-muted-foreground text-left'>
                                  English journey & grammar error analysis
                                </div>
                              </div>
                            </div>
                            <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                          </button>

                          {/* Gemini AI Tools */}
                          <button
                            onClick={() => handleNavigate(APP_ROUTES.GEMINI_TOOLS)}
                            className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform'>
                                <FaRobot className='h-4 w-4' />
                              </div>
                              <div className='flex flex-col items-start text-left'>
                                <div className='flex items-center gap-1.5 text-left'>
                                  <span className='text-sm font-semibold text-foreground text-left'>
                                    Gemini AI Tools
                                  </span>
                                  <span className='rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 px-1.5 py-0.2 text-[9px] font-bold uppercase'>
                                    8 Tools
                                  </span>
                                </div>
                                <div className='text-xs text-muted-foreground text-left'>
                                  Speaking coach, IELTS, roleplay & drilling
                                </div>
                              </div>
                            </div>
                            <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                          </button>
                        </div>

                        {/* Management Section */}
                        <div
                          className='flex flex-col gap-1 pt-1.5 border-t'
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5'>
                            Manage & Settings
                          </span>

                          {/* Add Flashcard */}
                          <button
                            onClick={() => handleNavigate(APP_ROUTES.ADD_FLASHCARD)}
                            className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform'>
                                <FaPlus className='h-3.5 w-3.5' />
                              </div>
                              <div className='flex flex-col items-start text-left'>
                                <div className='text-sm font-medium text-foreground text-left'>
                                  Tambah Flashcard Baru
                                </div>
                              </div>
                            </div>
                            <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                          </button>

                          {/* Add Category */}
                          <button
                            onClick={() => handleNavigate(APP_ROUTES.ADD_CATEGORY)}
                            className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform'>
                                <FaFolderPlus className='h-3.5 w-3.5' />
                              </div>
                              <div className='flex flex-col items-start text-left'>
                                <div className='text-sm font-medium text-foreground text-left'>
                                  Kelola Kategori Deck
                                </div>
                              </div>
                            </div>
                            <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                          </button>

                          {/* Search Templates */}
                          <button
                            onClick={() => handleNavigate(APP_ROUTES.SEARCH_TEMPLATES)}
                            className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform'>
                                <FaGear className='h-3.5 w-3.5' />
                              </div>
                              <div className='flex flex-col items-start text-left'>
                                <div className='text-sm font-medium text-foreground text-left'>
                                  Search Templates
                                </div>
                              </div>
                            </div>
                            <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
