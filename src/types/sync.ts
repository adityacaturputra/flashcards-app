/**
 * src/types/sync.ts
 * Type definitions and contracts for two-way synchronization between Local and Cloud datasets.
 */

import { Flashcard } from './flashcard';
export * from '@/constants/sync';
import { SyncCardStatus, SyncDirection } from '@/constants/sync';

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

export interface SyncCategorySummary {
  totalLocal: number;
  totalCloud: number;
  localOnlyCount: number;
  cloudOnlyCount: number;
  localOnlyNames: string[];
  cloudOnlyNames: string[];
}

export interface SyncDiffReport {
  localOnly: SyncCardDiff[];
  cloudOnly: SyncCardDiff[];
  modified: SyncCardDiff[];
  identicalCount: number;
  totalLocal: number;
  totalCloud: number;
  timestamp: string;
  categorySummary?: SyncCategorySummary;
}

export interface SyncExecutionResult {
  success: boolean;
  direction: SyncDirection;
  createdCount: number;
  updatedCount: number;
  categoriesCreated?: number;
  categoriesUpdated?: number;
  message: string;
  errors?: string[];
}
