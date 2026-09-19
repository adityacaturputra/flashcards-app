import React, { memo } from 'react';
import { AccentPreference, ACCENT_PREFERENCE } from '@/types/phonemic';

interface AccentToggleProps {
  value: AccentPreference;
  onChange: (value: AccentPreference) => void;
  className?: string;
}

export const AccentToggle: React.FC<AccentToggleProps> = memo(
  ({ value, onChange, className = '' }) => {
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
        {/* British RP Option */}
        <button
          type='button'
          role='radio'
          aria-checked={value === ACCENT_PREFERENCE.UK}
          onClick={() => onChange(ACCENT_PREFERENCE.UK)}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
            value === ACCENT_PREFERENCE.UK
              ? 'font-bold border shadow-xs'
              : 'font-medium opacity-65 hover:opacity-100'
          }`}
          style={
            value === ACCENT_PREFERENCE.UK
              ? {
                  background: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                }
              : {
                  color: 'var(--muted-foreground)',
                }
          }
          title='Gunakan Aksen British RP (Standar Cambridge / BBC)'
        >
          <span className='text-sm leading-none' role='img' aria-label='UK flag'>
            🇬🇧
          </span>
          <span className='hidden xs:inline'>British RP</span>
          <span className='xs:hidden'>UK</span>
        </button>

        {/* American English Option */}
        <button
          type='button'
          role='radio'
          aria-checked={value === ACCENT_PREFERENCE.US}
          onClick={() => onChange(ACCENT_PREFERENCE.US)}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
            value === ACCENT_PREFERENCE.US
              ? 'font-bold border shadow-xs'
              : 'font-medium opacity-65 hover:opacity-100'
          }`}
          style={
            value === ACCENT_PREFERENCE.US
              ? {
                  background: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                }
              : {
                  color: 'var(--muted-foreground)',
                }
          }
          title='Gunakan Aksen American English (General American)'
        >
          <span className='text-sm leading-none' role='img' aria-label='US flag'>
            🇺🇸
          </span>
          <span className='hidden xs:inline'>American</span>
          <span className='xs:hidden'>US</span>
        </button>
      </div>
    );
  },
);

AccentToggle.displayName = 'AccentToggle';

export default AccentToggle;
