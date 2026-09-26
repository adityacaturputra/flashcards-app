'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaVolumeHigh, FaCircleInfo } from 'react-icons/fa6';
import { AlphabetLetter } from '@/types/alphabet';

interface AlphabetCardProps {
  letter: AlphabetLetter;
  isPlaying: boolean;
  onPlay: (letter: AlphabetLetter) => void;
  onSelectDetails?: (letter: AlphabetLetter) => void;
  isHighlighted?: boolean;
}

export const AlphabetCard: React.FC<AlphabetCardProps> = ({
  letter,
  isPlaying,
  onPlay,
  onSelectDetails,
  isHighlighted = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(letter);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectDetails?.(letter);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`group relative flex flex-col justify-between rounded-2xl border p-3.5 sm:p-4 cursor-pointer transition-all select-none shadow-xs hover:shadow-md ${
        isPlaying
          ? 'ring-2 ring-teal-500 shadow-teal-500/20 bg-teal-500/10 dark:bg-teal-950/30'
          : isHighlighted
            ? 'ring-2 ring-amber-500 bg-amber-500/10 dark:bg-amber-950/20'
            : 'hover:border-teal-500/50'
      }`}
      style={{
        background: isPlaying ? undefined : 'var(--card)',
        borderColor: isPlaying ? 'rgb(20 184 166)' : 'var(--border)',
        color: 'var(--card-foreground)',
      }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlay(letter);
        }
      }}
      aria-label={`Letter ${letter.char}, pronounced ${letter.name} ${letter.ipa}. Press to listen.`}
    >
      {/* Top Bar: Rhyme Badge & Info Trigger */}
      <div className='flex items-center justify-between gap-1'>
        <span
          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide transition-colors ${
            letter.isVowel
              ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
              : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground'
          }`}
        >
          {letter.rhymeIpa}
        </span>

        {onSelectDetails && (
          <button
            type='button'
            onClick={handleInfoClick}
            className='p-1 rounded-lg text-muted-foreground opacity-60 hover:opacity-100 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-all'
            title={`Lihat tips artikulasi & pasangan membingungkan untuk ${letter.char}`}
            aria-label={`Info for letter ${letter.char}`}
          >
            <FaCircleInfo className='h-3 w-3' />
          </button>
        )}
      </div>

      {/* Center: Big Letter Display */}
      <div className='my-2 flex flex-col items-center justify-center text-center'>
        <div className='flex items-baseline gap-1'>
          <span className='text-3xl sm:text-4xl font-extrabold tracking-tight font-serif'>
            {letter.char}
          </span>
          <span className='text-xl sm:text-2xl font-semibold opacity-70 font-serif'>
            {letter.lower}
          </span>
        </div>

        <div className='mt-1 flex items-center gap-1.5'>
          <span className='text-xs font-mono font-medium text-teal-600 dark:text-teal-400'>
            {letter.ipa}
          </span>
          <span className='text-[11px] text-muted-foreground italic font-sans'>
            ({letter.name})
          </span>
        </div>
      </div>

      {/* Bottom Bar: NATO Code & Play Trigger */}
      <div className='flex items-center justify-between border-t pt-2 mt-1' style={{ borderColor: 'var(--border)' }}>
        <span className='text-[11px] font-semibold text-muted-foreground truncate'>
          {letter.nato}
        </span>

        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
            isPlaying
              ? 'bg-teal-500 text-white animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white'
          }`}
        >
          <FaVolumeHigh className='h-2.5 w-2.5' />
        </div>
      </div>
    </motion.div>
  );
};

export default AlphabetCard;
