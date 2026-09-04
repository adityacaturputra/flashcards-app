export type IeltsItemType = 'video' | 'article' | 'quiz' | 'lecture';

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
