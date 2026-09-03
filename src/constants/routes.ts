/**
 * Application Page Navigation Routes
 * Single source of truth for all internal client-side navigation.
 */
export const APP_ROUTES = {
  HOME: '/',
  MAPPING: '/mapping',
  SEARCH_TEMPLATES: '/search-templates',
  ADD_FLASHCARD: '/add-flashcard',
  ADD_CATEGORY: '/add-category',
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
