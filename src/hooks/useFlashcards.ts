'use client';
import { Flashcard } from '../types/flashcard';

type UpdateFlashcards = React.Dispatch<React.SetStateAction<Flashcard[]>>;

const useFlashcards = (
  updateFlashcards: UpdateFlashcards,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const loadFlashcards = async () => {
    try {
      const response = await fetch('/api/flashcards');
      if (!response.ok) {
        throw new Error('Failed to fetch flashcards');
      }
      const flashcards = await response.json();

      updateFlashcards(flashcards);
    } catch (error) {
      console.error(error);
    }
  };

  const addFlashcard = async (flashcard: Flashcard) => {
    try {
      setLoading(false);
      const response = await fetch('/api/flashcards', {
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
      updateFlashcards((prev) => [...prev, newFlashcard]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateFlashcard = async (id: string, flashcard: Partial<Flashcard>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/flashcards?id=${id}`, {
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
        prev.map((f) => (f._id === id ? updatedFlashcard : f)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteFlashcard = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/flashcards?id=${id}`, {
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
      console.log({ deletedFlashcard });
      if (deletedFlashcard) {
        updateFlashcards((prev: Flashcard[]) =>
          prev.filter((f) => f._id !== id),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loadFlashcards, addFlashcard, updateFlashcard, deleteFlashcard };
};

export default useFlashcards;
