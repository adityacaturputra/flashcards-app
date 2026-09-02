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
