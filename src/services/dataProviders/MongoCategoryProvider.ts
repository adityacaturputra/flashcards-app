import { ICategoryDataProvider } from './types';
import { FlashcardCategory } from '@/types/flashcard';
import FlashcardCategoryModel from '@/models/FlashcardCategoryModel';
import dbConnect from '@/lib/dbConnect';

import mongoose from 'mongoose';

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
    return await FlashcardCategoryModel.find();
  }

  public async addCategory(
    category: FlashcardCategory,
  ): Promise<FlashcardCategory> {
    await dbConnect();
    const payload = { ...category };
    if (payload._id && !mongoose.isValidObjectId(payload._id)) {
      delete payload._id;
    }
    return await FlashcardCategoryModel.create(payload);
  }

  public async updateCategory(
    id: string,
    updates: Partial<FlashcardCategory>,
  ): Promise<FlashcardCategory | null> {
    await dbConnect();
    return await FlashcardCategoryModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
  }

  public async deleteCategory(id: string): Promise<FlashcardCategory | null> {
    await dbConnect();
    return await FlashcardCategoryModel.findByIdAndDelete(id);
  }
}
