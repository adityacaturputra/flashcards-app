'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Flashcard } from '@/types/flashcard';
import {
  ANKI_CONFIG,
  AnkiForecastDay,
  ReviewedTodayItem,
} from '@/types/anki';
import {
  getAnkiDailyQueue,
  getAnkiForecast,
} from '@/utils/ankiAlgorithm';

interface UseAnkiDeckOptions {
  flashcards: Flashcard[];
  isActive?: boolean;
  dailyTarget?: number;
}

export interface UseAnkiDeckReturn {
  // Current Card & Queue
  currentCard: Flashcard | null;
  activeQueue: Flashcard[];
  currentIndex: number;
  totalCardsToday: number;
  completedCount: number;

  // Real-time Anki Metrics
  remainingDueCount: number;
  remainingNewCount: number;
  isDeckComplete: boolean;
  isGoalCompletedToday: boolean;
  totalDueBacklog: number;
  totalNewPool: number;

  // Today's Reviewed Cards
  todayReviewedCards: ReviewedTodayItem[];
  todayReviewedCount: number;
  isTodayBoxOpen: boolean;
  openTodayBox: () => void;
  closeTodayBox: () => void;
  toggleTodayBox: () => void;

  // Limits & Progress
  dailyTarget: number;
  addExtraCards: (amount?: number) => void;

  // Actions
  handleCardReviewed: (cardId: string) => void;
  resetDeckSession: () => void;

  // 7-Day Forecast Modal Control
  forecast: AnkiForecastDay[];
  isForecastOpen: boolean;
  openForecast: () => void;
  closeForecast: () => void;
  toggleForecast: () => void;
}

export function useAnkiDeck({
  flashcards,
  isActive = false,
  dailyTarget = ANKI_CONFIG.DAILY_TARGET,
}: UseAnkiDeckOptions): UseAnkiDeckReturn {
  const [extraCardsCount, setExtraCardsCount] = useState(0);
  const [completedCardIds, setCompletedCardIds] = useState<Set<string>>(new Set());
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [isTodayBoxOpen, setIsTodayBoxOpen] = useState(false);

  // Snapshot of card IDs chosen for the active study session
  const [sessionCardIds, setSessionCardIds] = useState<string[]>([]);
  const [sessionDueIds, setSessionDueIds] = useState<Set<string>>(new Set());
  const [sessionNewIds, setSessionNewIds] = useState<Set<string>>(new Set());

  // Compute daily queue and 7-day forecast from full flashcards collection
  const totalTarget = dailyTarget + extraCardsCount;
  const dailyQueue = useMemo(() => {
    return getAnkiDailyQueue(flashcards, totalTarget);
  }, [flashcards, totalTarget]);

  const forecast = useMemo(() => {
    return getAnkiForecast(flashcards, ANKI_CONFIG.FORECAST_DAYS, dailyTarget);
  }, [flashcards, dailyTarget]);

  // Track session initialization to freeze session queue upon entering review mode
  const initializedSessionRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      setCompletedCardIds(new Set());
      setExtraCardsCount(0);
      setSessionCardIds([]);
      setSessionDueIds(new Set());
      setSessionNewIds(new Set());
      initializedSessionRef.current = false;
      return;
    }

    // When entering review mode or when extra cards requested, snapshot the session queue
    if (!initializedSessionRef.current || extraCardsCount > 0) {
      const qCardIds = dailyQueue.queue.map((c) => c._id!).filter(Boolean);
      const dueIds = new Set(dailyQueue.dueCards.map((c) => c._id!).filter(Boolean));
      const newIds = new Set(dailyQueue.newCards.map((c) => c._id!).filter(Boolean));

      setSessionCardIds(qCardIds);
      setSessionDueIds(dueIds);
      setSessionNewIds(newIds);
      initializedSessionRef.current = true;
    }
  }, [isActive, extraCardsCount, dailyQueue.queue, dailyQueue.dueCards, dailyQueue.newCards]);

  // Map card IDs in session to actual flashcard objects
  const cardMap = useMemo(() => {
    const map = new Map<string, Flashcard>();
    flashcards.forEach((c) => {
      if (c._id) map.set(c._id, c);
    });
    return map;
  }, [flashcards]);

  // Active queue remaining to review in this session
  const activeQueue = useMemo(() => {
    const remainingIds = sessionCardIds.filter((id) => !completedCardIds.has(id));
    return remainingIds.map((id) => cardMap.get(id)).filter(Boolean) as Flashcard[];
  }, [sessionCardIds, completedCardIds, cardMap]);

  const currentCard = activeQueue[0] ?? null;
  const totalCardsToday = sessionCardIds.length;
  const completedCount = completedCardIds.size;

  // Deck is complete if session had cards and all were reviewed, OR if today's goal is already met and queue is empty
  const isDeckComplete =
    isActive && (
      (totalCardsToday > 0 && activeQueue.length === 0) ||
      (totalCardsToday === 0 && dailyQueue.isGoalCompletedToday)
    );

  // Remaining due reviews vs new cards in the current session
  const remainingDueCount = useMemo(() => {
    return activeQueue.filter((c) => c._id && sessionDueIds.has(c._id)).length;
  }, [activeQueue, sessionDueIds]);

  const remainingNewCount = useMemo(() => {
    return activeQueue.filter((c) => c._id && sessionNewIds.has(c._id)).length;
  }, [activeQueue, sessionNewIds]);

  // Handle progression rating of current card
  const handleCardReviewed = useCallback((cardId: string) => {
    setCompletedCardIds((prev) => {
      const updated = new Set(prev);
      updated.add(cardId);
      return updated;
    });
  }, []);

  // Allow eager learners to study extra cards today
  const addExtraCards = useCallback(
    (amount: number = ANKI_CONFIG.EXTRA_INCREMENT) => {
      setExtraCardsCount((prev) => prev + amount);
    },
    [],
  );

  const resetDeckSession = useCallback(() => {
    setCompletedCardIds(new Set());
    setExtraCardsCount(0);
    initializedSessionRef.current = false;
  }, []);

  const openForecast = useCallback(() => setIsForecastOpen(true), []);
  const closeForecast = useCallback(() => setIsForecastOpen(false), []);
  const toggleForecast = useCallback(() => setIsForecastOpen((prev) => !prev), []);

  const openTodayBox = useCallback(() => setIsTodayBoxOpen(true), []);
  const closeTodayBox = useCallback(() => setIsTodayBoxOpen(false), []);
  const toggleTodayBox = useCallback(() => setIsTodayBoxOpen((prev) => !prev), []);

  return {
    currentCard,
    activeQueue,
    currentIndex: completedCount,
    totalCardsToday,
    completedCount,
    remainingDueCount,
    remainingNewCount,
    isDeckComplete,
    isGoalCompletedToday: dailyQueue.isGoalCompletedToday,
    totalDueBacklog: dailyQueue.totalDueBacklog,
    totalNewPool: dailyQueue.totalNewPool,
    todayReviewedCards: dailyQueue.todayReviewedCards,
    todayReviewedCount: dailyQueue.todayReviewedCount,
    isTodayBoxOpen,
    openTodayBox,
    closeTodayBox,
    toggleTodayBox,
    dailyTarget,
    addExtraCards,
    handleCardReviewed,
    resetDeckSession,
    forecast,
    isForecastOpen,
    openForecast,
    closeForecast,
    toggleForecast,
  };
}

export default useAnkiDeck;
