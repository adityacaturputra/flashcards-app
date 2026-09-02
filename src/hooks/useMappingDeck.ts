// src/hooks/useMappingDeck.ts
import { useState, useEffect, useCallback } from 'react';
import { MappingItem } from '@/types/mapping';

interface UseMappingDeckOptions {
  enableKeyboardShortcuts?: boolean;
}

interface UseMappingDeckReturn {
  deck: MappingItem[];
  currentIndex: number;
  currentItem: MappingItem | undefined;
  isRevealed: boolean;
  progressPercentage: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleShuffle: () => void;
  handleToggleReveal: () => void;
  setCurrentIndex: (index: number) => void;
}

/**
 * Custom Hook for managing Mapping Flashcard Study Deck state,
 * navigation, shuffling, reveal toggles, and keyboard shortcuts.
 */
export function useMappingDeck(
  initialItems: MappingItem[],
  options: UseMappingDeckOptions = { enableKeyboardShortcuts: true },
): UseMappingDeckReturn {
  const [deck, setDeck] = useState<MappingItem[]>(initialItems);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Sync deck whenever initial items change
  useEffect(() => {
    setDeck(initialItems);
    setCurrentIndex(0);
    setIsRevealed(false);
  }, [initialItems]);

  const currentItem = deck[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    }
  }, [currentIndex, deck.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(false);
    }
  }, [currentIndex]);

  const handleShuffle = useCallback(() => {
    setDeck((prevDeck) => [...prevDeck].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsRevealed(false);
  }, []);

  const handleToggleReveal = useCallback(() => {
    setIsRevealed((prev) => !prev);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!options.enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes when typing inside inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggleReveal();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options.enableKeyboardShortcuts, handleNext, handlePrev, handleToggleReveal]);

  const progressPercentage =
    deck.length > 0 ? ((currentIndex + 1) / deck.length) * 100 : 0;

  return {
    deck,
    currentIndex,
    currentItem,
    isRevealed,
    progressPercentage,
    handleNext,
    handlePrev,
    handleShuffle,
    handleToggleReveal,
    setCurrentIndex,
  };
}

export default useMappingDeck;
