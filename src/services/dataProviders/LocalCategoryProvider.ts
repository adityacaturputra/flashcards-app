import fs from 'fs';
import path from 'path';
import { ICategoryDataProvider } from './types';
import { FlashcardCategory } from '@/types/flashcard';
import {
  FLASHCARD_CATEGORIES,
  getLocalCategories,
  LocalFlashcardCategory,
} from '@/data/flashcards';

const CATEGORIES_FILE_PATH = path.join(
  process.cwd(),
  'src/data/flashcards/categories.json',
);

export class LocalCategoryProvider implements ICategoryDataProvider {
  private static instance: LocalCategoryProvider;

  private constructor() {}

  public static getInstance(): LocalCategoryProvider {
    if (!LocalCategoryProvider.instance) {
      LocalCategoryProvider.instance = new LocalCategoryProvider();
    }
    return LocalCategoryProvider.instance;
  }

  public async getCategories(): Promise<FlashcardCategory[]> {
    return getLocalCategories().map((cat) => ({
      _id: cat._id,
      name: cat.name,
      description: cat.description,
    }));
  }

  public async addCategory(
    category: FlashcardCategory,
  ): Promise<FlashcardCategory> {
    const newId = category._id || `local_cat_${Date.now()}`;
    const newCategoryItem: LocalFlashcardCategory = {
      _id: newId,
      name: category.name,
      description: category.description,
    };

    FLASHCARD_CATEGORIES.push(newCategoryItem);
    this.persistToFile();

    return {
      _id: newCategoryItem._id,
      name: newCategoryItem.name,
      description: newCategoryItem.description,
    };
  }

  public async updateCategory(
    id: string,
    updates: Partial<FlashcardCategory>,
  ): Promise<FlashcardCategory | null> {
    const index = FLASHCARD_CATEGORIES.findIndex((c) => c._id === id);
    if (index === -1) return null;

    const current = FLASHCARD_CATEGORIES[index];
    const updatedItem: LocalFlashcardCategory = {
      ...current,
      name: updates.name !== undefined ? updates.name : current.name,
      description:
        updates.description !== undefined
          ? updates.description
          : current.description,
    };

    FLASHCARD_CATEGORIES[index] = updatedItem;
    this.persistToFile();

    return {
      _id: updatedItem._id,
      name: updatedItem.name,
      description: updatedItem.description,
    };
  }

  public async deleteCategory(id: string): Promise<FlashcardCategory | null> {
    const index = FLASHCARD_CATEGORIES.findIndex((c) => c._id === id);
    if (index === -1) return null;

    const removed = FLASHCARD_CATEGORIES.splice(index, 1)[0];
    this.persistToFile();

    return {
      _id: removed._id,
      name: removed.name,
      description: removed.description,
    };
  }

  private persistToFile(): void {
    try {
      fs.writeFileSync(
        CATEGORIES_FILE_PATH,
        JSON.stringify(FLASHCARD_CATEGORIES, null, 2),
        'utf8',
      );
    } catch (error) {
      console.error('Error persisting local categories to file:', error);
    }
  }
}
