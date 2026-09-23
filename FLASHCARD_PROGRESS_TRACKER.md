# Dashboard Pelacak Progres Pengayaan Flashcard (FLASHCARD_PROGRESS_TRACKER.md)

Dokumen ini melacak status pengayaan bertahap (*batching progress*) seluruh flashcard di repositori (`src/data/flashcards/flashcards.json`) menuju **Standar Emas Rumpun Kata & IELTS Band 8+** sesuai pedoman [FLASHCARD_RULES.md](./FLASHCARD_RULES.md).

---

## 📊 Ringkasan Statistik Global

| Metrik | Angka Saat Ini | Target Total | Persentase |
| :--- | :--- | :--- | :--- |
| **Total Kartu di Repositori** | 3.478 | 3.478 | 100% |
| **Kartu Standar Emas Lengkap** | 40 | 3.478 | Sedang Berjalan (Batch 2) |
| **Kartu Format Minimal (Legacy)** | 3.438 | 0 | 98.8% |
| **Jumlah Kategori Terdaftar** | 13 Kategori | 13 Kategori | 100% |

---

## 🗂️ Rincian Distribusi Per Kategori

| No | Kategori | ID Kategori | Total Kartu | Status Progres |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **Regular Verbs** | `6886ee8e75b4418c47a47d9b` | 164 | 🟡 Batch 2 (In Progress - 16 Enriched) |
| 2 | **Irregular Verbs** | `68863c76d911399cd3fb3a4c` | 138 | 🟡 Batch 2 (In Progress - 15 Enriched) |
| 3 | **Academic Word List (AWL)** | `6901a0010000000000000010` | 570* | 🟡 Batch 2 (In Progress - 9 Enriched) |
| 4 | **Irregular Plurals & Nouns** | `6901a0010000000000000009` | 20 | 🟢 20 Selesai (Format Lengkap) |
| 5 | **Action Verbs & Expressions** | `6901a0010000000000000007` | 53 | ⚪ Antrean Batch 3 |
| 6 | **Work, Career & Technology** | `6901a0010000000000000006` | 78 | ⚪ Antrean Batch 3 |
| 7 | **General Vocabulary & Concepts** | `6901a0010000000000000008` | 748 | ⚪ Antrean Batch 4 |
| 8 | **Health, Body & Personal Care** | `6901a0010000000000000002` | 282 | ⚪ Antrean Batch 5 |
| 9 | **Nature, Animals & Environment** | `6901a0010000000000000003` | 217 | ⚪ Antrean Batch 5 |
| 10 | **Travel, Transport & Places** | `6901a0010000000000000005` | 179 | ⚪ Antrean Batch 6 |
| 11 | **Food, Drinks & Culinary** | `6901a0010000000000000004` | 142 | ⚪ Antrean Batch 6 |
| 12 | **Daily Objects, Clothing & Home** | `6901a0010000000000000001` | 118 | ⚪ Antrean Batch 6 |
| 13 | **Idioms & Figurative Expressions** | `68fdd9f899ff8264aaa016ad` | 1.354 | ⚪ Antrean Batch 7 |

*\*Catatan: Database AWL memiliki 570 kepala keluarga kata di `src/data/awl/awlWords.json` yang secara bertahap disinkronkan ke `flashcards.json`.*

---

## 🚀 Rencana Batching Bertahap (Milestone Roadmap)

### 📌 Batch 1: Prioritas Tertinggi (10/10 Selesai 🟢)
- [x] `Analyse` (AWL Sublist 1 · Transitive Verb) — `6903a001000048e9a26511e0`
- [x] `Adore` (Regular Verb) — `6886eed375b4418c47a47d9d`
- [x] `Absorb` (Regular Verb) — `6886eed375b4418c47a47d9f`
- [x] `Explain` (Regular Verb) — `6886eed375b4418c47a47da1`
- [x] `Capture` (Regular Verb) — `6886eedaa18bebb306a591bc`
- [x] `Escape` (Regular Verb) — `6886eedbe02b61887a6f7b11`
- [x] `Swing` (Irregular Verb) — `6886e6b81f84f9a640adcfdd`
- [x] `Cling` (Irregular Verb) — `6886e6bf6cba8a0a6d2ded54`
- [x] `Forgive` (Irregular Verb) — `6886e6bfb4837142be048d03`
- [x] `Burn` (Irregular/Regular Verb) — `6886e6bffdcf6d12eb1bf886`

---

