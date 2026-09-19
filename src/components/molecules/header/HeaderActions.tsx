'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaPlay, FaStop, FaBars, FaXmark } from 'react-icons/fa6';

interface HeaderActionsProps {
  isReviewMode: boolean;
  onToggleReviewMode: () => void;
  onAddFlashcard: () => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  isReviewMode,
  onToggleReviewMode,
  onAddFlashcard,
  isMenuOpen,
  onToggleMenu,
  buttonRef,
}) => {
  return (
    <div className='flex items-center gap-2 sm:gap-2.5'>
      {/* Desktop Quick Add Button */}
      {!isReviewMode && (
        <motion.button
          onClick={onAddFlashcard}
          className='hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-102 active:scale-98'
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus className='h-3 w-3' />
          <span>Add Card</span>
        </motion.button>
      )}

      {/* Review Mode Toggle Button */}
      <motion.button
        onClick={onToggleReviewMode}
        className='flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-102 active:scale-98'
        style={{
          background: isReviewMode
            ? 'var(--destructive)'
            : 'var(--secondary)',
          color: isReviewMode
            ? 'var(--destructive-foreground)'
            : 'var(--secondary-foreground)',
          borderColor: 'var(--border)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title={isReviewMode ? 'Exit Review Mode' : 'Start Review Mode'}
      >
        {isReviewMode ? (
          <>
            <FaStop className='h-3 w-3' />
            <span>Exit Review</span>
          </>
        ) : (
          <>
            <FaPlay className='h-3 w-3' />
            <span className='hidden xs:inline sm:inline'>Review</span>
          </>
        )}
      </motion.button>

      {/* Hamburger / Navigation Drawer Trigger Button */}
      <motion.button
        ref={buttonRef}
        onClick={onToggleMenu}
        className='relative flex items-center justify-center rounded-xl border p-2 sm:p-2.5 transition-all hover:scale-105 active:scale-95'
        style={{
          background: isMenuOpen
            ? 'var(--primary)'
            : 'var(--secondary)',
          color: isMenuOpen
            ? 'var(--primary-foreground)'
            : 'var(--secondary-foreground)',
          borderColor: 'var(--border)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label='Toggle navigation menu'
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <FaXmark className='h-4 w-4' />
        ) : (
          <FaBars className='h-4 w-4' />
        )}
      </motion.button>
    </div>
  );
};

export default HeaderActions;
