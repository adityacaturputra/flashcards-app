import {
  AlphabetLetter,
  RhymeGroupInfo,
  RhymeClusterTrap,
  ConfusionPairItem,
  SpellingExercise,
  RHYME_GROUP_ID,
} from '@/types/alphabet';

/**
 * All 26 letters of the English Alphabet with phonetic IPA, NATO words,
 * sound-alike rhyme groupings, and pronunciation recognition tips.
 */
export const ALPHABET_LETTERS: AlphabetLetter[] = [
  {
    char: 'A',
    lower: 'a',
    name: 'ay',
    ipa: '/eɪ/',
    nato: 'Alpha',
    rhymeGroup: RHYME_GROUP_ID.EI,
    rhymeIpa: '/eɪ/',
    confusionPartners: ['E', 'I', 'H', 'J', 'K'],
    exampleWord: 'Apple',
    exampleIpa: '/ˈæp.əl/',
    tip: 'Vokal diphthong /eɪ/ seperti kata "day" atau "say". Sering tertukar dengan E (/iː/) atau I (/aɪ/) oleh penutur Indonesia.',
    isVowel: true,
  },
  {
    char: 'B',
    lower: 'b',
    name: 'bee',
    ipa: '/biː/',
    nato: 'Bravo',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['P', 'V', 'D'],
    exampleWord: 'Bravo',
    exampleIpa: '/ˈbrɑː.voʊ/',
    tip: 'Bibir tertutup rapat lalu meletup dengan getaran pita suara (voiced). Bedakan dengan V (gigi atas di bibir bawah) dan P (tanpa getaran).',
    isVowel: false,
  },
  {
    char: 'C',
    lower: 'c',
    name: 'see',
    ipa: '/siː/',
    nato: 'Charlie',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['S', 'Z'],
    exampleWord: 'Charlie',
    exampleIpa: '/ˈtʃɑːr.li/',
    tip: 'Dimulai dengan desis /s/ lalu vokal panjang /iː/. Bunyinya persis seperti kata "see" atau "sea".',
    isVowel: false,
  },
  {
    char: 'D',
    lower: 'd',
    name: 'dee',
    ipa: '/diː/',
    nato: 'Delta',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['T', 'B'],
    exampleWord: 'Delta',
    exampleIpa: '/ˈdel.tə/',
    tip: 'Ujung lidah menempel di gusi atas (alveolar ridge) dengan getaran suara berdesir pelan. Bedakan dengan T (tanpa getaran/berhembus kuat).',
    isVowel: false,
  },
  {
    char: 'E',
    lower: 'e',
    name: 'ee',
    ipa: '/iː/',
    nato: 'Echo',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['I', 'A'],
    exampleWord: 'Echo',
    exampleIpa: '/ˈek.oʊ/',
    tip: 'Senyum lebar! Bunyinya /iː/ panjang seperti "see" atau "tree". Jebakan nomor 1: Penutur Indonesia sering mengira ini adalah huruf I!',
    isVowel: true,
  },
  {
    char: 'F',
    lower: 'f',
    name: 'ef',
    ipa: '/ɛf/',
    nato: 'Foxtrot',
    rhymeGroup: RHYME_GROUP_ID.E,
    rhymeIpa: '/ɛ/',
    confusionPartners: ['S', 'V', 'X'],
    exampleWord: 'Foxtrot',
    exampleIpa: '/ˈfɒks.trɒt/',
    tip: 'Dimulai dengan vokal /ɛ/ lalu desis tiupan gigi atas menyentuh bibir bawah tanpa suara (unvoiced).',
    isVowel: false,
  },
  {
    char: 'G',
    lower: 'g',
    name: 'jee',
    ipa: '/dʒiː/',
    nato: 'Golf',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['J'],
    exampleWord: 'Golf',
    exampleIpa: '/ɡɒlf/',
    tip: 'JEBAKAN IELTS TERBESAR: G berbunyi /dʒiː/ (berakhiran vokal "ee" seperti jeans), sedangkan J berbunyi /dʒeɪ/ (seperti "jay").',
    isVowel: false,
  },
  {
    char: 'H',
    lower: 'h',
    name: 'aytch',
    ipa: '/eɪtʃ/',
    nato: 'Hotel',
    rhymeGroup: RHYME_GROUP_ID.EI,
    rhymeIpa: '/eɪ/',
    confusionPartners: ['8', 'A'],
    exampleWord: 'Hotel',
    exampleIpa: '/hoʊˈtel/',
    tip: 'Dimulai dengan diftong /eɪ/ lalu ditutup letupan lembut /tʃ/. Diucapkan "aych", bukan "haitch" pada standar formal.',
    isVowel: false,
  },
  {
    char: 'I',
    lower: 'i',
    name: 'eye',
    ipa: '/aɪ/',
    nato: 'India',
    rhymeGroup: RHYME_GROUP_ID.AI,
    rhymeIpa: '/aɪ/',
    confusionPartners: ['E', 'Y', 'A'],
    exampleWord: 'India',
    exampleIpa: '/ˈɪn.di.ə/',
    tip: 'Berbunyi persis kata "eye" atau kata ganti "I". Diftong dari /a/ meluncur ke /ɪ/. Jangan tertukar dengan huruf E (/iː/)!',
    isVowel: true,
  },
  {
    char: 'J',
    lower: 'j',
    name: 'jay',
    ipa: '/dʒeɪ/',
    nato: 'Juliett',
    rhymeGroup: RHYME_GROUP_ID.EI,
    rhymeIpa: '/eɪ/',
    confusionPartners: ['G'],
    exampleWord: 'Juliett',
    exampleIpa: '/ˈdʒuː.li.et/',
    tip: 'Berakhiran suara /eɪ/ seperti kata "day" atau "say". Selalu ingat: J = Jay (/dʒeɪ/), G = Gee (/dʒiː/).',
    isVowel: false,
  },
  {
    char: 'K',
    lower: 'k',
    name: 'kay',
    ipa: '/keɪ/',
    nato: 'Kilo',
    rhymeGroup: RHYME_GROUP_ID.EI,
    rhymeIpa: '/eɪ/',
    confusionPartners: ['Q', 'C'],
    exampleWord: 'Kilo',
    exampleIpa: '/ˈkiː.loʊ/',
    tip: 'Letupan /k/ tanpa suara meluncur ke diftong /eɪ/. Berima dengan A, H, dan J.',
    isVowel: false,
  },
  {
    char: 'L',
    lower: 'l',
    name: 'el',
    ipa: '/ɛl/',
    nato: 'Lima',
    rhymeGroup: RHYME_GROUP_ID.E,
    rhymeIpa: '/ɛ/',
    confusionPartners: ['R'],
    exampleWord: 'Lima',
    exampleIpa: '/ˈliː.mə/',
    tip: 'Dimulai dengan vokal /ɛ/ lalu ujung lidah naik menempel pada langit-langit depan mulut.',
    isVowel: false,
  },
  {
    char: 'M',
    lower: 'm',
    name: 'em',
    ipa: '/ɛm/',
    nato: 'Mike',
    rhymeGroup: RHYME_GROUP_ID.E,
    rhymeIpa: '/ɛ/',
    confusionPartners: ['N'],
    exampleWord: 'Mike',
    exampleIpa: '/maɪk/',
    tip: 'KUNCI DIKTE: Pada akhir huruf M, kedua bibir TERTUTUP RAPAT! Udara hanya keluar melalui rongga hidung.',
    isVowel: false,
  },
  {
    char: 'N',
    lower: 'n',
    name: 'en',
    ipa: '/ɛn/',
    nato: 'November',
    rhymeGroup: RHYME_GROUP_ID.E,
    rhymeIpa: '/ɛ/',
    confusionPartners: ['M'],
    exampleWord: 'November',
    exampleIpa: '/noʊˈvem.bər/',
    tip: 'KUNCI DIKTE: Pada akhir huruf N, bibir TETAP TERBUKA! Ujung lidah menekan gusi atas.',
    isVowel: false,
  },
  {
    char: 'O',
    lower: 'o',
    name: 'oh',
    ipa: '/oʊ/',
    nato: 'Oscar',
    rhymeGroup: RHYME_GROUP_ID.OU,
    rhymeIpa: '/oʊ/',
    confusionPartners: ['U'],
    exampleWord: 'Oscar',
    exampleIpa: '/ˈɒs.kər/',
    tip: 'Bibir membulat. Diftong meluncur dari /o/ ke /ʊ/, terdengar persis kata seruan "Oh!" atau kata "go".',
    isVowel: true,
  },
  {
    char: 'P',
    lower: 'p',
    name: 'pee',
    ipa: '/piː/',
    nato: 'Papa',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['B', 'V'],
    exampleWord: 'Papa',
    exampleIpa: '/pəˈpɑː/',
    tip: 'Hembusan angin kuat (aspirasi) dari kedua bibir tanpa getaran pita suara. Jika memegang selembar tisu di depan mulut, tisu akan tertiup.',
    isVowel: false,
  },
  {
    char: 'Q',
    lower: 'q',
    name: 'cue',
    ipa: '/kjuː/',
    nato: 'Quebec',
    rhymeGroup: RHYME_GROUP_ID.UU,
    rhymeIpa: '/uː/',
    confusionPartners: ['K', 'U'],
    exampleWord: 'Quebec',
    exampleIpa: '/kwəˈbek/',
    tip: 'Dimulai dengan bunyi /k/ lalu diikuti glide /juː/. Bunyinya persis kata "queue" (antrean) atau stick "cue".',
    isVowel: false,
  },
  {
    char: 'R',
    lower: 'r',
    name: 'ar',
    ipa: '/ɑːr/',
    nato: 'Romeo',
    rhymeGroup: RHYME_GROUP_ID.AR,
    rhymeIpa: '/ɑː(r)/',
    confusionPartners: ['A', 'L'],
    exampleWord: 'Romeo',
    exampleIpa: '/ˈroʊ.mi.oʊ/',
    tip: 'Rahang terbuka lebar /ɑː/. Pada aksen American terdengar /r/ rhotik di akhir; pada aksen British diucapkan /ɑː/ murni.',
    isVowel: false,
  },
  {
    char: 'S',
    lower: 's',
    name: 'es',
    ipa: '/ɛs/',
    nato: 'Sierra',
    rhymeGroup: RHYME_GROUP_ID.E,
    rhymeIpa: '/ɛ/',
    confusionPartners: ['C', 'X', 'F'],
    exampleWord: 'Sierra',
    exampleIpa: '/siˈer.ə/',
    tip: 'Dimulai dengan vokal /ɛ/ lalu dilanjutkan desis tajam berkepanjangan /s/.',
    isVowel: false,
  },
  {
    char: 'T',
    lower: 't',
    name: 'tee',
    ipa: '/tiː/',
    nato: 'Tango',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['D'],
    exampleWord: 'Tango',
    exampleIpa: '/ˈtæŋ.ɡoʊ/',
    tip: 'Letupan udara tajam tanpa suara (unvoiced plosive) dari ujung lidah. Bunyinya seperti kata "tea".',
    isVowel: false,
  },
  {
    char: 'U',
    lower: 'u',
    name: 'yoo',
    ipa: '/juː/',
    nato: 'Uniform',
    rhymeGroup: RHYME_GROUP_ID.UU,
    rhymeIpa: '/uː/',
    confusionPartners: ['W', 'O', 'Q'],
    exampleWord: 'Uniform',
    exampleIpa: '/ˈjuː.nɪ.fɔːrm/',
    tip: 'Dimulai dengan semivokal /j/ meluncur ke vokal bulat panjang /uː/. Bunyinya persis kata ganti "you".',
    isVowel: true,
  },
  {
    char: 'V',
    lower: 'v',
    name: 'vee',
    ipa: '/viː/',
    nato: 'Victor',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/',
    confusionPartners: ['B', 'F'],
    exampleWord: 'Victor',
    exampleIpa: '/ˈvɪk.tər/',
    tip: 'KUNCI FISIK: Gigi atas menyentuh bibir bawah dengan getaran mendengung (voiced fricative). JANGAN pernah merapatkan kedua bibir seperti B!',
    isVowel: false,
  },
  {
    char: 'W',
    lower: 'w',
    name: 'double-u',
    ipa: '/ˈdʌb.əl.juː/',
    nato: 'Whiskey',
    rhymeGroup: RHYME_GROUP_ID.UU,
    rhymeIpa: '/uː/',
    confusionPartners: ['U', 'V'],
    exampleWord: 'Whiskey',
    exampleIpa: '/ˈwɪs.ki/',
    tip: 'Satu-satunya huruf alfabet dengan 3 suku kata: "dub-ul-yoo". Berakhiran vokal /uː/.',
    isVowel: false,
  },
  {
    char: 'X',
    lower: 'x',
    name: 'eks',
    ipa: '/ɛks/',
    nato: 'X-ray',
    rhymeGroup: RHYME_GROUP_ID.E,
    rhymeIpa: '/ɛ/',
    confusionPartners: ['S'],
    exampleWord: 'X-ray',
    exampleIpa: '/ˈeks.reɪ/',
    tip: 'Dimulai dengan vokal /ɛ/ lalu diakhiri klaster konsonan rangkap /ks/.',
    isVowel: false,
  },
  {
    char: 'Y',
    lower: 'y',
    name: 'wye',
    ipa: '/waɪ/',
    nato: 'Yankee',
    rhymeGroup: RHYME_GROUP_ID.AI,
    rhymeIpa: '/aɪ/',
    confusionPartners: ['I', 'W'],
    exampleWord: 'Yankee',
    exampleIpa: '/ˈjæŋ.ki/',
    tip: 'Dimulai dengan /w/ lalu meluncur ke diftong /aɪ/. Bunyinya persis kata tanya "why".',
    isVowel: false,
  },
  {
    char: 'Z',
    lower: 'z',
    name: 'zee / zed',
    ipa: '/ziː/',
    ipaUk: '/zɛd/',
    nato: 'Zulu',
    rhymeGroup: RHYME_GROUP_ID.II,
    rhymeIpa: '/iː/ (US) or /ɛ/ (UK)',
    confusionPartners: ['C', 'S'],
    exampleWord: 'Zulu',
    exampleIpa: '/ˈzuː.luː/',
    tip: 'PERBEDAAN REGIONAL: Di US diucapkan "zee" /ziː/ (berima dengan B, C, D). Di UK, Australia, dan IELTS umumnya diucapkan "zed" /zɛd/ (berima dengan "bed")!',
    isVowel: false,
  },
];

