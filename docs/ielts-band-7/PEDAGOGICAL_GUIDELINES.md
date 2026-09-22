# 📘 Pedoman Standar Penyusunan Materi Buku Ajar IELTS Band 7+
## (*IELTS Band 7+ Comprehensive Textbook & Pedagogical Guidelines*)

Dokumen ini menetapkan standar arsitektur konten resmi untuk seluruh modul pembelajaran IELTS di dalam repositori ini. Standar ini disusun untuk menjamin bahwa materi yang dihasilkan bukan sekadar catatan ringkas (*brief summary*), dan bukan pula salinan transkrip lisan mentah (*raw spoken transcript*), melainkan sebuah **buku ajar komprehensif (*master study handbook*)** yang mandiri, mendalam, dan siap dipelajari tanpa harus menonton rekaman video.

---

## 🎯 1. Filosofi Inti: Dari "Menonton Video" Menjadi "Membaca Buku Teks"

| Format Tradisional Video / Transkrip | Format Catatan Ringkas (Rangkuman) | 🌟 Standar Buku Ajar Kami (*Comprehensive Textbook*) |
| :--- | :--- | :--- |
| **Banyak *filler words*** ("uhm", "well", "now let's see"). | Terlalu padat, poin-poin penting hilang atau tidak dijelaskan alasannya. | **Bahasa akademis jernih & terstruktur**, padat esensi edukatif. |
| Linier dan lambat (menghabiskan waktu menonton berjam-jam). | Kurang contoh konkret dan minim bedah logika jebakan. | **Modular, cepat dipindai (*scannable*)**, dilengkapi tabel perbandingan & diagram alur. |
| Salinan transkrip sulit dijadikan bahan referensi cepat. | Siswa tidak memahami *bagaimana* trik dieksekusi langkah-demi-langkah. | **Analisis komprehensif** mencakup teori, taktik, jebakan, bedah soal Cambridge, dan latihan mandiri. |

---

## 🏛️ 2. Enam Pilar Anatomi Setiap Bab (*The 6 Pedagogical Pillars*)

Setiap file materi (`*.md`) di dalam direktori `docs/ielts-band-7/` wajib mengimplementasikan struktur 6 pilar berikut:

### Pilar 1: Metadata & Gambaran Konseptual (*Executive Concept & Purpose*)
* **Tabel Metadata Resmi**: Nomor modul, nomor kuliah Udemy, estimasi waktu baca, fokus materi, dan target band score.
* **Landasan Teori Penguji**: Mengapa Cambridge / IDP menguji keterampilan ini? Apa yang sebenarnya diukur oleh penguji di balik format soal tersebut?

### Pilar 2: Kerangka Kerja Taktis Bertahap (*Step-by-Step Tactical Framework*)
Menyajikan metodologi operasional yang dapat dieksekusi secara nyata oleh pembelajar.
* **Tahap 1: Pra-Pengerjaan (*Pre-Listening / Pre-Reading Analysis*)**:
  - Teknik membaca instruksi dan batas kata (*word count limits*).
  - Prediksi kelas kata (*Part of Speech*: noun, verb, adjective, number, date).
  - Menandai kata kunci pemicu (*trigger keywords*).
* **Tahap 2: Saat Audio Berjalan (*Active Real-Time Tracking*)**:
  - Sinkronisasi mata (*eye tracking*) dan tangan (*simultaneous writing*).
  - Melacak penanda wacana (*signposting language*) untuk navigasi antar nomor.
* **Tahap 3: Pasca-Pengerjaan (*Post-Listening Audit*)**:
  - Memeriksa kesesuaian tata bahasa (*subject-verb agreement, singular vs plural*).
  - Memeriksa kebenaran ejaan (*orthographic accuracy*).

