// src/components/molecules/quiz/QuizOptionList.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaXmark } from 'react-icons/fa6';

export interface QuizOptionListProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isAnswerRevealed: boolean;
  onSelectOption: (option: string) => void;
}

export const QuizOptionList: React.FC<QuizOptionListProps> = ({
  options,
  selectedAnswer,
  correctAnswer,
  isAnswerRevealed,
  onSelectOption,
}) => {
  // If options are long sentences (> 32 chars), use a single column on all screens
  // for superior readability and zero cramped text collision.
  const isLongOptions = useMemo(() => {
    return options.some((opt) => opt.length > 32);
  }, [options]);

  return (
    <div
      className={`grid gap-3 w-full ${
        isLongOptions ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
      }`}
    >
      {options.map((option, idx) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === correctAnswer;

        let buttonStyle = 'bg-card border-border hover:border-primary/50 text-foreground';
        let badgeIcon = null;

        if (isAnswerRevealed) {
          if (isCorrect) {
            buttonStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
            badgeIcon = <FaCheck className='h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5' />;
          } else if (isSelected && !isCorrect) {
            buttonStyle = 'bg-red-500/15 border-red-500 text-red-700 dark:text-red-300 font-bold';
            badgeIcon = <FaXmark className='h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />;
          } else {
            buttonStyle = 'opacity-50 bg-muted/40 border-border text-muted-foreground';
          }
        } else if (isSelected) {
          buttonStyle = 'bg-primary text-primary-foreground border-primary font-bold';
        }

        return (
          <motion.button
            key={`${option}-${idx}`}
            onClick={() => onSelectOption(option)}
            disabled={isAnswerRevealed}
            whileHover={!isAnswerRevealed ? { scale: 1.005 } : {}}
            whileTap={!isAnswerRevealed ? { scale: 0.995 } : {}}
            className={`flex items-start justify-between p-3.5 sm:p-4 rounded-xl border-2 text-left shadow-xs transition-all whitespace-normal break-words w-full overflow-hidden ${buttonStyle}`}
            style={{ textAlign: 'left', whiteSpace: 'normal' }}
          >
            <div className='flex items-start gap-3 min-w-0 flex-1 text-left'>
              <span className='h-6 w-6 rounded-md bg-muted/70 flex items-center justify-center text-xs font-mono font-bold text-muted-foreground shrink-0 mt-0.5'>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className='text-xs sm:text-sm leading-relaxed whitespace-normal break-words text-left min-w-0 flex-1 font-medium'>
                {option}
              </span>
            </div>

            {badgeIcon && <div className='ml-2 shrink-0'>{badgeIcon}</div>}
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuizOptionList;
