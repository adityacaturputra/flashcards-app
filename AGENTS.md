# 🛡️ AI Agent Guardrails & Workspace Rules (`AGENTS.md`)

Aturan *always-on* untuk seluruh aktivitas AI di repo `flashcards`. Prinsip utama: **cegah kebocoran secrets, jaga arsitektur modular, gunakan *progressive disclosure* lewat skills, dan jaga sesi tetap ramping.**

## 1. Keamanan Secrets & Portabilitas Tautan
- **Zero Secret Leak:** Dilarang membaca, mencetak, atau men-commit nilai sensitif dari `.env*` (termasuk `.env.local`, `MONGODB_URI`, API keys, atau token). Masking otomatis menjadi `[REDACTED]` jika muncul di output atau prompt.
- **Relative Markdown Links:** Dilarang memakai `file:///Users/...` di file `.md` repo — wajib gunakan relative path portabel sesuai [`workspace-authoring`](.agents/skills/workspace-authoring/SKILL.md).
- **External Study Materials:** Folder `other-english-materials/` bersifat *gitignored* untuk belajar mandiri — jangan pernah mencoba men-commit isinya (lihat [`OTHER_MATERIALS.md`](OTHER_MATERIALS.md)).

## 2. Kebijakan Git Auto-Commit
- ✅ **Boleh Auto-Commit (Pure Data ONLY):** Pembaruan data murni di `src/data/mappings/`, `src/data/flashcards/`, serta dokumentasi tracker data terkait.
- ❌ **DILARANG Auto-Commit (App Code):** Perubahan kode aplikasi (`src/app/`, `src/components/`, `src/hooks/`, `src/services/`, `src/utils/`, styling, dan konfigurasi) **wajib dibiarkan unstaged/uncommitted** untuk ditinjau user terlebih dahulu.

## 3. Skill Routing (*Progressive Disclosure*)
Jangan menebak prosedur panjang — baca skill terkait saat tugasnya muncul:

| Jenis Tugas | Skill Wajib Dibaca | Referensi Mendalam |
| :--- | :--- | :--- |
| **Coding, UI, Refactor, Bugfix** | [`coding-standards`](.agents/skills/coding-standards/SKILL.md) | [`BESTPRACTICE.md`](BESTPRACTICE.md) |
| **Study Mapping / Grammar IELTS** | [`study-mapping`](.agents/skills/study-mapping/SKILL.md) | [`MAPPING_WORKFLOW.md`](.agents/skills/study-mapping/references/MAPPING_WORKFLOW.md) |
| **Tambah / Perkaya Flashcards** | [`local-flashcard`](.agents/skills/local-flashcard/SKILL.md) | [`FLASHCARD_RULES.md`](FLASHCARD_RULES.md), [`FLASHCARD_WORKFLOW.md`](.agents/skills/local-flashcard/references/FLASHCARD_WORKFLOW.md) |
| **Commute Audio MP3 (`/commute`)** | [`commute-audio`](.agents/skills/commute-audio/SKILL.md) | [`COMMUTE_AUDIO_WORKFLOW.md`](.agents/skills/commute-audio/references/COMMUTE_AUDIO_WORKFLOW.md) |
| **Menulis / Merapikan `.md` & Skill** | [`workspace-authoring`](.agents/skills/workspace-authoring/SKILL.md) | — |

## 4. Session Hygiene, `.tmp/` & Auto Compound Engineering
- **Anti-Mega-Session & Handoff:** Jika sesi mulai panjang (**~30–40 prompt**, sudah beberapa kali compaction, atau pindah sub-task besar), **wajib ingatkan user untuk pindah ke New Chat** dan buat ringkasan handoff di `.tmp/HANDOVER-<topik>-YYYY-MM-DD_HHMM.md`.
- **Folder Temp (`.tmp/`):** Simpan skrip eksperimen, scratch data, atau file handoff sementara di **`.tmp/`** (gitignored), bukan di root repo.
- **Hemat Turn & Subagent:** Batch pemanggilan tool independen dalam satu turn; delegasikan penelusuran codebase luas ke subagent `research` agar konteks utama tetap bersih.
- **Auto Compound Engineering (Self-Updating Skills):** Setiap kali terjadi koreksi user, *back-and-forth*, atau ditemukan *gotcha* teknis baru yang berpotensi terulang, **langsung tulis ringkasan pelajarannya** ke `.agents/skills/<skill>/SKILL.md` terkait (ringkas, tanpa secrets) dan **beri tahu user di akhir respons** bagian apa yang baru diperbarui.

## 5. Checklist Pra-Output Wajib
- [ ] Tidak ada `.env.local`, `MONGODB_URI`, atau kredensial yang bocor ke output/kode?
- [ ] Semua tautan markdown di repo memakai relative path portabel (tanpa `file:///Users/...`)?
- [ ] Perubahan kode aplikasi tidak di-auto-commit, dan skrip eksperimen disimpan di `.tmp/`?
- [ ] Pelajaran baru (*gotcha*/koreksi) sudah di-*compound-engineer* ke skill terkait, dan sesi panjang sudah diingatkan untuk handoff?
