'use client';
import React from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';

interface RebuttalOptionGridProps {
  options: string[];
  selectedAnswer: string | null;
  targetAnswer: string;
  distractorValue: string;
  isAnswered: boolean;
  isRevealed: boolean;
  onSelectAnswer: (val: string) => void;
}

export const RebuttalOptionGrid: React.FC<RebuttalOptionGridProps> = ({
  options,
  selectedAnswer,
  targetAnswer,
  distractorValue,
  isAnswered,
  isRevealed,
  onSelectAnswer,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-semibold text-muted-foreground'>
        Pilih Jawaban Akhir yang Disepakati Pembicara:
      </span>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isOptionTarget = option === targetAnswer;
          const isOptionDistractor = option === distractorValue;

          let btnStyle = 'border-border/80 bg-secondary/30 hover:bg-secondary text-foreground';
          if (isRevealed || isAnswered) {
            if (isOptionTarget) {
              btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold';
            } else if (isSelected && isOptionDistractor) {
              btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 font-bold';
            } else if (isSelected) {
              btnStyle = 'border-border bg-secondary/80 text-foreground';
            }
          }

          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(option)}
              className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all text-left ${btnStyle}`}
            >
              <span>{option}</span>
              {isSelected && (
                <span className='text-xs'>
                  {isOptionTarget ? (
                    <FaCheck className='text-emerald-600 dark:text-emerald-400' />
                  ) : isOptionDistractor ? (
                    <FaXmark className='text-rose-600 dark:text-rose-400' />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RebuttalOptionGrid;
