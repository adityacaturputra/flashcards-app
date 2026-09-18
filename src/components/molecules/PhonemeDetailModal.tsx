'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaVolumeHigh,
  FaClock,
  FaLightbulb,
  FaGraduationCap,
  FaSpellCheck,
} from 'react-icons/fa6';
import { PhonemeItem, AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface PhonemeDetailModalProps {
  phoneme: PhonemeItem | null;
  accent: AccentPreference;
  onClose: () => void;
}

export const PhonemeDetailModal: React.FC<PhonemeDetailModalProps> = ({
  phoneme,
  accent,
  onClose,
}) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  if (!phoneme) return null;

  const handlePlay = (text: string, rate: number = 0.88) => {
    setPlayingWord(text);
    playSpeech({
      text,
      accent,
      rate,
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
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
          className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl z-10'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)',
          }}
        >
          {/* Top Sticky Header */}
          <div
            className='sticky top-0 z-20 flex items-center justify-between border-b px-4 py-3.5 sm:px-6 backdrop-blur-md'
            style={{
              borderColor: 'var(--border)',
              background: 'var(--card)',
            }}
          >
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary font-mono text-2xl font-black'>
                {phoneme.ipa}
              </div>
              <div>
                <h3 className='text-base sm:text-lg font-bold text-foreground leading-tight'>
                  {phoneme.name}
                </h3>
                <div className='flex items-center gap-2 mt-0.5'>
                  <span className='capitalize text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground'>
                    {phoneme.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      phoneme.voicing === 'voiced' || phoneme.voicing === 'voiced-vowel'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {phoneme.voicing === 'voiced'
                      ? 'Voiced (Bergetar)'
                      : phoneme.voicing === 'unvoiced'
                      ? 'Unvoiced (Nafas Murni)'
                      : 'Vowel (Bersuara)'}
                  </span>
                </div>
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

          <div className='p-4 sm:p-6 space-y-5'>
            {/* Audio Playground Bar */}
            <div
              className='rounded-xl border p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='flex items-center gap-3 w-full sm:w-auto'>
                <div className='text-sm'>
                  <span className='font-semibold text-foreground'>Contoh Kata: </span>
                  <span className='font-bold text-primary font-mono text-base ml-1'>
                    {phoneme.exampleWord}
                  </span>
                  <span className='text-xs text-muted-foreground font-mono ml-1.5'>
                    ({phoneme.exampleIpa})
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2 w-full sm:w-auto justify-end'>
                <button
                  onClick={() => handlePlay(phoneme.exampleWord, 0.88)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    playingWord === phoneme.exampleWord
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-card text-foreground hover:bg-primary/10 border-border'
                  }`}
                >
                  <FaVolumeHigh className='h-3 w-3' />
                  <span>Dengar ({accent.toUpperCase()})</span>
                </button>

                <button
                  onClick={() => handlePlay(phoneme.exampleWord, 0.55)}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-border bg-card text-foreground hover:bg-amber-500/10 hover:text-amber-600'
                  title='Putar perlahan untuk mendengar posisi vokal/konsonan'
                >
                  <FaClock className='h-3 w-3' />
                  <span>Slow</span>
                </button>
              </div>
            </div>

            {/* General Description */}
            <p className='text-sm leading-relaxed text-foreground/90'>
              {phoneme.description}
            </p>

            {/* Articulatory Blueprint (Mouth Mechanics) */}
            <div className='space-y-2.5'>
              <h4 className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                <FaLightbulb className='h-3.5 w-3.5 text-amber-500' />
                <span>Mekanik Fisik Artikulasi (Adrian Underhill Method)</span>
              </h4>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                <div
                  className='p-3 rounded-xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='text-xs font-bold text-muted-foreground uppercase'>
                    👄 Posisi Bibir (Lips):
                  </span>
                  <p className='text-xs sm:text-sm font-medium text-foreground mt-0.5'>
                    {phoneme.articulatoryGuide.lips}
                  </p>
                </div>

                <div
                  className='p-3 rounded-xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='text-xs font-bold text-muted-foreground uppercase'>
                    📐 Posisi Rahang (Jaw):
                  </span>
                  <p className='text-xs sm:text-sm font-medium text-foreground mt-0.5'>
                    {phoneme.articulatoryGuide.jaw}
                  </p>
                </div>

                <div
                  className='p-3 rounded-xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='text-xs font-bold text-muted-foreground uppercase'>
                    👅 Gerakan Lidah (Tongue):
                  </span>
                  <p className='text-xs sm:text-sm font-medium text-foreground mt-0.5'>
                    {phoneme.articulatoryGuide.tongue}
                  </p>
                </div>

                <div
                  className='p-3 rounded-xl border'
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className='text-xs font-bold text-muted-foreground uppercase'>
                    📳 Pita Suara (Vocal Cords):
                  </span>
                  <p className='text-xs sm:text-sm font-medium text-foreground mt-0.5'>
                    {phoneme.articulatoryGuide.vocalCords}
                  </p>
                </div>
              </div>
            </div>

            {/* Common Spelling Patterns */}
            {phoneme.spellingPatterns.length > 0 && (
              <div className='space-y-2.5'>
                <h4 className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                  <FaSpellCheck className='h-3.5 w-3.5 text-sky-500' />
                  <span>Pola Ejaan Umum di Kamus (*Spelling Patterns*)</span>
                </h4>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {phoneme.spellingPatterns.map((pat, idx) => (
                    <div
                      key={idx}
                      className='flex items-start gap-2.5 p-2.5 rounded-lg border text-xs'
                      style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                    >
                      <span className='font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10 shrink-0'>
                        {pat.pattern}
                      </span>
                      <span className='text-foreground/90 font-medium'>
                        {pat.examples.join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic IELTS Vocabulary */}
            {phoneme.ieltsWords.length > 0 && (
              <div className='space-y-2.5'>
                <h4 className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                  <FaGraduationCap className='h-3.5 w-3.5 text-purple-500' />
                  <span>Kosakata Akademik IELTS Band 7.5+ dengan Bunyi Ini</span>
                </h4>

                <div className='space-y-2'>
                  {phoneme.ieltsWords.map((item, idx) => (
                    <div
                      key={idx}
                      className='flex items-center justify-between p-2.5 rounded-xl border transition-all hover:bg-secondary/50'
                      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                    >
                      <div className='min-w-0 pr-2'>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-sm text-foreground'>
                            {item.word}
                          </span>
                          <span className='font-mono text-xs text-muted-foreground'>
                            {item.ipa}
                          </span>
                        </div>
                        <p className='text-xs text-muted-foreground truncate mt-0.5'>
                          {item.meaning}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePlay(item.word)}
                        className='flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary hover:bg-primary hover:text-primary-foreground transition-all shrink-0'
                        title={`Dengarkan '${item.word}'`}
                        aria-label={`Play audio for ${item.word}`}
                      >
                        <FaVolumeHigh className='h-3 w-3' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PhonemeDetailModal;
