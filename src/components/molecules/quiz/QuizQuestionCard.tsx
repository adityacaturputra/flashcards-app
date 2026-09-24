// src/components/molecules/quiz/QuizQuestionCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaVolumeHigh } from 'react-icons/fa6';
import { useSpeechPlayback } from '@/hooks/useSpeechPlayback';
import { QuizQuestion } from '@/types/quiz';

export interface QuizQuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  selectedAnswer,
}) => {
  const { toggleSpeech, isPlaying } = useSpeechPlayback<string>({
    resetTriggers: [question.id],
    rate: 0.9,
  });

  // Replaces the placeholder with the selected answer or a stylized blank
  const renderSentenceWithBlank = () => {
    const parts = question.sentence.split('[ ___ ]');
    if (parts.length < 2) return question.sentence;

    return (
      <span className='leading-relaxed text-base sm:text-lg'>
        {parts[0]}
        <span
          className={`inline-block px-2.5 py-0.5 mx-1 rounded-lg border-2 font-bold font-mono transition-all ${
            selectedAnswer
              ? selectedAnswer === question.correctAnswer
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-500/15 border-red-500 text-red-600 dark:text-red-400'
              : 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 animate-pulse'
          }`}
        >
          {selectedAnswer ?? '______'}
        </span>
        {parts[1]}
      </span>
    );
  };

  const cleanSentenceForSpeech = question.sentence.replace('[ ___ ]', question.correctAnswer);
  const playing = isPlaying('sentence');

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className='w-full rounded-2xl border p-5 sm:p-7 shadow-sm space-y-4'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      {/* Card Header: Category & Audio */}
      <div className='flex items-center justify-between gap-2 border-b pb-3' style={{ borderColor: 'var(--border)' }}>
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
            {question.category}
          </span>
          <span className='text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground'>
            Level {question.difficultyLevel}
          </span>
        </div>

        <button
          onClick={(e) => toggleSpeech('sentence', cleanSentenceForSpeech, e)}
          className={`rounded-lg p-2 transition-all hover:scale-105 border ${
            playing ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-secondary text-secondary-foreground hover:bg-muted'
          }`}
          style={{ borderColor: 'var(--border)' }}
          title='Listen to pronunciation'
          aria-label='Listen to pronunciation'
          type='button'
        >
          <FaVolumeHigh className='h-3.5 w-3.5' />
        </button>
      </div>

      {/* Sentence Body */}
      <div className='py-2 text-foreground font-medium'>
        {renderSentenceWithBlank()}
      </div>
    </motion.div>
  );
};

export default QuizQuestionCard;
