# Local Flashcard Addition & Agentic Workflow Guide (FLASHCARD_WORKFLOW.md)

This document defines the standard operational workflow for creating, enhancing, and persisting **Local Flashcards** into this repository using **Antigravity** (or any Agentic AI platform).

---

## 🎯 Purpose & Philosophy

While **Study Mapping** (`src/data/mappings/index.ts`) focuses on detailed grammar diagnostics, question autopsies, and rule formulas, **Local Flashcards** (`src/data/flashcards/flashcards.json`) represent the primary active-recall spaced repetition dataset.

When the user asks to add vocabulary, phrases, idioms, or grammar pairs as flashcards:
1. **The Agent acts as a Lexical Coach**: It immediately delivers the complete definition, pronunciation (IPA), natural examples, and memory hooks directly in chat.
2. **The Agent persists the flashcard**: It adds the structured record to `src/data/flashcards/flashcards.json` with comprehensive `dynamicFields` and proper category linking in `src/data/flashcards/categories.json`.
3. **The card becomes instantly reviewable**: It appears immediately on the home page and review deck.

---

## ⚡ Core Operational Directives

> [!IMPORTANT]
> **1. Top-of-Array Unshift Policy (New Cards First)**:
> Always **unshift** (prepend to index 0) newly created cards into `src/data/flashcards/flashcards.json`.
> - **Why?**
>   1. Newly added cards immediately appear on Page 1 when the user opens the application or selects the **"🕒 Terbaru (Recently Added)"** sort option.
>   2. Users can immediately verify and review the card they just asked the AI to add without having to page through thousands of cards.

> [!IMPORTANT]
> **2. Rich `dynamicFields` Gold Standard**:
> A flashcard must NEVER be just a bare question and one-line answer. Every flashcard created by the agent must include structured, high-value `dynamicFields`:
> - `Part of Speech`: e.g. *Adverb, Noun, Transitive Verb, Adjective, Phrasal Verb*.
> - `Pronunciation`: International Phonetic Alphabet (IPA) with syllable stress (e.g. */əˈpær.ənt.li/*).
> - `Arti Utama / Definisi`: Clear Indonesian translation explaining exact contextual meaning and nuance.
> - `Contoh Kalimat`: At least 1–2 authentic, natural example sentences.
> - `Tips Mengingat`: Mnemonic shortcut, visual analogy, or etymology hook.
> - **Optional Contextual Fields**:
>   - For Nouns: `Singular Form`, `Plural Form`, `Countable / Uncountable`.
>   - For Confusing Words: `Perbedaan dengan [Word]` (e.g. *Apparently vs. Obviously*).
>   - For Tech/Business Terms: `Arti Harfiah (Literal)` vs. `Arti Metafora (Tech/Startup)`.
>   - For Idioms / Verbs: `Common Collocations`.

> [!TIP]
> **3. Category Resolution & Linking**:
> - Inspect `src/data/flashcards/categories.json` before assigning categories.
> - Assign the most appropriate `_id` to the card's `categories` array (e.g. `6901a0010000000000000008` for General Vocabulary, `6901a0010000000000000006` for Work/Tech, `6901a0010000000000000009` for Irregular Plurals).
> - If a new specialized category is genuinely needed, add it to `categories.json` first.

> [!IMPORTANT]
> **4. Search-First De-Duplication**:
> Before adding a new flashcard, execute a `grep_search` on `src/data/flashcards/flashcards.json`.
> - If the word/phrase already exists, **update and enrich** the existing card with missing `dynamicFields` rather than creating duplicates.
> - If no card exists, generate a new deterministic 24-char hex `_id` (e.g. incrementing `6902a0010000000000000021`) and unshift.

> [!TIP]
> **5. Strict Auto-Commit Policy (Pure Data ONLY)**:
> - The agent is **authorized to auto-commit** pure data updates in `src/data/flashcards/` and related documentation.
> - **FORBIDDEN**: The agent must NEVER auto-commit changes to UI components, pages, hooks, or application logic without explicit user instruction.

---

## 📋 Standard Flashcard Schema

```typescript
export interface Flashcard {
  _id: string;                         // 24-char hex string (e.g. "6902a0010000000000000021")
  question: string;                    // Word, phrase, or term with grammatical label
  answer: string;                      // Markdown explanation rendered with MarkdownViewer
  progression: 'new' | 'retry' | 'hard' | 'normal' | 'good' | 'perfect';
  nextReviewDate: string;              // ISO date string (e.g. new Date().toISOString())
  categories: string[];                // Category _id references from categories.json
  dynamicFields: Record<string, string>; // Rich metadata key-value pairs
}
```

---

## 🔄 Step-by-Step Addition Protocol

When the user says *"tambahkan ke flashcard: [kata/frasa]"*:

1. **Step 1: Immediate Educational Delivery in Chat**  
   Deliver the pronunciation, meaning, nuance breakdown, and example sentences immediately so the user can start learning right away.

2. **Step 2: Search Existing Cards**  
   Grep `src/data/flashcards/flashcards.json` for the keyword. If found, update; if not, proceed to Step 3.

3. **Step 3: Resolve Category**  
   Match with an existing category from `src/data/flashcards/categories.json`.

4. **Step 4: Generate Card with Rich Dynamic Fields**  
   Include IPA, Part of Speech, Definition, Sentences, and Tips Mengingat.

5. **Step 5: Prepend (Unshift) to `flashcards.json`**  
   Insert at index 0 so it immediately surfaces on the "Recently Added" sort.

6. **Step 6: Auto-Commit Pure Data Update**  
   Execute git commit with message: `data(flashcards): add [Word] to local flashcards deck`.
