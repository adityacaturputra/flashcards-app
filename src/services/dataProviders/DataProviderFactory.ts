import { DataSource } from '@/types/dataSource';
import { DEFAULT_DATA_SOURCE } from '@/constants/dataSource';
import { SyncSource, SyncTarget, SYNC_SOURCE } from '@/types/sync';
import { IFlashcardDataProvider, ICategoryDataProvider } from './types';
import { LocalFlashcardProvider } from './LocalFlashcardProvider';
import { MongoFlashcardProvider } from './MongoFlashcardProvider';
import { LocalCategoryProvider } from './LocalCategoryProvider';
import { MongoCategoryProvider } from './MongoCategoryProvider';

export class DataProviderFactory {
  /**
   * Retrieves flashcard data provider instance according to DataSource enum
   */
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

  /**
   * Semantic factory helpers for explicit Local vs Cloud data sources
   */
  public static getLocalFlashcardProvider(): IFlashcardDataProvider {
    return this.getFlashcardProvider(DataSource.Local);
  }

  public static getCloudFlashcardProvider(): IFlashcardDataProvider {
    return this.getFlashcardProvider(DataSource.MongoDB);
  }

  /**
   * Resolves flashcard provider from a target descriptor (SyncSource | SyncTarget | DataSource)
   */
  public static getFlashcardProviderByTarget(
    target: SyncSource | SyncTarget | DataSource,
  ): IFlashcardDataProvider {
    return target === SYNC_SOURCE.CLOUD || target === DataSource.MongoDB
      ? this.getCloudFlashcardProvider()
      : this.getLocalFlashcardProvider();
  }

  /**
   * Retrieves category data provider instance according to DataSource enum
   */
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

export default DataProviderFactory;
