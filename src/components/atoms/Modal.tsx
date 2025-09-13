// src/components/atoms/Modal.tsx
import React from 'react';
import { motion } from 'framer-motion';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return (
    <motion.div
      className='bg-opacity-50 fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-black p-2 sm:p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className='relative w-full max-w-sm sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-lg p-3 sm:p-6 mx-2 sm:mx-0'
        style={{
          background: 'var(--card)',
          color: 'var(--card-foreground)',
        }}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          className='absolute top-3 sm:top-4 right-3 sm:right-4 z-20 text-xl sm:text-2xl hover:opacity-70 transition-opacity'
          style={{ color: 'var(--muted-foreground)' }}
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
