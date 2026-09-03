// src/hooks/useFlashcards.ts
'use client';
import { Flashcard } from '../types/flashcard';
import { DataSource } from '@/types/dataSource';
import { DEFAULT_DATA_SOURCE } from '@/constants/dataSource';
import { API_ENDPOINTS } from '@/constants/endpoints';

type UpdateFlashcards = React.Dispatch<React.SetStateAction<Flashcard[]>>;

const useFlashcards = (
  updateFlashcards: UpdateFlashcards,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const loadFlashcards = async (source: DataSource = DEFAULT_DATA_SOURCE) => {
    try {
      const response = await fetch(API_ENDPOINTS.FLASHCARDS(source));
      if (!response.ok) {
        throw new Error('Failed to fetch flashcards');
      }
      const flashcards: Flashcard[] = await response.json();
      updateFlashcards(flashcards);
      return flashcards;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const addFlashcard = async (flashcard: Flashcard, source?: DataSource) => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.FLASHCARDS(source), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcard),
      });
      if (!response.ok) {
        throw new Error('Failed to add flashcard');
      }
      const newFlashcard = await response.json();
      updateFlashcards((prev) => [newFlashcard, ...prev]);
      return newFlashcard;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateFlashcard = async (
    id: string,
    flashcard: Partial<Flashcard>,
    source?: DataSource,
  ) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.FLASHCARD_BY_ID(id, source), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...flashcard }),
      });
      if (!response.ok) {
        throw new Error('Failed to update flashcard');
      }
      const updatedFlashcard = await response.json();
      updateFlashcards((prev: Flashcard[]) =>
        prev.map((f) => (f._id === id ? { ...f, ...updatedFlashcard } : f)),
      );
      return updatedFlashcard;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteFlashcard = async (id: string, source?: DataSource) => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.FLASHCARD_BY_ID(id, source), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete flashcard');
      }
      const deletedFlashcard = await response.json();
      if (deletedFlashcard) {
        updateFlashcards((prev: Flashcard[]) =>
          prev.filter((f) => f._id !== id),
        );
      }
      return deletedFlashcard;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadFlashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
  };
};

export default useFlashcards;
