'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';
import RebuttalDistractorTrainer from '@/components/organisms/RebuttalDistractorTrainer';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import { APP_ROUTES } from '@/constants/routes';

export default function RebuttalPage() {
  const router = useRouter();

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
                      Distractor & Rebuttal Lab
                    </h1>
                    <span className='hidden xs:inline rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider'>
                      Pilar 3: Audio Asli Cambridge
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground hidden sm:block truncate'>
                    Deteksi 4 pola sanggahan & jebakan distraktor Section 1 dengan audio asli Cambridge
                  </p>
                </div>
              </div>

              {/* Right: Module tag */}
              <div className='shrink-0'>
                <button
                  onClick={() => router.push(`${APP_ROUTES.IELTS}?chapter=m5-05`)}
                  className='text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-xl hover:bg-teal-500/20 transition-all'
                  title='Buka Bab 23 di Kurikulum IELTS Band 7+'
                >
                  Baca Teori Bab 23 ➔
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <main className='mx-auto max-w-7xl px-3.5 pt-4 sm:px-6 sm:pt-6'>
          <RebuttalDistractorTrainer />
        </main>
      </div>
    </ErrorBoundary>
  );
}
