'use client';
import React from 'react';
import { FaScaleUnbalanced, FaCircleCheck } from 'react-icons/fa6';

export const TeenTyStressMatrix: React.FC = () => {
  return (
    <div
      className='rounded-2xl border p-4 sm:p-5 space-y-3.5'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      <div className='flex items-center gap-2'>
        <FaScaleUnbalanced className='h-4 w-4 text-teal-500' />
        <h3 className='text-sm font-bold'>
          Jebakan Belasan vs Puluhan (-teen vs -ty Stress Placement)
        </h3>
      </div>

      <p className='text-xs text-muted-foreground leading-relaxed'>
        Penguji IELTS gemar mengeksploitasi perbedaan tekanan suku kata (stress placement). Di tengah kebisingan audio rekaman ujian, bunyi &ldquo;n&rdquo; di akhir kata sering kali tidak terdengar jelas. Gunakan <strong>posisi tekanan intonasi</strong> sebagai penentu mutlak:
      </p>

      {/* Comparison Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-1'>
        {/* Teen Side */}
        <div className='rounded-xl border border-teal-500/30 bg-teal-500/5 p-3.5 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider'>
              Angka Belasan (-teen)
            </span>
            <span className='px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300'>
              Suku Kata ke-2
            </span>
          </div>
          <p className='text-xs text-foreground/90 leading-relaxed'>
            Tekanan jatuh pada suku kata kedua. Nada naik tajam, vokal diucapkan <strong>panjang</strong> (/iːn/), dan ritme terasa ditarik ke belakang.
          </p>
          <div className='flex flex-wrap gap-2 pt-1 font-mono text-xs'>
            <span className='px-2 py-1 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'>
              13: /θɜːˈtiːn/
            </span>
            <span className='px-2 py-1 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'>
              15: /fɪfˈtiːn/
            </span>
          </div>
        </div>

        {/* Ty Side */}
        <div className='rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider'>
              Angka Puluhan (-ty)
            </span>
            <span className='px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300'>
              Suku Kata ke-1
            </span>
          </div>
          <p className='text-xs text-foreground/90 leading-relaxed'>
            Tekanan jatuh pada suku kata pertama. Suku kata kedua diucapkan <strong>pendek, tumpul</strong> (/i/), dan intonasi langsung meluncur turun.
          </p>
          <div className='flex flex-wrap gap-2 pt-1 font-mono text-xs'>
            <span className='px-2 py-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold'>
              30: /ˈθɜːti/
            </span>
            <span className='px-2 py-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold'>
              50: /ˈfɪfti/
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Rule */}
      <div className='flex items-center gap-2 pt-1 text-xs text-muted-foreground'>
        <FaCircleCheck className='h-3.5 w-3.5 text-teal-500 shrink-0' />
        <span>
          <strong>Tips Pengujian:</strong> Jika mendengar kata berhenti mendadak tanpa getaran panjang di akhir, itu adalah <strong>puluhan (-ty)</strong>.
        </span>
      </div>
    </div>
  );
};

export default TeenTyStressMatrix;
