/**
 * src/constants/sync.ts
 * Single source of truth for synchronization source, target, direction, and status constants.
 * Strictly adheres to BESTPRACTICE.md (as const dictionary + derived union type pattern).
 */

export const SYNC_SOURCE = {
  LOCAL: 'local',
  CLOUD: 'cloud',
} as const;

export type SyncSource = (typeof SYNC_SOURCE)[keyof typeof SYNC_SOURCE];

export const SYNC_TARGET = {
  BOTH: 'both',
  LOCAL: SYNC_SOURCE.LOCAL,
  CLOUD: SYNC_SOURCE.CLOUD,
} as const;

export type SyncTarget = (typeof SYNC_TARGET)[keyof typeof SYNC_TARGET];

export const SYNC_DIRECTION = {
  PUSH: 'push',
  PULL: 'pull',
} as const;

export type SyncDirection = (typeof SYNC_DIRECTION)[keyof typeof SYNC_DIRECTION];

export const SYNC_CARD_STATUS = {
  LOCAL_ONLY: 'localOnly',
  CLOUD_ONLY: 'cloudOnly',
  MODIFIED: 'modified',
  IDENTICAL: 'identical',
} as const;

export type SyncCardStatus = (typeof SYNC_CARD_STATUS)[keyof typeof SYNC_CARD_STATUS];

export const SYNC_FILTER_TAB = {
  ALL: 'all',
  MODIFIED: SYNC_CARD_STATUS.MODIFIED,
  LOCAL_ONLY: SYNC_CARD_STATUS.LOCAL_ONLY,
  CLOUD_ONLY: SYNC_CARD_STATUS.CLOUD_ONLY,
} as const;

export type SyncFilterTab = (typeof SYNC_FILTER_TAB)[keyof typeof SYNC_FILTER_TAB];

export const BULK_RESOLVE_STRATEGY = {
  LATEST: 'latest',
  CLOUD: 'cloud',
  LOCAL: 'local',
} as const;

export type BulkResolveStrategy =
  (typeof BULK_RESOLVE_STRATEGY)[keyof typeof BULK_RESOLVE_STRATEGY];

export const SYNC_ACTION = {
  RESOLVE_CONFLICT: 'resolve_conflict',
  BULK_RESOLVE: 'bulk_resolve',
} as const;

export type SyncAction = (typeof SYNC_ACTION)[keyof typeof SYNC_ACTION];

export const SYNC_SOURCE_LABEL: Record<SyncSource, string> = {
  [SYNC_SOURCE.LOCAL]: 'Local',
  [SYNC_SOURCE.CLOUD]: 'Cloud',
};

export const SYNC_TARGET_LABEL: Record<SyncTarget, string> = {
  [SYNC_TARGET.BOTH]: 'Both Local & Cloud',
  [SYNC_TARGET.LOCAL]: 'Local Repository',
  [SYNC_TARGET.CLOUD]: 'MongoDB Cloud',
};

