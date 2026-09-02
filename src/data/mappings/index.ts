// src/data/mappings/index.ts
import { MappingItem } from '@/types/mapping';

/**
 * ============================================================================
 * ENGLISH JOURNEY - STUDY MAPPING REPOSITORY DATA
 * ============================================================================
 * This file acts as the repository data source for mapping flashcards.
 * Antigravity (Agent) can directly read and update this array whenever new
 * questions, error analyses, or grammar rules are added.
 */

export const MAPPING_ITEMS: MappingItem[] = [
  {
    id: 'gerund-look-forward-to',
    module: 'Gerunds',
    title: 'look forward to + V-ing (Gerund & Preposition Patterns)',
    question: 'We always look forward to relax on the weekend.',
    correction: 'to relax -> to relaxing',
    remarks: `Kunci utama pada soal ini terletak pada kata **"to"** di dalam frasa **"look forward to"**.

---

### 1. Aturan Dasar: "look forward to + V-ing (Gerund)"

Banyak orang mengira kata "to" di sini adalah bagian dari *infinitive* (\`to + V1\`), padahal **"to"** pada frasa *look forward to* berfungsi sebagai **kata depan (*preposition*)**.

Dalam tata bahasa Inggris, setiap kata kerja yang terletak tepat setelah kata depan (*preposition*) **wajib berbentuk Gerund (V-ing)** atau kata benda (*noun*):

$$\\text{Subject} + \\text{look forward to} + \\mathbf{V\\text{-}ing} \\ / \\ \\mathbf{Noun}$$

- **Contoh kata benda:** *"I look forward to **the weekend**."*
- **Contoh kata kerja:** *"I look forward to **relaxing**."* / *"I look forward to **seeing** you."*

---

### 2. Kenapa Pilihan Merah Salah?

- **Pilihan merah:** *"We are always looking forward **to relax**..."*

1. **Kesalahan Bentuk Kata Kerja:** Menggunakan \`relax\` (V1) bukannya **\`relaxing\`** (V-ing setelah preposition *to*).
2. **Kesalahan Tense & Nuansa:** Meskipun bentuk *continuous* (*are looking forward*) terkadang digunakan dalam percakapan informal, untuk menyatakan kebiasaan rutin berulang dengan kata **"always"**, bentuk *Simple Present* (***"We always look forward..."***) jauh lebih baku, gramatikal, dan alami.

Oleh karena itu, kalimat yang benar adalah:

> ***"We always look forward to relaxing on the weekend."***

---

### 3. Frasa Khusus dengan Kata Depan "to" yang Wajib Diikuti Gerund (V-ing)

Banyak pembelajar terkecoh karena mengira semua *"to"* selalu diikuti kata kerja dasar (V1). Berikut adalah daftar frasa umum di mana **"to" berfungsi sebagai Preposisi** sehingga **harus diikuti Gerund (V-ing)**:

| Frasa / Idiom | Arti / Makna | Contoh Kalimat Benar |
| :--- | :--- | :--- |
| **look forward to** | menantikan / tak sabar | *We look forward to **working** with you.* |
| **be / get used to** | sudah terbiasa dengan | *She is used to **waking** up early.* |
| **object to** | keberatan terhadap | *They objected to **raising** the service fee.* |
| **be committed to** | berkomitmen untuk | *The team is committed to **delivering** quality results.* |
| **be dedicated to** | berdedikasi untuk | *He is dedicated to **improving** public education.* |
| **in addition to** | selain / di samping | *In addition to **managing** the project, she also codes.* |
| **admit to / confess to** | mengakui melakukan | *He admitted to **making** a critical mistake.* |
| **with a view to** | demi / bertujuan untuk | *He studied hard with a view to **getting** a scholarship.* |
| **prefer [A] to [B]** | lebih memilih A daripada B | *I prefer **swimming** to **running** in the morning.* |

> [!TIP]
> **Trik Pengujian:** Jika kata setelah *"to"* bisa diganti dengan kata ganti **"it"** atau **"something"** (*misalnya: "I look forward to **it**"*, *"I am used to **it**"*), maka *"to"* tersebut adalah **preposisi**, dan kata kerjanya **wajib berakhiran -ing**!

---

### 4. Variasi Lengkap Pola Preposisi Lainnya + Gerund (Preposition + V-ing)

Rumus universal dalam bahasa Inggris menyatakan bahwa **SEMUA preposisi** jika diikuti kata kerja, kata kerja tersebut **wajib berwujud Gerund (V-ing)**:

$$\\mathbf{\\text{Preposition (in, on, at, for, of, about, without, by, after, before)}} + \\mathbf{V\\text{-}ing}$$

#### A. Kombinasi Adjective + Preposition:
- **interested in + V-ing:** *She is interested in **learning** machine learning.*
- **good at / bad at + V-ing:** *He is very good at **solving** complex algorithmic problems.*
- **afraid of / scared of + V-ing:** *They were afraid of **losing** the deal.*
- **tired of / bored with + V-ing:** *I am tired of **waiting** in long queues.*
- **proud of + V-ing:** *She is proud of **completing** the marathon.*
- **famous for + V-ing:** *The restaurant is famous for **serving** authentic dishes.*

#### B. Kombinasi Verb + Preposition:
- **insist on + V-ing:** *He insisted on **paying** for everyone's dinner.*
- **succeed in + V-ing:** *We succeeded in **deploying** the new release smoothly.*
- **apologize for + V-ing:** *He apologized for **being** late to the sprint meeting.*
- **prevent / stop from + V-ing:** *Nothing will prevent us from **achieving** our goals.*
- **think of / think about + V-ing:** *I am thinking of **applying** for the senior role.*
- **thank for + V-ing:** *Thank you for **explaining** the architecture so clearly.*

#### C. Preposisi Waktu, Cara, & Kondisi (*Time, Manner & Condition*):
- **before + V-ing:** *Always review your code before **submitting** the pull request.*
- **after + V-ing:** *After **finishing** the class, he practiced the flashcards.*
- **without + V-ing:** *He left the meeting without **asking** any questions.*
- **by + V-ing:** *You can improve your English fluency by **practicing** every day.*
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['gerund', 'preposition', 'verbs', 'englishvit', 'grammar-rules'],
  },
  {
    id: 'expression-thank-god',
    module: 'Expressions & Idioms',
    title: 'Thank God vs. Thanks God / Thank\'s God',
    question: '“Thanks God I don’t have to work tomorrow.” (What is the correct version of the sentence?)',
    correction: '“Thanks God...” -> “Thank God I don’t have to work tomorrow.”',
    remarks: `Ungkapan yang benar dan baku dalam bahasa Inggris standar adalah **"Thank God"** (tanpa akhiran *-s* dan tanpa tanda petik/apostrof *'s*).

---

### 1. Struktur Asli Kalimat: Subjek Tersirat *(Ellipsis)*

Frasa **"Thank God"** sebenarnya merupakan pemendekan dari kalimat ungkapan rasa syukur atau doa:

$$\\mathbf{(I) \\ \\text{thank God}} \\quad \\text{atau} \\quad \\mathbf{(Let us) \\ \\text{thank God}}$$

- Karena subjek tersiratnya adalah kata ganti orang pertama tunggal (**"I"** / *Saya*), maka kata kerja yang menyertainya adalah kata kerja bentuk pertama tanpa akhiran *-s*, yaitu **\`thank\`** (*bukan thanks*).
- Pola: *"(I) thank God [that] I don't have to work tomorrow."*

---

### 2. Kenapa Pilihan-Pilihan Lainnya Salah?

| Pilihan | Status | Alasan Kesalahan |
| :--- | :--- | :--- |
| **Thank's God** | ❌ Salah | Tanda apostrof (\`'s\`) menandakan kepemilikan (*possessive*) atau singkatan (*is/has*), yang sama sekali tidak gramatikal di posisi ini. |
| **Thanks God** | ❌ Salah | Tanpa preposisi *to* atau tanda koma, *"Thanks God"* terdengar seperti Anda sedang memanggil/menyapa Tuhan secara langsung (*Direct Address*: *"Thanks, God!"*), bukan sebagai ungkapan rasa lega di awal kalimat. |
| **Thanks Gods / Thank's Gods** | ❌ Salah | Kata *God* tidak berbentuk jamak (*plural -s*) dalam ungkapan monoteistis standar ini. |
| **Thank God** | ✅ **BENAR** | Bentuk baku idiom/interjection yang tepat untuk menyatakan rasa lega/syukur. |

---

### 3. Perbandingan Pola Ungkapan Bersyukur yang Benar

Dalam bahasa Inggris, terdapat beberapa variasi ungkapan terima kasih / syukur yang gramatikal:

1. **Thank God + [Clause]** *(Menyebut langsung objeknya)*:
   - *“**Thank God** we arrived safely before the storm.”*
   - *“**Thank God** I passed the technical interview.”*

2. **Thanks to + [Noun / Someone]** *(Jika ingin menggunakan akhiran -s, WAJIB menggunakan preposisi "to")*:
   - *“We give **thanks to God** for all our blessings.”*
   - *“**Thanks to** your dedication, the project was delivered on time.”* (Artinya: *Berkat bantuanmu...*)

3. **Thank you / Thanks + [for Noun / V-ing]** *(Menyatakan terima kasih kepada lawan bicara)*:
   - *“**Thank you** for reviewing my code.”*
   - *“**Thanks for helping** me yesterday.”*

---

### 4. Ekspresi Serupa dengan Pola Subjunctive / Doa

Ada beberapa idiom dan ungkapan dalam bahasa Inggris yang mempertahankan bentuk kata kerja dasar (*bare infinitive / subjunctive*) tanpa akhiran *-s*:

- **God bless you** *(Bukan "God blesses you", karena berasal dari doa: "May God bless you")*
- **God forbid** *(Bukan "God forbids")*
- **Heaven forbid** *(Bukan "Heaven forbids")*
- **Thank goodness** / **Thank heavens** *(Sinonim informal dari Thank God)*

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **Thank God** → Tanpa huruf **-s**, tanpa tanda petik **'s**.
> - Jika ingin memakai **Thanks**, **WAJIB** disambung dengan **"to"**: → **Thanks to God** / **Thanks to [Noun]**!
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Common Expressions & Verb Forms',
    createdAt: '2026-09-02',
    tags: ['expressions', 'idioms', 'thank-god', 'grammar-rules', 'common-mistakes', 'englishvit'],
  },
  {
    id: 'numeral-million-residents',
    module: 'Nouns & Quantifiers',
    title: '21 million residents vs. 21 millions resident (Numeral Quantifiers)',
    question: '“There are 21 millions residents in the state of Florida.” (What is the correct version of the above sentence?)',
    correction: '“21 millions resident(s)” -> “21 million residents”',
    remarks: `Jawaban yang benar adalah **"There are 21 million residents in the state of Florida."**

---

### 1. Aturan Dasar: Angka Pasti (*Exact Number*) + Hundred / Thousand / Million / Billion

Dalam tata bahasa Inggris, ketika kata satuan bilangan besar (**hundred, thousand, million, billion, trillion**) didahului oleh **angka pasti (*exact number / definite numeral*, misal: *21, two, five, several*)**, kata satuan tersebut berfungsi sebagai **penentu jumlah (*determiner / numeral adjective*)** dan **TIDAK BOLEH berakhiran \`-s\`**:

$$\\mathbf{\\text{Exact Number (21, two, five)}} + \\mathbf{\\text{million (tanpa -s)}} + \\mathbf{\\text{Plural Noun (residents)}}$$

- ✅ **Benar:** *“21 **million** residents”*
- ❌ **Salah:** *“21 **millions** residents”*

---

### 2. Bagaimana Jika TIDAK ADA Kata Benda (*Tanpa Residents / Noun*)? → **Tetap TANPA \`-s\`!**

Meskipun kata bendanya tidak disebutkan secara langsung (karena sudah dipahami konteksnya), kata *million/thousand/hundred* **TETAP WAJIB tanpa akhiran \`-s\`** selama ada angka di depannya:

- ✅ *“The population of the city is **21 million**.”* *(Bukan: 21 millions)*
- ✅ *“How much does the house cost? It costs **five million**.”* *(Bukan: five millions)*
- ✅ *“They were hoping for \$10,000, but only got **two thousand**.”* *(Bukan: two thousands)*
- ✅ *“The startup's valuation is now **1 billion**.”* *(Bukan: 1 billions)*

---

### 3. Contoh dengan Berbagai Variasi Kata Benda Lainnya (*Other Nouns*)

Jika diikuti kata benda lain, kata *million*-nya tetap **tanpa \`-s\`**, sedangkan kata bendanya yang **wajib jamak (*plural noun*)**:

- ✅ *“The video reached **50 million views**.”* *(Bukan: 50 millions views)*
- ✅ *“He invested **10 million dollars** in cryptocurrency.”* *(Bukan: 10 millions dollars)*
- ✅ *“The application has over **100 million active users**.”* *(Bukan: 100 millions users)*
- ✅ *“There are approximately **3 million vehicles** in the city.”* *(Bukan: 3 millions vehicles)*

---

### 4. Kenapa Pilihan Merah (*“21 millions resident”*) Salah?

Pilihan tersebut memiliki **2 kesalahan fatal sekaligus**:
1. **Kata *million* kelebihan \`-s\`:** Karena ada angka pasti (*21*), maka tidak boleh menjadi *millions*.
2. **Kata *resident* kekurangan \`-s\`:** Karena jumlahnya 21 juta orang (banyak/jamak), maka kata bendanya **wajib berbentuk jamak (*plural noun*)**, yaitu **\`residents\`** (bukan *resident*).

---

### 5. Kapan Kata "Millions" Boleh Memakai Akhiran \`-s\`?

Kata satuan bilangan **HANYA** memakai akhiran \`-s\` jika:
1. **TIDAK ADA angka pasti di depannya**
2. **Diikuti oleh kata depan (*preposition*) \`of\`**

Pola ini digunakan untuk menyatakan jumlah perkiraan yang sangat banyak / tak terhitung (*indefinite large quantity* yang artinya *"jutaan..."*):

$$\\mathbf{\\text{Millions of}} + \\mathbf{\\text{Plural Noun}}$$

- ✅ *“**Millions of people** visit Florida every year.”* (Jutaan orang mengunjungi Florida...)
- ✅ *“The government spent **billions of dollars** on healthcare.”*
- ✅ *“**Thousands of birds** migrate south for the winter.”*

---

### 6. Bentuk Kata Sifat Majemuk (*Hyphenated Adjective*) → **Semua TANPA \`-s\`**

Ketika angka dan kata satuan bilangan digabungkan dengan tanda hubung (*hyphen*) untuk menjadi kata sifat di depan kata benda:

- ✅ *“a **21-million-dollar** contract”* *(Bukan: 21-millions-dollars)*
- ✅ *“a **three-million-user** milestone”* *(Bukan: three-millions-users)*

---

### 7. Tabel Perbandingan Lengkap

| Pola Bilangan | Status | Contoh Kalimat Benar |
| :--- | :--- | :--- |
| **Ada Angka + Noun** | ✅ **BENAR** | *There are **21 million residents** in Florida.* |
| **Ada Angka (Tanpa Noun)** | ✅ **BENAR** | *The total population is **21 million**.* |
| **Tanpa Angka (Pola of)** | ✅ **BENAR** | *There are **millions of residents** in Florida.* |
| **Kata Sifat Majemuk** | ✅ **BENAR** | *It was a **21-million-dollar** project.* |
| **Preposisi Wilayah** | ✅ **BENAR** | *...**in** the state of Florida (bukan at).* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ada **angka di depan** → **million / thousand / hundred** **TIDAK PAKAI -s** (*21 million residents* / *The total is 21 million*).
> - Ada **"of" di belakang** (tanpa angka di depan) → **millions of / thousands of** **WAJIB PAKAI -s** (*millions of residents*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['numbers', 'quantifiers', 'million', 'plural-nouns', 'prepositions', 'englishvit'],
  },
  {
    id: 'subjunctive-recommend-that',
    module: 'Subjunctive & Verb Patterns',
    title: 'recommend that I buy vs. recommend me to buy (Subjunctive Mood)',
    question: '“My friend recommended me to buy this car.” (What is the correct version of the above sentence?)',
    correction: '“recommended me to buy...” -> “recommended that I buy this car”',
    remarks: `Jawaban yang benar adalah **"My friend recommended that I buy this car."**

---

### 1. Aturan Dasar: Mengapa "recommend someone to do something" SALAH?

Banyak orang mengira pola kata kerja dalam bahasa Inggris semuanya sama seperti *tell* atau *advise* (*advise me to do*). Namun, kata kerja **\`recommend\`** dan **\`suggest\`** memiliki aturan khusus dan **TIDAK BISA** diikuti pola **\`Object + to-infinitive\`**:

- ❌ **SALAH:** *“My friend recommended **me to buy** this car.”*
- ❌ **SALAH:** *“He suggested **me to take** a break.”*
- ✅ **BENAR:** *“My friend recommended **that I buy** this car.”*

---

### 2. Tiga (3) Pola Baku Penggunaan "Recommend"

- **Pola 1 (Subjunctive Clause):** $\\mathbf{\\text{recommend} + (\\text{that}) + \\text{Subject} + \\text{Base Verb (V1)}}$
- **Pola 2 (Direct Gerund):** $\\mathbf{\\text{recommend} + \\text{V-ing}}$
- **Pola 3 (Direct Noun + To):** $\\mathbf{\\text{recommend} + \\text{Something} + \\text{to Someone}}$

---

#### Contoh Penerapan Tiap Pola:
1. **Subjunctive Mood (Pola Soal Ini):**
   - ✅ *“My friend recommended that I **buy** this car.”*
   - ✅ *“The doctor recommended that he **eat** healthier food.”* *(Perhatikan: tetap **eat**, bukan **eats**, karena dalam Subjunctive Mood kata kerja selalu dalam bentuk dasar V1).*
2. **Gerund (V-ing):**
   - ✅ *“My friend recommended **buying** this car.”*
3. **Noun + to Someone:**
   - ✅ *“My friend recommended this car **to me**.”*

---

### 3. Analisis Kenapa Pilihan Lain Salah

| Pilihan Jawaban | Status | Analisis Kesalahan |
| :--- | :--- | :--- |
| *“My friend **recommend me to buy** this car.”* | ❌ Salah | Memiliki **2 kesalahan**: Subject-Verb Agreement salah (*My friend* harusnya *recommends* jika present), dan pola *recommend me to buy* dilarang dalam bahasa Inggris. |
| *“My friend **recommending** me to buy...”* | ❌ Salah | Kalimat kehilangan kata kerja utama (*predicate verb*), *recommending* tanpa to-be bukan verb kalimat. |
| *“My friend recommended **I to buy**...”* | ❌ Salah | Menggabungkan subjek *I* langsung dengan *to-infinitive* tanpa klausa (*that*) yang valid. |
| *“My friend **recommended that I buy** this car.”* | ✅ **BENAR** | Menggunakan pola **Subjunctive Mood** yang tepat dan baku: $\\mathbf{\\text{recommended that I buy}}$. |

---

### 4. Perbandingan Kata Kerja yang Boleh & Tidak Boleh Menggunakan "to-Infinitive"

| Jenis Pola | Kata Kerja | Contoh Kalimat Benar |
| :--- | :--- | :--- |
| **WAJIB Subjunctive / Gerund** *(NO to-infinitive)* | \`recommend\`, \`suggest\`, \`propose\`, \`insist\`, \`demand\` | *“She **suggested that we leave** early.”* (Bukan: *suggested us to leave*). |
| **BISA Object + to-Infinitive** | \`advise\`, \`tell\`, \`ask\`, \`encourage\`, \`persuade\` | *“She **advised me to buy** this car.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **Recommend / Suggest** → **JANGAN PERNAH** pakai *someone to do*!
> - Gunakan: $\\mathbf{\\text{recommended that I [V1]}}$ atau $\\mathbf{\\text{recommended [V-ing]}}$.
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['recommend', 'subjunctive', 'verb-patterns', 'suggest', 'gerunds', 'englishvit'],
  },
  {
    id: 'verb-pattern-explain-to-me',
    module: 'Prepositional Verbs',
    title: 'explain this to me vs. explain me this (Prepositional Verb Patterns)',
    question: '“Please explain me this question, why its getting incorrect.” (What is the correct grammar structure?)',
    correction: '“explain me this...” -> “explain this to me / explain to me why it is incorrect”',
    remarks: `Jawaban yang benar adalah **"Please explain this question to me. Why is it incorrect?"**

---

### 1. Aturan Dasar: Mengapa "explain me this" SALAH?

Dalam bahasa Inggris, kata kerja (**Verb**) terbagi menjadi dua jenis perlakuan terhadap objek orang:
1. **Ditransitive Verbs (Bisa langsung orang):** *give me, tell me, show me, send me*.
2. **Prepositional Verbs (WAJIB pakai "to" sebelum orang):** *explain to me, describe to me, suggest to me, say to me*.

Kata **\`explain\`** TIDAK BISA menerima objek orang secara langsung tanpa kata depan **\`to\`**:

$$\\mathbf{\\text{explain}} + \\mathbf{\\text{Something (Direct Object)}} + \\mathbf{\\text{to Someone (Prepositional Phrase)}}$$

- ❌ **SALAH:** *“Please **explain me** this question.”*
- ✅ **BENAR:** *“Please **explain this question to me**.”*
- ✅ **BENAR:** *“Please **explain to me why** it is incorrect.”*

---

### 2. Kesalahan Kalimat Tanya: "why its getting incorrect"

Pada penggalan kedua prompt:
- **Penggunaan \`its\` vs \`it's / is it\`**:
  - \`its\` = Kata ganti kepemilikan (*possessive*, misal: *its color*).
  - \`it's\` = Singkatan dari *it is* (*it's incorrect*).
- **Inversi Pertanyaan (*Question Word Inversion*)**:
  - Pada kalimat tanya langsung (*direct question*), kata kerja bantu (*auxiliary/to-be*) harus **mendahului subjek**:
  - ❌ *“Why its getting incorrect?”*
  - ✅ *“Why **is it** incorrect?”* atau *“Why **is it getting** marked as incorrect?”*

---

### 3. Tabel Perbandingan Kata Kerja Serupa

| Pola Kata Kerja | Kata Kerja | Contoh Benar | Contoh Salah |
| :--- | :--- | :--- | :--- |
| **Wajib Pakai \`to Someone\`** | \`explain\`, \`describe\`, \`say\`, \`introduce\`, \`suggest\` | *“Explain it **to me**.”* | ❌ *“Explain me it.”* |
| **Bisa Langsung \`Someone\`** | \`tell\`, \`ask\`, \`teach\`, \`show\`, \`give\` | *“Tell **me** the answer.”* | ❌ *“Tell to me the answer.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **Tell** → Langsung orang (*Tell me*).
> - **Explain** → Wajib pakai **to** (*Explain **to** me* / *Explain this **to** me*).
`,
    source: 'Real-World Writing & Communication',
    chapter: 'Transitive vs Prepositional Verbs & Questions',
    createdAt: '2026-09-02',
    tags: ['explain', 'prepositions', 'verb-patterns', 'grammar-correction', 'direct-questions'],
  },
];

/**
 * Utility functions to access mapping data
 */
export function getAllMappings(): MappingItem[] {
  return MAPPING_ITEMS;
}

export function getModules(): string[] {
  const modules = Array.from(new Set(MAPPING_ITEMS.map((item) => item.module)));
  return modules.sort();
}

export function getMappingById(id: string): MappingItem | undefined {
  return MAPPING_ITEMS.find((item) => item.id === id);
}

export function getMappingsByModule(moduleName: string): MappingItem[] {
  return MAPPING_ITEMS.filter((item) => item.module === moduleName);
}
