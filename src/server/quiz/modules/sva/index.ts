// src/server/quiz/modules/sva/index.ts
import {
  QuizModuleMeta,
  QuestionAnswerRecord,
  RubricScoreResult,
  QuizSessionOptions,
  QuizQuestion,
} from '@/types/quiz';
import { QUIZ_CATEGORY, QUIZ_SECTION } from '@/constants/quiz';
import { ServerQuizModule } from '../../types';
import { generateSvaQuestions } from './generator';
import { calculateStandardRubricScore } from '../../rubricHelper';

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
  category: QUIZ_CATEGORY.GRAMMAR,
  section: QUIZ_SECTION.A,
};

export const svaServerModule: ServerQuizModule = {
  id: SVA_MODULE_ID,
  meta: SVA_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    return generateSvaQuestions(count, options?.targetLevel);
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Subject-Verb Agreement in Long Sentences',
      feedbackTemplates: {
        master:
          'Luar biasa! Penguasaan Subject-Verb Agreement kamu sempurna bahkan pada kalimat panjang multi-klausa dengan inversi dan gerund. Bebas sepenuhnya dari Proximity Trap!',
        advanced:
          'Sangat impresif! Kamu memiliki ketahanan sintaksis yang tinggi pada kalimat akademik panjang, hanya sedikit slip pada struktur kompleks ganda.',
        competent:
          'Cukup kompeten! Kamu dapat menyelesaikan kalimat berjarak sedang, namun masih sering terkecoh bila ada kata benda jamak tepat sebelum kata kerja.',
        developing:
          'Masih dalam tahap berkembang. Sebagian besar kesalahan disebabkan oleh Proximity Trap. Pelajari tab panduan teori dan ulangi latihan.',
        novice:
          'Butuh latihan intensif konsep dasar. Bacalah materi pada tab Panduan Belajar sebelum mencoba kuis berikutnya.',
      },
    });
  },
};

export default svaServerModule;
