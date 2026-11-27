---
name: workspace-authoring
description: >-
  Standard guidelines for authoring documentation, workflow guides, and agent skills
  in this repository: strictly portable relative links, 4-tier anti-bloat hierarchy,
  high-signal formatting, and zero duplication. Use whenever creating, editing, or
  refactoring markdown files or skills.
---

# ✍️ Workspace Authoring & Markdown Best Practices

Panduan standar penulisan dokumentasi `.md` dan skill AI di repo `flashcards` agar tetap **ringan (*anti-bloat*), terstruktur, ber-sinyal tinggi, dan 100% portabel lintas mesin**.

---

## 🏛️ 1. Arsitektur 4 Tingkatan (The 4-Tier Hierarchy)

Gunakan **The Rule of Inversion**: *Pertahankan root `AGENTS.md` se-minimal mungkin; dorong prosedur panjang dan referensi mendalam ke modul on-demand.*

| Tier | Lokasi File | Sifat Pemuatan | Konten yang Tepat |
| :--- | :--- | :--- | :--- |
| **Tier 1: Root Guardrails** | [`AGENTS.md`](../../../AGENTS.md) | Always-on (~40–50 baris) | Keamanan secrets, portabilitas tautan, kebijakan auto-commit, session hygiene, skill routing. |
| **Tier 2: Scoped Rules** | Subfolder `AGENTS.md` (jika diperlukan) | Aktif saat path disentuh | Aturan spesifik sub-direktori tertentu. |
| **Tier 3: On-Demand Skills** | `.agents/skills/<nama-skill>/SKILL.md` | Progressive Disclosure | Prosedur langkah demi langkah, checklist aksi, dan pointer ke referensi mendalam. |
| **Tier 4: Deep References** | Root `*_WORKFLOW.md`, `BESTPRACTICE.md`, `FLASHCARD_RULES.md` | Dibaca saat butuh | Skema lengkap, tabel kategori, contoh panjang, dan standar rekayasa mendalam. |

---

## 🎯 2. Aturan Emas Tautan: Wajib Relative & Portabel

1. **Dilarang Absolute Path (`file:///Users/...`)** di dalam file markdown repositori — tautan absolut langsung rusak saat dibuka di laptop lain atau oleh kontributor lain.
2. **Gunakan Relative Path** dari posisi file yang sedang diedit:
   ```markdown
   # Dari .agents/skills/<name>/SKILL.md menuju root:
   [BESTPRACTICE.md](../../../BESTPRACTICE.md)

   # Dari root menuju skill:
   [coding-standards](.agents/skills/coding-standards/SKILL.md)
   ```
3. **Gunakan Angle Brackets `<...>`** jika path atau nama file mengandung spasi:
   ```markdown
   ✅ [Panduan Belajar](<./docs/My Study Guide.md>)
   ❌ [Panduan Belajar](./docs/My Study Guide.md)
   ```

---

## 📝 3. Format Ber-Sinyal Tinggi & Anti-Duplikasi

- **Pola Exemplar**: Contoh konkret (`✅ Benar` vs `❌ Buruk`) jauh lebih efektif daripada paragraf teori panjang.
- **Pola Trigger-Action**: Susun skill dengan struktur *Trigger → Action Steps → Verifikasi*.
- **Single Source of Truth**: Jangan menyalin-tempel skema, tabel kategori, atau kebijakan global ke banyak file. Simpan di satu file referensi tunggal dan rujuk memakai relative markdown link.
