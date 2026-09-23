'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaVolumeHigh,
  FaMagnifyingGlass,
  FaArrowLeft,
  FaArrowRight,
  FaWandMagicSparkles,
  FaCheck,
  FaGraduationCap,
} from 'react-icons/fa6';
import { MappingItem } from '@/types/mapping';
import { FLASHCARD_FIELD } from '@/types/flashcard';
import { useSpeechPlayback } from '@/hooks/useSpeechPlayback';
import { openGoogleSearchInNewTab } from '@/utils/externalLinks';
import MarkdownViewer from '../atoms/MarkdownViewer';

interface MappingDetailModalProps {
  isOpen: boolean;
  item: MappingItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const MappingDetailModal: React.FC<MappingDetailModalProps> = ({
  isOpen,
  item,
  onClose,
  onNext,
  onPrev,
  hasPrev = false,
  hasNext = false,
}) => {
  // Handle keyboard events (ESC, arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onNext, onPrev, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const { isPlaying, getAudioButtonProps } = useSpeechPlayback({
    resetTriggers: [item?.id, isOpen],
  });

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div
          className='fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden w-full'
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={onClose}
        >
          <motion.div
            className='relative flex h-[88dvh] max-h-[88dvh] sm:h-auto sm:max-h-[90vh] w-full max-w-full sm:max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl border-t sm:border shadow-2xl min-w-0'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator */}
            <div className='flex justify-center pt-2.5 pb-1 sm:hidden shrink-0'>
              <div className='h-1 w-10 rounded-full bg-muted-foreground/30' />
            </div>

            {/* Header */}
            <div
              className='flex items-center justify-between border-b px-4 py-2.5 sm:px-6 sm:py-3.5 gap-2.5 shrink-0'
              style={{ borderColor: 'var(--border)' }}
            >
              <div className='flex flex-col gap-1 min-w-0 flex-1 pr-1'>
                <div className='flex items-center gap-2'>
                  <span
                    className='rounded-md px-2 py-0.5 text-[10px] sm:text-xs font-bold tracking-wide uppercase shrink-0'
                    style={{
                      background: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    {item.module}
                  </span>
                </div>
                <h2 className='text-xs sm:text-sm md:text-base font-bold text-foreground line-clamp-2 leading-snug break-words'>
                  {item.title}
                </h2>
              </div>

              <div className='flex items-center gap-1.5 sm:gap-2 shrink-0'>
                {onPrev && (
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className='btn-compact h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-30 border'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--secondary-foreground)',
                      borderColor: 'var(--border)',
                    }}
                    title='Previous Item (Left Arrow)'
                  >
                    <FaArrowLeft className='h-3 w-3 sm:h-3.5 sm:w-3.5' />
                  </button>
                )}
                {onNext && (
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className='btn-compact h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-30 border'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--secondary-foreground)',
                      borderColor: 'var(--border)',
                    }}
                    title='Next Item (Right Arrow)'
                  >
                    <FaArrowRight className='h-3 w-3 sm:h-3.5 sm:w-3.5' />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className='btn-compact h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 border'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                  }}
                  title='Close (ESC)'
                >
                  <FaXmark className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div
              className='flex-1 min-h-0 max-w-full overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4'
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Source & Chapter Information */}
              {(item.source || item.chapter) && (
                <div
                  className='mb-3 sm:mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-xl border p-2.5 sm:p-3 text-xs'
                  style={{
                    background: 'var(--secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  <FaGraduationCap className='h-3.5 w-3.5 text-blue-500 shrink-0' />
                  <span className='font-bold uppercase tracking-wider text-[10px] sm:text-xs' style={{ color: 'var(--muted-foreground)' }}>
                    Source:
                  </span>
                  {item.source && (
                    <span className='font-bold text-foreground'>{item.source}</span>
                  )}
                  {item.chapter && (
                    <span className='rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] sm:text-xs font-medium text-blue-600 dark:text-blue-400'>
                      {item.chapter}
                    </span>
                  )}
                </div>
              )}

              {/* Question Card */}
              <div
                className='mb-3 sm:mb-4 rounded-xl border p-3.5 sm:p-5'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className='mb-1.5 flex items-center justify-between'>
                  <span
                    className='text-[10px] sm:text-xs font-semibold uppercase tracking-wider'
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Question / Soal
                  </span>
                  <div className='flex items-center gap-1'>
                    <button
                      className={`btn-compact rounded-md p-1.5 transition-colors ${
                        isPlaying(FLASHCARD_FIELD.QUESTION)
                          ? 'bg-primary/10 ring-1 ring-primary/30'
                          : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                      {...getAudioButtonProps(
                        FLASHCARD_FIELD.QUESTION,
                        item.question,
                        'question'
                      )}
                    >
                      <FaVolumeHigh
                        className={`h-3.5 w-3.5 ${
                          isPlaying(FLASHCARD_FIELD.QUESTION) ? 'animate-pulse' : ''
                        }`}
                        style={{ color: 'var(--primary)' }}
                      />
                    </button>
                    <button
                      onClick={() => openGoogleSearchInNewTab(item.question)}
                      className='btn-compact rounded-md p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
                      title='Search question on Google'
                    >
                      <FaMagnifyingGlass
                        className='h-3.5 w-3.5'
                        style={{ color: 'var(--primary)' }}
                      />
                    </button>
                  </div>
                </div>
                <p className='text-xs sm:text-sm md:text-base font-semibold text-foreground leading-relaxed'>
                  &quot;{item.question}&quot;
                </p>
              </div>

              {/* The Things That Should Be Fix (Correction) */}
              <div
                className='mb-4 sm:mb-5 rounded-xl border-l-4 p-3.5 sm:p-4 shadow-sm'
                style={{
                  borderColor: 'var(--fix-border)',
                  background: 'var(--fix-bg)',
                }}
              >
                <div className='mb-1.5 flex items-center justify-between'>
                  <div className='flex items-center gap-1.5'>
                    <FaCheck
                      className='h-3.5 w-3.5'
                      style={{ color: 'var(--fix-icon)' }}
                    />
                    <span
                      className='text-[10px] sm:text-xs font-bold uppercase tracking-wider'
                      style={{ color: 'var(--fix-label)' }}
                    >
                      The Things That Should Be Fixed
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <button
                      className={`btn-compact rounded-md p-1.5 transition-colors ${
                        isPlaying(FLASHCARD_FIELD.CORRECTION)
                          ? 'bg-primary/10 ring-1 ring-primary/30'
                          : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                      {...getAudioButtonProps(
                        FLASHCARD_FIELD.CORRECTION,
                        item.correction,
                        'correction'
                      )}
                    >
                      <FaVolumeHigh
                        className={`h-3.5 w-3.5 ${
                          isPlaying(FLASHCARD_FIELD.CORRECTION) ? 'animate-pulse' : ''
                        }`}
                        style={{ color: 'var(--primary)' }}
                      />
                    </button>
                    <button
                      onClick={() => openGoogleSearchInNewTab(item.correction, 'English grammar')}
                      className='btn-compact rounded-md p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
                      title='Search correction on Google'
                    >
                      <FaMagnifyingGlass
                        className='h-3.5 w-3.5'
                        style={{ color: 'var(--primary)' }}
                      />
                    </button>
                  </div>
                </div>
                <div
                  className='text-xs sm:text-sm md:text-base leading-relaxed'
                  style={{ color: 'var(--fix-text)' }}
                >
                  {item.correction.includes('1. ') && item.correction.includes('2. ') ? (
                    <div className='space-y-2 mt-1'>
                      {item.correction
                        .split(/(?=\b\d+\.\s)/)
                        .filter((p) => p.trim().length > 0)
                        .map((point, idx) => {
                          const numberMatch = point.match(/^(\d+\.)\s*/);
                          const num = numberMatch ? numberMatch[1] : `${idx + 1}.`;
                          const text = numberMatch ? point.replace(/^(\d+\.)\s*/, '') : point;
                          return (
                            <div key={idx} className='flex items-start gap-2'>
                              <span className='font-bold text-xs sm:text-sm shrink-0 mt-0.5 rounded-full px-1.5 py-0.2 bg-emerald-600/15 text-emerald-800 dark:text-emerald-300'>
                                {num}
                              </span>
                              <span className='flex-1 leading-relaxed font-medium'>
                                {text}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className='font-mono font-bold text-xs sm:text-sm md:text-base'>
                      {item.correction}
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks / Markdown Section */}
              <div className='mb-2 flex items-center gap-1.5'>
                <FaWandMagicSparkles
                  className='h-3.5 w-3.5'
                  style={{ color: 'var(--primary)' }}
                />
                <h3 className='text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground'>
                  Remarks & Explanation
                </h3>
              </div>

              <div
                className='rounded-xl border p-3 sm:p-5 max-w-full overflow-hidden min-w-0'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <MarkdownViewer content={item.remarks} showCopyButton={true} />
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className='mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5'>
                  <span
                    className='text-[11px] sm:text-xs'
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Tags:
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-md border px-2 py-0.5 text-[10px] sm:text-xs'
                      style={{
                        background: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MappingDetailModal;
