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
import { DataSource } from '@/types/dataSource';
import useDataSource from '@/hooks/useDataSource';
import useFlashcards from '@/hooks/useFlashcards';
import { useFlashcardCategories } from '@/hooks/useFlashcardCategories';
import { useOfflineUpdateQueue, PendingUpdate } from '@/hooks/useOfflineUpdateQueue';

type AppContextType = {
  flashcards: Flashcard[];
  loadFlashcards: (source?: DataSource) => Promise<Flashcard[] | undefined>;
  handleRefetchFlashCards: () => Promise<void>;
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  updateFlashcard: (id: string, flashcard: Partial<Flashcard>) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
  loading: boolean;
  loadingAction: boolean;
  categories: FlashcardCategory[];
  loadingCategories: boolean;
  // Data Source Toggle & Info
  dataSource: DataSource;
  setDataSource: (source: DataSource) => void;
  toggleDataSource: () => void;
  isLocal: boolean;
  isMongo: boolean;
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
  
  const { loadFlashcards, addFlashcard: apiAddFlashcard, updateFlashcard: apiUpdateFlashcard, deleteFlashcard: apiDeleteFlashcard } =
    useFlashcards(setFlashcards, setLoadingAction);
  const {
    categories,
    loading: loadingCategories,
    loadCategories,
  } = useFlashcardCategories();
  
  const loadFlashcardsRef = useRef(loadFlashcards);
  const loadCategoriesRef = useRef(loadCategories);

  useEffect(() => {
    loadFlashcardsRef.current = loadFlashcards;
    loadCategoriesRef.current = loadCategories;
  }, [loadFlashcards, loadCategories]);

  // Callback when data source changes
  const handleSourceChange = useCallback(async (newSource: DataSource) => {
    setLoading(true);
    await Promise.all([
      loadFlashcardsRef.current(newSource),
      loadCategoriesRef.current(newSource),
    ]);
    setLoading(false);
  }, []);

  // Dedicated useDataSource hook
  const { dataSource, setDataSource, toggleDataSource, isLocal, isMongo } =
    useDataSource(handleSourceChange);

  // Offline queue setup - wrapper function for API updates
  const performUpdate = useCallback(async (id: string, flashcard: Partial<Flashcard>) => {
    return apiUpdateFlashcard(id, flashcard, dataSource);
  }, [apiUpdateFlashcard, dataSource]);

  const {
    pendingUpdates,
    isProcessing: isProcessingQueue,
    queueUpdate,
    retryAll,
    clearQueue,
    processQueue,
  } = useOfflineUpdateQueue(performUpdate);

  // Initial data load on mount
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([
        loadFlashcardsRef.current(dataSource),
        loadCategoriesRef.current(dataSource),
      ]);
      setLoading(false);
    };

    initData();
  }, [dataSource]);

  const handleRefetchFlashCards = async () => {
    setLoading(true);
    await Promise.all([
      loadFlashcardsRef.current(dataSource),
      loadCategoriesRef.current(dataSource),
    ]);
    setLoading(false);
  };

  const addFlashcard = useCallback(
    async (flashcard: Flashcard) => {
      await apiAddFlashcard(flashcard, dataSource);
    },
    [apiAddFlashcard, dataSource],
  );

  const deleteFlashcard = useCallback(
    async (id: string) => {
      await apiDeleteFlashcard(id, dataSource);
    },
    [apiDeleteFlashcard, dataSource],
  );

  // Wrap updateFlashcard to try direct update first, then queue if it fails
  const updateFlashcard = useCallback(async (id: string, updates: Partial<Flashcard>) => {
    try {
      await apiUpdateFlashcard(id, updates, dataSource);
    } catch (error) {
      console.log('Update failed, adding to queue:', error);
      const flashcard = flashcards.find((f) => f._id === id);
      const question = flashcard?.question || 'Unknown Card';
      queueUpdate(id, question, updates);
    }
  }, [apiUpdateFlashcard, dataSource, queueUpdate, flashcards]);

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
        dataSource,
        setDataSource,
        toggleDataSource,
        isLocal,
        isMongo,
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
