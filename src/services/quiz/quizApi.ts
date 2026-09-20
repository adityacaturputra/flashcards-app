// src/services/quiz/quizApi.ts
import { API_PATHS } from '@/constants/apiPaths';
import {
  QuizModuleMeta,
  QuizQuestion,
  QuestionAnswerRecord,
  RubricScoreResult,
  QuizSessionOptions,
} from '@/types/quiz';

export interface QuizSessionPayload {
  module: QuizModuleMeta;
  questions: QuizQuestion[];
}

/**
 * Frontend HTTP client for the Quiz & Assessment API.
 * Keeps all question banks and scoring logic exclusively on the server.
 */
export const quizApi = {
  /**
   * Fetches metadata for all available quiz modules.
   */
  async fetchAvailableModules(): Promise<QuizModuleMeta[]> {
    const res = await fetch(API_PATHS.QUIZ);
    if (!res.ok) {
      throw new Error(`Failed to fetch quiz modules: ${res.statusText}`);
    }
    const data = (await res.json()) as { modules: QuizModuleMeta[] };
    return data.modules ?? [];
  },

  /**
   * Generates a fresh randomized question session from the server for a specific module.
   */
  async fetchQuizSession(
    moduleId: string,
    options?: QuizSessionOptions,
  ): Promise<QuizSessionPayload> {
    const params = new URLSearchParams();
    if (options?.count) params.set('count', options.count.toString());
    if (options?.targetLevel) params.set('level', options.targetLevel.toString());

    const queryString = params.toString();
    const url = `${API_PATHS.QUIZ}/${encodeURIComponent(moduleId)}${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to generate quiz session: ${res.statusText}`);
    }
    return (await res.json()) as QuizSessionPayload;
  },

  /**
   * Submits user answer records to the server for authoritative rubric evaluation.
   */
  async evaluateQuizAnswers(
    moduleId: string,
    records: QuestionAnswerRecord[],
  ): Promise<RubricScoreResult> {
    const url = `${API_PATHS.QUIZ}/${encodeURIComponent(moduleId)}/evaluate`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records }),
    });

    if (!res.ok) {
      throw new Error(`Failed to evaluate quiz session: ${res.statusText}`);
    }
    const data = (await res.json()) as { rubricResult: RubricScoreResult };
    return data.rubricResult;
  },
};

export default quizApi;
