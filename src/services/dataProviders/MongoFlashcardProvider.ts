import {
  BulkFlashcardReviewResult,
  BulkFlashcardReviewUpdate,
  IFlashcardDataProvider,
} from './types';
import { Flashcard } from '@/types/flashcard';
import FlashcardModel from '@/models/FlashcardModel';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

function sanitizeMongoPatch(patch: Partial<Flashcard>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(patch)) {
    if (key === '_id' || value === undefined) continue;
    if (key === 'nextReviewDate' || key === 'lastReviewedDate') {
      sanitized[key] = value ? new Date(value as string | Date) : value;
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

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

  public async bulkUpdateFlashcards(
    updates: BulkFlashcardReviewUpdate[],
  ): Promise<BulkFlashcardReviewResult> {
    await dbConnect();
    const notFoundIds: string[] = [];
    const validIds: string[] = [];
    const bulkOps: Array<{
      updateOne: {
        filter: { _id: mongoose.Types.ObjectId };
        update: { $set: Record<string, unknown> };
      };
    }> = [];

    for (const { id, patch } of updates) {
      if (!mongoose.isValidObjectId(id)) {
        notFoundIds.push(id);
        continue;
      }
      const setPayload = sanitizeMongoPatch(patch);
      if (Object.keys(setPayload).length === 0) continue;

      validIds.push(id);
      bulkOps.push({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(id) },
          update: { $set: setPayload },
        },
      });
    }

    if (bulkOps.length === 0) {
      return { updatedIds: [], notFoundIds, updatedFlashcards: [] };
    }

    await FlashcardModel.bulkWrite(bulkOps, { ordered: false });

    const docs = await FlashcardModel.find({
      _id: { $in: validIds.map((id) => new mongoose.Types.ObjectId(id)) },
    }).lean();

    const updatedFlashcards = docs.map((doc) =>
      mapMongoDocToFlashcard(
        doc as Record<string, unknown> & {
          _id?: unknown;
          categories?: unknown[];
        },
      ),
    );

    const foundIdSet = new Set(
      updatedFlashcards.map((card) => card._id).filter(Boolean) as string[],
    );
    const updatedIds: string[] = [];
    for (const id of validIds) {
      if (foundIdSet.has(id)) {
        updatedIds.push(id);
      } else {
        notFoundIds.push(id);
      }
    }

    return { updatedIds, notFoundIds, updatedFlashcards };
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
