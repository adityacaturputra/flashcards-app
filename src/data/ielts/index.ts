import { IeltsModule, IeltsChapter } from '@/types/ielts';

// Direct markdown imports from docs
import m1c1 from '../../../docs/ielts-band-7/module-01-general-overview/01-roadmap-and-mindset-band-7.md';
import m1c2 from '../../../docs/ielts-band-7/module-01-general-overview/02-course-orientation-and-structure.md';
import m1c3 from '../../../docs/ielts-band-7/module-01-general-overview/03-speaking-role-play-and-shadowing-method.md';
import m1c4 from '../../../docs/ielts-band-7/module-01-general-overview/04-official-cambridge-preparation-guide.md';

import m2c1 from '../../../docs/ielts-band-7/module-02-ielts-exam-basic-information/01-ielts-exam-anatomy-and-format.md';
import m2c2 from '../../../docs/ielts-band-7/module-02-ielts-exam-basic-information/02-ielts-format-updates-and-regulations.md';
import m2c3 from '../../../docs/ielts-band-7/module-02-ielts-exam-basic-information/03-quiz-academic-general-computer-based.md';
import m2c4 from '../../../docs/ielts-band-7/module-02-ielts-exam-basic-information/04-computer-based-vs-paper-based-comparison.md';

import m3c1 from '../../../docs/ielts-band-7/module-03-grammar-and-vocabulary-diagnostic-tests/01-grammar-diagnostic-framework.md';
import m3c2 from '../../../docs/ielts-band-7/module-03-grammar-and-vocabulary-diagnostic-tests/02-academic-vocabulary-levels-and-awl.md';
import m3c3 from '../../../docs/ielts-band-7/module-03-grammar-and-vocabulary-diagnostic-tests/03-information-on-grammar-and-vocabulary-ielts-sources.md';
import m3c4 from '../../../docs/ielts-band-7/module-03-grammar-and-vocabulary-diagnostic-tests/04-cefr-english-levels-test-a1-c2.md';
import m3c5 from '../../../docs/ielts-band-7/module-03-grammar-and-vocabulary-diagnostic-tests/05-english-self-assessment-levels-test.md';

import m4c1 from '../../../docs/ielts-band-7/module-04-listening-section-basics/01-ielts-listening-general-information.md';
import m4c2 from '../../../docs/ielts-band-7/module-04-listening-section-basics/02-ielts-listening-question-types-and-strategy.md';
import m4c3 from '../../../docs/ielts-band-7/module-04-listening-section-basics/03-ielts-listening-tips-for-higher-band-score.md';
import m4c4 from '../../../docs/ielts-band-7/module-04-listening-section-basics/04-methods-to-improve-listening-ability.md';
import m4c5 from '../../../docs/ielts-band-7/module-04-listening-section-basics/05-ielts-spelling-list-and-common-pitfalls.md';

