'use client';
import React from 'react';
import { FaPencil, FaArrowRight } from 'react-icons/fa6';

interface PencilStrikeoutBadgeProps {
  distractor: string;
  correctAnswer: string;
  fieldLabel?: string;
}

export const PencilStrikeoutBadge: React.FC<PencilStrikeoutBadgeProps> = ({
  distractor,
  correctAnswer,
  fieldLabel,
}) => {
  return (
    <div className='inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs text-foreground'>
      <div className='flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400'>
        <FaPencil className='h-3 w-3 shrink-0' />
        <span className='text-[11px] uppercase tracking-wide font-mono'>Metode Coret Pensil:</span>
      </div>
      {fieldLabel && (
        <span className='text-muted-foreground font-medium'>
          {fieldLabel}
        </span>
      )}
      <div className='flex items-center gap-1.5 font-mono font-bold'>
        <span className='line-through decoration-rose-500 decoration-2 text-rose-600/80 dark:text-rose-400/80 px-1 rounded bg-rose-500/10'>
          {distractor}
        </span>
        <FaArrowRight className='h-2.5 w-2.5 text-muted-foreground' />
        <span className='text-emerald-700 dark:text-emerald-400 px-1 rounded bg-emerald-500/15 border border-emerald-500/30 font-extrabold'>
          {correctAnswer}
        </span>
      </div>
    </div>
  );
};

export default PencilStrikeoutBadge;
