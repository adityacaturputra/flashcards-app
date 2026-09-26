import {
  TeenTyPair,
  PhoneNumberRule,
  NumericDictationItem,
  NUMERIC_DICTATION_CATEGORY,
  PHONE_RULE_BADGE,
} from '@/types/numeric';

/**
 * Pairs of -teen vs -ty numbers with syllable stress, IPA, and acoustic distinction rules.
 */
export const TEEN_TY_PAIRS: TeenTyPair[] = [
  {
    id: '13-30',
    teenNum: 13,
    teenWord: 'Thirteen',
    teenIpa: '/θɜːˈtiːn/',
    teenStress: 'Tekanan kuat pada suku kata ke-2: -TEEN (panjang & berdengung)',
    tyNum: 30,
    tyWord: 'Thirty',
    tyIpa: '/ˈθɜːti/',
    tyStress: 'Tekanan kuat pada suku kata ke-1: THIR- (singkat & tajam)',
    acousticTrap:
      'IELTS sering mengaburkan akhiran /n/ di tengah kalimat. Dengarkan durasi vokal: 13 bervokal panjang /iːn/, sedangkan 30 bervokal pendek /i/.',
  },
  {
    id: '14-40',
    teenNum: 14,
    teenWord: 'Fourteen',
    teenIpa: '/fɔːˈtiːn/',
    teenStress: 'Tekanan di akhir: four-TEEN (vokal /iː/ memanjang)',
    tyNum: 40,
    tyWord: 'Forty',
    tyIpa: '/ˈfɔːti/',
    tyStress: 'Tekanan di awal: FOR-ty (akhiran -ty diucapkan tumpul & cepat)',
    acousticTrap:
      'Dalam aksen Amerika/Australia, bunyi "t" pada 40 melemah menjadi flap /ɾ/ ("fordy"), sedangkan pada 14 bunyi "t" tetap tajam (/ˈtiːn/).',
  },
  {
    id: '15-50',
    teenNum: 15,
    teenWord: 'Fifteen',
    teenIpa: '/fɪfˈtiːn/',
    teenStress: 'Tekanan di akhir: fif-TEEN (panjang & bertekanan)',
    tyNum: 50,
    tyWord: 'Fifty',
    tyIpa: '/ˈfɪfti/',
    tyStress: 'Tekanan di awal: FIF-ty (tekanan jatuh di depan)',
    acousticTrap:
      'Pasangan jebakan paling sering muncul dalam harga (£15 vs £50) atau waktu penerbangan. Perhatikan lonjakan intonasi penutur.',
  },
  {
    id: '16-60',
    teenNum: 16,
    teenWord: 'Sixteen',
    teenIpa: '/sɪksˈtiːn/',
    teenStress: 'Tekanan di akhir: six-TEEN',
    tyNum: 60,
    tyWord: 'Sixty',
    tyIpa: '/ˈsɪksti/',
    tyStress: 'Tekanan di awal: SIX-ty',
    acousticTrap:
      'Bunyi konsonan kluster /ks/ dapat mengaburkan akhiran. Selalu antisipasi apakah penutur menghembuskan nafas lebih lama di akhir kata.',
  },
  {
    id: '17-70',
    teenNum: 17,
    teenWord: 'Seventeen',
    teenIpa: '/ˌsev.ənˈtiːn/',
    teenStress: 'Tekanan di akhir: seven-TEEN (nada naik di -teen)',
    tyNum: 70,
    tyWord: 'Seventy',
    tyIpa: '/ˈsev.ən.ti/',
    tyStress: 'Tekanan di awal: SEV-en-ty (nada menurun)',
    acousticTrap:
      'Suku kata ke-3 pada 17 berbunyi penuh. Pada 70, suku kata ke-2 dan 3 meluncur cepat dengan intonasi menurun.',
  },
  {
    id: '18-80',
    teenNum: 18,
    teenWord: 'Eighteen',
    teenIpa: '/ˌeɪˈtiːn/',
    teenStress: 'Tekanan di akhir: eigh-TEEN',
    tyNum: 80,
    tyWord: 'Eighty',
    tyIpa: '/ˈeɪ.ti/',
    tyStress: 'Tekanan di awal: EIGH-ty',
    acousticTrap:
      'Pada 80, bunyi /t/ sangat ringan; pada 18, penutur berhenti sejenak sebelum meletupkan /tiːn/.',
  },
  {
    id: '19-90',
    teenNum: 19,
    teenWord: 'Nineteen',
    teenIpa: '/ˌnaɪnˈtiːn/',
    teenStress: 'Tekanan di akhir: nine-TEEN',
    tyNum: 90,
    tyWord: 'Ninety',
    tyIpa: '/ˈnaɪn.ti/',
    tyStress: 'Tekanan di awal: NINE-ty',
    acousticTrap:
      'Akhiran /n/ ganda pada 19 membuat kata terasa jauh lebih panjang dibandingkan 90 yang berhenti mendadak.',
  },
];

