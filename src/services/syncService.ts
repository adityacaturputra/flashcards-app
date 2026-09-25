/**
 * src/services/syncService.ts
 * Two-way synchronization engine between Local Repository (flashcards.json) and Cloud MongoDB.
 * Computes granular field-by-field diffs and executes push/pull synchronization.
 */

import { Flashcard, FlashcardCategory } from '@/types/flashcard';
import { DataProviderFactory } from './dataProviders/DataProviderFactory';
import {
  SyncCardDiff,
  SyncCategorySummary,
  SyncDiffReport,
  SyncExecutionResult,
  SyncFieldDiff,
  SyncSource,
  SyncTarget,
  SYNC_CARD_STATUS,
  SYNC_DIRECTION,
  SyncDirection,
  SYNC_SOURCE,
  SYNC_TARGET,
  SYNC_TARGET_LABEL,
} from '@/types/sync';

export * from '@/types/sync';

/**
 * Normalizes question string for fuzzy comparison fallback
 */
function normalizeQuestion(q?: string): string {
  return (q || '').trim().toLowerCase();
}

/**
 * Checks if two dates are essentially the same (within 60 seconds)
 */
function areDatesEqual(d1?: Date | string, d2?: Date | string): boolean {
  if (!d1 && !d2) return true;
  if (!d1 || !d2) return false;
  const t1 = new Date(d1).getTime();
  const t2 = new Date(d2).getTime();
  if (isNaN(t1) || isNaN(t2)) return false;
  return Math.abs(t1 - t2) < 60000;
}

/**
 * Compare two flashcard objects and extract granular field differences
 */
export function compareFlashcards(
  local: Flashcard,
  cloud: Flashcard,
  categoryNameMap?: Map<string, string>,
): SyncFieldDiff[] {
  const diffs: SyncFieldDiff[] = [];

  // Question
  if ((local.question || '').trim() !== (cloud.question || '').trim()) {
    diffs.push({
      field: 'question',
      label: 'Question',
      localValue: local.question,
      cloudValue: cloud.question,
    });
  }

  // Answer
  if ((local.answer || '').trim() !== (cloud.answer || '').trim()) {
    diffs.push({
      field: 'answer',
      label: 'Answer',
      localValue: local.answer,
      cloudValue: cloud.answer,
    });
  }

  // Progression
  if (local.progression !== cloud.progression) {
    diffs.push({
      field: 'progression',
      label: 'Progression State',
      localValue: local.progression,
      cloudValue: cloud.progression,
    });
  }

  // Next Review Date
  if (!areDatesEqual(local.nextReviewDate, cloud.nextReviewDate)) {
    diffs.push({
      field: 'nextReviewDate',
      label: 'Next Review Date',
      localValue: local.nextReviewDate ? new Date(local.nextReviewDate).toISOString() : null,
      cloudValue: cloud.nextReviewDate ? new Date(cloud.nextReviewDate).toISOString() : null,
    });
  }

  // Anki: Interval
  const localInterval = local.interval ?? 0;
  const cloudInterval = cloud.interval ?? 0;
  if (localInterval !== cloudInterval) {
    diffs.push({
      field: 'interval',
      label: 'Review Interval (days)',
      localValue: `${localInterval}d`,
      cloudValue: `${cloudInterval}d`,
    });
  }

  // Anki: Repetitions
  const localReps = local.repetitions ?? 0;
  const cloudReps = cloud.repetitions ?? 0;
  if (localReps !== cloudReps) {
    diffs.push({
      field: 'repetitions',
      label: 'Repetitions',
      localValue: localReps,
      cloudValue: cloudReps,
    });
  }

  // Anki: Ease Factor
  const localEase = Number((local.easeFactor ?? 2.5).toFixed(2));
  const cloudEase = Number((cloud.easeFactor ?? 2.5).toFixed(2));
  if (Math.abs(localEase - cloudEase) >= 0.01) {
    diffs.push({
      field: 'easeFactor',
      label: 'Ease Factor',
      localValue: `${Math.round(localEase * 100)}%`,
      cloudValue: `${Math.round(cloudEase * 100)}%`,
    });
  }

  // Anki: Lapses
  const localLapses = local.lapses ?? 0;
  const cloudLapses = cloud.lapses ?? 0;
  if (localLapses !== cloudLapses) {
    diffs.push({
      field: 'lapses',
      label: 'Lapses (Retry Count)',
      localValue: localLapses,
      cloudValue: cloudLapses,
    });
  }

  // Dynamic Fields
  const localDyn = JSON.stringify(local.dynamicFields || {});
  const cloudDyn = JSON.stringify(cloud.dynamicFields || {});
  if (localDyn !== cloudDyn) {
    diffs.push({
      field: 'dynamicFields',
      label: 'Dynamic Fields (Explanations/Notes)',
      localValue: local.dynamicFields || {},
      cloudValue: cloud.dynamicFields || {},
    });
  }

  // Categories
  const localCats = Array.from(new Set(local.categories || [])).sort();
  const cloudCats = Array.from(new Set(cloud.categories || [])).sort();
  const areCategoriesEqual =
    localCats.length === cloudCats.length &&
    localCats.every((c, idx) => c === cloudCats[idx]);

  if (!areCategoriesEqual) {
    const formatCategories = (catIds: string[]) => {
      if (catIds.length === 0) return '(None)';
      if (!categoryNameMap) return catIds.join(', ');
      return catIds.map((id) => categoryNameMap.get(id) || id).join(', ');
    };

    diffs.push({
      field: 'categories',
      label: 'Categories',
      localValue: formatCategories(localCats),
      cloudValue: formatCategories(cloudCats),
    });
  }

  return diffs;
}

