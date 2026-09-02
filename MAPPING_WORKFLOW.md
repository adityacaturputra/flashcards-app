# Study Mapping Addition & Agentic Workflow Guide (MAPPING_WORKFLOW.md)

This document defines the standard operational workflow for adding, analyzing, and persisting **English Journey Study Mapping** records into this repository using **Antigravity** (or any Agentic AI platform).

---

## 🎯 Purpose & Philosophy

Previously, studying grammar errors involved manually copying questions from quizzes into Google Sheets and asking web chatbots for explanations separately.

This application unites both worlds into an **integrated, git-backed study system**:
1. **User shares raw study material** (pasted text, quiz questions, or screenshots) directly to the AI Agent.
2. **The Agent acts as a personal tutor**: it immediately explains *why* an error is wrong and provides in-depth grammar formulas.
3. **The Agent acts as an automated software engineer**: it structures the error into the repository dataset (`src/data/mappings/index.ts`), compiles the build, and makes it instantly available for flashcard study on mobile and desktop at `/mapping`.

---

## ⚡ Core Operational Directives

> [!IMPORTANT]
> **1. Proactive Automatic Persistence (Zero Manual Reminder Needed)**:
> Whenever the user asks a grammar question (e.g. *"ini jawaban benarnya apa?"*, *"why is this wrong?"*, or shares a sentence / quiz):
> 1. **Do NOT just answer in chat and stop.**
> 2. **PROACTIVELY create and append the new `MappingItem`** into [`src/data/mappings/index.ts`](./src/data/mappings/index.ts).
> 3. **Run `npm run build`** to guarantee compile safety.
> 4. **Confirm to the user** that the explanation has been explained in chat AND saved to their study deck at `/mapping`.

> [!TIP]
> **2. Auto-Commit Authorization for Pure Mapping Additions**:
> When a session or user request only involves adding or updating study mappings in `src/data/mappings/index.ts` (and updating mapping docs):
> - The AI Agent is **fully authorized to automatically commit** the changes to git after verifying `npm run build` passes (Exit Code 0).
> - Use standard Conventional Commit format (e.g. `feat(mapping): add [Title] study mapping record`).
> - Provide the commit hash/summary in the response to the user.

> [!TIP]
> **3. Bottom-Up File Inspection (Analyze from the End / Last Entries First)**:
> When inspecting, updating, or appending to [`src/data/mappings/index.ts`](./src/data/mappings/index.ts):
> - **DO NOT read or analyze the file from top to bottom (Line 1 down).**
> - **ALWAYS inspect the end of the file first (the last ~50–80 lines)** using `view_file` with `StartLine` targeted near the end.
> - **Why?**
>   1. The newest mapping entries, latest formatting standards, and insertion points are located at the bottom of the `MAPPING_ITEMS` array.
>   2. Inspecting the tail first saves tokens, eliminates redundant parsing of older records at the top, and lets the agent immediately find the insertion point and latest schema conventions.

> [!IMPORTANT]
> **4. Immediate Educational Feedback First (Zero-Delay Learning)**:
> - **Prioritize the user's active learning flow**: When the user asks a question or shares a quiz, deliver the **full, clear explanation, rule breakdown, and correct answer directly in the conversation FIRST**.
> - The user can immediately read and learn without waiting.
> - The background software engineering tasks (appending to `src/data/mappings/index.ts`, executing `npm run build`, and running `git commit`) proceed seamlessly in the background to persist the record.

> [!IMPORTANT]
> **5. Search-First De-Duplication & Consolidation (Search Existing Entries First)**:
> - **MANDATORY**: Before creating any new `MappingItem`, the AI Agent **MUST ALWAYS perform a search (`grep_search`)** in [`src/data/mappings/index.ts`](./src/data/mappings/index.ts) using keywords from the question, phrase, or grammar topic (e.g. `look forward to`, `pretty sure`, `recommend`, `in on at`).
> - **If an entry ALREADY exists for that topic/phrase**:
>   - **DO NOT create a new duplicate card!**
>   - **EDIT, EXPAND, and CONSOLIDATE** into the existing entry so all related nuances, grammar definitions, and examples are unified in one single comprehensive master card.
> - **If NO matching or related entry exists**:
>   - Proceed to append a new `MappingItem` at the bottom of the dataset.

