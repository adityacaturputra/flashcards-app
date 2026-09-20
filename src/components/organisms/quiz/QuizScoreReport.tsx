// src/components/organisms/quiz/QuizScoreReport.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaAward,
  FaRotateRight,
  FaBookOpen,
  FaStar,
  FaCircleCheck,
} from 'react-icons/fa6';
import { RubricScoreResult } from '@/types/quiz';

export interface QuizScoreReportProps {
  rubricResult: RubricScoreResult;
  rubricTitle: string;
  onRestart: () => void;
  onOpenTheory: () => void;
}

export const QuizScoreReport: React.FC<QuizScoreReportProps> = ({
  rubricResult,
  rubricTitle,
  onRestart,
  onOpenTheory,
}) => {
  const {
    score,
    tier,
    cefrLevel,
    ieltsEquivalent,
    accuracyPercentage,
    totalAnswered,
    totalCorrect,
    feedbackMessage,
    categoryAnalysis,
  } = rubricResult;

  const starCount = Math.round(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className='w-full max-w-2xl mx-auto space-y-6'
    >
      {/* Hero Scorecard */}
      <div
        className='rounded-3xl border p-6 sm:p-8 text-center space-y-5 shadow-lg relative overflow-hidden'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Glow Accent */}
        <div className='absolute -top-20 -right-20 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none' />

        {/* Rubric Header */}
        <div className='space-y-1'>
          <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Hasil Penilaian Rubrik
          </span>
          <h2 className='text-sm sm:text-base font-bold text-foreground'>
            {rubricTitle}
          </h2>
        </div>

        {/* Big Score Display */}
        <div className='flex flex-col items-center justify-center py-2'>
          <div className='flex items-baseline gap-1'>
            <span className='text-5xl sm:text-6xl font-black tracking-tight text-emerald-600 dark:text-emerald-400'>
              {score.toFixed(1)}
            </span>
            <span className='text-2xl sm:text-3xl font-bold text-muted-foreground'>
              / 5.0
            </span>
          </div>

          {/* Stars */}
          <div className='flex items-center gap-1.5 mt-2'>
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar
                key={s}
                className={`h-5 w-5 ${
                  s <= starCount
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Tier & CEFR Pills */}
          <div className='flex items-center gap-2 mt-4 flex-wrap justify-center'>
            <span className='rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-black uppercase tracking-wider'>
              {tier} Level
            </span>
            <span className='rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 px-3 py-1 text-xs font-bold'>
              CEFR: {cefrLevel}
            </span>
            <span className='rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 px-3 py-1 text-xs font-bold'>
              IELTS: {ieltsEquivalent}
            </span>
          </div>
        </div>

        {/* Accuracy Stats Row */}
        <div
          className='grid grid-cols-2 gap-3 p-3 rounded-2xl border'
          style={{
            background: 'var(--muted)',
            borderColor: 'var(--border)',
          }}
        >
          <div>
            <div className='text-xs text-muted-foreground'>Akurasi Jawaban</div>
            <div className='text-lg font-black text-foreground'>{accuracyPercentage}%</div>
          </div>
          <div>
            <div className='text-xs text-muted-foreground'>Skor Benar</div>
            <div className='text-lg font-black text-foreground'>
              {totalCorrect} / {totalAnswered}
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        <div className='p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm text-muted-foreground leading-relaxed text-left flex items-start gap-3'>
          <FaAward className='h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5' />
          <span>{feedbackMessage}</span>
        </div>
      </div>

      {/* Category Breakdown Card */}
      {Object.keys(categoryAnalysis).length > 0 && (
        <div
          className='p-5 sm:p-6 rounded-3xl border shadow-sm space-y-3'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Analisis per Kategori Jebakan
          </div>

          <div className='space-y-2'>
            {Object.entries(categoryAnalysis).map(([cat, stats]) => (
              <div
                key={cat}
                className='flex items-center justify-between p-3 rounded-xl border text-xs'
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className='flex items-center gap-2'>
                  <FaCircleCheck
                    className={`h-3.5 w-3.5 ${
                      stats.accuracy >= 70 ? 'text-emerald-500' : 'text-amber-500'
                    }`}
                  />
                  <span className='font-semibold text-foreground'>{cat}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground'>
                    {stats.correct} / {stats.total}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      stats.accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {stats.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row items-center gap-3 pt-2'>
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full sm:flex-1 flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-sm shadow-md transition-all'
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <FaRotateRight className='h-4 w-4' />
          <span>Latihan Lagi (10 Soal Acak Baru)</span>
        </motion.button>

        <motion.button
          onClick={onOpenTheory}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full sm:flex-1 flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-sm border transition-all hover:bg-muted'
          style={{
            background: 'var(--secondary)',
            color: 'var(--secondary-foreground)',
            borderColor: 'var(--border)',
          }}
        >
          <FaBookOpen className='h-4 w-4' />
          <span>Pelajari Panduan Teori</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizScoreReport;
