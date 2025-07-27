// src/hooks/useFlashcardCategories.ts
import { useState, useEffect } from 'react';
import { FlashcardCategory } from '@/types/flashcard';

type UseFlashcardCategoriesReturnType = {
  categories: FlashcardCategory[];
  loading: boolean;
  loadingAction: boolean;
  loadCategories: () => Promise<void>;
  addCategory: (
    category: FlashcardCategory,
  ) => Promise<FlashcardCategory | undefined>;
  updateCategory: (
    id: string,
    category: Partial<FlashcardCategory>,
  ) => Promise<FlashcardCategory | undefined>;
  deleteCategory: (id: string) => Promise<void>;
};

export const useFlashcardCategories = (): UseFlashcardCategoriesReturnType => {
  const [categories, setCategories] = useState<FlashcardCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flashcardCategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categoriesData: FlashcardCategory[] = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: FlashcardCategory) => {
    try {
      setLoadingAction(true);
      const response = await fetch('/api/flashcardCategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      const newCategory: FlashcardCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]);

      return newCategory;
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(false);
    }
  };

  const updateCategory = async (
    id: string,
    category: Partial<FlashcardCategory>,
  ) => {
    try {
      setLoadingAction(true);
      const response = await fetch('/api/flashcardCategories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...category }),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      const updatedCategory: FlashcardCategory = await response.json();
      setCategories((prev) =>
        prev.map((c) => (c._id === updatedCategory._id ? updatedCategory : c)),
      );
      return updatedCategory;
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setLoadingAction(true);
      const response = await fetch('/api/flashcardCategories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      const deletedCategory: FlashcardCategory = await response.json();
      if (deletedCategory) {
        setCategories((prev) =>
          prev.filter((c) => c._id !== deletedCategory._id),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    loadingAction,
    loadCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