### Pilar 3: Anatomi Distraktor & Mekanisme Jebakan (*Trap & Distractor Mechanics*)
Bagian paling krusial untuk menembus Band 7.0+. Setiap bab wajib membedah pola jebakan yang sengaja dipasang penguji:
* **Jebakan Koreksi Diri (*Self-Correction Trap*)**: Pembicara menyebutkan opsi A, lalu mengoreksi diri sendiri (*"Actually, wait, let me check... no, it's B"*).
* **Jebakan Pernyataan Bersyarat (*Conditional / Qualifying Trap*)**: Pembicara menyetujui opsi A tetapi dengan syarat tertentu yang ternyata tidak terpenuhi (*"We could, provided that..."*).
* **Jebakan Ejaan & Fonetik (*Phonetic Confusion*)**: Huruf-huruf membingungkan bagi pembelajar non-native (misal: *A vs E vs I*, *G vs J*, *B vs V*, *15 vs 50*).
* **Jebakan Bentuk Jamak (*Singular vs Plural Trap*)**: Hilangnya akhiran `-s` yang langsung menggagalkan jawaban.

### Pilar 4: Bedah Kasus & Logika Soal Resmi (*Step-by-Step Case Breakdown*)
Menganalisis soal latihan resmi Cambridge IELTS (misal: Buku 6 s.d. 19):
* Disajikan dalam bentuk tabel analisis: **Nomor Soal ➔ Informasi yang Dicari ➔ Kata Kunci Pemicu ➔ Potensi Distraktor ➔ Jawaban Tepat & Alasannya**.
* Menjelaskan *mengapa* jawaban salah itu salah dan *mengapa* jawaban benar itu benar.

### Pilar 5: Aturan Baku Lembar Jawaban (*Answer Sheet Protocol & Formatting Rules*)
* Aturan penulisan angka, singkatan, mata uang, dan tanggal (*British vs American format*).
* Kebijakan penulisan huruf kapital (*ALL CAPS vs lower case*).
* Sanksi pelanggaran batas kata (*Word Limit Penalty*).

### Pilar 6: Lembar Refleksi Mandiri & Latihan Penguatan (*Deliberate Practice & Checklist*)
* Checklist mandiri (*yes/no self-audit*) sebelum melangkah ke bab berikutnya.
* Latihan mikro mandiri (*microskill drills*) untuk menguji pemahaman konsep bab tersebut.

---

## ✍️ 3. Format Visual & Tipografi Markdown

Untuk memastikan pengalaman membaca senyaman buku ajar cetak berkualitas tinggi:
1. **GitHub Alert Blocks**:
   - `> [!NOTE]` untuk konteks latar belakang dan definisi istilah.
   - `> [!TIP]` untuk jalan pintas, teknik cepat, dan strategi hafalan mnemonik.
   - `> [!IMPORTANT]` untuk aturan mutlak yang tidak boleh dilanggar (misal: aturan batas kata).
   - `> [!WARNING]` untuk jebakan penguji dan kesalahan paling umum (*common pitfalls*).
2. **KaTeX Formulas**:
   - Gunakan `$...$` atau `$$...$$` untuk rumus, batas skor, atau persamaan logika.
   - Contoh: $\text{Skor Mentah Section 1} \ge \frac{9}{10} \implies \text{Buffer Aman Band 7.5+}$.
3. **Tabel Komparasi Terstruktur**:
   - Selalu gunakan tabel dengan rata kiri/tengah yang rapi untuk membandingkan opsi benar vs opsi jebakan.

---

## 🚀 4. Prosedur Penyusunan Modul Baru
1. Kaji silabus video/topik secara holistik untuk mengekstraksi seluruh konsep dan taktik kunci.
2. Susun dokumen ke dalam folder `docs/ielts-band-7/module-XX-*/` sesuai penamaan resmi.
3. Daftarkan bab ke dalam `src/data/ielts/index.ts` agar langsung tampil di antarmuka e-reader aplikasi (`/ielts`).
4. Perbarui pelacak progres di `docs/ielts-band-7/syllabus-progress-tracker.md`.
5. Uji kompilasi dengan `npm run build` untuk memastikan tidak ada kesalahan impor atau format.
