'use client';
import React from 'react';
import { FaRotate } from 'react-icons/fa6';
import DataSourceToggle from '@/components/atoms/DataSourceToggle';

interface HeaderBrandProps {
  flashcardsCount: number;
  onNavigateHome: () => void;
  onOpenSyncModal: () => void;
}

export const HeaderBrand: React.FC<HeaderBrandProps> = ({
  flashcardsCount,
  onNavigateHome,
  onOpenSyncModal,
}) => {
  return (
    <div className='flex items-center gap-2.5 sm:gap-4 shrink-0'>
      {/* Brand Logo / Title */}
      <div
        onClick={onNavigateHome}
        className='cursor-pointer flex items-center gap-2 shrink-0'
      >
        <h1 className='gradient-text-accent text-lg sm:text-2xl font-bold tracking-tight whitespace-nowrap shrink-0'>
          Flashcards
        </h1>
      </div>

      {/* Flashcards Total Counter Badge */}
      <span
        className='rounded-full px-2 py-0.5 text-xs font-semibold shrink-0'
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-foreground)',
        }}
        title='Total flashcards'
      >
        {flashcardsCount}
      </span>

      {/* Desktop Data Source Toggle & Sync Button (Visible on lg and up) */}
      <div className='hidden lg:flex items-center gap-1.5 shrink-0'>
        <DataSourceToggle compact={false} />
        <button
          onClick={onOpenSyncModal}
          className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }}
          title='Synchronize Local Repository and MongoDB Cloud datasets'
        >
          <FaRotate className='h-3 w-3 text-blue-500' />
          <span>Sync</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderBrand;
