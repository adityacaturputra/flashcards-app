---
name: coding-standards
description: >-
  Core engineering standards for all coding tasks in the flashcards Next.js/TypeScript
  repository (features, UI components, pages, hooks, utilities, bugfixes, refactors).
  Use whenever writing or modifying application code under src/.
---

# 💻 Coding Standards Skill

> [!IMPORTANT]
> **MANDATORY PREREQUISITE:** Sebelum menulis atau mengubah kode aplikasi di `src/`, **WAJIB baca dan patuhi [BESTPRACTICE.md](../../../BESTPRACTICE.md)**.

## Core Architectural Rules
1. **Strict File Shortness (< 120–150 Lines)**:
   - Setiap file komponen harus tetap pendek, fokus, dan mudah dibaca.
   - Begitu sebuah komponen menangani lebih dari satu concern visual (mis. kartu + tabel + aturan + control bar), **segera ekstrak** ke file terpisah di `src/components/molecules/` atau `src/components/atoms/`.
   - **Orchestrator Pattern**: Parent organism/page (< 100–120 baris) cukup mengimpor dan merangkai child components.
2. **Atomic Component Hierarchy**:
   - `src/components/atoms/`: Pure, dumb UI building blocks (`Button`, `Card`, `MarkdownViewer`).
   - `src/components/molecules/`: Komposisi atoms (`CategoryForm`, `MappingDetailModal`, `ConfusionPairCard`).
   - `src/components/organisms/`: Widget fitur lengkap (`MappingTable`, `MappingFlashcards`, `AlphabetExplorer`).
   - `src/app/`: Next.js App Router pages & API route handlers.
3. **Ergonomic Layout Hierarchy**:
   - Letakkan aksi utama (kartu interaktif, drill trainer, input inti) di bagian **atas** viewport.
   - Letakkan tabel referensi, cheat sheet, dan konvensi sekunder di bagian **bawah**.
4. **Container-Defensive Responsiveness (`compact` Pattern)**:
   - Jangan hanya bergantung pada viewport breakpoints (`hidden xl:inline`) di dalam sidebar sempit, popover, atau modal drawer.
   - Untuk multi-choice toggle & pill selector, sediakan prop `compact={true}` dengan `flex-1 min-w-0` agar tidak overflow horizontal.
5. **DRY & Single Source of Truth**:
   - Pure helper/parser/link builder → `src/utils/`; reusable state/side-effect → `src/hooks/`.
   - Gunakan satu kontrak deterministik (mis. `?source=local` via `API_ENDPOINTS` & `resolveDataSource`) — dilarang membuat rantai fallback spekulatif.
6. **Git Commit Policy**:
   - **DILARANG auto-commit** kode aplikasi (`src/app/`, `src/components/`, `src/hooks/`, `src/services/`, `src/utils/`). Biarkan unstaged untuk ditinjau user.
