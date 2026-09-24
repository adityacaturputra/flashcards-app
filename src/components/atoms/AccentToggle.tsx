import React, { memo } from 'react';
import { AccentPreference, ACCENT_PREFERENCE } from '@/types/phonemic';
import { useAccentContext } from '@/context/accentContext';

export interface AccentToggleProps {
  value?: AccentPreference;
  onChange?: (value: AccentPreference) => void;
  className?: string;
  compact?: boolean;
}

export const AccentToggle: React.FC<AccentToggleProps> = memo(
  ({ value, onChange, className = '', compact = false }) => {
    const { accent: contextAccent, setAccent: contextSetAccent } = useAccentContext();
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
        {/* British RP Option */}
        <button
          type='button'
          role='radio'
          aria-checked={activeValue === ACCENT_PREFERENCE.UK}
          onClick={() => handleChange(ACCENT_PREFERENCE.UK)}
          className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs transition-all ${
            activeValue === ACCENT_PREFERENCE.UK
              ? 'font-bold border shadow-xs'
              : 'font-medium opacity-65 hover:opacity-100'
          }`}
          style={
            activeValue === ACCENT_PREFERENCE.UK
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
          {!compact && <span className='hidden xs:inline'>British RP</span>}
          <span className={compact ? 'inline' : 'xs:hidden'}>UK</span>
        </button>

        {/* American English Option */}
        <button
          type='button'
          role='radio'
          aria-checked={activeValue === ACCENT_PREFERENCE.US}
          onClick={() => handleChange(ACCENT_PREFERENCE.US)}
          className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs transition-all ${
            activeValue === ACCENT_PREFERENCE.US
              ? 'font-bold border shadow-xs'
              : 'font-medium opacity-65 hover:opacity-100'
          }`}
          style={
            activeValue === ACCENT_PREFERENCE.US
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
          {!compact && <span className='hidden xs:inline'>American</span>}
          <span className={compact ? 'inline' : 'xs:hidden'}>US</span>
        </button>
      </div>
    );
  },
);

AccentToggle.displayName = 'AccentToggle';

export default AccentToggle;
