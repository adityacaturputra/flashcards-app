/**
 * API Base URL and Relative Endpoint Path Constants
 * Eliminates all hardcoded API route path strings.
 */
export const API_BASE = '/api';

export const API_PATHS = {
  BASE: API_BASE,
  FLASHCARDS: `${API_BASE}/flashcards`,
  FLASHCARDS_BULK: `${API_BASE}/flashcards/bulk`,
  FLASHCARDS_DELETE_BY_DATE: `${API_BASE}/flashcards/delete-by-date`,
  FLASHCARDS_DELETE_BY_TEXT: `${API_BASE}/flashcards/delete-by-text`,
  FLASHCARD_CATEGORIES: `${API_BASE}/flashcardCategories`,
  GENERATE_FLASHCARDS: `${API_BASE}/generateFlashcards`,
  SEARCH_TEMPLATES: `${API_BASE}/searchTemplates`,
} as const;

export type ApiPath = (typeof API_PATHS)[keyof typeof API_PATHS];
