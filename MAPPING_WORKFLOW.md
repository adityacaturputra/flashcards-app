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

> [!CAUTION]
> **Template Literal Safety Rule**:
> Because `remarks` is stored inside a TypeScript template literal (enclosed in backticks `` `...` ``), any code backticks inside the text MUST be escaped with a backslash (`` \`code\` ``) or written using markdown bold (`**text**`) to prevent syntax errors during build.

---

### Step 3: TypeScript Schema Contract

Every mapping record must strictly adhere to the `MappingItem` interface defined in [`src/types/mapping.ts`](./src/types/mapping.ts):

```typescript
export interface MappingItem {
  id: string;          // Unique kebab-case identifier (e.g. 'numeral-million-residents')
  module: string;      // Category (e.g. 'Nouns & Quantifiers')
  title: string;       // Descriptive title
  question: string;    // Problem sentence or multiple-choice question
  correction: string;  // The fix (e.g. 'to relax -> to relaxing')
  remarks: string;     // In-depth Markdown + KaTeX explanation
  source?: string;     // e.g. 'Englishvit - English Pro Class'
  chapter?: string;    // e.g. 'Chapter 11: You are About to be Promoted'
  createdAt: string;   // 'YYYY-MM-DD'
  tags?: string[];     // ['numbers', 'million', 'grammar-rules']
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
