import React, { memo } from 'react';
import { AccentPreference, ACCENT_PREFERENCE } from '@/types/phonemic';
import { useAccentContext } from '@/context/accentContext';

export interface AccentToggleOption {
  value: AccentPreference;
  label: string;
  shortLabel: string;
  flag: string;
  title: string;
}

export const ACCENT_TOGGLE_OPTIONS: AccentToggleOption[] = [
  {
    value: ACCENT_PREFERENCE.US,
    label: 'American',
    shortLabel: 'US',
    flag: '🇺🇸',
    title: 'American English (General American - NPR / CNN)',
  },
  {
    value: ACCENT_PREFERENCE.UK,
    label: 'British RP',
    shortLabel: 'UK',
    flag: '🇬🇧',
    title: 'British English (Received Pronunciation - BBC News)',
  },
  {
    value: ACCENT_PREFERENCE.AU,
    label: 'Australian',
    shortLabel: 'AU',
    flag: '🇦🇺',
    title: 'Australian English (Australian ABC News)',
  },
  {
    value: ACCENT_PREFERENCE.ZA,
    label: 'South African',
    shortLabel: 'ZA',
    flag: '🇿🇦',
    title: 'South African English (SABC News)',
  },
  {
    value: ACCENT_PREFERENCE.IN,
    label: 'Indian',
    shortLabel: 'IN',
    flag: '🇮🇳',
    title: 'Indian English (All India Radio)',
  },
];

export interface AccentToggleProps {
  value?: AccentPreference;
  onChange?: (value: AccentPreference) => void;
  className?: string;
}

export const AccentToggle: React.FC<AccentToggleProps> = memo(
  ({ value, onChange, className = '' }) => {
    const { accent: contextAccent, setAccent: contextSetAccent } =
      useAccentContext();
    const activeValue = value ?? contextAccent;
    const handleChange = onChange ?? contextSetAccent;

    return (
      <div
        className={`inline-flex items-center gap-1 p-1 rounded-xl border shadow-xs select-none transition-colors ${className}`}
        style={{
          background: 'var(--secondary)',
          borderColor: 'var(--border)',
        }}
        role='radiogroup'
        aria-label='Pilih Aksen Bahasa Inggris'
      >
        {ACCENT_TOGGLE_OPTIONS.map((opt) => {
          const isSelected = activeValue === opt.value;
          return (
            <button
              key={opt.value}
              type='button'
              role='radio'
              aria-checked={isSelected}
              onClick={() => handleChange(opt.value)}
              className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1 px-1.5 sm:px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? 'font-bold border shadow-xs'
                  : 'font-medium opacity-65 hover:opacity-100'
              }`}
              style={
                isSelected
                  ? {
                      background: 'var(--card)',
                      color: 'var(--foreground)',
                      borderColor: 'var(--border)',
                      boxShadow:
                        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    }
                  : {
                      color: 'var(--muted-foreground)',
                    }
              }
              title={opt.title}
            >
              <span
                className='text-sm leading-none'
                role='img'
                aria-label={`${opt.shortLabel} flag`}
              >
                {opt.flag}
              </span>
              <span className='hidden xl:inline'>{opt.label}</span>
              <span className='xl:hidden'>{opt.shortLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

AccentToggle.displayName = 'AccentToggle';

export default AccentToggle;
