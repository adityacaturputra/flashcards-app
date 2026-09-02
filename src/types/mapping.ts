// src/types/mapping.ts

export interface MappingItem {
  id: string;
  module: string; // e.g. "Gerunds", "Tenses", "Prepositions", "Conditionals"
  title: string; // e.g. "look forward to + V-ing (Gerund)"
  question: string; // e.g. "We always look forward to relax on the weekend."
  correction: string; // e.g. "to relax -> to relaxing"
  remarks: string; // Full markdown text with rules, examples, and LaTeX math formulas
  source?: string; // e.g. "Englishvit - English Pro Class"
  chapter?: string; // e.g. "Chapter 11: You are About to be Promoted"
  createdAt?: string;
  tags?: string[];
  notes?: string;
}

export type MappingViewMode = 'table' | 'flashcard';

export interface MappingFilterState {
  module: string | null;
  searchQuery: string;
}
