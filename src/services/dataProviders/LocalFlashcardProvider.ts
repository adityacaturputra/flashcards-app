import fs from 'fs';
import path from 'path';
import {
  BulkFlashcardReviewResult,
  BulkFlashcardReviewUpdate,
  IFlashcardDataProvider,
} from './types';
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
      repetitions: flashcard.repetitions ?? 0,
      interval: flashcard.interval ?? 0,
      easeFactor: flashcard.easeFactor ?? 2.5,
      lapses: flashcard.lapses ?? 0,
      lastReviewedDate: flashcard.lastReviewedDate
        ? new Date(flashcard.lastReviewedDate).toISOString()
        : undefined,
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

    const updatedLocalItem = this.applyUpdatesToLocalItem(
      FLASHCARDS_DATA[index],
      updates,
    );

    // Update in-memory array
    FLASHCARDS_DATA[index] = updatedLocalItem;
    this.persistToFile();

    return this.mapLocalToFlashcard(updatedLocalItem);
  }

  public async bulkUpdateFlashcards(
    updates: BulkFlashcardReviewUpdate[],
  ): Promise<BulkFlashcardReviewResult> {
    const indexById = new Map<string, number>();
    for (let i = 0; i < FLASHCARDS_DATA.length; i += 1) {
      indexById.set(FLASHCARDS_DATA[i]._id, i);
    }

    const updatedIds: string[] = [];
    const notFoundIds: string[] = [];
    const updatedFlashcards: Flashcard[] = [];

    for (const { id, patch } of updates) {
      const index = indexById.get(id);
      if (index === undefined) {
        notFoundIds.push(id);
        continue;
      }

      const updatedLocalItem = this.applyUpdatesToLocalItem(
        FLASHCARDS_DATA[index],
        patch,
      );
      FLASHCARDS_DATA[index] = updatedLocalItem;
      updatedIds.push(id);
      updatedFlashcards.push(this.mapLocalToFlashcard(updatedLocalItem));
    }

    if (updatedIds.length > 0) {
      this.persistToFile();
    }

    return { updatedIds, notFoundIds, updatedFlashcards };
  }

  private applyUpdatesToLocalItem(
    current: LocalFlashcard,
    updates: Partial<Flashcard>,
  ): LocalFlashcard {
    return {
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
      repetitions:
        updates.repetitions !== undefined
          ? updates.repetitions
          : current.repetitions,
      interval:
        updates.interval !== undefined ? updates.interval : current.interval,
      easeFactor:
        updates.easeFactor !== undefined
          ? updates.easeFactor
          : current.easeFactor,
      lapses: updates.lapses !== undefined ? updates.lapses : current.lapses,
      lastReviewedDate:
        updates.lastReviewedDate !== undefined
          ? updates.lastReviewedDate
            ? new Date(updates.lastReviewedDate).toISOString()
            : undefined
          : current.lastReviewedDate,
    };
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
      repetitions: item.repetitions ?? 0,
      interval: item.interval ?? 0,
      easeFactor: item.easeFactor ?? 2.5,
      lapses: item.lapses ?? 0,
      lastReviewedDate: item.lastReviewedDate
        ? new Date(item.lastReviewedDate)
        : undefined,
    };
  }
}
