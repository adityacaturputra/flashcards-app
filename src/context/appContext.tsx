// src/context/appContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
} from 'react';
import { Flashcard } from '../types/flashcard';
import useFlashcards from '@/hooks/useFlashcards';

type AppContextType = {
  flashcards: Flashcard[];
  loadFlashcards: () => Promise<void>;
  handleRefetchFlashCards: () => Promise<void>;
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
  const { loadFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } =
    useFlashcards(setFlashcards);
  const [loading, setLoading] = useState<boolean>(true);
  const loadFlashcardsRef = useRef(loadFlashcards);

  useEffect(() => {
    loadFlashcardsRef.current = loadFlashcards;
  }, [loadFlashcards]);

  useEffect(() => {
    const fetchData = async () => {
      const localFlashcards = JSON.parse(
        localStorage.getItem('flashcards') || '[]',
      );

      if (localFlashcards.length > 0) {
        setFlashcards(localFlashcards);
        setLoading(false);
      } else {
        setLoading(true);
        await loadFlashcardsRef.current(); // Use the ref to call the function
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup to save flashcards to localStorage on component unmount
    return () => {
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
    };
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Save flashcards to localStorage whenever they change
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const handleRefetchFlashCards = async () => {
    setLoading(true);
    await loadFlashcardsRef.current(); // Use the ref to call the function
    setLoading(false);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  };

  return (
    <AppContext.Provider
      value={{
        flashcards,
        loadFlashcards,
        addFlashcard,
        updateFlashcard,
        deleteFlashcard,
        loading,
        handleRefetchFlashCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
