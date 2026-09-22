// src/quizModules/reading-speed/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { READING_SPEED_MODULE_META } from '@/server/quiz/modules/reading-speed';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const readingSpeedClientModule: QuizClientModule = {
  ...READING_SPEED_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={READING_SPEED_MODULE_META.title}
      subtitle={READING_SPEED_MODULE_META.shortTitle}
      rubricTitle={READING_SPEED_MODULE_META.rubricTitle}
      cefr={READING_SPEED_MODULE_META.targetCefr}
      accentColor={READING_SPEED_MODULE_META.accentColor}
      formula='Speed Target: 220–250 Words Per Minute (WPM) | Pacing: Passage 1 (15m) ➔ Passage 2 (18m) ➔ Passage 3 (22m) + 5m Buffer'
      overview='Membaca 3 teks akademis panjang (total 2.500 kata) dan menjawab 40 pertanyaan dalam 60 menit menuntut efisiensi membaca tingkat tinggi. Kecepatan baca 220–250 WPM dengan pemahaman inti 75%+ adalah ambang standar kemahiran membaca IELTS Band 7.5+.'
      rules={[
        {
          title: 'Skimming 3 Menit: Topic Sentence & Anchor Points',
          explanation:
            'Jangan membaca kata demi kata dari awal hingga akhir. Baca kalimat pertama dan kedua dari setiap paragraf, lalu kalimat penutup. Ini memberikan peta mental tata letak argumen dalam waktu kurang dari 3 menit.',
          badExample: 'Membaca pelan kata demi kata selama 12 menit sebelum melihat pertanyaan.',
          goodExample: 'Skimming 2–3 menit untuk memetakan ide pokok tiap paragraf, lalu langsung masuk ke soal.',
          tip: 'Waktu terbanyak harus dihabiskan untuk mencari jawaban spesifik, bukan membaca santai.',
        },
        {
          title: 'The 90-Second Rule of Triage (Aturan 90 Detik)',
          explanation:
            'Setiap soal memiliki nilai yang persis sama (1 poin). Jika Anda terjebak pada satu nomor sulit selama lebih dari 90 detik, buat tebakan terbaik, tandai dengan bintang, dan langsung lompat ke soal berikutnya.',
          badExample: 'Menghabiskan 4 menit memikirkan satu soal sulit di Passage 1.',
          goodExample: 'Menebak secara terdidik dalam 90 detik dan menyelamatkan 3 soal mudah di Passage 3.',
          tip: 'Jangan pernah meninggalkan lembar jawaban kosong karena tidak ada penalti nilai minus.',
        },
        {
          title: 'True / False / Not Given Logic Triangulation',
          explanation:
            'FALSE = teks secara eksplisit membantah soal (ada bukti kontradiksi). NOT GIVEN = teks tidak pernah mengonfirmasi atau membantah hal tersebut (faktanya absen).',
          badExample: 'Memilih FALSE hanya karena pernyataan tersebut terasa janggal menurut opini pribadi.',
          goodExample: 'Hanya memilih FALSE jika menemukan kalimat penentang 180 derajat di dalam teks.',
          tip: 'Jangan berasumsi di luar apa yang secara eksplisit tertulis dalam wacana.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Mencari kata yang 100% identik dengan soal (Exact Word Trap).',
          solution:
            'Pembuat soal IELTS selalu memparafrasa kata kunci. Antisipasi sinonimnya (e.g. "financial constraint" diparafrasa menjadi "budgetary limitations").',
        },
        {
          trap: 'Mengerjakan tipe soal non-kronologis (Matching Information) di awal.',
          solution:
            'Kerjakan soal berurutan kronologis (Summary Completion, Multiple Choice) terlebih dahulu agar Anda sudah mengenali isi paragraf secara alami.',
        },
      ]}
      bandTips={[
        'Hilangkan kebiasaan "subvocalization" (melafalkan kata di dalam hati) dengan melatih mata menyerap frasa 3–4 kata sekaligus (Visual Chunking).',
        'Gunakan teknik jari atau ujung pensil memandu mata bergerak maju dengan kecepatan konstan menelusuri baris bacaan.',
      ]}
    />
  ),
};

export default readingSpeedClientModule;
