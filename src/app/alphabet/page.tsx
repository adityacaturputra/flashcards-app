'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaFont,
  FaEarListen,
  FaArrowsSplitUpAndLeft,
  FaKeyboard,
} from 'react-icons/fa6';
import {
  AlphabetViewTab,
  ALPHABET_VIEW_TAB,
} from '@/types/alphabet';
import AlphabetExplorer from '@/components/organisms/AlphabetExplorer';
import AlphabetListeningQuiz from '@/components/organisms/AlphabetListeningQuiz';
import AlphabetConfusionGuide from '@/components/organisms/AlphabetConfusionGuide';
import AlphabetSpellingTrainer from '@/components/organisms/AlphabetSpellingTrainer';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import AccentToggle from '@/components/atoms/AccentToggle';
import { useAccentContext } from '@/context/accentContext';
import { APP_ROUTES } from '@/constants/routes';

export default function AlphabetPage() {
  const router = useRouter();
  const { accent, setAccent } = useAccentContext();
  const [activeTab, setActiveTab] = useState<AlphabetViewTab>(ALPHABET_VIEW_TAB.EXPLORER);

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
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3'>
              {/* Left: Back button & Title */}
              <div className='flex items-center gap-2.5 sm:gap-3.5 min-w-0'>
                <motion.button
                  onClick={() => router.push(APP_ROUTES.HOME)}
                  className='rounded-xl border p-2 sm:p-2.5 transition-all hover:scale-105 shrink-0'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title='Kembali ke Beranda Flashcards'
                  aria-label='Back to home'
                >
                  <FaArrowLeft className='h-4 w-4' />
                </motion.button>

                <div className='min-w-0'>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-base sm:text-xl font-bold tracking-tight truncate'>
                      English Alphabet Lab
                    </h1>
                    <span className='hidden xs:inline rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider'>
                      A–Z Audio
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground hidden sm:block truncate'>
                    Audio pengucapan huruf satu per satu & latihan diskriminasi pendengaran
                  </p>
                </div>
              </div>

              {/* Right: Accent Switcher (US, UK, AU, ZA, IN) */}
              <div className='w-full sm:w-auto flex justify-end'>
                <AccentToggle value={accent} onChange={setAccent} className='w-full sm:w-auto justify-center' />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <main className='mx-auto max-w-7xl px-3.5 pt-4 sm:px-6 sm:pt-6 space-y-6'>
          {/* Top Tabs Switcher */}
          <div className='flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-border/70'>
            {[
              {
                id: ALPHABET_VIEW_TAB.EXPLORER,
                label: 'A–Z Soundboard',
                sub: 'Satu Per Satu Audio',
                icon: FaFont,
              },
              {
                id: ALPHABET_VIEW_TAB.QUIZ,
                label: 'Latihan Mengenali Huruf',
                sub: 'Ear Recognition Quiz',
                icon: FaEarListen,
              },
              {
                id: ALPHABET_VIEW_TAB.CONFUSION,
                label: 'Jebakan Huruf Mirip',
                sub: 'G/J, B/P/V, M/N',
                icon: FaArrowsSplitUpAndLeft,
              },
              {
                id: ALPHABET_VIEW_TAB.SPELLING,
                label: 'Dikte Pengejaan IELTS',
                sub: 'Spelling Dictation',
                icon: FaKeyboard,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all shrink-0 select-none ${
                    isActive
                      ? 'bg-teal-500/10 border-teal-500/50 text-teal-700 dark:text-teal-400 font-bold shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground border-transparent'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground'
                    }`}
                  >
                    <Icon className='h-4 w-4' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-xs font-semibold text-foreground leading-tight'>
                      {tab.label}
                    </span>
                    <span className='text-[10px] text-muted-foreground leading-tight'>
                      {tab.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab View */}
          <div className='pt-1'>
            {activeTab === ALPHABET_VIEW_TAB.EXPLORER && (
              <AlphabetExplorer accent={accent} />
            )}
            {activeTab === ALPHABET_VIEW_TAB.QUIZ && (
              <AlphabetListeningQuiz accent={accent} />
            )}
            {activeTab === ALPHABET_VIEW_TAB.CONFUSION && (
              <AlphabetConfusionGuide accent={accent} />
            )}
            {activeTab === ALPHABET_VIEW_TAB.SPELLING && (
              <AlphabetSpellingTrainer accent={accent} />
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
