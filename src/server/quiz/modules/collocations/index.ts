// src/server/quiz/modules/collocations/index.ts
import {
  QuizModuleMeta,
  QuestionAnswerRecord,
  RubricScoreResult,
  QuizSessionOptions,
  QuizQuestion,
} from '@/types/quiz';
import { QUIZ_CATEGORY, QUIZ_SECTION } from '@/constants/quiz';
import { ServerQuizModule } from '../../types';
import { calculateStandardRubricScore } from '../../rubricHelper';

export const COLLOCATIONS_MODULE_ID = 'collocations';

export const COLLOCATIONS_MODULE_META: QuizModuleMeta = {
  id: COLLOCATIONS_MODULE_ID,
  title: 'Natural Collocations & Idiomatic Prepositions',
  shortTitle: 'Natural Collocations',
  rubricTitle: 'Penggunaan pasangan kata alami (collocations) tanpa terjemahan harfiah: [ /5]',
  description:
    'Menghindari terjemahan harfiah dari bahasa Indonesia (*make an action*, *do a crime*). Menguasai kombinasi kata alami penutur asli (take a toll on, shed light on, heavily influenced, pose a threat).',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaLink',
  accentColor: '#14b8a6', // Teal
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.VOCABULARY,
  section: QUIZ_SECTION.B,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'colloc-1',
    sentence: 'Chronic sleep deprivation can take a severe [ ___ ] on both cardiovascular health and cognitive acuity.',
    options: ['toll', 'cost', 'burden', 'impact'],
    correctAnswer: 'toll',
    explanation: 'Kolokasi alami penutur asli untuk dampak buruk yang terkumpul sedikit demi sedikit adalah "take a toll on" (membebani/merusak secara perlahan). Kata "cost" atau "burden" tidak cocok dengan kata kerja "take ... on".',
    difficultyLevel: 2,
    category: 'Idiomatic Verb-Noun Collocation',
    structuralBreakdown: {
      focusLabel: 'take a heavy/severe toll on [something]',
      keyRule: '"take a toll on" adalah kolokasi idiomatis tingkat tinggi untuk menggambarkan konsekuensi negatif.',
      contrastNote: 'Terjemahan harfiah seperti "make a burden on" tidak digunakan penutur asli.',
    },
  },
  {
    id: 'colloc-2',
    sentence: 'The newly discovered archival documents shed new [ ___ ] on the geopolitical motives behind the 1914 treaty.',
    options: ['light', 'bright', 'vision', 'clarity'],
    correctAnswer: 'light',
    explanation: 'Ungkapan kolokasi baku untuk mengungkap fakta atau memberikan penjelasan baru adalah "shed light on" (menerangi / memperjelas persoalan).',
    difficultyLevel: 2,
    category: 'Figurative Idiom Collocation',
    structuralBreakdown: {
      focusLabel: 'shed light on [a topic/mystery]',
      keyRule: 'Kombinasi "shed light on" sering menjadi pembeda antara kandidat Band 6.5 dan Band 7.5+.',
      contrastNote: '"give clarity to" lebih kaku dan kurang alami.',
    },
  },
  {
    id: 'colloc-3',
    sentence: 'Unregulated automated algorithms pose a significant [ ___ ] to the preservation of consumer privacy rights.',
    options: ['threat', 'danger', 'risk', 'crisis'],
    correctAnswer: 'threat',
    explanation: 'Kata kerja "pose" secara alami berkolokasi dengan kata benda "a threat / a challenge / a risk". Pasangan paling kuat untuk ancaman bahaya adalah "pose a threat to".',
    difficultyLevel: 1,
    category: 'Verb + Noun: pose a threat',
    structuralBreakdown: {
      focusLabel: 'pose a threat / danger / challenge to',
      keyRule: 'Gunakan "pose a threat" daripada terjemahan kaku "make a danger".',
      contrastNote: 'Meskipun "pose a risk" juga ada, "pose a threat to rights" adalah kolokasi akademis terkuat.',
    },
  },
  {
    id: 'colloc-4',
    sentence: 'To mitigate regional unemployment, local councils should [ ___ ] measures to attract venture capital.',
    options: ['take', 'make', 'do', 'act'],
    correctAnswer: 'take',
    explanation: 'Dalam bahasa Inggris, tindakan/langkah diambil dengan kolokasi "take measures" atau "take steps", BUKAN "make measures" atau "do measures" (terjemahan keliru dari "membuat tindakan").',
    difficultyLevel: 1,
    category: 'Literal Translation Pitfall: take measures',
    structuralBreakdown: {
      focusLabel: 'take measures / take steps / take action',
      keyRule: '"take measures" = mengambil langkah kebijakan.',
      contrastNote: 'Kesalahan paling sering penutur Indonesia: memakai "make an action / make a measure".',
    },
  },
  {
    id: 'colloc-5',
    sentence: 'The candidate’s stance on educational reform is [ ___ ] influenced by Nordic pedagogical philosophies.',
    options: ['heavily', 'strictly', 'weightily', 'thickly'],
    correctAnswer: 'heavily',
    explanation: 'Untuk memodifikasi kata kerja "influenced" dengan makna pengaruh yang sangat kuat, kolokasi alami adalah "heavily influenced" atau "profoundly influenced".',
    difficultyLevel: 2,
    category: 'Adverb + Adjective Collocation',
    structuralBreakdown: {
      focusLabel: 'heavily / profoundly influenced',
      keyRule: '"heavily influenced" terdengar alami; "weightily / thickly" adalah eror terjemahan harfiah.',
      contrastNote: '"strictly" berkolokasi dengan "enforced / regulated", bukan "influenced".',
    },
  },
  {
    id: 'colloc-6',
    sentence: 'Before allocating state subsidies, the committee must conduct a [ ___ ] assessment of the environmental ramifications.',
    options: ['thorough', 'complete', 'filled', 'deepest'],
    correctAnswer: 'thorough',
    explanation: 'Evaluasi yang teliti dan mendalam berkolokasi dengan "thorough assessment" atau "comprehensive assessment".',
    difficultyLevel: 2,
    category: 'Adjective + Noun Assessment Collocation',
    structuralBreakdown: {
      focusLabel: 'conduct a thorough / comprehensive assessment',
      keyRule: 'Kombinasi "conduct a thorough assessment" adalah frase inti di esai Task 2 problem-solution.',
      contrastNote: '"complete assessment" lebih berfokus pada kelengkapan formulir, bukan ketelitian analisis.',
    },
  },
  {
    id: 'colloc-7',
    sentence: 'The company issued a formal apology to [ ___ ] the damage caused by the misleading marketing campaign.',
    options: ['repair', 'cure', 'mend', 'recover'],
    correctAnswer: 'repair',
    explanation: 'Pasangan kata alami untuk memperbaiki kerusakan reputasi atau kerugian relasi adalah "repair the damage", BUKAN "cure the damage" (cure hanya untuk penyakit).',
    difficultyLevel: 2,
    category: 'Collocation with "damage"',
    structuralBreakdown: {
      focusLabel: 'repair / undo the damage',
      keyRule: '"repair the damage" adalah kolokasi idiomatis standar.',
      contrastNote: '"cure" hanya berkolokasi dengan "disease / ailment".',
    },
  },
  {
    id: 'colloc-8',
    sentence: 'Sociologists argue that compulsory digital literacy classes can [ ___ ] the gap between privileged and marginalized students.',
    options: ['bridge', 'cross', 'connect', 'tie'],
    correctAnswer: 'bridge',
    explanation: 'Kolokasi baku untuk menjembatani kesenjangan sosial/ekonomi adalah "bridge the gap" (menjembatani jurang pemisah).',
    difficultyLevel: 2,
    category: 'Metaphorical Collocation: bridge the gap',
    structuralBreakdown: {
      focusLabel: 'bridge / narrow the gap',
      keyRule: '"bridge the gap between X and Y" menunjukkan penyelesaian disparitas.',
      contrastNote: '"cross the gap" bermakna menyeberangi celah fisik.',
    },
  },
  {
    id: 'colloc-9',
    sentence: 'Urban sprawl and habitat fragmentation exert immense [ ___ ] on wildlife migration corridors.',
    options: ['pressure', 'force', 'stress', 'weight'],
    correctAnswer: 'pressure',
    explanation: 'Kata kerja formal "exert" berkolokasi kuat dengan "immense pressure on" (memberikan tekanan besar terhadap).',
    difficultyLevel: 3,
    category: 'Verb + Noun: exert pressure on',
    structuralBreakdown: {
      focusLabel: 'exert immense / substantial pressure on',
      keyRule: '"exert pressure on" memberikan bobot akademis tinggi pada argumen lingkungan.',
      contrastNote: '"give big force to" adalah terjemahan harfiah non-natural.',
    },
  },
  {
    id: 'colloc-10',
    sentence: 'The research institute came under fire for failing to draw a clear [ ___ ] between correlation and causality.',
    options: ['distinction', 'difference', 'division', 'border'],
    correctAnswer: 'distinction',
    explanation: 'Kolokasi baku penutur asli untuk membuat pembedaan konseptual yang tegas adalah "draw a clear distinction between A and B".',
    difficultyLevel: 3,
    category: 'Academic Distinction Collocation',
    structuralBreakdown: {
      focusLabel: 'draw a clear distinction between',
      keyRule: '"draw a distinction" jauh lebih presisi dan formal daripada "make a difference".',
      contrastNote: '"make a difference" memiliki makna berbeda (memberikan dampak positif).',
    },
  },
];

export const collocationsServerModule: ServerQuizModule = {
  id: COLLOCATIONS_MODULE_ID,
  meta: COLLOCATIONS_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Natural Collocations',
      feedbackTemplates: {
        master:
          'Penguasaan kolokasi alami kamu sangat mengesankan! Esai dan percakapan kamu mengalir natural tanpa jejak terjemahan kaku bahasa ibu.',
        advanced:
          'Kemampuan kolokasi sudah di level C1. Perbanyak paparan artikel berita berkualitas (The Economist, Nature) untuk memantapkan pasangan preposisi.',
      },
    });
  },
};

export default collocationsServerModule;
