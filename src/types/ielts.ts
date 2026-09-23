export enum IeltsItemType {
  Video = 'video',
  Article = 'article',
  Quiz = 'quiz',
  Lecture = 'lecture',
}

export interface IeltsChapter {
  id: string;
  chapterNumber: number;
  itemNumber: number;
  title: string;
  moduleNumber: number;
  moduleTitle: string;
  itemType: IeltsItemType;
  duration?: string;
  description: string;
  markdownContent: string;
  keyTakeaways?: string[];
}

export interface IeltsModule {
  moduleNumber: number;
  title: string;
  slug: string;
  description: string;
  totalDuration?: string;
  chapters: IeltsChapter[];
}

export interface IeltsProgressData {
  userId?: string;
  lastReadChapterId: string | null;
  completedChapterIds: string[];
  lastUpdated?: string;
}

export interface IeltsOverallStats {
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export interface IeltsModuleStats {
  moduleNumber: number;
  completedCount: number;
  totalCount: number;
  percentage: number;
  isFullyCompleted: boolean;
}
