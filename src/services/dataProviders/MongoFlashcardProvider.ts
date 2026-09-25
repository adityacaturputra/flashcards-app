import { IFlashcardDataProvider } from './types';
import { Flashcard } from '@/types/flashcard';
import FlashcardModel from '@/models/FlashcardModel';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

function mapMongoDocToFlashcard(
  doc: Record<string, unknown> & { _id?: unknown; categories?: unknown[] },
): Flashcard {
  return {
    ...(doc as unknown as Flashcard),
    _id: doc._id != null ? String(doc._id) : undefined,
    categories: Array.isArray(doc.categories)
      ? doc.categories.map((c) => String(c || '')).filter(Boolean)
      : [],
  };
}

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
    const docs = await FlashcardModel.find().lean();
    return docs.map((doc) =>
      mapMongoDocToFlashcard(
        doc as Record<string, unknown> & {
          _id?: unknown;
          categories?: unknown[];
        },
      ),
    );
  }

  public async addFlashcard(flashcard: Flashcard): Promise<Flashcard> {
    await dbConnect();
    const payload = { ...flashcard };
    if (payload._id && !mongoose.isValidObjectId(payload._id)) {
      delete payload._id;
    }
    const created = await FlashcardModel.create(payload);
    const obj = created.toObject ? created.toObject() : created;
    return mapMongoDocToFlashcard(
      obj as Record<string, unknown> & {
        _id?: unknown;
        categories?: unknown[];
      },
    );
  }

  public async updateFlashcard(
    id: string,
    updates: Partial<Flashcard>,
  ): Promise<Flashcard | null> {
    await dbConnect();
    const payload = { ...updates };
    delete payload._id;
    const updated = await FlashcardModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean();
    if (!updated) return null;
    return mapMongoDocToFlashcard(
      updated as Record<string, unknown> & {
        _id?: unknown;
        categories?: unknown[];
      },
    );
  }

  public async deleteFlashcard(id: string): Promise<Flashcard | null> {
    await dbConnect();
    const deleted = await FlashcardModel.findByIdAndDelete(id).lean();
    if (!deleted) return null;
    return mapMongoDocToFlashcard(
      deleted as Record<string, unknown> & {
        _id?: unknown;
        categories?: unknown[];
      },
    );
  }
}
