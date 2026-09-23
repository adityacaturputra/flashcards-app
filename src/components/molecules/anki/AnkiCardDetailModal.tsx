'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaVolumeHigh,
  FaMagnifyingGlass,
  FaClock,
  FaCalendarDay,
  FaChartSimple,
} from 'react-icons/fa6';
import { ReviewedTodayItem } from '@/types/anki';
import { Progression } from '@/types/flashcard';
import { useSpeechPlayback } from '@/hooks/useSpeechPlayback';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import { openGoogleSearchInNewTab } from '@/utils/externalLinks';
import DynamicFieldRenderer from '../DynamicFieldRenderer';

interface AnkiCardDetailModalProps {
  card: ReviewedTodayItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnkiCardDetailModal: React.FC<AnkiCardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
}) => {
  const { generateSearchQuery } = useSearchTemplateContext();

  const { isPlaying, getAudioButtonProps, toggleSpeech } = useSpeechPlayback<string>({
    resetTriggers: [card?.id, isOpen],
  });

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!card) return null;

  const handleSearch = () => {
    if (!card.question) return;
    const query = generateSearchQuery(card.question);
    openGoogleSearchInNewTab(query);
  };

  const getNextReviewInfo = () => {
    if (!card.nextReviewDate) return 'Due now';
    const next = new Date(card.nextReviewDate);
    const now = new Date();
    const diffHours = Math.round((next.getTime() - now.getTime()) / (1000 * 60 * 60));

    if (diffHours <= 1) return 'Review in 1 hour';
    if (diffHours < 24) return `in ${diffHours} hours`;

    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return `Tomorrow (${next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
    return `in ${diffDays} days (${next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  };

  const dynamicFieldEntries = Object.entries(card.dynamicFields || {}).filter(
    ([, val]) => val && String(val).trim().length > 0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto'>
          {/* Backdrop Blur */}
          <motion.div
            className='fixed inset-0 bg-black/60 backdrop-blur-xs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-labelledby='card-detail-title'
            className='relative z-10 w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header with Badges & Action Buttons */}
            <div className='flex items-center justify-between border-b px-4 py-3 sm:px-5'>
              {/* Progression Rating Badge */}
              <div className='flex items-center gap-2'>
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize ${
                    card.progression === Progression.Good
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : card.progression === Progression.Hard
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : card.progression === Progression.Perfect
                          ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  Rating: {card.progression}
                </span>
              </div>

              {/* Action Buttons: Audio, Search & Close */}
              <div className='flex items-center gap-1.5'>
                {/* TTS Audio Button */}
                <button
                  {...getAudioButtonProps('question', card.question, 'Pronounce word')}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                    isPlaying('question')
                      ? 'bg-blue-500 text-white animate-pulse'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ borderColor: 'var(--border)' }}
                  title='Pronounce word / phrase'
                  aria-label='Pronounce word'
                >
                  <FaVolumeHigh className='h-3.5 w-3.5' />
                </button>

                {/* Google Search Button */}
                <button
                  onClick={handleSearch}
                  className='flex h-8 w-8 items-center justify-center rounded-lg border text-muted-foreground hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all'
                  style={{ borderColor: 'var(--border)' }}
                  title='Search on Google using active template'
                  aria-label='Search on Google'
                >
                  <FaMagnifyingGlass className='h-3.5 w-3.5' />
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className='flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                  aria-label='Close dialog'
                >
                  <FaXmark className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className='max-h-[75vh] overflow-y-auto p-4 sm:p-5 space-y-4'>
              {/* Question & Answer Section */}
              <div className='space-y-2'>
                <div>
                  <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1'>
                    Question / Term
                  </span>
                  <div className='text-lg sm:text-xl font-bold text-foreground leading-snug break-words'>
                    {card.question}
                  </div>
                </div>

                <div
                  className='rounded-xl border p-3.5 space-y-1'
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider block'>
                    Answer / Meaning
                  </span>
                  <div className='text-sm sm:text-base font-medium text-foreground leading-relaxed break-words whitespace-pre-wrap'>
                    {card.answer}
                  </div>
                </div>
              </div>

              {/* Spaced Repetition Schedule Metrics */}
              <div
                className='rounded-xl border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs'
                style={{
                  background: 'var(--muted)/30',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <span className='text-[10px] text-muted-foreground block font-medium'>
                    Next Review
                  </span>
                  <div className='flex items-center gap-1 font-bold text-foreground mt-0.5'>
                    <FaCalendarDay className='h-3 w-3 text-blue-500 shrink-0' />
                    <span className='truncate'>{getNextReviewInfo()}</span>
                  </div>
                </div>

                <div>
                  <span className='text-[10px] text-muted-foreground block font-medium'>
                    Interval
                  </span>
                  <div className='flex items-center gap-1 font-bold text-foreground mt-0.5'>
                    <FaClock className='h-3 w-3 text-emerald-500 shrink-0' />
                    <span>{card.interval || 0} day(s)</span>
                  </div>
                </div>

                <div>
                  <span className='text-[10px] text-muted-foreground block font-medium'>
                    Ease Factor
                  </span>
                  <div className='flex items-center gap-1 font-bold text-foreground mt-0.5'>
                    <FaChartSimple className='h-3 w-3 text-purple-500 shrink-0' />
                    <span>{Math.round((card.easeFactor || 2.5) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Fields Section (if any exist) */}
              {dynamicFieldEntries.length > 0 && (
                <div className='space-y-2'>
                  <span className='text-[11px] font-bold text-muted-foreground uppercase tracking-wider block'>
                    Dynamic Fields
                  </span>
                  <div className='space-y-2'>
                    {dynamicFieldEntries.map(([key, val]) => (
                      <DynamicFieldRenderer
                        key={key}
                        fieldKey={key}
                        value={val}
                        cardQuestion={card.question}
                        onPlaySpeech={(fieldId, text, e) => toggleSpeech(fieldId, text, e)}
                        isPlaying={(fieldId) => isPlaying(fieldId)}
                        onSearch={handleSearch}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className='border-t px-4 py-3 sm:px-5 flex justify-end bg-muted/20'>
              <button
                onClick={onClose}
                className='rounded-xl px-4 py-2 text-xs font-semibold border shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnkiCardDetailModal;
