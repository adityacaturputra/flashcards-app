import { IFlashcardDataProvider } from './types';
import { Flashcard, Progression } from '@/types/flashcard';
import {
  getAllLocalFlashcards,
  getLocalFlashcardById,
  LocalFlashcard,
} from '@/data/flashcards';

export class LocalFlashcardProvider implements IFlashcardDataProvider {
  private static instance: LocalFlashcardProvider;

  private constructor() {}

  public static getInstance(): LocalFlashcardProvider {
    if (!LocalFlashcardProvider.instance) {
      LocalFlashcardProvider.instance = new LocalFlashcardProvider();
    }
    return LocalFlashcardProvider.instance;
  }

  public async getFlashcards(): Promise<Flashcard[]> {
    const localData = getAllLocalFlashcards();
    return localData.map((item) => this.mapLocalToFlashcard(item));
  }

  public async addFlashcard(flashcard: Flashcard): Promise<Flashcard> {
    // In local repository mode, returns the memory/constructed item
    return {
      ...flashcard,
      _id: flashcard._id || `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }

  public async updateFlashcard(
    id: string,
    updates: Partial<Flashcard>,
  ): Promise<Flashcard | null> {
    const existing = getLocalFlashcardById(id);
    if (!existing) {
      return {
        _id: id,
        question: updates.question || '',
        answer: updates.answer || '',
        progression: updates.progression || Progression.New,
        nextReviewDate: updates.nextReviewDate || new Date(),
        ...updates,
      } as Flashcard;
    }
    return {
      ...this.mapLocalToFlashcard(existing),
      ...updates,
    };
  }

  public async deleteFlashcard(id: string): Promise<Flashcard | null> {
    const existing = getLocalFlashcardById(id);
    if (!existing) return null;
    return this.mapLocalToFlashcard(existing);
  }

  private mapLocalToFlashcard(item: LocalFlashcard): Flashcard {
    return {
      _id: item._id,
      question: item.question,
      answer: item.answer,
      progression: item.progression as Progression,
      nextReviewDate: new Date(item.nextReviewDate),
      categories: item.categories,
      dynamicFields: item.dynamicFields,
    };
  }
}