export class SyncService {
  /**
   * Generates a comprehensive comparison report between Local and MongoDB flashcards & categories
   */
  public static async computeDiff(): Promise<SyncDiffReport> {
    const localProvider = DataProviderFactory.getLocalFlashcardProvider();
    const cloudProvider = DataProviderFactory.getCloudFlashcardProvider();
    const localCatProvider = DataProviderFactory.getLocalCategoryProvider();
    const cloudCatProvider = DataProviderFactory.getCloudCategoryProvider();

    // 1. Fetch categories to build name lookup and category diff summary
    let localCategories: FlashcardCategory[] = [];
    let cloudCategories: FlashcardCategory[] = [];
    try {
      [localCategories, cloudCategories] = await Promise.all([
        localCatProvider.getCategories(),
        cloudCatProvider.getCategories().catch(() => []),
      ]);
    } catch (e) {
      console.warn('Failed to fetch categories for sync diff:', e);
    }

    const categoryNameMap = new Map<string, string>();
    localCategories.forEach((c) => {
      if (c._id) categoryNameMap.set(c._id.toString(), c.name);
      categoryNameMap.set(c.name, c.name);
    });
    cloudCategories.forEach((c) => {
      if (c._id && !categoryNameMap.has(c._id.toString())) {
        categoryNameMap.set(c._id.toString(), c.name);
      }
      if (!categoryNameMap.has(c.name)) {
        categoryNameMap.set(c.name, c.name);
      }
    });

    const cloudCatNames = new Set(
      cloudCategories.map((c) => c.name.trim().toLowerCase()),
    );
    const localCatNames = new Set(
      localCategories.map((c) => c.name.trim().toLowerCase()),
    );

    const localOnlyCats = localCategories.filter(
      (c) => !cloudCatNames.has(c.name.trim().toLowerCase()),
    );
    const cloudOnlyCats = cloudCategories.filter(
      (c) => !localCatNames.has(c.name.trim().toLowerCase()),
    );

    const categorySummary: SyncCategorySummary = {
      totalLocal: localCategories.length,
      totalCloud: cloudCategories.length,
      localOnlyCount: localOnlyCats.length,
      cloudOnlyCount: cloudOnlyCats.length,
      localOnlyNames: localOnlyCats.map((c) => c.name),
      cloudOnlyNames: cloudOnlyCats.map((c) => c.name),
    };

    // 2. Fetch cards
    const localCards = await localProvider.getFlashcards();
    const cloudCards = await cloudProvider.getFlashcards();

    const localOnly: SyncCardDiff[] = [];
    const cloudOnly: SyncCardDiff[] = [];
    const modified: SyncCardDiff[] = [];
    let identicalCount = 0;

    // Index cloud cards by ID and normalized question
    const cloudById = new Map<string, Flashcard>();
    const cloudByQuestion = new Map<string, Flashcard>();

    for (const card of cloudCards) {
      if (card._id) {
        cloudById.set(card._id.toString(), card);
      }
      const normQ = normalizeQuestion(card.question);
      if (normQ && !cloudByQuestion.has(normQ)) {
        cloudByQuestion.set(normQ, card);
      }
    }

    const matchedCloudIds = new Set<string>();

    // Process all local cards
    for (const localCard of localCards) {
      const localId = localCard._id?.toString() || '';
      let matchedCloud = localId ? cloudById.get(localId) : undefined;

      if (!matchedCloud) {
        // Fallback: match by normalized question
        const normQ = normalizeQuestion(localCard.question);
        if (normQ) {
          matchedCloud = cloudByQuestion.get(normQ);
        }
      }

      if (!matchedCloud) {
        localOnly.push({
          id: localId || `local_${Math.random()}`,
          question: localCard.question,
          status: SYNC_CARD_STATUS.LOCAL_ONLY,
          diffs: [],
          localCard,
        });
      } else {
        matchedCloudIds.add(matchedCloud._id?.toString() || '');
        const diffs = compareFlashcards(localCard, matchedCloud, categoryNameMap);

        if (diffs.length > 0) {
          modified.push({
            id: localId || matchedCloud._id?.toString() || '',
            question: localCard.question,
            status: SYNC_CARD_STATUS.MODIFIED,
            diffs,
            localCard,
            cloudCard: matchedCloud,
          });
        } else {
          identicalCount++;
        }
      }
    }

    // Any cloud card not matched is cloudOnly
    for (const cloudCard of cloudCards) {
      const cloudId = cloudCard._id?.toString() || '';
      if (!matchedCloudIds.has(cloudId)) {
        cloudOnly.push({
          id: cloudId,
          question: cloudCard.question,
          status: SYNC_CARD_STATUS.CLOUD_ONLY,
          diffs: [],
          cloudCard,
        });
      }
    }

    return {
      localOnly,
      cloudOnly,
      modified,
      identicalCount,
      totalLocal: localCards.length,
      totalCloud: cloudCards.length,
      timestamp: new Date().toISOString(),
      categorySummary,
    };
  }

