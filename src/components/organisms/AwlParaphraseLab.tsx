'use client';
import React, { useState } from 'react';
import {
  FaVolumeHigh,
  FaArrowRight,
  FaLightbulb,
  FaPenNib,
} from 'react-icons/fa6';
import { AWL_PARAPHRASES } from '@/data/awl';
import { AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface AwlParaphraseLabProps {
  accent: AccentPreference;
}

export const AwlParaphraseLab: React.FC<AwlParaphraseLabProps> = ({ accent }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string, text: string) => {
    setPlayingId(id);
    playSpeech({
      text,
      accent,
      rate: 0.88,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  return (
    <div className='space-y-6'>
      {/* Intro Hero Card */}
      <div
        className='rounded-3xl border p-5 sm:p-7 space-y-2.5 shadow-xs'
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className='flex items-center gap-2 text-primary font-bold'>
          <FaPenNib className='h-4 w-4' />
          <h3 className='text-base sm:text-lg'>
            Academic Paraphrase Lab: Mengubah Bahasa Sehari-hari ke Band 8+
          </h3>
        </div>
        <p className='text-xs sm:text-sm text-foreground/80 leading-relaxed'>
          Kriteria penilaian <strong>Lexical Resource (25%)</strong> di IELTS Writing Task 2 menuntut Anda menghindari kata-kata santai (*colloquialisms*) dan menggantinya dengan kata-kata <strong>Academic Word List (AWL)</strong> serta teknik nominalisasi (*nominalisation*).
        </p>
      </div>

      {/* List of Paraphrase Transformations */}
      <div className='space-y-6'>
        {AWL_PARAPHRASES.map((para) => (
          <div
            key={para.id}
            className='rounded-3xl border p-5 sm:p-7 space-y-5 shadow-xs'
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            {/* Topic Header */}
            <div className='flex items-center justify-between border-b pb-3 border-border/70'>
              <span className='rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold'>
                {para.topic}
              </span>
            </div>

            {/* Side-by-Side Comparison Box */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Band 5 */}
              <div
                className='p-4 sm:p-5 rounded-2xl border flex flex-col justify-between space-y-3'
                style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
              >
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-bold uppercase text-red-600 dark:text-red-400'>
                      ❌ Bahasa Santai / Klise (Band 5.0–6.0)
                    </span>
                  </div>
                  <p className='text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed'>
                    &quot;{para.band5Text}&quot;
                  </p>
                </div>

                <button
                  onClick={() => handlePlay(`${para.id}-b5`, para.band5Text)}
                  className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    playingId === `${para.id}-b5`
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground hover:bg-primary/10 border-border'
                  }`}
                >
                  <FaVolumeHigh className='h-3 w-3' />
                  <span>Dengar Versi Band 5</span>
                </button>
              </div>

              {/* Band 8 */}
              <div
                className='p-4 sm:p-5 rounded-2xl border flex flex-col justify-between space-y-3 border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10'
              >
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400'>
                      ✅ Academic AWL Upgraded (Band 8.0–8.5)
                    </span>
                  </div>
                  <p className='text-xs sm:text-sm font-semibold text-foreground leading-relaxed'>
                    &quot;{para.band8Text}&quot;
                  </p>
                </div>

                <button
                  onClick={() => handlePlay(`${para.id}-b8`, para.band8Text)}
                  className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    playingId === `${para.id}-b8`
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-card text-foreground hover:bg-emerald-500/15 border-border'
                  }`}
                >
                  <FaVolumeHigh className='h-3 w-3' />
                  <span>Dengar Versi Band 8</span>
                </button>
              </div>
            </div>

            {/* Key Replacements Breakdown Table */}
            <div className='space-y-2.5 pt-1'>
              <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                <FaLightbulb className='h-3.5 w-3.5 text-amber-500' />
                <span>Bedah Kosakata yang Ditransformasikan:</span>
              </h4>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                {para.keyReplacements.map((rep, idx) => (
                  <div
                    key={idx}
                    className='p-3 rounded-xl border space-y-1 text-xs'
                    style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='font-mono line-through text-red-500'>
                        {rep.everydayWord}
                      </span>
                      <FaArrowRight className='h-2.5 w-2.5 text-muted-foreground' />
                      <span className='font-bold text-emerald-600 dark:text-emerald-400 font-mono'>
                        {rep.awlWord}
                      </span>
                    </div>
                    <p className='text-muted-foreground text-[11px] leading-relaxed'>
                      {rep.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwlParaphraseLab;
