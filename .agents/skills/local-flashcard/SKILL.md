---
name: local-flashcard
description: >-
  Create, enrich, and persist local English vocabulary/idiom/phrase flashcards in
  src/data/flashcards/flashcards.json with rich dynamicFields and category links.
  Use when the user asks to add words, phrases, or idioms to flashcards.
---

# Local Flashcard Workflow Skill

Follow the operational protocol in [FLASHCARD_WORKFLOW.md](../../../FLASHCARD_WORKFLOW.md) and the Gold-Standard schema & category IDs in [FLASHCARD_RULES.md](../../../FLASHCARD_RULES.md):

1. **Immediate Lexical Coaching**: Deliver definition, IPA pronunciation, natural examples, and memory hooks immediately in chat.
2. **Search-First Deduplication**: Grep `src/data/flashcards/flashcards.json` first; enrich existing cards instead of duplicating.
3. **Pure Active Recall `question`**: Keep `question` clean (word/phrase only — no IPA, sublist, or part-of-speech spoilers; see `FLASHCARD_RULES.md`).
4. **Unshift to Index 0**: Always prepend new cards at index `0` of `flashcards.json` with a deterministic 24-char hex `_id`.
5. **Gold-Standard `dynamicFields` & Categories**: Follow the required fields (`Part of Speech`, `Pronunciation (IPA)`, word family, collocations, Band 5 vs Band 8+ transformation, `Tips Mengingat`) and valid category `_id`s from `FLASHCARD_RULES.md` / `src/data/flashcards/categories.json`.
6. **Optional Audio Follow-Up**: When requested, pre-generate Neural commute MP3s via `npm run commute:generate -- --ids=<id1>,<id2>` (see [commute-audio](../commute-audio/SKILL.md)).
7. **Commit Policy**: Follow `AGENTS.md` (pure data in `src/data/flashcards/` may be auto-committed; never auto-commit app code).
