/**
 * Commute Audio Vocabulary Module Type Definitions
 */
import {
  CommuteAudioField,
  CommuteMode,
  CommuteCardFilter,
  CommuteSegmentPhase,
  CommuteVoiceLang,
  CommuteSoftSyncStatus,
  COMMUTE_MODE,
  COMMUTE_CARD_FILTER,
} from '@/constants/commute';

export * from '@/constants/commute';

export type CommuteCardManifestEntry =
  | CommuteAudioField[]
  | Partial<Record<CommuteAudioField, string>>;

export interface CommuteAudioManifest {
  version?: number;
  generatedAt: string;
  accent: string;
  cards: Record<string, CommuteCardManifestEntry>;
}

export interface CommuteConfig {
  mode: CommuteMode;
  filter: CommuteCardFilter;
  categoryId: string; // 'all' or specific category _id
  cardCount: number;
  startIndex: number; // 1-based batch offset
  includeCollocations: boolean;
  includeTips: boolean;
  recallPauseSec: number;
  syncToAnki: boolean;
}

export const DEFAULT_COMMUTE_CONFIG: CommuteConfig = {
  mode: COMMUTE_MODE.PIMSLEUR_MICRO_BATCH,
  filter: COMMUTE_CARD_FILTER.DUE_TODAY,
  categoryId: 'all',
  cardCount: 20,
  startIndex: 1,
  includeCollocations: false,
  includeTips: false,
  recallPauseSec: 3.5,
  syncToAnki: true,
};

export interface CommuteSoftSyncSummary {
  enabled: boolean;
  listenedCount: number;
  syncedCount: number;
  pendingCount: number;
  totalCards: number;
  status: CommuteSoftSyncStatus;
  onSyncNow: () => void;
}

export interface CommuteAudioSegment {
  id: string;
  cardId: string;
  cardQuestion: string;
  field: CommuteAudioField;
  phase: CommuteSegmentPhase;
  lang: CommuteVoiceLang;
  text: string;
  pauseAfterMs: number;
  isChapterStart?: boolean;
}

export interface CommuteChapterMarker {
  index: number;
  cardId: string;
  cardQuestion: string;
  phase: CommuteSegmentPhase;
  startTimeSec: number;
  endTimeSec: number;
}

export interface CommuteEpisode {
  id: string;
  title: string;
  mode: CommuteMode;
  blob: Blob;
  blobUrl: string;
  totalDurationSec: number;
  chapters: CommuteChapterMarker[];
  cardIds: string[];
  cardCount: number;
  createdAt: string;
}

export interface CommuteSessionRecord {
  id: string;
  title: string;
  mode: CommuteMode;
  cardIds: string[];
  cardCount: number;
  createdAt: string;
}
