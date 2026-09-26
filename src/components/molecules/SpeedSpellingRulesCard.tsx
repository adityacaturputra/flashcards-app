'use client';
import React, { memo } from 'react';
import { FaLightbulb } from 'react-icons/fa6';
import { SpellingConventionItem } from '@/types/alphabet';
import { SPELLING_CONVENTIONS } from '@/data/alphabet';

interface SpeedSpellingRulesCardProps {
  conventions?: SpellingConventionItem[];
  className?: string;
}

export const SpeedSpellingRulesCard: React.FC<SpeedSpellingRulesCardProps> = memo(
  ({ conventions = SPELLING_CONVENTIONS, className = '' }) => {
    return (
      <div
        className={`rounded-2xl border p-4 sm:p-5 space-y-3 shadow-xs ${className}`}
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        <div className='flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400'>
          <FaLightbulb className='h-4 w-4 shrink-0' />
          <span>Kaidah Pengucapan Ejaan Cepat (IELTS Listening Speed Spelling)</span>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs'>
          {conventions.map((item) => (
            <div
              key={item.title}
              className='rounded-xl border p-3 space-y-1.5'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='font-bold text-foreground text-xs sm:text-sm'>
                {item.title}
              </div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                {item.rule}
              </p>
              <div className='text-xs font-mono text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md mt-1 inline-block'>
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SpeedSpellingRulesCard.displayName = 'SpeedSpellingRulesCard';

export default SpeedSpellingRulesCard;
