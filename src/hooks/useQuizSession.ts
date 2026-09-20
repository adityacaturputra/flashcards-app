// src/hooks/useQuizSession.ts
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  QuizQuestion,
  QuestionAnswerRecord,
  RubricScoreResult,
  QuizSessionOptions,
} from '@/types/quiz';
import { quizApi } from '@/services/quiz/quizApi';

export interface UseQuizSessionReturn {
  questions: QuizQuestion[];
  currentIndex: number;
  currentQuestion: QuizQuestion | null;
  totalQuestions: number;
  selectedAnswer: string | null;
  isAnswerRevealed: boolean;
  isSessionComplete: boolean;
  isLoading: boolean;
  isEvaluating: boolean;
  error: string | null;
  records: QuestionAnswerRecord[];
  rubricResult: RubricScoreResult | null;
  handleSelectAnswer: (answer: string) => void;
  handleNextQuestion: () => Promise<void>;
  handleRestartSession: (options?: QuizSessionOptions) => Promise<void>;
  refetchSession: () => Promise<void>;
}

export function useQuizSession(
  moduleId: string,
  initialOptions?: QuizSessionOptions,
): UseQuizSessionReturn {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [records, setRecords] = useState<QuestionAnswerRecord[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
  const [rubricResult, setRubricResult] = useState<RubricScoreResult | null>(null);

  const initialOptionsRef = useRef(initialOptions);
  initialOptionsRef.current = initialOptions;

  // Load session from Backend API
  const loadSession = useCallback(
    async (options?: QuizSessionOptions) => {
      setIsLoading(true);
      setError(null);
      try {
        const payload = await quizApi.fetchQuizSession(
          moduleId,
          options ?? initialOptionsRef.current,
        );
        setQuestions(payload.questions ?? []);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setIsAnswerRevealed(false);
        setRecords([]);
        setIsSessionComplete(false);
        setRubricResult(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Gagal memuat soal dari server.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [moduleId],
  );

  // Initial load on mount or when moduleId changes
  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  const totalQuestions = questions.length;
  const currentQuestion = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < totalQuestions) {
      return questions[currentIndex];
    }
    return null;
  }, [questions, currentIndex, totalQuestions]);

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswerRevealed || !currentQuestion) return;

      const isCorrect = answer === currentQuestion.correctAnswer;
      const record: QuestionAnswerRecord = {
        question: currentQuestion,
        selectedAnswer: answer,
        isCorrect,
      };

      setSelectedAnswer(answer);
      setIsAnswerRevealed(true);
      setRecords((prev) => [...prev, record]);
    },
    [isAnswerRevealed, currentQuestion],
  );

  const handleNextQuestion = useCallback(async () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      // Session finished! Submit to Backend API for authoritative rubric evaluation
      setIsEvaluating(true);
      try {
        const result = await quizApi.evaluateQuizAnswers(moduleId, records);
        setRubricResult(result);
        setIsSessionComplete(true);
      } catch (err: unknown) {
        console.error('Failed to evaluate quiz session via API, applying local fallback:', err);
        // Fallback local scoring if network fails
        const total = records.length;
        const correct = records.filter((r) => r.isCorrect).length;
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        const fallbackScore = Math.max(1, Math.min(5, Math.round((pct / 20) * 10) / 10));

        setRubricResult({
          score: fallbackScore,
          maxScore: 5,
          tier: pct >= 85 ? 'Master' : pct >= 65 ? 'Competent' : 'Developing',
          cefrLevel: pct >= 85 ? 'C1' : 'B1',
          ieltsEquivalent: pct >= 85 ? 'Band 7.0' : 'Band 5.0',
          accuracyPercentage: pct,
          totalAnswered: total,
          totalCorrect: correct,
          feedbackMessage: 'Hasil evaluasi disimpan secara lokal.',
          categoryAnalysis: {},
        });
        setIsSessionComplete(true);
      } finally {
        setIsEvaluating(false);
      }
    }
  }, [currentIndex, totalQuestions, moduleId, records]);

  const handleRestartSession = useCallback(
    async (options?: QuizSessionOptions) => {
      await loadSession(options);
    },
    [loadSession],
  );

  return {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    isAnswerRevealed,
    isSessionComplete,
    isLoading,
    isEvaluating,
    error,
    records,
    rubricResult,
    handleSelectAnswer,
    handleNextQuestion,
    handleRestartSession,
    refetchSession: loadSession,
  };
}

export default useQuizSession;
