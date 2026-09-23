# Pedoman Baku Pengayaan & Standar Emas Flashcard (FLASHCARD_RULES.md)

Dokumen ini merupakan pedoman standar operasional resmi (*standard operating procedure*) untuk seluruh kontributor (rekayasawan perangkat lunak maupun Agen AI seperti Antigravity) dalam menyusun, memperkaya, dan memelihara data kartu kosakata (*flashcards*) pada repositori ini.

---

## 🎯 Filosofi & Prinsip Dasar

1. **Active Recall Murni pada Pertanyaan (`question`)**:
   - Judul pertanyaan kartu harus **bersih dan ringkas** (hanya kata atau frasa intinya, misal: `"Analyse"`, `"Adore"`, `"Swing"`, `"Devastating"`).
   - **DILARANG** menaruh bocoran seperti transkripsi fonetik (IPA), sublist AWL, atau kelas kata di judul pertanyaan. Pembelajar harus berusaha mengingat makna dan bentuknya dari memori aktif terlebih dahulu.
2. **Deskripsi Mendalam Dwi-Bahasa pada Jawaban (`answer`)**:
   - Berfungsi sebagai penjelasan utama (*description*) yang langsung menjawab makna kata secara tuntas.
   - Menggabungkan penjelasan bahasa Indonesia yang kontekstual dan definisi bahasa Inggris formal berstandar kamus akademis.
3. **Struktur Rumpun Kata Lengkap (*Word Family Matrix*)**:
   - Setiap kata harus dipetakan ke seluruh rumpun gramatikanya:
     - **Verbs**: V1 (Base), V2 (Past), V3 (Participle), -ing (Gerund/Present Participle), 3rd person singular.
     - **Nouns**: Bentuk singular, plural, nomina agen/pelaku (*-er, -or, -ist*), serta nomina konsep/proses (*-tion, -ment, -ity*).
     - **Adjectives**: Bentuk adjektiva turunan (*-ive, -able, -al, -ic, -ed, -ing*).
     - **Adverbs**: Bentuk keterangan (*-ly*).
4. **Persiapan Akademis IELTS Band 8.0+**:
   - Menyertakan **Kolokasi Emas IELTS** (*Academic Collocations*) yang lazim digunakan penutur asli tingkat lanjut.
   - Menyertakan **Transformasi Kalimat** kontras antara Bahasa Sehari-hari (Band 5.0–6.0) dan Bahasa Akademis IELTS Writing Task 2 (Band 8.0+).
5. **Dukungan Audio & Pencarian pada Setiap Dynamic Field**:
   - Setiap field dinamis di UI dilengkapi kontrol Audio TTS (Web Speech API) dan tombol Pencarian Google (Search Template).
   - Bentuk kata dalam rumpun dan butir kolokasi dapat didengarkan atau dicari satu per satu secara interaktif.

---

## 📋 Skema & Struktur Baku Flashcard

Setiap objek flashcard di `src/data/flashcards/flashcards.json` wajib mematuhi kontrak berikut:

```typescript
export interface Flashcard {
  _id: string;                         // 24 karakter hexadesimal unik deterministik
  question: string;                    // Bersih & ringkas: kata atau frasa inti
  answer: string;                      // Markdown definisi bahasa Indonesia + Inggris
  progression: Progression;            // 'new' | 'retry' | 'hard' | 'normal' | 'good' | 'perfect'
  nextReviewDate: Date | string;       // ISO Date string
  categories: string[];                // ID kategori dari categories.json
  dynamicFields: Record<string, string>; // Metadata kaya dan terstruktur
}
```

---

## 💎 Format Baku Konten Flashcard

### 1. `question`
```text
Analyse
```
*(Cukup kata atau frasa dasar. Tanpa kurung buka IPA atau kelas kata).*

---

### 2. `answer` (Definisi & Makna / Description)
```markdown
### Definisi & Makna
**Menganalisis**, memeriksa secara mendalam bagian-bagian penyusun suatu data, teks, atau fenomena untuk menjelaskan dan menafsirkannya.

> *"To examine something methodically and in detail in order to explain and interpret it."*
```

---

### 3. `dynamicFields` (Metadata Lengkap)

