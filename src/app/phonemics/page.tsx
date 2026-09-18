'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaHeadphones,
  FaTableCells,
  FaWaveSquare,
  FaMapLocationDot,
  FaCheck,
} from 'react-icons/fa6';
import { PhonemicViewTab, AccentPreference } from '@/types/phonemic';
import UnderhillPhonemicBoard from '@/components/organisms/UnderhillPhonemicBoard';
import MinimalPairsTrainer from '@/components/organisms/MinimalPairsTrainer';
import ConnectedSpeechLab from '@/components/organisms/ConnectedSpeechLab';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import { APP_ROUTES } from '@/constants/routes';

export default function PhonemicsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PhonemicViewTab>('chart');
  const [accent, setAccent] = useState<AccentPreference>('uk');

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
                      English Phonemics Lab
                    </h1>
                    <span className='hidden xs:inline rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider'>
                      IPA 44
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground hidden sm:block truncate'>
                    Bagan Fonem Adrian Underhill & Latihan Diskriminasi Akustik IELTS
                  </p>
                </div>
              </div>

              {/* Right: Accent Toggle (UK vs US) */}
              <div className='flex items-center gap-1.5 p-1 rounded-xl border bg-secondary/60 border-border'>
                <button
                  onClick={() => setAccent('uk')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    accent === 'uk'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title='Gunakan Aksen British RP (Standar Resmi Cambridge IELTS)'
                >
                  <span>🇬🇧</span>
                  <span className='hidden sm:inline'>British RP</span>
                </button>

                <button
                  onClick={() => setAccent('us')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    accent === 'us'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title='Gunakan Aksen American English'
                >
                  <span>🇺🇸</span>
                  <span className='hidden sm:inline'>American</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <main className='mx-auto max-w-7xl px-3.5 pt-4 sm:px-6 sm:pt-6 space-y-6'>
          {/* Top Tabs Switcher */}
          <div className='flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-border/70'>
            {(
              [
                {
                  id: 'chart',
                  label: 'Bagan Fonem 44',
                  sub: 'Underhill Soundboard',
                  icon: FaTableCells,
                },
                {
                  id: 'minimal-pairs',
                  label: 'Minimal Pairs Quiz',
                  sub: 'Kuis Pendengaran',
                  icon: FaHeadphones,
                },
                {
                  id: 'connected-speech',
                  label: 'Connected Speech',
                  sub: 'Schwa & Weak Forms',
                  icon: FaWaveSquare,
                },
                {
                  id: 'roadmap',
                  label: 'Roadmap Belajar',
                  sub: 'Metode & Tahapan',
                  icon: FaMapLocationDot,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className='h-4 w-4 shrink-0' />
                  <div className='flex flex-col text-left'>
                    <span className='leading-tight'>{tab.label}</span>
                    <span className='text-[10px] opacity-75 font-normal hidden md:inline'>
                      {tab.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab View */}
          <AnimatePresence mode='wait'>
            {activeTab === 'chart' && (
              <motion.div
                key='chart'
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <UnderhillPhonemicBoard accent={accent} />
              </motion.div>
            )}

            {activeTab === 'minimal-pairs' && (
              <motion.div
                key='minimal-pairs'
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <MinimalPairsTrainer accent={accent} />
              </motion.div>
            )}

            {activeTab === 'connected-speech' && (
              <motion.div
                key='connected-speech'
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <ConnectedSpeechLab accent={accent} />
              </motion.div>
            )}

            {activeTab === 'roadmap' && (
              <motion.div
                key='roadmap'
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className='space-y-6 max-w-4xl mx-auto'
              >
                {/* Roadmap Hero */}
                <div
                  className='rounded-3xl border p-6 sm:p-8 space-y-3'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <h3 className='text-lg sm:text-xl font-bold text-foreground'>
                    🗺️ Roadmap Belajar 44 Fonem Bahasa Inggris (Adrian Underhill Method)
                  </h3>
                  <p className='text-xs sm:text-sm text-foreground/80 leading-relaxed'>
                    Metode belajar fonetik yang terbukti paling efektif bukanlah menghafal kamus secara pasif, melainkan melatih <strong>kepekaan otot mulut (*proprioception*)</strong>. Ikuti 4 tahapan ini secara berurutan:
                  </p>
                </div>

                {/* 4 Phases Timeline Cards */}
                <div className='space-y-4'>
                  {/* Phase 1 */}
                  <div
                    className='rounded-2xl border p-5 sm:p-6 space-y-3'
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div className='flex items-center gap-2.5'>
                      <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-sm'>
                        1
                      </span>
                      <h4 className='text-sm sm:text-base font-bold text-foreground'>
                        Fase 1: Konsonan Berpasangan (Voiced vs Unvoiced) — Minggu 1
                      </h4>
                    </div>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                      Mulai dari konsonan karena paling mudah dirasakan secara fisik. Letakkan dua jari di tenggorokan Anda untuk merasakan kapan pita suara bergetar (*voiced*) dan kapan hanya hembusan nafas (*unvoiced*).
                    </p>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90 font-medium pt-1'>
                      <li className='flex items-center gap-2'>
                        <FaCheck className='h-3 w-3 text-emerald-500' />
                        <span>/p/ vs /b/ (pin vs bin)</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <FaCheck className='h-3 w-3 text-emerald-500' />
                        <span>/t/ vs /d/ (ten vs den)</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <FaCheck className='h-3 w-3 text-emerald-500' />
                        <span>/f/ vs /v/ (fan vs van)</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <FaCheck className='h-3 w-3 text-emerald-500' />
                        <span>/θ/ vs /ð/ (think vs this — wajib jepit lidah!)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div
                    className='rounded-2xl border p-5 sm:p-6 space-y-3'
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div className='flex items-center gap-2.5'>
                      <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-sm'>
                        2
                      </span>
                      <h4 className='text-sm sm:text-base font-bold text-foreground'>
                        Fase 2: 12 Vokal Murni (Monophthongs) & Schwa /ə/ — Minggu 2
                      </h4>
                    </div>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                      Kuasai perbedaan vokal pendek vs panjang (*ship* vs *sheep*, *pull* vs *pool*), dan latih vokal terpenting di seluruh bahasa Inggris: <strong>The Schwa /ə/</strong> (*a-bout, doc-tor*).
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div
                    className='rounded-2xl border p-5 sm:p-6 space-y-3'
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div className='flex items-center gap-2.5'>
                      <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold text-sm'>
                        3
                      </span>
                      <h4 className='text-sm sm:text-base font-bold text-foreground'>
                        Fase 3: 8 Vokal Luncuran (Diphthongs) — Minggu 3
                      </h4>
                    </div>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                      Rasakan transisi pergerakan rahang dan bibir saat meluncur dari vokal pertama ke vokal kedua (*face* /eɪ/, *price* /aɪ/, *goat* /əʊ/).
                    </p>
                  </div>

                  {/* Phase 4 */}
                  <div
                    className='rounded-2xl border p-5 sm:p-6 space-y-3'
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div className='flex items-center gap-2.5'>
                      <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold text-sm'>
                        4
                      </span>
                      <h4 className='text-sm sm:text-base font-bold text-foreground'>
                        Fase 4: Connected Speech & IELTS Speaking Band 8.0+ — Minggu 4+
                      </h4>
                    </div>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                      Terapkan <em>weak forms</em> pada kata sambung (*can, to, of, for*), hilangkan bunyi /t/ pada kata beruntun (*elision: next door ➔ nex-door*), dan sambungkan vokal dengan *linking /r/, /w/, /j/*.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </ErrorBoundary>
  );
}