---

## 🔄 End-to-End Workflow Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. USER: Pastes Quiz Question / Uploads Screenshot / Asks Error Rule   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. AGENT: Analyzes Error, Grammar Module, and Explains in Chat         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. AGENT: Constructs Standardized MappingItem with KaTeX & Tables      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 4. AGENT: Appends / Updates Data in src/data/mappings/index.ts         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 5. AGENT: Runs `npm run build` to Verify Zero Compile Errors           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 6. USER: Studies & Reviews Live via /mapping (Table & Flashcard Mode) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Step-by-Step Agent Protocol

When a user provides a new question or asks why an answer is wrong, the AI Agent must follow these steps:

### Step 1: Input Analysis & Field Extraction
Extract the following metadata from the user's prompt or image:
- **`module`**: Grammar category (e.g. `Gerunds`, `Expressions & Idioms`, `Nouns & Quantifiers`, `Tenses`, `Prepositions`, `Conditionals`, `Subject-Verb Agreement`, `Passive Voice`).
- **`title`**: Concise, descriptive topic name (e.g. `21 million residents vs. 21 millions resident`).
- **`question`**: The exact original sentence or question prompt.
- **`correction`**: Formulaic concise fix (e.g. `“Thanks God...” -> “Thank God...”`).
- **`source`**: Course / platform (e.g. `Englishvit - English Pro Class`).
- **`chapter`**: Chapter or lesson context (e.g. `Chapter 11: You are About to be Promoted`).
- **`tags`**: Array of lowercase search keywords.

---

### Step 2: In-Depth Remarks Generation
The `remarks` string must be rich, educational, and formatted with **GitHub Flavored Markdown** and **KaTeX LaTeX math formulas**:

1. **Core Rule & LaTeX Formula**:
   - Write clear mathematical formulas:
     $$\mathbf{\text{Exact Number}} + \mathbf{\text{million (without -s)}} + \mathbf{\text{Plural Noun}}$$
2. **Error Breakdown**:
   - Detail exactly why the wrong options fail (e.g., apostrophe rules, missing plural endings, wrong prepositions).
3. **Pola Variasi & Kasus Serupa**:
   - Provide alternative valid contexts (e.g., when to use `-s`, how it behaves without a noun, hyphenated adjective forms).
4. **Summary Comparison Table**:
   - Present a clean Markdown table comparing Correct vs. Incorrect patterns.
5. **Quick Memory Tip**:
   - Include a `> [!TIP]` callout summarizing the fastest trick to remember the rule.

---

## 🛡️ Code Quality & Formatting Checklist (Preventing Parser & Rendering Errors)

To guarantee that Markdown and LaTeX math formulas render crisply without red KaTeX syntax errors or mangled text:

### 1. LaTeX Backslash Escaping in TypeScript Strings (CRITICAL)
In JavaScript/TypeScript template literals (enclosed in backticks `` `...` ``), special characters like `\b`, `\t`, `\r`, `\n` are interpreted as control characters:
- `\textbf` $\rightarrow$ JavaScript reads `\b` as a **backspace** character (`\x08extbf`), corrupting LaTeX.
- `\rightarrow` $\rightarrow$ JavaScript reads `\r` as a **carriage return** character (`\right` $\rightarrow$ `ightarrow`), breaking math rendering.
- `\text` $\rightarrow$ JavaScript reads `\t` as a **tab** character.

> [!IMPORTANT]
> **The Double-Backslash & Unicode Arrow Rule**:
> - In mathematical equations, every LaTeX command written inside a TypeScript template literal **MUST use double backslashes**:
>   - ✅ `$\\mathbf{\\text{Subject}} + \\mathbf{\\text{Verb}}$`
>   - ✅ `$\\rightarrow$` (NOT `$\rightarrow$`)
> - **In plain text, explanations, and `[!TIP]` boxes**:
>   - Always use the **standard unicode arrow `→`** directly (*e.g., `Tell → Langsung orang`*).
>   - This avoids any control-character escaping issues and renders instantly everywhere.

