// src/server/quiz/modules/conditionals/index.ts
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

export const CONDITIONALS_MODULE_ID = 'conditionals';

export const CONDITIONALS_MODULE_META: QuizModuleMeta = {
  id: CONDITIONALS_MODULE_ID,
  title: 'Conditionals Mastery (Type 2, Type 3 & Mixed)',
  shortTitle: 'Conditionals (Type 2 & 3)',
  rubricTitle: 'Penguasaan klausa pengandaian (Conditionals) tipe 2 dan 3: [ /5]',
  description:
    'Menguasai struktur pengandaian hipotesis masa kini (Type 2: If past, would + V1), penyesalan masa lalu (Type 3: If had + V3, would have + V3), serta kombinasi Mixed Conditionals untuk skor Grammatical Range Band 7.5+.',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaShuffle',
  accentColor: '#ec4899', // Pink
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.GRAMMAR,
  section: QUIZ_SECTION.A,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'cond-1',
    sentence: 'If the provincial administration [ ___ ] more aggressively in public transit five years ago, metropolitan gridlock would not be so crippling today.',
    options: ['had invested', 'invested', 'would invest', 'has invested'],
    correctAnswer: 'had invested',
    explanation: 'Ini adalah Mixed Conditional (sebab masa lalu berdampak pada kondisi masa kini: "five years ago" -> "today"). Klausa "If" merujuk ke masa lampau sehingga menggunakan Past Perfect ("had invested").',
    difficultyLevel: 4,
    category: 'Mixed Conditional (Past Cause, Present Result)',
    structuralBreakdown: {
      focusLabel: 'Mixed Conditional: If + Past Perfect, would + V1',
      keyRule: 'Penyebab di masa lalu ("five years ago") ➔ had + V3; Dampak sekarang ("today") ➔ would + V1.',
      contrastNote: 'Jangan gunakan "invested" (Type 2 murni tidak cocok dengan penanda waktu 5 tahun lalu).',
    },
  },
  {
    id: 'cond-2',
    sentence: 'Had the regulatory authorities [ ___ ] the algorithmic bias earlier, millions of consumers would not have suffered discriminatory loan denials.',
    options: ['scrutinized', 'scrutinize', 'been scrutinized', 'have scrutinized'],
    correctAnswer: 'scrutinized',
    explanation: 'Ini adalah Inverted Third Conditional (tanpa kata "If"). Pola inversinya: "Had + Subject + V3" menggantikan "If + Subject + had + V3". Kata kerja yang tepat adalah "scrutinized".',
    difficultyLevel: 5,
    category: 'Inversion in Third Conditional',
    structuralBreakdown: {
      focusLabel: 'Inverted Conditional: Had + S + V3, S + would have + V3',
      keyRule: '"Had the authorities scrutinized" = "If the authorities had scrutinized".',
      contrastNote: 'Struktur tingkat mahir (C1/C2) yang sangat diapresiasi dalam kriteria Grammatical Range IELTS.',
    },
  },
  {
    id: 'cond-3',
    sentence: 'If sovereign governments [ ___ ] to enforce stringent international carbon levies, multinational corporations would quickly transition to clean energy.',
    options: ['were', 'are', 'would be', 'will be'],
    correctAnswer: 'were',
    explanation: 'Ini adalah Conditional Type 2 dengan bentuk formal "were to + infinitive" ("If sovereign governments were to enforce..."). Menunjukkan kemungkinan hipotesis yang masih rendah atau ragu-ragu di masa depan.',
    difficultyLevel: 3,
    category: 'Second Conditional with "were to"',
    structuralBreakdown: {
      focusLabel: 'Hypothetical Conditional: If + were to [V1], would + V1',
      keyRule: '"were to enforce" memberikan nuansa tentatif akademis yang formal.',
      contrastNote: '"are" menjadikan kalimat Type 1 yang terlalu faktual untuk skenario hipotesis.',
    },
  },
  {
    id: 'cond-4',
    sentence: 'If the pharmaceutical company [ ___ ] the clinical findings promptly, the public health disaster could have been averted.',
    options: ['had disclosed', 'disclosed', 'would disclose', 'has disclosed'],
    correctAnswer: 'had disclosed',
    explanation: 'Klausa hasil menggunakan "could have been averted" (Third Conditional, masa lalu). Maka klausa bersyarat "if" harus menggunakan Past Perfect ("had disclosed").',
    difficultyLevel: 2,
    category: 'Third Conditional (Unreal Past)',
    structuralBreakdown: {
      focusLabel: 'Type 3: If + had + V3, could/would have + V3',
      keyRule: 'Pengandaian yang berlawanan dengan kenyataan masa lalu menuntut Past Perfect di klausa if.',
      contrastNote: 'Tidak boleh menggunakan "would" di dalam anak kalimat "if".',
    },
  },
  {
    id: 'cond-5',
    sentence: 'Were the global community [ ___ ] immediate decisive action on deforestation, countless indigenous ecosystems would be preserved.',
    options: ['to take', 'taking', 'taken', 'took'],
    correctAnswer: 'to take',
    explanation: 'Inversi pada Conditional Type 2: "Were + Subject + to + V1" menggantikan "If the global community took...". Polanya mewajibkan to-infinitive ("to take").',
    difficultyLevel: 4,
    category: 'Inverted Second Conditional: Were + S + to-inf',
    structuralBreakdown: {
      focusLabel: 'Inversion Type 2: Were + Subject + to [V1]',
      keyRule: '"Were the global community to take..." = "If the global community took...".',
      contrastNote: 'Bentuk ini menandai keanggunan gaya bahasa formal C1.',
    },
  },
  {
    id: 'cond-6',
    sentence: 'If atmospheric carbon emissions [ ___ ] unchecked, average global temperatures would inevitably surge by three degrees.',
    options: ['remained', 'remain', 'will remain', 'have remained'],
    correctAnswer: 'remained',
    explanation: 'Klausa hasil memuat "would inevitably surge" (would + V1). Ini adalah tanda pasti Conditional Type 2, sehingga klausa "if" memerlukan Simple Past ("remained").',
    difficultyLevel: 2,
    category: 'Second Conditional (Hypothetical Present)',
    structuralBreakdown: {
      focusLabel: 'Type 2: If + Past Simple (V2), would + V1',
      keyRule: '"remained" berpasangan dengan "would surge" untuk situasi hipotesis.',
      contrastNote: 'Jangan mencampur "remain" (V1) dengan "would surge".',
    },
  },
  {
    id: 'cond-7',
    sentence: 'Unless developing nations [ ___ ] equitable financial subsidies, they will not be able to decommission coal power plants.',
    options: ['receive', 'will receive', 'received', 'do not receive'],
    correctAnswer: 'receive',
    explanation: 'Kata "Unless" bermakna "If not", dan di dalam klausa kondisional masa depan, kata kerja harus berbentuk Present Simple ("receive"), bukan future ("will receive") dan bukan negatif ganda.',
    difficultyLevel: 2,
    category: 'Conditional Conjunction: Unless',
    structuralBreakdown: {
      focusLabel: 'Unless + Present Simple (Positive), will + V1',
      keyRule: '"Unless nations receive" = "If nations do not receive".',
      contrastNote: 'Menambahkan kata negatif ("do not receive") setelah "unless" adalah kesalahan fatal double-negative.',
    },
  },
  {
    id: 'cond-8',
    sentence: 'If the laboratory technician had sterilized the petri dishes properly, the culture samples [ ___ ] contaminated.',
    options: ['would not have become', 'would not become', 'will not become', 'had not become'],
    correctAnswer: 'would not have become',
    explanation: 'Klausa "if" menggunakan Past Perfect ("had sterilized"), dan dampaknya juga terjadi di masa lalu saat percobaan berlangsung. Hasilnya harus berupa Third Conditional: "would not have become".',
    difficultyLevel: 3,
    category: 'Third Conditional Result Clause',
    structuralBreakdown: {
      focusLabel: 'Type 3 Result: would have + V3',
      keyRule: '"would not have become" menyatakan hasil yang batal terjadi di masa lalu.',
      contrastNote: '"would not become" adalah Type 2 (merujuk masa sekarang), kurang tepat untuk hasil uji laboratorium masa lalu.',
    },
  },
  {
    id: 'cond-9',
    sentence: 'The historical summit would have achieved its peace objective [ ___ ] for the sudden breakdown of diplomatic communications.',
    options: ['had it not been', 'if it was not', 'were it not', 'has it not been'],
    correctAnswer: 'had it not been',
    explanation: 'Idiom kondisional inversi lampau: "had it not been for [noun]" artinya "seandainya bukan karena...". Digunakan berpasangan dengan "would have + V3".',
    difficultyLevel: 4,
    category: 'Fixed Inversion: Had it not been for...',
    structuralBreakdown: {
      focusLabel: 'Had it not been for [Noun Phrase]',
      keyRule: 'Frasa baku penyesalan masa lalu: "Had it not been for the sudden breakdown...".',
      contrastNote: '"Were it not for" dipakai untuk kondisi saat ini, bukan masa lalu yang sudah tuntas.',
    },
  },
  {
    id: 'cond-10',
    sentence: 'If the city planner [ ___ ] bilingual, she could serve as the lead liaison for foreign investment delegations right now.',
    options: ['were', 'had been', 'is', 'would be'],
    correctAnswer: 'were',
    explanation: 'Menyatakan kondisi sifat permanen/keadaan masa kini ("If she were bilingual", subjunctive) dengan konsekuensi saat ini ("right now"), menggunakan Conditional Type 2 dengan "were".',
    difficultyLevel: 3,
    category: 'Subjunctive Were in Type 2',
    structuralBreakdown: {
      focusLabel: 'Subjunctive "were" for all subjects in Type 2',
      keyRule: 'Dalam bahasa Inggris formal/akademis, gunakan "were" meskipun subjek tunggal ("she were").',
      contrastNote: '"was" dianggap kurang formal dalam penulisan esai standar Cambridge.',
    },
  },
];

export const conditionalsServerModule: ServerQuizModule = {
  id: CONDITIONALS_MODULE_ID,
  meta: CONDITIONALS_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Conditionals (Type 2, 3 & Mixed)',
      feedbackTemplates: {
        master:
          'Penguasaan Conditionals kamu sangat istimewa! Kamu menguasai inversi tingkat tinggi (Had... / Were...) dan Mixed Conditionals dengan presisi sempurna.',
        advanced:
          'Kemampuan conditionals kamu sudah di level B2/C1. Cermati penanda waktu penentu pada klausa sebab vs akibat di Mixed Conditionals.',
      },
    });
  },
};

export default conditionalsServerModule;
