import { useState } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';

interface UseGenerateFlashcardsResult {
  aiGeneratedFlashcards: Flashcard[];
  selectedAiFlashcards: string[];
  isLoading: boolean;
  error: string | null;
  handleGenerateFlashcards: (prompt: string) => void;
  handleToggleAiFlashcardSelection: (key: string) => void;
  handleSaveSelectedAiFlashcards: () => void;
}

const useGenerateFlashcards = (
  addFlashcard: (flashcard: Flashcard) => Promise<void>,
): UseGenerateFlashcardsResult => {
  const [aiGeneratedFlashcards, setAiGeneratedFlashcards] = useState<
    Flashcard[]
  >([]);
  const [selectedAiFlashcards, setSelectedAiFlashcards] = useState<string[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFlashcards = async (prompt: string) => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generateFlashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data: Flashcard[] = await response.json();
      const dataWithKeys = data.map((e) => ({
        ...e,
        key: crypto.randomUUID(),
      }));
      const keys = dataWithKeys.map((e) => e.key);

      setAiGeneratedFlashcards(dataWithKeys);
      setSelectedAiFlashcards(keys);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error(error);
      alert('Error generating flashcards. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAiFlashcardSelection = (key: string) => {
    setSelectedAiFlashcards((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((selectedKey) => selectedKey !== key)
        : [...prevSelected, key],
    );
  };

  const handleSaveSelectedAiFlashcards = async () => {
    const selectedFlashcards = aiGeneratedFlashcards.filter((flashcard) =>
      selectedAiFlashcards.includes(flashcard.key!),
    );

    try {
      const responses = await Promise.all(
        selectedFlashcards.map(async (flashcard) => {
          await addFlashcard({
            question: flashcard.question,
            answer: flashcard.answer,
            progression: flashcard.progression || Progression.New,
            nextReviewDate: flashcard.nextReviewDate || new Date(),
            dynamicFields: flashcard.dynamicFields || {},
          });
        }),
      );

      if (responses) {
        setAiGeneratedFlashcards([]);
        setSelectedAiFlashcards([]);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error(error);
      alert('Error saving flashcards. Please try again later.');
    }
  };

  return {
    aiGeneratedFlashcards,
    selectedAiFlashcards,
    isLoading,
    error,
    handleGenerateFlashcards,
    handleToggleAiFlashcardSelection,
    handleSaveSelectedAiFlashcards,
  };
};

export default useGenerateFlashcards;
