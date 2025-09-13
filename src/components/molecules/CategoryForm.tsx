// src/components/molecules/CategoryForm.tsx
'use client';
import React, { useState } from 'react';
import Button from '../atoms/Button';
import { useFlashcardCategories } from '@/hooks/useFlashcardCategories';
import Select from '../atoms/Select';
import { LuLoader } from 'react-icons/lu';

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
    <div className='space-y-3 sm:space-y-4 p-3 sm:p-4'>
      <h2 className='text-base sm:text-lg font-bold'>
        <span className='hidden sm:inline'>{selectedCategoryId ? 'Edit Category' : 'Add Category'}</span>
        <span className='sm:hidden'>{selectedCategoryId ? 'Edit' : 'Add'}</span>
      </h2>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full rounded border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 focus:border-blue-500 focus:outline-none text-sm sm:text-base'
      />
      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full rounded border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 focus:border-blue-500 focus:outline-none text-sm sm:text-base'
        rows={3}
      />
      {categories.length > 0 && !selectedCategoryId && (
        <div className='mt-3 sm:mt-4'>
          <Select
            label='Select Category'
            options={categories.map((cat) => ({
              value: cat._id!,
              label: cat.name,
            }))}
            value={selectedCategoryId}
            onChange={handleCategorySelect}
            className='w-full rounded border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 focus:border-blue-500 focus:outline-none text-sm sm:text-base'
          />
        </div>
      )}
      <div className='flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 sm:space-x-0'>
        {selectedCategoryId && (
          <Button
            onClick={handleDeleteCategory}
            className='bg-red-500 hover:bg-red-600 py-2 sm:py-2.5 text-sm sm:text-base order-3 sm:order-1'
          >
            Delete
          </Button>
        )}
        <Button onClick={onClose} className='bg-red-500 hover:bg-red-600 py-2 sm:py-2.5 text-sm sm:text-base order-2 sm:order-2'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-green-500 hover:bg-green-600 py-2 sm:py-2.5 text-sm sm:text-base order-1 sm:order-3'
        >
          {loading && (
            <div className='flex animate-spin items-center justify-center'>
              <LuLoader className='text-sm sm:text-base' />
            </div>
          )}
          {selectedCategoryId ? 'Save' : 'Add'}
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
