'use client';
import React, { useState } from 'react';
import { FaPhone, FaVolumeHigh, FaRegLightbulb } from 'react-icons/fa6';
import { PHONE_NUMBER_RULES } from '@/data/numeric';
import { AccentPreference } from '@/types/phonemic';
import { playNumericDictation } from '@/utils/numericAudio';

interface PhoneNumberRulesCardProps {
  accent: AccentPreference;
}

export const PhoneNumberRulesCard: React.FC<PhoneNumberRulesCardProps> = ({ accent }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayExample = (id: string, text: string) => {
    setPlayingId(id);
    playNumericDictation({
      script: text,
      accent,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  return (
    <div
      className='rounded-2xl border p-4 sm:p-5 space-y-4'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      <div className='flex items-center gap-2'>
        <FaPhone className='h-4 w-4 text-teal-500' />
        <h3 className='text-sm font-bold'>
          Aturan Penulisan & Pengejaan Nomor Telepon (Telephone Conventions)
        </h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-3.5'>
        {PHONE_NUMBER_RULES.map((rule) => {
          const isPlaying = playingId === rule.id;
          return (
            <div
              key={rule.id}
              className='rounded-xl border p-3.5 space-y-2.5 flex flex-col justify-between transition-all'
              style={{
                borderColor: 'var(--border)',
                background: 'var(--secondary)',
              }}
            >
              <div>
                <div className='flex items-center justify-between gap-1'>
                  <span className='text-xs font-bold text-foreground'>{rule.title}</span>
                  <span className='px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400'>
                    {rule.ruleBadge}
                  </span>
                </div>
                <p className='text-xs text-muted-foreground mt-1.5 leading-relaxed'>
                  {rule.description}
                </p>
              </div>

              <div className='space-y-2 pt-2 border-t border-border/50'>
                {/* Spoken Audio Example Bar */}
                <div className='flex items-center justify-between rounded-lg bg-background p-2 border border-border/70 text-xs'>
                  <div className='font-mono font-bold text-teal-600 dark:text-teal-400 truncate pr-2'>
                    {rule.writtenTarget}
                  </div>
                  <button
                    onClick={() => handlePlayExample(rule.id, rule.spokenExample)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 ${
                      isPlaying
                        ? 'bg-teal-500 text-white animate-pulse'
                        : 'bg-teal-500/10 hover:bg-teal-500 hover:text-white text-teal-700 dark:text-teal-300'
                    }`}
                    title='Dengarkan contoh pengucapan asli'
                  >
                    <FaVolumeHigh className='h-2.5 w-2.5' />
                    <span>{isPlaying ? 'Putar...' : 'Dengar'}</span>
                  </button>
                </div>

                <div className='text-[11px] text-muted-foreground leading-normal flex items-start gap-1.5'>
                  <FaRegLightbulb className='h-3 w-3 text-amber-500 shrink-0 mt-0.5' />
                  <span>{rule.note}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhoneNumberRulesCard;
