// src/server/quiz/types.ts
import {
  QuizModuleMeta,
  QuizQuestion,
  QuestionAnswerRecord,
  RubricScoreResult,
  QuizSessionOptions,
} from '@/types/quiz';

/**
 * Server-Side Strategy contract for an English skill quiz module.
 * Executes exclusively in Node.js runtime / Next.js Route Handlers.
 */
export interface ServerQuizModule {
  id: string;
  meta: QuizModuleMeta;
  generateSession(options?: QuizSessionOptions): Promise<QuizQuestion[]> | QuizQuestion[];
  calculateRubricScore(records: QuestionAnswerRecord[]): Promise<RubricScoreResult> | RubricScoreResult;
}
