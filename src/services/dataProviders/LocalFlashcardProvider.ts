import fs from 'fs';
import path from 'path';
import { IFlashcardDataProvider } from './types';
import { Flashcard, Progression } from '@/types/flashcard';
import {
  FLASHCARDS_DATA,
  getAllLocalFlashcards,
  LocalFlashcard,
} from '@/data/flashcards';

const FLASHCARDS_FILE_PATH = path.join(
  process.cwd(),
  'src/data/flashcards/flashcards.json',
);

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
    const newId =
      flashcard._id ||
      `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newLocalItem: LocalFlashcard = {
      _id: newId,
      question: flashcard.question || '',
      answer: flashcard.answer || '',
      progression: flashcard.progression || Progression.New,
      nextReviewDate: flashcard.nextReviewDate
        ? new Date(flashcard.nextReviewDate).toISOString()
        : new Date().toISOString(),
      categories: flashcard.categories || [],
      dynamicFields: flashcard.dynamicFields || {},
    };

    // Append to memory array
    FLASHCARDS_DATA.unshift(newLocalItem);
    this.persistToFile();

    return this.mapLocalToFlashcard(newLocalItem);
  }

  public async updateFlashcard(
    id: string,
    updates: Partial<Flashcard>,
  ): Promise<Flashcard | null> {
    const index = FLASHCARDS_DATA.findIndex((fc) => fc._id === id);

    if (index === -1) {
      // Create new if not found
      const newCard: Flashcard = {
        _id: id,
        question: updates.question || '',
        answer: updates.answer || '',
        progression: updates.progression || Progression.New,
        nextReviewDate: updates.nextReviewDate || new Date(),
        ...updates,
      } as Flashcard;
      return await this.addFlashcard(newCard);
    }

    const current = FLASHCARDS_DATA[index];
    const updatedLocalItem: LocalFlashcard = {
      ...current,
      question: updates.question !== undefined ? updates.question : current.question,
      answer: updates.answer !== undefined ? updates.answer : current.answer,
      progression:
        updates.progression !== undefined
          ? updates.progression
          : current.progression,
      nextReviewDate:
        updates.nextReviewDate !== undefined
          ? new Date(updates.nextReviewDate).toISOString()
          : current.nextReviewDate,
      categories:
        updates.categories !== undefined ? updates.categories : current.categories,
      dynamicFields:
        updates.dynamicFields !== undefined
          ? updates.dynamicFields
          : current.dynamicFields,
    };

    // Update in-memory array
    FLASHCARDS_DATA[index] = updatedLocalItem;
    this.persistToFile();

    return this.mapLocalToFlashcard(updatedLocalItem);
  }

  public async deleteFlashcard(id: string): Promise<Flashcard | null> {
    const index = FLASHCARDS_DATA.findIndex((fc) => fc._id === id);
    if (index === -1) return null;

    const removed = FLASHCARDS_DATA.splice(index, 1)[0];
    this.persistToFile();

    return this.mapLocalToFlashcard(removed);
  }

  private persistToFile(): void {
    try {
      fs.writeFileSync(
        FLASHCARDS_FILE_PATH,
        JSON.stringify(FLASHCARDS_DATA, null, 2),
        'utf8',
      );
    } catch (error) {
      console.error('Error persisting local flashcards to file:', error);
    }
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
