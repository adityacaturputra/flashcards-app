'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CategoryForm from '@/components/molecules/CategoryForm';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';

const AddCategoryPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleCloseCategoryModal = () => {
    router.back();
  };

  const handleSaveCategory = () => {
    router.back();
  };

  return (
    <div
      className='min-h-screen'
      style={{
        background: 'var(--background)',
      }}
    >
      {/* Compact Header */}
      <header
        className='backdrop-blur-glass sticky top-0 z-50 border-b'
        style={{
          borderColor: 'var(--border)',
          background: 'var(--background)',
        }}
      >
        <div className='mx-auto max-w-4xl px-3 py-2 sm:px-4 sm:py-3'>
          <div className='flex items-center gap-3'>
            <motion.button
              className='rounded-lg p-1.5 transition-all hover:scale-105'
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
              onClick={handleGoBack}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className='h-4 w-4' />
            </motion.button>

            <h1 className='gradient-text-accent text-lg font-bold sm:text-xl'>
              Manage Categories
            </h1>
          </div>
        </div>
      </header>

      {/* Compact Main Content */}
      <main className='mx-auto max-w-4xl px-3 py-3 sm:px-4 sm:py-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CategoryForm
            onClose={handleCloseCategoryModal}
            onSave={handleSaveCategory}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default AddCategoryPage;
