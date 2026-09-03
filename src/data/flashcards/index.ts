// src/data/flashcards/index.ts
import flashcardsJson from './flashcards.json';
import categoriesJson from './categories.json';
import searchTemplatesJson from './searchTemplates.json';
import { Progression } from '@/types/flashcard';

export interface LocalFlashcard {
  _id: string;
  question: string;
  answer: string;
  progression: Progression | string;
  nextReviewDate: string;
  categories?: string[];
  dynamicFields?: Record<string, string>;
}

export interface LocalFlashcardCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface LocalSearchTemplate {
  _id: string;
  name: string;
  template: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const FLASHCARDS_DATA: LocalFlashcard[] = flashcardsJson as LocalFlashcard[];
export const FLASHCARD_CATEGORIES: LocalFlashcardCategory[] = categoriesJson as LocalFlashcardCategory[];
export const SEARCH_TEMPLATES: LocalSearchTemplate[] = searchTemplatesJson as LocalSearchTemplate[];

/**
 * Accessor utilities for agentic and application usage
 */
export function getAllLocalFlashcards(): LocalFlashcard[] {
  return FLASHCARDS_DATA;
}

export function getLocalFlashcardById(id: string): LocalFlashcard | undefined {
  return FLASHCARDS_DATA.find((fc) => fc._id === id);
}

export function getLocalFlashcardsByProgression(progression: Progression | string): LocalFlashcard[] {
  return FLASHCARDS_DATA.filter((fc) => fc.progression === progression);
}

export function getLocalFlashcardsByCategory(categoryIdOrName: string): LocalFlashcard[] {
  const category = FLASHCARD_CATEGORIES.find(
    (c) => c._id === categoryIdOrName || c.name.toLowerCase() === categoryIdOrName.toLowerCase(),
  );
  if (!category) return [];
  return FLASHCARDS_DATA.filter((fc) => fc.categories && fc.categories.includes(category._id));
}

export function searchLocalFlashcards(query: string): LocalFlashcard[] {
  const q = query.toLowerCase().trim();
  if (!q) return FLASHCARDS_DATA;
  return FLASHCARDS_DATA.filter(
    (fc) => fc.question.toLowerCase().includes(q) || fc.answer.toLowerCase().includes(q),
  );
}

export function getLocalCategories(): LocalFlashcardCategory[] {
  return FLASHCARD_CATEGORIES;
}

export function getLocalCategoryById(id: string): LocalFlashcardCategory | undefined {
  return FLASHCARD_CATEGORIES.find((c) => c._id === id);
}

export function getLocalFlashcardStats() {
  const total = FLASHCARDS_DATA.length;
  const progressionCounts: Record<string, number> = {};
  for (const fc of FLASHCARDS_DATA) {
    progressionCounts[fc.progression] = (progressionCounts[fc.progression] || 0) + 1;
  }
  return {
    total,
    progressionCounts,
    totalCategories: FLASHCARD_CATEGORIES.length,
    categories: FLASHCARD_CATEGORIES.map((c) => ({
      _id: c._id,
      name: c.name,
      count: FLASHCARDS_DATA.filter((fc) => fc.categories && fc.categories.includes(c._id)).length,
    })),
  };
}
