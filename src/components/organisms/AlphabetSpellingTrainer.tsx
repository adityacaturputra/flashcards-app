'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaVolumeHigh,
  FaRotateRight,
  FaCheck,
  FaXmark,
  FaForward,
  FaLightbulb,
  FaKeyboard,
  FaShuffle,
} from 'react-icons/fa6';
import { SPELLING_EXERCISES } from '@/data/alphabet';
import { SpellingExercise } from '@/types/alphabet';
import { AccentPreference } from '@/types/phonemic';
import { playSpellingSpeech, playRawLetter } from '@/utils/alphabetAudio';

interface AlphabetSpellingTrainerProps {
  accent: AccentPreference;
}

export const AlphabetSpellingTrainer: React.FC<AlphabetSpellingTrainerProps> = ({ accent }) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentExercise: SpellingExercise =
    SPELLING_EXERCISES[exerciseIndex % SPELLING_EXERCISES.length];

  const cleanTarget = currentExercise.target.toUpperCase().replace(/\s+/g, '');
  const cleanUser = userInput.toUpperCase().replace(/\s+/g, '');
  const isCorrect = cleanUser === cleanTarget;

  // Play letter-by-letter spelling
  const handlePlaySpelling = (rate: number = 0.72) => {
    setIsPlayingAudio(true);
    playSpellingSpeech({
      text: currentExercise.target,
      accent,
      rate,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Next exercise
  const handleNext = () => {
    const nextIdx = (exerciseIndex + 1) % SPELLING_EXERCISES.length;
    setExerciseIndex(nextIdx);
    setUserInput('');
    setIsAnswered(false);

    // Auto-play next after delay
    setTimeout(() => {
      setIsPlayingAudio(true);
      playSpellingSpeech({
        text: SPELLING_EXERCISES[nextIdx].target,
        accent,
        rate: 0.72,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    }, 300);
  };

  // Check answer
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;
    setIsAnswered(true);
  };

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      {/* Exercise Card */}
      <div
        className='rounded-2xl border p-5 sm:p-7 shadow-xs space-y-6'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        {/* Top Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400'>
              {currentExercise.category}
            </span>
            <span className='text-xs text-muted-foreground'>
              Latihan {exerciseIndex + 1} dari {SPELLING_EXERCISES.length}
            </span>
          </div>

          <button
            onClick={() => {
              const rand = Math.floor(Math.random() * SPELLING_EXERCISES.length);
              setExerciseIndex(rand);
              setUserInput('');
              setIsAnswered(false);
            }}
            className='inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground'
          >
            <FaShuffle className='h-3 w-3' />
            <span>Acak</span>
          </button>
        </div>

        {/* Context Prompt */}
        <div className='text-center space-y-1.5'>
          <h3 className='text-base sm:text-lg font-bold text-foreground'>
            {currentExercise.context}
          </h3>
          <p className='text-xs text-muted-foreground'>
            Dengarkan audio pengejaan huruf demi huruf, lalu ketikkan kata/kode yang Anda dengar.
          </p>
        </div>

        {/* Big Audio Play Button */}
        <div className='flex flex-col items-center justify-center gap-3'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePlaySpelling(0.72)}
            className={`relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl text-white shadow-lg transition-all ${
              isPlayingAudio
                ? 'bg-teal-600 ring-8 ring-teal-500/25 animate-pulse'
                : 'bg-teal-500 hover:bg-teal-600'
            }`}
            title='Dengarkan pengejaan huruf demi huruf'
            aria-label='Play spelled letters audio'
          >
            <FaVolumeHigh className='h-9 w-9 sm:h-10 sm:w-10' />
            {isPlayingAudio && (
              <span className='absolute inset-0 rounded-3xl ring-4 ring-teal-400 animate-ping opacity-30' />
            )}
          </motion.button>

          {/* Replay Speed Buttons */}
          <div className='flex items-center gap-2'>
            <button
              onClick={() => handlePlaySpelling(0.72)}
              className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
              style={{ borderColor: 'var(--border)' }}
            >
              <FaVolumeHigh className='h-3 w-3 text-teal-600 dark:text-teal-400' />
              <span>Dengar Ejaan</span>
            </button>
            <button
              onClick={() => handlePlaySpelling(0.55)}
              className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
              style={{ borderColor: 'var(--border)' }}
              title='Dengarkan dengan tempo lebih lambat'
            >
              <FaRotateRight className='h-3 w-3 text-amber-500' />
              <span>Sangat Lambat (0.55x)</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto'>
          <div>
            <div className='relative'>
              <FaKeyboard className='absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <input
                type='text'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                placeholder='Ketik huruf yang Anda dengar...'
                disabled={isAnswered}
                autoFocus
                className='w-full rounded-2xl border pl-10 pr-4 py-3 text-center text-lg sm:text-xl font-mono font-bold tracking-widest uppercase focus:outline-hidden focus:ring-2 focus:ring-teal-500'
                style={{
                  background: 'var(--secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              />
            </div>
            <div className='mt-1.5 flex justify-between text-[11px] text-muted-foreground px-1'>
              <span>Karakter: {cleanUser.length}</span>
              <span>Target: {cleanTarget.length} huruf</span>
            </div>
          </div>

          {!isAnswered ? (
            <button
              type='submit'
              disabled={!userInput.trim()}
              className='w-full py-2.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 disabled:opacity-50 transition-all shadow-xs'
            >
              Periksa Jawaban
            </button>
          ) : null}
        </form>

        {/* Result & Detailed Feedback */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-2xl border p-5 text-left space-y-3 ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {isCorrect ? (
                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white'>
                      <FaCheck className='h-3.5 w-3.5' />
                    </div>
                  ) : (
                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white'>
                      <FaXmark className='h-3.5 w-3.5' />
                    </div>
                  )}
                  <span className='font-bold text-sm'>
                    {isCorrect ? 'Benar 100%! Pengejaan Sempurna.' : 'Ada Huruf yang Kurang Tepat!'}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 shadow-xs transition-all'
                >
                  <span>Latihan Berikutnya</span>
                  <FaForward className='h-3 w-3' />
                </button>
              </div>

              {/* Character by character inspection */}
              <div className='pt-2 border-t border-current/15'>
                <div className='text-xs font-semibold mb-1.5 text-foreground'>
                  Huruf Target:
                </div>
                <div className='flex flex-wrap gap-1.5'>
                  {cleanTarget.split('').map((char, i) => {
                    const userChar = cleanUser[i] || '';
                    const match = userChar === char;
                    return (
                      <div
                        key={i}
                        onClick={() => playRawLetter(char, accent, true)}
                        className={`cursor-pointer flex flex-col items-center justify-center h-10 w-9 rounded-lg border font-mono font-bold text-sm shadow-2xs transition-transform hover:scale-105 ${
                          match
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-rose-500 text-white border-rose-600'
                        }`}
                        title={`Klik untuk mendengar huruf ${char}`}
                      >
                        <span>{char}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Educational Hint */}
              <div className='flex items-start gap-1.5 text-xs text-foreground/80 pt-1'>
                <FaLightbulb className='h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5' />
                <span>
                  <strong>Tip:</strong> {currentExercise.hint}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlphabetSpellingTrainer;
