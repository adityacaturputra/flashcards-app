'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPodcast } from 'react-icons/fa6';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import AudiobookStudio from '@/components/organisms/AudiobookStudio';
import { APP_ROUTES } from '@/constants/routes';

export default function AudiobooksPage() {
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
        <header
          className='sticky top-0 z-40 border-b backdrop-blur-md'
          style={{
            background: 'var(--background)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='mx-auto max-w-4xl px-4 py-3 flex items-center gap-3'>
            <button
              type='button'
              onClick={() => router.push(APP_ROUTES.HOME)}
              aria-label='Kembali ke Beranda'
              className='min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-xl border text-foreground hover:opacity-80 transition-opacity shrink-0'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <FaArrowLeft className='h-4 w-4' />
            </button>
            <div className='min-w-0'>
              <div className='flex items-center gap-2'>
                <FaPodcast className='h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0' />
                <h1 className='text-base sm:text-lg font-bold tracking-tight truncate'>
                  Next Level Stories
                </h1>
              </div>
              <p className='text-xs text-muted-foreground truncate'>
                Duet Storytelling (Bima &amp; Sarah) · iOS Safari Background + Maps Ready
              </p>
            </div>
          </div>
        </header>

        <main className='mx-auto max-w-4xl px-4 py-5 sm:py-8'>
          <AudiobookStudio />
        </main>
      </div>
    </ErrorBoundary>
  );
}
