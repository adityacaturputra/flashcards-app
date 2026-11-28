/**
 * Pure localStorage persistence helpers for Commute Studio configuration.
 * Safely validates stored values against current constants with fallback to defaults.
 */
import {
  COMMUTE_CARD_FILTER,
  COMMUTE_CARD_LIMITS,
  COMMUTE_CONFIG_STORAGE_KEY,
  COMMUTE_MODE,
  CommuteCardFilter,
  CommuteConfig,
  CommuteMode,
  DEFAULT_COMMUTE_CONFIG,
} from '@/types/commute';

const VALID_MODES = new Set<string>(Object.values(COMMUTE_MODE));
const VALID_FILTERS = new Set<string>(Object.values(COMMUTE_CARD_FILTER));

export function loadCommuteConfig(): CommuteConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_COMMUTE_CONFIG;
  }

  try {
    const raw = window.localStorage.getItem(COMMUTE_CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_COMMUTE_CONFIG;

    const parsed = JSON.parse(raw) as Partial<Record<keyof CommuteConfig, unknown>>;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return DEFAULT_COMMUTE_CONFIG;
    }

    return {
      mode:
        typeof parsed.mode === 'string' && VALID_MODES.has(parsed.mode)
          ? (parsed.mode as CommuteMode)
          : DEFAULT_COMMUTE_CONFIG.mode,
      filter:
        typeof parsed.filter === 'string' && VALID_FILTERS.has(parsed.filter)
          ? (parsed.filter as CommuteCardFilter)
          : DEFAULT_COMMUTE_CONFIG.filter,
      categoryId:
        typeof parsed.categoryId === 'string' && parsed.categoryId.trim().length > 0
          ? parsed.categoryId
          : DEFAULT_COMMUTE_CONFIG.categoryId,
      cardCount:
        typeof parsed.cardCount === 'number' &&
        Number.isFinite(parsed.cardCount) &&
        parsed.cardCount >= COMMUTE_CARD_LIMITS.MIN_COUNT
          ? Math.floor(parsed.cardCount)
          : DEFAULT_COMMUTE_CONFIG.cardCount,
      startIndex:
        typeof parsed.startIndex === 'number' &&
        Number.isFinite(parsed.startIndex) &&
        parsed.startIndex >= COMMUTE_CARD_LIMITS.MIN_START_INDEX
          ? Math.floor(parsed.startIndex)
          : DEFAULT_COMMUTE_CONFIG.startIndex,
      includeCollocations:
        typeof parsed.includeCollocations === 'boolean'
          ? parsed.includeCollocations
          : DEFAULT_COMMUTE_CONFIG.includeCollocations,
      includeTips:
        typeof parsed.includeTips === 'boolean'
          ? parsed.includeTips
          : DEFAULT_COMMUTE_CONFIG.includeTips,
      recallPauseSec:
        typeof parsed.recallPauseSec === 'number' &&
        Number.isFinite(parsed.recallPauseSec) &&
        parsed.recallPauseSec > 0
          ? parsed.recallPauseSec
          : DEFAULT_COMMUTE_CONFIG.recallPauseSec,
      syncToAnki:
        typeof parsed.syncToAnki === 'boolean'
          ? parsed.syncToAnki
          : DEFAULT_COMMUTE_CONFIG.syncToAnki,
    };
  } catch {
    return DEFAULT_COMMUTE_CONFIG;
  }
}

export function saveCommuteConfig(config: CommuteConfig): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COMMUTE_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage quota errors
  }
}