| Nama Field Dynamic | Isi & Format Standar | Contoh Nilai |
| :--- | :--- | :--- |
| `Part of Speech` | Kelas kata utama & klasifikasi | `Verb \| AWL Sublist 1` atau `Transitive Regular Verb` |
| `Pronunciation (IPA)` | Transkripsi IPA & panduan lafal | `/ˈæn.əl.aɪz/ (US: /ˈæn.əl.aɪz/) — Tekanan pada suku kata pertama 'an'! |
| `Verbs (Kata Kerja)` | Konjugasi V1, V2, V3, -ing | `analyse (V1/Base), analyses (3rd person), analysed (V2/Past), analysed (V3/Participle), analysing (-ing/Gerund)` |
| `Nouns (Kata Benda)` | Nomina tunggal, jamak, agen | `analysis (singular), analyses (plural), analyst (analis/pelaku), analysts (pl.)` |
| `Adjectives (Kata Sifat)` | Adjektiva turunan | `analytic, analytical, unanalysed` |
| `Adverbs (Kata Keterangan)` | Adverbia turunan | `analytically` |
| `Pergeseran Penekanan Nada (Stress Shift)` | Transisi nada antar rumpun | `a-na-lyse (/ˈæn.əl.aɪz/) ➔ a-NA-ly-sis (/əˈnæl.ə.sɪs/) ➔ a-na-LY-ti-cal (/ˌæn.əlˈɪt.ɪ.kəl/)` |
| `Kolokasi Emas IELTS` | Bullet points kolokasi | `• conduct / carry out an in-depth analysis of\n• critical analysis\n• statistical analysis\n• financial analyst` |
| `Transformasi Kalimat: Bahasa Sehari-hari vs IELTS Band 8+` | Perbandingan kalimat kontras | `❌ **Bahasa Sehari-hari (Band 5.0–6.0)**:\nWe looked at the numbers carefully to see what they mean.\n\n✅ **Academic IELTS Writing Task 2 (Band 8.0+)**:\nResearchers conducted a comprehensive statistical analysis to discern underlying behavioural trends.` |
| `Tips Mengingat` | Mnemonik & etimologi | `Akar Yunani 'analusis' (mengurai/membedah). Lawan dari sintetis (menyatukan).` |

*(Catatan: Untuk kata yang tidak memiliki bentuk verba atau adverbia tertentu, gunakan tanda `—` atau cantumkan bentuk yang relevan).*

---

## 🗂️ Resolusi Kategori Baku (`categories.json`)

Setiap kartu wajib dikaitkan dengan ID kategori yang relevan:
- **`6901a0010000000000000010`**: Academic Word List (AWL)
- **`6886ee8e75b4418c47a47d9b`**: Regular Verbs
- **`68863c76d911399cd3fb3a4c`**: Irregular Verbs
- **`6901a0010000000000000009`**: Irregular Plurals & Nouns
- **`68fdd9f899ff8264aaa016ad`**: Idioms & Figurative Expressions
- **`6901a0010000000000000008`**: General Vocabulary & Concepts
- **`6901a0010000000000000006`**: Work, Career & Technology
- **`6901a0010000000000000002`**: Health, Body & Personal Care
- **`6901a0010000000000000003`**: Nature, Animals & Environment
- **`6901a0010000000000000005`**: Travel, Transport & Places
- **`6901a0010000000000000004`**: Food, Drinks & Culinary
- **`6901a0010000000000000001`**: Daily Objects, Clothing & Home
- **`6901a0010000000000000007`**: Action Verbs & Expressions

---

## 🔄 Protokol Pembaruan & Penambahan Bertahap (*Batch Protocol*)

1. **Pemeriksaan Duplikasi Terlebih Dahulu**: Lakukan pencarian kata di `flashcards.json`. Jika sudah ada, perbarui (*enrich/update*); jangan membuat duplikasi.
2. **Lengkapi Seluruh Rumpun Kata**: Pastikan V1, V2, V3, -ing terisi untuk verba, serta nomina, adjektiva, dan adverbia yang ada di kamus standar.
3. **Format Kalimat Transformasi yang Membumi vs Akademis**: Kalimat Band 5 harus terdengar seperti percakapan santai sehari-hari, sedangkan kalimat Band 8+ harus memakai struktur leksikal IELTS Writing Task 2 yang kohesif.
4. **Pembaruan Tracker**: Segera perbarui status kartu di `FLASHCARD_PROGRESS_TRACKER.md` setelah melakukan commit data.
5. **Kebijakan Git Commit**:
   - Data & docs (`flashcards.json`, `FLASHCARD_RULES.md`, `FLASHCARD_PROGRESS_TRACKER.md`): Boleh di-commit otomatis.
   - Kode aplikasi (`src/components/`, `src/app/`, `src/hooks/`): **DILARANG AUTO-COMMIT**, serahkan kepada pengguna untuk ditinjau.
