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
    <div className='space-y-4 p-4'>
      <h2 className='text-lg font-bold'>
        {selectedCategoryId ? 'Edit Category' : 'Add Category'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
      />
      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
      />
      {categories.length > 0 && !selectedCategoryId && (
        <div className='mt-4'>
          <Select
            label='Select Category'
            options={categories.map((cat) => ({
              value: cat._id!,
              label: cat.name,
            }))}
            value={selectedCategoryId}
            onChange={handleCategorySelect}
            className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
          />
        </div>
      )}
      <div className='flex justify-end space-x-2'>
        {selectedCategoryId && (
          <Button
            onClick={handleDeleteCategory}
            className='bg-red-500 hover:bg-red-600'
          >
            Delete
          </Button>
        )}
        <Button onClick={onClose} className='bg-red-500 hover:bg-red-600'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-green-500 hover:bg-green-600'
        >
          {loading && (
            <div className='flex animate-spin items-center justify-center'>
              <LuLoader />
            </div>
          )}
          {selectedCategoryId ? 'Save' : 'Add'}
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
