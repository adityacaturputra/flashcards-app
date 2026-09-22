// src/quizModules/listening-stamina/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { LISTENING_STAMINA_MODULE_META } from '@/server/quiz/modules/listening-stamina';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const listeningStaminaClientModule: QuizClientModule = {
  ...LISTENING_STAMINA_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={LISTENING_STAMINA_MODULE_META.title}
      subtitle={LISTENING_STAMINA_MODULE_META.shortTitle}
      rubricTitle={LISTENING_STAMINA_MODULE_META.rubricTitle}
      cefr={LISTENING_STAMINA_MODULE_META.targetCefr}
      accentColor={LISTENING_STAMINA_MODULE_META.accentColor}
      formula='The 3-Phase Stamina Protocol: 1. Active Pre-reading (Predict Word Class) ➔ 2. Live Tracking (Signposting) ➔ 3. Cognitive Reset'
      overview='Mempertahankan fokus pendengaran selama 30 menit nonstop adalah tantangan ketahanan fisik dan psikologis. Kelelahan otak (cognitive fatigue) biasanya memuncak pada Section 4 monolog akademik 10 menit tanpa jeda, memicu eror konsentrasi beruntun.'
      rules={[
        {
          title: 'Pre-Listening Active Prediction (Prediksi Kelas Kata)',
          explanation:
            'Dalam 30 detik jeda sebelum audio berputar, jangan hanya membaca pasif. Tandai celah kosong dan tentukan: apakah butuh Nama Tempat, Angka/Harga, Kata Benda Jamak (-s), atau Kata Sifat?',
          badExample: 'Membaca teks secara pasif tanpa mencoret kata kunci.',
          goodExample: 'Menggarisbawahi "maximum capacity: [ ___ ] attendees" dan mengantisipasi angka ratusan/ribuan.',
          tip: 'Prediksi aktif mengurangi beban kerja memori jangka pendek hingga 50%.',
        },
        {
          title: 'Waspadai Speaker Self-Correction (Koreksi Diri Pembicara)',
          explanation:
            'Pembicara sering menyebut jawaban palsu terlebih dahulu sebelum mengoreksinya: "We had planned for Wednesday... oh wait, the theater was booked, so it is Thursday."',
          badExample: 'Langsung menulis "Wednesday" begitu pertama kali mendengar hari.',
          goodExample: 'Menahan pensil selama 2 detik untuk memastikan tidak ada frasa koreksi ("Actually, no, shifted to...").',
          tip: 'Jawaban final yang dikonfirmasi adalah jawaban yang sah.',
        },
        {
          title: 'Protokol Reset Kognitif Instan (Cut Losses Immediately)',
          explanation:
            'Jika Anda menyadari telah melewatkan satu jawaban di Section 4, LEPASKAN seketika! Jangan biarkan rasa panik membuat Anda kehilangan 3–4 nomor soal berikutnya.',
          badExample: 'Melamun memikirkan kata nomor 34 yang terlewat saat pembicara sudah membahas nomor 36.',
          goodExample: 'Mencoret nomor 34 dan langsung mengunci mata pada kata kunci nomor 35 dan 36.',
          tip: 'Kehilangan 1 nomor jauh lebih baik daripada hancur 5 nomor berturut-turut.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Lupa memeriksa akhiran jamak (-s) pada kata benda di lembar jawaban akhir.',
          solution:
            'Gunakan grammar kalimat sebagai pemandu: jika kalimat berbunyi "Several [ ___ ] were examined", kata tersebut WAJIB jamak berakhiran "-s".',
        },
        {
          trap: 'Melebihi batas jumlah kata (Word Count Violation).',
          solution:
            'Periksa instruksi di atas soal dengan saksama: "NO MORE THAN TWO WORDS AND/OR A NUMBER". Menulis 3 kata akan otomatis digugurkan.',
        },
      ]}
      bandTips={[
        'Latihlah stamina dengan mendengarkan materi berbobot 45 menit nonstop setiap hari (BBC In Our Time, The Guardian Audio Long Read) pada kecepatan 1.25x.',
        'Kuasai kata-kata penunjuk arah penceramah (*signposting language*): "Turning now to...", "Having considered the advantages, let us examine the drawbacks...".',
      ]}
    />
  ),
};

export default listeningStaminaClientModule;
