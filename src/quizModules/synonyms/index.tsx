// src/quizModules/synonyms/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { SYNONYMS_MODULE_META } from '@/server/quiz/modules/synonyms';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const synonymsClientModule: QuizClientModule = {
  ...SYNONYMS_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={SYNONYMS_MODULE_META.title}
      subtitle={SYNONYMS_MODULE_META.shortTitle}
      rubricTitle={SYNONYMS_MODULE_META.rubricTitle}
      cefr={SYNONYMS_MODULE_META.targetCefr}
      accentColor={SYNONYMS_MODULE_META.accentColor}
      formula='Informal Word ➔ Precise Academic Equivalent (Disparity, Exacerbate, Accelerate, Substantiate)'
      overview='Penguji IELTS menilai seberapa fleksibel Anda memparafrasa kata kunci soal tanpa merusak arti aslinya. Memiliki refleks cepat memikirkan minimal 2 sinonim bernuansa formal adalah pembeda utama antara Band 6.0 dan Band 8.0.'
      rules={[
        {
          title: 'Parafrasa Perbedaan & Kesenjangan (Difference ➔ Disparity / Divergence)',
          explanation:
            'Kata "big difference" terdengar kekanak-kanakan dalam esai analitis. Ganti dengan "pronounced disparity" (kesenjangan mencolok) atau "stark divergence" (penyimpangan tajam).',
          badExample: 'There is a big difference between rich and poor regions.',
          goodExample: 'A pronounced disparity persists between affluent urban centres and impoverished rural peripheries.',
          tip: 'Selalu pasangkan sinonim dengan kata sifat penjelas yang berbobot.',
        },
        {
          title: 'Parafrasa Perburukan Masalah (Make Worse ➔ Exacerbate / Aggravate)',
          explanation:
            'Alih-alih menggunakan "make worse", gunakan "exacerbate" untuk masalah sosial/lingkungan dan "aggravate" untuk konflik politik/ketegangan.',
          badExample: 'Deforestation makes climate change worse.',
          goodExample: 'Unregulated deforestation substantially exacerbates global climatic instability.',
          tip: 'Exacerbate adalah salah satu kata paling disukai penguji IELTS Task 2.',
        },
        {
          title: 'Parafrasa Verifikasi Ilmiah (Show/Prove ➔ Substantiate / Demonstrate)',
          explanation:
            'Dalam dunia akademis, klaim jarang "dibuktikan" (proven) secara mutlak, melainkan "diperkuat dengan bukti" (substantiated) atau "ditunjukkan" (demonstrated).',
          badExample: 'The graph proves that sales went up.',
          goodExample: 'The quantitative data substantiates a steady upward trajectory in domestic revenues.',
          tip: 'Menghindari kata absolut membuktikan kematangan berpikir analitis (hedging).',
        },
      ]}
      commonTraps={[
        {
          trap: 'Menggunakan "thesaurus syndrome" (menyelipkan kata sulit tanpa memahami konteksnya).',
          solution:
            'Pastikan kelas kata dan sifat transitifnya cocok. Jangan mengganti "deteriorate" (intransitif) ke tempat yang membutuhkan kata kerja transitif ("exacerbate").',
        },
        {
          trap: 'Mengulang kata yang sama persis lebih dari 3 kali dalam satu esai.',
          solution:
            'Terapkan aturan variasi: sebut konsep pertama dengan definisi formal, kedua dengan sinonim AWL, ketiga dengan kata ganti rujukan (this phenomenon, such initiatives).',
        },
      ]}
      bandTips={[
        'Saat membaca soal Task 2 di 5 menit pertama, langsung tulis 2 sinonim di atas setiap kata kunci penting di lembar buram.',
        'Hafalkan kata dalam rumpun kolokasi: bukan hanya kata "disparity", tapi "widening disparity", "economic disparity".',
      ]}
    />
  ),
};

export default synonymsClientModule;
