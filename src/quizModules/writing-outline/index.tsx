// src/quizModules/writing-outline/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { WRITING_OUTLINE_MODULE_META } from '@/server/quiz/modules/writing-outline';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const writingOutlineClientModule: QuizClientModule = {
  ...WRITING_OUTLINE_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={WRITING_OUTLINE_MODULE_META.title}
      subtitle={WRITING_OUTLINE_MODULE_META.shortTitle}
      rubricTitle={WRITING_OUTLINE_MODULE_META.rubricTitle}
      cefr={WRITING_OUTLINE_MODULE_META.targetCefr}
      accentColor={WRITING_OUTLINE_MODULE_META.accentColor}
      formula='40m Master Plan: 5m Outline & Thesis ➔ 30m Deep Writing (4 Paragraphs) ➔ 5m Proofreading Audit'
      overview='Lima menit pertama menentukan 80% keberhasilan esai IELTS Task 2 Anda. Tanpa outline, argumen akan berputar-putar, posisi tesis menjadi kabur, dan Anda beresiko tinggi melenceng dari topik (off-topic). Kerangka yang matang menjamin pemenuhan kriteria Task Achievement dan Coherence & Cohesion Band 7.5+.'
      rules={[
        {
          title: '3-Tier Prompt Deconstruction (Dekonstruksi Prompt 60 Detik)',
          explanation:
            'Pisahkan 3 lapisan soal: 1. Topik umum (e.g. artificial intelligence), 2. Fokus mikro spesifik (e.g. replacing teachers in elementary schools), 3. Instruksi tugas (To what extent do you agree or disagree?).',
          badExample: 'Membahas dampak AI secara umum tanpa menyentuh peran guru sekolah dasar.',
          goodExample: 'Fokus penuh pada argumen mengapa AI tidak dapat menggantikan empati emosional guru anak-anak.',
          tip: 'Abaikan detail mikro soal, dan nilai Task Achievement otomatis dibatasi di Band 5.',
        },
        {
          title: 'Explicit Thesis Statement (Posisi Jelas Sejak Kalimat Pertama)',
          explanation:
            'Kriteria Band 7+ mensyaratkan "presents a clear position throughout the response". Nyatakan opini tegas Anda di kalimat terakhir Introduction, jangan disembunyikan hingga paragraf kesimpulan.',
          badExample: 'This essay will discuss the benefits and drawbacks of this topic.',
          goodExample: 'This essay argues that while digital tools enhance engagement, human mentorship remains irreplaceable for early childhood cognitive development.',
          tip: 'Kalimat tesis yang tegas memandu pembaca memahami kemana arah tulisan Anda.',
        },
        {
          title: 'Model Paragraf PEEL (Point ➔ Explanation ➔ Example ➔ Link)',
          explanation:
            'Setiap Body Paragraph hanya memuat SATU ide pokok yang dikembangkan mendalam: Point (Topic Sentence) ➔ Explanation (Mekanisme kausalitas mengapa/bagaimana) ➔ Example (Bukti konkret / tren kebijakan makro) ➔ Link (Kaitan kembali ke tesis).',
          badExample: 'Menulis 4 ide berbeda dalam satu paragraf tanpa penjelasan panjang.',
          goodExample: 'Mengembangkan satu argumen kokoh dengan mekanisme sebab-akibat yang tuntas.',
          tip: 'Kedalaman analisis (depth) selalu mengalahkan kuantitas ide dangkal.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Membuat daftar ide panjang (superficial listing).',
          solution:
            'Cukup pilih 2 argumen terkuat Anda. Kembangkan 1 argumen di Body 1 dan 1 argumen di Body 2.',
        },
        {
          trap: 'Menulis tanpa menyisakan waktu proofreading di akhir.',
          solution:
            'Hentikan penulisan di menit ke-35. Gunakan 5 menit terakhir untuk memeriksa konsistensi SVA, ejaan kata, dan kata benda jamak.',
        },
      ]}
      bandTips={[
        'Blueprint 4 Paragraf Emas (~270 kata): Intro (45 kata) + Body 1 (95 kata) + Body 2 (95 kata) + Conclusion (40 kata).',
        'Jangan pernah memunculkan poin argumen baru di paragraf kesimpulan. Paragraf penutup murni merangkum poin yang telah diuraikan.',
      ]}
    />
  ),
};

export default writingOutlineClientModule;
