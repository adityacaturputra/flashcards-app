'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa6';

interface RebuttalPedagogyBoxProps {
  explanationMarkdown: string;
  isRevealed: boolean;
}

export const RebuttalPedagogyBox: React.FC<RebuttalPedagogyBoxProps> = ({
  explanationMarkdown,
  isRevealed,
}) => {
  return (
    <AnimatePresence>
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='rounded-xl bg-teal-500/5 p-4 border border-teal-500/20 flex flex-col gap-2 overflow-hidden'
        >
          <div className='flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400'>
            <FaGraduationCap className='h-4 w-4' />
            <span>Bedah Pedagogis Cambridge Band 7+:</span>
          </div>
          <p className='text-xs text-foreground/90 leading-relaxed whitespace-pre-line'>
            {explanationMarkdown}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RebuttalPedagogyBox;
