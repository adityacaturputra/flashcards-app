// src/components/organisms/quiz/QuizEngine.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaRotateRight, FaTriangleExclamation } from 'react-icons/fa6';
import { QuizModuleMeta } from '@/types/quiz';
import { useQuizSession } from '@/hooks/useQuizSession';
import {
  QuizProgressBar,
  QuizQuestionCard,
  QuizOptionList,
  QuizExplanationCard,
} from '@/components/molecules/quiz';
import QuizScoreReport from './QuizScoreReport';

export interface QuizEngineProps {
  module: QuizModuleMeta;
  onOpenTheory: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  module,
  onOpenTheory,
}) => {
  const {
    currentIndex,
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    isAnswerRevealed,
    isSessionComplete,
    isLoading,
    isEvaluating,
    error,
    records,
    rubricResult,
    handleSelectAnswer,
    handleNextQuestion,
    handleRestartSession,
    refetchSession,
  } = useQuizSession(module.id, { count: 10 });

  const correctCount = records.filter((r) => r.isCorrect).length;

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className='w-full max-w-2xl mx-auto space-y-4 animate-pulse'>
        {/* Progress bar skeleton */}
        <div className='h-12 w-full rounded-2xl bg-muted/60 border' style={{ borderColor: 'var(--border)' }} />

        {/* Question card skeleton */}
        <div className='h-48 w-full rounded-2xl bg-muted/50 border p-6 space-y-4' style={{ borderColor: 'var(--border)' }}>
          <div className='h-4 w-32 bg-muted rounded-md' />
          <div className='h-6 w-3/4 bg-muted rounded-md mt-4' />
          <div className='h-6 w-1/2 bg-muted rounded-md' />
        </div>

        {/* Options skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
          <div className='h-14 rounded-2xl bg-muted/40 border' style={{ borderColor: 'var(--border)' }} />
          <div className='h-14 rounded-2xl bg-muted/40 border' style={{ borderColor: 'var(--border)' }} />
          <div className='h-14 rounded-2xl bg-muted/40 border' style={{ borderColor: 'var(--border)' }} />
          <div className='h-14 rounded-2xl bg-muted/40 border' style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
    );
  }

  // 2. Error State with Retry
  if (error) {
    return (
      <div className='w-full max-w-md mx-auto p-6 rounded-2xl border text-center space-y-4 my-8' style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className='w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto'>
          <FaTriangleExclamation className='h-6 w-6' />
        </div>
        <div>
          <h3 className='font-bold text-foreground'>Gagal Memuat Soal</h3>
          <p className='text-xs text-muted-foreground mt-1'>{error}</p>
        </div>
        <button
          onClick={() => void refetchSession()}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-primary-foreground bg-primary shadow-sm hover:opacity-95'
        >
          <FaRotateRight className='h-3 w-3' />
          Coba Lagi
        </button>
      </div>
    );
  }

  // 3. Score Report State (Session Completed)
  if (isSessionComplete && rubricResult) {
    return (
      <QuizScoreReport
        rubricResult={rubricResult}
        rubricTitle={module.rubricTitle}
        onRestart={() => void handleRestartSession({ count: 10 })}
        onOpenTheory={onOpenTheory}
      />
    );
  }

  // 4. Fallback if questions are empty
  if (!currentQuestion) {
    return (
      <div className='text-center py-12 text-muted-foreground'>
        Tidak ada soal tersedia dari server.
      </div>
    );
  }

  return (
    <div className='w-full max-w-2xl mx-auto space-y-4'>
      {/* Progress Bar & Header Stats */}
      <QuizProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        correctCount={correctCount}
        answeredCount={records.length}
      />

      {/* Question Sentence Card with Blank & Audio */}
      <QuizQuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
      />

      {/* Options Selection */}
      <QuizOptionList
        options={currentQuestion.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={currentQuestion.correctAnswer}
        isAnswerRevealed={isAnswerRevealed}
        onSelectOption={handleSelectAnswer}
      />

      {/* Structural Breakdown & Explanation (Revealed after answer) */}
      {isAnswerRevealed && selectedAnswer && (
        <QuizExplanationCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onNext={() => void handleNextQuestion()}
          isLastQuestion={currentIndex === totalQuestions - 1}
        />
      )}

      {/* Evaluating Overlay when submitting score */}
      {isEvaluating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-3 text-xs text-muted-foreground animate-pulse'
        >
          Menghitung skor evaluasi CEFR ke server...
        </motion.div>
      )}
    </div>
  );
};

export default QuizEngine;
