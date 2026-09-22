// src/server/quiz/modules/writing-outline/index.ts
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

export const WRITING_OUTLINE_MODULE_ID = 'writing-outline';

export const WRITING_OUTLINE_MODULE_META: QuizModuleMeta = {
  id: WRITING_OUTLINE_MODULE_ID,
  title: '5-Minute Writing Task 2 Outline & Thesis Framing',
  shortTitle: 'Writing Task 2 Outline (5m)',
  rubricTitle: 'Kecepatan merancang outline esai Writing Task 2 dalam 5 menit pertama: [ /5]',
  description:
    'Merancang outline esai akademik (250+ kata) dalam 5 menit pertama: dekonstruksi prompt, perumusan thesis statement yang jelas, 2 argumen inti terstruktur, dan contoh empiris pendukung sebelum mulai menulis.',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaPenToSquare',
  accentColor: '#f97316', // Orange
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.STAMINA,
  section: QUIZ_SECTION.C,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'wo-1',
    sentence: 'Dalam alokasi 40 menit untuk Writing Task 2, mengapa 5 menit pertama WAJIB didedikasikan untuk membuat kerangka (outline) alih-alih langsung mengetik/menulis?',
    options: [
      'Menjamin struktur argumen koheren (Coherence & Cohesion Band 7+), mencegah tersesat di tengah paragraf, dan menghemat waktu revisi besar',
      'Hanya untuk memenuhi formalitas instruksi pengawas ujian',
      'Agar dapat menulis lebih lambat di 35 menit berikutnya',
      'Untuk menghafal kosakata yang akan dipakai secara acak',
    ],
    correctAnswer: 'Menjamin struktur argumen koheren (Coherence & Cohesion Band 7+), mencegah tersesat di tengah paragraf, dan menghemat waktu revisi besar',
    explanation: 'Kandidat yang langsung menulis tanpa outline biasanya mengalami "writer\'s block" di paragraf ke-3, argumennya berputar-putar tanpa arah, dan kehilangan kontrol atas kriteria Task Achievement.',
    difficultyLevel: 1,
    category: 'The 5-Minute Planning Imperative',
    structuralBreakdown: {
      focusLabel: 'Coherence & Task Achievement Architecture',
      keyRule: '5 menit perencanaan menyelamatkan 15 menit kebingungan saat penulisan.',
      contrastNote: 'Langsung menulis tanpa kerangka adalah penyebab utama esai melenceng dari topik (off-topic).',
    },
  },
  {
    id: 'wo-2',
    sentence: 'Diberikan topik: "Some people believe that unpaid community service should be compulsory for all high school students. To what extent do you agree or disagree?". Komponen pertama yang wajib didekonstruksi di menit 1 adalah:',
    options: [
      'Topik umum (community service), fokus spesifik (compulsory for high school students), dan tugas instruksi (to what extent agree/disagree)',
      'Mencari sinonim kata "high school" sebanyak mungkin',
      'Langsung memikirkan kalimat penutup esai',
      'Menghitung jumlah kata minimal 250 kata',
    ],
    correctAnswer: 'Topik umum (community service), fokus spesifik (compulsory for high school students), dan tugas instruksi (to what extent agree/disagree)',
    explanation: 'Dekonstruksi prompt membedakan antara topik payung (general topic) dan fokus sempit yang diuji (harus wajib/compulsory, dan khusus anak SMA). Mengabaikan kata "compulsory" akan menjatuhkan nilai Task Achievement ke Band 5.',
    difficultyLevel: 2,
    category: 'Prompt Micro-Deconstruction',
    structuralBreakdown: {
      focusLabel: '3-Tier Prompt Breakdown: Topic + Scope + Instruction',
      keyRule: 'Pastikan argumen berfokus pada "kewajiban" (compulsory), bukan sekadar manfaat kerja bakti.',
      contrastNote: 'Membahas manfaat tanpa menyinggung aspek kewajibannya dianggap gagal menjawab soal penuh.',
    },
  },
  {
    id: 'wo-3',
    sentence: 'Formula "Thesis Statement" terbaik di akhir paragraf pendahuluan (Introduction) untuk esai tipe "Discuss both views and give your opinion" adalah:',
    options: [
      'Menyajikan ringkasan kedua sudut pandang secara netral dan secara eksplisit menyatakan posisi/opini Anda sejak awal',
      'Menyembunyikan opini pribadi hingga paragraf kesimpulan terakhir agar membuat penguji penasaran',
      'Menulis bahwa topik ini sangat menarik dan memiliki banyak kontroversi di masyarakat',
      'Menyalin ulang teks soal kata demi kata tanpa parafrasa',
    ],
    correctAnswer: 'Menyajikan ringkasan kedua sudut pandang secara netral dan secara eksplisit menyatakan posisi/opini Anda sejak awal',
    explanation: 'Kriteria resmi IELTS Band 7+ mensyaratkan: "presents a clear position throughout the response". Menyembunyikan opini hingga kesimpulan membuat posisi Anda tidak jelas di sepanjang esai (*not clear throughout*).',
    difficultyLevel: 2,
    category: 'Clear Position Throughout (Band 7+ Requirement)',
    structuralBreakdown: {
      focusLabel: 'Explicit Thesis Statement with Clear Stance',
      keyRule: 'Nyatakan opini Anda secara tegas di kalimat terakhir Introduction.',
      contrastNote: 'Menunda opini hingga kesimpulan membuat esai Anda dinilai Band 6 untuk Task Response.',
    },
  },
  {
    id: 'wo-4',
    sentence: 'Dalam menyusun Body Paragraph 1 dalam outline, struktur mikro (PEEL) yang paling kokoh secara akademis adalah:',
    options: [
      'Point (Topic Sentence) ➔ Explanation (Logika kausalitas) ➔ Example (Bukti/kasus konkret) ➔ Link (Kaitan kembali ke thesis)',
      'Paragraph ➔ Essay ➔ English ➔ Language',
      'Example di awal ➔ Opini pribadi ➔ Ringkasan singkat',
      'Menulis 5 ide berbeda tanpa penjelasan mendalam',
    ],
    correctAnswer: 'Point (Topic Sentence) ➔ Explanation (Logika kausalitas) ➔ Example (Bukti/kasus konkret) ➔ Link (Kaitan kembali ke thesis)',
    explanation: 'Model PEEL (Point, Explanation, Example, Link) menjamin bahwa setiap paragraf memiliki satu ide pokok yang dikembangkan secara mendalam dan tuntas.',
    difficultyLevel: 2,
    category: 'PEEL Paragraph Structural Model',
    structuralBreakdown: {
      focusLabel: 'PEEL Model: Point ➔ Explanation ➔ Example ➔ Link',
      keyRule: 'Lebih baik membahas 1 ide secara mendalam (depth) daripada menumpuk 4 ide dangkal.',
      contrastNote: 'Menulis banyak ide tanpa penjelasan akan dicap sebagai "undeveloped list of ideas".',
    },
  },
  {
    id: 'wo-5',
    sentence: 'Diberikan prompt: "Many feel governments should spend more on space exploration, while others think money should be spent on basic needs on Earth." Outline Body 1 yang efektif untuk sudut pandang eksplorasi antariksa adalah:',
    options: [
      'Point: R&D antariksa memicu inovasi teknologi turunan di bumi (spillover tech); Exp: Satelit & material medis berakar dari program luar angkasa; Ex: GPS & panel surya efisiensi tinggi',
      'Point: Luar angkasa itu indah; Exp: Semua orang suka bintang; Ex: Film sains fiksi',
      'Point: Alien mungkin ada; Exp: Kita harus bersiap; Ex: Penampakan UFO',
      'Point: Pemerintah punya banyak uang; Exp: Tidak masalah jika boros; Ex: Anggaran negara besar',
    ],
    correctAnswer: 'Point: R&D antariksa memicu inovasi teknologi turunan di bumi (spillover tech); Exp: Satelit & material medis berakar dari program luar angkasa; Ex: GPS & panel surya efisiensi tinggi',
    explanation: 'Argumen akademis yang solid selalu menghubungkan topik abstrak kembali ke dampak kemaslahatan nyata masyarakat (spillover technology, tanggap bencana satelit).',
    difficultyLevel: 3,
    category: 'Substantive Argument Ideation',
    structuralBreakdown: {
      focusLabel: 'Direct Linkage & Practical Real-world Justification',
      keyRule: 'Argumen harus dapat dipertanggungjawabkan secara logis dan ilmiah.',
      contrastNote: 'Hindari contoh fantasi atau spekulasi fiksi ilmiah.',
    },
  },
  {
    id: 'wo-6',
    sentence: 'Saat merancang contoh (Example) dalam outline 5 menit, kriteria contoh yang berbobot akademis tinggi adalah:',
    options: [
      'Contoh tren sosial atau kebijakan publik umum yang terukur (misal: Scandinavian renewable subsidies, Nordic education models)',
      'Kisah pengalaman pribadi teman dekat atau keluarga penulis ("My uncle once told me...")',
      'Mengarang statistik palsu yang mencurigakan ("According to a 2019 survey, 99.8% of people agree...")',
      'Contoh yang bertentangan dengan topic sentence paragraf tersebut',
    ],
    correctAnswer: 'Contoh tren sosial atau kebijakan publik umum yang terukur (misal: Scandinavian renewable subsidies, Nordic education models)',
    explanation: 'Meskipun IELTS membolehkan pengalaman pribadi, penguji Cambridge memberikan apresiasi leksikal dan impresi akademis jauh lebih tinggi pada contoh berbasis fenomena sosial / studi kebijakan publik.',
    difficultyLevel: 2,
    category: 'High-Register Academic Examples',
    structuralBreakdown: {
      focusLabel: 'Broad Societal Trends vs Narrow Personal Anecdotes',
      keyRule: 'Gunakan studi kasus makro: negara, industri, atau regulasi institusional.',
      contrastNote: 'Statistik karangan yang terlalu spesifik (99.4%) sering terlihat artifisial bagi penguji berpengalaman.',
    },
  },
  {
    id: 'wo-7',
    sentence: 'Berapakah jumlah paragraf paling ideal dan standar untuk esai IELTS Task 2 dengan struktur seimbang?',
    options: [
      '4 Paragraf: Introduction + Body 1 + Body 2 + Conclusion',
      '2 Paragraf: Pendahuluan panjang dan Isi panjang',
      '7 Paragraf pendek-pendek berisi 1 kalimat setiap paragraf',
      '1 Paragraf raksasa tanpa jeda baris',
    ],
    correctAnswer: '4 Paragraf: Introduction + Body 1 + Body 2 + Conclusion',
    explanation: 'Format 4 paragraf adalah format standar emas internasional: 1 Introduction (45 kata), 2 Body Paragraphs yang dikembangkan matang (masing-masing 90–100 kata), dan 1 Conclusion tegas (35–45 kata) = ~270 kata.',
    difficultyLevel: 1,
    category: 'The 4-Paragraph Golden Ratio',
    structuralBreakdown: {
      focusLabel: 'Golden 4-Paragraph Blueprint (~270 words)',
      keyRule: 'Intro (45w) + Body 1 (95w) + Body 2 (95w) + Conclusion (40w).',
      contrastNote: 'Paragraf yang berisi satu kalimat melanggar prinsip paragraph development.',
    },
  },
  {
    id: 'wo-8',
    sentence: 'Pada soal "Causes and Solutions", jika outline 5 menit Anda merencanakan 4 penyebab di Body 1 dan 5 solusi di Body 2, kelemahan fatal yang akan terjadi adalah:',
    options: [
      'Kelebihan beban ide tanpa pengembangan mendalam (*superficial listing*), yang membatasi nilai Task Response maksimal di Band 6.0',
      'Jumlah kata menjadi terlalu sedikit',
      'Tulisan menjadi terlalu akademis',
      'Penguji akan memberikan bonus nilai atas banyaknya ide',
    ],
    correctAnswer: 'Kelebihan beban ide tanpa pengembangan mendalam (*superficial listing*), yang membatasi nilai Task Response maksimal di Band 6.0',
    explanation: 'Pedoman resmi penguji IELTS: "ideas may be listed rather than fully extended" adalah definisi spesifik untuk Band 6.0 Task Achievement. Cukup pilih 2 penyebab utama dan pasangkan dengan 2 solusi yang langsung menjawab penyebab tersebut.',
    difficultyLevel: 3,
    category: 'Idea Curation: Depth Over Quantity',
    structuralBreakdown: {
      focusLabel: '2 Causes & 2 Directly Correlated Solutions',
      keyRule: 'Setiap solusi harus menyelesaikan secara langsung penyebab yang diangkat di Body 1.',
      contrastNote: 'Daftar panjang ide dangkal adalah musuh terbesar nilai Band 7.5.',
    },
  },
  {
    id: 'wo-9',
    sentence: 'Dalam outline 5 menit, peran kalimat simpulan (Conclusion) yang benar adalah:',
    options: [
      'Memparafrasa kembali tesis awal dan merangkum argumen utama tanpa memasukkan ide atau argumen baru yang belum pernah dibahas',
      'Memperkenalkan sudut pandang baru yang mengejutkan pembaca',
      'Menulis ulang seluruh kalimat contoh dari Body 1',
      'Memohon penguji untuk memberikan nilai yang baik',
    ],
    correctAnswer: 'Memparafrasa kembali tesis awal dan merangkum argumen utama tanpa memasukkan ide atau argumen baru yang belum pernah dibahas',
    explanation: 'Memasukkan ide pokok baru di Conclusion adalah kesalahan struktur fatal yang membuat esai terasa belum selesai dan membingungkan pembaca.',
    difficultyLevel: 2,
    category: 'Conclusion Boundaries & Synthesis',
    structuralBreakdown: {
      focusLabel: 'Restatement of Thesis & Final Summary (No New Ideas)',
      keyRule: 'Sintesis ide yang sudah ada dengan variasi parafrasa kosakata baru.',
      contrastNote: 'Jangan pernah memunculkan poin argumen baru di paragraf kesimpulan.',
    },
  },
  {
    id: 'wo-10',
    sentence: 'Berapa menit waktu yang harus dialokasikan untuk "Proofreading" (pemeriksaan akhir eror grammar, SVA, ejaan kata, dan tanda baca) sebelum waktu 40 menit habis?',
    options: [
      '3 – 5 menit terakhir',
      '0 menit (menulis terus sampai detik terakhir)',
      '15 menit',
      'Setengah durasi ujian',
    ],
    correctAnswer: '3 – 5 menit terakhir',
    explanation: '3–5 menit proofreading terbukti mampu menangkap 3 sampai 6 kesalahan ceroboh (slip/typo) yang jika dibiarkan dapat menurunkan kriteria Grammatical Accuracy dari Band 7 ke Band 6.',
    difficultyLevel: 1,
    category: 'End-Stage Proofreading Buffer',
    structuralBreakdown: {
      focusLabel: 'Final 3–5 Minute Proofreading Buffer',
      keyRule: 'Rincian waktu total: 5m Outline + 30m Penulisan + 5m Proofreading = 40m.',
      contrastNote: 'Menulis hingga detik terakhir tanpa memeriksa menjamin lolosnya eror SVA dan ejaan.',
    },
  },
];

export const writingOutlineServerModule: ServerQuizModule = {
  id: WRITING_OUTLINE_MODULE_ID,
  meta: WRITING_OUTLINE_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: '5-Minute Writing Task 2 Outline',
      feedbackTemplates: {
        master:
          'Kemampuan merancang outline esai kamu luar biasa! Kamu menguasai dekonstruksi prompt, model PEEL, posisi tesis yang eksplisit, dan arsitektur 4 paragraf emas.',
        advanced:
          'Perancangan kerangka tulisan sangat matang (level C1). Pastikan selalu menyisakan 3–5 menit buffer untuk proofreading di akhir tes.',
      },
    });
  },
};

export default writingOutlineServerModule;
