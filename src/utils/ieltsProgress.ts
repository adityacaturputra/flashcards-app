import { IeltsChapter, IeltsModule, IeltsProgressData, IeltsOverallStats, IeltsModuleStats } from '@/types/ielts';

export const IELTS_PROGRESS_CACHE_KEY = 'ielts_progress_cache_v1';

/**
 * Safely retrieve locally cached IELTS progress from localStorage (fast SSR fallback).
 */
export function getCachedIeltsProgress(): IeltsProgressData {
  if (typeof window === 'undefined') {
    return {
      lastReadChapterId: null,
      completedChapterIds: [],
    };
  }

  try {
    const raw = localStorage.getItem(IELTS_PROGRESS_CACHE_KEY);
    if (!raw) {
      return {
        lastReadChapterId: null,
        completedChapterIds: [],
      };
    }
    const parsed = JSON.parse(raw);
    return {
      userId: parsed.userId || 'default-user',
      lastReadChapterId: parsed.lastReadChapterId || null,
      completedChapterIds: Array.isArray(parsed.completedChapterIds)
        ? parsed.completedChapterIds
        : [],
      lastUpdated: parsed.lastUpdated,
    };
  } catch (error) {
    console.warn('Failed to parse cached IELTS progress from localStorage:', error);
    return {
      lastReadChapterId: null,
      completedChapterIds: [],
    };
  }
}

/**
 * Safely write IELTS progress to local cache for offline resilience and fast initial load.
 */
export function setCachedIeltsProgress(data: IeltsProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(IELTS_PROGRESS_CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save IELTS progress to localStorage:', error);
  }
}

/**
 * Calculate overall completion stats across all available IELTS chapters.
 */
export function calculateOverallStats(
  completedChapterIds: string[],
  allChapters: IeltsChapter[]
): IeltsOverallStats {
  const validCompletedSet = new Set(
    completedChapterIds.filter((id) => allChapters.some((c) => c.id === id))
  );

  const completedCount = validCompletedSet.size;
  const totalCount = allChapters.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    completedCount,
    totalCount,
    percentage,
  };
}

/**
 * Calculate completion stats for a specific IELTS module.
 */
export function calculateModuleStats(
  completedChapterIds: string[],
  module: IeltsModule
): IeltsModuleStats {
  const totalCount = module.chapters.length;
  if (totalCount === 0) {
    return {
      moduleNumber: module.moduleNumber,
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      isFullyCompleted: false,
    };
  }

  const completedCount = module.chapters.filter((c) =>
    completedChapterIds.includes(c.id)
  ).length;

  const percentage = Math.round((completedCount / totalCount) * 100);
  const isFullyCompleted = completedCount === totalCount;

  return {
    moduleNumber: module.moduleNumber,
    completedCount,
    totalCount,
    percentage,
    isFullyCompleted,
  };
}
