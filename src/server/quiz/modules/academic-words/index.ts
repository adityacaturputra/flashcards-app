// src/server/quiz/modules/academic-words/index.ts
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

export const ACADEMIC_WORDS_MODULE_ID = 'academic-words';

export const ACADEMIC_WORDS_MODULE_META: QuizModuleMeta = {
  id: ACADEMIC_WORDS_MODULE_ID,
  title: 'Academic Word List (AWL) & Formal Register',
  shortTitle: 'Academic Word List (AWL)',
  rubricTitle: 'Pemahaman istilah akademis umum (Academic Word List): [ /5]',
  description:
    'Penguasaan 570 rumpun kata inti Academic Word List (Averil Coxhead). Menggantikan kata santai sehari-hari dengan register bahasa formal yang tepat untuk meraih skor Lexical Resource Band 7.0–8.5.',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaGraduationCap',
  accentColor: '#6366f1', // Indigo
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.VOCABULARY,
  section: QUIZ_SECTION.B,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'awl-1',
    sentence: 'Economic stagnation will inevitably [ ___ ] existing socioeconomic disparities among rural households.',
    options: ['exacerbate', 'exasperate', 'accelerate', 'exaggerate'],
    correctAnswer: 'exacerbate',
    explanation: '"Exacerbate" (memperburuk kondisi masalah) adalah kata AWL Sublist 10 yang sangat sering keluar. Jangan tertukar dengan "exasperate" (membuat seseorang jengkel) atau "exaggerate" (melebih-lebihkan).',
    difficultyLevel: 3,
    category: 'AWL Sublist: Problem Evolution',
    structuralBreakdown: {
      focusLabel: 'AWL Headword: EXACERBATE (v.)',
      keyRule: 'Exacerbate = to make a bad situation worse.',
      contrastNote: 'Exasperate = to irritate or annoy intensely (tentang emosi orang).',
    },
  },
  {
    id: 'awl-2',
    sentence: 'The empirical evidence gathered across multiple cohorts serves to [ ___ ] the author’s primary hypothesis.',
    options: ['substantiate', 'substitute', 'subsist', 'submerge'],
    correctAnswer: 'substantiate',
    explanation: '"Substantiate" (memberikan bukti pendukung yang valid) adalah istilah AWL kunci dalam analisis esai dan metodologi penelitian.',
    difficultyLevel: 3,
    category: 'AWL Research & Argumentation',
    structuralBreakdown: {
      focusLabel: 'AWL Headword: SUBSTANTIATE (v.)',
      keyRule: 'Substantiate a claim / hypothesis = membuktikan kebenaran dengan fakta.',
      contrastNote: '"Substitute" bermakna menggantikan.',
    },
  },
  {
    id: 'awl-3',
    sentence: 'Smartphones have become [ ___ ] in modern society, permeating almost every facet of daily human interaction.',
    options: ['ubiquitous', 'unanimous', 'ambiguous', 'ominous'],
    correctAnswer: 'ubiquitous',
    explanation: '"Ubiquitous" artinya ada di mana-mana / merata di semua lapisan (*omnipresent*). Sangat berguna menggantikan frasa klise "found everywhere".',
    difficultyLevel: 3,
    category: 'AWL Sophisticated Adjectives',
    structuralBreakdown: {
      focusLabel: 'Advanced Descriptor: UBIQUITOUS (adj.)',
      keyRule: 'Ubiquitous presence / technology = teknologi yang tersebar di mana-mana.',
      contrastNote: '"unanimous" artinya suara bulat mufakat; "ambiguous" bermakna memiliki makna ganda/tidak jelas.',
    },
  },
  {
    id: 'awl-4',
    sentence: 'There is a marked [ ___ ] between state funding allocated to public schools and private charter institutions.',
    options: ['disparity', 'disposition', 'disruption', 'dispersion'],
    correctAnswer: 'disparity',
    explanation: '"Disparity" (AWL Sublist 7) berarti ketimpangan atau kesenjangan yang tidak adil (*inequality / gap*).',
    difficultyLevel: 2,
    category: 'AWL Contrast & Inequality',
    structuralBreakdown: {
      focusLabel: 'AWL Headword: DISPARITY (n.)',
      keyRule: 'Income / regional disparity = ketimpangan pendapatan / wilayah.',
      contrastNote: '"Disposition" bermakna kecenderungan watak kepribadian.',
    },
  },
  {
    id: 'awl-5',
    sentence: 'The committee was tasked with evaluating the commercial [ ___ ] of extracting geothermal energy in mountainous regions.',
    options: ['viability', 'vitality', 'visibility', 'vocality'],
    correctAnswer: 'viability',
    explanation: '"Viability" (kemampuan untuk bertahan hidup atau kelayakan finansial/teknis: *feasibility*) berasal dari rumpun AWL "viable".',
    difficultyLevel: 3,
    category: 'AWL Project Assessment',
    structuralBreakdown: {
      focusLabel: 'AWL Headword: VIABLE ➔ VIABILITY (n.)',
      keyRule: 'Commercial / economic viability = kelayakan finansial suatu proyek.',
      contrastNote: '"vitality" merujuk pada energi atau vitalitas kehidupan fisik.',
    },
  },
  {
    id: 'awl-6',
    sentence: 'The unexpected supply chain embargo could [ ___ ] the timely completion of the infrastructure megaproject.',
    options: ['impede', 'impale', 'implore', 'impugn'],
    correctAnswer: 'impede',
    explanation: '"Impede" (menghambat atau memperlambat kemajuan: *hinder / obstruct*) adalah kata kerja akademis formal yang menggantikan kata informal "slow down".',
    difficultyLevel: 4,
    category: 'AWL Obstruction Verbs',
    structuralBreakdown: {
      focusLabel: 'Advanced Verb: IMPEDE (v.)',
      keyRule: 'Impede progress / development = menghambat laju kemajuan.',
      contrastNote: '"implore" bermakna memohon; "impugn" bermakna mempertanyakan kejujuran.',
    },
  },
  {
    id: 'awl-7',
    sentence: 'Researchers must [ ___ ] their personal biases to guarantee the objectivity of the qualitative survey.',
    options: ['relinquish', 'relocate', 'relapse', 'relish'],
    correctAnswer: 'relinquish',
    explanation: '"Relinquish" berarti melepaskan atau meninggalkan hak / prasangka (*give up / renounce*).',
    difficultyLevel: 4,
    category: 'AWL Academic Stance',
    structuralBreakdown: {
      focusLabel: 'Advanced Verb: RELINQUISH (v.)',
      keyRule: 'Relinquish control / bias = melepaskan kendali atau keberpihakan.',
      contrastNote: '"relish" bermakna sangat menikmati.',
    },
  },
  {
    id: 'awl-8',
    sentence: 'The curriculum was modified to [ ___ ] a more experiential approach to science and robotics education.',
    options: ['incorporate', 'incriminate', 'incarnate', 'incarcerate'],
    correctAnswer: 'incorporate',
    explanation: '"Incorporate" (AWL Sublist 6) berarti memadukan atau memasukkan unsur baru ke dalam sistem yang sudah ada (*integrate / include*).',
    difficultyLevel: 2,
    category: 'AWL Integration Verbs',
    structuralBreakdown: {
      focusLabel: 'AWL Headword: INCORPORATE (v.)',
      keyRule: 'Incorporate new methods into the syllabus = memadukan metode baru.',
      contrastNote: '"incarcerate" bermakna memenjarakan; "incriminate" bermakna menuduh terlibat kejahatan.',
    },
  },
  {
    id: 'awl-9',
    sentence: 'Public health authorities emphasized that the benefits of mass vaccination far [ ___ ] the rare potential side effects.',
    options: ['outweigh', 'outdo', 'outlive', 'outshine'],
    correctAnswer: 'outweigh',
    explanation: '"Outweigh" adalah kata kerja paling penting dalam pertanyaan esai IELTS "Do the advantages outweigh the disadvantages?". Berarti memiliki bobot/dampak yang lebih besar.',
    difficultyLevel: 1,
    category: 'AWL Comparative Essay Core',
    structuralBreakdown: {
      focusLabel: 'Essay Essential: OUTWEIGH (v.)',
      keyRule: 'Advantages outweigh drawbacks = keuntungan jauh lebih dominan dibanding kerugian.',
      contrastNote: 'Jangan pisahkan menjadi "weigh out" yang berarti menimbang bahan kue.',
    },
  },
  {
    id: 'awl-10',
    sentence: 'The government proposed tax incentives to [ ___ ] private sector investment in green infrastructure.',
    options: ['stimulate', 'simulate', 'stipulate', 'strangulate'],
    correctAnswer: 'stimulate',
    explanation: '"Stimulate" (AWL Sublist 5) berarti merangsang atau memicu pertumbuhan aktivitas ekonomi (*encourage / boost*).',
    difficultyLevel: 2,
    category: 'AWL Economic Facilitation',
    structuralBreakdown: {
      focusLabel: 'AWL Headword: STIMULATE (v.)',
      keyRule: 'Stimulate economic growth / investment = mendorong percepatan modal.',
      contrastNote: '"simulate" bermakna menirukan; "stipulate" bermakna menetapkan syarat dalam kontrak.',
    },
  },
];

export const academicWordsServerModule: ServerQuizModule = {
  id: ACADEMIC_WORDS_MODULE_ID,
  meta: ACADEMIC_WORDS_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Academic Word List (AWL)',
      feedbackTemplates: {
        master:
          'Penguasaan Academic Word List (AWL) kamu luar biasa! Kosakata kamu sangat matang, berbobot, dan mencerminkan kandidat Band 8.0+.',
        advanced:
          'Penguasaan kosakata akademis sangat baik. Terus latih pembedaan kata-kata yang berawalan mirip (exacerbate vs exasperate).',
      },
    });
  },
};

export default academicWordsServerModule;
