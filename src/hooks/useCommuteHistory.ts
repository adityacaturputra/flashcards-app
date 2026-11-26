'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  COMMUTE_HISTORY_STORAGE_KEY,
  COMMUTE_MAX_HISTORY_ITEMS,
  CommuteSessionRecord,
} from '@/types/commute';

export function useCommuteHistory() {
  const [history, setHistory] = useState<CommuteSessionRecord[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMMUTE_HISTORY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CommuteSessionRecord[];
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const saveSession = useCallback((record: CommuteSessionRecord) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== record.id);
      const next = [record, ...filtered].slice(0, COMMUTE_MAX_HISTORY_ITEMS);
      try {
        localStorage.setItem(COMMUTE_HISTORY_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(COMMUTE_HISTORY_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    history,
    latestSession: history[0] ?? null,
    saveSession,
    clearHistory,
  };
}
