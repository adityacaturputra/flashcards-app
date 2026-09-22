// src/server/quiz/rubricHelper.ts
import { QuestionAnswerRecord, RubricScoreResult } from '@/types/quiz';
import { RUBRIC_TIER, RubricTier } from '@/constants/quiz';

export interface RubricConfig {
  skillName: string;
  feedbackTemplates?: {
    master?: string;
    advanced?: string;
    competent?: string;
    developing?: string;
    novice?: string;
  };
}

/**
 * Shared, deterministic Rubric Scorer adhering to Senior SE DRY principles.
 * Evaluates answer accuracy and maps to CEFR, IELTS, and 1.0 - 5.0 rubric scale.
 */
export function calculateStandardRubricScore(
  records: QuestionAnswerRecord[],
  config: RubricConfig,
): RubricScoreResult {
  const totalAnswered = records.length;
  const totalCorrect = records.filter((r) => r.isCorrect).length;
  const accuracyPercentage =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  let score = 1.0;
  let tier: RubricTier = RUBRIC_TIER.NOVICE;
  let cefrLevel = 'A2';
  let ieltsEquivalent = 'Band 4.0';
  let feedbackMessage = '';

  const { skillName, feedbackTemplates } = config;

  if (accuracyPercentage >= 95) {
    score = 5.0;
    tier = RUBRIC_TIER.MASTER;
    cefrLevel = 'C1 / C2';
    ieltsEquivalent = 'Band 7.5 - 9.0';
    feedbackMessage =
      feedbackTemplates?.master ||
      `Luar biasa! Penguasaan ${skillName} kamu sempurna (Akurasi ${accuracyPercentage}%). Kamu sudah sangat siap untuk standar IELTS Band 7.5+.`;
  } else if (accuracyPercentage >= 80) {
    score = 4.5;
    tier = RUBRIC_TIER.MASTER;
    cefrLevel = 'C1';
    ieltsEquivalent = 'Band 7.0 - 7.5';
    feedbackMessage =
      feedbackTemplates?.advanced ||
      `Sangat impresif! Kamu memiliki ketepatan tinggi dalam ${skillName} (Akurasi ${accuracyPercentage}%), hanya terdapat sedikit ketidaktelitian minor.`;
  } else if (accuracyPercentage >= 65) {
    score = 4.0;
    tier = RUBRIC_TIER.ADVANCED;
    cefrLevel = 'B2';
    ieltsEquivalent = 'Band 6.0 - 6.5';
    feedbackMessage =
      feedbackTemplates?.advanced ||
      `Bagus sekali! Pemahaman ${skillName} kamu sudah solid pada level B2 (Akurasi ${accuracyPercentage}%). Berlatihlah lebih konsisten untuk menembus C1.`;
  } else if (accuracyPercentage >= 50) {
    score = 3.0;
    tier = RUBRIC_TIER.COMPETENT;
    cefrLevel = 'B1';
    ieltsEquivalent = 'Band 5.0 - 5.5';
    feedbackMessage =
      feedbackTemplates?.competent ||
      `Tingkat kompeten dasar (Akurasi ${accuracyPercentage}%). Kamu memahami konsep pokok ${skillName}, namun masih sering goyah pada konteks kompleks.`;
  } else if (accuracyPercentage >= 35) {
    score = 2.0;
    tier = RUBRIC_TIER.DEVELOPING;
    cefrLevel = 'A2 / B1';
    ieltsEquivalent = 'Band 4.5';
    feedbackMessage =
      feedbackTemplates?.developing ||
      `Masih dalam tahap berkembang (Akurasi ${accuracyPercentage}%). Pelajari panduan teori ${skillName} dan analisis kesalahan sebelum mengulang tes.`;
  } else {
    score = 1.0;
    tier = RUBRIC_TIER.NOVICE;
    cefrLevel = 'A2';
    ieltsEquivalent = 'Band 4.0';
    feedbackMessage =
      feedbackTemplates?.novice ||
      `Perlu penguatan konsep dasar pada ${skillName}. Disarankan membaca kembali modul teori dasar dan memahami formula sebelum mencoba kuis berikutnya.`;
  }

  // Category breakdown
  const categoryAnalysis: RubricScoreResult['categoryAnalysis'] = {};
  records.forEach((r) => {
    const cat = r.question.category || 'Umum';
    if (!categoryAnalysis[cat]) {
      categoryAnalysis[cat] = { total: 0, correct: 0, accuracy: 0 };
    }
    categoryAnalysis[cat].total += 1;
    if (r.isCorrect) {
      categoryAnalysis[cat].correct += 1;
    }
  });

  Object.keys(categoryAnalysis).forEach((cat) => {
    const data = categoryAnalysis[cat];
    data.accuracy = Math.round((data.correct / data.total) * 100);
  });

  return {
    score,
    maxScore: 5,
    tier,
    cefrLevel,
    ieltsEquivalent,
    accuracyPercentage,
    totalAnswered,
    totalCorrect,
    feedbackMessage,
    categoryAnalysis,
  };
}
