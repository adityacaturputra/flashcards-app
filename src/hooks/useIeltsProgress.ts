'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ALL_IELTS_CHAPTERS } from '@/data/ielts';
import { IeltsModule, IeltsOverallStats, IeltsModuleStats } from '@/types/ielts';
import {
  getCachedIeltsProgress,
  setCachedIeltsProgress,
  calculateOverallStats,
  calculateModuleStats,
} from '@/utils/ieltsProgress';

export function useIeltsProgress(userId: string = 'default-user') {
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>([]);
  const [lastReadChapterId, setLastReadChapterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lastReadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initialize from local cache immediately (fast hydration)
  useEffect(() => {
    const cached = getCachedIeltsProgress();
    setCompletedChapterIds(cached.completedChapterIds);
    setLastReadChapterId(cached.lastReadChapterId);
  }, []);

  // 2. Fetch latest data from MongoDB on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchFromDb() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/ielts/progress?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to fetch IELTS progress`);
        }
        const json = await res.json();
        if (json.success && json.data && isMounted) {
          const dbCompleted = json.data.completedChapterIds || [];
          const dbLastRead = json.data.lastReadChapterId || null;

          setCompletedChapterIds(dbCompleted);
          setLastReadChapterId(dbLastRead);

          // Update local cache
          setCachedIeltsProgress({
            userId,
            lastReadChapterId: dbLastRead,
            completedChapterIds: dbCompleted,
            lastUpdated: json.data.lastUpdated,
          });
        }
      } catch (err) {
        console.warn('Could not sync IELTS progress with MongoDB, using cached state:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Database sync failed');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchFromDb();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // 3. Helper to persist updates to MongoDB and local cache
  const syncToDatabase = useCallback(
    async (payload: { lastReadChapterId?: string | null; completedChapterIds?: string[]; action?: string; chapterId?: string }) => {
      try {
        setIsSyncing(true);
        const res = await fetch('/api/ielts/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            ...payload,
          }),
        });

        if (!res.ok) {
          console.warn('Failed to persist IELTS progress to MongoDB:', await res.text());
        }
      } catch (err) {
        console.warn('Network error while saving IELTS progress to MongoDB:', err);
      } finally {
        setIsSyncing(false);
      }
    },
    [userId]
  );

  // 4. Toggle completion status with Optimistic UI
  const toggleComplete = useCallback(
    (chapterId: string) => {
      setCompletedChapterIds((prev) => {
        const next = prev.includes(chapterId)
          ? prev.filter((id) => id !== chapterId)
          : [...prev, chapterId];

        // Save immediately to local cache
        setCachedIeltsProgress({
          userId,
          lastReadChapterId,
          completedChapterIds: next,
          lastUpdated: new Date().toISOString(),
        });

        // Fire and forget to MongoDB
        syncToDatabase({
          action: 'toggle',
          chapterId,
        });

        return next;
      });
    },
    [userId, lastReadChapterId, syncToDatabase]
  );

  // 5. Mark complete directly (idempotent)
  const markComplete = useCallback(
    (chapterId: string) => {
      setCompletedChapterIds((prev) => {
        if (prev.includes(chapterId)) return prev;
        const next = [...prev, chapterId];

        setCachedIeltsProgress({
          userId,
          lastReadChapterId,
          completedChapterIds: next,
          lastUpdated: new Date().toISOString(),
        });

        syncToDatabase({
          completedChapterIds: next,
        });

        return next;
      });
    },
    [userId, lastReadChapterId, syncToDatabase]
  );

  // 6. Update last read chapter (debounced to avoid spamming MongoDB on fast scroll/clicks)
  const setLastRead = useCallback(
    (chapterId: string) => {
      setLastReadChapterId((prev) => {
        if (prev === chapterId) return prev;

        // Immediate cache update
        setCachedIeltsProgress({
          userId,
          lastReadChapterId: chapterId,
          completedChapterIds,
          lastUpdated: new Date().toISOString(),
        });

        // Debounce MongoDB sync by 500ms
        if (lastReadTimeoutRef.current) {
          clearTimeout(lastReadTimeoutRef.current);
        }
        lastReadTimeoutRef.current = setTimeout(() => {
          syncToDatabase({ lastReadChapterId: chapterId });
        }, 500);

        return chapterId;
      });
    },
    [userId, completedChapterIds, syncToDatabase]
  );

  // 7. Check if a chapter is completed
  const isCompleted = useCallback(
    (chapterId: string) => {
      return completedChapterIds.includes(chapterId);
    },
    [completedChapterIds]
  );

  // 8. Overall progress statistics
  const overallStats: IeltsOverallStats = useMemo(() => {
    return calculateOverallStats(completedChapterIds, ALL_IELTS_CHAPTERS);
  }, [completedChapterIds]);

  // 9. Module progress statistics helper
  const getModuleStats = useCallback(
    (mod: IeltsModule): IeltsModuleStats => {
      return calculateModuleStats(completedChapterIds, mod);
    },
    [completedChapterIds]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (lastReadTimeoutRef.current) {
        clearTimeout(lastReadTimeoutRef.current);
      }
    };
  }, []);

  return {
    completedChapterIds,
    lastReadChapterId,
    isLoading,
    isSyncing,
    error,
    toggleComplete,
    markComplete,
    setLastRead,
    isCompleted,
    overallStats,
    getModuleStats,
  };
}

export default useIeltsProgress;
