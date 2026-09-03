import { ICategoryDataProvider } from './types';
import { FlashcardCategory } from '@/types/flashcard';
import { getLocalCategories, getLocalCategoryById } from '@/data/flashcards';

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
    return {
      ...category,
      _id: category._id || `local_cat_${Date.now()}`,
    };
  }

  public async updateCategory(
    id: string,
    updates: Partial<FlashcardCategory>,
  ): Promise<FlashcardCategory | null> {
    const existing = getLocalCategoryById(id);
    return {
      _id: id,
      name: updates.name || existing?.name || '',
      description: updates.description || existing?.description || '',
    };
  }

  public async deleteCategory(id: string): Promise<FlashcardCategory | null> {
    const existing = getLocalCategoryById(id);
    if (!existing) return null;
    return {
      _id: existing._id,
      name: existing.name,
      description: existing.description,
    };
  }
}
