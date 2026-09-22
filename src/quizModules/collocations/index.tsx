// src/quizModules/collocations/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { COLLOCATIONS_MODULE_META } from '@/server/quiz/modules/collocations';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const collocationsClientModule: QuizClientModule = {
  ...COLLOCATIONS_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={COLLOCATIONS_MODULE_META.title}
      subtitle={COLLOCATIONS_MODULE_META.shortTitle}
      rubricTitle={COLLOCATIONS_MODULE_META.rubricTitle}
      cefr={COLLOCATIONS_MODULE_META.targetCefr}
      accentColor={COLLOCATIONS_MODULE_META.accentColor}
      formula='Natural Word Partnerships: Verb + Noun (take measures, shed light) | Adj + Noun (profound impact) | Adv + Adj (heavily influenced)'
      overview='Kolokasi adalah kebiasaan penutur asli menggabungkan kata-kata tertentu secara alami. Penutur non-pribumi sering melakukan terjemahan harfiah kata demi kata dari bahasa ibu, menghasilkan frasa yang terdengar canggung dan kaku bagi penilai internasional.'
      rules={[
        {
          title: 'Verb-Noun Partnerships: Mengambil Langkah (Take Measures / Action)',
          explanation:
            'Dalam bahasa Indonesia kita sering berkata "membuat tindakan / melakukan aksi". Dalam bahasa Inggris, pasangannya adalah "TAKE measures", "TAKE steps", atau "TAKE decisive action". Jangan memakai "make" atau "do".',
          badExample: 'The government should make an action to reduce traffic.',
          goodExample: 'The municipality must take decisive action to curb urban congestion.',
          tip: '"Take measures" adalah kolokasi solusi nomor satu di IELTS Writing Task 2.',
        },
        {
          title: 'Idiomatic Prepositional Collocations (Take a toll on / Shed light on)',
          explanation:
            'Dampak buruk yang terakumulasi: "take a heavy toll on". Mengungkap informasi baru: "shed light on". Menimbulkan bahaya/ancaman: "pose a threat to".',
          badExample: 'Pollution gives a big damage to human health.',
          goodExample: 'Prolonged atmospheric pollution takes a heavy toll on respiratory health.',
          tip: 'Penggunaan "takes a toll on" langsung mengangkat register bahasa percakapan ke tingkat idiomatik penutur asli.',
        },
        {
          title: 'Adverb-Adjective Enhancers (Heavily / Profoundly Influenced)',
          explanation:
            'Modifikasi kata sifat dengan kata keterangan penjelas yang harmonis: heavily reliant on, deeply rooted in, highly controversial, fiercely contested.',
          badExample: 'The culture is very strongly influenced by tradition.',
          goodExample: 'The cultural ethos remains profoundly influenced by ancestral tradition.',
          tip: 'Ganti kata "very" dengan adverb kolokatif seperti "profoundly", "substantially", atau "severely".',
        },
      ]}
      commonTraps={[
        {
          trap: 'Menerjemahkan kata majemuk Indonesia secara harfiah (misal: "make a crime" atau "give explanation").',
          solution:
            'Gunakan "commit a crime" dan "provide an explanation".',
        },
        {
          trap: 'Salah memasangkan preposisi pada kata kerja (misal: "discuss about" atau "emphasize on").',
          solution:
            'Kata "discuss" dan "emphasize" adalah transitif langsung tanpa preposisi: "discuss the issue" (bukan discuss about), "emphasize the need" (bukan emphasize on).',
        },
      ]}
      bandTips={[
        'Kandidat Band 7.5+ menunjukkan pemahaman kolokasi yang fleksibel tanpa kesalahan preposisi minor.',
        'Membaca 1 artikel ilmiah setiap hari sambil menandai 3 pasangan kolokasi baru adalah metode tercepat membangun intuisi bahasa.',
      ]}
    />
  ),
};

export default collocationsClientModule;
