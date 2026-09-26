'use client';
import React, { useState } from 'react';
import { FaVolumeHigh, FaRotateRight, FaCheck, FaXmark, FaForward } from 'react-icons/fa6';
import { NUMERIC_DICTATION_EXERCISES } from '@/data/numeric';
import { AccentPreference } from '@/types/phonemic';
import { playNumericDictation } from '@/utils/numericAudio';

interface NumericDictationPracticeProps {
  accent: AccentPreference;
}

export const NumericDictationPractice: React.FC<NumericDictationPracticeProps> = ({ accent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentExercise = NUMERIC_DICTATION_EXERCISES[currentIndex];

  const handlePlayAudio = (slow: boolean = false) => {
    if (!currentExercise) return;
    setIsPlayingAudio(true);
    playNumericDictation({
      script: currentExercise.spokenScript,
      accent,
      slow,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleNext = () => {
    setUserInput('');
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % NUMERIC_DICTATION_EXERCISES.length);
  };

  const cleanText = (str: string) => str.replace(/[\s-]/g, '').toUpperCase();
  const isCorrect = isRevealed && cleanText(userInput) === cleanText(currentExercise.targetDisplay);

  return (
    <div
      className='rounded-2xl border p-4 sm:p-5 space-y-4'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      <div className='flex items-center justify-between gap-2 border-b pb-3' style={{ borderColor: 'var(--border)' }}>
        <div>
          <span className='px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300'>
            {currentExercise.category}
          </span>
          <h4 className='text-xs font-bold text-foreground mt-1'>{currentExercise.context}</h4>
        </div>
        <span className='text-xs font-mono text-muted-foreground'>
          {currentIndex + 1} / {NUMERIC_DICTATION_EXERCISES.length}
        </span>
      </div>

      {/* Audio Play Trigger Bar */}
      <div className='flex items-center justify-center gap-2.5 py-1'>
        <button
          onClick={() => handlePlayAudio(false)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all ${
            isPlayingAudio
              ? 'bg-teal-600 text-white animate-pulse ring-4 ring-teal-500/20'
              : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
        >
          <FaVolumeHigh className='h-3.5 w-3.5' />
          <span>{isPlayingAudio ? 'Sedang Memutar...' : 'Dengarkan Dikte Audio'}</span>
        </button>
        <button
          onClick={() => handlePlayAudio(true)}
          className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
          style={{ borderColor: 'var(--border)' }}
          title='Putar dengan tempo lambat'
        >
          <FaRotateRight className='h-3 w-3 text-amber-500' />
          <span>0.7x</span>
        </button>
      </div>

      {/* Input & Check Controls */}
      <div className='max-w-md mx-auto space-y-3'>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsRevealed(true);
            }}
            placeholder='Ketik angka/kode yang Anda dengar...'
            className='flex-1 rounded-xl border px-3.5 py-2 text-sm font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-teal-500'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          />
          <button
            onClick={() => setIsRevealed(true)}
            className='px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-500 text-white hover:bg-teal-600 transition-all shrink-0'
          >
            Cek
          </button>
        </div>

        {/* Revealed Answer Box */}
        {isRevealed && (
          <div
            className={`rounded-xl border p-3 text-xs space-y-1.5 ${
              isCorrect ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200' : 'bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className='flex items-center justify-between font-bold'>
              <span className='flex items-center gap-1.5'>
                {isCorrect ? <FaCheck className='h-3.5 w-3.5 text-emerald-500' /> : <FaXmark className='h-3.5 w-3.5 text-rose-500' />}
                <span>Kunci Jawaban: {currentExercise.targetDisplay}</span>
              </span>
              <button onClick={handleNext} className='inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold hover:underline'>
                <span>Soal Berikutnya</span>
                <FaForward className='h-2.5 w-2.5' />
              </button>
            </div>
            <p className='text-[11px] opacity-80 leading-normal'>{currentExercise.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumericDictationPractice;
