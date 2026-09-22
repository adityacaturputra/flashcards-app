// src/server/quiz/modules/tenses/index.ts
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

export const TENSES_MODULE_ID = 'tenses';

export const TENSES_MODULE_META: QuizModuleMeta = {
  id: TENSES_MODULE_ID,
  title: 'Present Perfect vs. Simple Past Mastery',
  shortTitle: 'Present Perfect vs Simple Past',
  rubricTitle: 'Kemampuan membedakan Present Perfect dan Simple Past: [ /5]',
  description:
    'Membedakan aksi selesai di masa lalu berpenanda waktu pasti (Simple Past) versus aksi masa lalu dengan relevansi masa kini atau waktu belum selesai (Present Perfect). Standar penulisan akademik IELTS & CEFR B2/C1.',
  targetCefr: 'B1 ➔ B2 / C1',
  iconName: 'FaClock',
  accentColor: '#3b82f6', // Blue
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.GRAMMAR,
  section: QUIZ_SECTION.A,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'tenses-1',
    sentence: 'The research team [ ___ ] the field survey in November 2021 before publishing their initial findings.',
    options: ['completed', 'has completed', 'have completed', 'was completing'],
    correctAnswer: 'completed',
    explanation: 'Keterangan waktu lampau spesifik ("in November 2021") mewajibkan penggunaan Simple Past (V2: completed), bukan Present Perfect.',
    difficultyLevel: 1,
    category: 'Specific Past Time Anchor',
    structuralBreakdown: {
      focusLabel: 'Simple Past (V2)',
      keyRule: 'Terdapat penanda waktu spesifik yang sudah tuntas ("in November 2021").',
      contrastNote: 'Present Perfect ("has completed") dilarang bila titik waktu lampau disebutkan secara pasti.',
    },
  },
  {
    id: 'tenses-2',
    sentence: 'Over the last decade, municipal governments [ ___ ] extensive investments into sustainable transit systems.',
    options: ['have channeled', 'channeled', 'channels', 'had channeled'],
    correctAnswer: 'have channeled',
    explanation: 'Frasa "Over the last decade" menunjukkan rentang waktu dari masa lalu yang berlanjut hingga sekarang (unfinished time frame), sehingga wajib menggunakan Present Perfect.',
    difficultyLevel: 2,
    category: 'Unfinished Time Window',
    structuralBreakdown: {
      focusLabel: 'Present Perfect (have + V3)',
      keyRule: 'Frasa "Over the last decade" / "Since 2010" merujuk periode waktu yang menyentuh masa kini.',
      contrastNote: 'Simple Past ("channeled") hanya dipakai jika dekade tersebut sudah benar-benar tertutup di masa lampau.',
    },
  },
  {
    id: 'tenses-3',
    sentence: 'Although the industrialist [ ___ ] bankrupt in 2015, his newly founded tech venture has now surpassed ten million users.',
    options: ['went', 'has gone', 'had gone', 'was gone'],
    correctAnswer: 'went',
    explanation: 'Terdapat penanda tahun lampau yang terisolasi ("in 2015"), sehingga klausa anak tersebut wajib memakai Simple Past ("went").',
    difficultyLevel: 2,
    category: 'Specific Past Time Anchor',
    structuralBreakdown: {
      focusLabel: 'Simple Past vs Present Result',
      keyRule: 'Klausa lampau dengan penanda tahun tertentu ("in 2015") tetap menggunakan V2 ("went").',
      contrastNote: 'Hasil masa kini ("has now surpassed") di klausa utama menggunakan Present Perfect.',
    },
  },
  {
    id: 'tenses-4',
    sentence: 'To date, no clinical trial [ ___ ] definitive evidence demonstrating that the compound poses long-term toxicity risks.',
    options: ['has produced', 'produced', 'produces', 'is producing'],
    correctAnswer: 'has produced',
    explanation: 'Frasa penanda "To date" (hingga saat ini) adalah indikator klasik Present Perfect yang menghubungkan bukti akumulatif masa lalu dengan kenyataan hari ini.',
    difficultyLevel: 3,
    category: 'Indefinite Experience / Status',
    structuralBreakdown: {
      focusLabel: 'Present Perfect (has + V3)',
      keyRule: '"To date" / "So far" / "Up to now" menunjukkan durasi yang masih berlaku saat kalimat diucapkan.',
      contrastNote: '"Produced" keliru karena meniadakan kesinambungan fakta ke waktu sekarang.',
    },
  },
  {
    id: 'tenses-5',
    sentence: 'The European Union [ ___ ] the landmark carbon neutrality directive three years ago after intense parliamentary debates.',
    options: ['enacted', 'has enacted', 'have enacted', 'enacts'],
    correctAnswer: 'enacted',
    explanation: 'Kata keterangan "three years ago" selalu menuntut Simple Past (V2), karena penanda "... ago" secara mutlak mengunci waktu di masa lalu.',
    difficultyLevel: 1,
    category: 'Specific Past Time Anchor',
    structuralBreakdown: {
      focusLabel: 'Simple Past with "... ago"',
      keyRule: 'Semua ekspresi dengan "ago" adalah penanda Simple Past mutlak.',
      contrastNote: 'Jangan terkecoh dampak kebijakan saat ini; struktur tetap ditentukan oleh frasa waktu "three years ago".',
    },
  },
  {
    id: 'tenses-6',
    sentence: 'Scientists [ ___ ] over 5,000 exoplanets since the Kepler space observatory began its deep-sky observation mission.',
    options: ['have identified', 'identified', 'were identifying', 'had identified'],
    correctAnswer: 'have identified',
    explanation: 'Klausa "since [kejadian lampau]" mengharuskan klausa utama menggunakan Present Perfect ("have identified") untuk menyatakan akumulasi hasil dari titik mula tersebut hingga kini.',
    difficultyLevel: 3,
    category: 'Since + Past Time Clause',
    structuralBreakdown: {
      focusLabel: 'Main Clause (Present Perfect) + Since (Simple Past)',
      keyRule: 'Rumus baku: Subject + have/has + V3 + SINCE + Subject + V2.',
      contrastNote: 'Identifikasi planet terus bertambah hingga masa sekarang.',
    },
  },
  {
    id: 'tenses-7',
    sentence: 'The ancient trade city of Palmyra [ ___ ] a vital crossroads for Silk Road merchants for more than three centuries before its decline.',
    options: ['remained', 'has remained', 'is remaining', 'has been remaining'],
    correctAnswer: 'remained',
    explanation: 'Meskipun memakai preposisi "for [duration]", aksi ini terjadi dan telah berakhir sepenuhnya pada era peradaban kuno (historical past), sehingga wajib menggunakan Simple Past ("remained").',
    difficultyLevel: 4,
    category: 'Historical Closed Durations',
    structuralBreakdown: {
      focusLabel: 'Simple Past for Completed Historic Eras',
      keyRule: 'Durasi dengan "for..." yang pelakunya atau periodenya sudah berakhir di masa lampau harus Simple Past.',
      contrastNote: 'Banyak peserta tes terjebak memakai Present Perfect hanya karena melihat kata "for".',
    },
  },
  {
    id: 'tenses-8',
    sentence: 'Renewable energy prices [ ___ ] drastically in recent years, making solar power competitive with fossil fuels.',
    options: ['have plummeted', 'plummeted', 'had plummeted', 'plummet'],
    correctAnswer: 'have plummeted',
    explanation: '"In recent years" merujuk pada perubahan bertahap dalam beberapa tahun belakangan yang relevan langsung dengan kondisi industri masa kini.',
    difficultyLevel: 3,
    category: 'Recent Past with Current Impact',
    structuralBreakdown: {
      focusLabel: 'Present Perfect (in recent years)',
      keyRule: '"In recent years / recently / lately" membutuhkan Present Perfect untuk menyatakan tren yang sedang berlangsung.',
      contrastNote: 'Simple Past "plummeted" terkesan peristiwa tersebut terjadi pada satu titik tertentu yang sudah lewat.',
    },
  },
  {
    id: 'tenses-9',
    sentence: 'When Alexander Fleming accidentally [ ___ ] penicillin in 1928, medical science was revolutionized forever.',
    options: ['discovered', 'has discovered', 'had discovered', 'discovers'],
    correctAnswer: 'discovered',
    explanation: 'Penanda tahun "in 1928" dalam klausa waktu lampau "When..." memastikan Simple Past ("discovered").',
    difficultyLevel: 2,
    category: 'Specific Past Time Anchor',
    structuralBreakdown: {
      focusLabel: 'Historical Event in Past Time',
      keyRule: 'Peristiwa sejarah dengan tahun ("in 1928") wajib Simple Past.',
      contrastNote: 'Meskipun antibiotik masih dipakai sekarang, penemuannya terjadi pada titik waktu tertentu.',
    },
  },
  {
    id: 'tenses-10',
    sentence: 'The government [ ___ ] already implemented rigorous fiscal safeguards to prevent another banking crisis.',
    options: ['has', 'did', 'was', 'had'],
    correctAnswer: 'has',
    explanation: 'Adverb "already" diletakkan di antara auxiliary "has" dan past participle "implemented" untuk menyatakan tindakan yang sudah tuntas dengan dampak pencegahan saat ini.',
    difficultyLevel: 2,
    category: 'Adverb Marker: Already',
    structuralBreakdown: {
      focusLabel: 'Present Perfect (has + already + V3)',
      keyRule: 'Struktur auxiliary "has" + already + V3 menunjukkan kesiapan kondisi saat ini.',
      contrastNote: '"did implemented" adalah eror gramatikal ganda.',
    },
  },
];

export const tensesServerModule: ServerQuizModule = {
  id: TENSES_MODULE_ID,
  meta: TENSES_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Present Perfect vs. Simple Past',
      feedbackTemplates: {
        master:
          'Penguasaan tenses kamu sangat tajam! Kamu dapat membedakan penanda waktu tertutup (Simple Past) dan jendela waktu terbuka/relevansi kini (Present Perfect) secara sempurna.',
        advanced:
          'Kemampuan membedakan tenses sudah di level B2/C1. Cermati kalimat jebakan berpenanda "for" pada masa lalu sejarah yang sudah tuntas.',
      },
    });
  },
};

export default tensesServerModule;
