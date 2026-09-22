// src/server/quiz/modules/synonyms/index.ts
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

export const SYNONYMS_MODULE_ID = 'synonyms';

export const SYNONYMS_MODULE_META: QuizModuleMeta = {
  id: SYNONYMS_MODULE_ID,
  title: 'Academic Keyword Synonyms & Paraphrasing',
  shortTitle: 'Keyword Synonyms (Paraphrasing)',
  rubricTitle: 'Kecepatan memikirkan minimal 2 sinonim untuk kata kunci soal: [ /5]',
  description:
    'Latihan parafrasa kilat mengubah kata kunci umum (Band 5–6) menjadi pasangan sinonim akademis berbobot tinggi (Band 7.5–9.0). Mencegah pengulangan kata yang monoton dalam IELTS Writing dan Speaking.',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaBookAtlas',
  accentColor: '#06b6d4', // Cyan
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.VOCABULARY,
  section: QUIZ_SECTION.B,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'syn-1',
    sentence: 'Pilih pasangan sinonim akademis terbaik untuk memparafrasa kata kunci "BIG DIFFERENCE" dalam konteks data statistik:',
    options: [
      'pronounced disparity / stark divergence',
      'massive conflict / huge distance',
      'large variation / great boundary',
      'deep opposition / giant separation',
    ],
    correctAnswer: 'pronounced disparity / stark divergence',
    explanation: 'Dalam konteks akademis (IELTS Task 1 & Task 2), "big difference" diparafrasa secara elegan dengan "pronounced disparity" atau "stark divergence", yang merujuk pada kesenjangan terukur.',
    difficultyLevel: 2,
    category: 'Statistical Contrast Paraphrase',
    structuralBreakdown: {
      focusLabel: 'Informal: "big difference" ➔ Academic: "disparity / divergence"',
      keyRule: 'Gunakan kolokasi "pronounced disparity" untuk menggambarkan jurang perbedaan yang nyata.',
      contrastNote: '"massive conflict" merujuk pada pertempuran, bukan perbedaan data angka.',
    },
  },
  {
    id: 'syn-2',
    sentence: 'Manakah dua padanan formal yang paling tepat untuk menggantikan frasa "SPEED UP" dalam kalimat: "The crisis will speed up digital adoption"?',
    options: [
      'accelerate / hasten',
      'quicken / rush',
      'forward / sprint',
      'advance / trigger',
    ],
    correctAnswer: 'accelerate / hasten',
    explanation: 'Kata "accelerate" dan "hasten" adalah padanan standar AWL untuk menyatakan percepatan suatu proses tanpa konotasi ceroboh.',
    difficultyLevel: 1,
    category: 'Rate of Change Verbs',
    structuralBreakdown: {
      focusLabel: '"speed up" ➔ "accelerate / hasten"',
      keyRule: '"hasten the demise / accelerate the adoption" adalah frasa bernilai Band 7.5+.',
      contrastNote: '"rush" berkonotasi terburu-buru dan ceroboh.',
    },
  },
  {
    id: 'syn-3',
    sentence: 'Pilih dua sinonim presisi untuk kata kerja "MAKE WORSE" dalam kalimat esai: "Inflation will make worse the existing poverty":',
    options: [
      'exacerbate / aggravate',
      'damage / poison',
      'lower / hurt',
      'deteriorate / decay',
    ],
    correctAnswer: 'exacerbate / aggravate',
    explanation: '"Exacerbate" dan "aggravate" adalah kata kerja transitif akademis ideal untuk kondisi buruk yang bertambah parah ("exacerbate inequality / aggravate tensions").',
    difficultyLevel: 2,
    category: 'Problem Intensification Verbs',
    structuralBreakdown: {
      focusLabel: '"make worse" ➔ "exacerbate / aggravate"',
      keyRule: 'Kata "deteriorate" adalah intransitif ("conditions deteriorated"), sehingga tidak bisa langsung diikuti objek.',
      contrastNote: '"Exacerbate" wajib dikuasai untuk esai problem-solution Task 2.',
    },
  },
  {
    id: 'syn-4',
    sentence: 'Pilih pasangan sinonim akademis untuk menggantikan kata "DANGEROUS / RISKY" dalam konteks limbah industri:',
    options: [
      'hazardous / perilous',
      'harmful / unsafe',
      'threatening / poisonous',
      'vulnerable / destructive',
    ],
    correctAnswer: 'hazardous / perilous',
    explanation: '"Hazardous" dan "perilous" menunjukkan tingkat bahaya dan risiko tinggi dengan bobot akademis tingkat C1 ("hazardous waste / perilous journey").',
    difficultyLevel: 2,
    category: 'Risk Adjectives',
    structuralBreakdown: {
      focusLabel: '"dangerous" ➔ "hazardous / perilous"',
      keyRule: '"Hazardous materials" dan "perilous circumstances" adalah kolokasi alami penutur asli.',
      contrastNote: '"harmful / unsafe" adalah kata umum di level B1.',
    },
  },
  {
    id: 'syn-5',
    sentence: 'Manakah dua kata yang paling tepat untuk menggantikan "SHOW / PROVE" dalam menyajikan bukti empiris di bab pembahasan:',
    options: [
      'demonstrate / substantiate',
      'indicate / illustrate',
      'reveal / picture',
      'display / exhibit',
    ],
    correctAnswer: 'demonstrate / substantiate',
    explanation: '"Substantiate" (memperkuat dengan bukti) dan "demonstrate" (memperlihatkan secara logis) adalah dua pilar kata kerja pelaporan penelitian tingkat mahir.',
    difficultyLevel: 3,
    category: 'Evidence Reporting Verbs',
    structuralBreakdown: {
      focusLabel: '"show / prove" ➔ "demonstrate / substantiate"',
      keyRule: '"Empirical data substantiates the hypothesis" meningkatkan skor Lexical Resource.',
      contrastNote: '"prove" dalam sains dihindari karena terkesan klaim absolut (unhedged).',
    },
  },
  {
    id: 'syn-6',
    sentence: 'Pilih dua sinonim bernuansa akademis untuk "CLEAR / OBVIOUS" dalam argumen: "It is clear that governments must intervene":',
    options: [
      'evident / manifest',
      'transparent / readable',
      'visible / simple',
      'plain / recognizable',
    ],
    correctAnswer: 'evident / manifest',
    explanation: 'Frasa "It is increasingly evident / manifest that..." adalah pola baku pembuka kalimat penegasan argumen dalam tulisan analitis formal.',
    difficultyLevel: 3,
    category: 'Certainty & Clarity Adjectives',
    structuralBreakdown: {
      focusLabel: '"clear / obvious" ➔ "evident / manifest"',
      keyRule: '"It is manifest" memberikan register bahasa C1 yang formal dan berbobot.',
      contrastNote: '"transparent" lebih merujuk pada keterbukaan kejujuran daripada kejelasan bukti.',
    },
  },
  {
    id: 'syn-7',
    sentence: 'Parafrasa terbaik untuk kata kunci soal "SOLVE THE PROBLEM" dalam IELTS Task 2 adalah:',
    options: [
      'address the issue / mitigate the crisis',
      'finish the matter / cure the complication',
      'stop the conflict / delete the difficulty',
      'destroy the dilemma / beat the trouble',
    ],
    correctAnswer: 'address the issue / mitigate the crisis',
    explanation: 'Masalah kompleks sosial jarang bisa "dihilangkan" seketika, sehingga akademisi menggunakan "address the issue" (menangani) atau "mitigate the crisis" (memitigasi/mengurangi dampak).',
    difficultyLevel: 2,
    category: 'Problem-Solving Collocational Synonyms',
    structuralBreakdown: {
      focusLabel: '"solve the problem" ➔ "address the issue / mitigate the crisis"',
      keyRule: 'Menghindari kata klise "solve" dengan menggunakan "address / tackle / mitigate".',
      contrastNote: '"delete the difficulty" adalah terjemahan harfiah yang salah kaprah.',
    },
  },
  {
    id: 'syn-8',
    sentence: 'Pilih pasangan sinonim untuk memparafrasa kata "RICH / WEALTHY COUNTRIES" dalam konteks global:',
    options: [
      'affluent nations / developed economies',
      'prosperous zones / moneyed lands',
      'expensive territories / high-income places',
      'opulent provinces / loaded states',
    ],
    correctAnswer: 'affluent nations / developed economies',
    explanation: '"Affluent nations" dan "developed economies" adalah terminologi baku dalam ekonomi dan sosiologi global untuk menggantikan frasa sederhana "rich countries".',
    difficultyLevel: 3,
    category: 'Socio-economic Terminology',
    structuralBreakdown: {
      focusLabel: '"rich countries" ➔ "affluent nations / developed economies"',
      keyRule: '"Affluent" dan "developed" adalah kolokasi resmi Bank Dunia dan PBB.',
      contrastNote: '"loaded / moneyed" adalah bahasa percakapan informal slang.',
    },
  },
  {
    id: 'syn-9',
    sentence: 'Parafrasa akademis untuk "HELP / ENCOURAGE" dalam kalimat: "Subsidies will help clean energy development":',
    options: [
      'foster / facilitate',
      'boost / push',
      'lift / invite',
      'sponsor / prompt',
    ],
    correctAnswer: 'foster / facilitate',
    explanation: '"Foster innovation" dan "facilitate development" adalah dua pasangan kata kerja akademis paling direkomendasikan untuk menggantikan kata "help".',
    difficultyLevel: 2,
    category: 'Facilitation & Growth Verbs',
    structuralBreakdown: {
      focusLabel: '"help / encourage" ➔ "foster / facilitate"',
      keyRule: '"Foster growth / facilitate transitions" memberikan nuansa dukungan terencana.',
      contrastNote: '"push" terdengar terlalu kasar dan informal untuk esai Task 2.',
    },
  },
  {
    id: 'syn-10',
    sentence: 'Pilih dua padanan presisi untuk "DESTROY / WIPE OUT COMPLETELY" dalam konteks kepunahan spesies atau habitat:',
    options: [
      'annihilate / obliterate',
      'ruin / break down',
      'extinguish / smash',
      'crush / remove',
    ],
    correctAnswer: 'annihilate / obliterate',
    explanation: '"Annihilate" dan "obliterate" mengekspresikan pemusnahan total tanpa sisa dengan register bahasa tingkat tinggi.',
    difficultyLevel: 4,
    category: 'Total Destruction & Extinction',
    structuralBreakdown: {
      focusLabel: '"wipe out completely" ➔ "annihilate / obliterate"',
      keyRule: '"Virtually obliterated the indigenous habitat" mendemonstrasikan variasi leksikal C2.',
      contrastNote: '"break down" lebih merujuk pada penguraian kimia atau kerusakan mesin.',
    },
  },
];

export const synonymsServerModule: ServerQuizModule = {
  id: SYNONYMS_MODULE_ID,
  meta: SYNONYMS_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Keyword Synonyms & Paraphrasing',
      feedbackTemplates: {
        master:
          'Kekayaan parafrasa kosakata kamu luar biasa! Kemampuan menemukan 2+ padanan akademis presisi siap mengantar skor Lexical Resource ke Band 8.0+.',
        advanced:
          'Variasi sinonim kamu sudah di level C1. Cermati nuansa konotasi (misal: membedakan kata kerja transitif vs intransitif).',
      },
    });
  },
};

export default synonymsServerModule;
