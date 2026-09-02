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

$$\\mathbf{\\text{IN (Paling Luas/Umum)}} \\longrightarrow \\mathbf{\\text{ON (Lebih Spesifik/1 Hari)}} \\longrightarrow \\mathbf{\\text{AT (Paling Sempit/Titik Jam)}}$$

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

### 1. Aturan Dasar: General Preference vs Specific Preference

Dalam bahasa Inggris, cara menyatakan kesukaan (*preference*) dibedakan menjadi dua konteks:

1. **General Preference (Kebiasaan / Kesukaan Umum):**
   - Menggunakan kata kerja dasar **\`prefer\`** (diikuti Gerund *V-ing* atau *Noun*):
   - ✅ *“In general, I **prefer staying** at home when it rains.”* (Secara umum kalau hujan saya lebih suka di rumah).
   - ✅ *“I **prefer** tea **to** coffee.”*

2. **Specific Preference (Pilihan pada Situasi / Momen Spesifik Saat Ini, contohnya ada kata "Today"):**
   - Ketika menyatakan pilihan pada situasi spesifik hari ini (*Today... because it is raining*), kita **WAJIB menggunakan modal \`would\` (\`'d\`)**:
   - **Opsi A (\`would rather\`):** $\\mathbf{\\text{would rather}} + \\mathbf{\\text{Bare Infinitive (V1 tanpa to)}}$
     - ✅ *“Today **I'd rather stay** at home because it is raining.”*
   - **Opsi B (\`would prefer\`):** $\\mathbf{\\text{would prefer}} + \\mathbf{\\text{to-Infinitive (to + V1)}}$
     - ✅ *“Today **I'd prefer to stay** at home because it is raining.”*

---

### 2. Perbedaan Bentuk Kata Kerja: "Would Rather" vs "Would Prefer"

Perhatikan pasangan bentuk kata kerja setelahnya:

| Bentuk Preferensi | Pola Kata Kerja | Contoh Kalimat Benar | Contoh Salah |
| :--- | :--- | :--- | :--- |
| **would rather** | **+ V1 (Bare Infinitive)** | *“I'd rather **stay** home.”* | ❌ *“I'd rather to stay home.”* |
| **would prefer** | **+ to + V1 (to-Infinitive)** | *“I'd prefer **to stay** home.”* | ❌ *“I'd prefer stay home.”* |
| **prefer (general)** | **+ V-ing / Noun** | *“I prefer **staying** home.”* | ❌ *“Today I prefer to stay...”* |

---

### 3. Perbandingan Saat Membandingkan Dua Hal (*Comparison*)

Perhatikan kata penghubung perbandingannya:

- **would rather ... THAN ...:**
  - ✅ *“I'd rather **stay** at home **than go** out in the rain.”*
- **would prefer ... RATHER THAN ...:**
  - ✅ *“I'd prefer **to stay** at home **rather than go** out in the rain.”*
- **prefer ... TO ...:**
  - ✅ *“I prefer **staying** at home **to going** out.”*

---

### 4. Analisis Pilihan Soal

| Pilihan Jawaban | Status | Penjelasan |
| :--- | :--- | :--- |
| **A:** *“Today I'd rather stay at home...”* | ✅ **BENAR** | Pola baku \`would rather + V1\` untuk situasi spesifik hari ini. |
| **B:** *“Today I'd prefer to stay at home...”* | ✅ **BENAR** | Pola baku \`would prefer + to V1\` untuk situasi spesifik hari ini. |
| **C:** *“A and B both are correct.”* | 🏆 **JAWABAN TEPAT** | Karena opsi A dan B sama-sama sah dan alami. |
| **D:** *“A and B both are incorrect.”* | ❌ Salah | Karena opsi A dan B valid. |

---

> [!TIP]
> **Kunci Ingatan Cepat:**
> - Ada situasi spesifik (*Today / right now*) → Gunakan **'d rather** atau **'d prefer**.
> - **'d rather** $\rightarrow$ langsung kata kerja V1 (*I'd rather **stay***).
> - **'d prefer** $\rightarrow$ wajib pakai to (*I'd prefer **to stay***).
`,
    source: 'Englishvit - English Pro Class',
    chapter: 'Expressing Preferences: Prefer, Would Prefer, Would Rather',
    createdAt: '2026-09-02',
    tags: ['preferences', 'would-rather', 'would-prefer', 'prefer', 'modals', 'englishvit'],
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
