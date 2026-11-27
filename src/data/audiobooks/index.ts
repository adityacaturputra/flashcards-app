import {
  AUDIOBOOK_AUDIO_BASE_URL,
  AUDIOBOOK_SCRIPT_BASE_URL,
} from '@/constants/audiobooks';
import { AudiobookEpisode, AudiobookModule } from '@/types/audiobook';

interface RawEpisodeDef {
  id: string;
  episodeNumber: number;
  title: string;
  focus: string;
  slug: string;
}

interface RawModuleDef {
  id: number;
  title: string;
  episodes: RawEpisodeDef[];
}

const RAW_MODULES: RawModuleDef[] = [
  {
    id: 1,
    title: 'Describing Your Career or Study',
    episodes: [
      {
        id: 'ep-01',
        episodeNumber: 1,
        title: 'Menceritakan Karier & Proyek dengan Mengalir',
        focus:
          'Formula menceritakan proyek Project Horizon tanpa terkesan membaca CV kaku.',
        slug: 'ep01-describing-career-or-study',
      },
      {
        id: 'ep-02',
        episodeNumber: 2,
        title: 'Present Perfect vs Continuous: Jangan Terjebak Rumus Mati',
        focus:
          'Membedakan keringat perjuangan (sweat/process) dengan piala hasil akhir (trophy/completion).',
        slug: 'ep02-present-perfect-vs-continuous',
      },
    ],
  },
  {
    id: 2,
    title: 'Stating Your Opinion on Certain Issues',
    episodes: [
      {
        id: 'ep-03',
        episodeNumber: 3,
        title: 'Menyatakan Pendapat dengan Sopan dan Asertif',
        focus:
          'Mengganti "I think" yang monoton dengan frasa diplomatis "From my perspective".',
        slug: 'ep03-stating-opinion-politely',
      },
      {
        id: 'ep-04',
        episodeNumber: 4,
        title: 'Seni Diplomasi dengan Modal Auxiliary',
        focus:
          'Mengapa "You must" terkesan galak dan bagaimana "You might want to consider" melunakkannya.',
        slug: 'ep04-modal-auxiliary-diplomacy',
      },
    ],
  },
  {
    id: 3,
    title: 'Telling About The Important Year in Your Life',
    episodes: [
      {
        id: 'ep-05',
        episodeNumber: 5,
        title: 'Menceritakan Tahun Bersejarah dalam Hidupmu',
        focus:
          'Ungkapan puitis "A watershed year" saat Alex meninggalkan zona nyaman korporat.',
        slug: 'ep05-important-year-in-your-life',
      },
      {
        id: 'ep-06',
        episodeNumber: 6,
        title: 'Merajut Alur Masa Lalu: Past Simple, Continuous, & Perfect',
        focus: 'Alur sinematik 3 babak di ruang tunggu wawancara beasiswa.',
        slug: 'ep06-past-tenses-storytelling',
      },
    ],
  },
  {
    id: 4,
    title: 'Trying to Respond The Latest News in Our Country',
    episodes: [
      {
        id: 'ep-07',
        episodeNumber: 7,
        title: 'Merespons Berita Terkini dengan Sudut Pandang Cerdas',
        focus:
          'Teknik balancing statement Elena saat menanggapi disrupsi AI pada ketenagakerjaan.',
        slug: 'ep07-responding-latest-news',
      },
      {
        id: 'ep-08',
        episodeNumber: 8,
        title: 'Tata Bahasa Laporan Berita: Passive Voice & Reported Speech',
        focus:
          'Mengapa jurnalisme global lebih menyukai kalimat pasif objektif daripada klaim personal.',
        slug: 'ep08-passive-voice-reported-speech',
      },
    ],
  },
  {
    id: 5,
    title: 'Presenting Your Future Dream That You Are Planning',
    episodes: [
      {
        id: 'ep-09',
        episodeNumber: 9,
        title: 'Mempresentasikan Mimpi & Rencana Masa Depan',
        focus:
          'Visi Chloe membangun community tech hub yang diiringi langkah konkret hari ini.',
        slug: 'ep09-presenting-future-dream',
      },
      {
        id: 'ep-10',
        episodeNumber: 10,
        title: 'Present Continuous untuk Jadwal Masa Depan yang Pasti',
        focus:
          'Perbedaan mendasar "I will fly" (masih niat) vs "I am flying to Tokyo tomorrow" (tiket sudah di tangan).',
        slug: 'ep10-present-continuous-future',
      },
    ],
  },
  {
    id: 6,
    title: 'Telling Your Unforgettable Story in Your Life',
    episodes: [
      {
        id: 'ep-11',
        episodeNumber: 11,
        title: 'Menceritakan Pengalaman Hidup yang Tak Terlupakan',
        focus:
          'Detil sensorik Kevin saat mendaki gunung dan terkepung kabut tebal misterius.',
        slug: 'ep11-unforgettable-story',
      },
      {
        id: 'ep-12',
        episodeNumber: 12,
        title: 'Bumbu Kata Penghubung Waktu dalam Cerita Naratif',
        focus:
          'Membuang kebiasaan "and then" dan menggantinya dengan "Meanwhile, As soon as, Eventually".',
        slug: 'ep12-time-connectors-narrative',
      },
    ],
  },
  {
    id: 7,
    title: "Talking About Plan and It's Deadline",
    episodes: [
      {
        id: 'ep-13',
        episodeNumber: 13,
        title: 'Membicarakan Rencana Kerja & Menegosiasikan Deadline',
        focus:
          'Transparansi Rachel saat mengabarkan perpanjangan deadline integrasi API secara elegan.',
        slug: 'ep13-plan-and-deadline',
      },
      {
        id: 'ep-14',
        episodeNumber: 14,
        title: "Future Perfect: Menatap Garis Finis dengan 'Will Have Done'",
        focus:
          'Membayangkan kemenangan target masa depan dengan struktur waktu "By next year, we will have...".',
        slug: 'ep14-future-perfect-will-have-done',
      },
    ],
  },
  {
    id: 8,
    title: "Describing Your Childhood's Dream and Your Today's Dream",
    episodes: [
      {
        id: 'ep-15',
        episodeNumber: 15,
        title: 'Mimpi Masa Kecil vs Realitas Hari Ini',
        focus:
          'Refleksi hangat Ryan dari mimpi menjadi astronot hingga bertransformasi menjadi penjelajah data.',
        slug: 'ep15-childhood-vs-today-dream',
      },
      {
        id: 'ep-16',
        episodeNumber: 16,
        title: 'Pengandaian Kehidupan: Second & Third Conditionals',
        focus:
          'Berdamai dengan masa lalu dan membuka lembaran peluang baru lewat pengandaian realistis.',
        slug: 'ep16-second-third-conditionals',
      },
    ],
  },
];

export const AUDIOBOOK_MODULES: AudiobookModule[] = RAW_MODULES.map((mod) => ({
  id: mod.id,
  title: mod.title,
  episodes: mod.episodes.map((ep) => ({
    id: ep.id,
    episodeNumber: ep.episodeNumber,
    moduleId: mod.id,
    moduleTitle: mod.title,
    title: ep.title,
    focus: ep.focus,
    audioUrl: `${AUDIOBOOK_AUDIO_BASE_URL}/${ep.id}.mp3`,
    scriptUrl: `${AUDIOBOOK_SCRIPT_BASE_URL}/${ep.id}.md`,
    downloadFilename: `next-level-stories-${ep.slug}.mp3`,
  })),
}));

export const ALL_AUDIOBOOK_EPISODES: AudiobookEpisode[] =
  AUDIOBOOK_MODULES.flatMap((mod) => mod.episodes);