export const IELTS_MODULES: IeltsModule[] = [
  {
    moduleNumber: 1,
    title: 'Bagian 1: Pengenalan & Orientasi Belajar IELTS Band 7+',
    slug: 'general-overview',
    description: 'Roadmap menembus Band 7+, analisis Band Descriptors (FC, LR, GRA, TR), teknik active shadowing, dan panduan materi resmi Cambridge.',
    totalDuration: '13m',
    chapters: [
      {
        id: 'm1-01',
        chapterNumber: 1,
        itemNumber: 1,
        title: '1. Roadmap & Mindset Belajar Menembus Band 7.0+',
        moduleNumber: 1,
        moduleTitle: 'Bagian 1: Pengenalan & Orientasi Belajar IELTS Band 7+',
        itemType: 'article',
        duration: '2m',
        description: 'Membedah fenomena The Band 6 Plateau dan beralih ke metode Deliberate Practice serta rubrik penilaian 4 pilar penguji.',
        markdownContent: m1c1,
        keyTakeaways: [
          'Membedah The Band 6 Plateau dan beralih ke Deliberate Practice',
          '4 Pilar Band Descriptors: FC, LR, GRA, dan TR/TA',
          'Toleransi error Band 7: >50% kalimat wajib bebas kesalahan tata bahasa'
        ]
      },
      {
        id: 'm1-02',
        chapterNumber: 2,
        itemNumber: 2,
        title: '2. Orientasi Silabus & Struktur Komprehensif IELTS',
        moduleNumber: 1,
        moduleTitle: 'Bagian 1: Pengenalan & Orientasi Belajar IELTS Band 7+',
        itemType: 'video',
        duration: '9m',
        description: 'Peta kurikulum 5 tahapan belajar mandiri dan rekomendasi alokasi waktu mingguan per sub-tes.',
        markdownContent: m1c2,
        keyTakeaways: [
          'Jalur 5 tahap belajar: Fondasi ➔ Listening ➔ Reading ➔ Writing ➔ Speaking',
          'Alokasi waktu ideal: 15-18 jam per minggu untuk hasil optimal',
          'Prinsip analisis mendalam: Kualitas evaluasi mengalahkan kuantitas pengerjaan tes'
        ]
      },
      {
        id: 'm1-03',
        chapterNumber: 3,
        itemNumber: 3,
        title: '3. Metodologi Latihan Speaking: Role Play & Active Shadowing',
        moduleNumber: 1,
        moduleTitle: 'Bagian 1: Pengenalan & Orientasi Belajar IELTS Band 7+',
        itemType: 'article',
        duration: '1m',
        description: 'Metode Active Shadowing dan teknik simulasi role-play mandiri dengan perekam suara untuk mengikis jeda bicara.',
        markdownContent: m1c3,
        keyTakeaways: [
          'Teknik Active Shadowing untuk melatih intonasi dan connected speech alami',
          'Metode Blind Prompt & Record 2 menit nonstop untuk simulasi Part 2',
          'Self-Audit rekaman: mendeteksi filler words (uhm, ah) dan akhiran gramatikal'
        ]
      },
      {
        id: 'm1-04',
        chapterNumber: 4,
        itemNumber: 4,
        title: '4. Panduan Sumber Belajar Resmi & Kurasi Materi Cambridge',
        moduleNumber: 1,
        moduleTitle: 'Bagian 1: Pengenalan & Orientasi Belajar IELTS Band 7+',
        itemType: 'article',
        duration: '2m',
        description: 'Hierarki buku resmi Cambridge IELTS (seri 12-19) dan cara memaksimalkan kunci jawaban untuk evaluasi parafrase.',
        markdownContent: m1c4,
        keyTakeaways: [
          'Mengutamakan buku latihan resmi Cambridge IELTS Practice Tests seri 12–19',
          'Menghindari materi tidak resmi yang pola distraktornya tidak valid',
          'Trik menelaah transkrip dan parafrase di balik setiap soal yang salah'
        ]
      }
    ]
  },
  {
    moduleNumber: 2,
    title: 'Bagian 2: Informasi Dasar & Format Ujian IELTS',
    slug: 'exam-basic-information',
    description: 'Anatomi 4 sub-tes, durasi waktu, update regulasi terkini, kuis evaluasi pemahaman format, serta komparasi CBT vs PBT.',
    totalDuration: '13m',
    chapters: [
      {
        id: 'm2-01',
        chapterNumber: 5,
        itemNumber: 1,
        title: '5. Anatomi & Format Lengkap Ujian IELTS',
        moduleNumber: 2,
        moduleTitle: 'Bagian 2: Informasi Dasar & Format Ujian IELTS',
        itemType: 'video',
        duration: '9m',
        description: 'Garis waktu ujian ~2 jam 45 menit dan rincian karakteristik komponen Listening, Reading, Writing, dan Speaking.',
        markdownContent: m2c1,
        keyTakeaways: [
          'Garis waktu: Listening (~30m), Reading (60m), Writing (60m), Speaking (11-14m)',
          'Listening: Audio hanya diputar satu kali',
          'Reading: Tidak ada waktu transfer tambahan sama sekali'
        ]
      },
      {
        id: 'm2-02',
        chapterNumber: 6,
        itemNumber: 2,
        title: '6. Regulasi Terkini & Kebijakan Format Ujian IELTS',
        moduleNumber: 2,
        moduleTitle: 'Bagian 2: Informasi Dasar & Format Ujian IELTS',
        itemType: 'article',
        duration: '2m',
        description: 'Klarifikasi isu perubahan format, kebijakan alat tulis pensil/pulpen, dan ketentuan One Skill Retake (OSR).',
        markdownContent: m2c2,
        keyTakeaways: [
          'Struktur inti, durasi, dan rubrik IELTS tidak berubah',
          'Aturan alat tulis resmi di test centre',
          'Regulasi IELTS One Skill Retake (OSR) maksimum 60 hari sejak tes awal'
        ]
      },
      {
        id: 'm2-03',
        chapterNumber: 7,
        itemNumber: 3,
        title: '7. Kuis Format Ujian: Academic vs General & Komputer vs Kertas',
        moduleNumber: 2,
        moduleTitle: 'Bagian 2: Informasi Dasar & Format Ujian IELTS',
        itemType: 'quiz',
        description: '15 pertanyaan evaluasi format tes, perbedaan Academic vs General, dan fasilitas tes Computer-Based.',
        markdownContent: m2c3,
        keyTakeaways: [
          '15 soal pilihan ganda lengkap dengan tanda jawaban benar & pembahasan',
          'Listening & Speaking 100% identik antara Academic dan General Training',
          'Perbedaan waktu transfer 2 menit di CDI vs 10 menit di PBI'
        ]
      },
      {
        id: 'm2-04',
        chapterNumber: 8,
        itemNumber: 4,
        title: '8. Komparasi Taktis: Computer-Delivered (CDI) vs Paper-Based (PBI)',
        moduleNumber: 2,
        moduleTitle: 'Bagian 2: Informasi Dasar & Format Ujian IELTS',
        itemType: 'article',
        duration: '2m',
        description: 'Matriks perbandingan fitur kunci CDI vs PBI dan panduan keputusan profil peserta (kecepatan ketik WPM vs kertas fisik).',
        markdownContent: m2c4,
        keyTakeaways: [
          'Waktu rilis hasil: 2-5 hari (CDI) vs 13 hari (PBI)',
          'Fitur CDI: Split-screen reading, live word count, cut/paste tanpa bekas hapusan',
          'PBI unggul untuk pembaca taktil yang terbiasa mencoret lembar soal'
        ]
      }
    ]
  },
  {
    moduleNumber: 3,
    title: 'Bagian 3: Tes Diagnostik Tata Bahasa & Kosakata',
    slug: 'grammar-and-vocabulary-diagnostic-tests',
    description: 'Pembedahan 5 area kebocoran tata bahasa, tabel kosakata AWL, kurasi buku rujukan, matriks CEFR, dan lembar asesmen mandiri.',
    totalDuration: '5m',
    chapters: [
      {
        id: 'm3-01',
        chapterNumber: 9,
        itemNumber: 1,
        title: '9. Tes Diagnostik Tata Bahasa (Grammar Diagnostic Framework)',
        moduleNumber: 3,
        moduleTitle: 'Bagian 3: Tes Diagnostik Tata Bahasa & Kosakata',
        itemType: 'article',
        duration: '1m',
        description: 'Audit 5 area kebocoran gramatikal fatal: Subject-Verb Agreement, Inversi Negatif, Hedging, Comma Splice, dan Passive Voice.',
        markdownContent: m3c1,
        keyTakeaways: [
          'Subject-Verb Agreement dengan frasa sisipan panjang',
          'Formula Inversi Negatif untuk mendongkrak Grammatical Range',
          'Penggunaan tentative language (hedging) di esai Writing Task 2'
        ]
      },
      {
        id: 'm3-02',
        chapterNumber: 10,
        itemNumber: 2,
        title: '10. Panduan Level Kosakata Akademis (Academic Word List / AWL)',
        moduleNumber: 3,
        moduleTitle: 'Bagian 3: Tes Diagnostik Tata Bahasa & Kosakata',
        itemType: 'article',
        duration: '1m',
        description: 'Piramida kosakata IELTS dan tabel konversi kosakata umum ke Academic Word List (AWL) beserta contoh kalimatnya.',
        markdownContent: m3c2,
        keyTakeaways: [
          'Tingkat 3 kosakata: Academic Word List (570 rumpun kata)',
          'Tabel transformasi kosakata: disparity, hasten, annihilate, evident, hazardous',
          'Pentingnya menghafal kolokasi alami, bukan sekadar sinonim acak'
        ]
      },
      {
        id: 'm3-03',
        chapterNumber: 11,
        itemNumber: 3,
        title: '11. Sumber Referensi Grammar & Vocabulary untuk IELTS',
        moduleNumber: 3,
        moduleTitle: 'Bagian 3: Tes Diagnostik Tata Bahasa & Kosakata',
        itemType: 'article',
        duration: '1m',
        description: 'Kurasi buku rujukan tata bahasa dan kosakata terbaik terbitan Cambridge dan Oxford untuk belajar mandiri.',
        markdownContent: m3c3,
        keyTakeaways: [
          'Cambridge Grammar for IELTS (Hopkins & Cullen)',
          'English Grammar in Use & Advanced Grammar in Use (Murphy & Hewings)',
          'Cambridge Vocabulary for IELTS Advanced & Oxford Collocations Dictionary'
        ]
      },
      {
        id: 'm3-04',
        chapterNumber: 12,
        itemNumber: 4,
        title: '12. Panduan Level Kemahiran Bahasa Inggris CEFR (A1 - C2)',
        moduleNumber: 3,
        moduleTitle: 'Bagian 3: Tes Diagnostik Tata Bahasa & Kosakata',
        itemType: 'article',
        duration: '1m',
        description: 'Matriks ekuivalensi standar Eropa CEFR (A1-C2) terhadap Band IELTS serta tautan tes penentuan level online resmi.',
        markdownContent: m3c4,
        keyTakeaways: [
          'Target lonjakan: B2 (Band 5.5–6.5) menuju C1 (Band 7.0–8.0)',
          'Karakteristik kemahiran C1: memahami teks abstrak & pemikiran fleksibel',
          'Rekomendasi tes evaluasi level online resmi British Council & Cambridge'
        ]
      },
      {
        id: 'm3-05',
        chapterNumber: 13,
        itemNumber: 5,
        title: '13. Lembar Evaluasi & Penilaian Mandiri (IELTS Self-Assessment Framework)',
        moduleNumber: 3,
        moduleTitle: 'Bagian 3: Tes Diagnostik Tata Bahasa & Kosakata',
        itemType: 'article',
        duration: '1m',
        description: 'Instrumen refleksi diagnostik 30 poin (Tata Bahasa, Kosakata, Stamina Ujian) untuk menentukan prioritas belajar.',
        markdownContent: m3c5,
        keyTakeaways: [
          'Lembar audit mandiri 14 indikator (Skala 1–5)',
          'Interpretasi total skor: Kesiapan Tinggi, Menengah, atau Fondasi',
          'Menentukan fokus alokasi jam belajar harian'
        ]
      }
    ]
  },
  {
    moduleNumber: 4,
    title: 'Bagian 4: Listening Section Basics and Information',
    slug: 'listening-section-basics',
    description: 'Panduan format listening, 10 tips mendongkrak skor, metode active listening, transkrip verbatim per menit, serta daftar ejaan Cambridge wajib.',
    totalDuration: '28m',
    chapters: [
      {
        id: 'm4-01',
        chapterNumber: 14,
        itemNumber: 1,
        title: '14. Informasi Umum & Anatomi Format IELTS Listening',
        moduleNumber: 4,
        moduleTitle: 'Bagian 4: Listening Section Basics and Information',
        itemType: 'video',
        duration: '7m',
        description: '40 soal, 4 seksi, perbandingan waktu transfer PBI (10m) vs CDI (2m), progresi kesulitan, dan larangan mencatat di kertas terpisah.',
        markdownContent: m4c1,
        keyTakeaways: [
          '40 pertanyaan, 4 seksi; audio hanya diputar 1 kali tanpa pengulangan',
          'Waktu transfer: 10 menit di Paper-Based vs HANYA 2 menit di Computer-Based',
          'Wajib memaksimalkan Seksi 1 & 2 (target 18-20/20) sebagai tabungan skor',
          'Tulis jawaban langsung di samping soal; jangan membuat catatan di kertas buram'
        ]
      },
      {
        id: 'm4-02',
        chapterNumber: 15,
        itemNumber: 2,
        title: '15. Kompilasi Tipe Soal & Strategi Eksekusi IELTS Listening',
        moduleNumber: 4,
        moduleTitle: 'Bagian 4: Listening Section Basics and Information',
        itemType: 'video',
        duration: '10m',
        description: 'Bedah 6 tipe soal utama: Form completion, multiple choice, map labelling, matching, sentence completion, dan flow-chart.',
        markdownContent: m4c2,
        keyTakeaways: [
          'Hukum urutan kronologis: Jawaban soal selalu muncul berurutan dari nomor 1 sampai 40',
          'Let-It-Go Protocol: Jika nomor terlewat, langsung tebak cepat dan fokus pada nomor berikutnya',
          'Exact Word Trap pada MCQ: Pilihan dengan kata persis seperti di audio sering kali adalah distraktor',
          'Map Labelling: Kunci starting point dan kuasai preposisi spasial (opposite, adjacent, corridor)'
        ]
      },
      {
        id: 'm4-03',
        chapterNumber: 16,
        itemNumber: 3,
        title: '16. 10 Tips Taktis Mendongkrak Skor IELTS Listening (Band 7.0–9.0)',
        moduleNumber: 4,
        moduleTitle: 'Bagian 4: Listening Section Basics and Information',
        itemType: 'video',
        duration: '6m',
        description: 'Aturan ketat penghitungan kata (artikel dihitung 1 kata), trik aman ALL CAPITAL LETTERS, dan sensitivitas akhiran jamak (-s).',
        markdownContent: m4c3,
        keyTakeaways: [
          'Artikel (a/an/the) dihitung sebagai 1 kata penuh; melanggar word limit = 0 poin',
          'Gunakan ALL CAPITAL LETTERS untuk menghindari kesalahan kapitalisasi nama diri',
          'Sensitivitas akhiran jamak (-s/-es): kelalaian huruf s sering menggugurkan skor ke 6.5',
          'Manfaatkan 30 detik pasca audio untuk memeriksa ketepatan gramatikal'
        ]
      },
      {
        id: 'm4-04',
        chapterNumber: 17,
        itemNumber: 4,
        title: '17. 7 Metode Teruji Meningkatkan Kemampuan Listening Mandiri',
        moduleNumber: 4,
        moduleTitle: 'Bagian 4: Listening Section Basics and Information',
        itemType: 'article',
        duration: '4m',
        description: 'Deteksi intonasi penekanan jawaban, latihan aksen UK/AU/US, metode Speed Listening 1.25x-1.5x, dan fenomena connected speech.',
        markdownContent: m4c4,
        keyTakeaways: [
          'Deteksi kata yang dipanjangkan (stretched words) sebagai penanda jawaban isian singkat',
          'Latihan Speed Listening (1.25x - 1.5x) membuat ujian asli terasa berjalan jauh lebih lambat',
          'Membuat Paraphrase Table: mencocokkan kata kunci soal dengan bahasa parafrase audio',
          'Membedah connected speech: melatih telinga mengenali bunyi kata yang saling melebur'
        ]
      },
      {
        id: 'm4-05',
        chapterNumber: 18,
        itemNumber: 5,
        title: '18. Daftar Ejaan Wajib IELTS Listening & Jebakan Ortografi',
        moduleNumber: 4,
        moduleTitle: 'Bagian 4: Listening Section Basics and Information',
        itemType: 'article',
        duration: '1m',
        description: 'Kompilasi kosakata resmi Cambridge IELTS Tests 5–16, 6 jebakan huruf ganda (accommodation, necessary), dan huruf senyap.',
        markdownContent: m4c5,
        keyTakeaways: [
          'Kaidah Cambridge: Salah satu huruf saja dihitung SALAH TOTAL (0 poin, tanpa nilai setengah)',
          'Jebakan huruf ganda fatal: accommodation (2c, 2m), embarrassment (2r, 2s), necessary (1c, 2s)',
          'Huruf senyap: environment (ada n sebelum m), government, Wednesday (ada d senyap)',
          'Koleksi kata kunci ejaan teruji dari Cambridge IELTS Practice Tests seri 5 hingga 16'
        ]
      }
    ]
  },
  {
    moduleNumber: 5,
    title: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
    slug: 'listening-section-1-strategy',
    description: 'Strategi menjawab percakapan dua orang, form-filling, angka, ejaan nama, dan penanganan distractor audio.',
    chapters: []
  },
  {
    moduleNumber: 6,
    title: 'Bagian 6: Listening Section 2 (Part 2) Strategy',
    slug: 'listening-section-2-strategy',
    description: 'Strategi monolog sosial, denah lokasi / peta (map labelling), multiple choice, dan matching.',
    chapters: []
  },
  {
    moduleNumber: 7,
    title: 'Bagian 7: Listening Section 3 (Part 3) Strategy',
    slug: 'listening-section-3-strategy',
    description: 'Diskusi akademis multi-pembicara, pertanyaan pilihan ganda kompleks, dan teknik eliminasi distraktor.',
    chapters: []
  },
  {
    moduleNumber: 8,
    title: 'Bagian 8: Listening Section 4 (Part 4) Strategy',
    slug: 'listening-section-4-strategy',
    description: 'Kuliah akademis tanpa jeda audio, note-completion, kata kunci penanda wacana, dan akurasi ejaan.',
    chapters: []
  },
  {
    moduleNumber: 9,
    title: 'Bagian 9: Academic Reading Section Strategy & Practice',
    slug: 'academic-reading-strategy',
    description: 'Skimming, scanning, matching headings, True/False/Not Given, serta manajemen waktu 20 menit per passage.',
    chapters: []
  }
];

export const ALL_IELTS_CHAPTERS: IeltsChapter[] = IELTS_MODULES.flatMap(m => m.chapters);

export function getIeltsChapterById(id: string): IeltsChapter | undefined {
  return ALL_IELTS_CHAPTERS.find(c => c.id === id);
}
