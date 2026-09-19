'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaBookOpen,
  FaPenNib,
  FaCircleQuestion,
  FaGraduationCap,
  FaStar,
} from 'react-icons/fa6';
import { AwlTabMode, AwlItem, AWL_TAB_MODE } from '@/types/awl';
import { AccentPreference, ACCENT_PREFERENCE } from '@/types/phonemic';
import { useAppContext } from '@/context/appContext';
import { createAwlFlashcard, generateAwlFlashcardId } from '@/utils/createAwlFlashcard';
import AwlSublistExplorer from '@/components/organisms/AwlSublistExplorer';
import AwlParaphraseLab from '@/components/organisms/AwlParaphraseLab';
import AwlMorphologyQuiz from '@/components/organisms/AwlMorphologyQuiz';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import AccentToggle from '@/components/atoms/AccentToggle';
import { APP_ROUTES } from '@/constants/routes';

export default function AwlPage() {
  const router = useRouter();
  const { flashcards, addFlashcard } = useAppContext();
  const [activeTab, setActiveTab] = useState<AwlTabMode>(AWL_TAB_MODE.EXPLORER);
  const [accent, setAccent] = useState<AccentPreference>(ACCENT_PREFERENCE.US);

  // Track which AWL items are already saved in the user's deck
  const deckFlashcardIds = useMemo(() => {
    const ids = new Set<string>();
    flashcards.forEach((f) => {
      if (f._id) ids.add(f._id);
      // Also match by question prefix if user already has an existing card
      if (f.question) {
        const match = f.question.match(/^([A-Z]+)\s/);
        if (match) {
          ids.add(generateAwlFlashcardId(match[1].toLowerCase()));
        }
      }
    });
    return ids;
  }, [flashcards]);

  // 1-Click "Add to Flashcard Deck" Handler
  const handleAddToDeck = async (item: AwlItem) => {
    const newFlashcard = createAwlFlashcard(item);
    await addFlashcard(newFlashcard);
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
                      Academic Word List (AWL) Studio
                    </h1>
                    <span className='hidden xs:inline rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider'>
                      570 Families
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground hidden sm:block truncate'>
                    Averil Coxhead Research · 10% Kosakata Teks Akademis IELTS Band 7.0–8.5+
                  </p>
                </div>
              </div>

              {/* Right: Accent Switcher (UK vs US) */}
              <AccentToggle value={accent} onChange={setAccent} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='mx-auto max-w-7xl px-3.5 pt-4 sm:px-6 sm:pt-6 space-y-6'>
          {/* Tabs Switcher */}
          <div className='flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-border/70'>
            {(
              [
                {
                  id: AWL_TAB_MODE.EXPLORER,
                  label: 'Sublists Explorer',
                  sub: '10 Sublists & Rumpun',
                  icon: FaBookOpen,
                },
                {
                  id: AWL_TAB_MODE.PARAPHRASE,
                  label: 'Paraphrase Lab',
                  sub: 'Band 5 ➔ Band 8',
                  icon: FaPenNib,
                },
                {
                  id: AWL_TAB_MODE.QUIZ,
                  label: 'Kuis Bentuk Kata',
                  sub: 'Morfologi & Grammar',
                  icon: FaCircleQuestion,
                },
                {
                  id: AWL_TAB_MODE.GUIDE,
                  label: 'Panduan Averil Coxhead',
                  sub: 'Formula 80-10-5-5',
                  icon: FaGraduationCap,
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
            {activeTab === AWL_TAB_MODE.EXPLORER && (
              <motion.div
                key={AWL_TAB_MODE.EXPLORER}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <AwlSublistExplorer
                  accent={accent}
                  deckFlashcardIds={deckFlashcardIds}
                  onAddToDeck={handleAddToDeck}
                />
              </motion.div>
            )}

            {activeTab === AWL_TAB_MODE.PARAPHRASE && (
              <motion.div
                key={AWL_TAB_MODE.PARAPHRASE}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <AwlParaphraseLab accent={accent} />
              </motion.div>
            )}

            {activeTab === AWL_TAB_MODE.QUIZ && (
              <motion.div
                key={AWL_TAB_MODE.QUIZ}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <AwlMorphologyQuiz />
              </motion.div>
            )}

            {activeTab === AWL_TAB_MODE.GUIDE && (
              <motion.div
                key={AWL_TAB_MODE.GUIDE}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className='max-w-4xl mx-auto space-y-6'
              >
                {/* Guide Hero */}
                <div
                  className='rounded-3xl border p-6 sm:p-8 space-y-3'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div className='flex items-center gap-2 text-primary font-bold'>
                    <FaStar className='h-4 w-4' />
                    <span className='text-xs uppercase tracking-wider'>
                      Fakta Ilmiah & Metodologi Penelitian
                    </span>
                  </div>
                  <h3 className='text-lg sm:text-xl font-bold text-foreground'>
                    Mengapa 570 Rumpun Kata AWL Menguasai 10% Teks Akademis Dunia?
                  </h3>
                  <p className='text-xs sm:text-sm text-foreground/80 leading-relaxed'>
                    Pada tahun 2000, <strong>Dr. Averil Coxhead</strong> dari Victoria University of Wellington menganalisis <strong>3,5 juta kata</strong> dari korpus jurnal ilmiah di 4 fakultas (Sastra, Bisnis, Hukum, dan Sains). Hasilnya menunjukkan bahwa teks ilmiah internasional memiliki komposisi kosakata yang sangat terprediksi:
                  </p>
                </div>

                {/* The 80-10-5-5 Rule Box */}
                <div
                  className='rounded-3xl border p-6 sm:p-8 space-y-4'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <h4 className='text-sm sm:text-base font-bold text-foreground'>
                    Piramida Komposisi Kosakata Teks Akademis (Formula 80-10-5-5):
                  </h4>

                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                    <div
                      className='p-4 rounded-2xl border bg-card'
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className='text-2xl font-black text-foreground'>80%</div>
                      <div className='text-xs font-bold text-muted-foreground mt-1'>
                        General Service List (GSL)
                      </div>
                      <p className='text-[11px] text-muted-foreground mt-1 leading-relaxed'>
                        2.000 kata umum sehari-hari (kata sambung, kata ganti, to-be).
                      </p>
                    </div>

                    <div
                      className='p-4 rounded-2xl border border-primary/40 bg-primary/5'
                    >
                      <div className='text-2xl font-black text-primary'>⭐ 10%</div>
                      <div className='text-xs font-bold text-primary mt-1'>
                        Academic Word List (AWL)
                      </div>
                      <p className='text-[11px] text-foreground/80 mt-1 leading-relaxed'>
                        <strong>570 rumpun kata inti</strong> ini! Tanpa memandang topik apa pun.
                      </p>
                    </div>

                    <div
                      className='p-4 rounded-2xl border bg-card'
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className='text-2xl font-black text-foreground'>~5%</div>
                      <div className='text-xs font-bold text-muted-foreground mt-1'>
                        Jargon Teknis Spesifik
                      </div>
                      <p className='text-[11px] text-muted-foreground mt-1 leading-relaxed'>
                        Istilah sempit (seperti fotosintesis, sitoplasma).
                      </p>
                    </div>

                    <div
                      className='p-4 rounded-2xl border bg-card'
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className='text-2xl font-black text-foreground'>~5%</div>
                      <div className='text-xs font-bold text-muted-foreground mt-1'>
                        Low-Frequency Words
                      </div>
                      <p className='text-[11px] text-muted-foreground mt-1 leading-relaxed'>
                        Kata langka atau nama khusus daerah/penulis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Pro-Tips for IELTS */}
                <div
                  className='rounded-3xl border p-6 sm:p-8 space-y-4'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <h4 className='text-sm sm:text-base font-bold text-foreground'>
                    3 Kunci Menguasai AWL untuk Meraih IELTS Band 7.5+:
                  </h4>

                  <div className='space-y-3'>
                    <div className='flex items-start gap-3 p-3.5 rounded-2xl border border-border bg-secondary/50'>
                      <span className='flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5'>
                        1
                      </span>
                      <div className='text-xs sm:text-sm'>
                        <strong className='text-foreground'>Prioritaskan Sublist 1 Dulu:</strong> Sublist 1 berisi 60 kata yang frekuensi kemunculannya paling tinggi di seluruh jurnal dunia. Menguasai Sublist 1 memberi imbal hasil (*return on investment*) terbesar.
                      </div>
                    </div>

                    <div className='flex items-start gap-3 p-3.5 rounded-2xl border border-border bg-secondary/50'>
                      <span className='flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5'>
                        2
                      </span>
                      <div className='text-xs sm:text-sm'>
                        <strong className='text-foreground'>Kuasai Pergeseran Nada (Stress Shift):</strong> Ingat bahwa kata <em>e-CO-no-my</em> dan <em>e-co-NO-mic</em> memiliki letak penekanan suku kata yang berbeda. Gunakan tombol audio di setiap rumpun kata untuk melatih telinga Anda.
                      </div>
                    </div>

                    <div className='flex items-start gap-3 p-3.5 rounded-2xl border border-border bg-secondary/50'>
                      <span className='flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5'>
                        3
                      </span>
                      <div className='text-xs sm:text-sm'>
                        <strong className='text-foreground'>Gunakan Tombol &quot;Tambahkan ke Flashcard Utama&quot;:</strong> Jangan biarkan kata-kata ini hanya dibaca sekilas. Tambahkan kata yang menurut Anda menantang ke dalam deck flashcard Spaced Repetition Anda dan review secara berkala di halaman utama aplikasi.
                      </div>
                    </div>
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
