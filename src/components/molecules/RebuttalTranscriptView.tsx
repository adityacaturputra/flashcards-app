'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranscriptSnippetLine } from '@/types/rebuttal';

interface RebuttalTranscriptViewProps {
  transcript: TranscriptSnippetLine[];
  signpostWords: string[];
  distractorValue: string;
  targetAnswer: string;
  isOpen: boolean;
}

export const RebuttalTranscriptView: React.FC<RebuttalTranscriptViewProps> = ({
  transcript,
  signpostWords,
  distractorValue,
  targetAnswer,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='rounded-xl bg-secondary/50 p-3.5 border border-border/60 flex flex-col gap-2 overflow-hidden'
        >
          <span className='text-[11px] font-bold uppercase tracking-wider text-muted-foreground'>
            Transkrip Cuplikan Dialog Cambridge:
          </span>
          <div className='space-y-1.5 text-xs text-foreground font-mono leading-relaxed'>
            {transcript.map((line, idx) => (
              <div key={idx} className='flex gap-2'>
                <span className='font-bold text-teal-600 dark:text-teal-400 shrink-0'>
                  {line.speaker}:
                </span>
                <span>
                  {line.text.split(' ').map((word, wIdx) => {
                    const clean = word.replace(/[^a-zA-Z0-9£]/g, '').toLowerCase();
                    const isSign = signpostWords.some((sw) => clean.includes(sw.toLowerCase()));
                    const isDist = clean === distractorValue.toLowerCase();
                    const isAns = clean === targetAnswer.toLowerCase();

                    if (isSign) {
                      return (
                        <span
                          key={wIdx}
                          className='bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold px-1 rounded mx-0.5'
                        >
                          {word}{' '}
                        </span>
                      );
                    }
                    if (isDist) {
                      return (
                        <span
                          key={wIdx}
                          className='line-through decoration-rose-500 text-rose-600 font-bold mx-0.5'
                        >
                          {word}{' '}
                        </span>
                      );
                    }
                    if (isAns) {
                      return (
                        <span
                          key={wIdx}
                          className='bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold px-1 rounded mx-0.5'
                        >
                          {word}{' '}
                        </span>
                      );
                    }
                    return word + ' ';
                  })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RebuttalTranscriptView;
