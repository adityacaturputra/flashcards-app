'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeHigh } from 'react-icons/fa6';
import { PhonemeItem, AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface PhonemeCardProps {
  phoneme: PhonemeItem;
  accent: AccentPreference;
  onClick: () => void;
  isSelected?: boolean;
}

export const PhonemeCard: React.FC<PhonemeCardProps> = ({
  phoneme,
  accent,
  onClick,
  isSelected = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    playSpeech({
      text: phoneme.audioText,
      accent,
      rate: 0.85,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  // Border & Accent coloring based on phoneme category
  const getCardStyle = () => {
    if (phoneme.category === 'monophthong') {
      return {
        bg: 'hover:border-amber-400/80 bg-amber-500/5 dark:bg-amber-500/10',
        badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
      };
    }
    if (phoneme.category === 'diphthong') {
      return {
        bg: 'hover:border-orange-400/80 bg-orange-500/5 dark:bg-orange-500/10',
        badge: 'bg-orange-500/15 text-orange-700 dark:text-orange-300',
      };
    }
    // Consonant
    if (phoneme.voicing === 'voiced') {
      return {
        bg: 'hover:border-emerald-400/80 bg-emerald-500/5 dark:bg-emerald-500/10',
        badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
      };
    }
    return {
      bg: 'hover:border-sky-400/80 bg-sky-500/5 dark:bg-sky-500/10',
      badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    };
  };

  const styleConfig = getCardStyle();

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex flex-col justify-between rounded-xl border p-2.5 sm:p-3 transition-all cursor-pointer shadow-xs ${
        styleConfig.bg
      } ${
        isSelected
          ? 'ring-2 ring-primary border-primary shadow-md'
          : 'border-border/60 hover:shadow-md'
      }`}
      style={{
        background: 'var(--card)',
        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
      }}
    >
      {/* Top row: Voicing indicator & Category Tag */}
      <div className='flex items-center justify-between gap-1'>
        <div className='flex items-center gap-1.5'>
          {/* Voicing Dot */}
          <span
            title={
              phoneme.voicing === 'voiced'
                ? 'Voiced (Pita suara bergetar)'
                : phoneme.voicing === 'unvoiced'
                ? 'Unvoiced (Hembusan nafas tanpa getaran)'
                : 'Vowel (Selalu bergetar)'
            }
            className={`h-2 w-2 rounded-full ${
              phoneme.voicing === 'voiced'
                ? 'bg-emerald-500 ring-2 ring-emerald-500/30'
                : phoneme.voicing === 'unvoiced'
                ? 'bg-slate-400 dark:bg-slate-500 border border-slate-600'
                : 'bg-amber-400 ring-2 ring-amber-400/30'
            }`}
          />
          {phoneme.subCategory === 'long' && (
            <span className='rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider'>
              Long
            </span>
          )}
        </div>

        {/* Quick Audio Play Button */}
        <button
          onClick={handlePlayAudio}
          className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all ${
            isPlaying
              ? 'bg-primary text-primary-foreground scale-110 shadow-xs'
              : 'bg-secondary/80 text-muted-foreground hover:bg-primary/20 hover:text-primary'
          }`}
          title={`Dengarkan pengucapan '${phoneme.exampleWord}' (${phoneme.ipa})`}
          aria-label={`Play audio for ${phoneme.exampleWord}`}
        >
          <FaVolumeHigh className={`h-2.5 w-2.5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Center: Prominent IPA Character */}
      <div className='my-1.5 flex flex-col items-center justify-center text-center'>
        <span className='font-mono text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors'>
          {phoneme.ipa}
        </span>
        <span className='text-[11px] sm:text-xs font-semibold text-muted-foreground mt-0.5'>
          {phoneme.exampleWord}
        </span>
      </div>

      {/* Bottom Subtitle: Phonetic Transcription */}
      <div className='flex items-center justify-center'>
        <span className='text-[10px] font-mono text-muted-foreground/80 opacity-80 group-hover:opacity-100 transition-opacity'>
          {phoneme.exampleIpa}
        </span>
      </div>
    </motion.div>
  );
};

export default PhonemeCard;
