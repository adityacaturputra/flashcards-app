'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Flashcard } from '../types/flashcard';

export interface PendingUpdate {
  id: string;
  flashcardId: string;
  flashcardQuestion: string;
  updates: Partial<Flashcard>;
  timestamp: number;
  retryCount: number;
}

const QUEUE_STORAGE_KEY = 'flashcard_update_queue';
const MAX_RETRIES = 3;

export const useOfflineUpdateQueue = (
  updateFlashcard: (id: string, flashcard: Partial<Flashcard>) => Promise<void>,
) => {
  const [pendingUpdates, setPendingUpdates] = useState<PendingUpdate[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  // Load pending updates from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PendingUpdate[];
        setPendingUpdates(parsed);
      }
    } catch (error) {
      console.error('Failed to load update queue:', error);
    }
  }, []);

  // Save pending updates to localStorage whenever they change
  useEffect(() => {
    try {
      if (pendingUpdates.length > 0) {
        localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(pendingUpdates));
      } else {
        localStorage.removeItem(QUEUE_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to save update queue:', error);
    }
  }, [pendingUpdates]);

  // Process the update queue - using ref to always get latest state
  const processQueue = useCallback(async () => {
    if (processingRef.current) {
      return;
    }

    setIsProcessing(true);

    // Get latest state
    setPendingUpdates((currentUpdates) => {
      if (currentUpdates.length === 0) {
        setIsProcessing(false);
        return currentUpdates;
      }

      processingRef.current = true;

      // Process all updates
      const processAsync = async () => {
        const failedUpdates: PendingUpdate[] = [];

        for (const update of currentUpdates) {
          try {
            await updateFlashcard(update.flashcardId, update.updates);
            // Success - not added to failedUpdates
          } catch (error) {
            console.error(`Failed to update flashcard ${update.flashcardId}:`, error);

            // Check if we should retry
            if (update.retryCount < MAX_RETRIES) {
              failedUpdates.push({
                ...update,
                retryCount: update.retryCount + 1,
              });
            } else {
              // Max retries reached - keep in queue but don't auto-retry
              failedUpdates.push(update);
            }
          }
        }

        processingRef.current = false;
        setIsProcessing(false);

        // Update state with failed updates
        setPendingUpdates(failedUpdates);
      };

      processAsync();

      return currentUpdates;
    });
  }, [updateFlashcard]);

  // Add an update to the queue
  const queueUpdate = useCallback(
    (flashcardId: string, question: string, updates: Partial<Flashcard>) => {
      const newUpdate: PendingUpdate = {
        id: `${flashcardId}-${Date.now()}`,
        flashcardId,
        flashcardQuestion: question,
        updates,
        timestamp: Date.now(),
        retryCount: 0,
      };

      setPendingUpdates((prev) => [...prev, newUpdate]);

      // Try to process immediately (with a small delay to avoid race conditions)
      setTimeout(() => processQueue(), 100);
    },
    [processQueue],
  );

  // Manually retry all failed updates
  const retryAll = useCallback(() => {
    processQueue();
  }, [processQueue]);

  // Clear all pending updates
  const clearQueue = useCallback(() => {
    setPendingUpdates([]);
  }, []);

  // Remove a specific update from the queue
  const removeUpdate = useCallback((updateId: string) => {
    setPendingUpdates((prev) => prev.filter((u) => u.id !== updateId));
  }, []);

  return {
    pendingUpdates,
    isProcessing,
    queueUpdate,
    retryAll,
    clearQueue,
    removeUpdate,
    processQueue,
    pendingCount: pendingUpdates.length,
  };
};

export default useOfflineUpdateQueue;
