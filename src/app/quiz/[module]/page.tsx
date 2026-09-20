// src/app/quiz/[module]/page.tsx
'use client';
import React, { useState, useMemo, use, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaBolt, FaBookOpen } from 'react-icons/fa6';
import { QuizModuleFactory } from '@/services/quiz';
import '@/quizModules'; // Trigger registration
import QuizEngine from '@/components/organisms/quiz/QuizEngine';
import { APP_ROUTES } from '@/constants/routes';

interface QuizModulePageProps {
  params: Promise<{ module: string }>;
}

function QuizModuleContent({ moduleId }: { moduleId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams?.get('tab') === 'theory' ? 'theory' : 'practice';
  const [activeTab, setActiveTab] = useState<'practice' | 'theory'>(initialTab);

  const moduleStrategy = useMemo(() => {
    return QuizModuleFactory.getModule(moduleId);
  }, [moduleId]);

  if (!moduleStrategy) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4'>
        <h2 className='text-xl font-bold text-foreground'>Modul Kuis Tidak Ditemukan</h2>
        <p className='text-sm text-muted-foreground'>
          Modul &quot;{moduleId}&quot; belum terdaftar di QuizModuleFactory.
        </p>
        <button
          onClick={() => router.push(APP_ROUTES.QUIZ)}
          className='px-4 py-2 rounded-xl text-xs font-bold text-primary-foreground bg-primary'
        >
          Kembali ke Hub Kuis
        </button>
      </div>
    );
  }

  return (
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
        <div className='mx-auto max-w-5xl px-3.5 py-3 sm:px-6 sm:py-4'>
          <div className='flex items-center justify-between gap-3'>
            {/* Left: Back & Title */}
            <div className='flex items-center gap-2.5 sm:gap-3.5 min-w-0'>
              <button
                onClick={() => router.push(APP_ROUTES.QUIZ)}
                className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border transition-all hover:bg-muted shrink-0'
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--secondary)',
                }}
                title='Back to Quiz Hub'
              >
                <FaArrowLeft className='h-3.5 w-3.5 text-muted-foreground' />
              </button>

              <div className='min-w-0'>
                <div className='flex items-center gap-2'>
                  <h1 className='text-sm sm:text-base font-bold text-foreground truncate'>
                    {moduleStrategy.shortTitle}
                  </h1>
                  <span className='rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider hidden sm:inline'>
                    [ /5] Rubric
                  </span>
                </div>
                <p className='text-[11px] text-muted-foreground truncate hidden sm:block'>
                  {moduleStrategy.rubricTitle}
                </p>
              </div>
            </div>

            {/* Right: Dual Mode Tabs */}
            <div
              className='flex items-center gap-1 p-1 rounded-xl border shadow-inner shrink-0'
              style={{
                background: 'var(--muted)',
                borderColor: 'var(--border)',
              }}
            >
              <button
                onClick={() => setActiveTab('practice')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'practice'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FaBolt className='h-3 w-3 text-amber-500' />
                <span>Latihan [ /5]</span>
              </button>

              <button
                onClick={() => setActiveTab('theory')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'theory'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FaBookOpen className='h-3 w-3 text-emerald-500' />
                <span>Panduan Teori</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Runner Body */}
      <main className='mx-auto max-w-4xl px-4 py-6 sm:py-8'>
        {activeTab === 'practice' ? (
          <QuizEngine
            module={moduleStrategy}
            onOpenTheory={() => {
              setActiveTab('theory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <div>{moduleStrategy.renderTheoryGuide ? moduleStrategy.renderTheoryGuide() : null}</div>
        )}
      </main>
    </div>
  );
}

export default function QuizModulePage({ params }: QuizModulePageProps) {
  const unwrappedParams = use(params);
  return (
    <Suspense fallback={<div className='p-8 text-center text-muted-foreground'>Memuat modul...</div>}>
      <QuizModuleContent moduleId={unwrappedParams.module} />
    </Suspense>
  );
}
