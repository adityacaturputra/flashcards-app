// src/hooks/useFlashcardFilter.ts
import { useState, useMemo, useCallback } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';

export interface UseFlashcardFilterProps {
  flashcards: Flashcard[];
  selectedProgression: Progression | null;
}

export interface UseFlashcardFilterReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  filteredFlashcards: Flashcard[];
}

/**
 * Custom hook to manage search query, category selection,
 * and filtered flashcards memoization.
 */
export function useFlashcardFilter({
  flashcards,
  selectedProgression,
}: UseFlashcardFilterProps): UseFlashcardFilterReturn {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const clearSearchQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  const filteredFlashcards = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    return flashcards.filter((flashcard) => {
      const progressionMatch =
        selectedProgression === null ||
        flashcard.progression === selectedProgression;

      const categoryMatch =
        selectedCategoryId === '' ||
        (flashcard.categories &&
          flashcard.categories.includes(selectedCategoryId));

      const searchMatch =
        trimmedQuery === '' ||
        flashcard.question.toLowerCase().includes(trimmedQuery) ||
        flashcard.answer.toLowerCase().includes(trimmedQuery);

      return progressionMatch && categoryMatch && searchMatch;
    });
  }, [flashcards, selectedProgression, selectedCategoryId, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredFlashcards,
  };
}

export default useFlashcardFilter;
