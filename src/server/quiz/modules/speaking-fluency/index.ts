// src/server/quiz/modules/speaking-fluency/index.ts
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

export const SPEAKING_FLUENCY_MODULE_ID = 'speaking-fluency';

export const SPEAKING_FLUENCY_MODULE_META: QuizModuleMeta = {
  id: SPEAKING_FLUENCY_MODULE_ID,
  title: '2-Minute Speaking Part 2 Fluency & Narrative Architecture',
  shortTitle: 'Speaking Part 2 Fluency (2m)',
  rubricTitle: 'Kelancaran berbicara 2 menit penuh tanpa berhenti bingung di Speaking Part 2: [ /5]',
  description:
    'Menjaga kelancaran bicara (*Fluency & Coherence*) selama 110–120 detik penuh pada "The Long Turn" Speaking Part 2 tanpa terhenti kehabisan ide, menggunakan teknik 1-Minute Note Taking dan 4-Angle Narrative Expansion (Past context, Details, Feelings, Future significance).',
  targetCefr: 'B2 ➔ C1 / C2',
  iconName: 'FaMicrophoneLines',
  accentColor: '#10b981', // Emerald
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.STAMINA,
  section: QUIZ_SECTION.C,
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'spk-1',
    sentence: 'Ketika diberikan waktu persiapan 1 menit (Preparation Time) dengan kertas dan pensil di Speaking Part 2, metode pencatatan (*note-taking*) paling efektif untuk menopang bicara 2 menit adalah:',
    options: [
      'Menulis kata kunci (keywords/bullet points) berisi kosakata berbobot, idiom, dan alur cerita, BUKAN menulis kalimat lengkap',
      'Mencoba menulis naskah kalimat lengkap kata per kata sebanyak mungkin',
      'Tidak mencatat apa pun dan hanya melamun memikirkan topik',
      'Menulis kembali pertanyaan kartu soal di kertas buram',
    ],
    correctAnswer: 'Menulis kata kunci (keywords/bullet points) berisi kosakata berbobot, idiom, dan alur cerita, BUKAN menulis kalimat lengkap',
    explanation: 'Dalam 60 detik persiapan, Anda hanya sempat menulis 2 kalimat lengkap jika memaksakan diri. Menggunakan diagram rantai kata kunci (keyword chain) memberi Anda 8–10 jangkar topik yang cukup untuk berbicara 2 menit penuh.',
    difficultyLevel: 1,
    category: '1-Minute Note-Taking Methodology',
    structuralBreakdown: {
      focusLabel: 'Bullet Points & Keyword Anchors (Never Full Sentences)',
      keyRule: 'Catat 4–5 kata kunci per butir pertanyaan kartu soal.',
      contrastNote: 'Menulis kalimat utuh menghabiskan waktu 1 menit tanpa menghasilkan kerangka cerita.',
    },
  },
  {
    id: 'spk-2',
    sentence: 'Jika Anda sudah menjawab semua poin di kartu soal (Cue Card) namun penguji belum menghentikan Anda dan waktu baru berjalan 1 menit 15 detik, strategi penyelamatan untuk memperpanjang narasi hingga 2 menit penuh adalah:',
    options: [
      'Menerapkan teknik "Reflective Expansion": membahas bagaimana pengalaman tersebut mengubah sudut pandang hidup Anda atau dampaknya di masa depan',
      'Mengulang kembali kalimat pertama yang sudah diucapkan dengan kata-kata yang sama persis',
      'Diam terdiam menatap mata penguji hingga penguji bertanya kembali',
      'Mengatakan "I have finished, that is all" secara tiba-tiba',
    ],
    correctAnswer: 'Menerapkan teknik "Reflective Expansion": membahas bagaimana pengalaman tersebut mengubah sudut pandang hidup Anda atau dampaknya di masa depan',
    explanation: 'Berhenti sebelum 1 menit 40 detik secara otomatis membatasi skor Fluency & Coherence maksimal di Band 5.5–6.0. Memperluas cerita ke dimensi refleksi diri ("Looking back on that event...", "If I were to do it again...") adalah teknik penyelamat Band 7+.',
    difficultyLevel: 2,
    category: 'Narrative Extension & Time Fillers',
    structuralBreakdown: {
      focusLabel: 'Reflective Expansion: Emotional & Future Dimension',
      keyRule: 'Bahas: Dampak jangka panjang, pelajaran hidup yang dipetik, atau perbandingan masa lalu vs sekarang.',
      contrastNote: 'Menghentikan bicara sendiri di menit ke-1 adalah tanda kegagalan stamina berbicara.',
    },
  },
  {
    id: 'spk-3',
    sentence: 'Dalam kriteria penilaian Fluency & Coherence, apakah penguji akan mengurangi nilai jika Anda dihentikan di tengah kalimat setelah mencapai batas waktu 2 menit ("Thank you, that will do")?',
    options: [
      'TIDAK sama sekali; dihentikan penguji di batas 2 menit adalah tanda bahwa Anda berhasil berbicara dengan durasi maksimal secara tuntas',
      'Ya, nilai akan langsung dipotong setengah band karena tidak sempat mengucapkan salam penutup',
      'Ya, karena berarti Anda berbicara terlalu lambat',
      'Tergantung apakah kalimat terakhir Anda sudah ada titiknya atau belum',
    ],
    correctAnswer: 'TIDAK sama sekali; dihentikan penguji di batas 2 menit adalah tanda bahwa Anda berhasil berbicara dengan durasi maksimal secara tuntas',
    explanation: 'Penguji memiliki stopwatch ketat dan wajib memotong pembicaraan tepat pada detik ke-120. Dihentikan oleh penguji adalah bukti bahwa Anda memiliki stamina bicara prima yang melebihi batas durasi minimal!',
    difficultyLevel: 1,
    category: 'Examiner Cut-off Demystification',
    structuralBreakdown: {
      focusLabel: 'The 2-Minute Cut-off is a Success Signal',
      keyRule: 'Berbicaralah terus hingga penguji secara verbal mengangkat tangan dan menghentikan Anda.',
      contrastNote: 'Banyak peserta keliru mengira dihentikan penguji adalah tanda kesalahan.',
    },
  },
  {
    id: 'spk-4',
    sentence: 'Ketika Anda tiba-tiba lupa sebuah kosakata bahasa Inggris spesifik di tengah kalimat, tindakan kelancaran (*fluency strategy*) yang paling tepat adalah:',
    options: [
      'Melakukan parafrasa deskriptif menggunakan kata-kata sederhana ("the instrument that doctors use to listen to your heartbeat" untuk stetoskop)',
      'Diam hening selama 10 detik sambil memegang dahi mencoba mengingat ejaan kata',
      'Menanyakan arti kata tersebut dalam bahasa Indonesia kepada penguji',
      'Mengucapkan kata dalam bahasa ibu dengan aksen Inggris buatan',
    ],
    correctAnswer: 'Melakukan parafrasa deskriptif menggunakan kata-kata sederhana ("the instrument that doctors use to listen to your heartbeat" untuk stetoskop)',
    explanation: 'Kriteria Lexical Resource Band 7.0 secara eksplisit berbunyi: "uses paraphrase effectively". Ketidakmampuan memparafrasa saat terlupa kata kunci menandakan kebuntuan komunikasi.',
    difficultyLevel: 2,
    category: 'Active Paraphrase Under Pressure',
    structuralBreakdown: {
      focusLabel: 'Circumlocution & Descriptive Paraphrase',
      keyRule: 'Deskripsikan fungsi, bentuk, atau sensasi objek jika terlupa nama resminya.',
      contrastNote: 'Jeda hening panjang (*long unnatural pause*) di atas 5 detik merusak skor Fluency.',
    },
  },
  {
    id: 'spk-5',
    sentence: 'Penggunaan "Fillers" alami penutur asli untuk membeli waktu berpikir 2–3 detik tanpa dianggap gagap atau terputus adalah:',
    options: [
      '"To be entirely frank...", "That’s an intriguing angle to consider...", "Looking back at it now..."',
      '"Uhhh...", "Eeeeee...", "Anu apa ya namanya..."',
      'Mengulang kata "like... like... like... you know... you know..." di setiap jeda 3 kata',
      'Batuk berulang-ulang untuk menutupi jeda hening',
    ],
    correctAnswer: '"To be entirely frank...", "That’s an intriguing angle to consider...", "Looking back at it now..."',
    explanation: 'Frasa diskursus alami penutur asli (discourse fillers) mempertahankan alur ritme bahasa Inggris yang lancar dan memberi jeda kognitif otak untuk memformulasi klausa berikutnya.',
    difficultyLevel: 2,
    category: 'Sophisticated Conversational Fillers',
    structuralBreakdown: {
      focusLabel: 'Natural Idiomatic Fillers for Buying Thinking Time',
      keyRule: 'Gunakan: "If memory serves me right...", "To put it into perspective...".',
      contrastNote: 'Hindari dengungan vokal monoton "uhh / umm" atau kebiasaan latah "like / you know".',
    },
  },
  {
    id: 'spk-6',
    sentence: 'Untuk memaksimalkan kriteria "Grammatical Range" dalam 2 menit monolog Part 2, kombinasi tenses narasi yang wajib ditunjukkan adalah:',
    options: [
      'Membuka dengan latar belakang lampau (Past Continuous / Past Perfect), menceritakan peristiwa inti (Past Simple), dan menutup dengan refleksi dampak saat ini (Present Perfect / Modal would)',
      'Menggunakan hanya Simple Present dari awal hingga akhir cerita',
      'Menggunakan hanya kalimat pasif yang sangat kaku',
      'Menyisipkan rumus matematika di tengah percakapan',
    ],
    correctAnswer: 'Membuka dengan latar belakang lampau (Past Continuous / Past Perfect), menceritakan peristiwa inti (Past Simple), dan menutup dengan refleksi dampak saat ini (Present Perfect / Modal would)',
    explanation: 'Variasi tenses yang dinamis membuktikan bahwa Anda tidak terjebak pada satu tense tunggal, mendemonstrasikan fleksibilitas sintaksis Band 7.5+.',
    difficultyLevel: 3,
    category: 'Multi-Tense Narrative Architecture',
    structuralBreakdown: {
      focusLabel: 'Temporal Shifts: Past Setting ➔ Climax ➔ Present Reflection',
      keyRule: '"It was raining heavily when we arrived... We had waited for hours... It has shaped who I am."',
      contrastNote: 'Hanya menggunakan satu bentuk tense (Simple Past monoton) membatasi nilai grammar di Band 6.',
    },
  },
  {
    id: 'spk-7',
    sentence: 'Diberikan kartu soal tentang mendeskripsikan seseorang (Describe a person you admire). Agar cerita tidak habis dalam 45 detik, 4 pilar deskripsi yang harus diuraikan adalah:',
    options: [
      '1. Siapa orang tersebut dan bagaimana awal bertemu, 2. Ciri kepribadian unik dengan contoh konkret, 3. Peristiwa spesifik yang berkesan bersamanya, 4. Mengapa dia menginspirasi hidup Anda',
      '1. Warna baju favoritnya, 2. Makanan kesukaannya, 3. Ukuran sepatunya, 4. Warna rambutnya',
      '1. Nama lengkapnya, 2. Tanggal lahirnya, 3. Alamat rumahnya, 4. Nomor teleponnya',
      'Menceritakan biografi umum tanpa keterlibatan emosi pribadi Anda',
    ],
    correctAnswer: '1. Siapa orang tersebut dan bagaimana awal bertemu, 2. Ciri kepribadian unik dengan contoh konkret, 3. Peristiwa spesifik yang berkesan bersamanya, 4. Mengapa dia menginspirasi hidup Anda',
    explanation: 'Struktur 4 pilar (Who, Personality with Evidence, A Memorable Anecdote, Personal Inspiration) menjamin pembicaraan Anda kaya detail dan terstruktur selama 120 detik.',
    difficultyLevel: 2,
    category: 'The 4-Pillar Persona Framework',
    structuralBreakdown: {
      focusLabel: 'Who ➔ Character Trait + Story ➔ Personal Resonance',
      keyRule: 'Kisah nyata atau anekdot spesifik adalah bensin utama penambah durasi bicara 2 menit.',
      contrastNote: 'Deskripsi fisik dangkal (tinggi badan, baju) biasanya habis dalam 20 detik.',
    },
  },
  {
    id: 'spk-8',
    sentence: 'Jika kartu soal meminta Anda menceritakan pengalaman yang belum pernah Anda alami dalam kehidupan nyata (misal: "Describe an extreme sport you tried"), solusi cerdas agar tetap lancar adalah:',
    options: [
      'Menggunakan imajinasi/fiksi bebas dengan meminjam pengalaman orang lain atau film, karena IELTS BUKAN tes kejujuran melainkan tes kemampuan berbahasa Inggris',
      'Menolak menjawab dan meminta kartu soal yang lain kepada penguji',
      'Mengatakan Anda belum pernah melakukannya lalu duduk diam',
      'Menangis karena merasa soal tidak adil',
    ],
    correctAnswer: 'Menggunakan imajinasi/fiksi bebas dengan meminjam pengalaman orang lain atau film, karena IELTS BUKAN tes kejujuran melainkan tes kemampuan berbahasa Inggris',
    explanation: 'Penguji tidak akan memverifikasi apakah Anda benar-benar pernah terjun payung atau menyelam. Keterampilan bercerita dan kelancaran bahasa adalah satu-satunya variabel penilaian.',
    difficultyLevel: 2,
    category: 'Creative Invention & Unconstrained Roleplay',
    structuralBreakdown: {
      focusLabel: 'IELTS is a Language Proficiency Test, NOT a Lie Detector Test',
      keyRule: 'Karang cerita fiksi yang meyakinkan jika Anda belum pernah mengalaminya.',
      contrastNote: 'Jangan pernah menolak kartu soal atau meminta topik pengganti kepada penguji.',
    },
  },
  {
    id: 'spk-9',
    sentence: 'Kunci menjaga ritme pernapasan dan artikulasi suara agar tidak tersengal-sengal atau kehabisan napas di menit kedua adalah:',
    options: [
      'Berbicara dengan tempo terukur (tidak terburu-buru seperti membaca balapan) dan mengambil jeda napas 1 detik di setiap akhir unit klausa',
      'Berbicara secepat mungkin dalam satu tarikan napas tanpa henti',
      'Berbisik pelan agar tidak terdengar suara napas',
      'Menahan napas selama mungkin',
    ],
    correctAnswer: 'Berbicara dengan tempo terukur (tidak terburu-buru seperti membaca balapan) dan mengambil jeda napas 1 detik di setiap akhir unit klausa',
    explanation: 'Kelancaran (fluency) bukanlah kecepatan kilat (speed), melainkan kesinambungan ritmis (flow). Bicara terlalu cepat meningkatkan resiko slip lidah, salah tata bahasa, dan kepanikan pernapasan.',
    difficultyLevel: 1,
    category: 'Pacing, Respiratory Rhythm & Intonation',
    structuralBreakdown: {
      focusLabel: 'Fluency is FLOW, Not SPEED',
      keyRule: 'Bicara dengan tempo mantap dan percaya diri memberi otak waktu menyusun kalimat berikutnya.',
      contrastNote: 'Bicara terlalu cepat memicu tersedak napas dan kehabisan bahan cerita lebih awal.',
    },
  },
  {
    id: 'spk-10',
    sentence: 'Dalam persiapan mandiri, metode latihan paling terbukti untuk melipatgandakan stamina berbicara 2 menit tanpa jeda adalah:',
    options: [
      'Merekam suara sendiri dengan timer 2 menit di ponsel pada topik acak setiap hari, lalu mendengarkan kembali untuk mengaudit jeda hening dan eror SVA',
      'Hanya membaca naskah speaking di dalam hati tanpa pernah membuka mulut',
      'Menghafal naskah 20 topik kata demi kata',
      'Berbicara bahasa Inggris hanya saat hari ujian tiba',
    ],
    correctAnswer: 'Merekam suara sendiri dengan timer 2 menit di ponsel pada topik acak setiap hari, lalu mendengarkan kembali untuk mengaudit jeda hening dan eror SVA',
    explanation: 'Self-Recording Audit membangun adaptasi otot mulut (*speech motor habits*) dan kesadaran waktu alami tanpa perlu melihat jam saat ujian sebenarnya.',
    difficultyLevel: 1,
    category: 'Self-Recording Audit Conditioning',
    structuralBreakdown: {
      focusLabel: 'Daily 2-Minute Voice Memo Audit',
      keyRule: 'Rekam diri sendiri berbicara 2 menit setiap hari pada topik tak terduga.',
      contrastNote: 'Menghafal naskah kata demi kata akan terdeteksi penguji dan berujung pada pinalti Band 5.0.',
    },
  },
];

export const speakingFluencyServerModule: ServerQuizModule = {
  id: SPEAKING_FLUENCY_MODULE_ID,
  meta: SPEAKING_FLUENCY_MODULE_META,

  generateSession(options?: QuizSessionOptions): QuizQuestion[] {
    const count = options?.count ?? 10;
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, QUESTIONS.length));
  },

  calculateRubricScore(records: QuestionAnswerRecord[]): RubricScoreResult {
    return calculateStandardRubricScore(records, {
      skillName: 'Speaking Part 2 Fluency (2m)',
      feedbackTemplates: {
        master:
          'Ketahanan dan kelancaran berbicara kamu berada di standar emas Band 8.0+! Kamu menguasai note-taking 1 menit, teknik ekspansi reflektif, dan pernapasan ritmis.',
        advanced:
          'Kelancaran berbicara sangat baik (level C1). Terus lakukan simulasi rekam suara harian 2 menit penuh tanpa menghentikan timer sebelum 120 detik.',
      },
    });
  },
};

export default speakingFluencyServerModule;
