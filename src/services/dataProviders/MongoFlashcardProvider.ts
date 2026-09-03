import { IFlashcardDataProvider } from './types';
import { Flashcard } from '@/types/flashcard';
import FlashcardModel from '@/models/FlashcardModel';
import dbConnect from '@/lib/dbConnect';

export class MongoFlashcardProvider implements IFlashcardDataProvider {
  private static instance: MongoFlashcardProvider;

  private constructor() {}

  public static getInstance(): MongoFlashcardProvider {
    if (!MongoFlashcardProvider.instance) {
      MongoFlashcardProvider.instance = new MongoFlashcardProvider();
    }
    return MongoFlashcardProvider.instance;
  }

  public async getFlashcards(): Promise<Flashcard[]> {
    await dbConnect();
    return await FlashcardModel.find();
  }

  public async addFlashcard(flashcard: Flashcard): Promise<Flashcard> {
    await dbConnect();
    return await FlashcardModel.create(flashcard);
  }

  public async updateFlashcard(
    id: string,
    updates: Partial<Flashcard>,
  ): Promise<Flashcard | null> {
    await dbConnect();
    return await FlashcardModel.findByIdAndUpdate(id, updates, { new: true });
  }

  public async deleteFlashcard(id: string): Promise<Flashcard | null> {
    await dbConnect();
    return await FlashcardModel.findByIdAndDelete(id);
  }
}
