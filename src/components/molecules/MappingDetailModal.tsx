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
import { openTTSInNewTab, openGoogleSearchInNewTab } from '@/utils/externalLinks';
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

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4'
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(6px)',
        }}
        onClick={onClose}
      >
        <motion.div
          className='relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className='flex items-center justify-between border-b px-3.5 py-3 sm:px-5 sm:py-4 gap-2'
            style={{ borderColor: 'var(--border)' }}
          >
            <div className='flex items-center gap-1.5 sm:gap-2.5 overflow-hidden min-w-0 flex-1 pr-1'>
              <span
                className='rounded-md px-2 py-0.5 text-[10px] sm:text-xs font-bold tracking-wide uppercase shrink-0'
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                {item.module}
              </span>
              <h2 className='truncate text-xs font-bold sm:text-base'>
                {item.title}
              </h2>
            </div>

            <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
              {onPrev && (
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className='rounded-lg p-1.5 sm:p-2 transition-all hover:scale-105 disabled:opacity-30'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
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
                  className='rounded-lg p-1.5 sm:p-2 transition-all hover:scale-105 disabled:opacity-30'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                  title='Next Item (Right Arrow)'
                >
                  <FaArrowRight className='h-3 w-3 sm:h-3.5 sm:w-3.5' />
                </button>
              )}
              <button
                onClick={onClose}
                className='rounded-lg p-1.5 sm:p-2 transition-all hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-700'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                }}
                title='Close (ESC)'
              >
                <FaXmark className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div
            className='overflow-y-auto p-3 sm:p-6'
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
                    onClick={() => openTTSInNewTab(item.question)}
                    className='rounded-md p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
                    title='Listen to question'
                  >
                    <FaVolumeHigh
                      className='h-3.5 w-3.5'
                      style={{ color: 'var(--primary)' }}
                    />
                  </button>
                  <button
                    onClick={() => openGoogleSearchInNewTab(item.question)}
                    className='rounded-md p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
                    title='Search question on Google'
                  >
                    <FaMagnifyingGlass
                      className='h-3.5 w-3.5'
                      style={{ color: 'var(--primary)' }}
                    />
                  </button>
                </div>
              </div>
              <p className='text-sm sm:text-base font-semibold text-foreground leading-relaxed'>
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
              <div className='flex items-center gap-1.5 mb-1.5'>
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
              <div
                className='font-mono text-xs sm:text-sm md:text-base font-bold leading-relaxed'
                style={{ color: 'var(--fix-text)' }}
              >
                {item.correction}
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
              className='rounded-xl border p-3 sm:p-5'
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
    </AnimatePresence>
  );
};

export default MappingDetailModal;
