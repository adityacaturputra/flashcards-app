// src/app/quiz/page.tsx
'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaBolt,
  FaAward,
  FaChevronRight,
  FaBookOpen,
  FaArrowTrendUp,
} from 'react-icons/fa6';
import { QuizModuleFactory } from '@/services/quiz';
// Trigger all module registrations
import '@/quizModules';
import { APP_ROUTES } from '@/constants/routes';
import {
  QUIZ_SECTION,
  QUIZ_SECTION_FILTER,
  QuizSectionFilter,
} from '@/constants/quiz';
import { DiagnosticRubricSheet } from '@/components/organisms/quiz/DiagnosticRubricSheet';

export default function QuizHubPage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] =
    useState<QuizSectionFilter>(QUIZ_SECTION_FILTER.ALL);

  const allModules = useMemo(() => {
    return QuizModuleFactory.getAllModules();
  }, []);

  const filteredModules = useMemo(() => {
    if (selectedSection === QUIZ_SECTION_FILTER.ALL) return allModules;
    return allModules.filter((m) => m.section === selectedSection);
  }, [allModules, selectedSection]);

  const counts = useMemo(() => {
    return {
      all: allModules.length,
      A: allModules.filter((m) => m.section === QUIZ_SECTION.A).length,
      B: allModules.filter((m) => m.section === QUIZ_SECTION.B).length,
      C: allModules.filter((m) => m.section === QUIZ_SECTION.C).length,
    };
  }, [allModules]);

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
                    Rubrik [1–5]
                  </span>
                </div>
                <p className='text-[11px] text-muted-foreground hidden sm:block'>
                  Suite Evaluasi Mandiri 14 Butir & Kuis Terstruktur Berstandar CEFR / IELTS Band 7.5+
                </p>
              </div>
            </div>

            <div className='flex items-center gap-1.5'>
              <span className='text-xs font-semibold text-muted-foreground hidden md:inline'>
                Target:
              </span>
              <span
                className='rounded-lg border px-2.5 py-1 text-xs font-bold'
                style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}
              >
                B1 ➔ C1 / C2 Mastery
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
              Standardized Diagnostic Suite
            </span>
          </div>

          <h2 className='text-xl sm:text-2xl font-black text-foreground'>
            14 Butir Evaluasi Mandiri & Kuis Terstruktur
          </h2>
          <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl'>
            Instrumen diagnostik 14 butir mencakup <strong>Tata Bahasa</strong> (SVA, Tenses, Passive, Conditionals, Comma Splice), <strong>Kosakata & Kolokasi</strong> (Sinonim, Collocations, AWL, Spelling, Penanda Wacana), serta <strong>Stamina Ujian</strong> (Listening 30m, Reading 18m, Outline 5m, Speaking 2m).
          </p>
        </div>

        {/* Section 1: Interactive Self-Diagnostic Rubric Sheet [1 - 5] */}
        <DiagnosticRubricSheet />

        {/* Section 2: Factory Quiz Modules with Filter Tabs */}
        <div className='space-y-4 pt-2'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <FaBolt className='h-4 w-4 text-amber-500' />
              <h3 className='text-sm sm:text-base font-bold text-foreground'>
                Daftar Modul Kuis & Latihan Praktis
              </h3>
              <span className='text-xs font-semibold text-muted-foreground ml-1'>
                ({filteredModules.length} Modul)
              </span>
            </div>

            {/* Filter Tabs */}
            <div
              className='flex items-center gap-1 p-1 rounded-xl border overflow-x-auto scrollbar-none shadow-xs'
              style={{
                background: 'var(--muted)',
                borderColor: 'var(--border)',
              }}
            >
              <button
                onClick={() => setSelectedSection(QUIZ_SECTION_FILTER.ALL)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSection === QUIZ_SECTION_FILTER.ALL
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Semua ({counts.all})
              </button>

              <button
                onClick={() => setSelectedSection(QUIZ_SECTION_FILTER.A)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSection === QUIZ_SECTION_FILTER.A
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Bagian A: Grammar ({counts.A})
              </button>

              <button
                onClick={() => setSelectedSection(QUIZ_SECTION_FILTER.B)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSection === QUIZ_SECTION_FILTER.B
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Bagian B: Kosakata ({counts.B})
              </button>

              <button
                onClick={() => setSelectedSection(QUIZ_SECTION_FILTER.C)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSection === QUIZ_SECTION_FILTER.C
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Bagian C: Stamina ({counts.C})
              </button>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className='grid grid-cols-1 gap-4'>
            {filteredModules.map((mod) => (
              <motion.div
                key={mod.id}
                whileHover={{ y: -2 }}
                className='rounded-2xl border p-5 sm:p-6 shadow-sm transition-all space-y-4'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div
                  className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3'
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className='flex items-center gap-3'>
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
                      <div className='flex items-center gap-2'>
                        <h4 className='text-base font-bold text-foreground'>
                          {mod.title}
                        </h4>
                        {mod.section && (
                          <span className='px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-muted text-muted-foreground border border-border'>
                            Bagian {mod.section}
                          </span>
                        )}
                      </div>
                      <div className='text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5'>
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
                    <span>Bank soal terstruktur dengan analisis rubrik skor [1–5]</span>
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
      </main>
    </div>
  );
}
