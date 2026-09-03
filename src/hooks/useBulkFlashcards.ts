import { useState, useCallback } from 'react';
import { Flashcard } from '@/types/flashcard';
import { DataSource } from '@/types/dataSource';
import { API_ENDPOINTS } from '@/constants/endpoints';

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

export const useBulkFlashcards = (source?: DataSource) => {
  const [selectedFlashcards, setSelectedFlashcards] = useState<Set<string>>(
    new Set(),
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isBulkModeEnabled, setIsBulkModeEnabled] = useState(false);

  const selectFlashcard = useCallback((id: string) => {
    setSelectedFlashcards((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const unselectFlashcard = useCallback((id: string) => {
    setSelectedFlashcards((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleSelectFlashcard = useCallback((id: string) => {
    setSelectedFlashcards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback((items: (Flashcard | string)[]) => {
    const ids = items
      .map((item) => (typeof item === 'string' ? item : item._id))
      .filter((id): id is string => typeof id === 'string' && id.length > 0);
    setSelectedFlashcards(new Set(ids));
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
        const response = await fetch(API_ENDPOINTS.FLASHCARDS_BULK(source), {
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

        clearSelection();
        return result.data;
      } catch (error) {
        console.error('Error during bulk update:', error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [selectedFlashcards, clearSelection, source],
  );

  return {
    selectedFlashcards,
    isUpdating,
    isBulkModeEnabled,
    enableBulkMode: () => setIsBulkModeEnabled(true),
    disableBulkMode: () => {
      setIsBulkModeEnabled(false);
      clearSelection();
    },
    toggleSelection: toggleSelectFlashcard,
    selectFlashcard,
    unselectFlashcard,
    selectAll,
    clearSelection,
    bulkUpdateProgression,
    isSelected: (id: string) => selectedFlashcards.has(id),
    getSelectedCount: () => selectedFlashcards.size,
  };
};
