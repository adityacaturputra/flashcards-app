// src/components/molecules/quiz/QuizProgressBar.tsx
import React from 'react';

export interface QuizProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  correctCount: number;
  answeredCount: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  correctCount,
  answeredCount,
}) => {
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className='w-full space-y-2 mb-4'>
      <div className='flex items-center justify-between text-xs font-semibold'>
        <span style={{ color: 'var(--muted-foreground)' }}>
          Question <span className='text-foreground font-bold'>{currentIndex + 1}</span> of {totalQuestions}
        </span>

        <div className='flex items-center gap-2'>
          {answeredCount > 0 && (
            <span className='rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[11px] font-bold'>
              {correctCount} / {answeredCount} Correct
            </span>
          )}
        </div>
      </div>

      {/* Track & Bar */}
      <div
        className='h-2 w-full overflow-hidden rounded-full'
        style={{ background: 'var(--muted)' }}
      >
        <div
          className='h-full rounded-full transition-all duration-300 ease-out'
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgressBar;
