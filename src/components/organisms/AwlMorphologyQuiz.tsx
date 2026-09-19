'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheck,
  FaXmark,
  FaPlay,
  FaTrophy,
  FaRotateRight,
  FaLightbulb,
} from 'react-icons/fa6';
import { AWL_QUIZ_QUESTIONS } from '@/data/awl';
import { AwlQuizQuestion } from '@/types/awl';

export const AwlMorphologyQuiz: React.FC = () => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentQ: AwlQuizQuestion = useMemo(() => {
    return AWL_QUIZ_QUESTIONS[questionIdx % AWL_QUIZ_QUESTIONS.length];
  }, [questionIdx]);

  const handleSelect = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    setAttempts((prev) => prev + 1);

    if (option === currentQ.correctOption) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setQuestionIdx((prev) => (prev + 1) % AWL_QUIZ_QUESTIONS.length);
  };

  const handleReset = () => {
    setScore(0);
    setAttempts(0);
    setStreak(0);
    setSelectedOption(null);
    setQuestionIdx(0);
  };

  return (
    <div
      className='max-w-xl mx-auto rounded-3xl border p-6 sm:p-8 space-y-6 shadow-xs text-center'
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Top Header & Score */}
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <span className='rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase'>
          Rumpun: {currentQ.headword}
        </span>

        <div className='flex items-center gap-2 text-xs font-medium'>
          <div className='flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20'>
            <FaCheck className='h-3 w-3' />
            <span>
              Skor: {score} / {attempts}
            </span>
          </div>

          <div className='flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20'>
            <FaTrophy className='h-3 w-3' />
            <span>Streak: {streak}</span>
          </div>

          {attempts > 0 && (
            <button
              onClick={handleReset}
              className='p-1.5 text-muted-foreground hover:text-foreground rounded-lg border border-border bg-secondary'
              title='Reset kuis'
            >
              <FaRotateRight className='h-3 w-3' />
            </button>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className='space-y-2 pt-2'>
        <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
          Pilihlah bentuk kata (*Word Form*) yang tepat secara tata bahasa:
        </span>
        <p className='text-base sm:text-lg font-bold text-foreground leading-relaxed'>
          &quot;{currentQ.sentencePrompt}&quot;
        </p>
      </div>

      {/* 4 Options Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === currentQ.correctOption;

          let btnStyle =
            'border-border bg-secondary/60 hover:bg-secondary hover:border-primary text-foreground';

          if (selectedOption !== null) {
            if (isCorrect) {
              btnStyle =
                'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30';
            } else if (isSelected) {
              btnStyle =
                'border-red-500 bg-red-500/15 text-red-700 dark:text-red-300';
            } else {
              btnStyle = 'opacity-40 border-border bg-secondary/30 text-muted-foreground';
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={selectedOption === null ? { scale: 1.02 } : {}}
              whileTap={selectedOption === null ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(opt)}
              disabled={selectedOption !== null}
              className={`p-3.5 rounded-2xl border font-mono font-bold text-sm transition-all ${btnStyle}`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback & Grammar Clue */}
      {selectedOption !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-4 pt-3 border-t border-border/60 text-left'
        >
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium ${
              selectedOption === currentQ.correctOption
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                : 'border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300'
            }`}
          >
            <div className='font-bold flex items-center gap-1.5 mb-1'>
              {selectedOption === currentQ.correctOption ? (
                <>
                  <FaCheck className='h-4 w-4 text-emerald-500' />
                  <span>Jawaban Anda BENAR! Kelas kata: {currentQ.requiredPartOfSpeech}.</span>
                </>
              ) : (
                <>
                  <FaXmark className='h-4 w-4 text-red-500' />
                  <span>
                    Kurang tepat! Jawaban benar adalah &quot;{currentQ.correctOption}&quot; ({currentQ.requiredPartOfSpeech}).
                  </span>
                </>
              )}
            </div>
            <p className='text-foreground/80 text-xs mt-1 flex items-start gap-1.5'>
              <FaLightbulb className='h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5' />
              <span>{currentQ.grammarClue}</span>
            </p>
          </div>

          <div className='flex justify-center pt-1'>
            <button
              onClick={handleNext}
              className='flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-xs'
            >
              <FaPlay className='h-3 w-3' />
              <span>Soal Berikutnya</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AwlMorphologyQuiz;
