import { DataSource } from '@/types/dataSource';
import { DEFAULT_DATA_SOURCE } from '@/constants/dataSource';
import { IFlashcardDataProvider, ICategoryDataProvider } from './types';
import { LocalFlashcardProvider } from './LocalFlashcardProvider';
import { MongoFlashcardProvider } from './MongoFlashcardProvider';
import { LocalCategoryProvider } from './LocalCategoryProvider';
import { MongoCategoryProvider } from './MongoCategoryProvider';

export class DataProviderFactory {
  public static getFlashcardProvider(
    source: DataSource = DEFAULT_DATA_SOURCE,
  ): IFlashcardDataProvider {
    switch (source) {
      case DataSource.MongoDB:
        return MongoFlashcardProvider.getInstance();
      case DataSource.Local:
      default:
        return LocalFlashcardProvider.getInstance();
    }
  }

  public static getCategoryProvider(
    source: DataSource = DEFAULT_DATA_SOURCE,
  ): ICategoryDataProvider {
    switch (source) {
      case DataSource.MongoDB:
        return MongoCategoryProvider.getInstance();
      case DataSource.Local:
      default:
        return LocalCategoryProvider.getInstance();
    }
  }
}
