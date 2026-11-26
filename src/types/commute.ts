/**
 * Commute Audio Vocabulary Module Type Definitions
 */
import {
  CommuteAudioField,
  CommuteMode,
  CommuteCardFilter,
  CommuteSegmentPhase,
  CommuteVoiceLang,
  COMMUTE_MODE,
  COMMUTE_CARD_FILTER,
} from '@/constants/commute';

export * from '@/constants/commute';

export interface CommuteAudioManifest {
  generatedAt: string;
  accent: string;
  cards: Record<string, CommuteAudioField[]>;
}

export interface CommuteConfig {
  mode: CommuteMode;
  filter: CommuteCardFilter;
  categoryId: string; // 'all' or specific category _id
  cardCount: number;
  includeCollocations: boolean;
  includeTips: boolean;
  recallPauseSec: number;
}

export const DEFAULT_COMMUTE_CONFIG: CommuteConfig = {
  mode: COMMUTE_MODE.PIMSLEUR_MICRO_BATCH,
  filter: COMMUTE_CARD_FILTER.PREGENERATED,
  categoryId: 'all',
  cardCount: 20,
  includeCollocations: false,
  includeTips: false,
  recallPauseSec: 3.5,
};

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
