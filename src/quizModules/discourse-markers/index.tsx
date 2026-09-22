// src/quizModules/discourse-markers/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { DISCOURSE_MARKERS_MODULE_META } from '@/server/quiz/modules/discourse-markers';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const discourseMarkersClientModule: QuizClientModule = {
  ...DISCOURSE_MARKERS_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={DISCOURSE_MARKERS_MODULE_META.title}
      subtitle={DISCOURSE_MARKERS_MODULE_META.shortTitle}
      rubricTitle={DISCOURSE_MARKERS_MODULE_META.rubricTitle}
      cefr={DISCOURSE_MARKERS_MODULE_META.targetCefr}
      accentColor={DISCOURSE_MARKERS_MODULE_META.accentColor}
      formula='Transitions: Addition (Moreover, Furthermore) | Result (Consequently, Hence) | Concession (Albeit, Notwithstanding)'
      overview='Penanda wacana (Discourse Markers / Cohesive Devices) adalah rambu lalu lintas yang memandu pembaca menelusuri alur pikiran Anda. Penilaian Coherence & Cohesion Band 7.5+ menuntut penanda wacana yang luwes, bervariasi, dan tidak terkesan mekanis atau dipaksakan.'
      rules={[
        {
          title: 'Konsesi Elegan: ALBEIT (Meskipun / Walaupun)',
          explanation:
            '"Albeit" digunakan untuk menambahkan keterangan konsesif yang ringkas tanpa perlu membentuk anak kalimat baru. Diikuti langsung oleh kata sifat atau frasa preposisi.',
          badExample: 'The technology is effective, although it is slightly expensive.',
          goodExample: 'The technology is remarkably effective, albeit somewhat cost-prohibitive for rural clinics.',
          tip: 'Gunakan "albeit" untuk menggantikan klausa "although it is" yang panjang.',
        },
        {
          title: 'Sebab-Akibat Kuat: CONSEQUENTLY & HENCE',
          explanation:
            'Alih-alih selalu memakai "so" atau "because of this", gunakan "; consequently," di awal kalimat atau klausa kedua.',
          badExample: 'Interest rates surged so people stopped buying houses.',
          goodExample: 'Mortgage rates escalated sharply; consequently, domestic property acquisitions plummeted.',
          tip: 'Gunakan semicolon (;) sebelum consequently jika masih dalam satu kalimat.',
        },
        {
          title: 'Preposisi Kontras Formal: NOTWITHSTANDING',
          explanation:
            '"Notwithstanding" memiliki arti setara dengan "despite / in spite of", namun dengan bobot register formal C2 yang sangat tinggi. Diikuti langsung oleh kata benda (noun phrase).',
          badExample: 'Despite of public protests, the government approved the project.',
          goodExample: 'Notwithstanding vocal public demonstrations, the legislative council ratified the infrastructure bill.',
          tip: 'Jangan pernah menambahkan kata "of" setelah kata "notwithstanding".',
        },
      ]}
      commonTraps={[
        {
          trap: 'Menggunakan "mechanical over-linking" (menaruh linking word di setiap awal kalimat: Firstly, Secondly, Furthermore, Moreover, Finally).',
          solution:
            'Gunakan kohesi leksikal (pengulangan kata kunci dengan parafrasa atau kata ganti rujukan) untuk menjaga aliran alami tanpa terlalu banyak kata transisi mekanis.',
        },
        {
          trap: 'Menulis "Despite of" (menambahkan "of" setelah despite).',
          solution:
            'Gunakan "Despite [Noun]" ATAU "In spite of [Noun]". Jangan pernah menggabungkan keduanya menjadi "despite of".',
        },
      ]}
      bandTips={[
        'Gunakan penanda simetri "conversely" saat membandingkan dua kelompok data yang bergerak berlawanan di Task 1 (e.g. "While petrol sales shrank, electric vehicle adoption, conversely, expanded threefold").',
        'Kuasai frasa penjustifikasi "In light of recent developments..." untuk mengawali paragraf analisis esai.',
      ]}
    />
  ),
};

export default discourseMarkersClientModule;
