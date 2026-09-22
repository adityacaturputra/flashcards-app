// src/quizModules/tenses/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { TENSES_MODULE_META } from '@/server/quiz/modules/tenses';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const tensesClientModule: QuizClientModule = {
  ...TENSES_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={TENSES_MODULE_META.title}
      subtitle={TENSES_MODULE_META.shortTitle}
      rubricTitle={TENSES_MODULE_META.rubricTitle}
      cefr={TENSES_MODULE_META.targetCefr}
      accentColor={TENSES_MODULE_META.accentColor}
      formula='Simple Past: S + V2 + Past Time Anchor | Present Perfect: S + have/has + V3 + Unfinished/Result'
      overview='Membedakan peristiwa lampau yang sudah tuntas pada titik waktu tertutup (Simple Past) dengan peristiwa masa lalu yang hasilnya masih relevan atau jangka waktunya masih berjalan hingga saat ini (Present Perfect).'
      rules={[
        {
          title: 'Specific Past Time Anchor (Waktu Lampau Tertutup)',
          explanation:
            'Jika kalimat memuat penanda waktu lampau yang spesifik (in 2018, yesterday, three weeks ago, during the 19th century, when I was a child), WAJIB menggunakan Simple Past (V2).',
          badExample: 'The government has enacted the environmental directive in 2019.',
          goodExample: 'The government enacted the environmental directive in 2019.',
          tip: 'Present Perfect mutlak dilarang bersanding dengan penanda tahun lampau yang berdiri sendiri.',
        },
        {
          title: 'Unfinished Time Window (Jendela Waktu Berjalan)',
          explanation:
            'Jika rentang waktu menyentuh masa kini (over the last decade, so far, to date, this morning, in recent years), gunakan Present Perfect (have/has + V3).',
          badExample: 'Over the last decade, solar energy costs dropped by 80%.',
          goodExample: 'Over the last decade, solar energy costs have dropped by 80%.',
          tip: 'Dekade tersebut belum ditutup, melainkan berkesinambungan hingga saat kalimat diucapkan.',
        },
        {
          title: 'Klausa "SINCE" (Titik Mula Lampau ➔ Dampak Kini)',
          explanation:
            'Pola baku: Main clause menggunakan Present Perfect, sedangkan anak kalimat setelah SINCE menggunakan Simple Past (V2).',
          badExample: 'Ever since the regulation has changed, profits plummeted.',
          goodExample: 'Ever since the regulation changed, profits have plummeted.',
          tip: 'Rumus: S + have/has + V3 + SINCE + S + V2.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Melihat preposisi "for" lalu langsung refleks memilih Present Perfect.',
          solution:
            'Periksa subjek kalimat. Jika subjeknya adalah tokoh sejarah yang sudah wafat (misal: "Shakespeare lived in London for 20 years"), gunakan Simple Past, karena kehidupannya telah tuntas.',
        },
        {
          trap: 'Menganggap penanda "recently / lately" sebagai Simple Past.',
          solution:
            'Dalam ragam akademis formal, "recently" dan "lately" paling sering berpasangan dengan Present Perfect untuk menyatakan tren terkini.',
        },
      ]}
      bandTips={[
        'Kandidat Band 7+ menggunakan Present Perfect untuk menghubungkan temuan penelitian lampau dengan relevansi argumen esai hari ini (e.g. "Previous scholars have substantiated...").',
        'Gunakan adverbial placement yang natural: "has already begun", "have consistently demonstrated".',
      ]}
    />
  ),
};

export default tensesClientModule;
