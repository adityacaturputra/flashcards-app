import { AUDIOBOOK_SPEEDS } from '@/constants/audiobooks';

export type AudiobookPlaybackSpeed =
  (typeof AUDIOBOOK_SPEEDS)[keyof typeof AUDIOBOOK_SPEEDS];

export interface AudiobookEpisode {
  id: string;
  episodeNumber: number;
  moduleId: number;
  moduleTitle: string;
  title: string;
  focus: string;
  audioUrl: string;
  scriptUrl: string;
  downloadFilename: string;
}

export interface AudiobookModule {
  id: number;
  title: string;
  episodes: AudiobookEpisode[];
}

export interface AudiobookEpisodeProgress {
  lastPlayTime: number;
  duration: number;
  completed: boolean;
  updatedAt: number;
}

export type AudiobookProgressMap = Record<string, AudiobookEpisodeProgress>;
