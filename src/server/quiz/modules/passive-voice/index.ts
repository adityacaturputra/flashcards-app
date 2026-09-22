// src/server/quiz/modules/passive-voice/index.ts
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

export const PASSIVE_VOICE_MODULE_ID = 'passive-voice';

export const PASSIVE_VOICE_MODULE_META: QuizModuleMeta = {
  id: PASSIVE_VOICE_MODULE_ID,
  title: 'Contextual Passive Voice & Process Descriptions',
  shortTitle: 'Contextual Passive Voice',
  rubricTitle: 'Penggunaan kalimat pasif secara tepat konteks: [ /5]',
  description:
    'Penguasaan kalimat pasif untuk konteks objektif akademis, laporan ilmiah, dan diagram proses IELTS Writing Task 1 (is subsequently purified, was synthesized, are being transported).',
  targetCefr: 'B1 ➔ B2 / C1',
  iconName: 'FaGears',
  accentColor: '#8b5cf6', // Violet
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.GRAMMAR,
  section: QUIZ_SECTION.A,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'pv-1',
    sentence: 'In the initial phase of water desalination, raw seawater [ ___ ] through semi-permeable membranes under extreme pressure.',
    options: ['is forced', 'forces', 'is forcing', 'forced'],
    correctAnswer: 'is forced',
    explanation: 'Pada diagram proses industri (Task 1), objek "raw seawater" tidak melakukan aksi sendiri melainkan dikenai tindakan secara sistematis ("is forced").',
    difficultyLevel: 1,
    category: 'Process Diagram (Present Simple Passive)',
    structuralBreakdown: {
      focusLabel: 'Present Simple Passive: is/are + V3',
      keyRule: 'Subjek non-agen ("raw seawater") dikenai aksi oleh mesin / tekanan sistemik.',
      contrastNote: 'Bentuk aktif ("forces") keliru karena air laut bukan pelaku pendorong.',
    },
  },
  {
    id: 'pv-2',
    sentence: 'The experimental synthetic polymers [ ___ ] at temperatures exceeding 300 degrees Celsius to test their thermal resilience.',
    options: ['were cured', 'cured', 'were curing', 'have cured'],
    correctAnswer: 'were cured',
    explanation: 'Dalam metode ilmiah laporan penelitian lampau, polimer sintesis dipanaskan/diproses ("were cured") oleh peneliti, sehingga memerlukan bentuk past passive jamak.',
    difficultyLevel: 2,
    category: 'Scientific Methodology Passive',
    structuralBreakdown: {
      focusLabel: 'Past Simple Passive (Plural): were + V3',
      keyRule: 'Subjek jamak "polymers" membutuhkan auxiliary "were" + past participle "cured".',
      contrastNote: 'Peneliti tidak perlu disebutkan karena fokus diletakkan pada material.',
    },
  },
  {
    id: 'pv-3',
    sentence: 'Once the recycled pulp [ ___ ] of chemical contaminants, it is conveyed to the drying rollers.',
    options: ['has been stripped', 'has stripped', 'is stripping', 'stripped'],
    correctAnswer: 'has been stripped',
    explanation: 'Klausa waktu bersyarat "Once..." menyatakan proses yang harus tuntas terlebih dahulu sebelum langkah berikutnya. Bentuk yang tepat adalah Present Perfect Passive ("has been stripped").',
    difficultyLevel: 3,
    category: 'Sequential Process Passive',
    structuralBreakdown: {
      focusLabel: 'Present Perfect Passive: has been + V3',
      keyRule: '"Once + Subject + has been + V3" menandai prasyarat proses yang selesai sebelum tahap lanjut.',
      contrastNote: '"has stripped" adalah bentuk aktif yang keliru untuk bubur kertas.',
    },
  },
  {
    id: 'pv-4',
    sentence: 'It [ ___ ] that excessive urban expansion will exacerbate regional groundwater depletion by 2040.',
    options: ['is widely anticipated', 'widely anticipates', 'is anticipating', 'has anticipated'],
    correctAnswer: 'is widely anticipated',
    explanation: 'Penggunaan impersonal passive ("It is widely anticipated / argued that...") adalah teknik penting dalam Academic Writing untuk menjaga objektivitas dan menghindari klaim personal berlebih.',
    difficultyLevel: 3,
    category: 'Impersonal Academic Passive',
    structuralBreakdown: {
      focusLabel: 'Impersonal Passive: It is + past participle + that-clause',
      keyRule: 'Struktur baku objektivitas: "It is widely anticipated that...".',
      contrastNote: 'Menghindari kata ganti orang pertama informal ("We anticipate that...").',
    },
  },
  {
    id: 'pv-5',
    sentence: 'The discarded lithium-ion battery modules must [ ___ ] in temperature-controlled containers to prevent thermal runaway.',
    options: ['be transported', 'transport', 'have transported', 'being transported'],
    correctAnswer: 'be transported',
    explanation: 'Setelah modal auxiliary ("must", "can", "should"), bentuk pasif dibentuk dengan modal + be + V3 ("must be transported").',
    difficultyLevel: 2,
    category: 'Modal Passive: Modal + be + V3',
    structuralBreakdown: {
      focusLabel: 'Modal Passive: Modal + be + Past Participle',
      keyRule: '"must be transported" menyatakan instruksi keselamatan regulasi.',
      contrastNote: 'Jangan melupakan "be" setelah modal verb.',
    },
  },
  {
    id: 'pv-6',
    sentence: 'The historical treaty documents [ ___ ] meticulously by archival specialists since their discovery in the monastery vault.',
    options: ['have been restored', 'were restored', 'are restored', 'restored'],
    correctAnswer: 'have been restored',
    explanation: 'Adanya penanda "since their discovery" mewajibkan Present Perfect, dan karena dokumen adalah pihak yang dipulihkan, bentuk yang benar adalah Present Perfect Passive ("have been restored").',
    difficultyLevel: 3,
    category: 'Perfect Passive with "Since"',
    structuralBreakdown: {
      focusLabel: 'Present Perfect Passive: have been + V3 (Plural)',
      keyRule: '"have been restored" menghubungkan proses restorasi berkelanjutan sejak penemuan.',
      contrastNote: '"were restored" mengabaikan penanda "since".',
    },
  },
  {
    id: 'pv-7',
    sentence: 'Before the ceramic tiles are placed inside the kiln, they [ ___ ] with an impervious glaze coating.',
    options: ['are coated', 'coat', 'are coating', 'have coated'],
    correctAnswer: 'are coated',
    explanation: 'Ubin keramik dikenai pelapisan glaze ("are coated") sebagai tahapan operasional sebelum pembakaran.',
    difficultyLevel: 2,
    category: 'Process Stage Passive',
    structuralBreakdown: {
      focusLabel: 'Present Simple Passive (Plural)',
      keyRule: '"they are coated with..." = langkah perlakuan material.',
      contrastNote: 'Bentuk aktif "coat" memerlukan objek langsung yang tidak ada di konteks ini.',
    },
  },
  {
    id: 'pv-8',
    sentence: 'The clinical hypothesis was discarded after subsequent randomized trials [ ___ ] to corroborate its assertions.',
    options: ['failed', 'were failed', 'have failed', 'are failing'],
    correctAnswer: 'failed',
    explanation: 'Perhatikan jebakan: kata kerja "fail" dalam konteks ini adalah intransitif ("trials failed to show..."). Jangan mem-pasifkan kata kerja yang bermakna intransitif!',
    difficultyLevel: 4,
    category: 'Intransitive Verb Trap (No Passive)',
    structuralBreakdown: {
      focusLabel: 'Intransitive Verb Trap: No Passive Form',
      keyRule: 'Kata kerja intransitif seperti "fail to", "occur", "happen", "die" tidak memiliki bentuk pasif.',
      contrastNote: '"were failed" adalah kesalahan fatal yang sering muncul di esai Task 2.',
    },
  },
  {
    id: 'pv-9',
    sentence: 'New cybersecurity firewalls are currently [ ___ ] across all municipal data repositories to fend off ransomware attacks.',
    options: ['being deployed', 'deployed', 'deploying', 'be deployed'],
    correctAnswer: 'being deployed',
    explanation: 'Kombinasi "are currently + [ ___ ]" untuk proses yang sedang berlangsung secara pasif menuntut bentuk Continuous Passive: are being + V3 ("being deployed").',
    difficultyLevel: 3,
    category: 'Present Continuous Passive: being + V3',
    structuralBreakdown: {
      focusLabel: 'Continuous Passive: are currently being + V3',
      keyRule: '"being deployed" menekankan aktivitas instalasi yang tengah berlangsung.',
      contrastNote: 'Tanpa "being", kontinuitas saat ini hilang.',
    },
  },
  {
    id: 'pv-10',
    sentence: 'The vaccine formula [ ___ ] to provide up to 92% efficacy in mitigating severe respiratory symptoms.',
    options: ['has been shown', 'has shown', 'was showing', 'shows'],
    correctAnswer: 'has been shown',
    explanation: 'Struktur pasif evaluasi klinis: "The formula has been shown to provide..." (Formula tersebut telah terbukti / diperlihatkan memberikan efikasi tinggi).',
    difficultyLevel: 3,
    category: 'Evaluative Passive with Infinitive',
    structuralBreakdown: {
      focusLabel: 'Passive + to-infinitive construction',
      keyRule: '"Subject + has been shown + to [verb]" adalah konvensi penulisan sains baku.',
      contrastNote: 'Mengalihkan fokus dari peneliti kepada performa formula vaksin.',
    },
  },
];

export const passiveVoiceServerModule: ServerQuizModule = {
  id: PASSIVE_VOICE_MODULE_ID,
  meta: PASSIVE_VOICE_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Contextual Passive Voice',
      feedbackTemplates: {
        master:
          'Penguasaan kalimat pasif kamu luar biasa! Kamu memahami tatanan pasif proses industri, impersonal passive, hingga jebakan kata kerja intransitif.',
        advanced:
          'Kemampuan kalimat pasif sangat baik untuk penulisan Task 1 dan Task 2. Waspadai pembedaan antara aksi kontinu (being + V3) dan prasyarat tuntas (has been + V3).',
      },
    });
  },
};

export default passiveVoiceServerModule;
