// src/quizModules/spelling-accuracy/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { SPELLING_ACCURACY_MODULE_META } from '@/server/quiz/modules/spelling-accuracy';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const spellingAccuracyClientModule: QuizClientModule = {
  ...SPELLING_ACCURACY_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={SPELLING_ACCURACY_MODULE_META.title}
      subtitle={SPELLING_ACCURACY_MODULE_META.shortTitle}
      rubricTitle={SPELLING_ACCURACY_MODULE_META.rubricTitle}
      cefr={SPELLING_ACCURACY_MODULE_META.targetCefr}
      accentColor={SPELLING_ACCURACY_MODULE_META.accentColor}
      formula='Orthographic Precision Rules: Double Consonant Patterns | Silent Letter Memory Anchors | -ence vs -ance'
      overview='Dalam tes IELTS Listening dan Reading, kesalahan satu huruf saja (misal: "accomodation" alih-alih "accommodation") langsung berakibat nilai 0 untuk nomor tersebut. Dalam Writing, salah ketik berulang menurunkan skor Lexical Resource ke Band 5.0 atau 6.0.'
      rules={[
        {
          title: 'The Double Consonant Rule (Double C, Double M, Double R)',
          explanation:
            'Kata-kata serapan Latin/Prancis sering kali menggandakan dua konsonan sekaligus: AC-COM-MO-DA-TION (2 C, 2 M), OC-CUR-RENCE (2 C, 2 R), EM-BAR-RASS (2 R, 2 S).',
          badExample: 'The hotel provides affordable accomodation and transport.',
          goodExample: 'The university hostel provides subsidized accommodation for overseas scholars.',
          tip: 'Trik memori: "Accommodation needs 2 Cats and 2 Mice".',
        },
        {
          title: 'The Silent Nasal Letter: Environment & Government',
          explanation:
            'Huruf "N" di tengah kata "en-vi-ron-ment" dan "go-vern-ment" sering terlewat karena tidak terucap jelas dalam percakapan cepat.',
          badExample: 'Industrial pollution ruins the enviroment.',
          goodExample: 'Industrial effluent severely degrades the fragile marine environment.',
          tip: 'Ingat kata dasarnya: "environ" (mengelilingi) + "-ment" = environment.',
        },
        {
          title: 'One Collar, Two Sleeves: Necessary (1 C, 2 S)',
          explanation:
            'Kata "necessary" hanya memiliki SATU huruf "c" dan DUA huruf "s". Banyak orang keliru menulis "neccessary".',
          badExample: 'It is neccessary to implement stringent fiscal measures.',
          goodExample: 'It is necessary to implement comprehensive structural reforms.',
          tip: 'Trik kemeja: Satu Kerah (1 Collar / C), Dua Lengan (2 Sleeves / SS).',
        },
      ]}
      commonTraps={[
        {
          trap: 'Menambahkan huruf "d" pada kata "privilege".',
          solution:
            'Ejaan yang benar adalah "p-r-i-v-i-l-e-g-e". Tidak ada huruf D!',
        },
        {
          trap: 'Tertukar akhiran "-ible" vs "-able" (misal: visible, eligible vs comfortable, available).',
          solution:
            'Jika kata dasarnya adalah kata utuh dalam bahasa Inggris (comfort ➔ comfortable), gunakan "-able". Jika kata dasarnya tidak dapat berdiri sendiri (vis ➔ visible), gunakan "-ible".',
        },
      ]}
      bandTips={[
        'Buatlah daftar "Personal Blacklist" berisi 10 kata yang paling sering salah Anda eja, dan tempelkan di meja belajar.',
        'Selalu luangkan 3 menit terakhir ujian untuk memeriksa ejaan kata benda jamak (-s vs -es), konsonan ganda, dan kata berakhiran -y (study ➔ studies).',
      ]}
    />
  ),
};

export default spellingAccuracyClientModule;
