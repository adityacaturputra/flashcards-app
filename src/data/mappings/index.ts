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

### 4. 5 Kategori Utama Preposisi dalam Bahasa Inggris

| Kategori Preposisi | Fungsi & Hubungan | Contoh Preposisi & Frasa |
| :--- | :--- | :--- |
| **1. Time (Waktu)** | Kapan suatu kejadian terjadi | \`in\`, \`on\`, \`at\`, \`before\`, \`after\`, \`during\`, \`since\`, \`for\`, \`until\` |
| **2. Place & Position (Tempat & Posisi)** | Di mana benda/orang berada | \`in\`, \`on\`, \`at\`, \`under\`, \`above\`, \`between\`, \`among\`, \`behind\`, \`next to\` |
| **3. Direction & Movement (Arah & Gerak)** | Ke mana arah perpindahan | \`to\`, \`towards\`, \`into\`, \`out of\`, \`through\`, \`across\`, \`along\`, \`past\` |
| **4. Manner, Cause & Agent (Cara & Sebab)** | Bagaimana atau karena apa | \`by\`, \`with\`, \`without\`, \`about\`, \`of\`, \`for\`, \`because of\`, \`as\` |
| **5. Dependent Prepositions (Preposisi Khusus)** | Melekat tetap pada kata kerja/sifat | \`look forward to\`, \`depend on\`, \`interested in\`, \`used to\`, \`object to\` |

---

### 5. Variasi Lengkap Pola Preposisi Lainnya + Gerund (Preposition + V-ing)

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
    title: 'recommend & suggest (Subjunctive Mood & Verb Patterns)',
    question: '“My friend recommended me to buy this car.” (What is the correct version of the above sentence?)',
    correction: '“recommended / suggested me to do...” -> “recommended / suggested that I [V1] / [V-ing]”',
    remarks: `Jawaban yang benar adalah **"My friend recommended that I buy this car."**

---

### 1. Aturan Dasar: Mengapa "recommend / suggest someone to do" SALAH?

Banyak orang mengira pola kata kerja dalam bahasa Inggris semuanya sama seperti *tell* atau *advise* (*advise me to do*). Namun, kata kerja **\`recommend\`** dan **\`suggest\`** memiliki aturan khusus dan **TIDAK BISA** diikuti pola **\`Object + to-infinitive\`**:

#### Contoh Kasus 1: "Recommend"
- ❌ **SALAH:** *“My friend recommended **me to buy** this car.”*
- ✅ **BENAR (Subjunctive):** *“My friend recommended **that I buy** this car.”*
- ✅ **BENAR (Gerund):** *“My friend recommended **buying** this car.”*
- ✅ **BENAR (Preposisi):** *“My friend recommended this car **to me**.”*

#### Contoh Kasus 2: "Suggest"
- ❌ **SALAH:** *“He suggested **me to take** a break.”*
- ✅ **BENAR (Subjunctive):** *“He suggested **that I take** a break.”* *(atau informal: “He suggested **I take** a break”)*
- ✅ **BENAR (Gerund):** *“He suggested **taking** a break.”*
- ✅ **BENAR (Preposisi):** *“He suggested a break **to me**.”*
- ✅ **BENAR (Ganti Kata Kerja):** *“He **advised me to take** a break.”* / *“He **told me to take** a break.”*

---

### 2. Tiga (3) Pola Baku Penggunaan "Recommend" & "Suggest"

- **Pola 1 (Subjunctive Clause):** $\\mathbf{\\text{recommend / suggest} + (\\text{that}) + \\text{Subject} + \\text{Base Verb (V1)}}$
- **Pola 2 (Direct Gerund):** $\\mathbf{\\text{recommend / suggest} + \\text{V-ing}}$
- **Pola 3 (Direct Noun + To):** $\\mathbf{\\text{recommend / suggest} + \\text{Something} + \\text{to Someone}}$

#### Contoh Penerapan Subjunctive Mood:
- ✅ *“My friend recommended that I **buy** this car.”*
- ✅ *“He suggested that she **take** a break.”* *(Perhatikan: tetap **take**, bukan **takes**, karena dalam Subjunctive Mood kata kerja selalu dalam bentuk dasar V1 tanpa akhiran -s).*
- ✅ *“The doctor recommended that he **eat** healthier food.”* *(Tetap **eat**, bukan eats).*

---

### 3. Analisis Kenapa Pilihan Soal Ini Salah

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
| **BISA Object + to-Infinitive** | \`advise\`, \`tell\`, \`ask\`, \`encourage\`, \`persuade\` | *“She **advised me to buy** this car.”* / *“He **advised me to take** a break.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **Recommend / Suggest** → **JANGAN PERNAH** pakai *someone to do*!
> - Gunakan: $\\mathbf{\\text{recommended / suggested that I [V1]}}$ atau $\\mathbf{\\text{recommended / suggested [V-ing]}}$.
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['recommend', 'suggest', 'subjunctive', 'verb-patterns', 'gerunds', 'englishvit'],
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
  {
    id: 'questions-why-does-it-matter',
    module: 'Questions & Auxiliary Verbs',
    title: 'Why does it matter? vs. Why is it matter / Why its matter (Direct Questions)',
    question: '“why is it matter atau why its matter?” (What is the correct English grammar structure?)',
    correction: '“why is it matter / why its matter” -> “Why does it matter?”',
    remarks: `Jawaban yang benar adalah **"Why does it matter?"**

---

### 1. Aturan Dasar: Mengapa "Why does it matter?" BENAR?

