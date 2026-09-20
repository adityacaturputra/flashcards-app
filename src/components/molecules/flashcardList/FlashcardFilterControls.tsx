// src/components/molecules/flashcardList/FlashcardFilterControls.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import {
  HiRefresh,
  HiSwitchHorizontal,
  HiXCircle,
} from 'react-icons/hi';
import FlashcardSortControls from '../FlashcardSortControls';
import { FlashcardCategory, FlashcardSortOption } from '@/types/flashcard';

export interface FlashcardFilterControlsProps {
  categories: FlashcardCategory[];
  loadingCategories: boolean;
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onOpenCategoryModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onOpenSearchTemplates: () => void;
  isBulkModeEnabled: boolean;
  selectedBulkCount: number;
  onToggleBulkMode: () => void;
  showQuestionAsAnswer: boolean;
  onToggleReverseQA: () => void;
  onRefresh: () => void;
  sortOption: FlashcardSortOption;
  onSortChange: (option: FlashcardSortOption) => void;
  totalCount: number;
}

export const FlashcardFilterControls: React.FC<FlashcardFilterControlsProps> = ({
  categories,
  loadingCategories,
  selectedCategoryId,
  onSelectCategory,
  onOpenCategoryModal,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenSearchTemplates,
  isBulkModeEnabled,
  selectedBulkCount,
  onToggleBulkMode,
  showQuestionAsAnswer,
  onToggleReverseQA,
  onRefresh,
  sortOption,
  onSortChange,
  totalCount,
}) => {
  return (
    <div className='mb-8 space-y-6'>
      {/* Category Filter and Management */}
      <div className='mb-3 sm:mb-4'>
        <h3 className='mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-sm font-semibold text-transparent sm:mb-3 sm:text-base'>
          Filter by Category
        </h3>

        {loadingCategories ? (
          <div className='flex items-center justify-center py-4'>
            <FiLoader
              className='h-6 w-6 animate-spin'
              style={{ color: 'var(--primary)' }}
            />
          </div>
        ) : (
          <div className='mb-3 flex flex-wrap gap-1 sm:gap-2'>
            <label
              className='flex cursor-pointer items-center gap-1 rounded-full border px-2 py-1 transition-all hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5'
              style={{
                background:
                  selectedCategoryId === ''
                    ? 'var(--primary)'
                    : 'var(--muted)',
                borderColor: 'var(--border)',
                color:
                  selectedCategoryId === ''
                    ? 'var(--primary-foreground)'
                    : 'var(--foreground)',
              }}
            >
              <input
                type='radio'
                name='categoryFilter'
                value=''
                checked={selectedCategoryId === ''}
                onChange={(e) => onSelectCategory(e.target.value)}
                className='sr-only'
              />
              <span className='text-xs font-medium'>All Categories</span>
            </label>
            {categories.map((category) => (
              <label
                key={category._id}
                className='flex cursor-pointer items-center gap-1 rounded-full border px-2 py-1 transition-all hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5'
                style={{
                  background:
                    selectedCategoryId === category._id
                      ? 'var(--primary)'
                      : 'var(--muted)',
                  borderColor: 'var(--border)',
                  color:
                    selectedCategoryId === category._id
                      ? 'var(--primary-foreground)'
                      : 'var(--foreground)',
                }}
              >
                <input
                  type='radio'
                  name='categoryFilter'
                  value={category._id}
                  checked={selectedCategoryId === category._id}
                  onChange={(e) => onSelectCategory(e.target.value)}
                  className='sr-only'
                />
                <span className='text-xs font-medium'>{category.name}</span>
              </label>
            ))}
            {/* Manage Categories Button */}
            <motion.button
              className='rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 sm:py-2 sm:text-sm'
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
              onClick={onOpenCategoryModal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='inline'>+</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Search and Action Controls */}
      <div className='relative'>
        <div className='flex flex-col gap-3 sm:flex-row'>
          <div className='flex flex-1 gap-2'>
            <div className='relative flex-1'>
              <input
                type='text'
                placeholder='Search flashcards...'
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className='w-full rounded-lg border-2 px-4 py-3 pr-10 text-base transition-colors focus:border-blue-500 focus:outline-none'
                style={{
                  background: 'var(--input)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              />
              {searchQuery && (
                <motion.button
                  className='hover:bg-opacity-10 absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 transition-colors'
                  onClick={onClearSearch}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiXCircle
                    className='h-5 w-5'
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                </motion.button>
              )}
            </div>
          </div>

          <div className='flex gap-2'>
            <motion.button
              className='rounded-lg p-3 transition-all hover:scale-105 hover:shadow-md'
              style={{
                background: 'var(--background)',
                color: '#4285f4', // Google Blue
                border: '1px solid var(--border)',
              }}
              onClick={onOpenSearchTemplates}
              whileTap={{ scale: 0.95 }}
              title='Search Template Settings'
            >
              <FaGoogle className='h-5 w-5' />
            </motion.button>

            {/* Bulk Selection Toggle */}
            <motion.button
              className='rounded-lg p-3 transition-all hover:scale-105 hover:shadow-md'
              style={{
                background: isBulkModeEnabled
                  ? selectedBulkCount > 0
                    ? 'var(--destructive)'
                    : 'var(--primary)'
                  : 'var(--background)',
                color: isBulkModeEnabled
                  ? selectedBulkCount > 0
                    ? 'var(--destructive-foreground)'
                    : 'var(--primary-foreground)'
                  : 'var(--foreground)',
                border: '1px solid var(--border)',
              }}
              onClick={onToggleBulkMode}
              whileTap={{ scale: 0.95 }}
              title={
                isBulkModeEnabled ? 'Disable Bulk Mode' : 'Enable Bulk Mode'
              }
            >
              {isBulkModeEnabled ? (
                <span className='text-xs font-bold'>
                  {selectedBulkCount > 0 ? selectedBulkCount : '✓'}
                </span>
              ) : (
                <span className='text-xs font-bold'>⚡</span>
              )}
            </motion.button>

            <motion.button
              className='rounded-lg p-3 transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none'
              style={{
                background: showQuestionAsAnswer
                  ? 'var(--primary)'
                  : 'var(--secondary)',
                color: showQuestionAsAnswer
                  ? 'var(--primary-foreground)'
                  : 'var(--secondary-foreground)',
              }}
              onClick={onToggleReverseQA}
              title='Toggle Question/Answer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiSwitchHorizontal className='h-5 w-5' />
            </motion.button>

            <motion.button
              className='rounded-lg p-3 transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none'
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
              onClick={onRefresh}
              title='Refresh Flashcards'
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiRefresh className='h-5 w-5' />
            </motion.button>
          </div>
        </div>

        {/* Sort Controls & Card Counter */}
        <FlashcardSortControls
          sortOption={sortOption}
          onSortChange={onSortChange}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default FlashcardFilterControls;
