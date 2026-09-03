import { DataSource } from '@/types/dataSource';
import { SOURCE_QUERY_PARAM } from './dataSource';
import { API_PATHS } from './apiPaths';
import { buildUrl, joinPaths } from '@/utils/urlBuilder';

export interface FlashcardQueryParams {
  id?: string;
  source?: DataSource;
}

export interface CategoryQueryParams {
  id?: string;
  source?: DataSource;
}

export interface SearchTemplateQueryParams {
  userId?: string;
}

/**
 * API Endpoint Registry using URL Builder and API Paths
 * Eliminates all hardcoded API URLs across the codebase.
 */
export const API_ENDPOINTS = {
  FLASHCARDS: (params?: FlashcardQueryParams | DataSource) => {
    if (!params) return API_PATHS.FLASHCARDS;
    if (typeof params === 'string') {
      return buildUrl(API_PATHS.FLASHCARDS, { [SOURCE_QUERY_PARAM]: params });
    }
    return buildUrl(API_PATHS.FLASHCARDS, {
      id: params.id,
      [SOURCE_QUERY_PARAM]: params.source,
    });
  },
  FLASHCARD_BY_ID: (id: string, source?: DataSource) =>
    buildUrl(API_PATHS.FLASHCARDS, { id, [SOURCE_QUERY_PARAM]: source }),
  FLASHCARDS_BULK: API_PATHS.FLASHCARDS_BULK,
  FLASHCARDS_DELETE_BY_DATE: API_PATHS.FLASHCARDS_DELETE_BY_DATE,
  FLASHCARDS_DELETE_BY_TEXT: API_PATHS.FLASHCARDS_DELETE_BY_TEXT,
  FLASHCARD_CATEGORIES: (params?: CategoryQueryParams | DataSource) => {
    if (!params) return API_PATHS.FLASHCARD_CATEGORIES;
    if (typeof params === 'string') {
      return buildUrl(API_PATHS.FLASHCARD_CATEGORIES, { [SOURCE_QUERY_PARAM]: params });
    }
    return buildUrl(API_PATHS.FLASHCARD_CATEGORIES, {
      id: params.id,
      [SOURCE_QUERY_PARAM]: params.source,
    });
  },
  CATEGORY_BY_ID: (id: string, source?: DataSource) =>
    buildUrl(API_PATHS.FLASHCARD_CATEGORIES, { id, [SOURCE_QUERY_PARAM]: source }),
  GENERATE_FLASHCARDS: API_PATHS.GENERATE_FLASHCARDS,
  SEARCH_TEMPLATES: (params?: SearchTemplateQueryParams | string) => {
    if (!params) return API_PATHS.SEARCH_TEMPLATES;
    const userId = typeof params === 'string' ? params: params.userId;
    return buildUrl(API_PATHS.SEARCH_TEMPLATES, { userId });
  },
  SEARCH_TEMPLATE_BY_ID: (
    id: string,
    params?: SearchTemplateQueryParams | string,
  ) => {
    const userId = typeof params === 'string' ? params: params?.userId;
    const basePath = joinPaths(API_PATHS.SEARCH_TEMPLATES, id);
    return buildUrl(basePath, { userId });
  },
} as const;
