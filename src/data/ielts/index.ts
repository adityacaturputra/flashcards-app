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

import m5c1 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/01-listening-diagnostic-test-and-readiness.md';
import m5c2 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/02-listening-microskills-numbers-dates-spelling.md';
import m5c3 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/03-answer-and-question-recognition-tactics.md';
import m5c4 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/04-teaching-section-1-strategy-pre-listening-prediction.md';
import m5c5 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/05-teaching-section-1-strategy-trap-avoidance.md';
import m5c6 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/06-teaching-section-1-strategy-form-filling-execution.md';
import m5c7 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/07-cambridge-guided-practice-01-book-13-test-1.md';
import m5c8 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/08-cambridge-guided-practice-02-book-9-test-4.md';
import m5c9 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/09-cambridge-guided-practice-03-book-14-test-4.md';
import m5c10 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/10-cambridge-guided-practice-04-book-11-test-3.md';
import m5c11 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/11-cambridge-guided-practice-05-book-16-test-2.md';
import m5c12 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/12-cambridge-guided-practice-06-book-6-test-2.md';
import m5c13 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/13-cambridge-guided-practice-07-book-17-test-1.md';
import m5c14 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/14-live-class-review-01-strategy-and-diagnostic.md';
import m5c15 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/15-live-class-review-02-form-filling-traps.md';
import m5c16 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/16-live-class-review-03-speed-and-accent-adjustments.md';
import m5c17 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/17-live-class-review-04-spelling-and-plurals-mastery.md';
import m5c18 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/18-live-class-review-05-notes-and-table-completion.md';
import m5c19 from '../../../docs/ielts-band-7/module-05-listening-section-1-strategy/19-live-class-review-06-error-log-and-score-stabilization.md';

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
    totalDuration: '54m',
    chapters: [
      {
        id: 'm5-01',
        chapterNumber: 19,
        itemNumber: 1,
        title: '19. Tes Diagnostik Listening & Evaluasi Kesiapan Dasar',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pemetaan titik lemah (baseline benchmark), evaluasi kecepatan respon, dan identifikasi 4 taksonomi eror fatal.',
        markdownContent: m5c1,
        keyTakeaways: [
          'Target wajib Band 7+: minimal 9 dari 10 soal (90% akurasi) di Section 1',
          'Protokol tes diagnostik: single playback audio tanpa jeda',
          '4 Taksonomi eror: jebakan koreksi diri, salah eja fonetik, pelanggaran batas kata, kehilangan jejak'
        ]
      },
      {
        id: 'm5-02',
        chapterNumber: 20,
        itemNumber: 2,
        title: '20. Penguasaan Keterampilan Mikro Listening (Microskills Mastery)',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '4m',
        description: 'Akurasi refleks angka (-teen vs -ty), ejaan alfabet, format tanggal, kode pos, dan nilai mata uang.',
        markdownContent: m5c2,
        keyTakeaways: [
          'Microskills menyumbang 40% hingga 60% dari seluruh butir pertanyaan Section 1',
          'Matriks bunyi berirama sama: A/H/J/K (/eɪ/) vs B/C/D/E/G/P/T/V/Z (/iː/)',
          'Aturan angka: nol disebut "oh" (/oʊ/) pada telepon, tekanan -teen pada suku kata kedua'
        ]
      },
      {
        id: 'm5-03',
        chapterNumber: 21,
        itemNumber: 3,
        title: '21. Taktik Rekognisi Soal & Prediksi Jawaban Celah',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pemindaian cepat 30 detik pra-mendengar, prediksi kelas kata (noun/verb/adj), dan identifikasi anchor keywords.',
        markdownContent: m5c3,
        keyTakeaways: [
          'Prediksi kelas kata (Part of Speech) sebelum audio berputar mengalahkan refleks pasif',
          'Anchor keywords: kata benda konkret yang sulit diparafrasekan sebagai jangkar navigasi',
          'Deteksi singular vs plural: artikel a/an mutlak tunggal, kuantifier many/several mutlak jamak'
        ]
      },
      {
        id: 'm5-04',
        chapterNumber: 22,
        itemNumber: 4,
        title: '22. Strategi Inti Section 1: Fase Pra-Mendengar & Prediksi Tata Letak',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Struktur percakapan transaksional dua orang, dekonstruksi batas kata (Word Limits), dan pemetaan 3 layout formulir.',
        markdownContent: m5c4,
        keyTakeaways: [
          'Peran penutur: Service Provider vs Inquirer dalam interaksi sosial transaksional',
          'Aturan hukum Word Limit: ONE WORD ONLY vs ONE WORD AND/OR A NUMBER',
          'Kata dengan tanda hubung (hyphenated words) dihitung sebagai tepat SATU KATA'
        ]
      },
      {
        id: 'm5-05',
        chapterNumber: 23,
        itemNumber: 5,
        title: '23. Strategi Inti Section 1: Anatomi Distraktor & Penghindaran Jebakan',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Membongkar 5 pola distraktor klasik: koreksi diri, koreksi antar-pembicara, masa lalu vs sekarang, dan syarat penolakan.',
        markdownContent: m5c5,
        keyTakeaways: [
          'Koreksi diri (Self-Correction): jangan buru-buru mengunci data pertama yang diucapkan',
          'Kata pemicu sanggahan: actually, wait, sorry, unfortunately, previously, used to be',
          'Metode pensil coret cepat: catat data sementara tipis-tipis, konfirmasi makna akhir'
        ]
      },
      {
        id: 'm5-06',
        chapterNumber: 24,
        itemNumber: 6,
        title: '24. Strategi Inti Section 1: Eksekusi Form-Filling & Regulasi Lembar Jawaban',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Audit kualitas celah 3 langkah, regulasi ejaan British vs American, kebijakan ALL CAPS, dan aturan singkatan.',
        markdownContent: m5c6,
        keyTakeaways: [
          'Audit 3 langkah pada 30 detik akhir: Grammatical Fit, Ejaan Ortografi, Batas Kata',
          'British vs American: keduanya sah (colour/color, centre/center), utamakan konsistensi',
          'Golden Rule Kapitalisasi: gunakan ALL CAPS penuh untuk menghilangkan risiko gagal kapital nama diri'
        ]
      },
      {
        id: 'm5-07',
        chapterNumber: 25,
        itemNumber: 7,
        title: '25. Bedah Praktik Terpandu #1: Cambridge IELTS 13 Test 1',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Analisis soal kursus memasak (Cookery Classes), penanganan batas kata ONE WORD AND/OR A NUMBER, dan jebakan harga promo.',
        markdownContent: m5c7,
        keyTakeaways: [
          'Cambridge 13 Test 1: Cookery classes inquiry notes completion',
          'Jebakan singular pada celah "bring a ________" -> CONTAINER (bukan containers)',
          'Simbol mata uang yang sudah tercetak di soal tidak boleh ditulis ulang di lembar jawaban'
        ]
      },
      {
        id: 'm5-08',
        chapterNumber: 26,
        itemNumber: 8,
        title: '26. Bedah Praktik Terpandu #2: Cambridge IELTS 9 Test 4',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Analisis reservasi fasilitas konferensi hotel, perbandingan kapasitas ruangan, dan biaya sewa peralatan audio-visual.',
        markdownContent: m5c8,
        keyTakeaways: [
          'Cambridge 9 Test 4: Hotel conference venue and facilities booking',
          'Distraktor nama ruangan: ruangan yang lebih besar ditolak karena kendala anggaran',
          'Peralatan presentasi: PROJECTOR (akhiran -or, bukan -er)'
        ]
      },
      {
        id: 'm5-09',
        chapterNumber: 27,
        itemNumber: 9,
        title: '27. Bedah Praktik Terpandu #3: Cambridge IELTS 14 Test 4',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pendaftaran relawan festival komunitas, pencocokan sinonim tugas kerja, dress code pakaian gelap, dan konsumsi.',
        markdownContent: m5c9,
        keyTakeaways: [
          'Cambridge 14 Test 4: Community festival volunteer registration',
          'Parafrase tugas kerja: "setting up" berpasangan dengan "putting together the tents"',
          'Dress code: celana gelap (TROUSERS) dipadukan dengan kaos cerah yang disediakan panitia'
        ]
      },
      {
        id: 'm5-10',
        chapterNumber: 28,
        itemNumber: 10,
        title: '28. Bedah Praktik Terpandu #4: Cambridge IELTS 11 Test 3',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pendaftaran agensi kerja paruh waktu, pembedaan pekerjaan lalu vs lowongan baru, dan upah awal masa pelatihan.',
        markdownContent: m5c10,
        keyTakeaways: [
          'Cambridge 11 Test 3: Temporary employment agency registration',
          'Pembedaan waktu: pekerjaan masa lalu (RECEPTIONIST) vs impian masa depan (clerical)',
          'Starting pay: upah masa pelatihan (£9.75) bukan tarif reguler (£11.50)'
        ]
      },
      {
        id: 'm5-11',
        chapterNumber: 29,
        itemNumber: 11,
        title: '29. Bedah Praktik Terpandu #5: Cambridge IELTS 16 Test 2',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pemesanan cetak brosur kustom, tekstur kertas (matte vs glossy), penyesuaian kuantitas setelah diskon, dan format file.',
        markdownContent: m5c11,
        keyTakeaways: [
          'Cambridge 16 Test 2: Print shop custom brochure order',
          'Tekstur kertas profesional: MATTE disetujui, GLOSSY ditolak',
          'Kuantitas akhir: melonjak dari 300 menjadi 500 eksemplar karena diskon volume'
        ]
      },
      {
        id: 'm5-12',
        chapterNumber: 30,
        itemNumber: 12,
        title: '30. Bedah Praktik Terpandu #6: Cambridge IELTS 6 Test 2',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pemesanan tiket kereta api, pembedaan stasiun utama vs stasiun cabang, tarif single vs return, dan jadwal jam berangkat.',
        markdownContent: m5c12,
        keyTakeaways: [
          'Cambridge 6 Test 2: Train travel timetable and ticket booking',
          'Stasiun keberangkatan langsung: CENTRAL STATION',
          'Waktu berangkat vs waktu tiba: jam 9:45 am adalah keberangkatan'
        ]
      },
      {
        id: 'm5-13',
        chapterNumber: 31,
        itemNumber: 13,
        title: '31. Bedah Praktik Terpandu #7: Cambridge IELTS 17 Test 1',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Pendaftaran sukarelawan konservasi alam, pembedaan perlengkapan yang disediakan vs dibawa sendiri, dan titik kumpul gerbang.',
        markdownContent: m5c13,
        keyTakeaways: [
          'Cambridge 17 Test 1: Environmental conservation volunteering',
          'Perlengkapan wajib bawa sendiri: BOOTS (peralatan kerja disediakan kelompok)',
          'Fasilitas pengamatan burung: HIDE (konstruksi kayu perlindungan)'
        ]
      },
      {
        id: 'm5-14',
        chapterNumber: 32,
        itemNumber: 14,
        title: '32. Bedah Kelas Langsung #1: Evaluasi Pola Eror Diagnostik Siswa',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Mengapa 70% siswa tertahan di skor 7/10, bahaya mencatat di kertas buram, dan prinsip Cut-Your-Losses saat tertinggal.',
        markdownContent: m5c14,
        keyTakeaways: [
          'Penyebab skor macet di 7/10: mendengar pasif dan panik saat 1 nomor terlewat',
          'Bahaya fatal kertas buram pada CDI: waktu transfer 2 menit tidak cukup memindahkan catatan',
          'Prinsip Cut-Your-Losses: ikhlaskan 1 soal dalam 5 detik demi menyelamatkan nomor berikutnya'
        ]
      },
      {
        id: 'm5-15',
        chapterNumber: 33,
        itemNumber: 15,
        title: '33. Bedah Kelas Langsung #2: Dekonstruksi Jebakan Form-Filling',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Jebakan koreksi ganda (double-layer correction), prinsip konsensus persetujuan akhir, dan presisi penulisan digit telepon.',
        markdownContent: m5c15,
        keyTakeaways: [
          'Double-layer correction: ralat pertama belum tentu jawaban final; dengarkan konsensus akhir',
          'Angka nol dalam nomor telepon: "oh" (/oʊ/) wajib ditulis 0, bukan huruf O',
          'Ketepatan format spasi kode pos Inggris (area code spasi unit code)'
        ]
      },
      {
        id: 'm5-16',
        chapterNumber: 34,
        itemNumber: 16,
        title: '34. Bedah Kelas Langsung #3: Adaptasi Aksen & Kecepatan Bicara Alami',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Penyesuaian terhadap aksen British, Australian, Kiwi, dan North American, serta fenomena linking dan elision bunyi.',
        markdownContent: m5c16,
        keyTakeaways: [
          'Pergeseran vokal Australian/Kiwi: bunyi /eɪ/ (day, date) bergeser mendekati /aɪ/',
          'Pembedaan can vs can\'t berdasarkan panjang vokal dan intonasi penutur',
          'Connected speech: linking /r/ dan elision huruf konsonan /t/ dan /d/'
        ]
      },
      {
        id: 'm5-17',
        chapterNumber: 35,
        itemNumber: 17,
        title: '35. Bedah Kelas Langsung #4: Presisi Ejaan & Penegakan Singular/Plural',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Bencana 1 huruf (The 1-Letter Disaster), daftar 20 kata paling rawan salah eja, dan analisis sintaksis singular vs plural.',
        markdownContent: m5c17,
        keyTakeaways: [
          'Aturan tanpa toleransi Cambridge: 99% benar tetap dinilai 0 poin jika ada 1 huruf salah',
          '20 Kata berisiko tinggi: accommodation (2c, 2m), environment (ada n), necessary (1c, 2s)',
          'Deteksi singular vs plural melalui linking verbs (is vs are) dan demonstratives (this vs these)'
        ]
      },
      {
        id: 'm5-18',
        chapterNumber: 36,
        itemNumber: 18,
        title: '36. Bedah Kelas Langsung #5: Navigasi Catatan vs Tabel Terstruktur',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Dinamika pergerakan mata pada format tabel horizontal, pemanfaatan sel terisi sebagai penunjuk waktu, dan pembacaan tajuk.',
        markdownContent: m5c18,
        keyTakeaways: [
          'Pergerakan mata pada tabel: wajib bergerak horizontal baris per baris, bukan vertikal',
          'Sel teks yang sudah terisi berfungsi sebagai timing checkpoints sebelum celah kosong',
          'Tajuk kolom secara mutlak membatasi kategori informasi yang dicari'
        ]
      },
      {
        id: 'm5-19',
        chapterNumber: 37,
        itemNumber: 19,
        title: '37. Bedah Kelas Langsung #6: Buku Jurnal Eror & Stabilisasi Skor 10/10',
        moduleNumber: 5,
        moduleTitle: 'Bagian 5: Listening Section 1 (Part 1) Strategy',
        itemType: 'lecture',
        duration: '3m',
        description: 'Metodologi pembuatan Error Log 5 kolom, siklus Deliberate Practice, dan syarat kelulusan 10/10 sebelum melangkah ke Section 2.',
        markdownContent: m5c19,
        keyTakeaways: [
          'Prinsip Keino: Mengerjakan 50 tes dengan skor 7/10 bukanlah belajar melainkan mempraktikkan kegagalan',
          'Template Error Log 5 kolom: Soal, Eror Saya, Kunci Resmi, Root Cause, Tindakan Korektif',
          'Syarat kelulusan Section 1: Meraih skor 10/10 pada minimal 3 tes Cambridge berturut-turut'
        ]
      }
    ]
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
