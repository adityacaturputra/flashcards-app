// src/server/quiz/modules/listening-stamina/index.ts
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

export const LISTENING_STAMINA_MODULE_ID = 'listening-stamina';

export const LISTENING_STAMINA_MODULE_META: QuizModuleMeta = {
  id: LISTENING_STAMINA_MODULE_ID,
  title: '30-Minute Audio Listening Stamina & Focus Protocol',
  shortTitle: 'Listening Stamina (30m)',
  rubricTitle: 'Mampu mempertahankan fokus mendengarkan audio selama 30 menit nonstop: [ /5]',
  description:
    'Menjaga ketahanan mental dan daya ingat kerja (*working memory*) selama 30 menit nonstop tanpa terdistraksi oleh jeda hening, aksen asing (British, Aussie, Kiwi), maupun jebakan koreksi diri pembicara (*distractor self-correction*).',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaHeadphones',
  accentColor: '#0284c7', // Sky blue
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.STAMINA,
  section: QUIZ_SECTION.C,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'list-1',
    sentence: 'Dalam tes IELTS Listening Part 3 & 4, ketika pembicara melakukan koreksi diri ("Actually, let me check that... no, it was originally planned for June, but the venue moved it to August"), strategi stamina terbaik adalah:',
    options: [
      'Menunggu hingga kalimat pembicara tuntas sepenuhnya dan mencatat informasi final yang dikonfirmasi ("August")',
      'Segera menulis kata pertama yang didengar ("June") agar tidak tertinggal',
      'Mengabaikan kedua tanggal dan menunggu pengulangan audio',
      'Menebak opsi tengah secara acak',
    ],
    correctAnswer: 'Menunggu hingga kalimat pembicara tuntas sepenuhnya dan mencatat informasi final yang dikonfirmasi ("August")',
    explanation: 'Dalam tes listening 30 menit, "distractor self-correction" adalah jebakan nomor satu. Stamina konsentrasi menuntut peserta untuk menahan refleks terburu-buru dan memverifikasi kata penegas koreksi ("Actually... no... shifted to...").',
    difficultyLevel: 2,
    category: 'Speaker Self-Correction Trap',
    structuralBreakdown: {
      focusLabel: 'Self-Correction Trap: Wait for the Final Pivot',
      keyRule: 'Pembicara sengaja menyebut jawaban salah terlebih dahulu sebelum mengoreksinya.',
      contrastNote: 'Menulis kata pertama ("June") adalah eror ketidaksabaran mental paling jamak.',
    },
  },
  {
    id: 'list-2',
    sentence: 'Memasuki menit ke-20 (Section 4 kuliah akademik nonstop monolog tanpa jeda), tanda utama penurunan stamina kognitif adalah "blank out" (kehilangan jejak nomor soal). Tindakan penyelamatan paling tepat adalah:',
    options: [
      'Segera melepaskan nomor yang terlewat dan langsung melompat memindai kata kunci (keywords) pada 2 nomor soal berikutnya',
      'Terus memikirkan nomor yang terlewat sambil berharap audio mengulangi kata tersebut',
      'Menutup mata sejenak untuk memulihkan konsentrasi selama 1 menit penuh',
      'Berhenti membaca lembar soal dan hanya mendengarkan intonasi dosen',
    ],
    correctAnswer: 'Segera melepaskan nomor yang terlewat dan langsung melompat memindai kata kunci (keywords) pada 2 nomor soal berikutnya',
    explanation: 'Hukum emas stamina ujian: kehilangan 1 poin jauh lebih baik daripada kehilangan 4 poin beruntun akibat terpaku memikirkan soal yang sudah lewat. Mental "reset" instan adalah kunci Band 8+.',
    difficultyLevel: 3,
    category: 'Mid-Exam Cognitive Reset Protocol',
    structuralBreakdown: {
      focusLabel: 'Cognitive Reset: Cut Losses Immediately',
      keyRule: 'Jika ketinggalan satu jawaban, lepaskan seketika! Fokuskan mata ke pertanyaan berikutnya.',
      contrastNote: 'Terpaku pada 1 soal yang hilang akan memicu efek domino kehancuran seluruh Section 4.',
    },
  },
  {
    id: 'list-3',
    sentence: 'Ketika diberikan waktu 30–45 detik sebelum audio dimulai pada setiap bagian, aktivitas pemanfaatan waktu paling efektif untuk menjaga ketajaman prediksi adalah:',
    options: [
      'Menggarisbawahi kata kunci penentu dan memprediksi kelas kata (noun/number/adjective) yang dibutuhkan pada celah kosong',
      'Membaca seluruh teks dengan santai tanpa menandai apa pun',
      'Menghafalkan urutan nomor soal di kepala',
      'Menutup lembar soal dan menunggu instruksi audio dimulai',
    ],
    correctAnswer: 'Menggarisbawahi kata kunci penentu dan memprediksi kelas kata (noun/number/adjective) yang dibutuhkan pada celah kosong',
    explanation: 'Active Prediction secara dramatis mengurangi beban memori kerja (*cognitive load*) saat audio berjalan karena otak sudah bersiap menangkap jenis kata tertentu (misalnya: nama tempat atau angka persentase).',
    difficultyLevel: 1,
    category: 'Pre-Listening Active Prediction',
    structuralBreakdown: {
      focusLabel: 'Pre-Listening Keyword & Word Class Anticipation',
      keyRule: 'Tentukan jenis informasi yang hilang (angka, kata benda tunggal/jamak, tanggal).',
      contrastNote: 'Membaca pasif tanpa prediksi membuat otak pasif dan mudah terserang fatigue.',
    },
  },
  {
    id: 'list-4',
    sentence: 'Dalam Listening Section 3 (diskusi antara tutor dan 2 mahasiswa), untuk mencegah kebingungan membedakan siapa yang menyetujui atau menolak sebuah ide, teknik konsentrasi yang benar adalah:',
    options: [
      'Mengaitkan nama pembicara dengan karakter suara (nada/gender) sejak detik pertama perkenalan',
      'Mengabaikan siapa yang berbicara dan hanya mencatat kata sifat umum',
      'Mengasumsikan bahwa mahasiswa perempuan selalu memiliki pendapat yang benar',
      'Hanya mendengarkan komentar sang tutor dan mengabaikan mahasiswa',
    ],
    correctAnswer: 'Mengaitkan nama pembicara dengan karakter suara (nada/gender) sejak detik pertama perkenalan',
    explanation: 'Soal Section 3 sering menanyakan "What do BOTH students agree on?" atau "Why does Jack disagree with Dr. Smith?". Mengidentifikasi profil suara sejak dialog pembuka adalah teknik fundamental.',
    difficultyLevel: 2,
    category: 'Multi-Speaker Voice Mapping',
    structuralBreakdown: {
      focusLabel: 'Multi-Voice Attribution & Agreement Tracking',
      keyRule: 'Petakan siapa pembicara A dan pembicara B sejak 10 detik pertama pembicaraan.',
      contrastNote: 'Perhatikan kata sinyal persetujuan seperti "I couldn’t agree more" (artinya SANGAT setuju, bukan tidak setuju).',
    },
  },
  {
    id: 'list-5',
    sentence: 'Pembicara menggunakan idiom atau aksen regional Australia yang asing bagi Anda ("fair dinkum", intonasi meninggi di akhir kalimat). Respon mental terbaik agar fokus tidak buyar adalah:',
    options: [
      'Tetap tenang, abaikan kata slang lokal, dan pertahankan fokus pada kata kunci konteks global di sekitar kalimat',
      'Mencoba menebak arti kata slang tersebut dalam waktu 30 detik',
      'Mencatat kata slang tersebut di lembar jawaban',
      'Mengeluh pada diri sendiri bahwa audio tidak adil',
    ],
    correctAnswer: 'Tetap tenang, abaikan kata slang lokal, dan pertahankan fokus pada kata kunci konteks global di sekitar kalimat',
    explanation: 'Ujian IELTS internasional dirancang menguji pemahaman pesan esensial dalam bahasa Inggris global. Detail slang lokal tidak pernah menjadi kunci jawaban pengisian kata.',
    difficultyLevel: 3,
    category: 'Accent Agility & Panic Resistance',
    structuralBreakdown: {
      focusLabel: 'Accent Agility: Focus on Content, Ignore Idiomatic Noise',
      keyRule: 'Jangan panik jika ada aksen Scottish, Aussie, atau New Zealand yang tidak lazim.',
      contrastNote: 'Jawaban ujian selalu berupa kosakata akademis umum, bukan slang informal.',
    },
  },
  {
    id: 'list-6',
    sentence: 'Pada soal pelabelan peta atau denah (Map / Diagram Labelling), kunci stamina spasial agar tidak tersesat di tengah audio adalah:',
    options: [
      'Menetapkan posisi titik awal ("You are here" / entrance) dan mengikuti penanda arah mata angin serta kata depan posisi (adjacent to, opposite)',
      'Langsung melihat seluruh ruangan secara bersamaan tanpa titik acuan',
      'Menghafal bentuk bangunan sebelum audio berbunyi',
      'Menebak nama ruangan yang paling populer',
    ],
    correctAnswer: 'Menetapkan posisi titik awal ("You are here" / entrance) dan mengikuti penanda arah mata angin serta kata depan posisi (adjacent to, opposite)',
    explanation: 'Mengabaikan titik mulai (Starting Point) adalah penyebab utama peserta kehilangan arah total pada soal peta 5 menit.',
    difficultyLevel: 2,
    category: 'Spatial Orientation Stamina (Map Labelling)',
    structuralBreakdown: {
      focusLabel: 'Anchor Point & Directional Preposition Tracking',
      keyRule: 'Letakkan ujung pensil pada pintu masuk dan gerakkan pensil mengikuti narasi pembicara.',
      contrastNote: '"Turn right past the roundabout" harus diikuti secara fisik dengan ujung pensil.',
    },
  },
  {
    id: 'list-7',
    sentence: 'Setelah 30 menit audio selesai, peserta diberi waktu 10 menit (tes berbasis kertas) atau 2 menit (tes berbasis komputer) untuk memeriksa jawaban. Prioritas pemeriksaan paling krusial adalah:',
    options: [
      'Memeriksa ketepatan ejaan (spelling), bentuk jamak (-s/-es), dan batas jumlah kata (NO MORE THAN TWO WORDS)',
      'Mengubah semua jawaban yang dirasa kurang yakin',
      'Menghapus jawaban yang sudah benar dengan sinonim yang lebih panjang',
      'Beristirahat dan menutup mata sebelum tes reading',
    ],
    correctAnswer: 'Memeriksa ketepatan ejaan (spelling), bentuk jamak (-s/-es), dan batas jumlah kata (NO MORE THAN TWO WORDS)',
    explanation: 'Sekitar 20% kesalahan fatal di IELTS Listening bukan karena tidak mendengar, melainkan karena lupa menambahkan akhiran jamak "-s" atau melebihi batas instruksi kata (*Word Count Limit*).',
    difficultyLevel: 1,
    category: 'Post-Listening Quality Control Protocol',
    structuralBreakdown: {
      focusLabel: 'Grammar, Plurality & Word Limit Verification',
      keyRule: 'Cek kesesuaian grammar kalimat: apakah subjek menuntut kata benda tunggal atau jamak?',
      contrastNote: 'Menulis 3 kata saat instruksi mensyaratkan "NO MORE THAN TWO" akan otomatis mendapat nilai 0.',
    },
  },
  {
    id: 'list-8',
    sentence: 'Bagaimanakah cara membangun stamina telinga untuk mencapai ketahanan 30 menit audio nonstop dalam persiapan mandiri?',
    options: [
      'Latihan listening harian selama 45 menit tanpa pause menggunakan podcast berita akademis (BBC Radio 4, NPR TED Radio Hour)',
      'Mendengarkan musik pop selama 2 jam sambil belajar',
      'Menonton film dengan subtitle bahasa Indonesia',
      'Hanya berlatih soal 5 menit sebelum tidur',
    ],
    correctAnswer: 'Latihan listening harian selama 45 menit tanpa pause menggunakan podcast berita akademis (BBC Radio 4, NPR TED Radio Hour)',
    explanation: 'Stamina adalah adaptasi fisik dan mental. Membiasakan otak memproses wacana berbobot tinggi selama 45 menit nonstop membuat ujian 30 menit terasa jauh lebih ringan dan terkendali.',
    difficultyLevel: 2,
    category: 'Endurance Conditioning Regimen',
    structuralBreakdown: {
      focusLabel: 'Over-Conditioning Protocol (45m Uninterrupted Listening)',
      keyRule: 'Latihlah konsentrasi 15 menit lebih lama dari durasi ujian resmi.',
      contrastNote: 'Menonton dengan subtitle melatih kemampuan visual membaca, BUKAN ketahanan telinga.',
    },
  },
  {
    id: 'list-9',
    sentence: 'Pembicara berkata: "The initial estimation was £450, however after factoring in administrative tariffs, the final invoice came to £520." Pertanyaan meminta: "Cost of service: £ [ ___ ]". Jawaban yang benar adalah:',
    options: ['520', '450', '970', '70'],
    correctAnswer: '520',
    explanation: 'Ini adalah jebakan penyesuaian nominal harga. Angka pertama (£450) adalah estimasi awal yang digugurkan oleh kata "however", dan angka final adalah £520.',
    difficultyLevel: 2,
    category: 'Numerical Distractor Identification',
    structuralBreakdown: {
      focusLabel: 'Numerical Revision Trap',
      keyRule: 'Perhatikan kata transisi "however / amended to / final invoice".',
      contrastNote: '450 adalah nilai awal sementara.',
    },
  },
  {
    id: 'list-10',
    sentence: 'Dalam Section 4, pembicara menggunakan kata transisi penanda struktur ("Now, moving on to the environmental repercussions..."). Fungsi utama penanda ini bagi stamina pendengar adalah:',
    options: [
      'Sebagai penunjuk arah (signposting) bahwa pembahasan telah berpindah ke sub-topik berikutnya di lembar soal',
      'Sebagai tanda bahwa audio akan segera berakhir',
      'Sebagai instruksi untuk berhenti menulis jawaban',
      'Hanya hiasan pembicara tanpa fungsi ujian',
    ],
    correctAnswer: 'Sebagai penunjuk arah (signposting) bahwa pembahasan telah berpindah ke sub-topik berikutnya di lembar soal',
    explanation: 'Signposting language ("Turning now to...", "Having looked at X, let us consider Y") adalah kompas penyelamat di Section 4 untuk menyelaraskan pandangan mata dengan suara audio.',
    difficultyLevel: 2,
    category: 'Lecture Signposting Awareness',
    structuralBreakdown: {
      focusLabel: 'Signposting Language as a Navigational Compass',
      keyRule: 'Gunakan signpost words untuk memastikan Anda sedang melihat pertanyaan yang tepat.',
      contrastNote: 'Mengabaikan signpost menyebabkan pendengar tertinggal tanpa disadari.',
    },
  },
];

export const listeningStaminaServerModule: ServerQuizModule = {
  id: LISTENING_STAMINA_MODULE_ID,
  meta: LISTENING_STAMINA_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: '30-Minute Audio Listening Stamina',
      feedbackTemplates: {
        master:
          'Stamina mendengarkan audio kamu di tingkat puncak! Kamu memahami sepenuhnya strategi pemecahan distractor, signposting, dan reset kognitif instan.',
        advanced:
          'Ketahanan fokus listening sangat baik (level C1). Terus pertahankan disiplin active prediction dan kewaspadaan pada Section 4 monolog panjang.',
      },
    });
  },
};

export default listeningStaminaServerModule;
