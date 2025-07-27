// src/services/flashcardCategoryService.ts
import FlashcardCategoryModel, {
  FlashcardCategory,
} from '../models/FlashcardCategoryModel';

class FlashcardCategoryService {
  private static instance: FlashcardCategoryService;

  private constructor() {}

  public static getInstance(): FlashcardCategoryService {
    if (!FlashcardCategoryService.instance) {
      FlashcardCategoryService.instance = new FlashcardCategoryService();
    }
    return FlashcardCategoryService.instance;
  }

  public async getCategories(): Promise<FlashcardCategory[]> {
    return await FlashcardCategoryModel.find();
  }

  public async addCategory(
    category: FlashcardCategory,
  ): Promise<FlashcardCategory> {
    const newCategory = await FlashcardCategoryModel.create(category);
    return newCategory;
  }

  public async updateCategory(
    id: string,
    category: Partial<FlashcardCategory>,
  ): Promise<FlashcardCategory | null> {
    return await FlashcardCategoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }

  public async deleteCategory(id: string): Promise<FlashcardCategory | null> {
    return await FlashcardCategoryModel.findByIdAndDelete(id);
  }
}

export default FlashcardCategoryService;