  /**
   * Synchronizes category definitions between Local Repository and Cloud MongoDB.
   * Ensures referential integrity so cards never reference orphaned category IDs.
   */
  public static async syncCategories(direction: SyncDirection): Promise<{
    created: number;
    updated: number;
    localToCloudMap: Map<string, string>;
    cloudToLocalMap: Map<string, string>;
    errors: string[];
  }> {
    const localCatProvider = DataProviderFactory.getLocalCategoryProvider();
    const cloudCatProvider = DataProviderFactory.getCloudCategoryProvider();
    const errors: string[] = [];
    let created = 0;
    let updated = 0;

    const localToCloudMap = new Map<string, string>();
    const cloudToLocalMap = new Map<string, string>();

    try {
      const [localCats, cloudCats] = await Promise.all([
        localCatProvider.getCategories(),
        cloudCatProvider.getCategories().catch(() => []),
      ]);

      const cloudCatById = new Map<string, FlashcardCategory>();
      const cloudCatByName = new Map<string, FlashcardCategory>();
      for (const cat of cloudCats) {
        if (cat._id) cloudCatById.set(cat._id.toString(), cat);
        cloudCatByName.set(cat.name.trim().toLowerCase(), cat);
      }

      const localCatById = new Map<string, FlashcardCategory>();
      const localCatByName = new Map<string, FlashcardCategory>();
      for (const cat of localCats) {
        if (cat._id) localCatById.set(cat._id.toString(), cat);
        localCatByName.set(cat.name.trim().toLowerCase(), cat);
      }

      if (direction === SYNC_DIRECTION.PUSH) {
        // Push Local categories -> Cloud MongoDB
        for (const localCat of localCats) {
          const localId = localCat._id?.toString() || '';
          const normName = localCat.name.trim().toLowerCase();
          const matchedCloud =
            (localId ? cloudCatById.get(localId) : undefined) ||
            cloudCatByName.get(normName);

          if (!matchedCloud) {
            try {
              const newCloudCat = await cloudCatProvider.addCategory({
                _id: localCat._id,
                name: localCat.name,
                description: localCat.description,
              });
              created++;
              if (localId && newCloudCat._id) {
                localToCloudMap.set(localId, newCloudCat._id.toString());
                cloudToLocalMap.set(newCloudCat._id.toString(), localId);
              }
            } catch (err) {
              errors.push(
                `Failed to push category "${localCat.name}": ${String(err)}`,
              );
            }
          } else {
            const cloudId = matchedCloud._id?.toString() || '';
            if (localId && cloudId) {
              localToCloudMap.set(localId, cloudId);
              cloudToLocalMap.set(cloudId, localId);
            }
            if (
              matchedCloud._id &&
              localCat.description &&
              localCat.description.trim() !==
                (matchedCloud.description || '').trim()
            ) {
              try {
                await cloudCatProvider.updateCategory(
                  matchedCloud._id.toString(),
                  {
                    description: localCat.description,
                  },
                );
                updated++;
              } catch (err) {
                errors.push(
                  `Failed to update cloud category "${matchedCloud.name}": ${String(err)}`,
                );
              }
            }
          }
        }
      } else {
        // Pull Cloud categories -> Local Repository
        for (const cloudCat of cloudCats) {
          const cloudId = cloudCat._id?.toString() || '';
          const normName = cloudCat.name.trim().toLowerCase();
          const matchedLocal =
            (cloudId ? localCatById.get(cloudId) : undefined) ||
            localCatByName.get(normName);

          if (!matchedLocal) {
            try {
              const newLocalCat = await localCatProvider.addCategory({
                _id: cloudCat._id?.toString(),
                name: cloudCat.name,
                description: cloudCat.description,
              });
              created++;
              if (cloudId && newLocalCat._id) {
                cloudToLocalMap.set(cloudId, newLocalCat._id.toString());
                localToCloudMap.set(newLocalCat._id.toString(), cloudId);
              }
            } catch (err) {
              errors.push(
                `Failed to pull category "${cloudCat.name}" locally: ${String(err)}`,
              );
            }
          } else {
            const localId = matchedLocal._id?.toString() || '';
            if (cloudId && localId) {
              cloudToLocalMap.set(cloudId, localId);
              localToCloudMap.set(localId, cloudId);
            }
            if (
              matchedLocal._id &&
              cloudCat.description &&
              cloudCat.description.trim() !==
                (matchedLocal.description || '').trim()
            ) {
              try {
                await localCatProvider.updateCategory(
                  matchedLocal._id.toString(),
                  {
                    description: cloudCat.description,
                  },
                );
                updated++;
              } catch (err) {
                errors.push(
                  `Failed to update local category "${matchedLocal.name}": ${String(err)}`,
                );
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Error synchronizing categories:', err);
      errors.push(`Category sync error: ${String(err)}`);
    }

    return { created, updated, localToCloudMap, cloudToLocalMap, errors };
  }

  /**
   * Push Local cards & categories to Cloud (MongoDB):
   * - Reconciles categories first
   * - Inserts local-only cards into MongoDB
   * - Updates modified cards in MongoDB with local data
   */
  public static async pushLocalToCloud(
    cardIds?: string[],
  ): Promise<SyncExecutionResult> {
    const errors: string[] = [];

    // 1. Sync Categories first to maintain referential integrity
    const catSync = await this.syncCategories(SYNC_DIRECTION.PUSH);
    if (catSync.errors.length > 0) {
      errors.push(...catSync.errors);
    }

    const report = await this.computeDiff();
    const cloudProvider = DataProviderFactory.getCloudFlashcardProvider();
    let createdCount = 0;
    let updatedCount = 0;

    const shouldSync = (id: string) =>
      !cardIds || cardIds.length === 0 || cardIds.includes(id);

    // 2. Insert localOnly cards into MongoDB
    for (const item of report.localOnly) {
      if (!shouldSync(item.id) || !item.localCard) continue;
      try {
        const payload: Flashcard = {
          ...item.localCard,
          categories: (item.localCard.categories || []).map(
            (id) => catSync.localToCloudMap.get(id) || id,
          ),
        };
        await cloudProvider.addFlashcard(payload);
        createdCount++;
      } catch (err) {
        errors.push(
          `Failed to insert local card "${item.question}": ${String(err)}`,
        );
      }
    }

    // 3. Update modified cards in MongoDB
    for (const item of report.modified) {
      if (!shouldSync(item.id) || !item.localCard) continue;
      try {
        const cloudId = item.cloudCard?._id || item.id;
        const payload: Flashcard = {
          ...item.localCard,
          categories: (item.localCard.categories || []).map(
            (id) => catSync.localToCloudMap.get(id) || id,
          ),
        };
        await cloudProvider.updateFlashcard(cloudId, payload);
        updatedCount++;
      } catch (err) {
        errors.push(
          `Failed to update cloud card "${item.question}": ${String(err)}`,
        );
      }
    }

    const catMsg =
      catSync.created > 0 ? ` and ${catSync.created} new categories` : '';

    return {
      success: errors.length === 0,
      direction: SYNC_DIRECTION.PUSH,
      createdCount,
      updatedCount,
      categoriesCreated: catSync.created,
      categoriesUpdated: catSync.updated,
      message: `Successfully pushed ${createdCount} new cards and updated ${updatedCount} existing cards${catMsg} to MongoDB Cloud.`,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Pull Cloud (MongoDB) cards & categories to Local (flashcards.json & categories.json):
   * - Reconciles categories first
   * - Inserts cloud-only cards into flashcards.json
   * - Updates modified cards in flashcards.json with cloud review data
   */
  public static async pullCloudToLocal(
    cardIds?: string[],
  ): Promise<SyncExecutionResult> {
    const errors: string[] = [];

    // 1. Sync Categories first to maintain referential integrity
    const catSync = await this.syncCategories(SYNC_DIRECTION.PULL);
    if (catSync.errors.length > 0) {
      errors.push(...catSync.errors);
    }

    const report = await this.computeDiff();
    const localProvider = DataProviderFactory.getLocalFlashcardProvider();
    let createdCount = 0;
    let updatedCount = 0;

    const shouldSync = (id: string) =>
      !cardIds || cardIds.length === 0 || cardIds.includes(id);

    // 2. Insert cloudOnly cards into local
    for (const item of report.cloudOnly) {
      if (!shouldSync(item.id) || !item.cloudCard) continue;
      try {
        const payload: Flashcard = {
          ...item.cloudCard,
          categories: (item.cloudCard.categories || []).map(
            (id) => catSync.cloudToLocalMap.get(id) || id,
          ),
        };
        await localProvider.addFlashcard(payload);
        createdCount++;
      } catch (err) {
        errors.push(
          `Failed to insert cloud card "${item.question}" locally: ${String(err)}`,
        );
      }
    }

    // 3. Update modified cards in local with cloud data
    for (const item of report.modified) {
      if (!shouldSync(item.id) || !item.cloudCard) continue;
      try {
        const localId = item.localCard?._id || item.id;
        const payload: Flashcard = {
          ...item.cloudCard,
          categories: (item.cloudCard.categories || []).map(
            (id) => catSync.cloudToLocalMap.get(id) || id,
          ),
        };
        await localProvider.updateFlashcard(localId, payload);
        updatedCount++;
      } catch (err) {
        errors.push(
          `Failed to update local card "${item.question}": ${String(err)}`,
        );
      }
    }

    const catMsg =
      catSync.created > 0 ? ` and ${catSync.created} new categories` : '';

    return {
      success: errors.length === 0,
      direction: SYNC_DIRECTION.PULL,
      createdCount,
      updatedCount,
      categoriesCreated: catSync.created,
      categoriesUpdated: catSync.updated,
      message: `Successfully pulled ${createdCount} new cards and updated ${updatedCount} cards${catMsg} in Local Repository.`,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Resolves a conflict on a single modified card by applying the resolved card state
   * to Local, Cloud, or Both (syncing them).
   */
  public static async resolveCardConflict(
    cardId: string,
    resolvedCard: Flashcard,
    target: SyncTarget = SYNC_TARGET.BOTH,
  ): Promise<{ success: boolean; message: string; errors?: string[] }> {
    const errors: string[] = [];

    // Ensure category referential integrity
    if (resolvedCard.categories && resolvedCard.categories.length > 0) {
      try {
        if (target === SYNC_TARGET.BOTH || target === SYNC_SOURCE.CLOUD) {
          await this.syncCategories(SYNC_DIRECTION.PUSH);
        }
        if (target === SYNC_TARGET.BOTH || target === SYNC_SOURCE.LOCAL) {
          await this.syncCategories(SYNC_DIRECTION.PULL);
        }
      } catch (catErr) {
        console.warn(
          'Warning syncing categories for conflict resolution:',
          catErr,
        );
      }
    }

    const cardToSave: Flashcard = {
      ...resolvedCard,
    };

    const targetsToUpdate: SyncSource[] =
      target === SYNC_TARGET.BOTH
        ? [SYNC_SOURCE.LOCAL, SYNC_SOURCE.CLOUD]
        : [target];

    for (const t of targetsToUpdate) {
      const provider = DataProviderFactory.getFlashcardProviderByTarget(t);
      try {
        await provider.updateFlashcard(cardId, cardToSave);
      } catch (err) {
        errors.push(`Failed to update ${t} card: ${String(err)}`);
      }
    }

    const success = errors.length === 0;
    const targetLabel = SYNC_TARGET_LABEL[target] || target;

    return {
      success,
      message: success
        ? `Successfully saved and synchronized card to ${targetLabel}.`
        : `Encountered errors while saving card: ${errors.join(', ')}`,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}

export default SyncService;
