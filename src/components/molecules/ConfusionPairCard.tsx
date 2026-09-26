'use client';
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  FaVolumeHigh,
  FaHeadphones,
  FaCircleExclamation,
  FaPlay,
} from 'react-icons/fa6';
import { ConfusionPairItem } from '@/types/alphabet';
import { getAlphabetLetter } from '@/data/alphabet';

interface ConfusionPairCardProps {
  pair: ConfusionPairItem;
  activeLetterPlaying: string | null;
  onPlayLetter: (char: string) => void;
  onPlaySequence: (chars: string[]) => void;
}

export const ConfusionPairCard: React.FC<ConfusionPairCardProps> = memo(
  ({ pair, activeLetterPlaying, onPlayLetter, onPlaySequence }) => {
    return (
      <motion.div
        layout
        className='flex flex-col justify-between rounded-2xl border p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        <div>
          {/* Top Bar: Title & Compare Audio All Button */}
          <div className='flex items-start justify-between gap-2'>
            <h4 className='text-sm sm:text-base font-bold text-foreground'>
              {pair.title}
            </h4>
            <button
              type='button'
              onClick={() => onPlaySequence(pair.letters)}
              className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white text-xs font-semibold transition-all shrink-0'
              title={`Dengar perbandingan urutan: ${pair.letters.join(' lalu ')}`}
            >
              <FaPlay className='h-2.5 w-2.5' />
              <span>Dengar Keduanya</span>
            </button>
          </div>

          {/* Side-by-side Letters Display with Audio triggers */}
          <div className='mt-3.5 grid grid-cols-2 xs:grid-cols-3 gap-2.5'>
            {pair.letters.map((char) => {
              const letterObj = getAlphabetLetter(char);
              if (!letterObj) return null;
              const isPlayingThis = activeLetterPlaying === char;

              return (
                <div
                  key={char}
                  onClick={() => onPlayLetter(char)}
                  className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    isPlayingThis
                      ? 'ring-2 ring-teal-500 bg-teal-500/10 dark:bg-teal-950/30'
                      : 'bg-secondary/40 hover:bg-secondary border-border'
                  }`}
                >
                  <span className='font-serif text-3xl font-extrabold text-foreground'>
                    {letterObj.char}
                  </span>
                  <span className='font-mono text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5'>
                    {letterObj.ipa}
                  </span>
                  <span className='text-[10px] text-muted-foreground'>
                    ({letterObj.nato})
                  </span>
                  <div className='mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400'>
                    <FaVolumeHigh className='h-2.5 w-2.5' />
                    <span>{isPlayingThis ? 'Memutar...' : 'Putar'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Acoustic Clue */}
          <div className='mt-3.5 space-y-2 text-xs'>
            <div className='rounded-xl border p-3 bg-amber-500/5 border-amber-500/20 text-foreground'>
              <div className='flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 mb-1'>
                <FaHeadphones className='h-3 w-3' />
                <span>Kunci Pembeda Akustik</span>
              </div>
              <p className='text-xs leading-relaxed text-muted-foreground'>
                {pair.acousticClue}
              </p>
            </div>

            {/* Articulation difference */}
            <div className='p-2 text-[11px] text-muted-foreground leading-relaxed'>
              <strong>Perbedaan Mulut & Fisik:</strong> {pair.articulatoryDifference}
            </div>
          </div>
        </div>

        {/* IELTS Trap Scenario */}
        <div
          className='mt-3 pt-3 border-t text-[11px] text-muted-foreground flex items-start gap-1.5'
          style={{ borderColor: 'var(--border)' }}
        >
          <FaCircleExclamation className='h-3 w-3 text-rose-500 shrink-0 mt-0.5' />
          <span>
            <strong>Jebakan Ujian:</strong> {pair.ieltsTrapContext}
          </span>
        </div>
      </motion.div>
    );
  }
);

ConfusionPairCard.displayName = 'ConfusionPairCard';

export default ConfusionPairCard;