### 📌 Batch 2: Verba Reguler, Ireguler & Kata Kunci AWL Lanjutan (Sedang Berjalan 🟡)
- **Target**: Memperkaya verba-verba inti dan kata akademis AWL frekuensi tinggi.
- **Bagian 1 (10 Selesai 🟢)**:
  - [x] `Approach` (AWL Sublist 1 · Noun/Verb) — `6903a00100003b0d463d1a40`
  - [x] `Assess` (AWL Sublist 1 · Transitive Verb) — `6903a001000078d1f2b69411`
  - [x] `Defend` (Regular Verb) — `6886eedb5b0359ae35ad50dd`
  - [x] `Apply` (Regular Verb) — `6886eedb0a8d109db1847407`
  - [x] `Conduct` (Regular Verb) — `6886eedc3ec1c8c5958f9546`
  - [x] `Calculate` (Regular Verb) — `6886eedb7b455ee47da781e3`
  - [x] `Supply` (Regular Verb) — `6886eedba4c9e9aae1b82e6e`
  - [x] `Catch` (Irregular Verb) — `6886e6c0f1fa135d72d68218`
  - [x] `Shake` (Irregular Verb) — `6886e6bff9eb9b73b40ed878`
  - [x] `Break` (Irregular Verb) — `6886e6bf824614ced017594b`
- **Bagian 2 (10 Selesai 🟢)**:
  - [x] `Assume` (AWL Sublist 1 · Transitive Verb) — `6903a00100005a1d7f8c2b31`
  - [x] `Benefit` (AWL Sublist 1 · Verb & Noun) — `6903a00100008f4b1e9c7a22`
  - [x] `Consist` (AWL Sublist 1 · Intransitive Verb) — `6903a00100009c2a3e5f1d88`
  - [x] `Question` (Regular Verb) — `6886eed475b4418c47a47da5`
  - [x] `Change` (Regular Verb) — `6886eedb1b76959ea75ab794`
  - [x] `Answer` (Regular Verb) — `6886eedb169517916bebdb23`
  - [x] `Come` (Irregular Verb) — `6886e6bf4ddb3b1e729f3491`
  - [x] `Sleep` (Irregular Verb) — `6886e6bf16b5218474c37c14`
  - [x] `Do` (Irregular Verb) — `6886e6bf78f846706f3c30b8`
  - [x] `Wed` (Irregular/Regular Verb) — `6886e6bfe87f1fe5afee4d3e`
- **Bagian 3 (10 Selesai 🟢)**:
  - [x] `Create` (AWL Sublist 1 · Transitive Verb) — `6903a00100002d4e8c1b9a71`
  - [x] `Establish` (AWL Sublist 1 · Transitive Verb) — `6903a00100006c3e9a4d8b12`
  - [x] `Derive` (AWL Sublist 1 · Verb) — `6903a00100007e2c4b8d1f93`
  - [x] `Abate` (Regular Verb) — `6886eedbf2a88993273c5d15`
  - [x] `Accept` (Regular Verb) — `6886eedb1c66e1767885dbe1`
  - [x] `Refresh` (Regular Verb) — `6886eedba3cd00c611c2462b`
  - [x] `Hide` (Irregular Verb) — `6886e6c0495a5b968b4541db`
  - [x] `Mistake` (Irregular Verb) — `6886e6c078864fba63a7c69f`
  - [x] `Shine` (Irregular/Regular Verb) — `6886e6bf2f4eb71c535d5170`
  - [x] `Be` (Irregular Verb) — `6886e6b81f84f9a640adcfdb`
- **Bagian 4 (10 Kartu - Segera 🟡)**:
  - [ ] `Constitute` (AWL Sublist 1)
  - [ ] `Distribute` (AWL Sublist 1)
  - [ ] `Economy` (AWL Sublist 1)
  - [ ] `Dry` (Regular Verb)
  - [ ] `Kill` (Regular Verb)
  - [ ] `Adopt` (Regular Verb)
  - [ ] `Whisper` (Regular Verb)
  - [ ] `Kneel` (Irregular Verb)
  - [ ] `Bite` (Irregular Verb)
  - [ ] `Blow` (Irregular Verb)

### 📌 Batch 3: AWL Sublist 1 & 2 (120 Kata)
- Mengintegrasikan kata-kata akademis seperti `Approach`, `Area`, `Assess`, `Assume`, `Authority`, dll.

### 📌 Batch 4: General Vocabulary (748 Kartu)
- Mengonversi kosakata umum ke format standar emas dengan rumpun kata lengkap.

### 📌 Batch 5: Tematik Khusus (Health, Tech, Nature - 577 Kartu)
- Kosakata medis, anatomi tubuh, teknologi, karir, dan lingkungan hidup.

### 📌 Batch 6: Tematik Harian (Travel, Food, Objects - 439 Kartu)
- Transportasi, kuliner, pakaian, dan perlengkapan rumah.

### 📌 Batch 7: Idioms & Expressions (1.354 Kartu)
- Idiom dan frasa kiasan bahasa Inggris dengan padanan formal akademis.