/**
 * Sound-Alike Rhyme Groups (Vowel Sound Families)
 * Grouping letters by their ending vowel sound makes memorizing and differentiating them 10x faster.
 */
export const RHYME_GROUPS: RhymeGroupInfo[] = [
  {
    id: RHYME_GROUP_ID.EI,
    ipa: '/eɪ/',
    name: 'The "EI" Family (/eɪ/)',
    letters: ['A', 'H', 'J', 'K'],
    description: 'Semua huruf di kelompok ini berakhiran suara diftong /eɪ/ seperti kata "day", "say", atau "make".',
    articulationTip: 'Buka rahang sedang, lalu tarik sudut bibir ke samping membentuk senyuman saat suara meluncur ke /ɪ/.',
  },
  {
    id: RHYME_GROUP_ID.II,
    ipa: '/iː/',
    name: 'The "EE" Family (/iː/)',
    letters: ['B', 'C', 'D', 'E', 'G', 'P', 'T', 'V', 'Z'],
    description: 'Kelompok terbesar dalam alfabet. Semua huruf berakhiran vokal panjang /iː/ seperti kata "see" atau "tree" (Z khusus aksen US).',
    articulationTip: 'Senyum lebar dengan lidah terangkat tinggi mendekati langit-langit depan.',
  },
  {
    id: RHYME_GROUP_ID.E,
    ipa: '/ɛ/',
    name: 'The "EH" Family (/ɛ/)',
    letters: ['F', 'L', 'M', 'N', 'S', 'X', 'Z'],
    description: 'Semua huruf diawali dengan bunyi vokal pendek /ɛ/ seperti kata "pen" atau "bed" (Z khusus aksen UK/IELTS "zed").',
    articulationTip: 'Buka mulut santai dengan posisi lidah di tengah, lalu artikulasikan konsonan penutupnya.',
  },
  {
    id: RHYME_GROUP_ID.AI,
    ipa: '/aɪ/',
    name: 'The "EYE" Family (/aɪ/)',
    letters: ['I', 'Y'],
    description: 'Keduanya berakhiran diftong terbuka lebar /aɪ/ seperti kata "my", "high", dan "sky".',
    articulationTip: 'Mulai dari rahang terbuka lebar /a/ lalu meluncur cepat ke vokal tinggi /ɪ/.',
  },
  {
    id: RHYME_GROUP_ID.UU,
    ipa: '/uː/',
    name: 'The "OO" Family (/uː/)',
    letters: ['Q', 'U', 'W'],
    description: 'Semua huruf di kelompok ini berakhiran suara vokal bulat panjang /uː/ seperti kata "you" atau "blue".',
    articulationTip: 'Bibir dimajukan membulat rapat (pursed lips) di akhir pengucapan.',
  },
  {
    id: RHYME_GROUP_ID.OU,
    ipa: '/oʊ/',
    name: 'The "OH" Standalone (/oʊ/)',
    letters: ['O'],
    description: 'Huruf mandiri dengan vokal bulat /oʊ/ seperti kata "go", "no", atau "boat".',
    articulationTip: 'Bibir membentuk lingkaran sedang lalu menyempit sedikit di akhir bunyi.',
  },
  {
    id: RHYME_GROUP_ID.AR,
    ipa: '/ɑː(r)/',
    name: 'The "AR" Standalone (/ɑːr/)',
    letters: ['R'],
    description: 'Huruf mandiri dengan vokal belakang terbuka /ɑː/ seperti kata "car" atau "far".',
    articulationTip: 'Jatuhkan rahang ke bawah secara rileks. Pada aksen American, tarik lidah ke belakang.',
  },
];

