'use client';
import React from 'react';
import Link from 'next/link';
import { FaHeadphones, FaArrowRight } from 'react-icons/fa6';
import { APP_ROUTES } from '@/constants/routes';

export const RebuttalTrainerBanner: React.FC = () => {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-teal-500/30 bg-teal-500/5 shadow-xs'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shrink-0 shadow-xs'>
          <FaHeadphones className='h-5 w-5' />
        </div>
        <div>
          <h4 className='text-sm font-bold text-foreground'>
            Latihan Interaktif: Cambridge Distractor Trainer
          </h4>
          <p className='text-xs text-muted-foreground'>
            Latih telinga Anda mendeteksi 4 pola sanggahan dengan 8 cuplikan audio asli Cambridge (C7, C13, C14, C15, C16).
          </p>
        </div>
      </div>
      <Link
        href={APP_ROUTES.REBUTTAL}
        className='px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5'
      >
        <span>Buka Audio Trainer</span>
        <FaArrowRight className='h-3 w-3' />
      </Link>
    </div>
  );
};

export default RebuttalTrainerBanner;
