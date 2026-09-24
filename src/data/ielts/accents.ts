/**
 * IELTS Listening Multi-Accent Reference Dataset
 * Curated specifically for IELTS Band 7.0+ ear training across 5 official accent families:
 * 1. British RP (BBC News)
 * 2. Australian English (ABC News Australia)
 * 3. US & Canadian English (CNN / NPR News)
 * 4. South African English (SABC News)
 * 5. Indian English (AIR / Indian News)
 */

export interface AccentWordExample {
  word: string;
  ipa: string;
  note: string;
  audioText?: string;
}

export interface BroadcastLink {
  name: string;
  url: string;
  description: string;
  badge: string;
}

export interface AccentItem {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  locale: string;
  broadcaster: string;
  frequencyInIelts: string;
  phoneticSummary: string;
  detailedKeyTraits: string[];
  contrastWords: AccentWordExample[];
  sampleSentence: {
    text: string;
    ipa: string;
    translation: string;
    audioText?: string;
    examTip: string;
  };
  broadcastLinks: BroadcastLink[];
}

export interface CrossAccentComparison {
  word: string;
  meaning: string;
  variants: {
    accentId: string;
    locale: string;
    flag: string;
    ipa: string;
    transcriptionNote: string;
  }[];
}

export const IELTS_ACCENT_ITEMS: AccentItem[] = [
  {
    id: 'british-rp',
    name: 'British English (Received Pronunciation)',
    shortName: 'British (RP)',
    flag: '🇬🇧',
    locale: 'en-GB',
    broadcaster: 'BBC News / BBC World Service',
    frequencyInIelts: 'Sangat Sering (~50% – 60% Rekaman)',
    phoneticSummary: 'Non-rhotic (huruf "r" akhir tidak dibunyikan), vokal Broad A (/ɑː/), letup konsonan /t/ presisi.',
    detailedKeyTraits: [
      'Non-rhoticity: Huruf "r" setelah vokal tidak dibunyikan (car /kɑː/, hard /hɑːd/, water /ˈwɔːtə/). Hanya dibunyikan jika diikuti kata berawalan vokal (linking r: "car and driver").',
      'Broad A (/ɑː/): Vokal terbuka panjang pada kata bath /bɑːθ/, ask /ɑːsk/, dance /dɑːns/, path /pɑːθ/ (berbeda dengan US yang menggunakan /æ/).',
      'Konsonan /t/ Tegas: Letupan lidah di alveol sangat renyah. Dalam variasi London/Estuary, huruf "t" di tengah atau akhir kata sering diganti glottal stop /ʔ/ (bottle -> /ˈbɒʔl/).',
      'Intonasi Mengayun (Melodic Cadence): Penutur RP memiliki variasi nada pitch yang kaya saat menekankan kata kunci informatif.'
    ],
    contrastWords: [
      {
        word: 'bath',
        ipa: '/bɑːθ/',
        note: 'Vokal panjang dalam (/ɑː/), bukan vokal pipih /æ/ seperti di Amerika.',
      },
      {
        word: 'water',
        ipa: '/ˈwɔːtə/',
        note: 'Huruf "t" diletupkan tegas; akhiran "r" lebur menjadi schwa netral /ə/.',
      },
      {
        word: 'car',
        ipa: '/kɑː/',
        note: 'Non-rhotic murni: vokal panjang tanpa getaran atau desis konsonan "r".',
      },
      {
        word: 'better',
        ipa: '/ˈbetə/',
        note: 'Huruf "t" ganda ditekan tajam (tidak melunak menjadi "d").',
      },
      {
        word: 'schedule',
        ipa: '/ˈʃedʒ.uːl/',
        note: 'Diawali kluster bunyi "sh" (/ʃ/), bukan "sk" (/sk/) versi Amerika.',
      }
    ],
    sampleSentence: {
      text: "I'd like to book a return ticket to Oxford for quarter past four, please.",
      ipa: "/aɪd laɪk tə bʊk ə rɪˈtɜːn ˈtɪkɪt tuː ˈɒksfəd fɔː ˈkwɔːtə pɑːst fɔː pliːz/",
      translation: 'Saya ingin memesan tiket pulang-pergi ke Oxford untuk jam 4 lewat 15, tolong.',
      examTip: 'Perhatikan kata penunjuk waktu "quarter past"—penutur RP memperpanjang vokal /ɔː/ yang menjadi kunci isian soal Section 1.',
    },
    broadcastLinks: [
      {
        name: 'BBC World Service Live Radio',
        url: 'https://www.bbc.co.uk/sounds/play/live:bbc_world_service',
        description: 'Siaran radio berita global 24/7 resmi BBC dengan penutur standar RP jernih.',
        badge: 'Live Audio 24/7',
      },
      {
        name: 'BBC 6 Minute English',
        url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
        description: 'Podcast diskusi berita edukatif 6 menit dengan transkrip resmi lengkap.',
        badge: 'Podcast & Script',
      }
    ],
  },
  {
    id: 'australian',
    name: 'Australian English',
    shortName: 'Australian',
    flag: '🇦🇺',
    locale: 'en-AU',
    broadcaster: 'Australian ABC News Radio',
    frequencyInIelts: 'Sangat Sering (~20% – 30% Rekaman)',
    phoneticSummary: 'Pergeseran diftong /eɪ/ ➔ /aɪ/ ("day" terdengar "die"), intonasi naik di akhir kalimat (HRT).',
    detailedKeyTraits: [
      'Diphthong Shift (/eɪ/ ➔ /aɪ/): Vokal bergeser drastis sehingga kata "day", "mate", "today" terdengar mirip "die", "mite", "to-die". Di Section 1 saat mencatat tanggal (misal: "eighth of May"), siswa sering salah dengar jika tidak siap!',
      'High Rising Terminal (HRT): Intonasi nada naik di akhir klausa/kalimat meskipun itu kalimat berita biasa (bukan kalimat tanya).',
      'Vokal Santai & Terbuka: Fonem schwa di akhir kata cenderung diucapkan lebih lebar dan santai (river -> /ˈɹɪvə/).',
      'Non-rhotic: Sama seperti British RP, huruf "r" di akhir kata tidak dibunyikan.'
    ],
    contrastWords: [
      {
        word: 'day',
        ipa: '/daɪ/',
        note: 'Diftong condong ke /aɪ/, terdengar hampir serupa dengan kata "die".',
      },
      {
        word: 'today',
        ipa: '/təˈdaɪ/',
        note: 'Sangat sering muncul di Section 1 saat percakapan jadwal kedatangan.',
      },
      {
        word: 'eight',
        ipa: '/aɪt/',
        note: 'Krusial di IELTS! Tanggal 8th sering keliru ditulis 9th atau height oleh pemula.',
      },
      {
        word: 'mate',
        ipa: '/maɪt/',
        note: 'Diftong melebar terdengar "mite", sapaan khas dalam skenario santai.',
      },
      {
        word: 'water',
        ipa: '/ˈwoːtə/',
        note: 'Vokal belakang lebih santai dan terbuka dibanding aksen British.',
      }
    ],
    sampleSentence: {
      text: "G'day mate, the apartment lease is confirmed for the eighth of May, no worries!",
      ipa: "/ɡəˈdaɪ maɪt, ðə əˈpɑːtmənt liːs ɪz kənˈfɜːmd fɔː ðiː aɪtθ əv maɪ, nəʊ ˈwʌriz/",
      translation: 'Halo kawan, sewa apartemen sudah dikonfirmasi untuk tanggal 8 Mei, jangan khawatir!',
      examTip: 'Hati-hati dengan kata "eighth" (/aɪtθ/) dalam aksen Aussie—fokus pada konsonan akhir /θ/ agar tidak tertukar dengan kata lain.',
    },
    broadcastLinks: [
      {
        name: 'ABC News Radio Australia Live',
        url: 'https://www.abc.net.au/newsradio',
        description: 'Siaran langsung berita nasional & internasional dari lembaga penyiaran publik Australia.',
        badge: 'Live Radio',
      },
      {
        name: 'ABC Listen Podcasts',
        url: 'https://www.abc.net.au/listen',
        description: 'Platform audio dan podcast percakapan Australia bertema sains, lingkungan, dan masyarakat.',
        badge: 'On-Demand Audio',
      }
    ],
  },
  {
    id: 'us-canadian',
    name: 'US & Canadian English (General American)',
    shortName: 'US & Canadian',
    flag: '🇺🇸',
    locale: 'en-US',
    broadcaster: 'CNN / NPR News',
    frequencyInIelts: 'Sering (~15% – 20% Rekaman)',
    phoneticSummary: 'Rhotic ("r" jelas di semua posisi), Flap T ("water" ➔ "wader"), Flat A (/æ/ pada "bath").',
    detailedKeyTraits: [
      'Rhoticity: Huruf "r" selalu diartikulasikan dengan tegas dan melingkar di semua posisi kata (car /kɑːr/, hard /hɑːrd/, water /ˈwɑːtər/).',
      'Flap T / Flapping: Huruf "t" atau "tt" di antara dua vokal melunak menjadi bunyi "d" cepat atau ketukan lidah [ɾ] (water -> "wader", better -> "bedder", city -> "cidy").',
      'Flat A (/æ/): Kata-kata seperti bath, dance, half dilafalkan dengan vokal pipih /æ/, bukan vokal dalam /ɑː/.',
      'Schwa Reduction di Prefiks: Suku kata tak bertekanan disusutkan sangat cepat dalam percakapan formal/akademis.'
    ],
    contrastWords: [
      {
        word: 'water',
        ipa: '/ˈwɑːt̬ər/',
        note: 'Flap T melunak menjadi bunyi mirip "d" ("wader"), akhiran "r" sangat tegas.',
      },
      {
        word: 'city',
        ipa: '/ˈsɪt̬i/',
        note: 'Huruf "t" melunak terdengar seperti "cidy".',
      },
      {
        word: 'better',
        ipa: '/ˈbet̬ər/',
        note: 'Terdengar mirip "bedder", ritme cepat penutur Amerika Utara.',
      },
      {
        word: 'car',
        ipa: '/kɑːr/',
        note: 'Rhotic murni: lidah melengkung ke belakang menghasilkan bunyi "r" tebal.',
      },
      {
        word: 'schedule',
        ipa: '/ˈskedʒ.uːl/',
        note: 'Diawali kluster "sk" (/sk/), berbeda dari British yang memakai "sh".',
      }
    ],
    sampleSentence: {
      text: "Could I get a cold bottle of water in the city and sign up for the winter seminar?",
      ipa: "/kʊd aɪ ɡet ə koʊld ˈbɑːt̬l əv ˈwɑːt̬ər ɪn ðə ˈsɪt̬i ənd saɪn ʌp fɔːr ðə ˈwɪntər ˈsemənɑːr/",
      translation: 'Bisakah saya meminta sebotol air dingin di kota dan mendaftar untuk seminar musim dingin?',
      examTip: 'Frasa "bottle of water" menyatu menjadi "baddle of wader" karena fenomena flap t ganda dan connected speech.',
    },
    broadcastLinks: [
      {
        name: 'NPR News Now (Morning Edition)',
        url: 'https://www.npr.org/programs/morning-edition/',
        description: 'Jurnalisme audio berkualitas tinggi dari National Public Radio Amerika Serikat.',
        badge: 'Official Public Radio',
      },
      {
        name: 'CNN Audio & Podcasts',
        url: 'https://edition.cnn.com/audio',
        description: 'Siaran berita kilat 5 menit dan analisis mendalam dengan artikulasi General American.',
        badge: 'News Podcast',
      }
    ],
  },
  {
    id: 'south-african',
    name: 'South African English',
    shortName: 'South African',
    flag: '🇿🇦',
    locale: 'en-ZA',
    broadcaster: 'SABC News (South African Broadcasting Corp)',
    frequencyInIelts: 'Periodik (~5% – 10% Rekaman)',
    phoneticSummary: 'Kit Split (vokal /ɪ/ terpusat mendekati schwa /ə/), ritme berdegup rapat, letupan konsonan tajam.',
    detailedKeyTraits: [
      'Kit Split: Vokal pendek /ɪ/ pada kata-kata seperti sit, pin, milk bergeser ke belakang mendekati schwa netral /ə/. Akibatnya, kata "sit" terdengar mirip "suht", "pin" mirip "pun".',
      'Konsonan Diletupkan Tegas: Huruf letup /p/, /t/, /k/ dilafalkan sangat renyah dan tajam tanpa banyak aspirasi udara berlebih.',
      'Ritme Berdegup (Clipped Cadence): Irama bicara staccato yang padat dengan pengaruh fonologi bahasa Afrikaans dan rumpun bahasa Bantu lokal.',
      'Idiom Waktu Khas: Sering memakai frasa waktu unik seperti "just now" (berarti sebentar lagi atau nanti).'
    ],
    contrastWords: [
      {
        word: 'sit',
        ipa: '/sət/',
        note: 'Vokal /ɪ/ terpusat, terdengar mirip "suht" di telinga pemula.',
      },
      {
        word: 'pin',
        ipa: '/pən/',
        note: 'Vokal bergeser menyerupai schwa, mirip pelafalan kata "pun".',
      },
      {
        word: 'bus',
        ipa: '/bʌs/',
        note: 'Vokal tengah diletupkan pendek, tajam, dan terpotong cepat.',
      },
      {
        word: 'just now',
        ipa: '/dʒʌst naʊ/',
        note: 'Frasa waktu khas Afrika Selatan, sering muncul dalam dialog janji temu.',
      },
      {
        word: 'yes',
        ipa: '/jɪs/',
        note: 'Vokal lebih tertutup dan tajam dibanding standar UK/US.',
      }
    ],
    sampleSentence: {
      text: "Just now we will sit at the desk, check the list, and submit the campus application.",
      ipa: "/dʒʌst naʊ wiː wɪl sət æt ðə dɛsk, tʃɛk ðə ləst, ænd səbˈmɪt ðə ˈkæmpəs ˌæpləˈkeɪʃən/",
      translation: 'Sebentar lagi kita akan duduk di meja, memeriksa daftar, dan menyerahkan pendaftaran kampus.',
      examTip: 'Jangan sampai terkecoh saat mendengar kata "sit" dan "list" yang terdengar seperti "suht" dan "lust" karena efek Kit Split.',
    },
    broadcastLinks: [
      {
        name: 'SABC News Podcasts & Radio',
        url: 'https://www.sabcnews.com/sabcnews/category/audio-podcasts/',
        description: 'Saluran siaran berita resmi nasional Afrika Selatan dengan variasi aksen metropolitan Pretoria/Johannesburg.',
        badge: 'Official Broadcast',
      },
      {
        name: 'Channel Africa Radio',
        url: 'https://channelafrica.co.za/',
        description: 'Layanan audio internasional benua Afrika dengan berita multibahasa dan bahasa Inggris penutur asli.',
        badge: 'Pan-African Stream',
      }
    ],
  },
  {
    id: 'indian-english',
    name: 'Indian English',
    shortName: 'Indian English',
    flag: '🇮🇳',
    locale: 'en-IN',
    broadcaster: 'AIR / Indian News (All India Radio)',
    frequencyInIelts: 'Periodik (~5% – 10% Rekaman)',
    phoneticSummary: 'Retrofleks konsonan (/ʈ/ dan /ɖ/), ritme berbasis suku kata (Syllable-timed), variasi penekanan kata.',
    detailedKeyTraits: [
      'Konsonan Retrofleks (/ʈ/ dan /ɖ/): Lidah ditekuk melengkung ke belakang langit-langit mulut saat melafalkan huruf "t" dan "d", menghasilkan ketukan bunyi yang sangat khas.',
      'Syllable-Timed Rhythm: Berbeda dengan ritme British/US yang "stress-timed", penutur Indian English memberikan durasi waktu yang merata untuk setiap suku kata tanpa banyak pemotongan schwa ekstrem.',
      'Pergeseran Penekanan (Stress Shift): Letak penekanan suku kata sering berbeda dari standar RP (misal kata development atau hotel dilafalkan dengan penekanan lebih merata).',
      'Konsonan /r/ Bergetar Ringan: Huruf "r" sering diucapkan dengan ketukan lidah ringan (tap/trill).'
    ],
    contrastWords: [
      {
        word: 'time',
        ipa: '/ʈaɪm/',
        note: 'Huruf "t" retrofleks dengan ujung lidah melengkung ke atas.',
      },
      {
        word: 'date',
        ipa: '/ɖeːt/',
        note: 'Huruf "d" retrofleks; vokal murni tanpa diftong meluncur panjang.',
      },
      {
        word: 'total',
        ipa: '/ʈoːʈəl/',
        note: 'Kedua konsonan "t" diketuk tegas di langit-langit keras rongga mulut.',
      },
      {
        word: 'hotel',
        ipa: '/hoːˈʈɛl/',
        note: 'Suku kata pertama dan kedua diucapkan dengan kekuatan relatif seimbang.',
      },
      {
        word: 'problem',
        ipa: '/prɑːbləm/',
        note: 'Huruf "r" diletupkan dengan getaran lidah ringan (light tap).',
      }
    ],
    sampleSentence: {
      text: "Kindly confirm the total cost and date of your departure before Wednesday afternoon.",
      ipa: "/ˈkaɪndli kənˈfɜːrm ðə ˈʈoːʈəl kɒst ænd ɖeːt əv jʊər dɪˈpɑːrtʃər bɪˈfɔːr ˈwɛnzdeɪ ˌɑːftərˈnuːn/",
      translation: 'Mohon konfirmasikan total biaya dan tanggal keberangkatan Anda sebelum Rabu sore.',
      examTip: 'Kata "kindly" sangat lazim dipakai penutur India sebagai padanan formal "please". Dengarkan ketukan retrofleks pada "total" dan "date".',
    },
    broadcastLinks: [
      {
        name: 'All India Radio (AIR) News Bulletins',
        url: 'https://newsonair.gov.in/',
        description: 'Layanan buletin berita radio nasional resmi India berbahasa Inggris dengan aksen berstandar diplomasi.',
        badge: 'National Radio AIR',
      },
      {
        name: 'DD India English Live',
        url: 'https://www.youtube.com/@DDIndia',
        description: 'Saluran siaran televisi & radio publik internasional India untuk melatih pemahaman intonasi akademis.',
        badge: 'DD International',
      }
    ],
  },
];

