// src/server/quiz/modules/spelling-accuracy/index.ts
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

export const SPELLING_ACCURACY_MODULE_ID = 'spelling-accuracy';

export const SPELLING_ACCURACY_MODULE_META: QuizModuleMeta = {
  id: SPELLING_ACCURACY_MODULE_ID,
  title: 'Academic Spelling Accuracy & Orthographic Precision',
  shortTitle: 'Spelling Accuracy',
  rubricTitle: 'Kerapian ejaan kata berbahasa Inggris (spelling accuracy): [ /5]',
  description:
    'Menghilangkan salah ketik fatal (*accommodation, occurrence, privilege, questionnaire, hierarchy*) yang dapat langsung menggugurkan nilai di IELTS Listening, Reading, dan Writing Task 1/2.',
  targetCefr: 'B1 ➔ B2 / C1',
  iconName: 'FaSpellCheck',
  accentColor: '#e11d48', // Rose
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.VOCABULARY,
  section: QUIZ_SECTION.B,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'spell-1',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti tempat tinggal atau akomodasi penginapan:',
    options: ['accommodation', 'accomodation', 'acommodation', 'acomodation'],
    correctAnswer: 'accommodation',
    explanation: 'Kata "accommodation" memiliki DUA huruf "c" dan DUA huruf "m" (double c, double m). Ini adalah kata yang paling sering salah dieja dalam tes IELTS Listening dan Writing.',
    difficultyLevel: 1,
    category: 'Double Consonant Pitfall (c & m)',
    structuralBreakdown: {
      focusLabel: 'ac-com-mo-da-tion (double C, double M)',
      keyRule: 'Ingat trik memori: "Accommodation needs 2 Cats and 2 Mice".',
      contrastNote: 'Menulis "accomodation" (satu m) akan langsung disalahkan dalam tes IELTS Listening.',
    },
  },
  {
    id: 'spell-2',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang merujuk pada peristiwa kemunculan atau kejadian berulang:',
    options: ['occurrence', 'occurrance', 'ocurrence', 'occurrannce'],
    correctAnswer: 'occurrence',
    explanation: '"Occurrence" dieja dengan DUA "c", DUA "r", dan diakhiri akhiran "-ence" (bukan -ance). Berasal dari kata dasar "occur" yang menggandakan konsonan "r" sebelum suffix vokal.',
    difficultyLevel: 2,
    category: 'Doubled Consonant & Suffix Rule (-ence)',
    structuralBreakdown: {
      focusLabel: 'oc-cur-rence (double C, double R, -ENCE)',
      keyRule: 'Konsonan terakhir digandakan: occur ➔ occurred ➔ occurrence.',
      contrastNote: 'Banyak peserta salah memilih akhiran "-ance" ("occurrance").',
    },
  },
  {
    id: 'spell-3',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti kuesioner lembar survei data:',
    options: ['questionnaire', 'questionaire', 'questionare', 'questionnair'],
    correctAnswer: 'questionnaire',
    explanation: '"Questionnaire" dieja dengan DUA huruf "n" ("question" + "n" + "aire") dan diakhiri huruf "e".',
    difficultyLevel: 2,
    category: 'French Loanword Suffix (-nnaire)',
    structuralBreakdown: {
      focusLabel: 'question-naire (double N)',
      keyRule: 'Berakar dari bahasa Prancis: ada 2 huruf N sebelum -aire.',
      contrastNote: 'Menulis "questionaire" dengan 1 N adalah eror paling umum.',
    },
  },
  {
    id: 'spell-4',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang bermakna hak istimewa atau privilese:',
    options: ['privilege', 'priviledge', 'privelege', 'privlege'],
    correctAnswer: 'privilege',
    explanation: '"Privilege" TIDAK mengandung huruf "d" dan memiliki pola vokal: i - i - e (p-r-i-v-i-l-e-g-e).',
    difficultyLevel: 3,
    category: 'Silent Letter Illusion (No "d")',
    structuralBreakdown: {
      focusLabel: 'p-r-i-v-i-l-e-g-e (No "d"!)',
      keyRule: 'Banyak yang terpengaruh kata "edge" atau "knowledge" sehingga salah menulis "priviledge".',
      contrastNote: 'Tidak ada huruf "d" dalam kata privilege.',
    },
  },
  {
    id: 'spell-5',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti tatanan hierarki jenjang tingkatan:',
    options: ['hierarchy', 'heirarchy', 'hierarcy', 'heirarcy'],
    correctAnswer: 'hierarchy',
    explanation: '"Hierarchy" diawali urutan huruf "h-i-e" (bukan "h-e-i") dan diakhiri "-archy".',
    difficultyLevel: 3,
    category: 'Vowel Inversion (ie vs ei)',
    structuralBreakdown: {
      focusLabel: 'h-i-e-r-a-r-c-h-y',
      keyRule: 'Berasal dari bahasa Yunani "hieros" (suci): diawali H-I-E.',
      contrastNote: 'Jangan tertukar dengan kata "heir" (ahli waris).',
    },
  },
  {
    id: 'spell-6',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti lingkungan hidup alamiah sekitar:',
    options: ['environment', 'enviroment', 'environemnt', 'environtment'],
    correctAnswer: 'environment',
    explanation: '"Environment" memiliki huruf "n" di tengah sebelum "-ment" (en-vi-ron-ment). Huruf "n" ini sering terlewat karena tidak terdengar jelas dalam pelafalan cepat.',
    difficultyLevel: 1,
    category: 'Silent Mid-word Nasal (ron-ment)',
    structuralBreakdown: {
      focusLabel: 'en-vi-RON-ment',
      keyRule: 'Ingat kata dasarnya "environ" (mengitari) + "-ment".',
      contrastNote: '"enviroment" (tanpa n) adalah salah satu eror paling memalukan di Writing Task 2 topik lingkungan.',
    },
  },
  {
    id: 'spell-7',
    sentence: 'Pilih ejaan yang BENAR untuk kata sifat yang berarti sangat diperlukan / mutlak butuh:',
    options: ['necessary', 'neccessary', 'necesary', 'necessery'],
    correctAnswer: 'necessary',
    explanation: '"Necessary" dieja dengan SATU huruf "c" dan DUA huruf "s" (one Collar, two Sleeves).',
    difficultyLevel: 1,
    category: 'Single vs Double Consonants (c & s)',
    structuralBreakdown: {
      focusLabel: 'ne-ces-sa-ry (1 C, 2 S)',
      keyRule: 'Trik memori kemeja: "1 Collar (C) and 2 Sleeves (SS)".',
      contrastNote: 'Menulis "neccessary" (dua C) adalah kekeliruan umum.',
    },
  },
  {
    id: 'spell-8',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti jaminan kepastian garansi:',
    options: ['guarantee', 'garantee', 'guarentee', 'gaurantee'],
    correctAnswer: 'guarantee',
    explanation: '"Guarantee" diawali "g-u-a" (ada huruf u setelah g) dan diakhiri "-antee" (dua huruf e di akhir).',
    difficultyLevel: 2,
    category: 'Initial Diphthong (gua-)',
    structuralBreakdown: {
      focusLabel: 'g-u-a-r-a-n-t-e-e',
      keyRule: 'Diawali "GUA" seperti kata "guard", berakhiran "-TEE".',
      contrastNote: '"garantee" atau "guarentee" sering keliru tertulis karena menyamakan bunyi "en".',
    },
  },
  {
    id: 'spell-9',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti ritme atau irama musik/kehidupan:',
    options: ['rhythm', 'rythm', 'rhytm', 'rhythym'],
    correctAnswer: 'rhythm',
    explanation: '"Rhythm" dieja r-h-y-t-h-m, memiliki DUA huruf "h" (satu setelah r, satu setelah t) dan satu vokal "y".',
    difficultyLevel: 3,
    category: 'Greek Consonant Cluster (rh-thm)',
    structuralBreakdown: {
      focusLabel: 'r-h-y-t-h-m (two H letters)',
      keyRule: 'Trik memori: "Rhythm Helps Your Two Hips Move".',
      contrastNote: 'Jangan hilangkan huruf H kedua ("rythm" salah).',
    },
  },
  {
    id: 'spell-10',
    sentence: 'Pilih ejaan yang BENAR untuk kata yang berarti pengakuan pengesahan atau ucapan terima kasih apresiasi:',
    options: ['acknowledgement', 'acknowlegment', 'acknowladgement', 'acknowlegement'],
    correctAnswer: 'acknowledgement',
    explanation: '"Acknowledgement" (atau ejaan American English "acknowledgment") mempertahankan huruf "d" dan "g" dari kata "knowledge". Pilihan ejaan standar Oxford/Cambridge adalah "acknowledgement".',
    difficultyLevel: 3,
    category: 'Preserving Root Spelling (knowledge)',
    structuralBreakdown: {
      focusLabel: 'ac-know-ledge-ment',
      keyRule: 'Pertahankan ejaan kata dasar "knowledge" secara utuh sebelum menambahkan "-ment".',
      contrastNote: 'Menghilangkan "d" ("acknowlegment") adalah eror fonetik.',
    },
  },
];

export const spellingAccuracyServerModule: ServerQuizModule = {
  id: SPELLING_ACCURACY_MODULE_ID,
  meta: SPELLING_ACCURACY_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Spelling Accuracy',
      feedbackTemplates: {
        master:
          'Kerapian ejaan kata bahasa Inggris kamu sempurna! Tidak ada poin berharga yang akan hilang akibat salah ketik (typo) di listening maupun writing.',
        advanced:
          'Kerapian ejaan sangat baik (level C1). Berhati-hatilah pada konsonan ganda (double c/m/r) saat menulis dengan batas waktu terburu-buru.',
      },
    });
  },
};

export default spellingAccuracyServerModule;
