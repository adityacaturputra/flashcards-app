/**
 * src/services/syncService.ts
 * Two-way synchronization engine between Local Repository (flashcards.json) and Cloud MongoDB.
 * Computes granular field-by-field diffs and executes push/pull synchronization.
 */

import { Flashcard } from '@/types/flashcard';
import { LocalFlashcardProvider } from './dataProviders/LocalFlashcardProvider';
import { MongoFlashcardProvider } from './dataProviders/MongoFlashcardProvider';

export type SyncCardStatus = 'localOnly' | 'cloudOnly' | 'modified' | 'identical';

export interface SyncFieldDiff {
  field: string;
  label: string;
  localValue: unknown;
  cloudValue: unknown;
}

export interface SyncCardDiff {
  id: string;
  question: string;
  status: SyncCardStatus;
  diffs: SyncFieldDiff[];
  localCard?: Flashcard;
  cloudCard?: Flashcard;
}

export interface SyncDiffReport {
  localOnly: SyncCardDiff[];
  cloudOnly: SyncCardDiff[];
  modified: SyncCardDiff[];
  identicalCount: number;
  totalLocal: number;
  totalCloud: number;
  timestamp: string;
}

export interface SyncExecutionResult {
  success: boolean;
  direction: 'push' | 'pull';
  createdCount: number;
  updatedCount: number;
  message: string;
  errors?: string[];
}

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
export function compareFlashcards(local: Flashcard, cloud: Flashcard): SyncFieldDiff[] {
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

  return diffs;
}

export class SyncService {
  /**
   * Generates a comprehensive comparison report between Local and MongoDB flashcards
   */
  public static async computeDiff(): Promise<SyncDiffReport> {
    const localProvider = LocalFlashcardProvider.getInstance();
    const mongoProvider = MongoFlashcardProvider.getInstance();

    const localCards = await localProvider.getFlashcards();
    const cloudCards = await mongoProvider.getFlashcards();

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
          status: 'localOnly',
          diffs: [],
          localCard,
        });
      } else {
        matchedCloudIds.add(matchedCloud._id?.toString() || '');
        const diffs = compareFlashcards(localCard, matchedCloud);

        if (diffs.length > 0) {
          modified.push({
            id: localId || matchedCloud._id?.toString() || '',
            question: localCard.question,
            status: 'modified',
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
          status: 'cloudOnly',
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
    };
  }

  /**
   * Push Local cards to Cloud (MongoDB):
   * - Inserts local-only cards into MongoDB
   * - Updates modified cards in MongoDB with local data
   */
  public static async pushLocalToCloud(cardIds?: string[]): Promise<SyncExecutionResult> {
    const report = await this.computeDiff();
    const mongoProvider = MongoFlashcardProvider.getInstance();
    const errors: string[] = [];
    let createdCount = 0;
    let updatedCount = 0;

    const shouldSync = (id: string) => !cardIds || cardIds.length === 0 || cardIds.includes(id);

    // 1. Insert localOnly cards into MongoDB
    for (const item of report.localOnly) {
      if (!shouldSync(item.id) || !item.localCard) continue;
      try {
        await mongoProvider.addFlashcard(item.localCard);
        createdCount++;
      } catch (err) {
        errors.push(`Failed to insert local card "${item.question}": ${String(err)}`);
      }
    }

    // 2. Update modified cards in MongoDB
    for (const item of report.modified) {
      if (!shouldSync(item.id) || !item.localCard) continue;
      try {
        const cloudId = item.cloudCard?._id || item.id;
        await mongoProvider.updateFlashcard(cloudId, item.localCard);
        updatedCount++;
      } catch (err) {
        errors.push(`Failed to update cloud card "${item.question}": ${String(err)}`);
      }
    }

    return {
      success: errors.length === 0,
      direction: 'push',
      createdCount,
      updatedCount,
      message: `Successfully pushed ${createdCount} new cards and updated ${updatedCount} existing cards to MongoDB Cloud.`,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Pull Cloud (MongoDB) cards to Local (flashcards.json):
   * - Inserts cloud-only cards into flashcards.json
   * - Updates modified cards in flashcards.json with cloud review data
   */
  public static async pullCloudToLocal(cardIds?: string[]): Promise<SyncExecutionResult> {
    const report = await this.computeDiff();
    const localProvider = LocalFlashcardProvider.getInstance();
    const errors: string[] = [];
    let createdCount = 0;
    let updatedCount = 0;

    const shouldSync = (id: string) => !cardIds || cardIds.length === 0 || cardIds.includes(id);

    // 1. Insert cloudOnly cards into local
    for (const item of report.cloudOnly) {
      if (!shouldSync(item.id) || !item.cloudCard) continue;
      try {
        await localProvider.addFlashcard(item.cloudCard);
        createdCount++;
      } catch (err) {
        errors.push(`Failed to insert cloud card "${item.question}" locally: ${String(err)}`);
      }
    }

    // 2. Update modified cards in local with cloud data
    for (const item of report.modified) {
      if (!shouldSync(item.id) || !item.cloudCard) continue;
      try {
        const localId = item.localCard?._id || item.id;
        await localProvider.updateFlashcard(localId, item.cloudCard);
        updatedCount++;
      } catch (err) {
        errors.push(`Failed to update local card "${item.question}": ${String(err)}`);
      }
    }

    return {
      success: errors.length === 0,
      direction: 'pull',
      createdCount,
      updatedCount,
      message: `Successfully pulled ${createdCount} new cards and updated ${updatedCount} cards in Local Repository.`,
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
    target: 'both' | 'local' | 'cloud' = 'both'
  ): Promise<{ success: boolean; message: string; errors?: string[] }> {
    const localProvider = LocalFlashcardProvider.getInstance();
    const mongoProvider = MongoFlashcardProvider.getInstance();
    const errors: string[] = [];

    const cardToSave: Flashcard = {
      ...resolvedCard,
    };

    if (target === 'local' || target === 'both') {
      try {
        await localProvider.updateFlashcard(cardId, cardToSave);
      } catch (err) {
        errors.push(`Failed to update local card: ${String(err)}`);
      }
    }

    if (target === 'cloud' || target === 'both') {
      try {
        await mongoProvider.updateFlashcard(cardId, cardToSave);
      } catch (err) {
        errors.push(`Failed to update cloud card: ${String(err)}`);
      }
    }

    const success = errors.length === 0;
    const targetLabel =
      target === 'both'
        ? 'Both Local & Cloud'
        : target === 'local'
          ? 'Local Repository'
          : 'MongoDB Cloud';

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
