import {
  RebuttalQuestionItem,
  REBUTTAL_CATEGORY,
} from '@/types/rebuttal';

export const REBUTTAL_PRACTICE_ITEMS: RebuttalQuestionItem[] = [
  {
    id: 'c14-t1-q1',
    cambridgeSource: 'Cambridge IELTS 14 • Test 1 Section 1',
    category: REBUTTAL_CATEGORY.DIRECT_CORRECTION,
    title: "Louise's Nationality",
    questionPrompt: "What is the caller's (Louise's) nationality?",
    formFieldLabel: 'Nationality:',
    audioUrl: '/audio/rebuttal-signposts/c14_t1_q1_canadian.mp3',
    distractorValue: 'British',
    targetAnswer: 'Canadian',
    signpostWords: ['actually', 'though'],
    options: ['Canadian', 'British', 'American', 'Australian'],
    fieldPencilNote: '~British~ ➔ Canadian',
    explanationMarkdown: `**Anatomi Jebakan Koreksi Langsung:**
Petugas menanyakan status tempat tinggal di Inggris. Louise langsung membatalkan asumsi dengan penanda **"actually"**: *"No, I'm actually Canadian. Though my mother was British."*

Kandidat tergesa-gesa mendengar *"British"* (kewarganegaraan ibunya) lalu menulisnya. Padahal formulir meminta kewarganegaraan Louise sendiri.
- ❌ **Distraktor**: \`British\` (Ibu Louise)
- ⚡ **Penanda Sanggahan**: \`actually\` (Membatalkan informasi seketika)
- ✅ **Jawaban Sah**: \`Canadian\``,
    transcript: [
      { speaker: 'Officer', text: 'And are you resident in the UK?' },
      {
        speaker: 'Louise',
        text: "No, I'm actually Canadian. Though my mother was British.",
        isSignpost: true,
        isAnswer: true,
        isDistractor: true,
      },
      { speaker: 'Officer', text: "And your mother's British, ok." },
    ],
  },
  {
    id: 'c7-t1-q1',
    cambridgeSource: 'Cambridge IELTS 7 • Test 1 Section 1',
    category: REBUTTAL_CATEGORY.DIRECT_CORRECTION,
    title: 'Distance to Milton',
    questionPrompt: 'What is the exact distance from Toronto Airport to Milton?',
    formFieldLabel: 'Distance:',
    audioUrl: '/audio/rebuttal-signposts/c7_t1_q1_milton_miles.mp3',
    distractorValue: '150',
    targetAnswer: '147',
    signpostWords: ['in fact', 'to be exact'],
    options: ['147', '150', '135', '160'],
    fieldPencilNote: '~150 miles~ ➔ 147 miles',
    explanationMarkdown: `**Anatomi Jebakan Angka Perkiraan vs Fakta:**
Petugas bandara awalnya memberikan perkiraan kasar: *"I think that's about 150 miles southwest of here."*
Lalu petugas langsung meralatnya secara presisi dengan penanda **"In fact... to be exact"**: *"In fact, it's 147 miles to be exact."*

- ❌ **Distraktor**: \`150\` (Angka perkiraan / tebakan awal)
- ⚡ **Penanda Sanggahan**: \`In fact\` & \`to be exact\` (Peralatan fakta presisi)
- ✅ **Jawaban Sah**: \`147\``,
    transcript: [
      { speaker: 'Passenger', text: 'Could you tell me how I can get there?' },
      {
        speaker: 'Official',
        text: "Milton did you say? Let me see. I think that's about 150 miles southwest of here. In fact, it's 147 miles to be exact.",
        isDistractor: true,
        isSignpost: true,
        isAnswer: true,
      },
      { speaker: 'Official', text: "So it'll take you at least say three to four hours by road." },
    ],
  },
  {
    id: 'c14-t2-q1',
    cambridgeSource: 'Cambridge IELTS 14 • Test 2 Section 1',
    category: REBUTTAL_CATEGORY.APOLOGY_RETRACTION,
    title: "Julie's Year / Date of Birth",
    questionPrompt: "What is Julie's correct date of birth?",
    formFieldLabel: 'Date of Birth:',
    audioUrl: '/audio/rebuttal-signposts/c14_t2_q1_dob.mp3',
    distractorValue: '1991',
    targetAnswer: '10th October 1992',
    signpostWords: ['actually', 'correct that now'],
    options: [
      '10th October 1992',
      '10th October 1991',
      '19th October 1992',
      '10th August 1991',
    ],
    fieldPencilNote: '~1991~ ➔ 10th October 1992',
    explanationMarkdown: `**Anatomi Jebakan Ralat Data Dokumen:**
Dokter memeriksa data pasien di layar/kartu rekam medis lama. Pasien menyatakan: *"October 10th 1992."*
Dokter menyadari data rekam medisnya keliru: *"Oh, I actually have 1991. I'll just correct that now."*

- ❌ **Distraktor**: \`1991\` (Data salah pada dokumen klinik)
- ⚡ **Penanda Sanggahan**: \`actually / I'll just correct that now\` (Ralat pengakuan kesalahan)
- ✅ **Jawaban Sah**: \`10th October 1992\` (Tahun: \`1992\`)`,
    transcript: [
      {
        speaker: 'Doctor',
        text: 'And then can I just check that we have the correct date of birth?',
      },
      { speaker: 'Julie', text: 'October 10th 1992.', isAnswer: true },
      {
        speaker: 'Doctor',
        text: "Oh, I actually have 1991. I'll just correct that now. Right, so that's all good.",
        isSignpost: true,
        isDistractor: true,
      },
    ],
  },
  {
    id: 'c14-t2-q2',
    cambridgeSource: 'Cambridge IELTS 14 • Test 2 Section 1',
    category: REBUTTAL_CATEGORY.TIME_CHANGE,
    title: "Julie's Current Occupation",
    questionPrompt: "What is Julie's current occupation?",
    formFieldLabel: 'Current Occupation:',
    audioUrl: '/audio/rebuttal-signposts/c14_t2_q2_occupation.mp3',
    distractorValue: 'Waitress',
    targetAnswer: 'Manager',
    signpostWords: ['started off as', 'now'],
    options: ['Manager', 'Waitress', 'Chef', 'Receptionist'],
    fieldPencilNote: '~Waitress~ ➔ Manager',
    explanationMarkdown: `**Anatomi Jebakan Masa Lalu vs Sekarang (Past vs Present):**
Soal formulir menanyakan pekerjaan saat ini (*Current Occupation*).
Julie menyebutkan posisi terdahulu ketika pertama bergabung: *"I started off as a waitress there a few years ago..."* lalu menyatakan posisi terkininya: *"...and I'm a manager now."*

- ❌ **Distraktor**: \`Waitress\` (Pekerjaan masa lalu beberapa tahun lalu)
- ⚡ **Penanda Sanggahan**: \`started off as... a few years ago and I'm a... now\`
- ✅ **Jawaban Sah**: \`Manager\``,
    transcript: [
      {
        speaker: 'Doctor',
        text: 'Do you have an occupation? Either full-time or part-time?',
      },
      {
        speaker: 'Julie',
        text: "Yes, I work full-time in Esterhazies... I started off as a waitress there a few years ago and I'm a manager now.",
        isDistractor: true,
        isSignpost: true,
        isAnswer: true,
      },
      {
        speaker: 'Doctor',
        text: "I know them. Yeah, they're down on 114th Street, aren't they?",
      },
    ],
  },
  {
    id: 'c16-t1-q9',
    cambridgeSource: 'Cambridge IELTS 16 • Test 1 Section 1',
    category: REBUTTAL_CATEGORY.TIME_CHANGE,
    title: 'Junior Engineers Workshop Day',
    questionPrompt: 'On which day of the week are the Junior Engineers workshops held?',
    formFieldLabel: 'Workshop Day:',
    audioUrl: '/audio/rebuttal-signposts/c16_t1_q9_day_wednesday.mp3',
    distractorValue: 'Monday',
    targetAnswer: 'Wednesday',
    signpostWords: ['used to be', 'moved them to'],
    options: ['Wednesday', 'Monday', 'Saturday', 'Friday'],
    fieldPencilNote: '~Monday~ ➔ Wednesday',
    explanationMarkdown: `**Anatomi Jebakan Perubahan Jadwal (Used to be vs Moved to):**
Ibu menanyakan apakah kelas diadakan hari Senin seperti kelompok balita: *"And are the classes on a Monday too?"*
Petugas menjawab bahwa dulu memang hari Senin: *"They used to be, but we found it didn't give our staff enough time to clear up... So we moved them to Wednesdays."*

- ❌ **Distraktor**: \`Monday\` (Jadwal lama yang sudah dipindah)
- ⚡ **Penanda Sanggahan**: \`used to be... but... moved them to\` (Perubahan waktu lampau)
- ✅ **Jawaban Sah**: \`Wednesday\` (atau \`Wednesdays\`)`,
    transcript: [
      { speaker: 'Mother', text: 'And are the classes on a Monday too?' },
      {
        speaker: 'Officer',
        text: "They used to be, but we found it didn't give our staff enough time to clear up after the first workshop. So, we moved them to Wednesdays.",
        isDistractor: true,
        isSignpost: true,
        isAnswer: true,
      },
      { speaker: 'Mother', text: "Okay, that's better for me, actually." },
    ],
  },
  {
    id: 'c13-t1-q8',
    cambridgeSource: 'Cambridge IELTS 13 • Test 1 Section 1',
    category: REBUTTAL_CATEGORY.EXCEPTION_CONTRAST,
    title: 'Arisaig Centre Specialisation',
    questionPrompt: 'What type of food does the Arisaig Centre mostly specialise in?',
    formFieldLabel: 'Specialises in:',
    audioUrl: '/audio/rebuttal-signposts/c13_t1_q8_vegetarian.mp3',
    distractorValue: 'Meat and fish',
    targetAnswer: 'Vegetarian',
    signpostWords: ['a bit of', 'but they mostly specialize in'],
    options: ['Vegetarian', 'Meat and fish', 'Italian', 'Diet food'],
    fieldPencilNote: '~Meat and fish~ ➔ Vegetarian',
    explanationMarkdown: `**Anatomi Jebakan Pengecualian & Cakupan (Exception & Contrast):**
Petugas informasi wisata menjelaskan jenis masakan di Arisaig Centre: *"They do a bit of meat and fish cookery, but they mostly specialize in vegetarian dishes."*
Kata *"mostly"* pada lembar soal mengunci fokus utama sekolah masak tersebut, sedangkan *meat and fish* hanyalah porsi kecil (*a bit of*).

- ❌ **Distraktor**: \`Meat and fish\` (Hanya porsi kecil / minoritas)
- ⚡ **Penanda Sanggahan**: \`do a bit of... but they mostly specialize in\` (Kontras proporsi)
- ✅ **Jawaban Sah**: \`Vegetarian\``,
    transcript: [
      {
        speaker: 'Officer',
        text: 'They do a bit of meat and fish cookery, but they mostly specialize in vegetarian dishes.',
        isDistractor: true,
        isSignpost: true,
        isAnswer: true,
      },
      {
        speaker: 'Caller',
        text: "Right, that's certainly an area I'd like to learn more about.",
      },
    ],
  },
  {
    id: 'c14-t1-q4',
    cambridgeSource: 'Cambridge IELTS 14 • Test 1 Section 1',
    category: REBUTTAL_CATEGORY.EXCEPTION_CONTRAST,
    title: 'Cash Amount Stolen',
    questionPrompt: 'How much cash was inside the stolen wallet?',
    formFieldLabel: 'Cash in wallet:',
    audioUrl: '/audio/rebuttal-signposts/c14_t1_q4_cash.mp3',
    distractorValue: '300',
    targetAnswer: '250',
    signpostWords: ['withdrew', 'but spent'],
    options: ['250', '300', '50', '350'],
    fieldPencilNote: '~£300~ ➔ £250',
    explanationMarkdown: `**Anatomi Jebakan Perhitungan Uang & Pengeluaran:**
Louise melaporkan kehilangan uang: *"About 250 pounds sterling... I withdrew 300 pounds from my account, but spent about 50."*
Penguji menjebak pendengar yang mencatat nominal penarikan ATM (£300) tanpa memperhatikan klausul pembatas pengeluaran *"but spent about 50"*.

- ❌ **Distraktor**: \`300\` (Nominal awal yang ditarik dari ATM)
- ⚡ **Penanda Sanggahan**: \`withdrew... but spent about 50\` (Pengurangan saldo riil)
- ✅ **Jawaban Sah**: \`250\` (atau \`£250\`)`,
    transcript: [
      {
        speaker: 'Louise',
        text: 'About 250 pounds sterling... I withdrew 300 pounds from my account, but spent about 50.',
        isAnswer: true,
        isDistractor: true,
        isSignpost: true,
      },
    ],
  },
  {
    id: 'c15-t1-q5',
    cambridgeSource: 'Cambridge IELTS 15 • Test 1 Section 1',
    category: REBUTTAL_CATEGORY.EXCEPTION_CONTRAST,
    title: 'Recruitment Agency Main Sector',
    questionPrompt: 'For which industry sector does Becky mostly recruit temporary staff?',
    formFieldLabel: 'Recruits for:',
    audioUrl: '/audio/rebuttal-signposts/c15_t1_q5_finance.mp3',
    distractorValue: 'Media',
    targetAnswer: 'Finance',
    signpostWords: ['hoping to find... but mostly recruits... for'],
    options: ['Finance', 'Media', 'Clerical', 'Hospitality'],
    fieldPencilNote: '~Media~ ➔ Finance',
    explanationMarkdown: `**Anatomi Jebakan Keinginan Personal vs Fakta Lapangan:**
Amber menanyakan lowongan kerja. William mengingatkan: *"I know you're hoping to find a full-time job in the media eventually, but Becky mostly recruits temporary staff for the finance sector..."*
Penguji memasukkan minat pribadi kandidat (\`media\`) sebagai distraktor sebelum menyebutkan sektor riil agensi (\`finance\`).

- ❌ **Distraktor**: \`Media\` (Harapan karir pribadi Amber)
- ⚡ **Penanda Sanggahan**: \`hoping to... eventually, but Becky mostly recruits... for\`
- ✅ **Jawaban Sah**: \`Finance\``,
    transcript: [
      {
        speaker: 'Amber',
        text: "It's mainly clerical and admin jobs they deal with, isn't it?",
      },
      {
        speaker: 'William',
        text: "That's right. I know you're hoping to find a full-time job in the media eventually, but Becky mostly recruits temporary staff for the finance sector...",
        isDistractor: true,
        isSignpost: true,
        isAnswer: true,
      },
    ],
  },
];
