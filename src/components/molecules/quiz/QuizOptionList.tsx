// src/components/molecules/quiz/QuizOptionList.tsx
import React from 'react';
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
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full'>
      {options.map((option, idx) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === correctAnswer;

        let buttonStyle = 'bg-card border-border hover:border-primary/50 text-foreground';
        let badgeIcon = null;

        if (isAnswerRevealed) {
          if (isCorrect) {
            buttonStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
            badgeIcon = <FaCheck className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />;
          } else if (isSelected && !isCorrect) {
            buttonStyle = 'bg-red-500/15 border-red-500 text-red-700 dark:text-red-300 font-bold';
            badgeIcon = <FaXmark className='h-4 w-4 text-red-600 dark:text-red-400' />;
          } else {
            buttonStyle = 'opacity-50 bg-muted/40 border-border text-muted-foreground';
          }
        } else if (isSelected) {
          buttonStyle = 'bg-primary text-primary-foreground border-primary font-bold';
        }

        return (
          <motion.button
            key={option}
            onClick={() => onSelectOption(option)}
            disabled={isAnswerRevealed}
            whileHover={!isAnswerRevealed ? { scale: 1.01 } : {}}
            whileTap={!isAnswerRevealed ? { scale: 0.99 } : {}}
            className={`flex items-center justify-between p-4 rounded-xl border-2 text-base font-semibold transition-all text-left shadow-xs ${buttonStyle}`}
          >
            <div className='flex items-center gap-3'>
              <span className='h-6 w-6 rounded-md bg-muted/60 flex items-center justify-center text-xs font-mono font-bold text-muted-foreground'>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className='font-mono'>{option}</span>
            </div>

            {badgeIcon}
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuizOptionList;
