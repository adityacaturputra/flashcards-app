# External Study Materials Guide (`OTHER_MATERIALS.md`)

Dokumen ini menjelaskan kebijakan dan struktur penyimpanan untuk materi belajar eksternal yang diunduh dan diproses ke dalam direktori `other-english-materials/`.

---

## 🎯 Tujuan & Kebijakan Penggunaan

1. **Khusus Belajar Mandiri (Personal Learning Only)**:
   - Seluruh materi di bawah direktori `other-english-materials/` (video, audio, subtitle `.srt`, dan buku rangkuman `.md`) ditujukan murni untuk keperluan belajar mandiri / personal study oleh pemilik repositori.
   - Tidak untuk disebarluaskan, diperjualbelikan, ataupun dipublikasikan secara komersial.

2. **Kebijakan Git & Media Defense**:
   - Berkas media biner berukuran besar (video `*.mp4`, audio `*.wav`/`*.mp3`, dan sub-folder `original-material/`) **wajib diabaikan oleh `.gitignore`** agar tidak membebani repositori Git.
   - Berkas teks ringan seperti buku catatan studi (`.md`), berkas takarir subtitle (`.srt`), manifest, dan script pemrosesan **dilacak oleh Git** guna memastikan dokumentasi dan hasil pembelajaran aman dan tidak hilang.

3. **Integritas Agentic Workflow**:
   - Agen AI (Antigravity / Gemini / Claude) harus mengenali direktori ini sebagai repository materi lokal tanpa mencoba melakukan commit git atas file-file di dalamnya.
   - Aturan ini terhubung langsung dengan [`AGENTS.md`](./AGENTS.md).

---

## 📂 Struktur Direktori Standar

Setiap materi pembelajaran dari platform eksternal disusun dengan hierarki hierarkis yang rapi dan konsisten:

```text
other-english-materials/
└── <provider>/                           # Contoh: englishvit/
    └── <course-slug>/                    # Contoh: scholarship-preparation-pack/
        ├── README.md                     # Ringkasan silabus dan progres kursus
        └── <module-or-chapter-slug>/     # Contoh: modul1-lpdp-scholarship/
            ├── original-material/        # Video materi asli (.mp4)
            │   ├── 01-introduction-to-lpdp.mp4
            │   └── ...
            ├── subtitles/                # Transkripsi subtitle (.srt) via Whisper highest model
            │   ├── 01-introduction-to-lpdp.srt
            │   └── ...
            └── md/                       # Versi buku / rangkuman materi (.md)
                ├── 01-introduction-to-lpdp.md
                └── handbook-modul-1.md   # Versi komprehensif (buku studi)
```

---

## ⚙️ Alur Pemrosesan (Pipeline)

1. **Downloader**:
   - Mengambil video materi dari platform kursus menggunakan metadata resmi dan tools seperti `yt-dlp` / HTTP streaming.
   - Penamaan file dinormalisasi menggunakan slug huruf kecil dengan urutan nomor urut (`01-lesson-name.mp4`).

2. **Whisper Transcription**:
   - Mengekstrak audio atau memproses video langsung dengan Whisper highest model (`large-v3` / MPS Apple Silicon).
   - Menghasilkan file subtitle `.srt` dengan timestamp akurat dalam direktori `subtitles/` (atau disandingkan di modul terkait).

3. **Book-Style Markdown Synthesis (`md/`)**:
   - Mengonversi transkrip percakapan lisan menjadi buku/panduan tertulis yang terstruktur rapi.
   - Format penulisan buku mencakup:
     - **Ringkasan Eksekutif & Mindmap**: Poin-poin inti bahasan.
     - **Penjelasan Mendalam**: Struktur konsep, persyaratan, aturan, tips praktis.
     - **Tabel Perbandingan & Skema**: Matriks visual untuk memudahkan pemahaman.
     - **Catatan Penting & Action Checklist**: Langkah konkret yang harus diambil pembelajar.
