import { useState, useMemo } from 'react';
import { Flashcard, FlashcardSortOption, progressionOrder } from '@/types/flashcard';

export interface UseFlashcardSortReturn {
  sortOption: FlashcardSortOption;
  setSortOption: (option: FlashcardSortOption) => void;
  sortedFlashcards: Flashcard[];
  totalCount: number;
}

/**
 * Custom hook to handle multi-mode flashcard sorting:
 * - 'recent': Prioritizes newly added flashcards (ObjectId timestamp + array index)
 * - 'progression': Standard spaced-repetition order (New -> Retry -> Hard -> ...)
 * - 'alphabetical': A to Z sorting by card question
 */
export function useFlashcardSort(
  allFlashcards: Flashcard[],
  filteredFlashcards: Flashcard[],
  isReviewMode: boolean = false,
  initialSort: FlashcardSortOption = 'recent'
): UseFlashcardSortReturn {
  const [sortOption, setSortOption] = useState<FlashcardSortOption>(initialSort);

  // Map card _id to original index in flashcards array for recency preservation
  const cardIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    allFlashcards.forEach((card, index) => {
      if (card._id) {
        map.set(card._id, index);
      }
    });
    return map;
  }, [allFlashcards]);

  const sortedFlashcards = useMemo(() => {
    if (isReviewMode) return filteredFlashcards;

    return [...filteredFlashcards].sort((a, b) => {
      if (sortOption === 'recent') {
        const aIndex = a._id ? (cardIndexMap.get(a._id) ?? 999999) : 999999;
        const bIndex = b._id ? (cardIndexMap.get(b._id) ?? 999999) : 999999;

        // Check ObjectId 4-byte timestamp if both have 24-char hex IDs
        const aIsHex = a._id && /^[0-9a-fA-F]{24}$/.test(a._id);
        const bIsHex = b._id && /^[0-9a-fA-F]{24}$/.test(b._id);
        if (aIsHex && bIsHex) {
          const aTs = parseInt(a._id!.substring(0, 8), 16);
          const bTs = parseInt(b._id!.substring(0, 8), 16);
          if (bTs !== aTs) {
            return bTs - aTs; // Newer timestamp first
          }
        }

        // Prepend / unshift order: lower index in original array = added more recently
        return aIndex - bIndex;
      }

      if (sortOption === 'alphabetical') {
        return a.question.localeCompare(b.question);
      }

      // Default progression sort
      const progressionComparison =
        progressionOrder[a.progression] - progressionOrder[b.progression];
      if (progressionComparison === 0) {
        return (
          new Date(a.nextReviewDate).getTime() -
          new Date(b.nextReviewDate).getTime()
        );
      }
      return progressionComparison;
    });
  }, [filteredFlashcards, isReviewMode, sortOption, cardIndexMap]);

  return {
    sortOption,
    setSortOption,
    sortedFlashcards,
    totalCount: sortedFlashcards.length,
  };
}