Dalam kalimat ini, kata **\`matter\`** berfungsi sebagai **kata kerja (*Verb*)** yang artinya *"berpengaruh / penting / menjadi masalah"*. 

Untuk membentuk kalimat tanya langsung (*direct question*) pada Present Simple Tense dengan kata kerja biasa:
1. **Wajib memakai Auxiliary Verb (*kata kerja bantu*):** Untuk subjek orang ketiga tunggal (*it / he / she*), gunakan **\`does\`**.
2. **Kata kerja utama (*main verb*) kembali ke bentuk dasar (V1 bare infinitive):** Yaitu **\`matter\`** (bukan *matters* karena sudah ada *does*).

$$\\mathbf{\\text{Question Word (Why)}} + \\mathbf{\\text{Auxiliary (does)}} + \\mathbf{\\text{Subject (it)}} + \\mathbf{\\text{Base Verb (matter)}}?$$

- ✅ **BENAR:** *“Why **does it matter**?”* (Kenapa hal itu penting / berpengaruh?)
- ✅ **BENAR:** *“Does it matter?”* (Apakah itu penting?)

---

### 2. Mengapa "Why is it matter" SALAH?

- **Kesalahan Penggunaan To-Be (*is*) dengan Kata Kerja Dasar (*matter*)**:
  - \`is\` adalah kata kerja bantu to-be yang digunakan untuk **kata sifat (*adjective*)**, **kata benda (*noun*)**, atau **kata kerja V-ing (*continuous*)**.
  - *Matter* di sini adalah **kata kerja dasar (V1)**, sehingga tidak boleh digabungkan langsung dengan *is*.
- **Kapan Boleh Menggunakan "is"?**:
  - Jika menggunakan kata sifat **\`important\`**: ✅ *“Why **is it important**?”*
  - Jika menggunakan kata benda dengan artikel dalam idiom: ✅ *“What **is the matter**?”* (Ada apa? / Ada masalah apa?).

---

### 3. Mengapa "Why its matter" SALAH?

Pilihan ini memiliki **2 kesalahan tata bahasa**:
1. **Kekeliruan antara \`its\` dan \`it's\`**:
   - \`its\` (tanpa apostrof) = kata ganti kepemilikan (*possessive*, contoh: *its color* / *its price*).
   - \`it's\` (dengan apostrof) = singkatan dari *it is* atau *it has*.
2. **Kehilangan Kata Kerja Bantu Tanya (*No Auxiliary*)**:
   - Kalimat tanya langsung dalam bahasa Inggris tidak bisa hanya menggabungkan *Question Word + Subject + Verb* tanpa auxiliary (*does*).

---

### 4. Perbedaan: Direct Question vs Embedded Clause (Pernyataan Tidak Langsung)

Perhatikan perubahan posisi kata kerja ketika frase ini berada di dalam kalimat pernyataan:

| Jenis Struktur | Pola Tata Bahasa | Contoh Kalimat Benar |
| :--- | :--- | :--- |
| **Direct Question** *(Pertanyaan Langsung)* | \`Why\` + **\`does\`** + \`it\` + **\`matter\`**? | ✅ *“**Why does it matter**?”* |
| **Embedded Clause** *(Klausa dalam Pernyataan)* | ... + \`why\` + \`it\` + **\`matters\`** | ✅ *“I can explain **why it matters** to our team.”* |
| **Negative Statement** | \`It\` + **\`doesn't matter\`** | ✅ *“It **doesn't matter** at all.”* |

> [!NOTE]
> Pada **Embedded Clause** (*“why it matters”*), tidak ada kata bantu *does*, sehingga kata kerja *matter* kembali mendapat akhiran **-s** sesuai subjek tunggal *it*.

---

### 5. Tabel Ringkasan

| Frase | Status | Alasan & Analisis |
| :--- | :--- | :--- |
| *“Why does it matter?”* | ✅ **BENAR** | Menggunakan pola tanya baku: \`Why\` + \`does\` + \`it\` + \`matter\`. |
| *“Why is it matter?”* | ❌ **SALAH** | Menggabungkan to-be (*is*) langsung dengan bare verb (*matter*). Seharusnya: *“Why is it important?”*. |
| *“Why its matter?”* | ❌ **SALAH** | Menggunakan possessive *its* dan tidak memiliki auxiliary verb *does*. |
| *“What's the matter?”* | ✅ **BENAR** | Idiom ungkapan menanyakan masalah/kabar (*matter* = noun). |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ingin tanya *"Kenapa penting?"* menggunakan **verb matter** → **Why DOES it matter?**
> - Ingin tanya menggunakan **adjective important** → **Why IS it important?**
> - Ingin tanya *"Ada apa?"* → **What's the matter?**
`,
    source: 'English Grammar in Use & Real-World Questions',
    chapter: 'Auxiliary Verbs, Question Formation & Embedded Clauses',
    createdAt: '2026-09-02',
    tags: ['questions', 'auxiliary-verbs', 'why-does-it-matter', 'matter', 'embedded-clauses', 'direct-questions'],
  },
  {
    id: 'subject-verb-agreement-its-color-makes',
    module: 'Subject-Verb Agreement',
    title: 'Its color makes vs. Its colors make (Third-Person Singular Agreement)',
    question: '“its color makes me remember about blablabla” (Why is "makes" written with an "-s"? Does "its color" equal "it"?)',
    correction: '“Its color (singular / it)” -> “makes (V+s)” vs “Its colors (plural / they)” -> “make (V1)”',
    remarks: `Jawaban Anda **100% BENAR!** 

Alasan kata kerja **\`makes\`** berakhiran **\`-s\`** adalah karena subjeknya (**"its color"**) adalah **kata benda tunggal (*singular noun*)** yang setara dengan kata ganti **"it"** (*Third-Person Singular*).

---

### 1. Aturan Dasar: Subject-Verb Agreement (Simple Present Tense)

Dalam tata bahasa Inggris, pada **Simple Present Tense**, bentuk kata kerja wajib menyesuaikan jumlah subjek (*Subject-Verb Agreement*):

1. **Subjek Tunggal (*He / She / It / Singular Noun*)** → Kata kerja **WAJIB ditambah \`-s\` atau \`-es\`**:
   $$\\mathbf{\\text{Subject (Its color = It)}} + \\mathbf{\\text{Verb + -s (makes)}} + \\mathbf{\\text{Object (me)}} + \\mathbf{\\text{Bare Verb (remember)}}$$
2. **Subjek Jamak (*They / We / You / I / Plural Noun*)** → Kata kerja **TETAP bentuk dasar (V1 tanpa -s)**:
   $$\\mathbf{\\text{Subject (Its colors = They)}} + \\mathbf{\\text{Verb (make)}} + \\mathbf{\\text{Object (me)}} + \\mathbf{\\text{Bare Verb (remember)}}$$

---

### 2. Perbandingan Subjek Tunggal (*Its color*) vs Subjek Jamak (*Its colors*)

- ✅ **Tunggal (*Its color = It*):** *“Its **color makes** me feel calm.”* *(Hanya 1 warna).*
- ✅ **Jamak (*Its colors = They*):** *“Its **colors make** me feel excited.”* *(Banyak warna / warna-warni).*
- ✅ **Contoh Serupa (Benda Lain):**
  - *“The **music makes** me dance.”* (*music* = singular noun / it → *makes*).
  - *“These **songs make** me dance.”* (*songs* = plural noun / they → *make*).

---

### 3. Bonus Tata Bahasa 1: Pola Causative Verb "Make" (*Make someone do*)

Setelah kata kerja *make / makes*, kata kerja berikutnya **WAJIB berbentuk dasar (*Bare Infinitive / V1 tanpa to*)**:

$$\\mathbf{\\text{make / makes}} + \\mathbf{\\text{Object (me/him/them)}} + \\mathbf{\\text{V1 (remember / cry / smile)}}$$

- ✅ **BENAR:** *“Its color makes me **remember**...”*
- ❌ **SALAH:** *“Its color makes me **to remember**...”*

---

### 4. Bonus Tata Bahasa 2: "Reminds me of" vs "Makes me remember"

Meskipun *“makes me remember”* secara struktur benar, penutur asli (*native speakers*) memiliki kata kerja khusus yang jauh lebih natural untuk mengungkapkan *"membuat teringat akan sesuatu"*, yaitu **\`remind someone of something\`**:

| Tingkat Kealamian | Contoh Kalimat | Keterangan |
| :--- | :--- | :--- |
| ⭐ **Paling Natural (Native)** | *“Its color **reminds me of** our trip.”* | Menggunakan kata kerja khusus \`remind ... of\`. |
| ✅ **Secara Grammar Benar** | *“Its color **makes me remember** our trip.”* | Menggunakan pola causative \`make + remember\`. |
| ❌ **Kurang Tepat (Preposisi)** | *“...remember **about** our trip.”* | \`remember\` adalah transitive verb, langsung diikuti objeknya tanpa \`about\`. |

---

### 5. Tabel Ringkasan

| Pola Subjek | Kata Ganti | Bentuk Verb | Contoh Kalimat |
| :--- | :--- | :--- | :--- |
| **Its color** *(Tunggal)* | **It** | **makes** *(V + s)* | *“Its color **makes** me happy.”* |
| **Its colors** *(Jamak)* | **They** | **make** *(V1)* | *“Its colors **make** me happy.”* |
| **The car's color** *(Tunggal)* | **It** | **looks** *(V + s)* | *“The car's color **looks** stunning.”* |
| **The car's colors** *(Jamak)* | **They** | **look** *(V1)* | *“The car's colors **look** stunning.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **Its color** (1 warna = *it*) → **makes** / **reminds** (pakai **-s**).
> - **Its colors** (>1 warna = *they*) → **make** / **remind** (tanpa **-s**).
> - Ingin bilang *"bikin aku ingat"* yang paling natural → Gunakan **“reminds me of [something]”**.
`,
    source: 'Real-World Grammar & Daily Writing',
    chapter: 'Subject-Verb Agreement & Causative Verbs',
    createdAt: '2026-09-02',
    tags: ['subject-verb-agreement', 'third-person-singular', 'its-color', 'causative-verbs', 'make-someone-do', 'remind-of'],
  },
  {
    id: 'modals-must-have-rained-past-deduction',
    module: 'Modal Auxiliaries & Deduction',
    title: 'must have rained vs. should have rained (Past Logical Deduction)',
    question: '“The ground is all wet. It should have rained last night.” (What is the correct version of the above sentence?)',
    correction: '“should have rained / must have raining” -> “must have rained”',
    remarks: `Jawaban yang benar adalah **"The ground is all wet. It must have rained last night."**

---

### 1. Aturan Dasar: Kesimpulan Logis Masa Lampau (*Past Logical Deduction*)

Ketika kita melihat **bukti nyata di masa sekarang** (*“The ground is all wet”* = tanahnya basah kuyup), kita menarik kesimpulan logis yang hampir pasti mengenai peristiwa yang terjadi di masa lampau:

$$\\mathbf{\\text{must have}} + \\mathbf{\\text{Past Participle (V3 / rained)}}$$

- ✅ **BENAR:** *“The ground is all wet. It **must have rained** last night.”*  
  *(Tanahnya basah semua. Tadi malam **pasti hujan**).*

---

### 2. Mengapa "should have" SALAH dalam Konteks Ini?

Rumus $\\mathbf{\\text{should have}} + \\mathbf{\\text{V3}}$ digunakan untuk menyatakan **penyesalan atau keharusan masa lalu yang TIDAK terjadi (*Past Regret / Unfulfilled Expectation*)**:

- *“You **should have studied** for the exam.”* *(Kamu seharusnya belajar, tapi faktanya kamu tidak belajar).*
- *“It **should have rained** last night.”* *(Seharusnya tadi malam hujan, tapi **faktanya tidak hujan**).*

> [!WARNING]
> Karena di kalimat pertama dinyatakan bahwa **tanahnya basah (*The ground is all wet*)**, maka jelas faktanya hujan benar-benar turun! Oleh karena itu, penggunaan **\`should have\`** bertentangan 180 derajat dengan fakta situasi.

---

### 3. Mengapa Pilihan Merah (*“It should have raining”*) Salah Fatal?

Pilihan ini memiliki **2 kesalahan tata bahasa sekaligus**:
1. **Salah Makna Modal:** Menggunakan \`should have\` (penyesalan/tidak terjadi), padahal ada bukti basah nyata sehingga wajib memakai \`must have\` (pasti terjadi).
2. **Salah Bentuk Kata Kerja:** Setelah modal perfect \`have\`, kata kerja **WAJIB berbentuk V3 (*Past Participle*)**, yaitu **\`rained\`**, bukan *V-ing* (*raining*).
   - Bentuk continuous hanya boleh jika memakai \`been\`: *“It must have **been raining**”* (tapi di opsi tidak ada kata *been*).

---

### 4. Perbandingan Makna Modal Perfect (Masa Lampau)

| Rumus Modal Perfect | Makna / Fungsi | Contoh Kalimat & Artinya |
| :--- | :--- | :--- |
| **must have + V3** | **Pasti terjadi** *(Kesimpulan logis berdasarkan bukti)* | *“It **must have rained**.”* (Pasti semalam hujan). |
| **should have + V3** | **Seharusnya terjadi** *(tapi faktanya TIDAK terjadi)* | *“You **should have told** me.”* (Harusnya kamu beri tahu aku). |
| **could / might have + V3** | **Mungkin saja terjadi** *(Kemungkinan lampau)* | *“He **might have missed** the bus.”* (Mungkin dia ketinggalan bus). |
| **can't / couldn't have + V3** | **Mustahil terjadi** *(Kesimpulan negatif)* | *“He **couldn't have stolen** it.”* (Mustahil dia yang mencuri). |

---

### 5. Analisis Seluruh Pilihan Soal

| Pilihan Jawaban | Status | Analisis Kesalahan |
| :--- | :--- | :--- |
| *“...It **must have rained** last night.”* | ✅ **BENAR** | Modal kesimpulan logis (\`must have\`) + Kata kerja bentuk V3 (\`rained\`). |
| *“...It **must have rain** last night.”* | ❌ Salah | \`rain\` adalah bentuk dasar (V1/Noun), bukan bentuk V3. |
| *“...It **should have raining** last night.”* | ❌ Salah | Salah makna modal (\`should\`) dan salah bentuk verb (\`have raining\` tanpa been). |
| *“...It **must have raining** last night.”* | ❌ Salah | \`have\` tidak bisa langsung disambung ke *V-ing* tanpa kata bantu \`been\`. |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ada bukti nyata di depan mata (*tanah basah*) → Gunakan **must have + V3** (*pasti sudah terjadi*).
> - Menyesal / keharusan yang tidak terlaksana → Gunakan **should have + V3** (*seharusnya dilakukan*).
> - Semua rumus Modal Perfect **WAJIB diikuti V3** (*must have rained*, bukan *rain* atau *raining*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Modal Verbs of Deduction & Past Speculation',
    createdAt: '2026-09-02',
    tags: ['modals', 'deduction', 'must-have', 'should-have', 'past-participle', 'englishvit'],
  },
  {
    id: 'prepositions-no-preposition-before-next-last-this',
    module: 'Prepositions & Time Expressions',
    title: 'next Saturday vs. on next Saturday (No Preposition with next/last/this/every)',
    question: '“I\'ll see you in class on next Saturday.” (What is the correct version of the above sentence?)',
    correction: '“on next Saturday / at next Saturday / in next Saturday” -> “next Saturday”',
    remarks: `Jawaban yang benar adalah **"I'll see you in class next Saturday."**

---

### 1. Aturan Emas Preposisi Waktu (*The Zero-Preposition Rule*)

Dalam tata bahasa Inggris baku, ketika kata penunjuk waktu (hari, minggu, bulan, tahun) didahului oleh kata penentu (**\`next\`**, **\`last\`**, **\`this\`**, **\`every\`**, **\`each\`**, **\`all\`**), maka kata depan waktu (**\`on\`**, **\`in\`**, **\`at\`**) **TIDAK BOLEH DIGUNAKAN / WAJIB DIHILANGKAN**:

$$\\mathbf{\\text{next / last / this / every}} + \\mathbf{\\text{Time Noun (Saturday / week / month)}} \\quad (\\text{TANPA on / in / at})$$

- ❌ **SALAH:** *“I'll see you in class **on next Saturday**.”*
- ❌ **SALAH:** *“I'll see you in class **at next Saturday**.”*
- ❌ **SALAH:** *“I'll see you in class **in next Saturday**.”*
- ✅ **BENAR:** *“I'll see you in class **next Saturday**.”*

---

### 2. Kapan Preposisi "on" Boleh Digunakan?

Kata depan **\`on\`** HANYA digunakan jika nama harinya **berdiri sendiri tanpa kata penentu (*next/last/this/every*)**:

- ✅ *“I'll see you in class **on Saturday**.”* *(Tanpa kata "next" → Wajib pakai on).*
- ✅ *“I'll see you in class **next Saturday**.”* *(Ada kata "next" → Dilarang pakai on).*

---

### 3. Daftar Kata Penentu yang Menghapus Preposisi (*Zero Preposition Determiners*)

| Kata Penentu | Contoh BENAR (Tanpa Preposisi) | Contoh SALAH (Kelebihan Preposisi) |
| :--- | :--- | :--- |
| **next** | ✅ *“See you **next Monday**.”* / *“**next week**”* | ❌ *“on next Monday”* / *“in next week”* |
| **last** | ✅ *“I met him **last Friday**.”* / *“**last night**”* | ❌ *“on last Friday”* / *“at last night”* |
| **this** | ✅ *“Let's meet **this Sunday**.”* / *“**this year**”* | ❌ *“on this Sunday”* / *“in this year”* |
| **every** | ✅ *“I play tennis **every Saturday**.”* | ❌ *“on every Saturday”* |
| **each / any** | ✅ *“We test it **each week**.”* | ❌ *“in each week”* |

---

### 4. Mengapa "in class" Benar (Bukan "on class")?

- **\`in class\`** adalah kolokasi baku dalam bahasa Inggris yang berarti *"di dalam ruangan kelas / saat sesi kegiatan kelas berlangsung"*.
- **\`on class\`** adalah bentuk yang keliru dan tidak lazim (*non-standard*).

---

### 5. Analisis Seluruh Pilihan Soal

| Pilihan Jawaban | Status | Analisis Kesalahan |
| :--- | :--- | :--- |
| *“I'll see you in class **next Saturday**.”* | ✅ **BENAR** | Menggunakan kolokasi baku \`in class\` dan menghilangkan preposisi sebelum \`next Saturday\`. |
| *“I'll see you in class **at next Saturday**.”* | ❌ Salah | Kelebihan preposisi \`at\` sebelum \`next\`. |
| *“I'll see you in class **in next Saturday**.”* | ❌ Salah | Kelebihan preposisi \`in\` sebelum \`next\`. |
| *“I'll see you **on class on next Saturday**.”* | ❌ Salah | Memiliki 2 kesalahan sekaligus: salah preposisi tempat (\`on class\`) dan kelebihan preposisi waktu (\`on next\`). |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ada kata **next / last / this / every** di depan waktu → **HAPUS SEMUA PREPOSISI** (*on/in/at*)!
> - *on Saturday* (tanpa next) → **next Saturday** (ada next, buang on).
> - Di kelas → **in class** (bukan *on class*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Prepositions of Time & Time Modifiers',
    createdAt: '2026-09-02',
    tags: ['prepositions', 'time-expressions', 'next-saturday', 'on-saturday', 'zero-preposition', 'englishvit'],
  },
  {
    id: 'prepositions-in-on-at-time-pyramid',
    module: 'Prepositions & Time Expressions',
    title: 'in vs. on vs. at (The Time Pyramid Rules & Common Traps)',
    question: 'Kapan menggunakan preposisi waktu "in", "on", dan "at" dalam bahasa Inggris?',
    correction: 'IN (Bulan/Tahun/Abad/Musim) -> ON (Hari/Tanggal) -> AT (Jam/Titik Waktu)',
    remarks: `Cara paling mudah dan praktis untuk mengingat penggunaan **\`in\`**, **\`on\`**, dan **\`at\`** untuk waktu adalah menggunakan konsep **Piramida Waktu (*The Time Pyramid*)**:

> **IN (Paling Luas & Umum)** → **ON (Lebih Spesifik / 1 Hari)** → **AT (Paling Sempit / Titik Jam)**

---

### 1. IN → Digunakan untuk Jangka Waktu Luas & Panjang (*General / Big Periods*)

Gunakan **\`in\`** untuk periode waktu yang berdurasi panjang atau tidak merujuk pada satu hari tertentu:

- **Abad (*Centuries*):** *in the 21st century*
- **Dekade (*Decades*):** *in the 90s*, *in the 1980s*
- **Tahun (*Years*):** *in 2026*, *in 1945*
- **Musim (*Seasons*):** *in summer*, *in winter*, *in the dry season*
- **Bulan (*Months*):** *in September*, *in January* *(hanya bulan tanpa tanggal)*
- **Bagian dari Hari (*Parts of the Day*):** *in the morning*, *in the afternoon*, *in the evening*
- **Rentang Waktu Masa Depan (*Time from now*):** *in 10 minutes* (10 menit lagi), *in two weeks*

---

### 2. ON → Digunakan untuk Periode 1 Hari & Tanggal (*Specific Days & Dates*)

Gunakan **\`on\`** untuk segala sesuatu yang merujuk pada rentang waktu tepat **1 hari (24 jam)** atau memiliki tanggal:

- **Nama Hari (*Days of the Week*):** *on Monday*, *on Sunday*
- **Tanggal Lengkap (*Specific Dates*):** *on September 2nd*, *on 17 August 1945*
- **Hari Perayaan Berakhiran "Day" / "Eve":** *on Christmas Day*, *on New Year's Eve*, *on my birthday*
- **Kombinasi Hari + Bagian Hari:** *on Monday morning*, *on Friday night*

---

### 3. AT → Digunakan untuk Titik Waktu Sangat Spesifik (*Precise Clock Times & Moments*)

Gunakan **\`at\`** untuk waktu yang sangat presisi (jam di jam dinding) atau titik momen tertentu:

- **Jam Pasti (*Exact Clock Times*):** *at 7:00 AM*, *at 3 o'clock*, *at 10:30*
- **Titik Waktu Khusus (*Specific Moments*):** *at noon* (tengah hari), *at midday*, *at midnight* (tengah malam), *at lunchtime*, *at sunrise*, *at sunset*
- **Hari Raya Tanpa Kata "Day" (*Holiday Periods*):** *at Christmas*, *at Eid*, *at Easter* *(merujuk pada keseluruhan musim liburan)*
- **Ungkapan Tetap (*Fixed Expressions*):** *at night*, *at the moment*, *at present*

---

### 4. Jebakan Populer & Pengecualian Penting (*Common Traps*)

| Jebakan Tata Bahasa | Bentuk Benar | Keterangan |
| :--- | :--- | :--- |
| **Pagi/Sore vs Malam** | *in the morning* vs **at night** | Khusus *night*, gunakan **\`at night\`** (bukan *in the night*). |
| **Weekend (Akhir Pekan)** | **at the weekend** *(UK)* / **on the weekend** *(US)* | Keduanya benar tergantung dialek British vs American. |
| **Bulan vs Tanggal** | *in September* vs **on September 2nd** | Jika ada tanggalnya, preposisi otomatis berubah menjadi **\`on\`**. |
| **Hari Raya: "Christmas" vs "Holiday"** | **at Christmas** vs **on Christmas Day** vs **during/over the Christmas holiday** | Tanpa kata *Day/Holiday* pakai **\`at Christmas\`**. Ada kata *Day* pakai **\`on Christmas Day\`**. Jika ada kata *holiday*, gunakan **\`during / over the Christmas holiday\`** atau **\`on (the) Christmas holiday\`** *(bukan at Christmas holiday)*. |
| **Ada Kata "next/last/this/every"** | **next Monday** *(Bukan on next Monday)* | Kata penentu **menghapus semua preposisi in/on/at**! |

---

### 5. Khusus Kata "Christmas" & "Holiday": Mana yang Benar?

- ✅ **at Christmas:** Merujuk pada masa perayaan Natal secara umum (*“We gather at Christmas.”*).
- ✅ **on Christmas Day:** Merujuk tepat pada tanggal 25 Desember (*“We open gifts on Christmas Day.”*).
- ✅ **on Christmas Eve:** Merujuk tepat pada malam 24 Desember (*“Church service is on Christmas Eve.”*).
- ✅ **during / over the Christmas holiday(s):** Merujuk pada sepanjang periode liburan (*“I will travel over the Christmas holiday.”*).
- ✅ **on (the) Christmas holiday / vacation:** Sedang berlibur (*“They are on Christmas holiday in Bali.”*).
- ❌ **SALAH:** *“at Christmas holiday”* (Kombinasi yang tidak baku dan rancu).

---

### 6. Tabel Ringkasan Cepat

| Preposisi | Kategori Waktu | Contoh Penggunaan |
| :--- | :--- | :--- |
| **IN** | Abad, Tahun, Musim, Bulan, Pagi/Sore | *in 2026*, *in summer*, *in September*, *in the morning* |
| **ON** | Nama Hari, Tanggal Lengkap, Hari Spesial (*Day*) | *on Monday*, *on September 2nd*, *on Christmas Day* |
| **AT** | Jam Pasti, Titik Momen, Malam Hari | *at 7:00 PM*, *at noon*, *at midnight*, *at night*, *at Christmas* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **IN** → Kotak Besar (Bulan, Tahun, Musim).
> - **ON** → Kotak Sedang (Hari, Tanggal, & yang berakhiran *Day*).
> - **AT** → Titik Jarum Jam (Jam, Momen Spesifik, & *at Christmas* tanpa kata *day/holiday*).
> - Ada kata **holiday** → Gunakan **during / over / on the Christmas holiday** (bukan *at*).
`,
    source: 'English Grammar in Use & Real-World Communication',
    chapter: 'Prepositions of Time: In, On, At & Fixed Expressions',
    createdAt: '2026-09-02',
    tags: ['prepositions', 'in-on-at', 'time-expressions', 'time-pyramid', 'grammar-rules'],
  },
  {
    id: 'preferences-would-rather-vs-would-prefer',
    module: 'Preferences & Modals',
    title: 'would rather stay vs. would prefer to stay (Preferences in Specific Situations)',
    question: '“Today I prefer to stay at home because it is raining.” (What is the correct version for the above sentence?)',
    correction: '“prefer to stay (for specific today)” -> “I’d rather stay (V1) / I’d prefer to stay (to V1)”',
    remarks: `Jawaban yang benar adalah **"A and B both are correct."** (Pilihan Opsi A dan B keduanya benar).

---

### 1. Aturan Grammar Apa Masuknya? (*Grammar Categories*)

Topik ini mencakup 3 cabang tata bahasa Inggris sekaligus:
1. **Expressing Preferences (*Menyatakan Pilihan/Preferensi*)**: Tata bahasa khusus untuk memilih antara dua opsi.
2. **Modal Auxiliaries & Modal Idioms (*Kata Kerja Bantu Modal*)**: \`would rather\` digolongkan sebagai **Modal Idiom / Semi-Modal**.
3. **Verb Patterns (*Pola Kata Kerja: to-Infinitive vs Bare Infinitive*)**: Aturan kapan kata kerja wajib memakai *to* dan kapan dilarang memakai *to*.

---

### 2. Mengapa "rather" TIDAK Pakai "to", Sedangkan "prefer" PAKAI "to"?

1. **\`would rather\` Bertindak Sebagai Modal Verb (Sama Seperti *can / must / should*):**
   - Semua kata kerja modal dalam bahasa Inggris **TIDAK PERNAH memakai "to"** (wajib diikuti **Bare Infinitive / V1 polos**):
     - *“I **can swim**”* (bukan *I can to swim*).
     - *“I **should go**”* (bukan *I should to go*).
     - ➔ *“I **would rather stay**”* (bukan *would rather to stay*).
2. **\`prefer\` Adalah Kata Kerja Biasa (*Main Lexical Verb*):**
   - Sebagai kata kerja biasa, jika bertemu kata kerja lain, ia mengikuti pola standar kata kerja:
     - Pola Infinitif: $\\mathbf{\\text{prefer} + \\text{to} + \\text{V1}}$ (*“I prefer to stay”* / *“I would prefer to stay”*).
     - Pola Gerund: $\\mathbf{\\text{prefer} + \\text{V-ing}}$ (*“I prefer staying”*).

---

### 3. Apakah Kata "Would" Berpengaruh Besar? (**SANGAT BERPENGARUH!**)

Kata **\`would\`** mengubah makna kalimat dari **kebiasaan umum** menjadi **pilihan pada situasi spesifik saat ini**:

- **Tanpa \`would\` (Hanya \`prefer\`):**
  - Menyatakan **Kebiasaan Umum Sepanjang Waktu (*General Habit / Universal Preference*)**:
  - ✅ *“I **prefer** tea **to** coffee.”* *(Sepanjang hidup saya memang lebih suka teh).*
  - ✅ *“In general, I **prefer staying** home when it rains.”* *(Kebiasaan umum kalau hujan).*
- **Dengan \`would\` (\`would rather\` / \`would prefer\`):**
  - Menyatakan **Pilihan Khusus pada Momen/Situasi Tertentu Saat Ini (*Specific Situation / Right Now*)**:
  - ✅ *“**Today** I **would rather stay** at home because it is raining.”* *(Khusus hari ini saya memilih di rumah).*
  - ✅ *“**Today** I **would prefer to stay** at home because it is raining.”* *(Khusus hari ini saya memilih di rumah).*

---

### 4. Perbandingan Lengkap Struktur Pola

| Bentuk Preferensi | Golongan Grammar | Pola Kata Kerja | Contoh Kalimat Benar | Contoh Salah |
| :--- | :--- | :--- | :--- | :--- |
| **would rather** | Modal Idiom | **+ V1 polos (Bare)** | *“I'd rather **stay** home.”* | ❌ *“I'd rather to stay home.”* |
| **would prefer** | Modal + Regular Verb | **+ to + V1** | *“I'd prefer **to stay** home.”* | ❌ *“I'd prefer stay home.”* |
| **prefer (general)** | Regular Verb | **+ V-ing / to V1** | *“I prefer **staying** home.”* | ❌ *“Today I prefer stay...”* |

---

### 5. Pasangan Kata Penghubung Perbandingan (*Comparison*)

- **would rather ... THAN ...:**
  - ✅ *“I'd rather **stay** home **than go** outside.”*
- **would prefer ... RATHER THAN ...:**
  - ✅ *“I'd prefer **to stay** home **rather than go** outside.”*
- **prefer ... TO ...:**
  - ✅ *“I prefer **staying** home **to going** outside.”*

---

### 6. Analisis Pilihan Soal

| Pilihan Jawaban | Status | Penjelasan |
| :--- | :--- | :--- |
| **A:** *“Today I'd rather stay at home...”* | ✅ **BENAR** | Pola baku \`would rather + V1\` untuk situasi spesifik hari ini. |
| **B:** *“Today I'd prefer to stay at home...”* | ✅ **BENAR** | Pola baku \`would prefer + to V1\` untuk situasi spesifik hari ini. |
| **C:** *“A and B both are correct.”* | 🏆 **JAWABAN TEPAT** | Karena opsi A dan B sama-sama sah dan alami. |
| **D:** *“A and B both are incorrect.”* | ❌ Salah | Karena opsi A dan B valid. |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **'d rather** adalah keluarga **MODAL** → **DILARANG pakai to** (*I'd rather **stay***).
> - **'d prefer** adalah kata kerja biasa → **WAJIB pakai to** (*I'd prefer **to stay***).
> - Ada kata **Today / right now** → **WAJIB pakai would ('d)** untuk menunjukkan situasi spesifik saat ini!
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Expressing Preferences: Prefer, Would Prefer, Would Rather',
    createdAt: '2026-09-02',
    tags: ['preferences', 'would-rather', 'would-prefer', 'prefer', 'modals', 'englishvit'],
  },
  {
    id: 'conditionals-second-conditional-hypothetical-did-move',
    module: 'Conditionals & Hypotheticals',
    title: 'if I did move ... it would be vs. if I do move ... it will be (Second Conditional Consistency)',
    question: '“I would never choose to live in another country, but if I do move to another country, it will be Spain.” (What is the correct version of the above sentence?)',
    correction: '“if I do move... it will be” -> “if I did move... it would be”',
    remarks: `Jawaban yang benar adalah **“I would never choose to live in another country, but if I did move to another country, it would be Spain.”** (Opsi Hijau ke-4).

---

### 1. Aturan Dasar: Pengandaian Hipotetis (*Second Conditional / Unreal Situation*)

Kalimat diawali dengan pernyataan yang menunjukkan situasi tidak nyata / berlawanan dengan kenyataan masa kini (*hypothetical / unreal present*):
- *“I **would never choose** to live in another country...”* *(Saya tidak akan pernah memilih tinggal di negara lain...)*

Karena pembicara membayangkan situasi yang sangat kecil kemungkinannya terjadi (hanya berandai-andai), maka kelanjutan kalimatnya **WAJIB menggunakan pola Second Conditional (Tipe 2)**:

$$\\mathbf{\\text{If}} + \\mathbf{\\text{Subject}} + \\mathbf{\\text{Past Simple (did + V1 / V2)}}, \\quad \\mathbf{\\text{Subject}} + \\mathbf{\\text{would}} + \\mathbf{\\text{Base Verb (V1)}}$$

- ✅ **BENAR:** *“...but if I **did move** to another country, it **would be** Spain.”*  
  *(...tapi seandainya pun saya pindah ke negara lain, negara itu **pasti Spanyol**).*

---

### 2. Apa Fungsi "did move" (*Emphatic Did*)?

Dalam klausa \`if\`, bentuk Past Simple bisa ditulis dengan dua cara:
1. **Bentuk Standar:** *“...if I **moved** to another country...”*
2. **Bentuk Penekanan (*Emphatic Did*):** *“...if I **did move** to another country...”*

> [!NOTE]
> Kata bantu **\`did\` + V1 (\`move\`)** digunakan untuk memberi penekanan khusus (*emphasis*) yang artinya: *"seandainya pun hal itu benar-benar terjadi..."*. Ini sangat cocok digabungkan setelah kalimat *“I would never choose...”*.

---

### 3. Mengapa Pilihan Lain Salah?

| Pilihan Jawaban | Status | Analisis Kesalahan |
| :--- | :--- | :--- |
| *“...if I do move... **I will be Spain**.”* | ❌ Salah Fatal | Subjeknya salah (*I will be Spain* berarti saya akan berubah menjadi negara Spanyol!). |
| *“...if I move... **it will be Spain**.”* | ❌ Salah Tenses | Menggunakan First Conditional (*move ... will be*) yang mengindikasikan rencana nyata di masa depan, tidak konsisten dengan premis hipotetis di awal (*would never choose*). |
| *“...if I am moving... **it will be Spain**.”* | ❌ Salah Tenses | Menggunakan Present Continuous dan *will be*, tidak cocok untuk situasi pengandaian imajinatif. |
| *“...if I **did move**... it **would be** Spain.”* | ✅ **BENAR** | Menggunakan pola **Second Conditional** yang konsisten: Past Simple (\`did move\`) berpasangan dengan modal lampau (\`would be\`). |

---

### 4. Perbandingan First Conditional vs Second Conditional

| Jenis Kalimat Pengandaian | Makna & Nuansa | Rumus Pola | Contoh Kalimat |
| :--- | :--- | :--- | :--- |
| **First Conditional (Tipe 1)** | Nyata / Sangat mungkin terjadi di masa depan | \`If\` + **Present (V1)**, **will + V1** | *“If I **move** to Spain, I **will learn** Spanish.”* (Rencana realistis). |
| **Second Conditional (Tipe 2)** | Khayalan / Hipotetis / Tidak mungkin saat ini | \`If\` + **Past (V2 / did V1)**, **would + V1** | *“If I **did move** to Spain, it **would be** amazing.”* (Hanya pengandaian). |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Kalimat dimulai dengan pengandaian hipotetis (**would**) → Kelanjutannya **wajib Second Conditional** (**did move ... would be**).
> - **Emphatic did** (**did + move**) = Penekanan *"seandainya pun benar-benar..."*.
> - Jangan pasangkan **would** di awal dengan **will** di akhir!
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Conditionals: Type 2 Unreal Conditions & Emphatic Did',
    createdAt: '2026-09-02',
    tags: ['conditionals', 'second-conditional', 'unreal-conditions', 'emphatic-did', 'would-be', 'englishvit'],
  },
  {
    id: 'collocations-not-pretty-sure-vs-not-sure',
    module: 'Collocations & Common Errors',
    title: 'I\'m not pretty sure vs. I\'m not sure / not quite sure (Degree Adverb Negation)',
    question: '“I\'m not pretty sure what the weather is going to be today.” (What is the correct version of the above sentence?)',
    correction: '“I\'m not pretty sure” -> “I\'m not sure / I\'m not quite sure / I\'m not so sure”',
    remarks: `Jawaban yang benar adalah **"I'm not sure what the weather is going to be today."**

---

### 1. Mengapa "I'm not pretty sure" SALAH?

Kata keterangan tingkatan (*adverb of degree*) **\`pretty\`** yang bermakna *"cukup / lumayan"* secara alami **HANYA digunakan dalam kalimat positif (afirmatif)**:

- ✅ **Kalimat Positif:** *“I'm **pretty sure** we will win.”* *(Saya **cukup yakin** kita akan menang).*
- ✅ **Kalimat Positif:** *“The movie was **pretty good**.”* *(Filmnya **lumayan bagus**).*

Dalam tata bahasa Inggris baku, kata ingkar **\`not\` DILARANG dipasangkan langsung sebelum \`pretty sure\`**:
- ❌ **SALAH / TIDAK BAKU:** *“I'm **not pretty sure**...”*

---

### 2. Pilihan Alami Saat Menyatakan Keraguan / Ketidakyakinan (Bentuk Negatif)

Jika Anda ingin menyatakan keraguan atau ketidakyakinan, gunakan variasi alami berikut:

| Bentuk Baku | Makna & Nuansa | Contoh Kalimat |
| :--- | :--- | :--- |
| **I'm not sure** | Paling umum, langsung, dan netral | *“I'm **not sure** what the weather is going to be today.”* |
| **I'm not quite sure** | *"Tidak begitu yakin"* (tahu sedikit, tapi masih ada ragu) | *“I'm **not quite sure** about his exact arrival time.”* |
| **I'm not so sure / too sure** | *"Kurang yakin / belum yakin betul"* (*not convinced*) | *“I'm **not so sure** that's a good decision.”* |
| **I'm not entirely sure** | *"Tidak sepenuhnya yakin"* (formal & sopan) | *“I'm **not entirely sure** if the report is finalized.”* |

---

### 3. Spektrum Tingkat Keyakinan (*Certainty Spectrum*)

| Tingkat Keyakinan | Frasa / Pola | Nuansa & Arti |
| :--- | :--- | :--- |
| **100% (Yakin Mutlak)** | *“I'm **completely sure** / **certain**.”* | Sangat yakin tanpa keraguan |
| **80–90% (Cukup Yakin)** | *“I'm **pretty sure**.”* | Cukup yakin (*Hanya untuk kalimat Positif*) |
| **50% (Agak Ragu)** | *“I'm **not quite sure**.”* | Tidak begitu yakin (tahu sedikit, tapi masih ada ragu) |
| **20–40% (Kurang Yakin)** | *“I'm **not sure** / **not so sure**.”* | Ragu / belum percaya betul (*not convinced*) |
| **0% (Sama Sekali Tidak Tahu)** | *“I'm **not sure at all** / **I have no idea**.”* | Tidak tahu sama sekali |

---

### 4. Perbandingan Kalimat Positif vs Negatif

| Konteks | Bentuk Positif (BENAR) | Bentuk Negatif (SALAH) | Bentuk Negatif (BENAR) |
| :--- | :--- | :--- | :--- |
| **Cukup Yakin** | *I'm **pretty sure**.* | ❌ *I'm not pretty sure.* | ✅ *I'm **not sure**.* / *I'm **not quite sure**.* |
| **Lumayan Bagus** | *It's **pretty good**.* | ❌ *It's not pretty good.* | ✅ *It's **not that good**.* / *It's **not very good**.* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ingin bilang *"cukup yakin"* (positif) → **I'm pretty sure**.
> - Ingin bilang *"tidak yakin"* (negatif) → **I'm not sure** atau **I'm not quite sure** (JANGAN pakai *pretty*!).
> - *I'm not so sure* = *"Saya kurang yakin / belum yakin betul"*.
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['collocations', 'common-errors', 'pretty-sure', 'not-sure', 'not-quite-sure', 'degrees-of-certainty', 'englishvit'],
  },
  {
    id: 'quantifiers-much-vs-a-lot-of-positive-sentences',
    module: 'Nouns & Quantifiers',
    title: 'much vs. a lot of (Using Much in Positive Sentences with Non-Count Nouns)',
    question: '“I have much experience with children.” (11. Using much instead of a lot of in positive sentences with non-count nouns)',
    correction: '“I have much experience...” -> “I have a lot of experience with children.”',
    remarks: `Jawaban yang benar dan alami adalah **"I have a lot of experience with children."**

---

### 1. Aturan Dasar: Mengapa "much" Tidak Lazim dalam Kalimat Positif?

Banyak pembelajar bahasa Inggris diajarkan aturan umum:
- \`many\` = untuk benda yang bisa dihitung (*countable nouns*, misal: *books, cars*).
- \`much\` = untuk benda yang tidak bisa dihitung (*uncountable / non-count nouns*, misal: *time, money, experience, water*).

Meskipun konsep di atas benar, ada **aturan penting dalam penggunaan sehari-hari (*natural English usage*)**:

> [!WARNING]
> Kata **\`much\`** secara alami **HANYA DIGUNAKAN DALAM KALIMAT NEGATIF (-) DAN KALIMAT TANYA (?)**.  
> Dalam **KALIMAT POSITIF (+)**, kata \`much\` terdengar sangat kaku, tidak alami, atau terlalu kuno (*unnatural / awkward*).

Sebagai gantinya, dalam **kalimat positif** untuk benda yang tidak bisa dihitung, gunakan **\`a lot of\`**, **\`lots of\`**, atau **\`plenty of\`**:

- ❌ **Kaku / Tidak Alami:** *“I have **much experience** with children.”*
- ✅ **Alami & Baku:** *“I have **a lot of experience** with children.”*
- ✅ **Bentuk Negatif:** *“I don't have **much experience** with children.”* *(Di kalimat negatif, \`much\` 100% tepat).*
- ✅ **Bentuk Tanya:** *“Do you have **much experience** with children?”* *(Di kalimat tanya, \`much\` 100% tepat).*

---

### 2. Kapan "much" BOLEH Digunakan dalam Kalimat Positif?

Kata **\`much\`** HANYA boleh dan wajar digunakan dalam kalimat positif jika digabungkan dengan **kata penguat / modifier khusus**:

| Pola Khusus | Contoh Kalimat | Arti / Keterangan |
| :--- | :--- | :--- |
| **too much** | *“There is **too much noise** in this room.”* | Terlalu banyak (melebihi batas) |
| **so much** | *“Thank you **so much** for your help!”* / *“I have **so much work**.”* | Sangat banyak (penekanan emosi) |
| **as much ... as** | *“Take **as much time** as you need.”* | Sebanyak yang dibutuhkan (perbandingan) |
| **how much** | *“**How much sugar** do you want in your coffee?”* | Berapa banyak (kalimat tanya) |

---

### 3. Pilihan Kata untuk Tulisan Formal / Akademis (*Formal Writing*)

Jika Anda menulis esai, dokumen kerja, atau jurnal akademis dan ingin variasi yang lebih formal daripada *a lot of*:
- **a great deal of:** *“The project requires **a great deal of effort**.”*
- **a large amount of:** *“They collected **a large amount of data**.”*

---

### 4. Tabel Rangkuman Penggunaan Quantifier (Countable vs Uncountable)

| Tipe Kalimat | Countable Nouns (Bisa Dihitung) | Uncountable Nouns (Tidak Bisa Dihitung) |
| :--- | :--- | :--- |
| **Positif (+)** | **a lot of** / **many** (*a lot of books*) | **a lot of** / **lots of** (*a lot of time, a lot of experience*) → *(Bukan much!)* |
| **Negatif (-)** | **many** / **a lot of** (*not many cars*) | **much** / **a lot of** (*not much time, don't have much money*) |
| **Tanya (?)** | **many** (*Do you have many friends?*) | **much** (*Have you had much luck finding a job?*) |
| **Dengan Penguat** | *too many, so many, how many* | *too much, so much, how much, as much* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Kalimat **Positif (+)** → Gunakan **a lot of** (*I have **a lot of experience***).
> - Kalimat **Negatif (-)** & **Tanya (?)** → Gunakan **much** (*I don't have **much time*** / *Do you have **much time**?*).
> - *much* hanya boleh positif jika ada kata **too / so / as** (*too much, so much*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['quantifiers', 'much-vs-a-lot-of', 'uncountable-nouns', 'non-count-nouns', 'positive-sentences', 'common-errors', 'englishvit'],
  },
  {
    id: 'adjectives-compound-number-noun-singular',
    module: 'Adjectives & Modifiers',
    title: 'three-day weekend vs. three-days weekend (Compound Adjectives)',
    question: '“We have a three-days weekend coming up.” (12. Making nouns plural in compound adjectives)',
    correction: '“a three-days weekend” -> “a three-day weekend”',
    remarks: `Jawaban yang benar dan baku adalah **"We have a three-day weekend coming up."**

---

### 1. Aturan Dasar: Mengapa "three-day" TANPA Akhiran \`-s\`?

Ketika sebuah angka (*number*) dan kata benda (*noun*) digabungkan dengan tanda hubung (*hyphen*) untuk menjelaskan kata benda lain di belakangnya, susunan tersebut berubah fungsi menjadi **Kata Sifat Majemuk (*Compound Adjective*)**:

$$\\mathbf{\\text{Article (a/an)}} + \\mathbf{\\text{Number}} \\mathbf{-} \\mathbf{\\text{Singular Noun (tanpa -s)}} + \\mathbf{\\text{Head Noun}}$$

> [!IMPORTANT]
> **Aturan Emas Kata Sifat dalam Bahasa Inggris:**  
> Kata sifat (*adjective*) **TIDAK PERNAH memiliki bentuk jamak (*never pluralized*)**. Anda tidak boleh menambahkan akhiran \`-s\` atau \`-es\` pada kata sifat.

Oleh karena itu, kata benda di dalam kata sifat majemuk **wajib selalu berbentuk tunggal (*singular*)**:
- ❌ **SALAH:** *“a **three-days** weekend”*
- ✅ **BENAR:** *“a **three-day** weekend”* (Akhir pekan berdurasi 3 hari).

---

### 2. Kapan Kata Benda Tersebut BOLEH Memakai Akhiran \`-s\`?

Kata benda tersebut **HANYA** memakai akhiran \`-s\` jika posisinya berdiri sendiri sebagai **frasa kata benda biasa (*ordinary noun phrase*)** di belakang kata kerja:

- ✅ *“The weekend lasts for **three days**.”* *(Berfungsi sebagai noun jamak biasa).*
- ✅ *“The boy is **ten years old**.”* *(Berdiri sendiri di belakang to-be).*
- ✅ *“The coffee costs **five dollars**.”*
- ✅ *“The meeting took **two hours**.”*

---

### 3. Tabel Perbandingan Berbagai Unit Ukuran (*Time, Age, Money, Distance, Quantity*)

| Kategori | Bentuk Compound Adjective (Di Depan Noun) → **SINGULAR (TANPA -s)** | Bentuk Noun Biasa (Di Belakang Verb) → **PLURAL (PAKAI -s)** |
| :--- | :--- | :--- |
| **Durasi Waktu** | *a **three-day** weekend* | *The weekend is **three days** long.* |
| **Durasi Jam** | *a **two-hour** meeting* | *The meeting lasted **two hours**.* |
| **Usia** | *a **ten-year-old** boy* | *The boy is **ten years old**.* |
| **Mata Uang** | *a **five-dollar** coffee* | *The coffee costs **five dollars**.* |
| **Jarak** | *a **six-mile** marathon* | *He ran for **six miles**.* |
| **Halaman Dokumen** | *a **50-page** report* | *The report has **50 pages**.* |
| **Jumlah Ruangan** | *a **four-bedroom** apartment* | *The apartment has **four bedrooms**.* |
| **Istirahat Menit** | *a **fifteen-minute** break* | *We took a break for **fifteen minutes**.* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ada tanda hubung di depan kata benda (**Number-Noun + Noun**) → Berfungsi sebagai **Kata Sifat** → **DILARANG pakai -s** (*a **three-day** weekend*, *a **10-year-old** boy*).
> - Berdiri sendiri di belakang (**Number + Nouns**) → Berfungsi sebagai **Kata Benda** → **WAJIB pakai -s** (*lasts for **three days***, *is **10 years old***).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['adjectives', 'compound-adjectives', 'hyphenated-words', 'singular-nouns', 'common-errors', 'englishvit'],
  },
  {
    id: 'gerund-be-used-to-vs-used-to-verb',
    module: 'Gerunds & Verb Patterns',
    title: 'used to + V1 vs. be used to + V-ing vs. get used to + V-ing',
    question: '“I’m used to wake up early, so I have no problem getting here at 7 a.m.” (13. Misusing used to)',
    correction: '“I’m used to wake up...” -> “I’m used to waking up early...”',
    remarks: `Jawaban yang benar dan baku adalah **"I’m used to waking up early, so I have no problem getting here at 7 a.m."**

---

### 1. Mengapa "I'm used to wake up" SALAH?

Di dalam kalimat ini terdapat kata kerja bantu to-be **\`am ('m)\`** sebelum kata *used to*.

Dalam tata bahasa Inggris, ketika kata *used to* didahului oleh to-be (**\`be used to\`**), frasa tersebut bermakna *"sudah terbiasa dengan..."*. Kata **\`to\`** pada frasa ini berfungsi sebagai **kata depan (*preposition*)**, BUKAN bagian dari *to-infinitive*.

Oleh karena itu, setiap kata kerja yang mengikutinya **WAJIB berbentuk Gerund (\`V-ing\`)**:

- ❌ **SALAH:** *“I'm used to **wake up** early...”*
- ✅ **BENAR:** *“I'm used to **waking up** early, so I have no problem getting here at 7 a.m.”*

---

### 2. Tiga (3) Pola Berbeda "USED TO" dalam Bahasa Inggris

Banyak pembelajar terkecoh karena kata *used to* memiliki 3 pola yang maknanya sangat berbeda:

#### A. Pola 1: \`used to + V1\` (Kebiasaan Masa Lalu yang Sudah Berhenti)
Digunakan untuk menceritakan kebiasaan atau fakta masa lalu yang **sekarang sudah tidak dilakukan / tidak berlaku lagi (*past habit / no longer true*)**:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{used to}} + \\mathbf{\\text{Base Verb (V1)}}$$

- *“I **used to wake up** late when I was a student.”* *(Dulu waktu kuliah saya biasa bangun siang, tapi sekarang tidak lagi).*
- *“He **used to smoke**, but he quit five years ago.”*
- *“They **used to live** in London.”*

#### B. Pola 2: \`be used to + V-ing / Noun\` (Sudah Terbiasa Saat Ini / Accustomed To)
Digunakan untuk menyatakan bahwa kita **sudah terbiasa dan merasa familiar dengan suatu kondisi (*accustomed to*)**, sehingga hal tersebut bukan lagi masalah:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{to-be (am/is/are/was/were)}} + \\mathbf{\\text{used to}} + \\mathbf{\\text{V-ing / Noun}}$$

- *“I **am used to waking up** early.”* *(Saya sudah terbiasa bangun pagi).*
- *“She **is used to working** in a fast-paced startup.”*
- *“He **is used to the cold weather** here.”* *(Diikuti kata benda).*

#### C. Pola 3: \`get used to + V-ing / Noun\` (Proses Beradaptasi / Becoming Accustomed To)
Digunakan untuk menyatakan **proses adaptasi menuju terbiasa (*becoming accustomed to*)**:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{get / gets / got / getting used to}} + \\mathbf{\\text{V-ing / Noun}}$$

- *“I am slowly **getting used to living** alone.”* *(Saya perlahan mulai terbiasa hidup sendiri).*
- *“Don't worry, you will **get used to the new workflow** soon.”*

---

### 3. Tabel Rangkuman 3 Pola "Used To"

| Pola Grammar | Arti / Fungsi | Bentuk Kata Kerja | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **used to + V1** | Dulu pernah / kebiasaan masa lalu | **V1 polos (Base)** | *I **used to wake** up late.* (Sekarang tidak). |
| **be used to + V-ing** | Sudah terbiasa saat ini | **V-ing (Gerund)** / Noun | *I **am used to waking** up early.* (Bukan masalah). |
| **get used to + V-ing** | Proses mulai terbiasa | **V-ing (Gerund)** / Noun | *I am **getting used to waking** up early.* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **TANPA to-be** (*used to*) → Diikuti **V1 polos** (*I used to live...* = Dulu pernah).
> - **ADA to-be** (*am/is/are + used to*) → Diikuti **V-ing** (*I am used to living...* = Sudah terbiasa).
> - **ADA get** (*get used to*) → Diikuti **V-ing** (*getting used to living...* = Mulai terbiasa).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['used-to', 'be-used-to', 'get-used-to', 'gerunds', 'verb-patterns', 'common-errors', 'englishvit'],
  },
  {
    id: 'causative-verbs-make-let-have-bare-infinitive',
    module: 'Causative Verbs & Verb Patterns',
    title: 'Causative Verbs (let, make, have + Bare Infinitive vs. get + to-Infinitive)',
    question: '“I made my son to clean up his room.” (14. Using the infinitive after the causative verbs let, make, and have)',
    correction: '“made my son to clean...” -> “made my son clean up his room”',
    remarks: `Jawaban yang benar dan baku adalah **"I made my son clean up his room."**

---

### 1. Definisi & Aturan Dasar: Causative Verbs (*Kata Kerja Kausatif*)

**Causative Verbs** digunakan ketika Subjek tidak melakukan aksi secara langsung, melainkan **membuat, memaksa, mengizinkan, atau meminta orang lain** untuk melakukannya:

> [!IMPORTANT]
> Tiga kata kerja kausatif utama: **\`LET\`**, **\`MAKE\`**, dan **\`HAVE\`** **DILARANG memakai kata "to"** di depan kata kerja kedua. Kata kerja kedua **WAJIB berbentuk kata kerja dasar polos (Bare Infinitive / V1)**:
> 
> $$\\mathbf{\\text{Subject}} + \\mathbf{\\text{make / let / have}} + \\mathbf{\\text{Person (Object)}} + \\mathbf{\\text{Base Verb (V1 polos)}}$$

- ❌ **SALAH:** *“I made my son **to clean** up his room.”*
- ✅ **BENAR:** *“I made my son **clean** up his room.”*

---

### 2. Tiga (3) Causative Verbs yang Wajib Bare Infinitive (TANPA "to")

| Causative Verb | Makna & Fungsi | Rumus Pola | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **MAKE** | Memaksa / Mengharuskan (*force / require*) | \`make + person + V1\` | *“She **made me apologize**.”* (Bukan *to apologize*). |
| **LET** | Mengizinkan / Membiarkan (*allow / permit*) | \`let + person + V1\` | *“My boss **let us leave** early.”* (Bukan *to leave*). |
| **HAVE** | Meminta / Mendelegasikan tugas (*request / assign*) | \`have + person + V1\` | *“I will **have my assistant call** you.”* (Bukan *to call*). |

---

### 3. Pengecualian Penting: Causative Verb "GET" (WAJIB Pakai "to")

Berbeda dengan *make, let,* dan *have*, kata kerja kausatif **\`GET\`** (yang bermakna *membujuk / meyakinkan seseorang untuk melakukan sesuatu*) **WAJIB menggunakan to-infinitive (\`to + V1\`)**:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{get / got}} + \\mathbf{\\text{Person (Object)}} + \\mathbf{\\text{to}} + \\mathbf{\\text{Base Verb (V1)}}$$

- ❌ **SALAH:** *“I got my son clean his room.”*
- ✅ **BENAR:** *“I **got my son to clean** his room.”*
- ✅ **BENAR:** *“She **got her brother to help** her with math.”*

---

### 4. Bagaimana dengan Kata Kerja "HELP"?

Kata kerja **\`HELP\`** sangat fleksibel dan **boleh menggunakan "to" ataupun TANPA "to"** (keduanya 100% baku dan benar):
- ✅ *“He helped me **clean** the room.”* (Umum dalam percakapan).
- ✅ *“He helped me **to clean** the room.”* (Sedikit lebih formal).

---

### 5. Kausatif Pasif (*Passive Causative: have / get something done*)

Jika objeknya adalah **benda (bukan orang)** yang dikenai tindakan oleh pihak lain:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{have / get}} + \\mathbf{\\text{Something (Object)}} + \\mathbf{\\text{V3 (Past Participle)}}$$

- *“I **had my car repaired** yesterday.”* (Mobil saya diperbaiki oleh montir).
- *“She **got her hair cut** last week.”* (Rambutnya dipotong oleh salon).

---

### 6. Tabel Rangkuman Perbandingan Kausatif Aktif

| Kata Kerja | Makna Kausatif | Pola Kata Kerja Kedua | Contoh Kalimat |
| :--- | :--- | :--- | :--- |
| **make** | Memaksa | **+ V1 (Bare)** | *She made him **wash** the dishes.* |
| **let** | Mengizinkan | **+ V1 (Bare)** | *They let us **enter** for free.* |
| **have** | Meminta / Menugaskan | **+ V1 (Bare)** | *I had the plumber **fix** the sink.* |
| **get** | Membujuk | **+ to + V1** | *I got the plumber **to fix** the sink.* |
| **help** | Membantu | **+ (to) + V1** | *He helped me **(to) carry** the boxes.* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **LET, MAKE, HAVE** → **DILARANG pakai to** (*made him **clean***, *let him **go***, *had him **call***).
> - **GET** → **WAJIB pakai to** (*got him **to clean***).
> - **HELP** → **Bebas** boleh pakai atau tanpa *to* (*helped me clean* / *helped me to clean*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['causative-verbs', 'make-let-have', 'get-someone-to-do', 'bare-infinitive', 'verb-patterns', 'common-errors', 'englishvit'],
  },
  {
    id: 'modals-could-vs-was-able-to-single-occasion',
    module: 'Modal Auxiliaries',
    title: 'could vs. was/were able to (Past Ability on a Single Occasion)',
    question: '“I had to think about it for a while, but finally I could remember the name of my first grade teacher.” (15. Using could instead of was/were able to talk about an ability on a single occasion in the past)',
    correction: '“finally I could remember...” -> “finally I was able to remember the name of my first grade teacher.”',
    remarks: `Jawaban yang benar dan baku adalah **"I had to think about it for a while, but finally I was able to remember the name of my first grade teacher."**

---

### 1. Aturan Dasar: "could" vs. "was/were able to" dalam Kalimat Positif (+)

Banyak pembelajar mengira bahwa \`could\` dan \`was/were able to\` selalu bisa saling menggantikan. Namun, dalam tata bahasa Inggris baku:

#### A. \`COULD\` → Kemampuan Umum Masa Lalu (*General Past Ability*)
Gunakan **\`could\`** ketika membicarakan keahlian atau kemampuan umum yang Anda miliki secara konstan di masa lalu:
- *“When I was six years old, I **could swim** very well.”* *(Kemampuan umum sepanjang masa kecil).*
- *“My grandmother **could speak** five languages.”* *(Kemampuan umum).*

#### B. \`WAS / WERE ABLE TO\` → Keberhasilan pada Satu Peristiwa Spesifik (*Single Occasion / Specific Achievement*)
Jika Anda membicarakan keberhasilan melakukan sesuatu pada **satu momen tertentu / peristiwa spesifik yang membutuhkan usaha**, dalam **kalimat positif (+)** Anda **WAJIB menggunakan \`was/were able to\`** (atau \`managed to\`), **BUKAN \`could\`**:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{was / were able to}} + \\mathbf{\\text{Base Verb (V1)}} \\quad (\\text{Peristiwa Spesifik})$$

- ❌ **SALAH:** *“...finally I **could remember** the name of my teacher.”*
- ✅ **BENAR:** *“...finally I **was able to remember** the name of my first grade teacher.”*
- ✅ **BENAR:** *“The fire spread quickly, but everyone **was able to escape** safely.”* (Bukan *could escape*).

---

### 2. Bagaimana dengan Kalimat Negatif (-)? (**SAMA-SAMA BOLEH!**)

Dalam **kalimat negatif (-)**, perbedaan antara kemampuan umum dan peristiwa spesifik **TIDAK BERLAKU**. Anda bebas menggunakan **\`couldn't\`** ataupun **\`wasn't/weren't able to\`**:

- ✅ *“I **couldn't remember** her name.”* = *“I **wasn't able to remember** her name.”* (Keduanya sah & alami).
- ✅ *“He **couldn't escape** the building.”* = *“He **wasn't able to escape** the building.”*

> [!NOTE]
> Dalam percakapan sehari-hari, penutur asli cenderung lebih sering memilih **\`couldn't\`** karena lebih singkat dan praktis.

---

### 3. Pengecualian: Kata Kerja Panca Indra & Pikiran (*Verbs of Perception*)

Khusus untuk kata kerja persepsi indra dan pikiran (*see, hear, smell, feel, understand, taste*), kata **\`could\`** diperbolehkan meskipun merujuk pada satu momen spesifik:
- ✅ *“Suddenly, I **could smell** smoke.”*
- ✅ *“I looked out the window and **could see** the mountains.”*

---

### 4. Tabel Rangkuman Perbandingan

| Konteks Kemampuan Masa Lalu | Jenis Kalimat | Pilihan yang TEPAT | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **Kemampuan Umum (*General Ability*)** | Positif (+) | **could** / **was/were able to** | *I **could swim** when I was a child.* |
| **Momen Tertentu (*Single Occasion*)** | Positif (+) | **WAJIB was/were able to** | *Finally, I **was able to solve** the bug.* (❌ *could solve*) |
| **Situasi Umum / Momen Tertentu** | Negatif (-) | **couldn't** / **wasn't able to** | *I **couldn't find** my keys anywhere.* |
| **Persepsi Indra (*see, hear, smell*)** | Positif (+) Spesifik | **could** diperbolehkan | *I **could hear** someone knocking on the door.* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Kalimat **Positif (+)** pada **1 Momen Spesifik** → **WAJIB was/were able to** (*finally I **was able to remember***).
> - Kalimat **Positif (+)** pada **Kemampuan Umum** → **could** (*When I was young, I **could run** fast*).
> - Kalimat **Negatif (-)** → **Bebas** boleh *couldn't* atau *wasn't able to*.
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['modals', 'could-vs-was-able-to', 'past-ability', 'single-occasion', 'was-able-to', 'common-errors', 'englishvit'],
  },
  {
    id: 'modals-be-supposed-to-vs-should',
    module: 'Modal Auxiliaries & Obligations',
    title: 'be supposed to vs. should (Obligation/Commitment vs. Advice/Recommendation)',
    question: '“Today I should babysit my little brother. I told my mom I would.” (16. Confusing to be supposed to and should)',
    correction: '“Today I should babysit...” -> “Today I’m supposed to babysit my little brother. I told my mom I would.”',
    remarks: `Jawaban yang benar dan baku adalah **"Today I’m supposed to babysit my little brother. I told my mom I would."**

---

### 1. Mengapa "I should babysit" SALAH di Konteks Ini?

Perhatikan kalimat lanjutannya: **“I told my mom I would.”** *(Saya sudah bilang ke ibu bahwa saya akan menjaganya)*. 

Kalimat ini menunjukkan adanya **komitmen, janji, atau kesepakatan yang telah dibuat sebelumnya**:

> [!IMPORTANT]
> - **\`be supposed to + V1\`** digunakan ketika seseorang memiliki **kewajiban, janji, jadwal, atau ekspektasi dari pihak luar** (*obligation / agreed commitment*).
> - **\`should + V1\`** hanya digunakan untuk memberikan **saran, rekomendasi, atau opini subjektif** tentang apa yang dianggap baik dilakukan (*advice / recommendation*), tanpa ada ikatan janji atau kewajiban formal.

Karena pembicara sudah berjanji kepada ibunya, maka itu adalah kewajiban yang telah disepakati, sehingga **WAJIB menggunakan \`be supposed to\`**:
- ❌ **SALAH:** *“Today I **should babysit**... I told my mom I would.”*
- ✅ **BENAR:** *“Today I **am supposed to babysit** my little brother. I told my mom I would.”*

---

### 2. Rincian Perbedaan Penggunaan

#### A. \`be supposed to + V1\` (Kewajiban, Jadwal, Janji, Aturan)
Digunakan untuk menyatakan sesuatu yang **sudah seharusnya dilakukan berdasarkan janji, jadwal, aturan, atau perintah**:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{to-be (am/is/are/was/were)}} + \\mathbf{\\text{supposed to}} + \\mathbf{\\text{Base Verb (V1)}}$$

- *“We **are supposed to submit** the sprint report by 5 p.m.”* *(Sesuai tenggat waktu/aturan kantor).*
- *“The flight **is supposed to arrive** at 8:30.”* *(Sesuai jadwal resmi maskapai).*
- *“You **are not supposed to park** your car here.”* *(Sesuai aturan larangan).*

#### B. \`should + V1\` (Saran, Rekomendasi, Pendapat Pribadi)
Digunakan ketika pembicara menyarankan tindakan yang baik/bijak, tetapi **tidak ada perjanjian atau kewajiban yang mengikat**:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{should}} + \\mathbf{\\text{Base Verb (V1)}}$$

- *“You **should drink** more water every day.”* *(Saran kesehatan).*
- *“I think we **should leave** early to avoid traffic.”* *(Opini pribadi).*
- *“You **should apply** for that senior engineer position.”* *(Rekomendasi).*

---

### 3. Nuansa Khusus: "was/were supposed to" (Rencana Masa Lalu yang Batal)

Jika menggunakan bentuk lampau (*past tense*), frasa ini sering menyiratkan bahwa hal tersebut **seharusnya terjadi, tetapi pada kenyataannya TIDAK terjadi**:
- *“I **was supposed to meet** him yesterday, but he canceled at the last minute.”* *(Seharusnya bertemu, tapi batal).*

---

### 4. Tabel Rangkuman Perbandingan

| Aspek Pembeda | **be supposed to + V1** | **should + V1** |
| :--- | :--- | :--- |
| **Fungsi Utama** | Kewajiban karena janji, kesepakatan, jadwal, atau aturan | Saran, anjuran, nasihat, atau opini pribadi |
| **Sumber Dorongan** | Pihak eksternal (janji ke orang lain, bos, deadline, jadwal) | Internal (pikiran/pendapat subjektif pembicara) |
| **Makna Kalimat** | *"Sudah semestinya / ada tugas / sudah dijadwalkan"* | *"Sebaiknya / ada baiknya / disarankan"* |
| **Contoh Kalimat** | *“I'm **supposed to pick up** my sister.”* (Sudah janji). | *“You **should call** your sister.”* (Saran yang baik). |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ada **janji / jadwal / aturan / tugas dari orang lain** → Gunakan **be supposed to** (*I'm supposed to babysit*).
> - Hanya **saran / pendapat pribadi / nasihat** → Gunakan **should** (*You should rest*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['modals', 'be-supposed-to', 'should', 'obligations', 'commitments', 'advice', 'common-errors', 'englishvit'],
  },
  {
    id: 'conjunctions-even-though-vs-even-if',
    module: 'Conjunctions & Conditionals',
    title: 'even though vs. even if (Factual Reality vs. Hypothetical Possibility)',
    question: '“We won’t cancel the meeting even though it snows later.” (17. Confusing even though and even if)',
    correction: '“even though it snows later” -> “even if it snows later”',
    remarks: `Jawaban yang benar dan baku adalah **"We won’t cancel the meeting even if it snows later."**

---

### 1. Mengapa "even though it snows later" SALAH?

Perhatikan kata keterangan waktu **\`later\`** (*nanti*). Salju **belum turun saat ini**, melainkan baru sebatas kemungkinan di masa depan atau situasi pengandaian (*hypothetical condition*):

> [!IMPORTANT]
> - **\`EVEN THOUGH\`** HANYA digunakan untuk **fakta nyata yang sudah / sedang benar-benar terjadi (*real facts / true conditions*)**. Maknanya sama dengan *although* atau *meskipun kenyataannya...*.
> - **\`EVEN IF\`** digunakan untuk **pengandaian, kemungkinan masa depan, atau kondisi yang belum tentu terjadi (*hypothetical / future possibilities*)**. Maknanya sama dengan *bahkan jika / sekalipun / tidak peduli apakah terjadi atau tidak...*.

Karena salju baru kemungkinan di masa depan yang belum tentu terjadi, maka **WAJIB menggunakan \`even if\`**:
- ❌ **SALAH:** *“We won't cancel the meeting **even though** it snows later.”*
- ✅ **BENAR:** *“We won't cancel the meeting **even if** it snows later.”* *(Kami tidak akan membatalkan rapat **bahkan jika / sekalipun** nanti turun salju).*

---

### 2. Rincian Perbedaan Penggunaan

#### A. \`even though\` → Fakta Nyata (*Factual Situation*)
Gunakan ketika klausanya adalah kenyataan yang benar-benar ada / sudah terbukti:
- *“I went to work **even though I was sick**.”* *(Fakta: Saya memang benar-benar sakit saat itu).*
- *“She bought the laptop **even though it was expensive**.”* *(Fakta: Laptop tersebut memang mahal).*
- *“We enjoyed the picnic **even though it rained**.”* *(Fakta: Hujan benar-benar turun saat piknik).*

#### B. \`even if\` → Pengandaian / Belum Tentu Terjadi (*Hypothetical Condition*)
Gunakan ketika klausanya adalah kemungkinan atau kondisi imajinatif di masa depan:
- *“I will go to work tomorrow **even if I feel tired**.”* *(Pengandaian: Kalaupun besok lelah, saya tetap berangkat).*
- *“I will buy the car **even if it is expensive**.”* *(Pengandaian: Entah mahal atau tidak, saya tetap membelinya).*
- *“**Even if they apologize**, I will not change my decision.”* *(Pengandaian: Sekalipun mereka minta maaf...).*

---

### 3. Perbandingan Langsung yang Sangat Kontras

Perhatikan perbedaan nuansa makna pada pasangan kalimat berikut:

- 🌧️ *“I am going out **even though it's raining**.”*  
  → **FAKTA NYATA:** Saat ini saya melihat ke luar jendela dan **hujan sedang turun sekarang**.
- 🌦️ *“I am going out **even if it rains**.”*  
  → **PENGANDAIAN:** Saat ini belum hujan, tetapi **seandainya pun nanti hujan**, saya tetap akan keluar.

---

### 4. Tabel Rangkuman Perbandingan

| Aspek Pembeda | **even though** | **even if** |
| :--- | :--- | :--- |
| **Status Kondisi** | **Fakta Nyata (*Real Fact / Reality*)** | **Pengandaian (*Hypothetical / Possibility*)** |
| **Waktu Kejadian** | **Sudah / sedang terjadi saat ini** | **Belum terjadi / belum tentu terjadi** |
| **Padanan Makna** | *Meskipun / Walaupun kenyataannya...* | *Bahkan jika / Sekalipun / Entah terjadi atau tidak...* |
| **Sinonim Bahasa Inggris** | *Although / Despite the fact that* | *Whether or not / No matter if* |
| **Contoh Kalimat** | *“He failed **even though he studied hard**.”* (Fakta: Dia sudah belajar keras). | *“He will fail **even if he studies hard**.”* (Pengandaian: Sekalipun dia belajar keras). |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Kondisi **Sudah Terjadi / Fakta Nyata** → Gunakan **even though** (*even though it rained* = Hujannya nyata).
> - Kondisi **Masa Depan / Belum Tentu Terjadi / Ada kata "later / tomorrow"** → Gunakan **even if** (*even if it snows later* = Sekalipun nanti salju).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['conjunctions', 'even-though', 'even-if', 'conditionals', 'hypotheticals', 'common-errors', 'englishvit'],
  },
  {
    id: 'gerund-vs-infinitive-stop-doing-vs-stop-to-do',
    module: 'Gerunds & Infinitives',
    title: 'stop + V-ing vs. stop + to V1 (Meaning Change: Gerund vs. To-Infinitive)',
    question: '“I stopped to smoke several years ago.” (18. Confusing stop smoking with stop to smoke, etc.)',
    correction: '“I stopped to smoke...” -> “I stopped smoking several years ago.”',
    remarks: `Jawaban yang benar dan baku adalah **"I stopped smoking several years ago."**

---

### 1. Mengapa "I stopped to smoke several years ago" SALAH?

Kata kerja **\`STOP\`** memiliki **dua arti yang bertolak belakang** tergantung apakah diikuti oleh **Gerund (\`V-ing\`)** atau **To-Infinitive (\`to + V1\`)**:

> [!IMPORTANT]
> - **\`stop + V-ing (Gerund)\`** = **Menghentikan / mengakhiri aktivitas tersebut (*Quit / Cease doing something*)**. Aktivitas *V-ing* itulah yang **berhenti dilakukan**.
> - **\`stop + to + V1 (To-Infinitive)\`** = **Berhenti sejenak dari apa yang sedang dilakukan *UNTUK* melakukan aktivitas baru (*Infinitive of Purpose: in order to do something*)**.

Jika Anda bermaksud menyatakan bahwa Anda *sudah berhenti dari kebiasaan merokok*, maka kata kerjanya **WAJIB berbentuk Gerund (\`V-ing\`)**:
- ❌ **SALAH / SALAH MAKNA:** *“I stopped **to smoke** several years ago.”*  
  *(Secara harfiah artinya: Bertahun-tahun lalu saya menghentikan aktivitas saya demi menyalakan rokok!).*
- ✅ **BENAR:** *“I stopped **smoking** several years ago.”*  
  *(Artinya: Saya sudah berhenti merokok beberapa tahun yang lalu).*

---

### 2. Rincian Rumus & Contoh Penggunaan

#### A. \`stop + V-ing\` → Berhenti Melakukan Aktivitas Itu
Aktivitas tersebut berakhir (baik permanen maupun sementara):

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{stop / stopped}} + \\mathbf{\\text{V-ing (Gerund)}}$$

- *“Please **stop talking** during the exam.”* *(Tolong berhenti berbicara).*
- *“It **stopped raining** an hour ago.”* *(Hujan sudah berhenti).*
- *“He **stopped drinking** sugary drinks to stay healthy.”* *(Dia berhenti minum minuman manis).*

#### B. \`stop + to + V1\` → Berhenti Sejenak DEMI Melakukan Sesuatu
Menghentikan aktivitas sebelumnya untuk memulai aktivitas baru:

$$\\mathbf{\\text{Subject}} + \\mathbf{\\text{stop / stopped}} + \\mathbf{\\text{to + V1 (Infinitive of Purpose)}}$$

- *“While driving home, he **stopped to buy** some groceries.”* *(Dia menepikan mobilnya untuk membeli bahan makanan).*
- *“We were exhausted, so we **stopped to take a rest**.”* *(Kami berhenti berjalan untuk beristirahat).*
- *“On our road trip, we **stopped to take photos** of the scenery.”* *(Kami berhenti sejenak untuk berfoto).*

---

### 3. Kata Kerja Penting Lainnya yang Mengubah Makna (Gerund vs. Infinitive)

Selain *stop*, terdapat beberapa kata kerja penting yang maknanya berubah total ketika dipasangkan dengan Gerund vs To-Infinitive:

| Kata Kerja | + V-ing (Gerund) | + to + V1 (To-Infinitive) |
| :--- | :--- | :--- |
| **STOP** | **Berhenti melakukan aktivitas itu** (*I stopped smoking* = Berhenti merokok). | **Berhenti sejenak demi melakukan hal itu** (*I stopped to smoke* = Berhenti untuk merokok). |
| **REMEMBER** | **Mengingat kenangan/kejadian lampau** (*I remember locking the door* = Ingat tadi sudah mengunci). | **Ingat untuk mengerjakan tugas di depan** (*Remember to lock the door* = Ingat kuncilah pintunya). |
| **FORGET** | **Lupa kenangan pernah melakukan sesuatu** (*I'll never forget meeting him* = Takkan lupa kenangan itu). | **Lupa/lalai mengerjakan suatu tugas** (*Don't forget to pay the bill* = Jangan lupa bayar tagihan). |
| **REGRET** | **Menyesali perbuatan di masa lalu** (*I regret saying those words* = Menyesal dulu telah bicara begitu). | **Dengan berat hati menyampaikan kabar buruk** (*We regret to inform you that...* = Mohon maaf kami infokan). |
| **TRY** | **Bereksperimen mencoba metode/cara** (*Try restarting your laptop* = Coba restart apakah berhasil). | **Berusaha keras melawan kesulitan** (*I tried to lift the heavy box* = Berjuang sekuat tenaga mengangkat). |

---

### 4. Tabel Rangkuman Kontras:

| Pola Kalimat | Makna Aksi | Contoh Kalimat |
| :--- | :--- | :--- |
| **stop + V-ing** | Aktivitas **dihentikan / selesai** | *I **stopped working** at 5 p.m.* (Pekerjaan selesai/berhenti). |
| **stop + to V1** | Aktivitas **baru akan dimulai** setelah jeda | *I **stopped to work** on the project.* (Mengambil jeda untuk mulai kerja). |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Mau bilang **"berhenti dari suatu kebiasaan/aktivitas"** → **stop + V-ing** (*stop smoking, stop complaining*).
> - Mau bilang **"berhenti sejenak UNTUK melakukan sesuatu"** → **stop + to V1** (*stopped to drink water*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['gerund', 'infinitive', 'stop-smoking', 'stop-to-smoke', 'remember', 'forget', 'regret', 'try', 'verb-patterns', 'common-errors', 'englishvit'],
  },
  {
    id: 'nouns-uncountable-tricky-non-count-nouns',
    module: 'Nouns & Determiners',
    title: 'Tricky Non-Count Nouns (advice, information, furniture, homework, luggage, etc.)',
    question: '“My father always gives me great advices.” (19. Using some tricky non-count nouns as count nouns)',
    correction: '“great advices” -> “great advice”',
    remarks: `Jawaban yang benar dan baku adalah **"My father always gives me great advice."**

---

### 1. Mengapa "great advices" SALAH?

Di dalam bahasa Indonesia dan beberapa bahasa lain, kata *"nasihat"* atau *"informasi"* sering kali terasa bisa dihitung (misal: "dua buah nasihat", "banyak informasi"). Namun, dalam tata bahasa Inggris baku:

> [!IMPORTANT]
> **Aturan Mutlak Non-Count / Uncountable Nouns:**
> Kata benda tak dapat dihitung **TIDAK PERNAH memiliki bentuk jamak (*DILARANG menambahkan akhiran -s / -es*)** dan **TIDAK BISA dipasangi artikel tunggal \`a / an\` secara langsung**:
> - ❌ **SALAH:** *“My father gives me great **advices**.”*
> - ❌ **SALAH:** *“He gave me **an advice**.”*
> - ✅ **BENAR:** *“My father always gives me great **advice**.”*
> - ✅ **BENAR:** *“He gave me **a piece of advice**.”* *(Jika ingin menyatakan 1 butir nasihat).*

---

### 2. Daftar 12 Tricky Non-Count Nouns yang Paling Sering Salah

Berikut adalah daftar kata benda tak dapat dihitung yang paling sering salah diberi akhiran \`-s\`:

1. **advice** (❌ *advices*) → *“I need some **advice**.”*
2. **information** (❌ *informations*) → *“Can you send me the **information**?”*
3. **homework** (❌ *homeworks*) → *“I have a lot of **homework** to finish.”*
4. **furniture** (❌ *furnitures*) → *“They bought new **furniture** for the living room.”*
5. **luggage / baggage** (❌ *luggages / baggages*) → *“How many pieces of **luggage** do you have?”*
6. **equipment** (❌ *equipments*) → *“The gym has modern **equipment**.”*
7. **evidence / proof** (❌ *evidences / proofs*) → *“There is strong **evidence** to support this claim.”*
8. **knowledge** (❌ *knowledges*) → *“He has deep **knowledge** in AI systems.”*
9. **help** (❌ *helps*) → *“Thank you for your **help**.”*
10. **mail** (❌ *mails*) → *“There is a lot of **mail** in the mailbox.”* *(Gunakan letters / emails jika ingin bentuk jamak).*
11. **work** (❌ *works*) → *“I have so much **work** today.”* *(Gunakan tasks / jobs jika ingin dihitung).*
12. **news** (❌ *selalu singular, bukan jamak*) → *“The **news is** very encouraging.”* *(Menggunakan to-be 'is', bukan 'are').*

---

### 3. Cara Menghitung Non-Count Nouns (*Partitive Expressions*)

Jika Anda ingin menyebutkan jumlah satuan tertentu dari kata benda non-count, gunakan frasa takaran satuan (**partitive / counter expressions**):

$$\\mathbf{\\text{a piece of / items of / bottles of}} + \\mathbf{\\text{Uncountable Noun}}$$

- 💡 **Nasihat:** *a piece of advice* (1 nasihat) / *two pieces of advice* (2 nasihat).
- 💡 **Informasi:** *a piece of information* (1 info) / *several pieces of information*.
- 💡 **Perabotan:** *an item of furniture* / *three pieces of furniture*.
- 💡 **Koper:** *a piece of luggage* / *two suitcases*.
- 💡 **Peralatan:** *a piece of equipment* / *several items of equipment*.

---

### 4. Tabel Perbandingan Bentuk Salah vs Bentuk Baku

| Kata Benda | ❌ Bentuk Salah (Sering Terjadi) | ✅ Bentuk Baku | 🎯 Cara Menghitung (Unit Countable) |
| :--- | :--- | :--- | :--- |
| **Nasihat** | *an advice, advices* | **advice** | *a piece of advice / some advice* |
| **Informasi** | *an information, informations* | **information** | *a piece of information / lots of info* |
| **PR (Tugas)** | *a homework, homeworks* | **homework** | *an assignment / two assignments* |
| **Perabotan** | *a furniture, furnitures* | **furniture** | *a piece of furniture / items of furniture* |
| **Koper / Bagasi** | *a luggage, luggages* | **luggage** | *a piece of luggage / two suitcases* |
| **Peralatan** | *an equipment, equipments* | **equipment** | *a piece of equipment / pieces of equipment* |
| **Bukti** | *an evidence, evidences* | **evidence** | *a piece of evidence / strong evidence* |
| **Surat / Pos** | *a mail, mails* | **mail** | *a piece of mail / emails / letters* |
| **Pekerjaan** | *a work, works* | **work** | *a job / a task / lots of work* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - **advice, information, furniture, homework, luggage, equipment, evidence, work** → **DILARANG PAKAI -S & DILARANG PAKAI 'A/AN'**.
> - Mau menghitung satuannya? → Gunakan **a piece of / pieces of** (*a piece of advice*, *a piece of information*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['uncountable-nouns', 'non-count-nouns', 'advice', 'information', 'furniture', 'homework', 'luggage', 'equipment', 'common-errors', 'englishvit'],
  },
  {
    id: 'nouns-news-singular-uncountable-rule',
    module: 'Nouns & Determiners',
    title: 'news vs. new (Singular Uncountable Noun & Subject-Verb Agreement)',
    question: '“Did you hear the new about the Kardashians?” (20. Using news without an ‘s’)',
    correction: '“the new about...” -> “the news about the Kardashians?”',
    remarks: `Jawaban yang benar dan baku adalah **"Did you hear the news about the Kardashians?"**

---

### 1. Mengapa "the new" SALAH?

Kata **\`new\`** (tanpa akhiran \`-s\`) adalah **Kata Sifat (*Adjective*)** yang berarti *"baru"* (contoh: *a new laptop, a new car*), bukan kata benda yang berarti *"berita/kabar"*.

> [!IMPORTANT]
> - Kata benda untuk *"berita / kabar / warta peristiwa"* dalam bahasa Inggris adalah **\`news\`** yang **SEJAK DARI AWAL WAJIB DIEJA DENGAN AKHIRAN \`-s\`**.
> - Akhiran \`-s\` pada kata *news* **BUKAN penanda bentuk jamak (*not a plural ending*)**, melainkan bagian asli dari kata benda tunggal tak dapat dihitung (**Singular Uncountable Noun**).

- ❌ **SALAH:** *“Did you hear the **new** about the Kardashians?”*
- ✅ **BENAR:** *“Did you hear the **news** about the Kardashians?”*

---

### 2. Aturan Subject-Verb Agreement untuk "NEWS" (Selalu TUNGGAL / Singular)

Karena kata *news* adalah kata benda tunggal tak dapat dihitung (*singular non-count noun*), kata kerja bantu / predikat yang menyertainya **WAJIB berbentuk TUNGGAL (\`is / was / has / Verb-s\`)**, BUKAN jamak (\`are / were / have\`):

- ❌ **SALAH:** *“The news **are** shocking!”*
- ✅ **BENAR:** *“The news **is** shocking!”*
- ❌ **SALAH:** *“**These** news **were** unexpected.”*
- ✅ **BENAR:** *“**This** news **was** unexpected.”*

---

### 3. Kata Benda Lain yang Berakhiran \`-s\` Tetapi SELALU TUNGGAL (*Singular*)

Selain *news*, banyak kata benda berakhiran \`-s\` yang selalu dipasangkan dengan kata kerja tunggal (*is / was / has*):

| Kategori | Contoh Kata Benda Berakhiran -s | Contoh Kalimat Baku |
| :--- | :--- | :--- |
| **Bidang Studi / Ilmu** | *Physics, Mathematics / Maths, Economics, Politics, Statistics* | *“**Physics is** my favorite subject.”* (Bukan *are*). |
| **Penyakit / Medis** | *Measles, Diabetes, Rabies, Rickets* | *“**Measles is** highly contagious.”* |
| **Olahraga / Permainan** | *Billiards, Darts, Gymnastics, Aerobics* | *“**Gymnastics requires** great flexibility.”* |
| **Informasi Berita** | *News* | *“No **news is** good news.”* |

---

### 4. Cara Menyebutkan Satuan Berita (*Singular & Plural Counters*)

Karena *news* adalah kata benda non-count, kita **DILARANG** mengatakan *"a news"* atau *"two newses"*. Untuk menyebutkan satuannya, gunakan frasa takaran:

- 💡 **1 Buah Berita:** *a piece of news*, *a news story*, *a news report*, *a news article*, *a news item*.
- 💡 **Beberapa Berita:** *three pieces of news*, *two news stories*, *several news reports*.

---

### 5. Tabel Rangkuman Perbandingan

| Kata / Frasa | Kelas Kata & Makna | Pasangan To-Be / Predikat | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **new** | Adjective (*Baru*) | Sesuai kata benda utamanya | *“I bought **new** shoes.”* |
| **news** | Noun (*Berita / Kabar*) | **WAJIB TUNGGAL (is / was / has)** | *“The **news was** broadcast live.”* |
| **a piece of news** | Noun Phrase (1 butir berita) | **Tunggal (is / was)** | *“I have **a great piece of news** for you!”* |
| **news stories** | Noun Phrase (Kisah-kisah berita) | **Jamak (are / were)** | *“There **are** three **news stories** on the front page.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Mau bilang **"berita / kabar"** → **WAJIB pakai -s** (**news**, bukan *new*).
> - *news* selalu dianggap **Tunggal / Singular** → Gunakan **is / was / has** (*The news is good*, *This news was surprising*).
> - Mau sebut satu berita? → Gunakan **a piece of news** atau **a news story** (bukan *a news*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['news', 'nouns', 'uncountable-nouns', 'singular-nouns', 'subject-verb-agreement', 'common-errors', 'englishvit'],
  },
  {
    id: 'prepositions-due-to-vs-because-of-vs-because',
    module: 'Prepositions & Conjunctions',
    title: 'due to & because of + Noun vs. because + Clause',
    question: '“Due to it was a holiday, there weren’t many cars on the road.” (21. Using due to and because of incorrectly)',
    correction: '“Due to it was a holiday...” -> “Due to the holiday...” / “Because of the holiday...” / “Because it was a holiday...”',
    remarks: `Jawaban yang benar dan baku dapat diungkapkan dengan 3 cara berikut:
1. **“Due to the holiday, there weren’t many cars on the road.”**
2. **“Because of the holiday, there weren’t many cars on the road.”**
3. **“Because it was a holiday, there weren’t many cars on the road.”**

---

### 1. Mengapa "Due to it was a holiday" SALAH?

Kunci perbedaannya terletak pada perbedaan antara **Preposisi (Kata Depan)** dan **Konjungsi (Kata Hubung)**:

> [!IMPORTANT]
> - **\`due to\`** dan **\`because of\`** adalah **Preposisi / Frasa Kata Depan**. Sesuai aturan tata bahasa, preposisi **HANYA BOLEH diikuti oleh Kata Benda (*Noun*), Frasa Kata Benda (*Noun Phrase*), atau Gerund (\`V-ing\`)**.
> - **DILARANG KERAS** meletakkan klausa lengkap (**\`Subject + Verb\`**) langsung di belakang *due to* atau *because of*.
> - **\`because\`** adalah **Konjungsi (Kata Hubung)** yang **WAJIB diikuti oleh klausa lengkap (\`Subject + Verb\`)**.

Frasa *“it was a holiday”* memiliki Subjek (*it*) dan Verb (*was*), yang merupakan sebuah **klausa**, bukan kata benda:
- ❌ **SALAH:** *“**Due to it was a holiday**...”*
- ❌ **SALAH:** *“**Because of it was a holiday**...”*
- ✅ **BENAR (Pakai Noun Phrase):** *“**Due to the holiday**, there weren't many cars on the road.”*
- ✅ **BENAR (Pakai Noun Phrase):** *“**Because of the holiday**, there weren't many cars on the road.”*
- ✅ **BENAR (Pakai Conjunction + Clause):** *“**Because it was a holiday**, there weren't many cars on the road.”*

---

### 2. Rincian Rumus & Contoh Penggunaan

#### A. \`because\` → Diikuti Klausa Lengkap (Subject + Verb)
$$\\mathbf{\\text{Because}} + \\mathbf{\\text{Subject}} + \\mathbf{\\text{Verb}} + \\dots$$

- *“We stayed home **because it was raining heavily**.”* *(Subject: it, Verb: was raining).*
- *“He was late **because the traffic was terrible**.”*

#### B. \`because of\` & \`due to\` → Diikuti Kata Benda / Frasa Benda / V-ing
$$\\mathbf{\\text{Because of / Due to}} + \\mathbf{\\text{Noun / Noun Phrase / V-ing}}$$

- *“We stayed home **because of the heavy rain**.”* *(Noun Phrase).*
- *“The flight cancellation was **due to severe turbulence**.”* *(Noun Phrase).*
- *“He succeeded **due to working hard**.”* *(Gerund / V-ing).*

#### C. Trik Khusus: Menggunakan Klausa dengan "Due to the fact that"
Jika Anda tetap ingin menyusun klausa lengkap setelah *due to*, tambahkan frasa **\`the fact that\`**:

$$\\mathbf{\\text{Due to the fact that}} + \\mathbf{\\text{Subject}} + \\mathbf{\\text{Verb}}$$

- *“**Due to the fact that it was a holiday**, the road was very quiet.”*

---

### 3. Tabel Rangkuman Perbandingan

| Kata / Frasa | Kelas Tata Bahasa | Pola yang Mengikuti | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **because** | Subordinating Conjunction | **Klausa (Subject + Verb)** | *“**Because it rained**, the match was stopped.”* |
| **because of** | Preposition | **Noun / Noun Phrase / V-ing** | *“**Because of the rain**, the match was stopped.”* |
| **due to** | Preposition | **Noun / Noun Phrase / V-ing** | *“**Due to the rain**, the match was stopped.”* |
| **owing to / thanks to** | Preposition | **Noun / Noun Phrase / V-ing** | *“**Owing to bad weather**, we postponed the trip.”* |
| **due to the fact that** | Conjunction Phrase | **Klausa (Subject + Verb)** | *“**Due to the fact that it rained**, we stayed home.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Diikuti **Subject + Verb** (Klausa) → Gunakan **because** (*because it was a holiday*).
> - Diikuti **Noun / Frasa Benda** (Tanpa Verb) → Gunakan **due to** atau **because of** (*due to the holiday* / *because of the holiday*).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['prepositions', 'conjunctions', 'due-to', 'because-of', 'because', 'cause-and-effect', 'common-errors', 'englishvit'],
  },
  {
    id: 'prepositions-despite-vs-in-spite-of-vs-although',
    module: 'Prepositions & Conjunctions',
    title: 'despite & in spite of + Noun/V-ing vs. although/even though + Clause',
    question: '“In spite of she grew up poor, Melanie became a successful entrepreneur.” (22. Using despite and in spite of incorrectly)',
    correction: '“In spite of she grew up poor...” -> “In spite of growing up poor...” / “Despite growing up poor...” / “Although she grew up poor...”',
    remarks: `Jawaban yang benar dan baku dapat diungkapkan dengan beberapa cara berikut:
1. **“In spite of growing up poor, Melanie became a successful entrepreneur.”** *(Menggunakan Gerund)*
2. **“Despite growing up poor, Melanie became a successful entrepreneur.”** *(Menggunakan Gerund)*
3. **“Although she grew up poor, Melanie became a successful entrepreneur.”** *(Menggunakan Klausa)*
4. **“Even though she grew up poor, Melanie became a successful entrepreneur.”** *(Menggunakan Klausa)*

---

### 1. Mengapa "In spite of she grew up poor" SALAH?

Kunci perbedaannya terletak pada perbedaan kelas kata antara **Preposisi (Kata Depan)** vs **Konjungsi (Kata Hubung)**:

> [!IMPORTANT]
> - **\`despite\`** dan **\`in spite of\`** adalah **Preposisi / Frasa Kata Depan**. Preposisi **HANYA BOLEH diikuti oleh Kata Benda (*Noun*), Frasa Benda (*Noun Phrase*), atau Gerund (\`V-ing\`)**.
> - **DILARANG KERAS** meletakkan klausa lengkap (**\`Subject + Verb\`**) langsung di belakang *despite* atau *in spite of*.
> - **\`although\`**, **\`even though\`**, dan **\`though\`** adalah **Konjungsi (Kata Hubung)** yang **WAJIB diikuti oleh klausa lengkap (\`Subject + Verb\`)**.

Frasa *“she grew up poor”* memiliki Subjek (*she*) dan Verb (*grew up*), yang merupakan sebuah **klausa**:
- ❌ **SALAH:** *“**In spite of she grew up poor**...”*
- ❌ **SALAH:** *“**Despite she grew up poor**...”*
- ✅ **BENAR (Gunakan Gerund V-ing):** *“**In spite of growing up poor**, Melanie became a successful entrepreneur.”*
- ✅ **BENAR (Gunakan Gerund V-ing):** *“**Despite growing up poor**, Melanie became a successful entrepreneur.”*
- ✅ **BENAR (Gunakan Noun Phrase):** *“**In spite of her poverty**, Melanie became a successful entrepreneur.”*
- ✅ **BENAR (Gunakan Conjunction + Klausa):** *“**Although she grew up poor**, Melanie became a successful entrepreneur.”*

---

### 2. Kesalahan Ejaan Umum: "despite of" (SALAH!) vs. "in spite of" (BENAR!)

Banyak pembelajar sering mencampuradukkan kedua bentuk ini:
- ❌ **SALAH BESAR:** *“despite of the rain”* → Kata **\`despite\` TIDAK PERNAH memakai kata "of"**!
- ✅ **BENAR (1 kata tanpa of):** *“**despite** the rain”*
- ✅ **BENAR (3 kata dengan of):** *“**in spite of** the rain”*

---

### 3. Rincian Rumus & Contoh Penggunaan

#### A. \`despite\` & \`in spite of\` → Diikuti Noun Phrase / Gerund (V-ing)
$$\\mathbf{\\text{Despite / In spite of}} + \\mathbf{\\text{Noun / Noun Phrase / V-ing}}$$

- *“**Despite the heavy rain**, the outdoor concert continued.”* *(Noun Phrase).*
- *“**In spite of working overtime**, he didn't feel exhausted.”* *(Gerund / V-ing).*

#### B. \`although\` & \`even though\` → Diikuti Klausa Lengkap (Subject + Verb)
$$\\mathbf{\\text{Although / Even though}} + \\mathbf{\\text{Subject}} + \\mathbf{\\text{Verb}} + \\dots$$

- *“**Although it rained heavily**, the concert continued.”* *(Subject: it, Verb: rained).*
- *“**Even though he worked overtime**, he didn't feel exhausted.”*

#### C. Trik Khusus: Menggunakan Klausa dengan "the fact that"
$$\\mathbf{\\text{Despite / In spite of the fact that}} + \\mathbf{\\text{Subject}} + \\mathbf{\\text{Verb}}$$

- *“**Despite the fact that she grew up poor**, Melanie became a successful entrepreneur.”*

---

### 4. Tabel Rangkuman Perbandingan

| Kata / Frasa Kontras | Jenis Tata Bahasa | Pola yang Mengikuti | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **despite** | Preposition | **Noun / Noun Phrase / V-ing** | *“**Despite the rain**, we went out.”* *(Tanpa of!).* |
| **in spite of** | Preposition Phrase | **Noun / Noun Phrase / V-ing** | *“**In spite of the rain**, we went out.”* |
| **although** | Subordinating Conjunction | **Klausa (Subject + Verb)** | *“**Although it rained**, we went out.”* |
| **even though** | Subordinating Conjunction | **Klausa (Subject + Verb)** | *“**Even though it was raining**, we went out.”* |
| **despite the fact that** | Conjunction Phrase | **Klausa (Subject + Verb)** | *“**Despite the fact that it rained**, we went out.”* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Diikuti **Subject + Verb** (Klausa) → Gunakan **although / even though** (*although she was poor*).
> - Diikuti **Noun / V-ing** (Tanpa Verb utama) → Gunakan **despite** atau **in spite of** (*despite growing up poor*).
> - Ingat: **despite** (tanpa of) vs **in spite of** (pakai of).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['prepositions', 'conjunctions', 'despite', 'in-spite-of', 'although', 'even-though', 'contrast', 'common-errors', 'englishvit'],
  },
  {
    id: 'verbs-transitive-discuss-no-preposition',
    module: 'Verbs & Prepositions',
    title: 'discuss [object] vs. talk about [object] (Zero-Preposition Transitive Verbs)',
    question: '“We discussed about adding additional security measures.” (23. Using the preposition about after the verb discuss)',
    correction: '“discussed about adding...” -> “discussed adding additional security measures”',
    remarks: `Jawaban yang benar dan baku adalah **"We discussed adding additional security measures."**

---

### 1. Mengapa "discussed about" SALAH?

Di dalam bahasa Indonesia kita terbiasa mengucapkan *"berdiskusi **tentang** sesuatu"*. Namun, dalam tata bahasa Inggris baku:

> [!IMPORTANT]
> - Kata kerja **\`DISCUSS\`** adalah **Kata Kerja Transitif Murni (*Transitive Verb*)**.
> - Kata kerja transitif **WAJIB langsung terhubung ke Objek Langsung (*Direct Object*) TANPA disisipi preposisi apa pun (termasuk kata "about")**:
>   $$\\mathbf{\\text{Subject}} + \\mathbf{\\text{discuss / discussed}} + \\mathbf{\\text{Direct Object (Noun / V-ing)}} \\quad (\\text{DILARANG PAKAI \"about\"!})$$
> - Makna kata *discuss* sendiri sudah mencakup arti *“to talk **about** something”*, sehingga menambahkan kata *about* setelah *discuss* adalah redundan (*mubazir / pleonasme*).

- ❌ **SALAH:** *“We discussed **about** adding additional security measures.”*
- ❌ **SALAH:** *“Let's discuss **about** the new marketing budget.”*
- ✅ **BENAR:** *“We discussed **adding additional security measures**.”*
- ✅ **BENAR:** *“Let's discuss **the new marketing budget**.”*

---

### 2. Kapan Kata "About" BOLEH Digunakan?

Kata *about* sah digunakan jika Anda menggunakan kata kerja intransitif seperti **\`talk\`**, **\`argue\`**, **\`chat\`**, atau ketika menggunakan bentuk kata benda (**\`discussion\`**):

- ✅ **Kata Kerja "Talk":** *“We **talked about** adding additional security measures.”*
- ✅ **Kata Kerja "Argue":** *“They **argued about** the contract terms.”*
- ✅ **Kata Benda "Discussion":** *“We had a productive **discussion about** the project.”* *(Sebagai Noun, frasa 'discussion about' 100% benar).*

---

### 3. Daftar Kata Kerja Transitif Bebas Preposisi (*Zero-Preposition Verbs*)

Banyak kata kerja bahasa Inggris yang sering salah disisipi preposisi karena pengaruh terjemahan bahasa Indonesia:

| Kata Kerja | ❌ Kesalahan Umum (Salah Preposisi) | ✅ Bentuk Baku (Langsung Objek) | Contoh Kalimat Benar |
| :--- | :--- | :--- | :--- |
| **discuss** | *discuss about the plan* | **discuss [something]** | *“We **discussed the plan**.”* |
| **mention** | *mention about the issue* | **mention [something]** | *“She **mentioned the issue** earlier.”* |
| **reach** | *reach to / at the airport* | **reach [a destination]** | *“We **reached the airport** on time.”* |
| **enter** | *enter into the room* | **enter [a place]** | *“He **entered the room** quietly.”* |
| **marry** | *marry with someone* | **marry [someone]** | *“He **married Sarah** last year.”* |
| **contact** | *contact to our support* | **contact [someone]** | *“Please **contact our support team**.”* |
| **attend** | *attend to the meeting* | **attend [an event]** | *“I will **attend the meeting**.”* |
| **emphasize** | *emphasize on the quality* | **emphasize [something]** | *“The CEO **emphasized the quality**.”* |
| **approach** | *approach to the building* | **approach [something]** | *“The car is **approaching the building**.”* |

---

### 4. Tabel Rangkuman Perbandingan

| Pola Kalimat | Status Preposisi | Contoh Kalimat Benar |
| :--- | :--- | :--- |
| **discuss + [Object]** | **TANPA preposisi** (Langsung objek) | *Let's **discuss the proposal**.* |
| **talk about + [Object]** | **Pakai preposisi "about"** | *Let's **talk about the proposal**.* |
| **have a discussion about** | **Pakai preposisi "about"** (Bentuk Noun) | *We had a **discussion about the proposal**.* |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Gunakan **discuss** → **DILARANG pakai about** (*Let's **discuss the plan***).
> - Mau pakai **about**? → Gunakan **talk about** (*Let's **talk about the plan***) atau **a discussion about** (*We had **a discussion about the plan***).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Chapter 11: You are About to be Promoted',
    createdAt: '2026-09-02',
    tags: ['verbs', 'transitive-verbs', 'prepositions', 'discuss', 'talk-about', 'zero-preposition', 'common-errors', 'englishvit'],
  },
];

/**
 * Utility functions to access mapping data
 */
export function getAllMappings(): MappingItem[] {
  return [...MAPPING_ITEMS].reverse();
}

export function getModules(): string[] {
  const modules = Array.from(new Set(MAPPING_ITEMS.map((item) => item.module)));
  return modules.sort();
}

export function getMappingById(id: string): MappingItem | undefined {
  return MAPPING_ITEMS.find((item) => item.id === id);
}

export function getMappingsByModule(moduleName: string): MappingItem[] {
  return [...MAPPING_ITEMS].reverse().filter((item) => item.module === moduleName);
}
