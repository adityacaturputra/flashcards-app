// src/app/quiz/page.tsx
'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaBolt,
  FaAward,
  FaChevronRight,
  FaBookOpen,
  FaArrowTrendUp,
  FaLock,
} from 'react-icons/fa6';
import { QuizModuleFactory } from '@/services/quiz';
// Trigger module registrations
import '@/quizModules';
import { APP_ROUTES } from '@/constants/routes';

export default function QuizHubPage() {
  const router = useRouter();

  const activeModules = useMemo(() => {
    return QuizModuleFactory.getAllModules();
  }, []);

  const UPCOMING_MODULES = [
    {
      id: 'collocations',
      title: 'Collocations & Phrasal Idioms',
      rubric: 'Ketepatan pemilihan Kolokasi & Idiomatic Prepositions: [ /5]',
      cefr: 'B2 ➔ C1',
      description: 'Menguasai pasangan kata natural penutur asli (take a toll on, shed light on, heavily influenced).',
    },
    {
      id: 'inversions',
      title: 'Inversions & Negative Fronting',
      rubric: 'Ketepatan struktur Inversi & Emphatic Sentences: [ /5]',
      cefr: 'C1 ➔ C2',
      description: 'Struktur tingkat mahir untuk Academic Writing (Not only did..., Seldom have we..., Under no circumstances...).',
    },
    {
      id: 'tenses',
      title: 'Complex Tense Consistency & Conditionals',
      rubric: 'Konsistensi Tense & Mixed Conditionals pada paragraf: [ /5]',
      cefr: 'B2 ➔ C1',
      description: 'Menjaga konsistensi waktu narasi dan penguasaan pengandaian bertingkat (If had known, would be).',
    },
  ];

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
        <div className='mx-auto max-w-7xl px-3.5 py-3 sm:px-6 sm:py-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-2.5 sm:gap-3.5'>
              <button
                onClick={() => router.push(APP_ROUTES.HOME)}
                className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border transition-all hover:bg-muted'
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--secondary)',
                }}
                title='Back to Flashcards'
              >
                <FaArrowLeft className='h-3.5 w-3.5 text-muted-foreground' />
              </button>

              <div>
                <div className='flex items-center gap-2'>
                  <h1 className='text-sm sm:text-base font-bold text-foreground'>
                    English Skill Assessment Hub
                  </h1>
                  <span className='rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider'>
                    Rubrik [ /5]
                  </span>
                </div>
                <p className='text-[11px] text-muted-foreground hidden sm:block'>
                  Modul latihan dan penilaian ketepatan tata bahasa pada kalimat kompleks berstandar CEFR / IELTS
                </p>
              </div>
            </div>

            <div className='flex items-center gap-1.5'>
              <span className='text-xs font-semibold text-muted-foreground hidden md:inline'>
                Target:
              </span>
              <span className='rounded-lg border px-2 py-1 text-xs font-bold' style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                B1 ➔ C1 Mastery
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-4xl px-4 py-6 sm:py-8 space-y-8'>
        {/* Banner */}
        <div
          className='rounded-3xl border p-6 sm:p-8 space-y-3 relative overflow-hidden shadow-sm'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='flex items-center gap-2 text-emerald-600 dark:text-emerald-400'>
            <FaAward className='h-5 w-5' />
            <span className='text-xs font-bold uppercase tracking-wider'>
              Standardized Assessment Suite
            </span>
          </div>

          <h2 className='text-xl sm:text-2xl font-black text-foreground'>
            Tingkatkan Skor Rubrik Tata Bahasa Kamu
          </h2>
          <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl'>
            Setiap modul dirancang untuk menguji satu aspek ketepatan spesifik yang sering menjadi batu sandungan dalam penulisan esai akademik (*IELTS Task 2*) dan tes kecakapan kerja (*Cambridge Linguaskill*).
          </p>
        </div>

        {/* Section 1: Active Assessment Modules */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm sm:text-base font-bold text-foreground flex items-center gap-2'>
              <FaBolt className='h-4 w-4 text-amber-500' />
              <span>Modul Aktif Siap Latihan</span>
            </h3>
            <span className='text-xs text-muted-foreground'>
              {activeModules.length} Modul Tersedia
            </span>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {activeModules.map((mod) => (
              <motion.div
                key={mod.id}
                whileHover={{ y: -2 }}
                className='rounded-2xl border p-5 sm:p-6 shadow-sm transition-all space-y-4'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3' style={{ borderColor: 'var(--border)' }}>
                  <div className='flex items-center gap-2.5'>
                    <div
                      className='h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs'
                      style={{
                        background: `${mod.accentColor}15`,
                        color: mod.accentColor,
                      }}
                    >
                      <FaBolt className='h-5 w-5' />
                    </div>
                    <div>
                      <h4 className='text-base font-bold text-foreground'>
                        {mod.title}
                      </h4>
                      <div className='text-xs font-medium text-emerald-600 dark:text-emerald-400'>
                        {mod.rubricTitle}
                      </div>
                    </div>
                  </div>

                  <span className='rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 px-2.5 py-0.5 text-xs font-bold self-start sm:self-auto'>
                    CEFR: {mod.targetCefr}
                  </span>
                </div>

                <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                  {mod.description}
                </p>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-3 pt-2'>
                  <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                    <FaArrowTrendUp className='h-3.5 w-3.5 text-emerald-500' />
                    <span>Generator kombinatorial: Ribuan variasi kalimat acak</span>
                  </div>

                  <div className='flex items-center gap-2 w-full sm:w-auto'>
                    <button
                      onClick={() => router.push(`/quiz/${mod.id}?tab=theory`)}
                      className='flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all hover:bg-muted'
                      style={{
                        background: 'var(--secondary)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                      }}
                    >
                      <FaBookOpen className='h-3 w-3' />
                      <span>Panduan Teori</span>
                    </button>

                    <button
                      onClick={() => router.push(`/quiz/${mod.id}`)}
                      className='flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all'
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                    >
                      <span>Mulai Tes [ /5]</span>
                      <FaChevronRight className='h-3 w-3' />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Upcoming Modules */}
        <div className='space-y-4 pt-4'>
          <h3 className='text-sm sm:text-base font-bold text-foreground flex items-center gap-2'>
            <FaLock className='h-3.5 w-3.5 text-muted-foreground' />
            <span>Modul Segera Hadir (*Upcoming Skills*)</span>
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {UPCOMING_MODULES.map((up) => (
              <div
                key={up.id}
                className='p-4 rounded-2xl border space-y-2 opacity-75'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className='flex items-center justify-between'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                    {up.cefr}
                  </span>
                  <span className='text-[10px] font-semibold px-2 py-0.5 rounded-md bg-card text-muted-foreground'>
                    Coming Soon
                  </span>
                </div>
                <div className='text-xs font-bold text-foreground'>{up.title}</div>
                <div className='text-[11px] text-muted-foreground leading-relaxed line-clamp-2'>
                  {up.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
