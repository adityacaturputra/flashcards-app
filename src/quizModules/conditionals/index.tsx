// src/quizModules/conditionals/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { CONDITIONALS_MODULE_META } from '@/server/quiz/modules/conditionals';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const conditionalsClientModule: QuizClientModule = {
  ...CONDITIONALS_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={CONDITIONALS_MODULE_META.title}
      subtitle={CONDITIONALS_MODULE_META.shortTitle}
      rubricTitle={CONDITIONALS_MODULE_META.rubricTitle}
      cefr={CONDITIONALS_MODULE_META.targetCefr}
      accentColor={CONDITIONALS_MODULE_META.accentColor}
      formula='Type 2: If S + V2, S + would + V1 | Type 3: If S + had + V3, S + would have + V3 | Mixed: If Past, Present result'
      overview='Klausa pengandaian (Conditionals) adalah tolok ukur utama penguji Cambridge untuk menilai kriteria Grammatical Range. Menguasai Type 2, Type 3, Inversi, dan Mixed Conditionals adalah kunci menuju skor Band 7.5+.'
      rules={[
        {
          title: 'Conditional Type 2: Situasi Hipotesis Masa Kini',
          explanation:
            'Menggambarkan skenario yang bertentangan dengan kenyataan saat ini. Gunakan bentuk subjunctive "were" untuk semua subjek tunggal dalam bahasa Inggris formal.',
          badExample: 'If the government is subsidizing public transit, more people will commute by train.',
          goodExample: 'If the government were to subsidize public transit, more citizens would commute by train.',
          tip: 'Penggunaan "were to [verb]" memberikan nuansa tentatif sopan yang disukai akademisi.',
        },
        {
          title: 'Conditional Type 3: Penyesalan Masa Lalu',
          explanation:
            'Mengandaikan peristiwa yang berlawanan dengan sejarah masa lalu: klausa if memakai Past Perfect ("had + V3"), klausa hasil memakai "would have + V3".',
          badExample: 'If scientists realized the hazard earlier, they would stop the trial.',
          goodExample: 'If scientists had realized the hazard earlier, they would have halted the trial.',
          tip: 'Jangan pernah menaruh kata "would" di dalam anak kalimat yang diawali kata "if".',
        },
        {
          title: 'Inverted Conditionals (Struktur Mahir Tanpa "IF")',
          explanation:
            'Hilangkan kata "If" dan balikkan posisi auxiliary ke awal kalimat: "Had the authorities intervened..." atau "Were nations to cooperate...".',
          badExample: 'If it had not been for diplomatic intervention, conflict would erupt.',
          goodExample: 'Had it not been for diplomatic intervention, widespread conflict would have erupted.',
          tip: 'Inversi kondisional langsung menandai kemahiran gramatikal level C1/C2.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Mencampuradukkan waktu pada Mixed Conditionals.',
          solution:
            'Jika sebabnya terjadi 5 tahun lalu ("had invested five years ago"), tetapi dampaknya terjadi hari ini ("would not be in debt today"), padukan Past Perfect dengan would + V1.',
        },
        {
          trap: 'Menaruh kata negatif setelah konjungsi "Unless".',
          solution:
            '"Unless" sudah bermakna "if not". Jangan katakan "unless they do not pay", melainkan "unless they pay".',
        },
      ]}
      bandTips={[
        'Sertakan minimal satu kalimat Inverted Conditional ("Had the committee scrutinized...", "Were the state to enforce...") dalam esai Task 2 Anda.',
        'Gunakan variasi modal selain "would": gunakan "could have" (potensi) atau "might have" (probabilitas tentatif).',
      ]}
    />
  ),
};

export default conditionalsClientModule;
