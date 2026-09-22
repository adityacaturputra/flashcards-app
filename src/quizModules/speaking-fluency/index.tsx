// src/quizModules/speaking-fluency/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { SPEAKING_FLUENCY_MODULE_META } from '@/server/quiz/modules/speaking-fluency';
import { ModuleTheoryView } from '@/components/molecules/quiz/ModuleTheoryView';

export const speakingFluencyClientModule: QuizClientModule = {
  ...SPEAKING_FLUENCY_MODULE_META,
  renderTheoryGuide: () => (
    <ModuleTheoryView
      title={SPEAKING_FLUENCY_MODULE_META.title}
      subtitle={SPEAKING_FLUENCY_MODULE_META.shortTitle}
      rubricTitle={SPEAKING_FLUENCY_MODULE_META.rubricTitle}
      cefr={SPEAKING_FLUENCY_MODULE_META.targetCefr}
      accentColor={SPEAKING_FLUENCY_MODULE_META.accentColor}
      formula='Long Turn Formula: 1m Note Taking (Keywords Only) ➔ Past Context ➔ Anecdote Climax ➔ Reflective Expansion'
      overview='Speaking Part 2 menuntut Anda berbicara seorang diri selama 110–120 detik penuh tanpa interupsi penguji. Kunci meraih skor Fluency & Coherence Band 7.5+ adalah memiliki persediaan bahan narasi yang melimpah dan menguasai teknik "Reflective Expansion" saat poin kartu soal sudah habis.'
      rules={[
        {
          title: 'Metode Pencatatan 1 Menit: Diagram Rantai Kata Kunci',
          explanation:
            'Dalam 60 detik persiapan, jangan pernah mencoba menulis kalimat utuh. Catat 8–10 kata kunci berbobot (kolokasi, kata sifat ekspresif, idiom) yang disusun seperti rantai alur cerita.',
          badExample: 'Mencoba menulis 3 kalimat lengkap dan kehabisan waktu sebelum merencanakan bagian akhir cerita.',
          goodExample: 'Menulis: "childhood mentor | resilient spirit | pivotal exam failure | instilled perseverance | profound gratitude".',
          tip: 'Kata kunci bertindak sebagai mercusuar ingatan Anda selama berbicara.',
        },
        {
          title: 'Teknik "Reflective Expansion" (Ekspansi Refleksi Diri)',
          explanation:
            'Jika Anda selesai menjawab semua butir Cue Card di menit 1:15, jangan diam! Perluas cerita dengan refleksi: "Looking back at that event now, I realize how much it shaped my worldview... If I were to encounter a similar dilemma today, I would..."',
          badExample: 'Mengatakan "That is all I can think of" di detik ke-75.',
          goodExample: 'Melanjutkan dengan perbandingan masa lalu vs masa sekarang dan pelajaran hidup yang dipetik.',
          tip: 'Berhentilah HANYA saat penguji secara verbal menyela Anda ("Thank you, that will do").',
        },
        {
          title: 'Conversational Fillers Alami (Membeli Waktu Berpikir)',
          explanation:
            'Hindari dengungan vokal monoton "uhh / umm / err" atau latah "like / you know". Gunakan penanda diskursus formal: "To be entirely frank...", "If memory serves me correctly...", "That’s an intriguing aspect to consider...".',
          badExample: 'Uhhhh... apa ya... ummm... the person was, you know, very nice.',
          goodExample: 'To be completely honest, if my memory serves me correctly, it was roughly five years ago when...',
          tip: 'Memberi otak waktu 2 detik menyusun tata bahasa klausa berikutnya tanpa merusak skor Fluency.',
        },
      ]}
      commonTraps={[
        {
          trap: 'Berpikir bahwa dihentikan penguji di batas 2 menit adalah tanda kesalahan.',
          solution:
            'Dihentikan penguji tepat di detik ke-120 adalah pertanda sukses bahwa Anda berhasil berbicara dengan durasi maksimal.',
        },
        {
          trap: 'Menghafal naskah cerita kata demi kata (Memorized Script).',
          solution:
            'Penguji dilatih khusus mendeteksi naskah hafalan melalui intonasi robotik dan kecepatan abnormal. Berbicaralah secara spontan mengikuti panduan kata kunci.',
        },
      ]}
      bandTips={[
        'Lakukan audit suara harian: rekam suara Anda berbicara 2 menit pada topik acak, lalu dengarkan kembali untuk menghitung durasi jeda hening dan ketepatan SVA.',
        'Kombinasikan pergeseran tenses: buka dengan Past Continuous ("It was raining heavily..."), ceritakan inti dengan Past Simple, dan tutup dengan Present Perfect ("It has fundamentally altered my perspective").',
      ]}
    />
  ),
};

export default speakingFluencyClientModule;