/**
 * Matriks Bunyi Huruf Berirama Sama (Rhyming Letter Clusters)
 * Rangkuman titik rawan kebingungan non-native dari Kurikulum IELTS Listening Section 1.
 */
export const RHYMING_LETTER_CLUSTERS_TABLE: RhymeClusterTrap[] = [
  {
    soundCategory: '/eɪ/ Sound',
    ipa: '/eɪ/',
    letters: ['A', 'H', 'J', 'K'],
    nonNativeTrap:
      'Huruf A sering tertukar dengan E atau I. Huruf H sering diucapkan /eɪtʃ/ dan dikira dimulai dengan A.',
  },
  {
    soundCategory: '/iː/ Sound',
    ipa: '/iː/',
    letters: ['B', 'C', 'D', 'E', 'G', 'P', 'T', 'V', 'Z'],
    nonNativeTrap:
      'Huruf E sering tertukar dengan I. Huruf G sering tertukar dengan J. Huruf B tertukar dengan V atau P.',
  },
  {
    soundCategory: '/e/ Sound',
    ipa: '/e/',
    letters: ['F', 'L', 'M', 'N', 'S', 'X', 'Z'],
    nonNativeTrap:
      'Pasangan M dan N harus diperhatikan gerakan bibir penutur atau konteks audio.',
  },
  {
    soundCategory: '/aɪ/ Sound',
    ipa: '/aɪ/',
    letters: ['I', 'Y'],
    nonNativeTrap:
      'Huruf I sering ditulis E oleh pembelajar bahasa Indonesia/Melayu karena transfer bunyi bahasa ibu.',
  },
  {
    soundCategory: '/uː/ Sound',
    ipa: '/uː/',
    letters: ['Q', 'U', 'W'],
    nonNativeTrap:
      'Huruf W (/ˈdʌbəl.juː/) memerlukan waktu penulisan lebih lama; antisipasi bunyi konsonan berikutnya.',
  },
];

