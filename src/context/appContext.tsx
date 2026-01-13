// src/context/appContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  useCallback,
} from 'react';
import { Flashcard, FlashcardCategory } from '../types/flashcard';
import useFlashcards from '@/hooks/useFlashcards';
import { useFlashcardCategories } from '@/hooks/useFlashcardCategories';
import { useOfflineUpdateQueue, PendingUpdate } from '@/hooks/useOfflineUpdateQueue';

type AppContextType = {
  flashcards: Flashcard[];
  loadFlashcards: () => Promise<void>;
  handleRefetchFlashCards: () => Promise<void>;
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  updateFlashcard: (id: string, flashcard: Partial<Flashcard>) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
  loading: boolean;
  loadingAction: boolean;
  categories: FlashcardCategory[];
  loadingCategories: boolean;
  // Offline queue
  pendingUpdates: PendingUpdate[];
  isProcessingQueue: boolean;
  retryQueue: () => void;
  clearQueue: () => void;
  processQueue: () => void;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const { loadFlashcards, addFlashcard, updateFlashcard: apiUpdateFlashcard, deleteFlashcard } =
    useFlashcards(setFlashcards, setLoadingAction);
  const {
    categories,
    loading: loadingCategories,
    loadCategories,
  } = useFlashcardCategories();
  const loadFlashcardsRef = useRef(loadFlashcards);

  // Offline queue setup - wrapper function for API updates
  const performUpdate = useCallback(async (id: string, flashcard: Partial<Flashcard>) => {
    return apiUpdateFlashcard(id, flashcard);
  }, [apiUpdateFlashcard]);

  const {
    pendingUpdates,
    isProcessing: isProcessingQueue,
    queueUpdate,
    retryAll,
    clearQueue,
    processQueue,
  } = useOfflineUpdateQueue(performUpdate);

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
    loadCategories();
  };

  // Wrap updateFlashcard to try direct update first, then queue if it fails
  const updateFlashcard = useCallback(async (id: string, updates: Partial<Flashcard>) => {
    try {
      // Try direct update first
      await apiUpdateFlashcard(id, updates);
    } catch (error) {
      // If update fails, add to queue with the flashcard question
      console.log('Update failed, adding to queue:', error);
      const flashcard = flashcards.find((f) => f._id === id);
      const question = flashcard?.question || 'Unknown Card';
      queueUpdate(id, question, updates);
    }
  }, [apiUpdateFlashcard, queueUpdate, flashcards]);

  return (
    <AppContext.Provider
      value={{
        flashcards,
        loadFlashcards,
        handleRefetchFlashCards,
        addFlashcard,
        updateFlashcard,
        deleteFlashcard,
        loading,
        loadingAction,
        categories,
        loadingCategories,
        pendingUpdates,
        isProcessingQueue,
        retryQueue: retryAll,
        clearQueue,
        processQueue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
