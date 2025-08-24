// src/hooks/useFlashcardCategories.ts
'use client';
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

const STORAGE_KEY = 'flashcardCategories';

export const useFlashcardCategories = (): UseFlashcardCategoriesReturnType => {
  const [categories, setCategories] = useState<FlashcardCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);

  // Save to localStorage whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flashcardCategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categoriesData: FlashcardCategory[] = await response.json();
      setCategories(categoriesData);

      // store latest in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriesData));
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
      setCategories((prev) => {
        const updated = [...prev, newCategory];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
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
      setCategories((prev) => {
        const updated = prev.map((c) =>
          c._id === updatedCategory._id ? updatedCategory : c,
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
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
        setCategories((prev) => {
          const updated = prev.filter((c) => c._id !== deletedCategory._id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    // Load from localStorage first (fast render)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCategories(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored categories', e);
      }
    } else {
      loadCategories();
    }
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
