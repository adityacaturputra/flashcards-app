// src/quizModules/passive-voice/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { PASSIVE_VOICE_MODULE_META } from '@/server/quiz/modules/passive-voice';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const passiveVoiceClientModule: QuizClientModule = {
  ...PASSIVE_VOICE_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={PASSIVE_VOICE_MODULE_META.title}
      subtitle={PASSIVE_VOICE_MODULE_META.shortTitle}
      rubricTitle={PASSIVE_VOICE_MODULE_META.rubricTitle}
      cefr={PASSIVE_VOICE_MODULE_META.targetCefr}
      accentColor={PASSIVE_VOICE_MODULE_META.accentColor}
      formula='Passive Formula: Subject + [appropriate form of BE] + Past Participle (V3)'
      overview='Kalimat pasif adalah instrumen utama dalam penulisan akademis untuk menciptakan impresi objektif, tidak memihak, dan berfokus pada material atau fenomena, bukan pada individu peneliti.'
      rules={[
        {
          title: 'IELTS Writing Task 1 Process Diagram Passive',
          explanation:
            'Saat menjelaskan diagram alir pembuatan teh, semen, atau daur ulang plastik, gunakan Present Simple Passive (is/are + V3) dipadukan dengan kata sekuensial (subsequently, thereafter, once).',
          badExample: 'Workers crush the limestone and they convey it to the kiln.',
          goodExample: 'The limestone is crushed and subsequently conveyed to the kiln.',
          tip: 'Pelaku (workers) tidak perlu disebutkan karena prosesnya bersifat mekanis dan terstandarisasi.',
        },
        {
          title: 'Impersonal Academic Passive (Hedging & Objectivity)',
          explanation:
            'Gunakan "It is widely believed / argued / anticipated that..." untuk menghindari penggunaan kata ganti orang pertama (I, We).',
          badExample: 'We think that artificial intelligence will eliminate clerical jobs.',
          goodExample: 'It is widely anticipated that artificial intelligence will displace routine administrative roles.',
          tip: 'Meningkatkan register bahasa esai Task 2 ke tingkat formal C1.',
        },
        {
          title: 'Modal Passive: Modal + be + V3',
          explanation:
            'Untuk regulasi, rekomendasi kebijakan, atau protokol keselamatan: can/should/must + be + Past Participle.',
          badExample: 'Municipal councils must enforce stringent zoning laws.',
          goodExample: 'Stringent zoning laws must be enforced by municipal councils.',
          tip: 'Fokus diletakkan pada undang-undang yang diatur, bukan pada pejabatnya.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Membuat kalimat pasif dari kata kerja intransitif (verbs that take no object).',
          solution:
            'Kata kerja seperti "occur", "happen", "die", "fail to", dan "appear" TIDAK BISA dipasifkan. Jangan menulis "an accident was occurred".',
        },
        {
          trap: 'Lupa menyertakan auxiliary "be" setelah kata modal.',
          solution:
            'Tulis "must be implemented", jangan "must implemented".',
        },
      ]}
      bandTips={[
        'Padukan passive voice dengan klausa partisipial: "Having been purified, the chemical solution is transferred to..."',
        'Seimbangkan kalimat pasif (sekitar 30–40% dalam laporan ilmiah) dengan kalimat aktif agar teks tidak monoton dan membosankan.',
      ]}
    />
  ),
};

export default passiveVoiceClientModule;
