---
name: local-flashcard
description: >-
  Create, enrich, and persist local English vocabulary/idiom/phrase flashcards in
  src/data/flashcards/flashcards.json with rich dynamicFields and category links.
  Use when the user asks to add words, phrases, or idioms to flashcards.
---

# Local Flashcard Workflow Skill

Follow the full protocol in [FLASHCARD_WORKFLOW.md](../../../FLASHCARD_WORKFLOW.md) and these core rules:

1. **Immediate Lexical Coaching**: Deliver definition, IPA pronunciation, natural examples, and memory hooks immediately in chat.
2. **Search-First Deduplication**: Grep `src/data/flashcards/flashcards.json` first; enrich existing cards instead of duplicating.
3. **Unshift to Index 0**: Always prepend new cards at index `0` of `flashcards.json` with a deterministic 24-char hex `_id`.
4. **Gold-Standard `dynamicFields`**: Include `Part of Speech`, `Pronunciation`, `Arti Utama / Definisi`, `Contoh Kalimat`, `Common Collocations`, and `Tips Mengingat`, plus valid category `_id`s from `src/data/flashcards/categories.json`.
5. **Optional Audio Follow-Up**: When requested, pre-generate Neural commute MP3s for the new card IDs via `npm run commute:generate -- --ids=<id1>,<id2>` (see the `commute-audio` skill).
6. **Commit Policy**: Pure data updates in `src/data/flashcards/` may be auto-committed; never auto-commit app code.
