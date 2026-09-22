// src/quizModules/comma-splice/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { COMMA_SPLICE_MODULE_META } from '@/server/quiz/modules/comma-splice';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const commaSpliceClientModule: QuizClientModule = {
  ...COMMA_SPLICE_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={COMMA_SPLICE_MODULE_META.title}
      subtitle={COMMA_SPLICE_MODULE_META.shortTitle}
      rubricTitle={COMMA_SPLICE_MODULE_META.rubricTitle}
      cefr={COMMA_SPLICE_MODULE_META.targetCefr}
      accentColor={COMMA_SPLICE_MODULE_META.accentColor}
      formula='Legal Links: 1. Clause, FANBOYS Clause | 2. Clause ; Clause | 3. Clause ; adverb, Clause | 4. Subordinator Clause, Clause'
      overview='Comma Splice terjadi saat dua klausa independen (kalimat utuh yang masing-masing memiliki subjek dan predikat) disambung HANYA dengan tanda koma tanpa konjungsi yang sah. Eror ini dapat menjatuhkan skor Grammatical Accuracy dari Band 7 langsung ke Band 5.'
      rules={[
        {
          title: 'Aturan FANBOYS (Coordinating Conjunctions)',
          explanation:
            'Tanda koma hanya sah menghubungkan dua klausa independen jika diikuti oleh salah satu dari 7 kata FANBOYS: For, And, Nor, But, Or, Yet, So.',
          badExample: 'Global temperatures continue to rise, glaciers are receding rapidly.',
          goodExample: 'Global temperatures continue to rise, and glaciers are receding rapidly.',
          tip: 'Koma tunggal tanpa kata FANBOYS adalah ilegal di antara dua klausa mandiri.',
        },
        {
          title: 'Semicolon + Conjunctive Adverb (; however, / ; therefore,)',
          explanation:
            'Kata seperti "however", "therefore", "moreover", "consequently", dan "furthermore" BUKAN konjungsi, melainkan kata keterangan transisi. Wajib diawali titik koma (;) dan diakhiri koma (,).',
          badExample: 'The policy was unpopular, however it yielded remarkable fiscal results.',
          goodExample: 'The policy was unpopular; however, it yielded remarkable fiscal results.',
          tip: 'Pola baku: [Klausa 1] ; [kata transisi] , [Klausa 2].',
        },
        {
          title: 'Subordinasi (Mengubah Satu Klausa Menjadi Anak Kalimat)',
          explanation:
            'Ubah salah satu klausa menjadi anak kalimat yang diawali "Although", "Because", "Since", "While", atau "Whereas".',
          badExample: 'Urban housing costs skyrocketed, many young graduates cannot afford rent.',
          goodExample: 'Because urban housing costs have skyrocketed, many young graduates cannot afford rent.',
          tip: 'Solusi ini adalah yang paling bernilai akademis tinggi karena menambah variasi kalimat kompleks.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Menganggap kata "however" memiliki kekuatan menggabungkan kalimat seperti kata "but".',
          solution:
            'Kata "but" adalah konjungsi (pakai ", but"). Kata "however" adalah adverbia (pakai "; however," atau titik ". However,").',
        },
        {
          trap: 'Menulis run-on sentence (menempelkan dua kalimat tanpa tanda baca sama sekali).',
          solution:
            'Gunakan titik koma mandiri (;) jika kedua ide saling terkait sangat erat.',
        },
      ]}
      bandTips={[
        'Lakukan audit tanda baca pada 3 menit terakhir penulisan esai (Proofreading). Cari semua tanda koma yang diapit oleh subjek dan kata kerja di kedua sisinya.',
        'Kuasai penggunaan tanda baca titik dua (:) untuk elaborasi dan dash em (—) untuk penekanan argumen penting.',
      ]}
    />
  ),
};

export default commaSpliceClientModule;
