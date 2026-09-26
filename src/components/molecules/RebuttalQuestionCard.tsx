'use client';
import React, { useState } from 'react';
import {
  FaCheck,
  FaXmark,
  FaEye,
  FaEyeSlash,
  FaFileLines,
} from 'react-icons/fa6';
import {
  RebuttalQuestionItem,
  REBUTTAL_CATEGORY_META,
} from '@/types/rebuttal';
import RebuttalAudioPlayer from '@/components/atoms/RebuttalAudioPlayer';
import PencilStrikeoutBadge from '@/components/atoms/PencilStrikeoutBadge';
import RebuttalOptionGrid from '@/components/molecules/RebuttalOptionGrid';
import RebuttalTranscriptView from '@/components/molecules/RebuttalTranscriptView';
import RebuttalPedagogyBox from '@/components/molecules/RebuttalPedagogyBox';

interface RebuttalQuestionCardProps {
  item: RebuttalQuestionItem;
  selectedAnswer: string | null;
  onSelectAnswer: (val: string) => void;
  isRevealed: boolean;
  onToggleReveal: () => void;
}

export const RebuttalQuestionCard: React.FC<RebuttalQuestionCardProps> = ({
  item,
  selectedAnswer,
  onSelectAnswer,
  isRevealed,
  onToggleReveal,
}) => {
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const categoryMeta = REBUTTAL_CATEGORY_META[item.category];

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === item.targetAnswer;
  const isTrapped = selectedAnswer === item.distractorValue;

  return (
    <div
      className='rounded-2xl border p-4 sm:p-6 shadow-sm flex flex-col gap-5 transition-colors'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header: Source and Category Badge */}
      <div className='flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-border/70'>
        <div className='flex items-center gap-2'>
          <span className='rounded-lg bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 text-xs font-bold text-teal-700 dark:text-teal-400'>
            {categoryMeta.title}
          </span>
          <span className='text-xs font-medium text-muted-foreground truncate'>
            {item.cambridgeSource}
          </span>
        </div>
        <span className='text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md'>
          {item.formFieldLabel}
        </span>
      </div>

      {/* Audio Player */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-xs font-semibold text-muted-foreground'>
          Dengarkan Cuplikan Audio Asli Cambridge:
        </span>
        <RebuttalAudioPlayer audioUrl={item.audioUrl} />
      </div>

      {/* Question Prompt */}
      <div className='bg-secondary/40 rounded-xl p-3.5 border border-border/60 flex flex-col gap-2'>
        <span className='text-xs uppercase tracking-wider font-bold text-muted-foreground'>
          Pertanyaan Formulir (Form Completion):
        </span>
        <h3 className='text-sm sm:text-base font-bold text-foreground leading-snug'>
          {item.questionPrompt}
        </h3>
      </div>

      {/* Answer Options Grid */}
      <RebuttalOptionGrid
        options={item.options}
        selectedAnswer={selectedAnswer}
        targetAnswer={item.targetAnswer}
        distractorValue={item.distractorValue}
        isAnswered={isAnswered}
        isRevealed={isRevealed}
        onSelectAnswer={onSelectAnswer}
      />

      {/* Feedback Banner */}
      {isAnswered && (
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
              : isTrapped
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
          }`}
        >
          {isCorrect ? (
            <FaCheck className='h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400' />
          ) : (
            <FaXmark className='h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400' />
          )}
          <div>
            <strong>
              {isCorrect
                ? 'Tepat Sekali! '
                : isTrapped
                ? 'Terjebak Distraktor Awal! '
                : 'Belum Tepat! '}
            </strong>
            {isCorrect
              ? `Telinga Anda berhasil mendeteksi penanda sanggahan (${item.signpostWords.join(', ')}) dan mengunci jawaban akhir.`
              : isTrapped
              ? `Anda memilih "${item.distractorValue}", yaitu informasi awal yang langsung diralat oleh pembicara.`
              : `Perhatikan kembali kata penanda sanggahan sebelum memilih.`}
          </div>
        </div>
      )}

      {/* Pencil Strikeout Badge & Action Buttons */}
      <div className='flex flex-wrap items-center justify-between gap-3 pt-2'>
        <PencilStrikeoutBadge
          distractor={item.distractorValue}
          correctAnswer={item.targetAnswer}
          fieldLabel={item.formFieldLabel}
        />

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setShowTranscript((prev) => !prev)}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all'
          >
            <FaFileLines className='h-3 w-3' />
            {showTranscript ? 'Tutup Transkrip' : 'Buka Transkrip Dialog'}
          </button>

          <button
            onClick={onToggleReveal}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all'
          >
            {isRevealed ? <FaEyeSlash className='h-3 w-3' /> : <FaEye className='h-3 w-3' />}
            {isRevealed ? 'Sembunyikan Bedah' : 'Bedah Jebakan'}
          </button>
        </div>
      </div>

      {/* Expandable Transcript View */}
      <RebuttalTranscriptView
        transcript={item.transcript}
        signpostWords={item.signpostWords}
        distractorValue={item.distractorValue}
        targetAnswer={item.targetAnswer}
        isOpen={showTranscript}
      />

      {/* Expandable Explanation Breakdown */}
      <RebuttalPedagogyBox
        explanationMarkdown={item.explanationMarkdown}
        isRevealed={isRevealed}
      />
    </div>
  );
};

export default RebuttalQuestionCard;
