"use client"
// context/appContext.tsx
import React, { createContext, useContext, useState, useEffect, useRef, PropsWithChildren } from 'react';

import { Flashcard } from '../types/flashcard';
import useFlashcards from '@/hooks/useFlashcards';

type AppContextType = {
  flashcards: Flashcard[];
  loadFlashcards: () => Promise<void>;
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  updateFlashcard: (id: string, flashcard: Partial<Flashcard>) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
  loading: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const { loadFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } = useFlashcards(setFlashcards);
  const [loading, setLoading] = useState<boolean>(true);

  // Create a ref for the loadFlashcards function
  const loadFlashcardsRef = useRef(loadFlashcards);

  useEffect(() => {
    // Update the ref whenever the loadFlashcards function changes
    loadFlashcardsRef.current = loadFlashcards;
  }, [loadFlashcards]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadFlashcardsRef.current(); // Use the ref to call the function
      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  return (
    <AppContext.Provider value={{ flashcards, loadFlashcards, addFlashcard, updateFlashcard, deleteFlashcard, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;