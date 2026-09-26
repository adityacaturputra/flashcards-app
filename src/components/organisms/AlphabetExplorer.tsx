'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FaPlay,
  FaPause,
  FaRotateRight,
  FaFilter,
  FaMagnifyingGlass,
  FaVolumeHigh,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import {
  AlphabetLetter,
  RhymeGroupId,
  ALPHABET_FILTER_CATEGORY,
  AlphabetFilterCategory,
} from '@/types/alphabet';
import { ALPHABET_LETTERS, RHYME_GROUPS } from '@/data/alphabet';
import { AccentPreference } from '@/types/phonemic';
import AlphabetCard from '@/components/atoms/AlphabetCard';
import AlphabetDetailModal from '@/components/molecules/AlphabetDetailModal';
import { playAlphabetLetter, stopSpeech } from '@/utils/alphabetAudio';

interface AlphabetExplorerProps {
  accent: AccentPreference;
}

type FilterCategory = AlphabetFilterCategory | RhymeGroupId;

export const AlphabetExplorer: React.FC<AlphabetExplorerProps> = ({ accent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>(
    ALPHABET_FILTER_CATEGORY.ALL
  );
  const [playingLetterChar, setPlayingLetterChar] = useState<string | null>(null);
  const [modalLetter, setModalLetter] = useState<AlphabetLetter | null>(null);

  // Auto-Play Sequencer State (A to Z)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState<number>(-1);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, []);

  // Filtered Letters
  const filteredLetters = useMemo(() => {
    return ALPHABET_LETTERS.filter((letter) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesChar = letter.char.toLowerCase() === q;
        const matchesName = letter.name.toLowerCase().includes(q);
        const matchesNato = letter.nato.toLowerCase().includes(q);
        const matchesWord = letter.exampleWord.toLowerCase().includes(q);
        const matchesIpa = letter.ipa.toLowerCase().includes(q);
        if (!matchesChar && !matchesName && !matchesNato && !matchesWord && !matchesIpa) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'vowels') return letter.isVowel;
      if (selectedFilter === 'consonants') return !letter.isVowel;
      if (selectedFilter === 'confusion') return letter.confusionPartners.length > 0;

      // Rhyme group match
      return letter.rhymeGroup === selectedFilter;
    });
  }, [searchQuery, selectedFilter]);

  // Handle single letter play
  const handlePlayLetter = (letter: AlphabetLetter, slowOverride?: boolean) => {
    // If auto-play is running, stop it
    if (isAutoPlaying) {
      stopAutoPlay();
    }

    setPlayingLetterChar(letter.char);
    playAlphabetLetter({
      letter,
      accent,
      slow: slowOverride ?? isSlowMode,
      onEnd: () => {
        setPlayingLetterChar(null);
      },
      onError: () => {
        setPlayingLetterChar(null);
      },
    });
  };

  // Auto-Play Sequencer: Play each letter one by one from A to Z
  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    setAutoPlayIndex(-1);
    setPlayingLetterChar(null);
    stopSpeech();
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
  };

  const startAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
      return;
    }

    setIsAutoPlaying(true);
    playSequenceStep(0);
  };

  const playSequenceStep = (index: number) => {
    const list = filteredLetters.length > 0 ? filteredLetters : ALPHABET_LETTERS;
    if (index >= list.length) {
      // Finished sequence
      stopAutoPlay();
      return;
    }

    const current = list[index];
    setAutoPlayIndex(index);
    setPlayingLetterChar(current.char);

    playAlphabetLetter({
      letter: current,
      accent,
      slow: isSlowMode,
      onEnd: () => {
        // Schedule next letter with pause
        const pauseMs = isSlowMode ? 1400 : 1000;
        autoPlayTimerRef.current = setTimeout(() => {
          playSequenceStep(index + 1);
        }, pauseMs);
      },
      onError: () => {
        stopAutoPlay();
      },
    });
  };

  return (
    <div className='space-y-6'>
      {/* Top Banner & Auto-Play Audio Controls Bar */}
      <div
        className='rounded-2xl border p-4 sm:p-5 shadow-xs'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          {/* Title & Guidance */}
          <div>
            <div className='flex items-center gap-2'>
              <span className='rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 p-2'>
                <FaVolumeHigh className='h-4 w-4' />
              </span>
              <div>
                <h2 className='text-base sm:text-lg font-bold leading-tight'>
                  A–Z Letter Soundboard
                </h2>
                <p className='text-xs text-muted-foreground'>
                  Sentuh sembarang huruf untuk mendengarkan pengucapan satu per satu, atau putar urutan otomatis.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Auto-Play & Speed Mode */}
          <div className='flex items-center flex-wrap gap-2.5'>
            {/* Speed Toggle (Normal 0.8x vs Slow 0.65x) */}
            <button
              onClick={() => setIsSlowMode(!isSlowMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                isSlowMode
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              style={{ borderColor: isSlowMode ? undefined : 'var(--border)' }}
              title='Ubah kecepatan pengucapan huruf'
            >
              <FaRotateRight className='h-3 w-3' />
              <span>{isSlowMode ? 'Slow Motion (0.65x)' : 'Kecepatan Normal (0.8x)'}</span>
            </button>

            {/* Play / Pause All Button */}
            <button
              onClick={startAutoPlay}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isAutoPlaying
                  ? 'bg-rose-500 text-white hover:bg-rose-600 animate-pulse'
                  : 'bg-teal-500 text-white hover:bg-teal-600'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <FaPause className='h-3 w-3' />
                  <span>Jeda Putar ({autoPlayIndex + 1}/{filteredLetters.length})</span>
                </>
              ) : (
                <>
                  <FaPlay className='h-3 w-3' />
                  <span>Putar Berurutan (A–Z)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          className='mt-4 pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3'
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Search Input */}
          <div className='relative flex-1 max-w-sm'>
            <FaMagnifyingGlass className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Cari huruf, fonetik, NATO (contoh: G, Bravo, /iː/)...'
              className='w-full rounded-xl border pl-9 pr-3.5 py-1.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground'
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className='flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 flex items-center gap-1 mr-1'>
              <FaFilter className='h-2.5 w-2.5' /> Filter:
            </span>

            {[
              { id: ALPHABET_FILTER_CATEGORY.ALL as FilterCategory, label: 'Semua (26)' },
              { id: ALPHABET_FILTER_CATEGORY.VOWELS as FilterCategory, label: 'Vokal (5)' },
              { id: ALPHABET_FILTER_CATEGORY.CONSONANTS as FilterCategory, label: 'Konsonan (21)' },
              { id: ALPHABET_FILTER_CATEGORY.CONFUSION as FilterCategory, label: 'Jebakan Dikte' },
            ].map((pill) => {
              const isActive = selectedFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedFilter(pill.id)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    isActive
                      ? 'bg-teal-500 text-white border-teal-600 shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  style={{ borderColor: isActive ? undefined : 'var(--border)' }}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rhyme Group Sub-Filter Pills */}
        <div className='mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none'>
          <span className='text-[10px] font-bold text-muted-foreground shrink-0'>
            Rumpun Rima:
          </span>
          {RHYME_GROUPS.map((rg) => {
            const isActive = selectedFilter === rg.id;
            return (
              <button
                key={rg.id}
                onClick={() => setSelectedFilter(isActive ? ALPHABET_FILTER_CATEGORY.ALL : rg.id)}
                className={`shrink-0 px-2 py-0.5 rounded-md text-[11px] font-mono border transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-600 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground'
                }`}
                style={{ borderColor: isActive ? undefined : 'var(--border)' }}
                title={rg.name}
              >
                {rg.ipa} ({rg.letters.join(', ')})
              </button>
            );
          })}
        </div>
      </div>

      {/* Letters Soundboard Grid */}
      {filteredLetters.length === 0 ? (
        <div className='rounded-2xl border p-12 text-center' style={{ borderColor: 'var(--border)' }}>
          <p className='text-sm text-muted-foreground'>
            Tidak ada huruf yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter(ALPHABET_FILTER_CATEGORY.ALL);
            }}
            className='mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline'
          >
            Reset Pencarian & Filter
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-3.5'>
          {filteredLetters.map((letter, idx) => {
            const isPlayingThis = playingLetterChar === letter.char;
            const isHighlightedInSequence = isAutoPlaying && autoPlayIndex === idx;

            return (
              <AlphabetCard
                key={letter.char}
                letter={letter}
                isPlaying={isPlayingThis}
                isHighlighted={isHighlightedInSequence}
                onPlay={handlePlayLetter}
                onSelectDetails={(l) => setModalLetter(l)}
              />
            );
          })}
        </div>
      )}

      {/* Rhyme Family Educational Legend */}
      <div
        className='rounded-2xl border p-4 sm:p-5 space-y-3'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        <div className='flex items-center gap-2'>
          <FaWandMagicSparkles className='h-4 w-4 text-amber-500' />
          <h3 className='text-sm font-bold'>
            Trik Cepat Mengenali Huruf: 7 Rumpun Bunyi Vokal (Sound-Alike Rhyme Families)
          </h3>
        </div>
        <p className='text-xs text-muted-foreground leading-relaxed'>
          Alih-alih menghafal 26 huruf secara acak, kelompokkan huruf berdasarkan bunyi vokal akhirnya.
          Jika Anda mendengar vokal /eɪ/ di akhir (seperti kata &ldquo;day&rdquo;), maka pasti hurufnya adalah salah satu dari: <strong>A, H, J, atau K</strong>!
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1'>
          {RHYME_GROUPS.map((rg) => (
            <div
              key={rg.id}
              onClick={() => setSelectedFilter(rg.id)}
              className='cursor-pointer rounded-xl border p-3 transition-all hover:border-teal-500/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              style={{
                borderColor: selectedFilter === rg.id ? 'rgb(20 184 166)' : 'var(--border)',
                background: selectedFilter === rg.id ? 'rgba(20, 184, 166, 0.08)' : 'var(--secondary)',
              }}
            >
              <div className='flex items-center justify-between'>
                <span className='font-mono font-bold text-xs text-teal-600 dark:text-teal-400'>
                  {rg.ipa}
                </span>
                <span className='text-[10px] text-muted-foreground font-semibold'>
                  {rg.letters.length} Huruf
                </span>
              </div>
              <div className='mt-1 flex items-center gap-1.5 flex-wrap'>
                {rg.letters.map((char) => (
                  <span
                    key={char}
                    className='inline-flex items-center justify-center h-6 w-6 rounded-md bg-card font-serif font-bold text-xs shadow-2xs'
                  >
                    {char}
                  </span>
                ))}
              </div>
              <p className='mt-2 text-[11px] text-muted-foreground leading-snug line-clamp-2'>
                {rg.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Letter Detail Modal */}
      <AlphabetDetailModal
        letter={modalLetter}
        accent={accent}
        onClose={() => setModalLetter(null)}
        onSelectLetter={(l) => setModalLetter(l)}
        onPlayLetter={handlePlayLetter}
        playingLetterChar={playingLetterChar}
      />
    </div>
  );
};

export default AlphabetExplorer;
