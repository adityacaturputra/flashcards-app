// src/components/molecules/quiz/QuizExplanationCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCircleCheck, FaCircleXmark, FaLightbulb } from 'react-icons/fa6';
import { QuizQuestion } from '@/types/quiz';

export interface QuizExplanationCardProps {
  question: QuizQuestion;
  selectedAnswer: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const QuizExplanationCard: React.FC<QuizExplanationCardProps> = ({
  question,
  selectedAnswer,
  onNext,
  isLastQuestion,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const { structuralBreakdown } = question;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-full rounded-2xl border p-5 sm:p-6 shadow-sm space-y-4'
      style={{
        background: isCorrect ? 'rgba(16, 185, 129, 0.04)' : 'rgba(239, 68, 68, 0.04)',
        borderColor: isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
      }}
    >
      {/* Banner */}
      <div className='flex items-center gap-2.5'>
        {isCorrect ? (
          <>
            <FaCircleCheck className='h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0' />
            <div>
              <div className='text-sm font-bold text-emerald-700 dark:text-emerald-300'>
                Jawaban Benar! 🎉
              </div>
              <div className='text-xs text-muted-foreground'>
                {structuralBreakdown?.headSubject
                  ? 'Kamu berhasil mengidentifikasi subjek utama tanpa terkecoh kata pengganggu.'
                  : 'Pemahaman kaidah dan ketepatan pilihan kamu sudah sesuai standar.'}
              </div>
            </div>
          </>
        ) : (
          <>
            <FaCircleXmark className='h-5 w-5 text-red-600 dark:text-red-400 shrink-0' />
            <div>
              <div className='text-sm font-bold text-red-700 dark:text-red-300'>
                Kurang Tepat (Jawaban yang benar: &quot;{question.correctAnswer}&quot;)
              </div>
              <div className='text-xs text-muted-foreground'>
                {structuralBreakdown?.headSubject
                  ? 'Waspadai kata benda jamak yang berada tepat sebelum kata kerja (Proximity Trap).'
                  : 'Perhatikan kaidah penentu, konteks waktu, atau kolokasi alami.'}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Structural Sentence Breakdown / Rule Analysis */}
      {structuralBreakdown && (
        <div
          className='p-4 rounded-xl border space-y-2'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            <FaLightbulb className='h-3.5 w-3.5 text-amber-500' />
            <span>
              {structuralBreakdown.headSubject
                ? 'Analisis Struktur Kalimat (Teknik Coret Sisipan):'
                : 'Analisis Kunci & Kaidah Pembahasan:'}
            </span>
          </div>

          {structuralBreakdown.headSubject ? (
            <>
              <div className='text-sm sm:text-base leading-relaxed flex flex-wrap items-baseline gap-1 pt-1'>
                {/* Head Subject */}
                <span className='font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20'>
                  {structuralBreakdown.headSubject}
                  {structuralBreakdown.headNumber && (
                    <span className='text-[10px] ml-1 opacity-70 font-mono font-normal uppercase'>
                      ({structuralBreakdown.headNumber})
                    </span>
                  )}
                </span>

                {/* Distractor in brackets */}
                {structuralBreakdown.distractor && (
                  <span className='font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-dashed border-border opacity-75'>
                    [{structuralBreakdown.distractor}]
                  </span>
                )}

                {/* Correct Verb */}
                {structuralBreakdown.targetVerb && (
                  <span className='font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30'>
                    {structuralBreakdown.targetVerb}
                  </span>
                )}
              </div>

              <div className='text-[11px] text-muted-foreground pt-1 flex items-center gap-x-2 gap-y-1 flex-wrap'>
                <div className='flex items-center gap-1.5'>
                  <span className='inline-block w-2 h-2 rounded-full bg-emerald-500' />
                  <span>Hijau: Subjek Asli</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <span className='inline-block w-2 h-2 rounded-full bg-muted-foreground' />
                  <span>Abu-abu [ ]: Sisipan Penjelas</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <span className='inline-block w-2 h-2 rounded-full bg-amber-500' />
                  <span>Kuning: Kata Kerja Selaras</span>
                </div>
              </div>
            </>
          ) : (
            <div className='space-y-1.5 pt-1 text-xs'>
              {structuralBreakdown.focusLabel && (
                <div className='flex items-center gap-1.5'>
                  <span className='font-semibold text-foreground'>Fokus / Formula:</span>
                  <span className='font-mono px-2 py-0.5 rounded-md bg-muted text-foreground border border-border'>
                    {structuralBreakdown.focusLabel}
                  </span>
                </div>
              )}
              {structuralBreakdown.keyRule && (
                <div className='text-muted-foreground leading-relaxed'>
                  <strong className='text-foreground'>Kaidah: </strong>
                  {structuralBreakdown.keyRule}
                </div>
              )}
              {structuralBreakdown.contrastNote && (
                <div className='text-muted-foreground leading-relaxed'>
                  <strong className='text-amber-600 dark:text-amber-400'>Catatan Perbedaan: </strong>
                  {structuralBreakdown.contrastNote}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Text Explanation */}
      <div className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
        {question.explanation}
      </div>

      {/* Next Question Action Button */}
      <div className='flex justify-end pt-2'>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all'
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <span>{isLastQuestion ? 'Lihat Skor & Rubrik Penilaian' : 'Soal Selanjutnya'}</span>
          <FaArrowRight className='h-3.5 w-3.5' />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizExplanationCard;