/**
 * Kaidah Pengucapan Ejaan Cepat (IELTS Listening Speed Spelling Conventions)
 */
export const SPELLING_CONVENTIONS = [
  {
    title: '"Double" Letter',
    rule: 'Penutur asli Inggris hampir selalu menggunakan kata "double" daripada menyebut huruf dua kali berturut-turut.',
    example: 'Pembicara: "It\'s Miller: M - I - double L - E - R." ➔ Tulis: MILLER',
  },
  {
    title: 'Penyebutan Karakter Spesifik',
    rule: 'Simbol khusus dieja dengan istilah baku:',
    example: 'Tanda hubung: "hyphen" / "dash" (ANNE-MARIE) • Garis bawah: "underscore" (_) • Titik: "dot" (bukan "point" / "period")',
  },
];

/**
 * High-Confusion Pairs: The most common hearing and pronunciation mistakes
 * encountered by ESL learners, particularly in IELTS Listening Section 1.
 */
export const CONFUSION_PAIRS: ConfusionPairItem[] = [
  {
    id: 'g-vs-j',
    title: 'G vs J (Perangkap Nomor 1 IELTS)',
    letters: ['G', 'J'],
    whyConfusing:
      'Di banyak bahasa (seperti Indonesia atau Spanyol), huruf G dan J memiliki asosiasi vokal yang terbalik atau serupa.',
    acousticClue:
      'G berakhiran vokal "EE" /dʒiː/ (seperti "Jeans"). J berakhiran vokal "AY" /dʒeɪ/ (seperti "Jay" atau "Day").',
    articulatoryDifference:
      'Keduanya diawali bunyi affricate /dʒ/, namun G menarik bibir ke samping untuk /iː/, sedangkan J membuka rahang lalu menutup untuk diftong /eɪ/.',
    ieltsTrapContext:
      'Dalam spelling nama ("Greenhalgh", "Major") penguji sering sengaja mengeja G atau J untuk menguji diskriminasi vokal peserta.',
  },
  {
    id: 'a-vs-e-vs-i',
    title: 'A vs E vs I (Kekacauan Vokal Penutur Non-Native)',
    letters: ['A', 'E', 'I'],
    whyConfusing:
      'Di bahasa Indonesia/Romance: Huruf A berbunyi "ah", E berbunyi "eh", I berbunyi "ee". Namun dalam alfabet Inggris, nama hurufnya bergeser total (The Great Vowel Shift)!',
    acousticClue:
      'A = /eɪ/ ("ay"), E = /iː/ ("ee"), I = /aɪ/ ("eye"). Ingat: Huruf E Inggris berbunyi seperti huruf I Indonesia!',
    articulatoryDifference:
      'A meluncur dari mid-front ke close; E berada di posisi paling tinggi dan depan; I membuka mulut paling lebar di awal lalu menutup.',
    ieltsTrapContext:
      'Pengejaan nama jalan ("Pine" vs "Pane", "Lee" vs "Lay") atau kode pos sering kali menguji diskriminasi ketiga vokal dasar ini.',
  },
  {
    id: 'b-vs-p-vs-v',
    title: 'B vs P vs V (Bibial vs Labiodental)',
    letters: ['B', 'P', 'V'],
    whyConfusing:
      'B dan P sama-sama bilabial (kedua bibir). V sering diucapkan seperti B atau F oleh penutur Asia Tenggara.',
    acousticClue:
      'B = Bergetar berat (voiced /biː/). P = Hembusan udara tajam tanpa getaran (/piː/). V = Mendengung dengan gesekan gigi pada bibir bawah (/viː/).',
    articulatoryDifference:
      'B & P: Kedua bibir bertemu rapat. V: Bibir atas TIDAK boleh menyentuh bibir bawah; hanya gigi atas yang menyentuh bibir bawah.',
    ieltsTrapContext:
      'Petugas konfirmasi booking sering bertanya: "Is that B for Bravo or P for Papa? Or V for Victor?".',
  },
  {
    id: 'm-vs-n',
    title: 'M vs N (Bibir Rapat vs Lidah Naik)',
    letters: ['M', 'N'],
    whyConfusing:
      'Melalui telepon atau speaker audio berkualitas rendah, suara nasal /ɛm/ dan /ɛn/ terdengar nyaris identik jika tidak diperhatikan artikulasinya.',
    acousticClue:
      'M = Nada lebih rendah teredam karena bibir tertutup. N = Nada lebih terang dan nyaring karena rongga mulut terbuka.',
    articulatoryDifference:
      'M: Kedua bibir terkatup rapat di akhir (/ɛm/). N: Kedua bibir tetap terbuka santai; ujung lidah menempel di langit-langit (/ɛn/).',
    ieltsTrapContext:
      'Nama keluarga seperti "Simmons" vs "Simpsons" atau "Dan" vs "Dam" di tiket perjalanan.',
  },
  {
    id: 'c-vs-s',
    title: 'C vs S (Desis Konsonan)',
    letters: ['C', 'S'],
    whyConfusing:
      'Keduanya sama-sama berdesis /s/, namun letak vokalnya berkebalikan: C diakhiri vokal (/siː/), sedangkan S diawali vokal (/ɛs/).',
    acousticClue:
      'C berbunyi "see" (/siː/). S berbunyi "es" (/ɛs/).',
    articulatoryDifference:
      'C dimulai dengan desis langsung masuk ke vokal panjang. S dimulai dengan vokal terbuka santai lalu diikuti desis panjang.',
    ieltsTrapContext:
      'Pengejaan nama tempat seperti "Cecil" vs "Sicily".',
  },
  {
    id: 'd-vs-t',
    title: 'D vs T (Voiced vs Unvoiced Dental)',
    letters: ['D', 'T'],
    whyConfusing:
      'Posisi lidah persis sama di alveolar ridge. Perbedaannya hanya getaran pita suara dan kekuatan hembusan.',
    acousticClue:
      'D = Pita suara bergetar sejak awal (/diː/). T = Tanpa getaran pita suara, diikuti semburan udara kuat (/tiː/).',
    articulatoryDifference:
      'Sentuh tenggorokan saat mengucap D: terasa dengungan. Pada T tidak ada dengungan pita suara di awal pelepasan.',
    ieltsTrapContext:
      'Pengejaan nama: "Davies" vs "Tavish", "Dean" vs "Teen".',
  },
  {
    id: 'u-vs-w',
    title: 'U vs W (Suku Kata Tunggal vs Tiga Suku Kata)',
    letters: ['U', 'W'],
    whyConfusing:
      'Secara etimologi W adalah "double U", sehingga sering membuat ragu dalam dikte cepat.',
    acousticClue:
      'U = 1 suku kata pendek /juː/ ("you"). W = 3 suku kata berirama /ˈdʌb.əl.juː/ ("double-u").',
    articulatoryDifference:
      'U diartikulasikan langsung dengan glide /j/. W membutuhkan pergerakan lidah berulang melafalkan "double" kemudian "u".',
    ieltsTrapContext:
      'Pengejaan website URL atau kode referensi reservasi (contoh: "W-U-7-9").',
  },
];