/**
 * Rules and conventions for British/IELTS telephone numbers and alphanumeric codes.
 */
export const PHONE_NUMBER_RULES: PhoneNumberRule[] = [
  {
    id: 'zero-as-oh',
    title: 'Angka Nol (0) Diucapkan "Oh" (/oʊ/)',
    ruleBadge: PHONE_RULE_BADGE.CRUCIAL,
    description:
      'Dalam percakapan telepon Inggris, angka nol hampir selalu diucapkan sebagai nama huruf "oh" (/oʊ/), bukan "zero". Kata "zero" umumnya hanya dipakai untuk suhu, matematika, atau desimal.',
    spokenExample: '"My number is oh-seven-nine, double-one..."',
    writtenTarget: '07911...',
    note: 'Bila mendengar bunyi /oʊ/ di deretan angka, langsung tulis digit 0, bukan huruf O.',
  },
  {
    id: 'double-triple',
    title: 'Double & Triple Numbers',
    ruleBadge: PHONE_RULE_BADGE.FAST_PATTERN,
    description:
      'Penutur asli tidak mengulang angka satu per satu jika bersebelahan, melainkan menggunakan pengali "double" atau "triple".',
    spokenExample: '"Double seven" = 77 | "Triple nine" = 999 | "Double-oh" = 00',
    writtenTarget: '77 | 999 | 00',
    note: 'Jangan tulis kata "double"; langsung tuliskan dua atau tiga digit kembar tersebut di kertas ujian.',
  },
  {
    id: 'chunking-pause',
    title: 'Pembagian Blok Jeda (Chunking 3–4 Digit)',
    ruleBadge: PHONE_RULE_BADGE.RHYTHM,
    description:
      'Penutur asli membagi nomor telepon dalam gugus 3–4 digit dengan jeda mikro (contoh: 020 [jeda] 7946 [jeda] 0999).',
    spokenExample: '"It\'s oh-two-oh ... seven-nine-four-six ... oh-triple-nine"',
    writtenTarget: '020 7946 0999',
    note: 'Tahan pensil saat jeda; jangan menyimpulkan akhir nomor sebelum penutur menurunkan nada kalimatnya.',
  },
];

/**
 * Interactive dictation exercises tailored for IELTS Section 1
 */
export const NUMERIC_DICTATION_EXERCISES: NumericDictationItem[] = [
  {
    id: 'num-1',
    category: NUMERIC_DICTATION_CATEGORY.TELEPHONE,
    context: 'Customer Service Helpline Number',
    spokenScript: 'oh eight hundred, double four five, double seven two',
    targetDisplay: '0800 445 772',
    hint: 'Perhatikan "oh" = 0, "double four" = 44, "double seven" = 77.',
  },
  {
    id: 'num-2',
    category: NUMERIC_DICTATION_CATEGORY.TELEPHONE,
    context: 'Direct Mobile Contact',
    spokenScript: 'oh seven nine, double one, one two three, four five six',
    targetDisplay: '07911 123 456',
    hint: 'Gugus 5 digit pertama khas nomor seluler Inggris.',
  },
  {
    id: 'num-3',
    category: NUMERIC_DICTATION_CATEGORY.TELEPHONE,
    context: 'Emergency Dispatch Hotline',
    spokenScript: 'oh two oh, seven nine four six, oh triple nine',
    targetDisplay: '020 7946 0999',
    hint: '"triple nine" berarti angka 9 diulang 3 kali (999).',
  },
  {
    id: 'num-4',
    category: NUMERIC_DICTATION_CATEGORY.POSTCODE,
    context: 'London Central Delivery Postcode',
    spokenScript: 'S. W. one. A. ... one. A. A.',
    targetDisplay: 'SW1A 1AA',
    hint: 'Format kode pos UK: 2-4 karakter area, spasi, 3 karakter jalan.',
  },
  {
    id: 'num-5',
    category: NUMERIC_DICTATION_CATEGORY.REFERENCE_NO,
    context: 'Flight Booking Confirmation Reference',
    spokenScript: 'B. R. fifty, double eight, T.',
    targetDisplay: 'BR5088T',
    hint: 'Bedakan "fifty" (50) dengan "fifteen" (15).',
  },
];
