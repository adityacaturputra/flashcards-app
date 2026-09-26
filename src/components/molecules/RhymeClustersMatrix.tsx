'use client';
import React, { memo } from 'react';
import { FaTable, FaPlay } from 'react-icons/fa6';
import { RhymeClusterTrap } from '@/types/alphabet';
import {
  RHYMING_LETTER_CLUSTERS_TABLE,
  getAlphabetLetter,
} from '@/data/alphabet';

interface RhymeClustersMatrixProps {
  clusters?: RhymeClusterTrap[];
  activeLetterPlaying: string | null;
  onPlayLetter: (char: string) => void;
  onPlaySequence: (chars: string[]) => void;
  className?: string;
}

export const RhymeClustersMatrix: React.FC<RhymeClustersMatrixProps> = memo(
  ({
    clusters = RHYMING_LETTER_CLUSTERS_TABLE,
    activeLetterPlaying,
    onPlayLetter,
    onPlaySequence,
    className = '',
  }) => {
    return (
      <div
        className={`rounded-2xl border p-4 sm:p-5 shadow-xs space-y-4 ${className}`}
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        {/* Header */}
        <div
          className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3.5'
          style={{ borderColor: 'var(--border)' }}
        >
          <div className='flex items-center gap-2'>
            <span className='rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 p-2'>
              <FaTable className='h-4 w-4' />
            </span>
            <div>
              <h3 className='text-sm sm:text-base font-bold text-foreground'>
                Matriks Bunyi Huruf Berirama Sama (Rhyming Letter Clusters)
              </h3>
              <p className='text-xs text-muted-foreground'>
                Kelompok rima vokal utama & titik rawan kebingungan bagi penutur non-native
              </p>
            </div>
          </div>
          <span className='self-start sm:self-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-400'>
            IELTS Module 5
          </span>
        </div>

        {/* Matrix Rows */}
        <div className='space-y-3'>
          {clusters.map((row) => (
            <div
              key={row.soundCategory}
              className='rounded-xl border p-3 sm:p-4 transition-all hover:border-teal-500/40'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='flex flex-col md:flex-row md:items-start justify-between gap-3'>
                {/* Column 1: Sound Category & Play Cluster Button */}
                <div className='md:w-44 shrink-0 flex items-center md:flex-col md:items-start justify-between gap-2'>
                  <div>
                    <span className='inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-mono font-bold bg-teal-500/15 text-teal-700 dark:text-teal-400'>
                      {row.soundCategory}
                    </span>
                  </div>
                  <button
                    type='button'
                    onClick={() => onPlaySequence(row.letters)}
                    className='inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold bg-card border hover:bg-slate-100 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 transition-colors shadow-2xs'
                    style={{ borderColor: 'var(--border)' }}
                    title={`Putar urutan audio huruf: ${row.letters.join(', ')}`}
                  >
                    <FaPlay className='h-2.5 w-2.5' />
                    <span>Dengar Rumpun</span>
                  </button>
                </div>

                {/* Column 2: Letters Chips (Click to hear each letter) */}
                <div className='flex items-center gap-1.5 flex-wrap shrink-0'>
                  {row.letters.map((char) => {
                    const lObj = getAlphabetLetter(char);
                    const isPlayingThis = activeLetterPlaying === char;
                    return (
                      <button
                        key={char}
                        type='button'
                        onClick={() => onPlayLetter(char)}
                        className={`inline-flex items-center justify-center h-8 min-w-[32px] px-2 rounded-lg font-serif font-bold text-sm border transition-all ${
                          isPlayingThis
                            ? 'bg-teal-500 text-white border-teal-600 ring-2 ring-teal-500/40 animate-pulse'
                            : 'bg-card hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground border-border shadow-2xs'
                        }`}
                        title={`Dengar huruf ${char} (${lObj?.name || ''})`}
                      >
                        {char}
                      </button>
                    );
                  })}
                </div>

                {/* Column 3: Non-Native Confusion Point */}
                <div className='flex-1 text-xs text-muted-foreground leading-relaxed pt-1 md:pt-0'>
                  <span className='font-semibold text-foreground mr-1'>Titik Rawan:</span>
                  {row.nonNativeTrap}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

RhymeClustersMatrix.displayName = 'RhymeClustersMatrix';

export default RhymeClustersMatrix;
