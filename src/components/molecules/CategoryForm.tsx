// src/components/molecules/CategoryForm.tsx
'use client';
import React, { useState } from 'react';
import Button from '../atoms/Button';
import { useFlashcardCategories } from '@/hooks/useFlashcardCategories';
import Select from '../atoms/Select';
import { LuLoader, LuPlus, LuPencil, LuTrash2 } from 'react-icons/lu';
import { motion } from 'framer-motion';
import InputField from '../atoms/InputField';
import styles from './FlashcardForm.module.css';

interface CategoryFormProps {
  onClose: () => void;
  onSave: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onClose,
  onSave,
  onSelectCategory,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const { categories, loading, addCategory, updateCategory, deleteCategory } =
    useFlashcardCategories();

  const handleSubmit = async () => {
    if (selectedCategoryId) {
      await updateCategory(selectedCategoryId!, { name, description });
      onSelectCategory?.(selectedCategoryId!);
    } else {
      const newCategory = await addCategory({ name, description });
      if (newCategory) {
        onSelectCategory?.(newCategory._id!);
      }
    }
    onSave();
    onClose();
  };

  const handleCategorySelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    if (value === '') {
      setName('');
      setDescription('');
      setSelectedCategoryId('');
    } else {
      const selectedCategory = categories.find((cat) => cat._id === value);
      if (selectedCategory) {
        setName(selectedCategory.name);
        setDescription(selectedCategory.description || '');
        setSelectedCategoryId(selectedCategory._id!);
      }
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCategoryId) {
      await deleteCategory(selectedCategoryId);
      setName('');
      setDescription('');
      setSelectedCategoryId('');
      onSelectCategory?.('');
      onSave();
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-lg backdrop-blur-sm ${styles.cardContainer} ${styles.glassMorphism}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className='p-6'>
        {/* Header */}
        <div className='mb-6'>
          <div className='mb-2 flex items-center gap-3'>
            <div
              className='rounded-lg p-2'
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              {selectedCategoryId ? (
                <LuPencil className='h-5 w-5' />
              ) : (
                <LuPlus className='h-5 w-5' />
              )}
            </div>
            <h2 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl'>
              {selectedCategoryId ? 'Edit Category' : 'Add Category'}
            </h2>
          </div>
          <p className='text-sm' style={{ color: 'var(--muted-foreground)' }}>
            {selectedCategoryId
              ? 'Update your category details'
              : 'Create a new category for your flashcards'}
          </p>
        </div>

        {/* Form Fields */}
        <div className='mb-6 space-y-6'>
          <div>
            <label
              className='mb-2 block text-sm font-semibold'
              style={{ color: 'var(--foreground)' }}
            >
              Category Name
            </label>
            <InputField
              placeholder='Enter category name...'
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-base`}
            />
          </div>

          <div>
            <label
              className='mb-2 block text-sm font-semibold'
              style={{ color: 'var(--foreground)' }}
            >
              Description
            </label>
            <textarea
              placeholder='Enter category description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full resize-none rounded-lg border-2 px-4 py-3 text-base transition-colors focus:border-blue-500 focus:outline-none ${styles.inputFocus}`}
              style={{
                background: 'var(--input)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
              rows={3}
            />
          </div>
        </div>

        {/* Category List */}
        {categories.length > 0 && (
          <div className='mb-6'>
            <h3
              className='mb-4 text-lg font-semibold'
              style={{ color: 'var(--foreground)' }}
            >
              All Categories
            </h3>
            <div className='max-h-40 space-y-2 overflow-y-auto'>
              {categories.map((category) => (
                <motion.div
                  key={category._id}
                  className='flex items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm'
                  style={{
                    background: 'var(--muted)',
                    borderColor: 'var(--border)',
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className='flex-1'>
                    <h4
                      className='font-medium'
                      style={{ color: 'var(--foreground)' }}
                    >
                      {category.name}
                    </h4>
                    {category.description && (
                      <p
                        className='text-sm'
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <button
                      className='rounded-lg p-2 transition-all hover:scale-105'
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                      onClick={() => {
                        const selectedCategory = categories.find(
                          (cat) => cat._id === category._id,
                        );
                        if (selectedCategory) {
                          setName(selectedCategory.name);
                          setDescription(selectedCategory.description || '');
                          setSelectedCategoryId(selectedCategory._id!);
                        }
                      }}
                      title='Edit category'
                    >
                      <LuPencil className='h-3 w-3' />
                    </button>
                    <button
                      className='rounded-lg p-2 transition-all hover:scale-105'
                      style={{
                        background: 'var(--destructive)',
                        color: 'var(--destructive-foreground)',
                      }}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${category.name}"?`,
                          )
                        ) {
                          deleteCategory(category._id!);
                        }
                      }}
                      title='Delete category'
                    >
                      <LuTrash2 className='h-3 w-3' />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex gap-3'>
          <Button
            onClick={onClose}
            className={`flex-1 rounded-lg py-3 transition-all hover:scale-105 ${styles.modernButton} text-base font-semibold`}
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
            className={`flex-1 rounded-lg py-3 transition-all hover:scale-105 ${styles.modernButton} text-base font-semibold`}
          >
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <LuLoader className='h-4 w-4 animate-spin' />
                <span>Saving...</span>
              </div>
            ) : (
              <span>
                {selectedCategoryId ? 'Save Changes' : 'Add Category'}
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryForm;
