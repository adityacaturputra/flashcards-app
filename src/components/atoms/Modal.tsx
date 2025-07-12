// src/components/atoms/Modal.tsx
import React from 'react';
import { motion } from 'framer-motion';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  // Animation variants
  const variants = {
    open: {
      height: 'auto',
      opacity: 1,
      translateY: 0,
      transition: { staggerChildren: 0.1 },
    },
    closed: { height: 0, opacity: 0, translateY: '100vh' }, // Move away from screen
  };

  return (
    <motion.div
      className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-white'
      animate={isOpen ? 'open' : 'closed'}
      initial='closed'
      variants={variants}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className='relative h-full w-full max-w-lg rounded-lg bg-white p-6'
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          className='absolute top-6 right-10 z-20 text-2xl text-gray-600 hover:text-gray-800'
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
