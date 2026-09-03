import { Flashcard, FlashcardCategory } from '@/types/flashcard';

export interface IFlashcardDataProvider {
  getFlashcards(): Promise<Flashcard[]>;
  addFlashcard(flashcard: Flashcard): Promise<Flashcard>;
  updateFlashcard(id: string, updates: Partial<Flashcard>): Promise<Flashcard | null>;
  deleteFlashcard(id: string): Promise<Flashcard | null>;
}

export interface ICategoryDataProvider {
  getCategories(): Promise<FlashcardCategory[]>;
  addCategory(category: FlashcardCategory): Promise<FlashcardCategory>;
  updateCategory(id: string, updates: Partial<FlashcardCategory>): Promise<FlashcardCategory | null>;
  deleteCategory(id: string): Promise<FlashcardCategory | null>;
}
