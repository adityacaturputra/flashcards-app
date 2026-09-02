'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
  FaShuffle,
  FaVolumeHigh,
  FaMagnifyingGlass,
  FaCheck,
  FaWandMagicSparkles,
  FaGraduationCap,
} from 'react-icons/fa6';
import { MappingItem } from '@/types/mapping';
import { useMappingDeck } from '@/hooks/useMappingDeck';
import { openTTSInNewTab, openGoogleSearchInNewTab } from '@/utils/externalLinks';
import MarkdownViewer from '../atoms/MarkdownViewer';

interface MappingFlashcardsProps {
  items: MappingItem[];
  onBackToTable?: () => void;
}

export const MappingFlashcards: React.FC<MappingFlashcardsProps> = ({
  items,
  onBackToTable,
}) => {
  const {
    deck,
    currentIndex,
    currentItem,
    isRevealed,
    progressPercentage,
    handleNext,
    handlePrev,
    handleShuffle,
    handleToggleReveal,
  } = useMappingDeck(items);

  if (!currentItem) {
    return (
      <div className='py-16 text-center'>
        <p className='text-lg font-semibold'>No cards available for practice.</p>
        {onBackToTable && (
          <button
            onClick={onBackToTable}
            className='mt-4 rounded-xl px-4 py-2 text-sm font-semibold'
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Back to Table View
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-3xl space-y-4 sm:space-y-6'>
      {/* Top Bar: Progress & Controls */}
      <div className='flex items-center justify-between gap-2 sm:gap-4'>
        <div className='flex items-center gap-1.5 sm:gap-2'>
          <span
            className='rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold'
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Card {currentIndex + 1} of {deck.length}
          </span>
          <span
            className='text-xs font-semibold hidden sm:inline'
            style={{ color: 'var(--muted-foreground)' }}
          >
            Module: {currentItem.module}
          </span>
        </div>

        <div className='flex items-center gap-1.5 sm:gap-2'>
          <button
            onClick={handleShuffle}
            className='flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105'
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              borderColor: 'var(--border)',
            }}
            title='Shuffle Cards'
          >
            <FaShuffle className='h-3 w-3' />
            <span className='hidden sm:inline'>Shuffle</span>
          </button>

          {onBackToTable && (
            <button
              onClick={onBackToTable}
              className='rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105'
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
              }}
            >
              Table View
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className='h-1.5 w-full overflow-hidden rounded-full'
        style={{ background: 'var(--muted)' }}
      >
        <motion.div
          className='h-full rounded-full'
          style={{ background: 'var(--primary)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Flashcard */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentItem.id}
          className='rounded-2xl border p-4 sm:p-8 shadow-xl'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {/* Card Header */}
          <div className='mb-3 sm:mb-4 flex items-start justify-between gap-2 sm:gap-4'>
            <div>
              <span
                className='inline-block rounded-md px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--primary)',
                }}
              >
                {currentItem.module}
              </span>
              <h2 className='mt-1 text-base font-bold text-foreground sm:text-xl'>
                {currentItem.title}
              </h2>
              {(currentItem.source || currentItem.chapter) && (
                <div className='mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground'>
                  <FaGraduationCap className='h-3.5 w-3.5 text-blue-500 shrink-0' />
                  {currentItem.source && (
                    <span className='font-medium text-foreground/80'>{currentItem.source}</span>
                  )}
                  {currentItem.chapter && (
                    <span className='rounded bg-blue-500/10 px-1.5 py-0.2 text-[10px] sm:text-[11px] font-medium text-blue-600 dark:text-blue-400'>
                      {currentItem.chapter}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className='flex items-center gap-1 sm:gap-1.5 shrink-0'>
              <button
                onClick={() => openTTSInNewTab(currentItem.question)}
                className='rounded-lg p-1.5 sm:p-2 transition-all hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-700'
                title='Listen'
              >
                <FaVolumeHigh
                  className='h-3.5 w-3.5 sm:h-4 sm:w-4'
                  style={{ color: 'var(--primary)' }}
                />
              </button>
              <button
                onClick={() => openGoogleSearchInNewTab(currentItem.question, 'English grammar')}
                className='rounded-lg p-1.5 sm:p-2 transition-all hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-700'
                title='Google Search'
              >
                <FaMagnifyingGlass
                  className='h-3.5 w-3.5 sm:h-4 sm:w-4'
                  style={{ color: 'var(--primary)' }}
                />
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div
            className='mb-4 sm:mb-6 rounded-xl border p-3.5 sm:p-6'
            style={{
              background: 'var(--muted)',
              borderColor: 'var(--border)',
            }}
          >
            <span
              className='mb-1.5 block text-[10px] sm:text-xs font-bold uppercase tracking-wider'
              style={{ color: 'var(--muted-foreground)' }}
            >
              Identify the error / Question:
            </span>
            <p className='text-base sm:text-xl font-bold leading-relaxed text-foreground'>
              &quot;{currentItem.question}&quot;
            </p>
          </div>

          {/* Reveal Toggle Button */}
          <div className='mb-4 sm:mb-6 text-center'>
            <button
              onClick={handleToggleReveal}
              className='inline-flex items-center gap-2 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105'
              style={{
                background: isRevealed
                  ? 'var(--secondary)'
                  : 'var(--primary)',
                color: isRevealed
                  ? 'var(--secondary-foreground)'
                  : 'var(--primary-foreground)',
              }}
            >
              {isRevealed ? (
                <>
                  <FaEyeSlash className='h-4 w-4' />
                  <span>Hide Answer & Remarks</span>
                </>
              ) : (
                <>
                  <FaEye className='h-4 w-4' />
                  <span>Reveal Correction & Remarks (Space)</span>
                </>
              )}
            </button>
          </div>

          {/* Answer Section (Revealed) */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='space-y-4 overflow-hidden border-t pt-4 sm:pt-5'
                style={{ borderColor: 'var(--border)' }}
              >
                {/* Correction Box */}
                <div
                  className='rounded-xl border-l-4 p-3.5 sm:p-4 shadow-sm'
                  style={{
                    borderColor: 'var(--fix-border)',
                    background: 'var(--fix-bg)',
                  }}
                >
                  <div className='mb-1.5 flex items-center gap-1.5'>
                    <FaCheck
                      className='h-3.5 w-3.5'
                      style={{ color: 'var(--fix-icon)' }}
                    />
                    <span
                      className='text-[10px] sm:text-xs font-bold uppercase tracking-wider'
                      style={{ color: 'var(--fix-label)' }}
                    >
                      The Things That Should Be Fix
                    </span>
                  </div>
                  <div
                    className='font-mono text-sm sm:text-base font-bold'
                    style={{ color: 'var(--fix-text)' }}
                  >
                    {currentItem.correction}
                  </div>
                </div>

                {/* Markdown Remarks Section */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-1.5'>
                    <FaWandMagicSparkles
                      className='h-3.5 w-3.5'
                      style={{ color: 'var(--primary)' }}
                    />
                    <h3 className='text-xs font-bold uppercase tracking-wider text-foreground'>
                      Remarks & Detailed Rules
                    </h3>
                  </div>

                  <div
                    className='rounded-xl border p-3.5 sm:p-5'
                    style={{
                      background: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <MarkdownViewer
                      content={currentItem.remarks}
                      showCopyButton={true}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons & Shortcut Helper */}
      <div className='flex flex-col items-center gap-2.5 sm:gap-3'>
        <div className='flex w-full items-center justify-between gap-3 sm:gap-4'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:scale-102 disabled:opacity-40'
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              borderColor: 'var(--border)',
            }}
          >
            <FaArrowLeft className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === deck.length - 1}
            className='flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:scale-102 disabled:opacity-40'
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderColor: 'var(--primary)',
            }}
          >
            <span>Next</span>
            <FaArrowRight className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
          </button>
        </div>

        <p
          className='text-center text-[11px] sm:text-xs'
          style={{ color: 'var(--muted-foreground)' }}
        >
          Shortcuts: <kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]'>Space</kbd> flip,{' '}
          <kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]'>←</kbd> Prev,{' '}
          <kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]'>→</kbd> Next
        </p>
      </div>
    </div>
  );
};

export default MappingFlashcards;
