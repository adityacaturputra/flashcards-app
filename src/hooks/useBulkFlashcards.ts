import { useState, useCallback } from 'react';
import { Flashcard } from '@/types/flashcard';

interface BulkUpdateResult {
  total: number;
  successful: number;
  failed: number;
  changed: number;
  noChange: number;
  action: string;
  results: Array<{
    id: string;
    success: boolean;
    flashcard?: Flashcard;
    error?: string;
  }>;
}

export const useBulkFlashcards = () => {
  const [selectedFlashcards, setSelectedFlashcards] = useState<Set<string>>(
    new Set(),
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isBulkModeEnabled, setIsBulkModeEnabled] = useState(false);

  const toggleSelection = useCallback((flashcardId: string) => {
    setSelectedFlashcards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(flashcardId)) {
        newSet.delete(flashcardId);
      } else {
        newSet.add(flashcardId);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback((flashcardIds: string[]) => {
    console.log('selectAll called with:', flashcardIds);
    setSelectedFlashcards(new Set(flashcardIds));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedFlashcards(new Set());
  }, []);

  const bulkUpdateProgression = useCallback(
    async (
      action: 'increase' | 'current' | 'decrease',
    ): Promise<BulkUpdateResult | null> => {
      if (selectedFlashcards.size === 0) {
        throw new Error('No flashcards selected');
      }

      setIsUpdating(true);

      try {
        const response = await fetch('/api/flashcards/bulk', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            flashcardIds: Array.from(selectedFlashcards),
            action,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Bulk update failed');
        }

        // Clear selection after successful update
        clearSelection();

        return result.data;
      } catch (error) {
        console.error('Bulk update failed:', error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [selectedFlashcards, clearSelection],
  );

  const isSelected = useCallback(
    (flashcardId: string) => {
      return selectedFlashcards.has(flashcardId);
    },
    [selectedFlashcards],
  );

  const getSelectedCount = useCallback(() => {
    return selectedFlashcards.size;
  }, [selectedFlashcards]);

  const enableBulkMode = useCallback(() => {
    console.log('Enabling bulk mode - clearing selections');
    setIsBulkModeEnabled(true);
    setSelectedFlashcards(new Set()); // Clear any existing selections
  }, []);

  const disableBulkMode = useCallback(() => {
    setIsBulkModeEnabled(false);
    setSelectedFlashcards(new Set());
  }, []);

  return {
    selectedFlashcards: Array.from(selectedFlashcards),
    isUpdating,
    isBulkModeEnabled,
    toggleSelection,
    selectAll,
    clearSelection,
    bulkUpdateProgression,
    isSelected,
    getSelectedCount,
    enableBulkMode,
    disableBulkMode,
  };
};
