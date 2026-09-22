// src/server/quiz/modules/reading-speed/index.ts
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

export const READING_SPEED_MODULE_ID = 'reading-speed';

export const READING_SPEED_MODULE_META: QuizModuleMeta = {
  id: READING_SPEED_MODULE_ID,
  title: 'Academic Reading Speed & 18-Minute Passage Pacing',
  shortTitle: 'Reading Speed (700w < 18m)',
  rubricTitle: 'Mampu membaca teks akademis 700 kata dalam waktu kurang dari 18 menit: [ /5]',
  description:
    'Menaklukkan target efisiensi membaca teks akademis 700–900 kata dalam waktu kurang dari 18 menit (kecepatan 220–250 kata per menit / WPM) menggunakan teknik Skimming, Scanning, dan Keyword Parallel Mapping.',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaGaugeHigh',
  accentColor: '#059669', // Emerald
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.STAMINA,
  section: QUIZ_SECTION.C,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'read-1',
    sentence: 'Dalam alokasi waktu 60 menit untuk 3 teks panjang (Passage 1, 2, 3), pembagian waktu strategis paling ideal untuk mengantisipasi peningkatan kesulitan teks adalah:',
    options: [
      'Passage 1: 15 menit, Passage 2: 18 menit, Passage 3: 22 menit, Sisa 5 menit: Final Check',
      'Passage 1: 20 menit, Passage 2: 20 menit, Passage 3: 20 menit secara merata',
      'Passage 1: 30 menit, Passage 2: 20 menit, Passage 3: 10 menit',
      'Passage 1: 10 menit, Passage 2: 10 menit, Passage 3: 40 menit',
    ],
    correctAnswer: 'Passage 1: 15 menit, Passage 2: 18 menit, Passage 3: 22 menit, Sisa 5 menit: Final Check',
    explanation: 'Passage 3 di IELTS Reading selalu memuat wacana filosofis/abstrak dengan kosakata AWL terpadat. Membagi waktu 20-20-20 adalah jebakan umum karena peserta akan kehabisan waktu di Passage 3.',
    difficultyLevel: 1,
    category: '60-Minute Pacing Architecture',
    structuralBreakdown: {
      focusLabel: 'Ascending Difficulty Allocation: 15m ➔ 18m ➔ 22m + 5m',
      keyRule: 'Selesaikan teks pertama secepat mungkin untuk menabung modal waktu bagi teks terakhir.',
      contrastNote: 'Membagi 20 menit rata adalah penyebab 70% kandidat gagal menyelesaikan Passage 3.',
    },
  },
  {
    id: 'read-2',
    sentence: 'Ketika melakukan "Skimming" (membaca kilat paragraf dalam 2–3 menit awal), area bacaan yang wajib diprioritaskan untuk menangkap gagasan utama (*gist*) adalah:',
    options: [
      'Kalimat pertama (topic sentence), kalimat kedua, dan kalimat simpulan terakhir dari setiap paragraf',
      'Setiap kata secara berurutan dari baris pertama hingga baris terakhir',
      'Hanya angka-angka tahun dan nama orang bertanda huruf besar',
      'Paragraf terakhir saja tanpa membaca pendahuluan',
    ],
    correctAnswer: 'Kalimat pertama (topic sentence), kalimat kedua, dan kalimat simpulan terakhir dari setiap paragraf',
    explanation: 'Dalam tradisi penulisan teks sains Anglo-Saxon, 85% gagasan pokok diletakkan di kalimat awal paragraf (Topic Sentence) dan disimpulkan di akhir paragraf.',
    difficultyLevel: 2,
    category: 'Skimming Mechanics',
    structuralBreakdown: {
      focusLabel: 'Topic Sentence & Concluding Anchor Point',
      keyRule: 'Baca 2 baris awal + 1 baris akhir setiap paragraf untuk memahami peta argumen.',
      contrastNote: 'Membaca kata per kata (subvocalization) memperlambat kecepatan baca hingga < 130 WPM.',
    },
  },
  {
    id: 'read-3',
    sentence: 'Pada soal "TRUE / FALSE / NOT GIVEN", perbedaan paling mendasar antara opsi FALSE dan NOT GIVEN adalah:',
    options: [
      'FALSE secara eksplisit bertentangan/kontradiktif dengan teks, sedangkan NOT GIVEN tidak dapat dikonfirmasi atau dibantah karena informasinya absen',
      'FALSE berarti teks tidak menyebutkan topik tersebut sama sekali',
      'NOT GIVEN berarti informasi tersebut salah menurut logika sains umum',
      'FALSE dan NOT GIVEN memiliki makna yang sama dan dapat dipertukarkan',
    ],
    correctAnswer: 'FALSE secara eksplisit bertentangan/kontradiktif dengan teks, sedangkan NOT GIVEN tidak dapat dikonfirmasi atau dibantah karena informasinya absen',
    explanation: 'Hukum baku: FALSE = Teks mengatakan A, soal mengatakan lawan dari A (kontradiksi 180 derajat). NOT GIVEN = Informasi mungkin benar dalam kehidupan nyata, tapi penulis teks tidak pernah mengonfirmasinya.',
    difficultyLevel: 2,
    category: 'True / False / Not Given Logic Trap',
    structuralBreakdown: {
      focusLabel: 'Contradiction (FALSE) vs Absence of Verification (NOT GIVEN)',
      keyRule: 'Hanya pilih FALSE jika Anda menemukan fakta lawan yang membantahnya secara tegas.',
      contrastNote: 'Jangan memasukkan opini pribadi yang tidak tertulis di teks ke dalam jawaban.',
    },
  },
  {
    id: 'read-4',
    sentence: 'Ketika mencari jawaban untuk pertanyaan bertipe "Matching Information to Paragraphs", urutan pengerjaan yang paling efisien adalah:',
    options: [
      'Menyelesaikan soal yang berurutan kronologis terlebih dahulu (Multiple Choice, Summary Completion) sebelum mengerjakan Matching Information',
      'Langsung membaca paragraf A berulang kali hingga menemukan jawaban soal pertama',
      'Mengerjakan Matching Information di menit paling awal sebelum membaca teks',
      'Menebak seluruh huruf paragraf secara seragam (misal: semua dipilih B)',
    ],
    correctAnswer: 'Menyelesaikan soal yang berurutan kronologis terlebih dahulu (Multiple Choice, Summary Completion) sebelum mengerjakan Matching Information',
    explanation: 'Matching Information adalah tipe soal non-kronologis paling memakan waktu. Menyelesaikan tipe soal lain lebih dahulu membuat Anda sudah membaca dan mengenali letak informasi di tiap paragraf tanpa buang waktu ekstra.',
    difficultyLevel: 3,
    category: 'Question Sequencing Strategy',
    structuralBreakdown: {
      focusLabel: 'Order of Execution: Sequential First, Global Last',
      keyRule: 'Kerjakan soal yang mengikuti urutan teks (Summary, Sentence Completion) terlebih dahulu.',
      contrastNote: 'Mengerjakan Matching Information di awal akan menghabiskan 15 menit tanpa hasil efisien.',
    },
  },
  {
    id: 'read-5',
    sentence: 'Teknik "Parallel Mapping" dalam IELTS Reading berarti:',
    options: [
      'Mencocokkan kata kunci di soal yang telah diparafrasa menjadi sinonim di dalam teks bacaan',
      'Membaca dua paragraf secara bersamaan dengan dua mata terpisah',
      'Mencari kata yang 100% identik tanpa perubahan bentuk',
      'Menyejajarkan lembar soal di sebelah kiri lembar jawaban',
    ],
    correctAnswer: 'Mencocokkan kata kunci di soal yang telah diparafrasa menjadi sinonim di dalam teks bacaan',
    explanation: 'Pembuat soal IELTS sengaja memparafrasa kata kunci soal (misal: soal menulis "financial constraints", di teks tertulis "budgetary limitations"). Mencari kata identik sering berujung pada jebakan distractor.',
    difficultyLevel: 2,
    category: 'Parallel Expression Mapping',
    structuralBreakdown: {
      focusLabel: 'Synonym & Paraphrase Triangulation',
      keyRule: 'Antisipasi sinonim kata kunci sebelum memindai (scan) paragraf.',
      contrastNote: 'Kata yang sama persis di teks sering kali dipasang sebagai jebakan (distractor).',
    },
  },
  {
    id: 'read-6',
    sentence: 'Jika Anda terjebak pada satu soal sulit selama lebih dari 90 detik dan belum menemukan jawabannya, tindakan manajemen waktu terbaik adalah:',
    options: [
      'Membuat tebakan terbaik, memberi tanda bintang kecil pada nomor tersebut, dan langsung melanjutkan ke soal berikutnya',
      'Terus membaca paragraf tersebut hingga 5 menit sampai ketemu',
      'Menyerah dan meninggalkan sisa passage',
      'Mengganti lembar soal dengan passage lain',
    ],
    correctAnswer: 'Membuat tebakan terbaik, memberi tanda bintang kecil pada nomor tersebut, dan langsung melanjutkan ke soal berikutnya',
    explanation: 'Setiap soal di IELTS Reading bernilai persis 1 poin. Menghabiskan 3 menit demi 1 soal sulit mengorbankan 3 soal mudah di bagian akhir yang belum sempat dibaca.',
    difficultyLevel: 1,
    category: 'The 90-Second Rule of Triage',
    structuralBreakdown: {
      focusLabel: 'Rule of Triage: 90 Seconds Maximum per Question',
      keyRule: 'Semua soal memiliki bobot skor yang sama: 1 poin!',
      contrastNote: 'Kandidat cerdas mengorbankan soal tersulit demi menyapu bersih seluruh soal mudah.',
    },
  },
  {
    id: 'read-7',
    sentence: 'Dalam membaca teks akademis, "Subvocalization" (kebiasaan melafalkan kata di dalam hati saat membaca) dapat menghambat stamina dan kecepatan baca karena:',
    options: [
      'Membatasi kecepatan baca otak menjadi setara dengan batas maksimal kecepatan bicara motorik lidah (sekitar 150 WPM)',
      'Membuat tenggorokan cepat lelah saat ujian berlangsung',
      'Dilarang oleh pengawas ujian internasional',
      'Menghilangkan kemampuan mengingat fakta angka',
    ],
    correctAnswer: 'Membatasi kecepatan baca otak menjadi setara dengan batas maksimal kecepatan bicara motorik lidah (sekitar 150 WPM)',
    explanation: 'Kecepatan pemrosesan visual mata dan otak manusia mampu mencapai 300–400 WPM, tetapi jika setiap kata dilafalkan dalam hati, kecepatan baca terhambat di ambang 150 WPM.',
    difficultyLevel: 3,
    category: 'Overcoming Subvocalization',
    structuralBreakdown: {
      focusLabel: 'Visual Chunking vs Auditory Subvocalization',
      keyRule: 'Latihlah mata menyerap kelompok frasa 3–4 kata sekaligus (Visual Chunking).',
      contrastNote: 'Melafalkan dalam hati memicu kelelahan mental lebih cepat setelah menit ke-30.',
    },
  },
  {
    id: 'read-8',
    sentence: 'Ketika menghadapi teks sains dengan banyak istilah biologi/latin yang sangat teknis (misal: "myrmecochory, elaiosomes"), strategi penanganan yang tepat adalah:',
    options: [
      'Memperlakukan istilah tersebut sebagai label aljabar X/Y dan mencari definisi penjelas yang biasanya disediakan tepat di kalimat berikutnya atau tanda kurung',
      'Berhenti membaca dan mencoba menghafal ejaannya',
      'Meninggalkan seluruh teks karena dianggap terlalu sulit',
      'Menerka arti istilah latin dari bahasa Indonesia',
    ],
    correctAnswer: 'Memperlakukan istilah tersebut sebagai label aljabar X/Y dan mencari definisi penjelas yang biasanya disediakan tepat di kalimat berikutnya atau tanda kurung',
    explanation: 'IELTS menguji kemampuan menyerap informasi teks, bukan pengetahuan awal biologi. Penulis teks ilmiah selalu menyertakan definisi kontekstual setelah memperkenalkan istilah teknis baru.',
    difficultyLevel: 2,
    category: 'Technical Jargon Neutralization',
    structuralBreakdown: {
      focusLabel: 'Jargon Neutralization: Treat Technical Terms as "Variable X"',
      keyRule: 'Definisi konsep teknis selalu berada di sekitarnya (appositive clause / dash).',
      contrastNote: 'Jangan biarkan istilah rumit menurunkan rasa percaya diri membaca Anda.',
    },
  },
  {
    id: 'read-9',
    sentence: 'Pada soal "Matching Headings", posisi judul paragraf yang paling tepat harus:',
    options: [
      'Merangkum keseluruhan argumen paragraf, bukan hanya menyebutkan satu detail contoh pendukung yang kebetulan ada di paragraf tersebut',
      'Memilih kalimat yang memiliki kata-kata terpanjang',
      'Memilih opsi pertama yang cocok dengan baris pertama',
      'Menyesuaikan judul dengan urutan abjad',
    ],
    correctAnswer: 'Merangkum keseluruhan argumen paragraf, bukan hanya menyebutkan satu detail contoh pendukung yang kebetulan ada di paragraf tersebut',
    explanation: 'Distractor utama pada Matching Headings adalah judul yang merujuk pada "supporting detail / data angka", padahal Heading sejati harus memayungi seluruh isi paragraf.',
    difficultyLevel: 3,
    category: 'Matching Headings Synthesis Trap',
    structuralBreakdown: {
      focusLabel: 'Global Gist vs Supporting Detail Trap',
      keyRule: 'Pastikan Heading mencakup premis utama paragraf, bukan sekadar kutipan contoh.',
      contrastNote: 'Opsi jebakan biasanya meminjam kata persis dari kalimat contoh di tengah paragraf.',
    },
  },
  {
    id: 'read-10',
    sentence: 'Target kecepatan membaca (Words Per Minute / WPM) minimal yang diperlukan untuk membaca teks 700 kata dalam 3–4 menit dan menyisakan 14 menit untuk menjawab soal adalah:',
    options: [
      '220 – 250 WPM',
      '100 – 120 WPM',
      '450 – 500 WPM',
      '60 – 80 WPM',
    ],
    correctAnswer: '220 – 250 WPM',
    explanation: 'Kecepatan 220–250 kata per menit (WPM) dengan pemahaman 75%+ adalah ambang standar kemahiran membaca penutur akademis tingkat B2/C1.',
    difficultyLevel: 2,
    category: 'WPM Benchmark & Target Metric',
    structuralBreakdown: {
      focusLabel: 'Target Benchmark: 220–250 Words Per Minute',
      keyRule: 'Teks 700 kata selesai diskim dalam 3 menit pada kecepatan 230 WPM.',
      contrastNote: 'Kecepatan < 180 WPM membuat peserta rentan kehabisan waktu di passage terakhir.',
    },
  },
];

export const readingSpeedServerModule: ServerQuizModule = {
  id: READING_SPEED_MODULE_ID,
  meta: READING_SPEED_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Academic Reading Speed & 18m Pacing',
      feedbackTemplates: {
        master:
          'Kemampuan pacing dan strategi membaca cepat kamu di level Master! Kamu menguasai skimming, triage waktu 90 detik, dan pemecahan jebakan True/False/Not Given.',
        advanced:
          'Kecepatan dan pemahaman membaca sangat solid (level C1). Terus latih visual chunking untuk menekan subvocalisation.',
      },
    });
  },
};

export default readingSpeedServerModule;
