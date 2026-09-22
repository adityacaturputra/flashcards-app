// src/server/quiz/modules/discourse-markers/index.ts
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

export const DISCOURSE_MARKERS_MODULE_ID = 'discourse-markers';

export const DISCOURSE_MARKERS_MODULE_META: QuizModuleMeta = {
  id: DISCOURSE_MARKERS_MODULE_ID,
  title: 'Discourse Markers & Cohesion Mastery',
  shortTitle: 'Discourse Markers',
  rubricTitle: 'Variasi penggunaan penanda wacana (moreover, consequently, albeit): [ /5]',
  description:
    'Meningkatkan kohesi dan transisi logika antar ide (penambahan, sebab-akibat, konsesi kontras, perbandingan) menggunakan penanda wacana C1/C2 (moreover, consequently, albeit, notwithstanding, in light of).',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaShuffle',
  accentColor: '#8b5cf6', // Violet
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.VOCABULARY,
  section: QUIZ_SECTION.B,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'dm-1',
    sentence: 'The experimental electric engine demonstrated exceptional fuel economy, [ ___ ] with slightly reduced acceleration compared to traditional combustion models.',
    options: ['albeit', 'despite', 'moreover', 'nonetheless'],
    correctAnswer: 'albeit',
    explanation: '"Albeit" (artinya "walaupun / meskipun") digunakan untuk menyambungkan frasa konsesif ringkas tanpa memerlukan klausa subjek-predikat baru ("albeit with reduced acceleration"). Berbeda dengan "despite" yang membutuhkan kata benda tanpa kata depan rangkap ("despite reduced acceleration").',
    difficultyLevel: 3,
    category: 'Concession: Albeit',
    structuralBreakdown: {
      focusLabel: 'Concessive Marker: ALBEIT',
      keyRule: '"albeit + prepositional phrase / adjective" adalah ciri penulisan akademis tingkat tinggi C1.',
      contrastNote: '"despite with" adalah kesalahan gramatikal fatal karena "with" berlebihan setelah "despite".',
    },
  },
  {
    id: 'dm-2',
    sentence: 'The national central bank raised interest rates aggressively; [ ___ ], consumer borrowing slumped to its lowest level in two decades.',
    options: ['consequently', 'furthermore', 'nevertheless', 'conversely'],
    correctAnswer: 'consequently',
    explanation: 'Hubungan antar kedua klausa adalah hubungan sebab-akibat (kenaikan suku bunga menyebabkan penurunan pinjaman). Kata transisi yang tepat adalah "consequently" (sebagai konsekuensinya).',
    difficultyLevel: 2,
    category: 'Causality / Result Transitions',
    structuralBreakdown: {
      focusLabel: 'Cause ➔ Consequently ➔ Result',
      keyRule: '; consequently, menghubungkan tindakan dengan akibat langsungnya.',
      contrastNote: '"furthermore" untuk penambahan ide searah; "nevertheless" untuk kontras yang berlawanan.',
    },
  },
  {
    id: 'dm-3',
    sentence: 'Mass transit infrastructure reduces road congestion; [ ___ ], it significantly curbs urban greenhouse gas emissions.',
    options: ['moreover', 'otherwise', 'nonetheless', 'conversely'],
    correctAnswer: 'moreover',
    explanation: 'Kedua ide menyajikan dua argumen positif yang saling menguatkan (mengurangi kemacetan + mengurangi emisi). Kata transisi penambahan argumen formal adalah "moreover" atau "furthermore".',
    difficultyLevel: 1,
    category: 'Additive Arguments (Moreover / Furthermore)',
    structuralBreakdown: {
      focusLabel: 'Additive Marker: MOREOVER',
      keyRule: 'Digunakan untuk menambahkan poin penguat baru yang lebih berbobot pada argumen sebelumnya.',
      contrastNote: '"conversely" keliru karena hanya dipakai saat menyajikan argumen berkebalikan.',
    },
  },
  {
    id: 'dm-4',
    sentence: '[ ___ ] fierce resistance from corporate lobbying groups, the environmental regulatory bill was passed by an overwhelming majority.',
    options: ['Notwithstanding', 'Although', 'Despite of', 'Whereas'],
    correctAnswer: 'Notwithstanding',
    explanation: '"Notwithstanding" (preposisi formal bermakna "terlepas dari / meskipun ada") dapat langsung diikuti oleh noun phrase ("fierce resistance"). Opsi "Despite of" salah karena "despite" tidak boleh diikuti kata "of".',
    difficultyLevel: 4,
    category: 'Prepositional Concession: Notwithstanding',
    structuralBreakdown: {
      focusLabel: 'Formal Preposition: NOTWITHSTANDING + Noun Phrase',
      keyRule: '"Notwithstanding fierce resistance" = "Despite fierce resistance".',
      contrastNote: '"Despite of" adalah kesalahan yang sangat sering muncul; "Although" mewajibkan klausa lengkap (S+V).',
    },
  },
  {
    id: 'dm-5',
    sentence: '[ ___ ] recent clinical evidence confirming its efficacy, public health officials officially endorsed the generic therapeutic regimen.',
    options: ['In light of', 'In spite of', 'In contrast to', 'In place of'],
    correctAnswer: 'In light of',
    explanation: '"In light of" bermakna "mempertimbangkan / mengingat adanya fakta bahwa...". Digunakan untuk membenarkan tindakan endorsement berdasarkan bukti baru.',
    difficultyLevel: 3,
    category: 'Contextual Justification: In light of',
    structuralBreakdown: {
      focusLabel: 'Justification Marker: IN LIGHT OF',
      keyRule: '"In light of [evidence]" = taking into account recent facts.',
      contrastNote: '"In spite of" bermakna berlawanan (meskipun ada bukti, pejabat tetap mendukung).',
    },
  },
  {
    id: 'dm-6',
    sentence: 'Developed economies generate the highest per capita emissions; [ ___ ], developing nations frequently suffer the most catastrophic climate impacts.',
    options: ['conversely', 'accordingly', 'likewise', 'hence'],
    correctAnswer: 'conversely',
    explanation: '"Conversely" digunakan untuk menyandingkan dua situasi yang saling berkebalikan secara simetris (negara maju penghasil emisi terbanyak vs negara berkembang penerima dampak terparah).',
    difficultyLevel: 3,
    category: 'Opposite Symmetry: Conversely',
    structuralBreakdown: {
      focusLabel: 'Symmetric Contrast: CONVERSELY',
      keyRule: 'Digunakan saat dua fakta berlawanan diletakkan berdampingan untuk mempertegas kontras.',
      contrastNote: '"likewise" berarti demikian juga (kesamaan arah); "hence" berarti oleh karena itu.',
    },
  },
  {
    id: 'dm-7',
    sentence: 'The research institute cannot publish the longitudinal demographic dataset [ ___ ] written consent is explicitly granted by all surveyed participants.',
    options: ['unless', 'provided that', 'lest', 'as long as'],
    correctAnswer: 'unless',
    explanation: '"Unless" berarti "kecuali jika" (if not), menyatakan satu-satunya kondisi bersyarat yang mengizinkan publikasi data.',
    difficultyLevel: 2,
    category: 'Conditional Exclusion: Unless',
    structuralBreakdown: {
      focusLabel: 'Negative Condition: UNLESS',
      keyRule: '"cannot publish unless consent is granted" = tidak dapat dipublikasikan kecuali ada izin.',
      contrastNote: '"provided that" berarti "asalkan" (makna positif, tidak cocok dengan kalimat bernada larangan di awal).',
    },
  },
  {
    id: 'dm-8',
    sentence: 'Many young professionals prioritize rapid career promotion and financial incentives, [ ___ ] older demographics often place greater value on flexible work arrangements.',
    options: ['whereas', 'nevertheless', 'consequently', 'similarly'],
    correctAnswer: 'whereas',
    explanation: '"Whereas" adalah subordinating conjunction yang ideal untuk membandingkan dua preferensi kelompok yang berbeda dalam satu kalimat majemuk teratur.',
    difficultyLevel: 2,
    category: 'Comparative Contrast: Whereas',
    structuralBreakdown: {
      focusLabel: 'Direct Comparison: WHEREAS',
      keyRule: 'Digunakan di tengah kalimat setelah tanda koma untuk mengontraskan dua subjek yang berbeda.',
      contrastNote: '"nevertheless" adalah transition adverb yang memerlukan semicolon.',
    },
  },
  {
    id: 'dm-9',
    sentence: 'The government allocated substantial subsidies to solar manufacturers; [ ___ ], the domestic price of photovoltaic panels dropped by 40%.',
    options: ['thereby', 'as a result', 'in contrast', 'nonetheless'],
    correctAnswer: 'as a result',
    explanation: 'Hubungan klausa adalah sebab dan akibat langsung di awal klausa independen mandiri: "; as a result, the price dropped...".',
    difficultyLevel: 2,
    category: 'Consequential Transition: As a result',
    structuralBreakdown: {
      focusLabel: 'Result Linker: AS A RESULT',
      keyRule: 'Titik koma + as a result + koma menunjukkan kausalitas jelas antar kalimat.',
      contrastNote: '"thereby" adalah adverbia partisipial yang diikuti V-ing (thereby dropping prices), bukan klausa mandiri.',
    },
  },
  {
    id: 'dm-10',
    sentence: 'The candidate’s proposals were innovative; [ ___ ], they lacked pragmatic financial feasibility models.',
    options: ['nonetheless', 'therefore', 'furthermore', 'namely'],
    correctAnswer: 'nonetheless',
    explanation: 'Kalimat pertama bernada pujian ("innovative"), namun kalimat kedua menunjukkan kelemahan ("lacked feasibility"). Kata transisi konsesif kontras yang tepat adalah "nonetheless" (meskipun demikian / namun).',
    difficultyLevel: 3,
    category: 'Concessive Contrast: Nonetheless / Nevertheless',
    structuralBreakdown: {
      focusLabel: 'Concessive Transition: NONETHELESS',
      keyRule: '; nonetheless, mengakui kebenaran poin pertama namun memberikan pembatasan pada poin kedua.',
      contrastNote: '"therefore" keliru karena kurangnya kelayakan finansial bukan akibat dari inovasi proposal.',
    },
  },
];

export const discourseMarkersServerModule: ServerQuizModule = {
  id: DISCOURSE_MARKERS_MODULE_ID,
  meta: DISCOURSE_MARKERS_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Discourse Markers & Cohesion',
      feedbackTemplates: {
        master:
          'Penguasaan penanda wacana kamu sangat cermat! Alur logika esai dan argumen kamu mengalir koheren dan bervariasi ala penutur asli tingkat mahir (Band 8.0+).',
        advanced:
          'Kemampuan variasi penanda wacana sudah di level C1. Cermati konstruksi khusus seperti "albeit" vs "despite" dan "notwithstanding".',
      },
    });
  },
};

export default discourseMarkersServerModule;
