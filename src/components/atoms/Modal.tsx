// src/components/atoms/Modal.tsx
import React from 'react';
import { motion } from 'framer-motion';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <motion.div
      className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
          className='absolute right-5 bottom-5 text-gray-600 hover:text-gray-800'
          onClick={onClose}
        >
          &times; Close
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
