// src/server/quiz/modules/comma-splice/index.ts
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

export const COMMA_SPLICE_MODULE_ID = 'comma-splice';

export const COMMA_SPLICE_MODULE_META: QuizModuleMeta = {
  id: COMMA_SPLICE_MODULE_ID,
  title: 'Comma Splice & Run-on Sentence Elimination',
  shortTitle: 'Comma Splice & Run-ons',
  rubricTitle: 'Bebas dari kesalahan tanda baca koma terputus (comma splice): [ /5]',
  description:
    'Menghilangkan salah satu eror sintaksis paling fatal dalam IELTS Writing: menyambung dua klausa independen hanya dengan koma. Menguasai penggunaan titik koma (semicolon), konjungsi koordinasi FANBOYS, dan adverbia transisional (moreover, however, therefore).',
  targetCefr: 'B1 ➔ B2 / C1',
  iconName: 'FaParagraph',
  accentColor: '#f59e0b', // Amber
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.GRAMMAR,
  section: QUIZ_SECTION.A,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'cs-1',
    sentence: 'Pilih kalimat yang BEBAS dari kesalahan comma splice:',
    options: [
      'The pharmaceutical trial yielded promising results; consequently, researchers secured additional federal funding.',
      'The pharmaceutical trial yielded promising results, consequently, researchers secured additional federal funding.',
      'The pharmaceutical trial yielded promising results, researchers secured additional federal funding.',
      'The pharmaceutical trial yielded promising results therefore researchers secured additional federal funding.',
    ],
    correctAnswer: 'The pharmaceutical trial yielded promising results; consequently, researchers secured additional federal funding.',
    explanation: 'Kata "consequently" adalah conjunctive adverb, bukan coordinating conjunction. Menggabungkan dua klausa independen dengan conjunctive adverb mewajibkan titik koma (semicolon) sebelum kata tersebut dan koma setelahnya ("; consequently, ").',
    difficultyLevel: 2,
    category: 'Conjunctive Adverbs (; however, / ; therefore,)',
    structuralBreakdown: {
      focusLabel: 'Independent Clause ; Conjunctive Adverb, Independent Clause',
      keyRule: 'Dua klausa utuh dihubungkan dengan semicolon + transitional adverb + koma.',
      contrastNote: 'Menggunakan hanya koma ("results, consequently,") adalah kesalahan comma splice klasik.',
    },
  },
  {
    id: 'cs-2',
    sentence: 'Global temperatures continue to climb rapidly, [ ___ ] glaciers in polar regions are receding at an unprecedented rate.',
    options: ['and', 'moreover', 'however', 'therefore'],
    correctAnswer: 'and',
    explanation: 'Karena di depan slot hanya terdapat tanda koma tunggal (","), kata penghubung yang sah untuk menyambung dua klausa independen adalah coordinating conjunction FANBOYS ("and"). Kata seperti "moreover", "however", dan "therefore" memerlukan semicolon.',
    difficultyLevel: 1,
    category: 'Coordinating Conjunctions (FANBOYS)',
    structuralBreakdown: {
      focusLabel: 'Comma + FANBOYS (For, And, Nor, But, Or, Yet, So)',
      keyRule: 'Koma tunggal hanya boleh menghubungkan dua klausa independen jika diikuti kata FANBOYS.',
      contrastNote: 'Jika ingin memakai "moreover", tanda baca sebelum kata tersebut harus berupa semicolon (;).',
    },
  },
  {
    id: 'cs-3',
    sentence: 'Pilih perbaikan terbaik untuk kalimat comma splice: "Urban housing costs have skyrocketed, many young graduates cannot afford basic rent."',
    options: [
      'Because urban housing costs have skyrocketed, many young graduates cannot afford basic rent.',
      'Urban housing costs have skyrocketed, however many young graduates cannot afford basic rent.',
      'Urban housing costs have skyrocketed, so therefore many young graduates cannot afford basic rent.',
      'Urban housing costs have skyrocketed, many young graduates, cannot afford basic rent.',
    ],
    correctAnswer: 'Because urban housing costs have skyrocketed, many young graduates cannot afford basic rent.',
    explanation: 'Mengubah klausa pertama menjadi klausa dependen dengan konjungsi subordinat ("Because...") adalah cara paling elegan dan bernilai akademis tinggi untuk mengatasi comma splice.',
    difficultyLevel: 3,
    category: 'Subordinating Clause Repair',
    structuralBreakdown: {
      focusLabel: 'Subordinate Conjunction + Dependent Clause, Independent Clause',
      keyRule: 'Klausa "Because..." menjadi adverbial clause, sehingga koma pemisah setelahnya menjadi 100% legal.',
      contrastNote: '"so therefore" adalah pleonasme (pemborosan kata tak baku).',
    },
  },
  {
    id: 'cs-4',
    sentence: 'The archaeological team discovered ancient clay tablets [ ___ ] they were unable to decipher the cuneiform inscriptions without specialized linguistic software.',
    options: ['; however,', ', however', ', although', '; but'],
    correctAnswer: '; however,',
    explanation: 'Untuk menunjukkan kontras di antara dua klausa independen tanpa konjungsi koordinasi, gunakan pola titik koma + however + koma ("; however,").',
    difficultyLevel: 2,
    category: 'Contrast Transitions',
    structuralBreakdown: {
      focusLabel: '; however, construction',
      keyRule: 'Semicolon sebelum "however" menutup klausa pertama; koma setelahnya mengawali klausa kedua.',
      contrastNote: '", however" di tengah dua kalimat utuh adalah comma splice yang paling sering ditemukan penguji IELTS.',
    },
  },
  {
    id: 'cs-5',
    sentence: 'Pilih kalimat yang secara struktur gramatikal TEPAT:',
    options: [
      'Although electric vehicles produce zero tailpipe emissions, their lifecycle environmental impact depends heavily on how grid electricity is generated.',
      'Electric vehicles produce zero tailpipe emissions, their lifecycle environmental impact depends heavily on how grid electricity is generated.',
      'Electric vehicles produce zero tailpipe emissions, however, their lifecycle environmental impact depends heavily on grid electricity.',
      'Electric vehicles produce zero tailpipe emissions; but their lifecycle environmental impact depends on grid electricity.',
    ],
    correctAnswer: 'Although electric vehicles produce zero tailpipe emissions, their lifecycle environmental impact depends heavily on how grid electricity is generated.',
    explanation: 'Kalimat pertama menggunakan klausa konsesif "Although...", yang menghubungkan klausa anak dengan klausa induk secara sah menggunakan koma.',
    difficultyLevel: 3,
    category: 'Complex Sentence Structure',
    structuralBreakdown: {
      focusLabel: 'Although + Clause 1, Clause 2',
      keyRule: 'Kompleksitas klausa yang teratur bebas dari eror comma splice.',
      contrastNote: 'Kalimat kedua adalah comma splice murni; kalimat ketiga menyalahgunakan "however" dengan koma biasa.',
    },
  },
  {
    id: 'cs-6',
    sentence: 'Renewable energy infrastructure requires substantial initial capital [ ___ ] it yields immense long-term ecological dividends.',
    options: [', yet', '; yet,', ', nonetheless', ', therefore'],
    correctAnswer: ', yet',
    explanation: '"Yet" adalah anggota kelompok FANBOYS (coordinating conjunction) untuk hubungan kontras. Polanya adalah: koma + yet (", yet").',
    difficultyLevel: 2,
    category: 'FANBOYS: Yet for Contrast',
    structuralBreakdown: {
      focusLabel: 'Comma + Yet (Coordinating)',
      keyRule: 'Menggunakan ", yet" menghubungkan dua klausa independen dengan ringkas dan alami.',
      contrastNote: '", nonetheless" adalah comma splice karena "nonetheless" bukan konjungsi koordinasi.',
    },
  },
  {
    id: 'cs-7',
    sentence: 'Manakah tanda baca yang paling tepat untuk mengisi celah: "Artificial intelligence has expedited medical imaging diagnostics [ ___ ] clinicians must still verify anomalous findings."',
    options: [':', ';', ',', '-'],
    correctAnswer: ';',
    explanation: 'Semicolon (;) dapat berdiri sendiri menghubungkan dua klausa independen yang memiliki hubungan makna sangat erat tanpa memerlukan kata hubung konjungsi.',
    difficultyLevel: 3,
    category: 'Pure Semicolon Link',
    structuralBreakdown: {
      focusLabel: 'Independent Clause ; Independent Clause',
      keyRule: 'Titik koma mandiri menunjukkan kedekatan logika antar dua kalimat utuh.',
      contrastNote: 'Koma tunggal tanpa konjungsi akan menyebabkan comma splice.',
    },
  },
  {
    id: 'cs-8',
    sentence: 'Pilih opsi yang memperbaiki kesalahan run-on sentence: "The battery capacity was severely depleted the navigation system shut down immediately."',
    options: [
      'The battery capacity was severely depleted; as a result, the navigation system shut down immediately.',
      'The battery capacity was severely depleted, the navigation system shut down immediately.',
      'The battery capacity was severely depleted, so therefore the navigation system shut down immediately.',
      'The battery capacity was severely depleted because the navigation system shut down immediately.',
    ],
    correctAnswer: 'The battery capacity was severely depleted; as a result, the navigation system shut down immediately.',
    explanation: 'Run-on sentence (dua klausa menempel tanpa tanda baca) diperbaiki dengan semicolon + adverbia sebab-akibat ("; as a result, "). Opsi "because" keliru membalik logika kausalitas.',
    difficultyLevel: 3,
    category: 'Run-on Sentence Correction',
    structuralBreakdown: {
      focusLabel: '; as a result, transition',
      keyRule: 'Memisahkan dua klausa independen kausal dengan semicolon dan koma transisi.',
      contrastNote: 'Opsi kedua mengubah run-on menjadi comma splice (sama-sama salah).',
    },
  },
  {
    id: 'cs-9',
    sentence: 'Many students believe that cramming overnight improves retention, [ ___ ] cognitive scientists argue that sleep deprivation impairs memory consolidation.',
    options: ['whereas', 'however', 'moreover', 'on the other hand'],
    correctAnswer: 'whereas',
    explanation: '"Whereas" adalah subordinating conjunction (kata hubung bawahan) untuk perbandingan kontras, sehingga sah diawali tanda koma (", whereas..."). Sebaliknya, "however" dan "on the other hand" adalah transition adverbs yang mewajibkan semicolon.',
    difficultyLevel: 4,
    category: 'Subordinating Contrast: Whereas / While',
    structuralBreakdown: {
      focusLabel: 'Clause 1, whereas Clause 2',
      keyRule: '"whereas" dan "while" adalah subordinators, sah dipadukan dengan koma.',
      contrastNote: 'Banyak siswa menyamakan status "whereas" dengan "however", padahal aturan tanda bacanya berbeda.',
    },
  },
  {
    id: 'cs-10',
    sentence: 'Pilih kalimat yang SALAH karena mengandung comma splice:',
    options: [
      'Deforestation diminishes carbon sequestration capacity, it also destabilizes local precipitation cycles.',
      'Deforestation diminishes carbon sequestration capacity; it also destabilizes local precipitation cycles.',
      'Deforestation diminishes carbon sequestration capacity, and it also destabilizes local precipitation cycles.',
      'Not only does deforestation diminish carbon sequestration, but it also destabilizes local precipitation cycles.',
    ],
    correctAnswer: 'Deforestation diminishes carbon sequestration capacity, it also destabilizes local precipitation cycles.',
    explanation: 'Kalimat opsi pertama adalah comma splice murni karena menyambung dua klausa independen hanya dengan koma tanpa konjungsi koordinasi (FANBOYS) atau semicolon.',
    difficultyLevel: 2,
    category: 'Identifying Comma Splice Errors',
    structuralBreakdown: {
      focusLabel: 'Error Recognition: Clause, Clause (Splice)',
      keyRule: 'Dua klausa dengan subjek dan kata kerja lengkap tidak boleh dipisah koma semata.',
      contrastNote: 'Tiga opsi lainnya adalah alternatif kalimat yang benar secara gramatikal.',
    },
  },
];

export const commaSpliceServerModule: ServerQuizModule = {
  id: COMMA_SPLICE_MODULE_ID,
  meta: COMMA_SPLICE_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Comma Splice & Run-on Elimination',
      feedbackTemplates: {
        master:
          'Struktur sintaksis dan penggunaan tanda baca kamu sempurna! Esai kamu dijamin bersih dari comma splice dan run-on sentences.',
        advanced:
          'Penguasaan tanda baca sangat baik. Ingat perbedaan mendasar aturan tanda baca antara coordinating conjunctions (FANBOYS) dan conjunctive adverbs (; however,).',
      },
    });
  },
};

export default commaSpliceServerModule;