### 2. Equation Structure & The Percent (`%`) KaTeX Safety Rule
- **CRITICAL: Never use `%` or `\%` inside KaTeX `$$...$$` math blocks**:
  - In LaTeX / KaTeX, `%` is treated as a comment delimiter. Writing `100\%` or `100%` inside `$$...$$` comments out subsequent code, triggers a KaTeX parser error, and renders the entire remainder of the card in broken red text.
- **Prefer Markdown Tables for Spectrums, Hierarchies, and Classifications**:
  - For certainty spectrums (e.g. 100%, 80%, 50%), step-by-step progressions, and multi-tier comparisons, **ALWAYS use clean Markdown tables** instead of complex multi-line `$$\begin{aligned}` blocks.
  - Reserve KaTeX `$$...$$` strictly for single-line mathematical grammar formulas:
    - ✅ `$$\mathbf{\text{Subject}} + \mathbf{\text{look forward to}} + \mathbf{\text{Gerund (V-ing)}}$$`

### 3. Template Literal Backtick Escaping
Because the entire `remarks` string is wrapped in template literal backticks `` `...` ``, any inline code snippet inside the explanation must escape backticks:
- ✅ *Write:* `` \`recommend\` `` or `` \`suggest\` ``
- ❌ *Never write unescaped:* `` `recommend` `` (this terminates the TypeScript string and breaks the build).

### 4. Markdown Table Formatting
- Always include header separators: `| :--- | :--- | :--- |`
- Never leave dangling unclosed pipes `|` or mismatched column counts.

---

### Step 3: TypeScript Schema Contract

Every mapping record must strictly adhere to the `MappingItem` interface defined in [`src/types/mapping.ts`](./src/types/mapping.ts):

```typescript
export interface MappingItem {
  id: string;          // Unique kebab-case identifier (e.g. 'subjunctive-recommend-that')
  module: string;      // Category (e.g. 'Subjunctive & Verb Patterns')
  title: string;       // Descriptive topic title
  question: string;    // Problem sentence or multiple-choice question
  correction: string;  // Concise formulaic fix (e.g. 'recommended me to buy -> recommended that I buy')
  remarks: string;     // In-depth Markdown + KaTeX explanation
  source?: string;     // e.g. 'Englishvit - English Pro Class'
  chapter?: string;    // e.g. 'Chapter 11: You are About to be Promoted'
  createdAt: string;   // 'YYYY-MM-DD'
  tags?: string[];     // ['recommend', 'subjunctive', 'verb-patterns']
}
```

---

### Step 4: Repository Persistence

Append the newly created item into the `MAPPING_ITEMS` array inside [`src/data/mappings/index.ts`](./src/data/mappings/index.ts):

```typescript
// src/data/mappings/index.ts
export const MAPPING_ITEMS: MappingItem[] = [
  // ... existing items
  {
    id: 'new-rule-id',
    module: '...',
    title: '...',
    question: '...',
    correction: '...',
    remarks: `...`,
    source: 'Englishvit - English Pro Class',
    chapter: '...',
    createdAt: '2026-09-02',
    tags: ['...'],
  },
];
```

---

### Step 5: Verification & Quality Assurance

Always run the production build after modifying data:
```bash
npm run build
```
- Verify **Exit Code 0**.
- Ensure zero TypeScript compiler errors (`npx tsc --noEmit`).
- Verify that the `/mapping` route compiles cleanly.

---

### Step 6: User Feedback & Delivery

Respond to the user with:
1. **The conceptual explanation** in clear, easy-to-understand language.
2. **A summary of the record added** (Module, Title, Question, Correction, Chapter).
3. **Confirmation** that the new entry is live in their deck and ready to study at [`/mapping`](./src/app/mapping/page.tsx).

---

## 🔗 Related Documentation
- 📘 **[AGENTS.md](./AGENTS.md)**: Main operational guide for AI agents and developers.
- 📘 **[BESTPRACTICE.md](./BESTPRACTICE.md)**: Senior Software Engineer architectural patterns and standards.
