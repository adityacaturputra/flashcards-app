# Agent Development Guide (AGENTS.md)

Welcome to the **Flashcards & Study Mapping Application** repository. This document serves as the operational guide for AI agents (such as Google Antigravity / Gemini) and human software engineers contributing to or modifying this codebase.

---

## 🧭 Core Architectural Principles

Before writing or refactoring any code in this project, **you must read and strictly adhere to [BESTPRACTICE.md](./BESTPRACTICE.md)**.

### Key Rules for Agents:
1. **DRY (Don't Repeat Yourself)**:
   - Never copy-paste utility functions across components (e.g. TTS helpers, link builders, parsers).
   - Place pure, reusable logic in `src/utils/`.
   - Place reusable state and side-effect logic in custom React hooks in `src/hooks/`.
2. **Atomic Component Hierarchy**:
   - `src/components/atoms/`: Pure, dumb UI building blocks (`Button`, `Card`, `MarkdownViewer`, etc.).
   - `src/components/molecules/`: Compositions of atoms (`CategoryForm`, `MappingDetailModal`, etc.).
   - `src/components/organisms/`: Feature-complete widgets (`MappingTable`, `MappingFlashcards`, `FlashcardList`, etc.).
   - `src/app/`: Next.js App Router pages and route handlers.
3. **Mobile-First & Defensive Responsiveness**:
   - Every feature must look stellar on mobile viewports (e.g. 375px–430px iPhone) as well as wide desktop screens.
   - For wide datasets on mobile, prefer responsive cards or dedicated touch-scrolling containers over cramped multi-column tables.
4. **Single Source of Truth & Deterministic Contracts (No Speculative Multi-Fallbacks)**:
   - Never invent speculative multi-fallback chains (e.g. checking query params -> body -> headers -> ID pattern guessing).
   - Establish and adhere to one deterministic contract (e.g. `?source=local` via `API_ENDPOINTS` & `resolveDataSource`).
   - Extract pure parameter resolution logic into `src/utils/` instead of duplicate inline parsing.

---

## 📁 Codebase Directory Map

```text
flashcards/
├── AGENTS.md                  # This operational guide for agents
├── BESTPRACTICE.md            # Senior Software Engineer standards & patterns
├── src/
│   ├── app/                   # Next.js App Router (pages & API routes)
│   │   ├── mapping/           # English Journey Mapping Flashcards feature
│   │   ├── search-templates/  # Search template customization
│   │   ├── add-flashcard/     # Flashcard creation
│   │   └── page.tsx           # Home flashcards deck
│   ├── components/
│   │   ├── atoms/             # Atomic UI components (MarkdownViewer, etc.)
│   │   ├── molecules/         # Molecular UI (MappingDetailModal, etc.)
│   │   └── organisms/         # Organisms (MappingTable, MappingFlashcards, etc.)
│   ├── data/
│   │   ├── flashcards/        # Local repository flashcards dataset (flashcards.json, categories.json, index.ts)
│   │   └── mappings/          # Local repository study mapping dataset (index.ts)
│   ├── hooks/                 # Custom React hooks (useMappingDeck, useMappingFilter, etc.)
│   ├── models/                # Database/Entity models
│   ├── services/              # API and backend service layers
│   ├── types/                 # TypeScript interfaces and type definitions
│   └── utils/                 # Pure helper functions (externalLinks, calculations, formatters)
```

---

## 🤖 Study Mapping Update Protocol for Agents

When a user asks the agent to add a new question, error analysis, or English rule:
1. **Read and Follow [MAPPING_WORKFLOW.md](./MAPPING_WORKFLOW.md)** for the complete 6-step study mapping protocol.
2. **Immediate Educational Delivery (No Build Delay/Placeholders)**: Deliver the complete, comprehensive explanation, formula breakdown, comparison tables, and correct answer in chat FIRST so the user learns immediately without waiting for builds.
3. **Search Existing Entries First**: Always execute `grep_search` on [`src/data/mappings/index.ts`](./src/data/mappings/index.ts) to check if a card on this topic/phrase already exists. If found, **EDIT and expand** that card; do not create duplicate cards.
4. **Analyze & Extract**: Module, title, question, correction, source, and chapter.
5. **Bottom-Up Inspection**: When reading or appending to [`src/data/mappings/index.ts`](./src/data/mappings/index.ts), always inspect the bottom/tail of the file first (the newest entries and insertion point) rather than reading from line 1 down.
6. **Generate Comprehensive Remarks**: Markdown, KaTeX math formulas (`$$...$$` and `$...$`), comparison tables, and quick memory tips.
7. **Persist in Repo**: Update or append in [`src/data/mappings/index.ts`](./src/data/mappings/index.ts) adhering to `MappingItem`.
8. **No Build Delay for Pure Mappings**: Skip `npm run build` on pure dataset updates in `src/data/mappings/index.ts` to ensure 100% immediate, single-turn responses without UI churn. Reserve `npm run build` for component and core app refactors.
9. **Strict Auto-Commit Policy (Data Updates ONLY)**:
   - ✅ **AUTHORIZED**: The agent is authorized to automatically execute `git commit` **ONLY for pure data updates** (e.g. updating `src/data/mappings/`, `src/data/flashcards/`, and accompanying data documentation).
   - ❌ **FORBIDDEN (NO AUTO-COMMIT)**: For **application code, UI components, pages, hooks, services, styles, configs, and logic refactors**, the agent **MUST NEVER auto-commit**. Always leave application code changes unstaged/uncommitted for the user to review.

---

## 🔗 Related Documentation
- 📖 **[MAPPING_WORKFLOW.md](./MAPPING_WORKFLOW.md)**: Complete guide to the agentic study mapping workflow.
- 🗂️ **[FLASHCARD_WORKFLOW.md](./FLASHCARD_WORKFLOW.md)**: Complete guide to adding and maintaining local flashcards.
- 📘 **[BESTPRACTICE.md](./BESTPRACTICE.md)**: Full Senior Software Engineer standards and coding guidelines.
