// src/server/quiz/modules/sva/index.ts
import {
  QuizModuleMeta,
  QuestionAnswerRecord,
  RubricScoreResult,
  QuizSessionOptions,
  QuizQuestion,
} from '@/types/quiz';
import { ServerQuizModule } from '../../types';
import { generateSvaQuestions } from './generator';

export const SVA_MODULE_ID = 'sva';

export const SVA_MODULE_META: QuizModuleMeta = {
  id: SVA_MODULE_ID,
  title: 'Subject-Verb Agreement in Long Sentences',
  shortTitle: 'SVA (Long Sentences)',
  rubricTitle: 'Ketepatan penggunaan Subject-Verb Agreement pada kalimat panjang: [ /5]',
  description:
    'Latihan intensif menaklukkan "The Proximity Trap" pada kalimat kompleks bertingkat (20–35 kata). Menguji frasa preposisi, sisipan parenthetical, klausa relatif, gerund, dan inversi.',
  targetCefr: 'B1 ➔ B2 / C1',
  iconName: 'FaBolt',
  accentColor: '#10b981', // Emerald
  availableLevels: [1, 2, 3, 4, 5],
};

export const svaServerModule: ServerQuizModule = {
  id: SVA_MODULE_ID,
  meta: SVA_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    return generateSvaQuestions(count, options?.targetLevel);
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    const totalAnswered = records.length;
    const totalCorrect = records.filter((r) => r.isCorrect).length;
    const accuracyPercentage =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    let score = 1.0;
    let tier: RubricScoreResult['tier'] = 'Novice';
    let cefrLevel = 'A2';
    let ieltsEquivalent = 'Band 4.0';
    let feedbackMessage = '';

    if (accuracyPercentage >= 95) {
      score = 5.0;
      tier = 'Master';
      cefrLevel = 'C1 / C2';
      ieltsEquivalent = 'Band 7.5 - 9.0';
      feedbackMessage =
        'Luar biasa! Penguasaan Subject-Verb Agreement kamu sempurna bahkan pada kalimat panjang multi-klausa dengan inversi dan gerund. Bebas sepenuhnya dari Proximity Trap!';
    } else if (accuracyPercentage >= 85) {
      score = 4.5;
      tier = 'Master';
      cefrLevel = 'C1';
      ieltsEquivalent = 'Band 7.0 - 7.5';
      feedbackMessage =
        'Sangat impresif! Kamu memiliki ketahanan sintaksis yang tinggi pada kalimat akademik panjang, hanya sedikit slip pada struktur kompleks ganda.';
    } else if (accuracyPercentage >= 75) {
      score = 4.0;
      tier = 'Advanced';
      cefrLevel = 'B2';
      ieltsEquivalent = 'Band 6.0 - 6.5';
      feedbackMessage =
        'Bagus sekali! Kamu menguasai sebagian besar pola kalimat panjang. Sesekali kamu masih terkecoh oleh frasa sisipan parenthetical (as well as, along with) atau subjek gerund.';
    } else if (accuracyPercentage >= 65) {
      score = 3.5;
      tier = 'Competent';
      cefrLevel = 'B1 / B2';
      ieltsEquivalent = 'Band 5.5';
      feedbackMessage =
        'Cukup kompeten! Kamu dapat menyelesaikan kalimat berjarak sedang, namun masih sering terkecoh bila ada kata benda jamak tepat sebelum kata kerja.';
    } else if (accuracyPercentage >= 50) {
      score = 3.0;
      tier = 'Competent';
      cefrLevel = 'B1';
      ieltsEquivalent = 'Band 5.0';
      feedbackMessage =
        'Level B1 solid. Terapkan teknik "Bracket Elimination" (Coret Sisipan) secara sadar agar tidak refleks mencocokkan kata kerja dengan kata terdekat.';
    } else if (accuracyPercentage >= 35) {
      score = 2.0;
      tier = 'Developing';
      cefrLevel = 'A2 / B1';
      ieltsEquivalent = 'Band 4.5';
      feedbackMessage =
        'Masih dalam tahap berkembang. Sebagian besar kesalahan disebabkan oleh Proximity Trap. Pelajari tab panduan teori dan ulangi latihan.';
    } else {
      score = 1.0;
      tier = 'Novice';
      cefrLevel = 'A2';
      ieltsEquivalent = 'Band 4.0';
      feedbackMessage =
        'Butuh latihan intensif konsep dasar. Bacalah materi pada tab Panduan Belajar sebelum mencoba kuis berikutnya.';
    }

    // Category breakdown
    const categoryAnalysis: RubricScoreResult['categoryAnalysis'] = {};
    records.forEach((r) => {
      const cat = r.question.category || 'General';
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
  },
};

export default svaServerModule;
