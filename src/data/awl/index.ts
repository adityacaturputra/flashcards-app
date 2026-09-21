import {
  AwlItem,
  AwlParaphraseExample,
  AwlQuizQuestion,
  AWL_PART_OF_SPEECH,
} from '@/types/awl';
import awlWordsJson from './awlWords.json';

/**
 * Academic Word List (AWL) - Complete 570 Word Families Dataset
 * Researched by Averil Coxhead (Victoria University of Wellington)
 */
export const AWL_WORDS: AwlItem[] = awlWordsJson as AwlItem[];

/**
 * High-Yield Paraphrasing Transformations (Everyday Band 5 vs AWL Band 8)
 */
export const AWL_PARAPHRASES: AwlParaphraseExample[] = [
  {
    id: 'para-01',
    topic: 'Environment & Climate Change',
    band5Text: 'Global warming is a big problem that is getting worse because countries do not want to use different types of power.',
    band8Text: 'Climate change represents an unprecedented crisis severely exacerbated by national reluctance to transition toward sustainable alternative energy sources.',
    keyReplacements: [
      { everydayWord: 'big problem', awlWord: 'unprecedented crisis', explanation: 'Menghindari kata generik "big problem" dengan kata presisi tinggi.' },
      { everydayWord: 'getting worse', awlWord: 'severely exacerbated', explanation: 'AWL Sublist 1 / 3: Menggunakan kata kerja pasif berbobot.' },
      { everydayWord: 'do not want to', awlWord: 'reluctance', explanation: 'Nominalisasi (merubah verb menjadi noun) adalah ciri utama esai Band 8.' },
      { everydayWord: 'different types of power', awlWord: 'sustainable alternative energy sources', explanation: 'Frasa kolokasi resmi AWL Sublist 3.' },
    ],
  },
  {
    id: 'para-02',
    topic: 'Education & Technology',
    band5Text: 'Schools must buy new computers so that children can learn how to make new things.',
    band8Text: 'Educational institutions must integrate advanced technological infrastructure to cultivate innovation and foster student creativity.',
    keyReplacements: [
      { everydayWord: 'Schools', awlWord: 'Educational institutions', explanation: 'Kosakata baku akademis untuk institusi pendidikan.' },
      { everydayWord: 'buy new computers', awlWord: 'integrate advanced technological infrastructure', explanation: 'Menyajikan cakupan konsep yang lebih matang.' },
      { everydayWord: 'make new things', awlWord: 'cultivate innovation and foster student creativity', explanation: 'Kolokasi emas AWL Sublist 1 (create / creativity).' },
    ],
  },
  {
    id: 'para-03',
    topic: 'Economics & Society',
    band5Text: 'There is a big difference between what rich people and poor people earn, and this makes problems in the city.',
    band8Text: 'A pronounced income disparity persists between affluent and disadvantaged demographics, inevitably triggering acute socioeconomic friction in metropolitan sectors.',
    keyReplacements: [
      { everydayWord: 'big difference', awlWord: 'pronounced income disparity', explanation: 'AWL Sublist 1 / 8: disparity menggantikan perbedaan.' },
      { everydayWord: 'rich and poor people', awlWord: 'affluent and disadvantaged demographics', explanation: 'Register bahasa formal menghindari stereotip kasar.' },
      { everydayWord: 'makes problems in the city', awlWord: 'triggering acute socioeconomic friction in metropolitan sectors', explanation: 'Penggunaan AWL sector (Sublist 1).' },
    ],
  },
];

/**
 * Morphology & Word Family Discrimination Quiz Questions
 */
export const AWL_QUIZ_QUESTIONS: AwlQuizQuestion[] = [
  {
    id: 'q-01',
    headword: 'evident',
    sentencePrompt: 'The archaeological team unearthed compelling ______ that substantiated the presence of an ancient maritime civilization.',
    correctOption: 'evidence',
    requiredPartOfSpeech: AWL_PART_OF_SPEECH.NOUN,
    options: ['evident', 'evidence', 'evidently', 'evidentially'],
    grammarClue: 'Didahului oleh kata sifat "compelling", posisi ini membutuhkan Kata Benda (Noun) sebagai objek langsung kata kerja unearthed.',
  },
  {
    id: 'q-02',
    headword: 'economy',
    sentencePrompt: 'While investing in solar arrays entails high capital expenditure, it remains highly ______ in the long term.',
    correctOption: 'economical',
    requiredPartOfSpeech: AWL_PART_OF_SPEECH.ADJECTIVE,
    options: ['economy', 'economics', 'economical', 'economically'],
    grammarClue: 'Setelah adverb "highly" dan to-be "remains", diperlukan Kata Sifat (Adjective) bermakna hemat biaya / efisien (economical, bukan economic).',
  },
  {
    id: 'q-03',
    headword: 'analyse',
    sentencePrompt: 'Financial ______ recommend that corporate conglomerates diversify their investment portfolios.',
    correctOption: 'analysts',
    requiredPartOfSpeech: AWL_PART_OF_SPEECH.NOUN,
    options: ['analyses', 'analysts', 'analytical', 'analytically'],
    grammarClue: 'Diikuti kata kerja tindakan "recommend", subjeknya wajib berupa Kata Benda Pelaku Jamak (Agent Noun: analysts).',
  },
  {
    id: 'q-04',
    headword: 'significant',
    sentencePrompt: 'The newly implemented tariff regulations have ______ diminished cross-border commercial transactions.',
    correctOption: 'significantly',
    requiredPartOfSpeech: AWL_PART_OF_SPEECH.ADVERB,
    options: ['signify', 'significance', 'significant', 'significantly'],
    grammarClue: 'Di antara auxiliary "have" dan past participle "diminished", wajib disisipkan Kata Keterangan (Adverb) berakhiran -ly.',
  },
  {
    id: 'q-05',
    headword: 'assess',
    sentencePrompt: 'Municipal authorities must conduct a rigorous environmental ______ prior to initiating infrastructure development.',
    correctOption: 'assessment',
    requiredPartOfSpeech: AWL_PART_OF_SPEECH.NOUN,
    options: ['assess', 'assessed', 'assessment', 'assessable'],
    grammarClue: 'Didahului oleh artikel "a" dan kata sifat "rigorous environmental", posisinya wajib diisi oleh Kata Benda Tunggal (Noun: assessment).',
  },
];
