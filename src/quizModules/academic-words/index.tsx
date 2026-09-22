// src/quizModules/academic-words/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { ACADEMIC_WORDS_MODULE_META } from '@/server/quiz/modules/academic-words';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const academicWordsClientModule: QuizClientModule = {
  ...ACADEMIC_WORDS_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={ACADEMIC_WORDS_MODULE_META.title}
      subtitle={ACADEMIC_WORDS_MODULE_META.shortTitle}
      rubricTitle={ACADEMIC_WORDS_MODULE_META.rubricTitle}
      cefr={ACADEMIC_WORDS_MODULE_META.targetCefr}
      accentColor={ACADEMIC_WORDS_MODULE_META.accentColor}
      formula='Coxhead 570 Word Families: Sublist 1 (Most Frequent) ➔ Sublist 10 (Specialized Academic)'
      overview='Academic Word List (AWL) disusun oleh Dr. Averil Coxhead berdasarkan analisis korpus jutaan kata teks universitas. 570 rumpun kata ini mencakup 10% dari seluruh kosakata dalam teks akademis, jurnal sains, dan buku teks Cambridge.'
      rules={[
        {
          title: 'Kata Kerja Penyelidikan (Substantiate, Incorporate, Stimulate)',
          explanation:
            'Gunakan kata kerja ilmiah berpresisi tinggi: substantiate (memperkuat klaim dengan data), incorporate (mengintegrasikan komponen baru), dan stimulate (memicu percepatan pertumbuhan).',
          badExample: 'The author shows that the plan works with good ideas.',
          goodExample: 'The researcher substantiates the hypothesis by incorporating empirical field data.',
          tip: 'Memasukkan kata-kata ini ke dalam pendahuluan dan pembahasan langsung memberi kesan profesional.',
        },
        {
          title: 'Kata Sifat Deskripsi Kompleks (Ubiquitous, Viable, Inevitable)',
          explanation:
            'Ganti deskriptor umum: sesuatu yang ada di mana-mana = "ubiquitous", proyek yang layak dan bisa bertahan = "viable", kepastian yang tidak terhindarkan = "inevitable".',
          badExample: 'Smartphones are everywhere and change is coming for sure.',
          goodExample: 'Smartphones have become ubiquitous, making technological disruption inevitable.',
          tip: 'Ubiquitous dan viable adalah dua kata yang sangat diapresiasi dalam esai teknologi dan lingkungan.',
        },
        {
          title: 'Kata Benda Analisis Sosial (Disparity, Viability, Ramification)',
          explanation:
            'Kesenjangan = disparity; kelayakan = viability; dampak/konsekuensi rumit = ramification. Gunakan untuk menjelaskan dampak kebijakan publik.',
          badExample: 'We must study the bad results of this project.',
          goodExample: 'Policymakers must scrutinize the ecological ramifications and long-term economic viability.',
          tip: 'Kata "ramification" terdengar jauh lebih tajam daripada "negative effect".',
        },
      ]}
      commonTraps={[
        {
          trap: 'Tertukar bentuk kata turunan (word family derivation error).',
          solution:
            'Pastikan memakai bentuk yang benar: viable (adj) vs viability (noun); deviate (verb) vs deviation (noun); diminish (verb) vs diminution (noun).',
        },
        {
          trap: 'Menghafal arti kata tanpa mengetahui preposisi pasangannya.',
          solution:
            'Hafalkan bersama pasangan preposisinya: "conform to", "attribute something to", "deprived of", "compatible with".',
        },
      ]}
      bandTips={[
        'Kandidat Band 8+ menguasai bentuk fleksi kata dari satu akar AWL (e.g. analyze ➔ analyst ➔ analytical ➔ analytically).',
        'Fokuskan waktu belajar Anda pada 200 kata AWL dari Sublist 1 hingga 4 terlebih dahulu, karena sublist ini memiliki frekuensi kemunculan tertinggi.',
      ]}
    />
  ),
};

export default academicWordsClientModule;
