'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeHigh, FaArrowsSplitUpAndLeft, FaLightbulb } from 'react-icons/fa6';
import { TeenTyPair } from '@/types/numeric';
import { AccentPreference } from '@/types/phonemic';
import { playNumberWord, playContrastPair } from '@/utils/numericAudio';

export const TEEN_TY_AUDIO_TARGET = {
  TEEN: 'teen',
  TY: 'ty',
  CONTRAST: 'contrast',
} as const;

export type TeenTyAudioTarget =
  (typeof TEEN_TY_AUDIO_TARGET)[keyof typeof TEEN_TY_AUDIO_TARGET];

interface TeenTyCardProps {
  pair: TeenTyPair;
  accent: AccentPreference;
}

export const TeenTyCard: React.FC<TeenTyCardProps> = ({ pair, accent }) => {
  const [playingTarget, setPlayingTarget] = useState<TeenTyAudioTarget | null>(null);

  const handlePlayWord = (word: string, target: TeenTyAudioTarget) => {
    setPlayingTarget(target);
    playNumberWord({
      word,
      accent,
      onEnd: () => setPlayingTarget(null),
      onError: () => setPlayingTarget(null),
    });
  };

  const handlePlayContrast = () => {
    setPlayingTarget('contrast');
    playContrastPair({
      word1: pair.teenWord,
      word2: pair.tyWord,
      accent,
      onEnd: () => setPlayingTarget(null),
    });
  };

  return (
    <div
      className='rounded-2xl border p-4 sm:p-5 space-y-3.5 transition-all shadow-xs'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      {/* Top Header: Comparison Controls */}
      <div className='flex items-center justify-between gap-2 border-b pb-2.5' style={{ borderColor: 'var(--border)' }}>
        <span className='text-xs font-bold font-mono text-muted-foreground'>
          #{pair.teenNum} vs #{pair.tyNum}
        </span>
        <button
          onClick={handlePlayContrast}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
            playingTarget === 'contrast'
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-700 dark:text-amber-400 border-amber-500/30'
          }`}
          title='Putar kedua angka berurutan untuk membandingkan posisi tekanan'
        >
          <FaArrowsSplitUpAndLeft className='h-3 w-3' />
          <span>Bandingkan Bunyi</span>
        </button>
      </div>

      {/* Grid: Teen Side vs Ty Side */}
      <div className='grid grid-cols-2 gap-2.5 sm:gap-4'>
        {/* Teen Side (-TEEN: 2nd syllable stress) */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handlePlayWord(pair.teenWord, 'teen')}
          className={`relative rounded-xl border p-3 cursor-pointer flex flex-col justify-between transition-all ${
            playingTarget === 'teen'
              ? 'ring-2 ring-teal-500 bg-teal-500/10 dark:bg-teal-950/20 border-teal-500'
              : 'hover:border-teal-500/50 bg-secondary/30'
          }`}
          style={{ borderColor: playingTarget === 'teen' ? undefined : 'var(--border)' }}
        >
          <div className='flex items-baseline justify-between'>
            <span className='text-2xl sm:text-3xl font-extrabold font-serif'>{pair.teenNum}</span>
            <div className={`p-1.5 rounded-full ${playingTarget === 'teen' ? 'bg-teal-500 text-white' : 'text-teal-600 dark:text-teal-400'}`}>
              <FaVolumeHigh className='h-3 w-3' />
            </div>
          </div>
          <div className='mt-1'>
            <div className='font-bold text-sm text-foreground'>{pair.teenWord}</div>
            <div className='text-xs font-mono text-teal-600 dark:text-teal-400 font-medium'>{pair.teenIpa}</div>
          </div>
          <div className='mt-2 pt-1.5 border-t border-border/50 text-[10px] text-muted-foreground leading-tight'>
            <span className='font-semibold text-teal-700 dark:text-teal-300'>Tekanan akhir:</span> vokal panjang /iːn/
          </div>
        </motion.div>

        {/* Ty Side (-TY: 1st syllable stress) */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handlePlayWord(pair.tyWord, 'ty')}
          className={`relative rounded-xl border p-3 cursor-pointer flex flex-col justify-between transition-all ${
            playingTarget === 'ty'
              ? 'ring-2 ring-rose-500 bg-rose-500/10 dark:bg-rose-950/20 border-rose-500'
              : 'hover:border-rose-500/50 bg-secondary/30'
          }`}
          style={{ borderColor: playingTarget === 'ty' ? undefined : 'var(--border)' }}
        >
          <div className='flex items-baseline justify-between'>
            <span className='text-2xl sm:text-3xl font-extrabold font-serif'>{pair.tyNum}</span>
            <div className={`p-1.5 rounded-full ${playingTarget === 'ty' ? 'bg-rose-500 text-white' : 'text-rose-600 dark:text-rose-400'}`}>
              <FaVolumeHigh className='h-3 w-3' />
            </div>
          </div>
          <div className='mt-1'>
            <div className='font-bold text-sm text-foreground'>{pair.tyWord}</div>
            <div className='text-xs font-mono text-rose-600 dark:text-rose-400 font-medium'>{pair.tyIpa}</div>
          </div>
          <div className='mt-2 pt-1.5 border-t border-border/50 text-[10px] text-muted-foreground leading-tight'>
            <span className='font-semibold text-rose-700 dark:text-rose-300'>Tekanan awal:</span> vokal tumpul /i/
          </div>
        </motion.div>
      </div>

      {/* Acoustic Trap Note */}
      <div className='rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2'>
        <FaLightbulb className='h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5' />
        <span className='leading-relaxed'>{pair.acousticTrap}</span>
      </div>
    </div>
  );
};

export default TeenTyCard;
