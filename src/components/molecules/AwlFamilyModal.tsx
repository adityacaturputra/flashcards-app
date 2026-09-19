'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaVolumeHigh,
  FaPlus,
  FaCheck,
  FaLightbulb,
  FaGraduationCap,
  FaQuoteLeft,
} from 'react-icons/fa6';
import { AwlItem } from '@/types/awl';
import { AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface AwlFamilyModalProps {
  item: AwlItem | null;
  accent: AccentPreference;
  isInDeck: boolean;
  onAddToDeck: (item: AwlItem) => Promise<void>;
  onClose: () => void;
}

export const AwlFamilyModal: React.FC<AwlFamilyModalProps> = ({
  item,
  accent,
  isInDeck,
  onAddToDeck,
  onClose,
}) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (!item) return null;

  const handlePlay = (text: string) => {
    setPlayingWord(text);
    playSpeech({
      text,
      accent,
      rate: 0.88,
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
  };

  const handleAdd = async () => {
    if (isInDeck || isAdding) return;
    setIsAdding(true);
    try {
      await onAddToDeck(item);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto'>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='fixed inset-0 bg-black/60 backdrop-blur-sm'
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl z-10'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)',
          }}
        >
          {/* Top Sticky Header */}
          <div
            className='sticky top-0 z-20 flex items-center justify-between border-b px-5 py-4 backdrop-blur-md'
            style={{
              borderColor: 'var(--border)',
              background: 'var(--card)',
            }}
          >
            <div className='flex items-center gap-3'>
              <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 font-black text-lg'>
                {item.sublist}
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <h3 className='text-lg sm:text-xl font-black text-foreground capitalize'>
                    {item.headword}
                  </h3>
                  <span className='text-xs font-mono text-muted-foreground'>
                    {item.ipa}
                  </span>
                </div>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  AWL Sublist {item.sublist} · {item.primaryPartOfSpeech.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className='rounded-xl border p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all'
              style={{ borderColor: 'var(--border)' }}
              aria-label='Close modal'
            >
              <FaXmark className='h-4 w-4' />
            </button>
          </div>

          <div className='p-5 sm:p-6 space-y-6'>
            {/* 1-Click "Add to Flashcard Deck" Action Banner */}
            <div
              className='rounded-2xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-3'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='text-left w-full sm:w-auto'>
                <div className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                  Integrasi Spaced Repetition
                </div>
                <div className='text-xs text-foreground/80 mt-0.5'>
                  Kategori: <strong className='text-primary'>Academic Word List (AWL)</strong>
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={isInDeck || isAdding}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  isInDeck
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 cursor-default'
                    : isAdding
                    ? 'bg-secondary text-muted-foreground border-border animate-pulse'
                    : 'bg-primary text-primary-foreground border-primary hover:brightness-110 shadow-md'
                }`}
              >
                {isInDeck ? (
                  <>
                    <FaCheck className='h-3.5 w-3.5' />
                    <span>✓ Sudah Tersimpan di Deck Utama</span>
                  </>
                ) : isAdding ? (
                  <span>Menyimpan ke Deck...</span>
                ) : (
                  <>
                    <FaPlus className='h-3.5 w-3.5' />
                    <span>➕ Tambahkan ke Flashcard Utama</span>
                  </>
                )}
              </button>
            </div>

            {/* Definitions */}
            <div className='space-y-1.5'>
              <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                Definisi & Makna
              </h4>
              <p className='text-sm font-semibold text-foreground leading-relaxed'>
                {item.definitionId}
              </p>
              <p className='text-xs text-muted-foreground italic'>
                &quot;{item.definitionEn}&quot;
              </p>
            </div>

            {/* The 4-Quadrant Word Family Matrix */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                  <span>Peta Rumpun Kata Lengkap (*Word Family Matrix*)</span>
                </h4>
                <span className='text-[11px] text-muted-foreground'>
                  Klik tombol audio untuk mendengar tiap bentuk
                </span>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {/* 1. Verbs */}
                <div
                  className='p-3.5 rounded-2xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-extrabold uppercase'>
                    Verbs (Kata Kerja)
                  </span>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {item.family.verbs.length > 0 ? (
                      item.family.verbs.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePlay(v)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                            playingWord === v
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary hover:bg-secondary/80 border-border text-foreground'
                          }`}
                        >
                          <FaVolumeHigh className='h-2.5 w-2.5 opacity-60' />
                          <span>{v}</span>
                        </button>
                      ))
                    ) : (
                      <span className='text-xs text-muted-foreground'>—</span>
                    )}
                  </div>
                </div>

                {/* 2. Nouns */}
                <div
                  className='p-3.5 rounded-2xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='rounded-md bg-sky-500/15 text-sky-700 dark:text-sky-300 px-2 py-0.5 text-[10px] font-extrabold uppercase'>
                    Nouns (Kata Benda)
                  </span>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {item.family.nouns.length > 0 ? (
                      item.family.nouns.map((n, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePlay(n)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                            playingWord === n
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary hover:bg-secondary/80 border-border text-foreground'
                          }`}
                        >
                          <FaVolumeHigh className='h-2.5 w-2.5 opacity-60' />
                          <span>{n}</span>
                        </button>
                      ))
                    ) : (
                      <span className='text-xs text-muted-foreground'>—</span>
                    )}
                  </div>
                </div>

                {/* 3. Adjectives */}
                <div
                  className='p-3.5 rounded-2xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 text-[10px] font-extrabold uppercase'>
                    Adjectives (Kata Sifat)
                  </span>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {item.family.adjectives.length > 0 ? (
                      item.family.adjectives.map((a, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePlay(a)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                            playingWord === a
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary hover:bg-secondary/80 border-border text-foreground'
                          }`}
                        >
                          <FaVolumeHigh className='h-2.5 w-2.5 opacity-60' />
                          <span>{a}</span>
                        </button>
                      ))
                    ) : (
                      <span className='text-xs text-muted-foreground'>—</span>
                    )}
                  </div>
                </div>

                {/* 4. Adverbs */}
                <div
                  className='p-3.5 rounded-2xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 px-2 py-0.5 text-[10px] font-extrabold uppercase'>
                    Adverbs (Kata Keterangan)
                  </span>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {item.family.adverbs.length > 0 ? (
                      item.family.adverbs.map((adv, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePlay(adv)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                            playingWord === adv
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary hover:bg-secondary/80 border-border text-foreground'
                          }`}
                        >
                          <FaVolumeHigh className='h-2.5 w-2.5 opacity-60' />
                          <span>{adv}</span>
                        </button>
                      ))
                    ) : (
                      <span className='text-xs text-muted-foreground'>—</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stress Shift Note Alert */}
            {item.stressShiftNote && (
              <div className='flex items-start gap-2.5 p-3.5 rounded-xl border border-amber-500/25 bg-amber-500/5 text-xs text-foreground/90'>
                <FaLightbulb className='h-4 w-4 text-amber-500 shrink-0 mt-0.5' />
                <div>
                  <span className='font-bold text-amber-700 dark:text-amber-300'>
                    Pergeseran Penekanan Nada (Stress Shift):{' '}
                  </span>
                  <span>{item.stressShiftNote}</span>
                </div>
              </div>
            )}

            {/* Academic Collocations */}
            {item.collocations.length > 0 && (
              <div className='space-y-2'>
                <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                  <FaGraduationCap className='h-3.5 w-3.5 text-purple-500' />
                  <span>Kolokasi Emas IELTS (Academic Collocations)</span>
                </h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {item.collocations.map((c, idx) => (
                    <div
                      key={idx}
                      className='flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium'
                      style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                    >
                      <span className='text-foreground'>{c}</span>
                      <button
                        onClick={() => handlePlay(c)}
                        className='p-1 text-muted-foreground hover:text-primary transition-colors'
                        title={`Dengar '${c}'`}
                      >
                        <FaVolumeHigh className='h-3 w-3' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sentence Upgrade Comparison (Band 5 vs Band 8) */}
            <div className='space-y-2'>
              <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                <FaQuoteLeft className='h-3.5 w-3.5 text-primary' />
                <span>Transformasi Kalimat: Bahasa Sehari-hari vs IELTS Band 8+</span>
              </h4>

              <div
                className='p-4 rounded-2xl border space-y-2.5'
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div>
                  <span className='text-[10px] font-bold text-red-600 dark:text-red-400 uppercase'>
                    ❌ Bahasa Sehari-hari (Band 5.0–6.0):
                  </span>
                  <p className='text-xs font-mono text-muted-foreground line-through mt-0.5'>
                    {item.band5Example}
                  </p>
                </div>

                <div className='border-t pt-2 border-border/60'>
                  <span className='text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase'>
                    ✅ Academic IELTS Writing Task 2 (Band 8.0+):
                  </span>
                  <p className='text-xs sm:text-sm font-semibold text-foreground mt-0.5'>
                    {item.band8Example}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AwlFamilyModal;
