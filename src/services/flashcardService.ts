// services/flashcardService.ts
import FlashcardModel from '@/models/FlashcardModel';
import { Flashcard } from '@/types/flashcard';

import Observer from '@/utils/observer';

class FlashcardService {
  private static instance: FlashcardService;
  private _observer: Observer = new Observer();

  private constructor() {}

  public static getInstance(): FlashcardService {
    if (!FlashcardService.instance) {
      FlashcardService.instance = new FlashcardService();
    }
    return FlashcardService.instance;
  }

  public async getFlashcards(): Promise<Flashcard[]> {
    return await FlashcardModel.find();
  }

  public async addFlashcard(flashcard: Flashcard): Promise<Flashcard> {
    const newFlashcard = await FlashcardModel.create(flashcard);
    this._observer.notify();
    return newFlashcard;
  }

  public async updateFlashcard(
    id: string,
    flashcard: Partial<Flashcard>,
  ): Promise<Flashcard> {
    const updatedFlashcard = await FlashcardModel.findByIdAndUpdate(
      id,
      flashcard,
      { new: true },
    );
    this._observer.notify();
    return updatedFlashcard;
  }

  public async deleteFlashcard(id: string): Promise<Flashcard> {
    const updatedFlashcard = await FlashcardModel.findByIdAndDelete(id);
    this._observer.notify();
    return updatedFlashcard;
  }

  public subscribe(callback: () => void): () => void {
    return this._observer.subscribe(callback);
  }
}

export default FlashcardService;
