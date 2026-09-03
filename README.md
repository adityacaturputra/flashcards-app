# 🎴 Flashcards & English Journey Study Mapping App

An advanced, full-stack **Spaced-Repetition Flashcard & English Learning Mapping Application** built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and MongoDB.

Designed for high-yield vocabulary retention, agentic dataset management, and in-depth grammatical error analysis.

---

## ✨ Key Features

- **🎴 Dual-Mode Flashcards Deck**:
  - Interactive flip animation with spaced repetition tracking (*New*, *Learning*, *Review*, *Mastered*).
  - Bulk progression updates and instant keyboard shortcuts.
- **🔀 Multi-Source Data Architecture (Backend Factory Pattern)**:
  - **Local Repository Mode (Default)**: Zero-latency, 100% offline-ready dataset of **3,428 flashcards** across **11 semantic categories** stored directly in `src/data/flashcards/`.
  - **MongoDB Cloud Atlas Mode**: Remote cloud database synchronization via Mongoose.
  - **Instant UI Switcher**: Toggle between Local and MongoDB cloud backends in real-time with automatic `localStorage` persistence.
- **🗺️ English Journey Study Mapping (`/mapping`)**:
  - Comprehensive spreadsheet table and study card views for English grammar rules, idioms, and common errors.
  - Native **KaTeX LaTeX math formula** rendering (e.g. $$\text{Verb} + \text{Indirect Object} + \text{Direct Object}$$) and Markdown tables.
  - Built-in **Text-to-Speech (TTS)** and Cambridge/Longman dictionary lookups.
- **🔍 Search Template Manager (`/search-templates`)**:
  - Customizable URL template queries with dynamic `{term}` interpolation for Cambridge Dictionary, Google Search, and vocabulary lookups.
- **🤖 Agentic-Ready Architecture**:
  - Offline typed datasets in `src/data/` for rapid agentic pair-programming, error analysis mapping, and automated single-turn updates without build delays.
- **🚫 Zero-Hardcoding Architecture**:
  - Centralized Route and Endpoint Registries (`APP_ROUTES`, `API_PATHS`, `API_ENDPOINTS`).
  - Dynamic URL & Query Builder (`buildUrl`, `UrlBuilder`) ensuring clean query parameters without manual string interpolation.
- **📴 Optimistic UI with Offline Queue**:
  - Local caching with automatic retry queue fallback (`useOfflineUpdateQueue`) for uninterrupted study sessions.

---

## 🏛️ Architecture & Project Structure

```text
flashcards/
├── AGENTS.md                  # Operational protocol for AI agents
├── BESTPRACTICE.md            # Senior Software Engineer standards & patterns
├── MAPPING_WORKFLOW.md        # Protocol for adding English error analyses
├── README.md                  # Project documentation
├── src/
│   ├── app/                   # Next.js App Router (pages & API routes)
│   │   ├── api/               # API routes (flashcards, categories, searchTemplates)
│   │   ├── mapping/           # English Journey Mapping feature
│   │   ├── search-templates/  # Search template customization
│   │   ├── add-flashcard/     # Flashcard creator
│   │   ├── add-category/      # Category creator
│   │   └── page.tsx           # Main flashcard deck
│   ├── components/
│   │   ├── atoms/             # Atomic UI (DataSourceToggle, MarkdownViewer, etc.)
│   │   ├── molecules/         # Molecular UI (MappingDetailModal, etc.)
│   │   └── organisms/         # Organisms (MappingTable, FlashcardList, etc.)
│   ├── constants/             # Centralized constants (routes, apiPaths, endpoints, dataSource)
│   ├── data/
│   │   ├── flashcards/        # Local flashcards dataset (flashcards.json, categories.json, index.ts)
│   │   └── mappings/          # Local study mapping dataset (index.ts)
│   ├── hooks/                 # Custom hooks (useDataSource, useFlashcards, useMappingDeck, etc.)
│   ├── models/                # Mongoose database models
│   ├── services/
│   │   └── dataProviders/     # Factory Design Pattern (Local vs. Mongo data providers)
│   ├── types/                 # TypeScript interfaces and enums (DataSource, Flashcard, etc.)
│   └── utils/                 # Pure utilities (urlBuilder, externalLinks, keyGen)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**, **yarn**, or **pnpm**
- *(Optional)* **MongoDB Atlas** connection string if using Cloud mode.

### 1. Installation
```bash
git clone https://github.com/adityacaturputra/flashcards-app.git
cd flashcards
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/flashcards?retryWrites=true&w=majority
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_LLM_MODEL=google/gemini-2.0-flash-001
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🛠️ Data Provider Factory & URL Builder Patterns

### Backend Factory Pattern
```ts
import { DataProviderFactory } from '@/services/dataProviders';

// Automatically returns LocalFlashcardProvider or MongoFlashcardProvider
const provider = DataProviderFactory.getFlashcardProvider(source);
const flashcards = await provider.getFlashcards();
```

### Dynamic URL & Query Builder
```ts
import { API_ENDPOINTS } from '@/constants/endpoints';

// Clean, zero-hardcoding query construction
const url = API_ENDPOINTS.SEARCH_TEMPLATES(userId);
// -> '/api/searchTemplates?userId=123' (or '/api/searchTemplates' if userId is undefined)
```

---

## 📘 Engineering Guidelines & Protocols

For code contributions, architectural standards, and agentic workflows, please refer to:
- 📖 **[BESTPRACTICE.md](./BESTPRACTICE.md)**: Full Senior Software Engineering best practices.
- 🤖 **[AGENTS.md](./AGENTS.md)**: Operational guide and strict auto-commit policies for AI agents.
- 🗺️ **[MAPPING_WORKFLOW.md](./MAPPING_WORKFLOW.md)**: 6-step protocol for curriculum updates and grammar error mappings.

---

## 📄 License
MIT © [Aditya Catur Putra](https://github.com/adityacaturputra)
