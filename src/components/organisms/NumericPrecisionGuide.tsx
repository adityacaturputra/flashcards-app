'use client';
import React from 'react';
import { FaHashtag, FaEarListen } from 'react-icons/fa6';
import { TEEN_TY_PAIRS } from '@/data/numeric';
import { AccentPreference } from '@/types/phonemic';
import TeenTyCard from '@/components/atoms/TeenTyCard';
import TeenTyStressMatrix from '@/components/molecules/TeenTyStressMatrix';
import PhoneNumberRulesCard from '@/components/molecules/PhoneNumberRulesCard';
import NumericDictationPractice from '@/components/molecules/NumericDictationPractice';

interface NumericPrecisionGuideProps {
  accent: AccentPreference;
}

export const NumericPrecisionGuide: React.FC<NumericPrecisionGuideProps> = ({ accent }) => {
  return (
    <div className='space-y-6'>
      {/* Intro Hero Header */}
      <div
        className='rounded-2xl border p-4 sm:p-5 shadow-xs'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        <div className='flex items-center gap-2.5'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400'>
            <FaHashtag className='h-4 w-4' />
          </div>
          <div>
            <h2 className='text-base font-bold'>
              Pilar 2: Dekoding Angka, Telepon, & Kode Pos (Numeric Precision)
            </h2>
            <p className='text-xs text-muted-foreground'>
              Teknik membedakan intonasi -teen vs -ty, membaca angka 0 (&ldquo;oh&rdquo;), gugus double/triple, dan jeda blok telepon.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Dictation Practice (Primary Action Top) */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2 px-1 text-xs font-bold text-muted-foreground'>
          <FaEarListen className='h-3 w-3 text-teal-500' />
          <span>LATIHAN DIKTE NOMOR & KODE POS UJIAN (AUDIO DRILL)</span>
        </div>
        <NumericDictationPractice accent={accent} />
      </div>

      {/* Teen vs Ty Pair Cards Grid */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between px-1'>
          <span className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
            7 Pasangan Angka Belasan vs Puluhan (-teen vs -ty)
          </span>
          <span className='text-[11px] text-muted-foreground'>
            Klik kartu untuk mendengarkan letupan intonasi
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5'>
          {TEEN_TY_PAIRS.map((pair) => (
            <TeenTyCard key={pair.id} pair={pair} accent={accent} />
          ))}
        </div>
      </div>

      {/* Educational Matrix: Stress Placement Rules */}
      <TeenTyStressMatrix />

      {/* Telephone Rules & Conventions (Reference Bottom) */}
      <PhoneNumberRulesCard accent={accent} />
    </div>
  );
};

export default NumericPrecisionGuide;
