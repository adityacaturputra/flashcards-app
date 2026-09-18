'use client';
import React, { useState, useMemo } from 'react';
import {
  FaMagnifyingGlass,
  FaFilter,
} from 'react-icons/fa6';
import { ALL_PHONEMES } from '@/data/phonemics';
import { PhonemeItem, AccentPreference } from '@/types/phonemic';
import PhonemeCard from '@/components/atoms/PhonemeCard';
import PhonemeDetailModal from '@/components/molecules/PhonemeDetailModal';

interface UnderhillPhonemicBoardProps {
  accent: AccentPreference;
}

type FilterOption = 'all' | 'monophthongs' | 'diphthongs' | 'consonants' | 'voiced' | 'unvoiced';

export const UnderhillPhonemicBoard: React.FC<UnderhillPhonemicBoardProps> = ({ accent }) => {
  const [selectedPhoneme, setSelectedPhoneme] = useState<PhonemeItem | null>(null);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Segregate by official Underhill layout quadrants
  const monophthongs = useMemo(
    () => ALL_PHONEMES.filter((p) => p.category === 'monophthong'),
    []
  );
  const diphthongs = useMemo(
    () => ALL_PHONEMES.filter((p) => p.category === 'diphthong'),
    []
  );
  const consonants = useMemo(
    () => ALL_PHONEMES.filter((p) => p.category === 'consonant'),
    []
  );

  // Filtered phonemes based on user selection or search
  const filteredPhonemes = useMemo(() => {
    let list = ALL_PHONEMES;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.ipa.toLowerCase().includes(q) ||
          p.exampleWord.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.exampleIpa.toLowerCase().includes(q)
      );
    }

    if (filter === 'monophthongs') {
      return list.filter((p) => p.category === 'monophthong');
    }
    if (filter === 'diphthongs') {
      return list.filter((p) => p.category === 'diphthong');
    }
    if (filter === 'consonants') {
      return list.filter((p) => p.category === 'consonant');
    }
    if (filter === 'voiced') {
      return list.filter((p) => p.voicing === 'voiced' || p.voicing === 'voiced-vowel');
    }
    if (filter === 'unvoiced') {
      return list.filter((p) => p.voicing === 'unvoiced');
    }

    return list;
  }, [filter, searchQuery]);

  return (
    <div className='space-y-6'>
      {/* Controls: Search & Filter Pills */}
      <div
        className='rounded-2xl border p-3.5 sm:p-5 space-y-3.5'
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className='flex flex-col sm:flex-row items-center gap-3 justify-between'>
          {/* Search Box */}
          <div className='relative w-full sm:w-72'>
            <FaMagnifyingGlass className='absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Cari simbol IPA atau kata (misal: /iː/, sheep)...'
              className='w-full rounded-xl border pl-9 pr-3.5 py-2 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          {/* Quick Legend Guide */}
          <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground w-full sm:w-auto justify-end'>
            <div className='flex items-center gap-1.5'>
              <span className='h-2 w-2 rounded-full bg-emerald-500' />
              <span>Voiced (Bergetar)</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='h-2 w-2 rounded-full bg-slate-400 border border-slate-600' />
              <span>Unvoiced (Nafas)</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='h-2 w-2 rounded-full bg-amber-400' />
              <span>Vokal Murni</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className='flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/60'>
          <div className='flex items-center gap-1 text-xs text-muted-foreground mr-1.5 font-medium'>
            <FaFilter className='h-3 w-3' />
            <span>Kategori:</span>
          </div>

          {(
            [
              { id: 'all', label: 'Semua (44)' },
              { id: 'monophthongs', label: 'Monophthongs (12)' },
              { id: 'diphthongs', label: 'Diphthongs (8)' },
              { id: 'consonants', label: 'Consonants (24)' },
              { id: 'voiced', label: 'Voiced Saja' },
              { id: 'unvoiced', label: 'Unvoiced Saja' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === item.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* When filtering or searching: Flat Grid View */}
      {filter !== 'all' || searchQuery.trim() !== '' ? (
        <div className='space-y-3'>
          <div className='flex items-center justify-between text-xs text-muted-foreground px-1'>
            <span>Ditemukan {filteredPhonemes.length} fonem</span>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3'>
            {filteredPhonemes.map((phoneme) => (
              <PhonemeCard
                key={phoneme.id}
                phoneme={phoneme}
                accent={accent}
                onClick={() => setSelectedPhoneme(phoneme)}
                isSelected={selectedPhoneme?.id === phoneme.id}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Standard Adrian Underhill Soundboard Layout */
        <div className='space-y-6'>
          {/* Quadrant 1: Vowels Section (Monophthongs & Diphthongs) */}
          <div
            className='rounded-2xl border p-4 sm:p-5 space-y-4'
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className='flex items-center justify-between border-b pb-3 border-border/70'>
              <div className='flex items-center gap-2'>
                <span className='h-3 w-3 rounded-md bg-amber-500/20 border border-amber-500/40' />
                <h3 className='text-sm sm:text-base font-bold text-foreground'>
                  Bagian I: 20 Vokal (Vowels & Diphthongs)
                </h3>
              </div>
              <span className='text-xs font-mono text-muted-foreground'>
                12 Pure + 8 Glides
              </span>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
              {/* 12 Monophthongs Grid (Top Left Quadrant) */}
              <div className='lg:col-span-7 space-y-2'>
                <div className='flex items-center justify-between text-xs font-semibold text-muted-foreground px-1'>
                  <span>12 Vokal Murni (Monophthongs)</span>
                  <span className='text-[11px] text-amber-600 dark:text-amber-400'>
                    Posisi Lidah: Depan ➔ Belakang
                  </span>
                </div>
                <div className='grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5'>
                  {monophthongs.map((p) => (
                    <PhonemeCard
                      key={p.id}
                      phoneme={p}
                      accent={accent}
                      onClick={() => setSelectedPhoneme(p)}
                      isSelected={selectedPhoneme?.id === p.id}
                    />
                  ))}
                </div>
              </div>

              {/* 8 Diphthongs Grid (Top Right Quadrant) */}
              <div className='lg:col-span-5 space-y-2'>
                <div className='flex items-center justify-between text-xs font-semibold text-muted-foreground px-1'>
                  <span>8 Vokal Luncuran (Diphthongs)</span>
                  <span className='text-[11px] text-orange-600 dark:text-orange-400'>
                    Luncuran 2 Suara
                  </span>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5'>
                  {diphthongs.map((p) => (
                    <PhonemeCard
                      key={p.id}
                      phoneme={p}
                      accent={accent}
                      onClick={() => setSelectedPhoneme(p)}
                      isSelected={selectedPhoneme?.id === p.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quadrant 2: Consonants Section (24 Sounds) */}
          <div
            className='rounded-2xl border p-4 sm:p-5 space-y-4'
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className='flex items-center justify-between border-b pb-3 border-border/70'>
              <div className='flex items-center gap-2'>
                <span className='h-3 w-3 rounded-md bg-emerald-500/20 border border-emerald-500/40' />
                <h3 className='text-sm sm:text-base font-bold text-foreground'>
                  Bagian II: 24 Konsonan (Consonants)
                </h3>
              </div>
              <span className='text-xs font-mono text-muted-foreground'>
                Voiced & Unvoiced Minimal Pairs
              </span>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5'>
              {consonants.map((p) => (
                <PhonemeCard
                  key={p.id}
                  phoneme={p}
                  accent={accent}
                  onClick={() => setSelectedPhoneme(p)}
                  isSelected={selectedPhoneme?.id === p.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deep-Dive Detail Modal */}
      <PhonemeDetailModal
        phoneme={selectedPhoneme}
        accent={accent}
        onClose={() => setSelectedPhoneme(null)}
      />
    </div>
  );
};

export default UnderhillPhonemicBoard;
