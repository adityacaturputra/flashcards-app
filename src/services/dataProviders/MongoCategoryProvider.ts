import { ICategoryDataProvider } from './types';
import { FlashcardCategory } from '@/types/flashcard';
import FlashcardCategoryModel from '@/models/FlashcardCategoryModel';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

function mapMongoDocToCategory(
  doc: Record<string, unknown> & { _id?: unknown },
): FlashcardCategory {
  return {
    ...(doc as unknown as FlashcardCategory),
    _id: doc._id != null ? String(doc._id) : undefined,
  };
}

export class MongoCategoryProvider implements ICategoryDataProvider {
  private static instance: MongoCategoryProvider;

  private constructor() {}

  public static getInstance(): MongoCategoryProvider {
    if (!MongoCategoryProvider.instance) {
      MongoCategoryProvider.instance = new MongoCategoryProvider();
    }
    return MongoCategoryProvider.instance;
  }

  public async getCategories(): Promise<FlashcardCategory[]> {
    await dbConnect();
    const docs = await FlashcardCategoryModel.find().lean();
    return docs.map((doc) => mapMongoDocToCategory(doc as Record<string, unknown>));
  }

  public async addCategory(
    category: FlashcardCategory,
  ): Promise<FlashcardCategory> {
    await dbConnect();
    const payload = { ...category };
    if (payload._id && !mongoose.isValidObjectId(payload._id)) {
      delete payload._id;
    }
    const created = await FlashcardCategoryModel.create(payload);
    const obj = created.toObject ? created.toObject() : created;
    return mapMongoDocToCategory(obj as Record<string, unknown>);
  }

  public async updateCategory(
    id: string,
    updates: Partial<FlashcardCategory>,
  ): Promise<FlashcardCategory | null> {
    await dbConnect();
    const payload = { ...updates };
    delete payload._id;
    const updated = await FlashcardCategoryModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean();
    if (!updated) return null;
    return mapMongoDocToCategory(updated as Record<string, unknown>);
  }

  public async deleteCategory(id: string): Promise<FlashcardCategory | null> {
    await dbConnect();
    const deleted = await FlashcardCategoryModel.findByIdAndDelete(id).lean();
    if (!deleted) return null;
    return mapMongoDocToCategory(deleted as Record<string, unknown>);
  }
}
