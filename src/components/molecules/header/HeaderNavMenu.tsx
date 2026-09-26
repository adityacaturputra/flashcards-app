'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTable,
  FaRobot,
  FaGear,
  FaPlus,
  FaFolderPlus,
  FaChevronRight,
  FaGraduationCap,
  FaWaveSquare,
  FaBookBookmark,
  FaRotate,
  FaAward,
  FaHeadphones,
  FaFont,
} from 'react-icons/fa6';
import DataSourceToggle from '@/components/atoms/DataSourceToggle';
import AccentToggle from '@/components/atoms/AccentToggle';
import { APP_ROUTES } from '@/constants/routes';

interface HeaderNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onOpenSyncModal: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const HeaderNavMenu: React.FC<HeaderNavMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSyncModal,
  menuRef,
  buttonRef,
}) => {
  // Close menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, menuRef, buttonRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 top-[57px] bg-black/40 backdrop-blur-xs z-40 sm:hidden'
            onClick={onClose}
          />

          {/* Popover Menu Container */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className='fixed inset-x-3 top-[57px] z-50 max-h-[calc(100vh-70px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden rounded-2xl border shadow-xl sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2.5 sm:w-88'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--card-foreground)',
            }}
          >
            <div className='p-3 sm:p-4 flex flex-col gap-3'>
              {/* Primary Study Suites Section */}
              <div className='flex flex-col gap-1'>
                <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5'>
                  Study Suites
                </span>

                {/* Mapping Table */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.MAPPING)}
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

                {/* Skill Assessment & Quiz Hub */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.QUIZ)}
                  className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform'>
                      <FaAward className='h-4 w-4' />
                    </div>
                    <div className='flex flex-col items-start text-left'>
                      <div className='flex items-center gap-1.5 text-left'>
                        <span className='text-sm font-semibold text-foreground text-left'>
                          Skill Assessment
                        </span>
                        <span className='rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[9px] font-bold uppercase'>
                          [ /5] Rubric
                        </span>
                      </div>
                      <div className='text-xs text-muted-foreground text-left'>
                        Diagnostik mandiri [1–5], tata bahasa & stamina
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                </button>

                {/* Gemini AI Tools */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.GEMINI_TOOLS)}
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

                {/* IELTS Band 7+ Prep */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.IELTS)}
                  className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform'>
                      <FaGraduationCap className='h-4 w-4' />
                    </div>
                    <div className='flex flex-col items-start text-left'>
                      <div className='flex items-center gap-1.5 text-left'>
                        <span className='text-sm font-semibold text-foreground text-left'>
                          IELTS Band 7+ Prep
                        </span>
                        <span className='rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 px-1.5 py-0.2 text-[9px] font-bold uppercase'>
                          New
                        </span>
                      </div>
                      <div className='text-xs text-muted-foreground text-left'>
                        Modul & panduan belajar per-bab
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                </button>

                {/* Phonemics Lab */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.PHONEMICS)}
                  className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform'>
                      <FaWaveSquare className='h-4 w-4' />
                    </div>
                    <div className='flex flex-col items-start text-left'>
                      <div className='flex items-center gap-1.5 text-left'>
                        <span className='text-sm font-semibold text-foreground text-left'>
                          Phonemics Lab
                        </span>
                        <span className='rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.2 text-[9px] font-bold uppercase'>
                          IPA 44
                        </span>
                      </div>
                      <div className='text-xs text-muted-foreground text-left'>
                        Bagan 44 fonem, kuis & connected speech
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                </button>

                {/* Academic Word List (AWL) Studio */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.AWL)}
                  className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform'>
                      <FaBookBookmark className='h-4 w-4' />
                    </div>
                    <div className='flex flex-col items-start text-left'>
                      <div className='flex items-center gap-1.5 text-left'>
                        <span className='text-sm font-semibold text-foreground text-left'>
                          AWL Studio (570)
                        </span>
                        <span className='rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.2 text-[9px] font-bold uppercase'>
                          Sublists
                        </span>
                      </div>
                      <div className='text-xs text-muted-foreground text-left'>
                        Rumpun kata akademik & paraphrase lab
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                </button>

                {/* Alphabet Lab & Letter Recognition */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.ALPHABET)}
                  className='group flex items-center justify-between rounded-xl p-2.5 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform'>
                      <FaFont className='h-4 w-4' />
                    </div>
                    <div className='flex flex-col items-start text-left'>
                      <div className='flex items-center gap-1.5 text-left'>
                        <span className='text-sm font-semibold text-foreground text-left'>
                          Alphabet Lab
                        </span>
                        <span className='rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 px-1.5 py-0.2 text-[9px] font-bold uppercase'>
                          A–Z Audio
                        </span>
                      </div>
                      <div className='text-xs text-muted-foreground text-left'>
                        Pengenalan audio huruf satu per satu & dikte
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className='h-3 w-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
                </button>
              </div>

              {/* Flashcards Management Section */}
              <div
                className='flex flex-col gap-1 pt-1.5 border-t'
                style={{ borderColor: 'var(--border)' }}
              >
                <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5'>
                  Flashcard Management
                </span>

                {/* Add Flashcard */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.ADD_FLASHCARD)}
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
                  onClick={() => onNavigate(APP_ROUTES.ADD_CATEGORY)}
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
              </div>

              {/* Specific Menu Settings Section */}
              <div
                className='flex flex-col gap-2.5 pt-2 border-t'
                style={{ borderColor: 'var(--border)' }}
              >
                <div className='flex items-center justify-between px-2 py-0.5'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                    <FaGear className='h-3 w-3 text-muted-foreground' />
                    <span>Settings & Preferences</span>
                  </span>
                </div>

                {/* Dedicated Global Voice Accent Card */}
                <div
                  className='rounded-xl border p-2.5 space-y-2'
                  style={{
                    background: 'var(--secondary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1.5'>
                      <FaHeadphones className='h-3.5 w-3.5 text-purple-600 dark:text-purple-400' />
                      <span className='text-xs font-bold text-foreground'>
                        Audio Voice Accent
                      </span>
                    </div>
                    <span className='text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400'>
                      5 Aksen IELTS
                    </span>
                  </div>
                  <p className='text-[11px] text-muted-foreground leading-snug'>
                    Pilih aksen penutur bawaan untuk pemutaran audio kartu & IELTS lab
                  </p>
                  <div className='pt-0.5'>
                    <AccentToggle className='w-full justify-center' />
                  </div>
                </div>

                {/* Mobile & Tablet Data Source & Cloud Sync */}
                <div className='lg:hidden flex flex-col gap-2 pt-1'>
                  <div className='flex justify-center'>
                    <DataSourceToggle compact={false} />
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSyncModal();
                    }}
                    className='flex items-center justify-between rounded-xl border p-2 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                    style={{
                      background: 'var(--secondary)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400'>
                        <FaRotate className='h-3.5 w-3.5' />
                      </div>
                      <div>
                        <div className='text-xs font-bold text-foreground'>Cloud ⇋ Local Sync</div>
                        <div className='text-[10px] text-muted-foreground'>Diff & sync reviews</div>
                      </div>
                    </div>
                    <span className='rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400'>
                      Sync
                    </span>
                  </button>
                </div>

                {/* Search Templates */}
                <button
                  onClick={() => onNavigate(APP_ROUTES.SEARCH_TEMPLATES)}
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
  );
};

export default HeaderNavMenu;