/**
 * Authentic IELTS Listening Section 1 Spelling Scenarios
 * For training real-world letter recognition under timed audio dictation.
 */
export const SPELLING_EXERCISES: SpellingExercise[] = [
  {
    id: 'spell-01',
    target: 'BRADFORD',
    category: 'Surname',
    context: 'IELTS Listening Sec 1: Hotel Reservation Customer Surname',
    hint: 'Perhatikan perbedaan B (Bravo) dan D (Delta).',
  },
  {
    id: 'spell-02',
    target: 'GREENHALGH',
    category: 'Surname',
    context: 'IELTS Listening Sec 1: Doctor Appointment Booking',
    hint: 'Kombinasi klasik jebakan G, E, dan H.',
  },
  {
    id: 'spell-03',
    target: 'SW1A1AA',
    category: 'Postcode',
    context: 'IELTS Listening Sec 1: London Central Delivery Postcode',
    hint: 'Kombinasi huruf S, W, A dan angka 1.',
  },
  {
    id: 'spell-04',
    target: 'MAJORS',
    category: 'Street Name',
    context: 'IELTS Listening Sec 1: Rental Car Pick-up Street Address',
    hint: 'Bedakan jelas antara M (Mike) dan J (Juliett).',
  },
  {
    id: 'spell-05',
    target: 'KL782J',
    category: 'Flight Code',
    context: 'IELTS Listening Sec 1: International Airport Flight Code',
    hint: 'Perhatikan huruf K, L, dan J.',
  },
  {
    id: 'spell-06',
    target: 'BEAUCHAMP',
    category: 'Surname',
    context: 'IELTS Listening Sec 1: Conference Registration Name',
    hint: 'Pengejaan nama Prancis-Inggris: B-E-A-U-C-H-A-M-P.',
  },
  {
    id: 'spell-07',
    target: 'OX49DA',
    category: 'Postcode',
    context: 'IELTS Listening Sec 1: Oxford Rural Delivery Address',
    hint: 'Dengar baik-baik O, X, dan D.',
  },
  {
    id: 'spell-08',
    target: 'GAYLE',
    category: 'Surname',
    context: 'IELTS Listening Sec 1: Library Membership Registration',
    hint: 'Jebakan G (/dʒiː/) diikuti A (/eɪ/) dan Y (/waɪ/).',
  },
];

/**
 * Get letter metadata by character (case-insensitive)
 */
export function getAlphabetLetter(char: string): AlphabetLetter | undefined {
  const upper = char.toUpperCase();
  return ALPHABET_LETTERS.find((l) => l.char === upper);
}