export const CROSS_ACCENT_COMPARISONS: CrossAccentComparison[] = [
  {
    word: 'water',
    meaning: 'air (kata uji paling umum untuk mengidentifikasi aksen di Section 1)',
    variants: [
      {
        accentId: 'british-rp',
        locale: 'en-GB',
        flag: '🇬🇧',
        ipa: '/ˈwɔːtə/',
        transcriptionNote: 'Vokal bulat dalam, "t" renyah, non-rhotic (tanpa "r").',
      },
      {
        accentId: 'us-canadian',
        locale: 'en-US',
        flag: '🇺🇸',
        ipa: '/ˈwɑːt̬ər/',
        transcriptionNote: 'Flap T melunak ("wader"), akhiran "r" melingkar tebal.',
      },
      {
        accentId: 'australian',
        locale: 'en-AU',
        flag: '🇦🇺',
        ipa: '/ˈwoːtə/',
        transcriptionNote: 'Vokal tengah santai terbuka, non-rhotic tanpa "r".',
      },
      {
        accentId: 'south-african',
        locale: 'en-ZA',
        flag: '🇿🇦',
        ipa: '/ˈwɔːtə/',
        transcriptionNote: 'Konsonan "t" diletupkan tajam dan rapat.',
      },
      {
        accentId: 'indian-english',
        locale: 'en-IN',
        flag: '🇮🇳',
        ipa: '/ˈwɑːʈər/',
        transcriptionNote: 'Huruf "t" retrofleks (lidah ditekuk ke atas langit mulut).',
      },
    ],
  },
  {
    word: 'day',
    meaning: 'hari / tanggal (kata kunci vital penentu akurasi tanggal di Section 1)',
    variants: [
      {
        accentId: 'british-rp',
        locale: 'en-GB',
        flag: '🇬🇧',
        ipa: '/deɪ/',
        transcriptionNote: 'Diftong meluncur standar /eɪ/ seimbang.',
      },
      {
        accentId: 'australian',
        locale: 'en-AU',
        flag: '🇦🇺',
        ipa: '/daɪ/',
        transcriptionNote: 'Diftong bergeser tajam ke /aɪ/ — terdengar mirip "die".',
      },
      {
        accentId: 'us-canadian',
        locale: 'en-US',
        flag: '🇺🇸',
        ipa: '/deɪ/',
        transcriptionNote: 'Diftong tegas dengan pelepasan bunyi alveolar cepat.',
      },
      {
        accentId: 'south-african',
        locale: 'en-ZA',
        flag: '🇿🇦',
        ipa: '/deɪ/',
        transcriptionNote: 'Vokal terpotong lebih cepat dan ringkas.',
      },
      {
        accentId: 'indian-english',
        locale: 'en-IN',
        flag: '🇮🇳',
        ipa: '/ɖeː/',
        transcriptionNote: 'Konsonan "d" retrofleks dengan vokal murni tanpa diftong lebar.',
      },
    ],
  },
  {
    word: 'car',
    meaning: 'mobil (contoh klasik perbandingan rhotic vs non-rhotic)',
    variants: [
      {
        accentId: 'british-rp',
        locale: 'en-GB',
        flag: '🇬🇧',
        ipa: '/kɑː/',
        transcriptionNote: 'Non-rhotic murni: vokal panjang tanpa getaran huruf "r".',
      },
      {
        accentId: 'us-canadian',
        locale: 'en-US',
        flag: '🇺🇸',
        ipa: '/kɑːr/',
        transcriptionNote: 'Rhotic kuat: bunyi "r" melingkar jelas di langit mulut.',
      },
      {
        accentId: 'australian',
        locale: 'en-AU',
        flag: '🇦🇺',
        ipa: '/kɑː/',
        transcriptionNote: 'Non-rhotic dengan vokal belakang yang santai.',
      },
      {
        accentId: 'south-african',
        locale: 'en-ZA',
        flag: '🇿🇦',
        ipa: '/kɑː/',
        transcriptionNote: 'Non-rhotic dengan artikulasi vokal lebih tajam.',
      },
      {
        accentId: 'indian-english',
        locale: 'en-IN',
        flag: '🇮🇳',
        ipa: '/kɑːr/',
        transcriptionNote: 'Huruf "r" diartikulasikan dengan ketukan lidah ringan (tap).',
      },
    ],
  },
  {
    word: 'better',
    meaning: 'lebih baik (menguji perbedaan letupan /t/ vs flap t [ɾ])',
    variants: [
      {
        accentId: 'british-rp',
        locale: 'en-GB',
        flag: '🇬🇧',
        ipa: '/ˈbetə/',
        transcriptionNote: 'Huruf "t" diletupkan tegas, diakhiri schwa tanpa "r".',
      },
      {
        accentId: 'us-canadian',
        locale: 'en-US',
        flag: '🇺🇸',
        ipa: '/ˈbet̬ər/',
        transcriptionNote: 'Flap T melunak menjadi "bedder", akhiran "r" terdengar jelas.',
      },
      {
        accentId: 'australian',
        locale: 'en-AU',
        flag: '🇦🇺',
        ipa: '/ˈbetə/',
        transcriptionNote: 'Huruf "t" jelas, ritme santai tanpa desis konsonan "r".',
      },
      {
        accentId: 'south-african',
        locale: 'en-ZA',
        flag: '🇿🇦',
        ipa: '/ˈbetə/',
        transcriptionNote: 'Vokal /e/ terangkat tajam dan letupan konsonan padat.',
      },
      {
        accentId: 'indian-english',
        locale: 'en-IN',
        flag: '🇮🇳',
        ipa: '/ˈbɛʈər/',
        transcriptionNote: 'Retrofleks /ʈ/ kuat dengan ketukan lidah pada huruf "r".',
      },
    ],
  },
];
