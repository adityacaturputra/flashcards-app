import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowUp,
  FaMinus,
  FaArrowDown,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

interface BulkActionButtonsProps {
  isVisible: boolean;
  selectedCount: number;
  isUpdating: boolean;
  onIncrease: () => void;
  onCurrent: () => void;
  onDecrease: () => void;
  onCancel: () => void;
  onSelectAll?: () => void;
  lastResult?: {
    changed: number;
    noChange: number;
    failed: number;
    action: string;
  } | null;
}

const BulkActionButtons: React.FC<BulkActionButtonsProps> = ({
  isVisible,
  selectedCount,
  isUpdating,
  onIncrease,
  onCurrent,
  onDecrease,
  onCancel,
  onSelectAll,
  lastResult,
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform sm:bottom-6'
      >
        <div className='rounded-xl border border-gray-200 bg-white p-1.5 shadow-2xl sm:rounded-2xl sm:p-2 md:p-4 dark:border-gray-700 dark:bg-gray-800'>
          <div className='flex items-center gap-1 sm:gap-2 md:gap-4'>
            {/* Selection Info */}
            <div className='flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 sm:gap-2 sm:px-3 sm:py-2 dark:bg-blue-900/20'>
              <FaCheck className='text-xs text-blue-600 sm:text-sm dark:text-blue-400' />
              <span className='text-xs font-medium text-blue-800 sm:text-sm dark:text-blue-200'>
                {selectedCount}
              </span>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-0.5 sm:gap-1 md:gap-2'>
              {/* Select All Button */}
              {onSelectAll && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSelectAll}
                  disabled={isUpdating}
                  className='flex items-center gap-1 rounded-lg bg-purple-500 px-1.5 py-0.5 text-white transition-colors duration-200 hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-purple-300 sm:gap-1 sm:px-2 sm:py-1 md:gap-2 md:px-4 md:py-2'
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                  }}
                >
                  <FaCheck className='text-xs sm:text-xs md:text-sm' />
                  <span className='hidden text-xs font-medium sm:inline md:text-sm'>
                    Select All
                  </span>
                </motion.button>
              )}

              {/* Increase Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onIncrease}
                disabled={isUpdating}
                className='flex items-center gap-1 rounded-lg bg-emerald-500 px-1.5 py-0.5 text-white transition-colors duration-200 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300 sm:gap-1 sm:px-2 sm:py-1 md:gap-2 md:px-4 md:py-2'
                style={{
                  background: '#10b981', // emerald-500
                  color: 'white',
                }}
              >
                <FaArrowUp className='text-xs sm:text-xs md:text-sm' />
                <span className='hidden text-xs font-medium sm:inline md:text-sm'>
                  Increase
                </span>
              </motion.button>

              {/* Current Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCurrent}
                disabled={isUpdating}
                className='flex items-center gap-1 rounded-lg bg-blue-500 px-1.5 py-0.5 text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 sm:gap-1 sm:px-2 sm:py-1 md:gap-2 md:px-4 md:py-2'
                style={{
                  background: '#3b82f6', // blue-500
                  color: 'white',
                }}
              >
                <FaMinus className='text-xs sm:text-xs md:text-sm' />
                <span className='hidden text-xs font-medium sm:inline md:text-sm'>
                  Current
                </span>
              </motion.button>

              {/* Decrease Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDecrease}
                disabled={isUpdating}
                className='flex items-center gap-1 rounded-lg bg-red-500 px-1.5 py-0.5 text-white transition-colors duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300 sm:gap-1 sm:px-2 sm:py-1 md:gap-2 md:px-4 md:py-2'
                style={{
                  background: '#ef4444', // red-500
                  color: 'white',
                }}
              >
                <FaArrowDown className='text-xs sm:text-xs md:text-sm' />
                <span className='hidden text-xs font-medium sm:inline md:text-sm'>
                  Decrease
                </span>
              </motion.button>

              {/* Cancel Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                disabled={isUpdating}
                className='flex items-center gap-1 rounded-lg bg-gray-500 px-1.5 py-0.5 text-white transition-colors duration-200 hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300 sm:gap-1 sm:px-2 sm:py-1 md:gap-2 md:px-4 md:py-2'
              >
                <FaTimes className='text-xs sm:text-xs md:text-sm' />
                <span className='hidden text-xs font-medium sm:inline md:text-sm'>
                  Cancel
                </span>
              </motion.button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isUpdating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-2 flex items-center justify-center gap-1 sm:mt-3 sm:gap-2'
            >
              <div className='h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent sm:h-4 sm:w-4'></div>
              <span className='text-xs text-gray-600 sm:text-sm dark:text-gray-400'>
                Updating flashcards...
              </span>
            </motion.div>
          )}

          {/* Result Display */}
          {lastResult && !isUpdating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-2 rounded-lg bg-green-50 p-2 sm:mt-3 sm:p-3 dark:bg-green-900/20'
            >
              <div className='flex items-center gap-1 text-xs sm:gap-2 sm:text-sm'>
                <FaCheck className='text-green-600 dark:text-green-400' />
                <span className='font-medium text-green-800 dark:text-green-200'>
                  {lastResult.action} completed:
                </span>
              </div>
              <div className='mt-1 text-xs text-green-700 dark:text-green-300'>
                {lastResult.changed} updated, {lastResult.noChange} unchanged
                {lastResult.failed > 0 && `, ${lastResult.failed} failed`}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BulkActionButtons;
