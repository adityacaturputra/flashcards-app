'use client';
import React, { useState, useCallback } from 'react';
import { FaArrowsSplitUpAndLeft } from 'react-icons/fa6';
import { CONFUSION_PAIRS, getAlphabetLetter } from '@/data/alphabet';
import { AccentPreference } from '@/types/phonemic';
import { playAlphabetLetter, playRawLetter, stopSpeech } from '@/utils/alphabetAudio';
import ConfusionPairCard from '@/components/molecules/ConfusionPairCard';
import RhymeClustersMatrix from '@/components/molecules/RhymeClustersMatrix';
import SpeedSpellingRulesCard from '@/components/molecules/SpeedSpellingRulesCard';

interface AlphabetConfusionGuideProps {
  accent: AccentPreference;
}

export const AlphabetConfusionGuide: React.FC<AlphabetConfusionGuideProps> = ({ accent }) => {
  const [activeLetterPlaying, setActiveLetterPlaying] = useState<string | null>(null);

  const handlePlayLetter = useCallback(
    (char: string) => {
      const l = getAlphabetLetter(char);
      if (!l) return;

      setActiveLetterPlaying(char);
      playAlphabetLetter({
        letter: l,
        accent,
        onEnd: () => setActiveLetterPlaying(null),
        onError: () => setActiveLetterPlaying(null),
      });
    },
    [accent]
  );

  const handlePlaySequence = useCallback(
    (chars: string[]) => {
      stopSpeech();
      let idx = 0;

      const playNext = () => {
        if (idx >= chars.length) {
          setActiveLetterPlaying(null);
          return;
        }
        const char = chars[idx];
        setActiveLetterPlaying(char);
        playRawLetter(char, accent, false, () => {
          idx++;
          setTimeout(playNext, 700);
        });
      };

      playNext();
    },
    [accent]
  );

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {/* 1. Intro Header */}
      <div
        className='rounded-2xl border p-4 sm:p-5 shadow-xs'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        <div className='flex items-center gap-2.5'>
          <span className='rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2.5'>
            <FaArrowsSplitUpAndLeft className='h-5 w-5' />
          </span>
          <div>
            <h2 className='text-base sm:text-lg font-bold'>
              Panduan Pasangan Huruf Membingungkan (IELTS Listening Traps)
            </h2>
            <p className='text-xs text-muted-foreground'>
              Analisis akustik & fisik untuk membedakan huruf-huruf dengan bunyi mirip saat spelling nama, kode pos, dan nomor paspor.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Primary Top Section: 7 Confusion Pairs Cards Grid */}
      <div className='space-y-3.5'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm sm:text-base font-bold text-foreground'>
            Analisis Mendalam Per Pasangan Huruf Sering Tertukar
          </h3>
          <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400'>
            7 Pasangan Kritis
          </span>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5'>
          {CONFUSION_PAIRS.map((pair) => (
            <ConfusionPairCard
              key={pair.id}
              pair={pair}
              activeLetterPlaying={activeLetterPlaying}
              onPlayLetter={handlePlayLetter}
              onPlaySequence={handlePlaySequence}
            />
          ))}
        </div>
      </div>

      {/* 3. Bottom Section: Matriks Bunyi Huruf Berirama Sama (Rhyming Letter Clusters) */}
      <div className='space-y-4 pt-2'>
        <RhymeClustersMatrix
          activeLetterPlaying={activeLetterPlaying}
          onPlayLetter={handlePlayLetter}
          onPlaySequence={handlePlaySequence}
        />

        {/* 4. Bottom Rules: Kaidah Pengucapan Ejaan Cepat (Speed Spelling Rules) */}
        <SpeedSpellingRulesCard />
      </div>
    </div>
  );
};

export default AlphabetConfusionGuide;
