// src/components/atoms/SkeletonLoader.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className='flex flex-col space-y-4'>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          className='rounded bg-gray-200 p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='mb-2 h-4 w-3/4 rounded-full bg-gray-300'></div>
          <div className='mb-2 h-4 w-1/2 rounded-full bg-gray-300'></div>
          <div className='mb-2 h-4 w-4/5 rounded-full bg-gray-300'></div>
          <div className='mb-2 h-4 w-2/3 rounded-full bg-gray-300'></div>
          <div className='h-4 w-1/4 rounded-full bg-gray-300'></div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
