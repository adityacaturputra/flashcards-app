# Senior Software Engineering Best Practices (BESTPRACTICE.md)

This document establishes the official engineering standards, architecture conventions, and coding best practices for this codebase. Every contributor (human engineer or AI agent) must follow these guidelines.

---

## 🏛️ 1. Clean Architecture & Separation of Concerns

A maintainable codebase maintains clear boundaries between layers:

```text
┌─────────────────────────────────────────────────────────┐
│                    Pages (src/app)                      │  <- Routing & Metadata
├─────────────────────────────────────────────────────────┤
│            Organisms & Molecules (src/components)       │  <- UI Composition & Layout
├─────────────────────────────────────────────────────────┤
│              Custom Hooks (src/hooks)                   │  <- State & Business Logic
├─────────────────────────────────────────────────────────┤
│            Services & Models (src/services, models)     │  <- Data Access & API Layer
├─────────────────────────────────────────────────────────┤
│             Pure Utilities (src/utils)                  │  <- Pure Helper Functions
├─────────────────────────────────────────────────────────┤
│               Type System (src/types)                   │  <- Single Source of Truth
└─────────────────────────────────────────────────────────┘
```

- **Components** should focus exclusively on rendering and view interaction. They should NOT contain complex algorithms, inline timers, or duplicate DOM utility logic.
- **Custom Hooks (`use*`)** must encapsulate state lifecycles, keyboard event listeners, debouncing, and multi-step UI flows.
- **Utilities (`src/utils`)** must be pure, side-effect-free (or isolated side-effect), and unit-testable.

---

## 🔁 2. DRY (Don't Repeat Yourself) & Utility Extraction

- **Extract Repeated Logic Promptly**:
  If a function or calculation is needed in more than one place (e.g. opening TTS audio, formatting timestamps, parsing AI markdown, generating search URLs), extract it into `src/utils/` immediately.
- **Example (`src/utils/externalLinks.ts`)**:
  ```ts
  // ✅ DO: Centralized, safe, reusable utility
  export function openTTSInNewTab(text: string, lang: string = 'en'): void { ... }
  export function openGoogleSearchInNewTab(query: string, prefix?: string): void { ... }
  ```
  ```ts
  // ❌ DON'T: Copy-pasting inline functions across 5 different components
  const openTTS = () => { window.open(...) };
  ```

---

## 🪝 3. Custom Hooks Design Guidelines

- **Hook Naming**: Always prefix with `use` (e.g., `useMappingDeck`, `useMappingFilter`, `useBulkFlashcards`).
- **Encapsulate Related State**: Combine tightly-coupled state variables and handlers into a cohesive hook return object.
- **Clean Event Cleanup**:
  ```ts
  // ✅ Always clean up event listeners in useEffect
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  ```
- **Stable Callback References**: Wrap exported handlers with `useCallback` to prevent unnecessary downstream re-renders.

---

## 🛡️ 4. TypeScript Strictness & Type Safety

- **No `any` or Loose `Object`**:
  Always define explicit TypeScript interfaces or type aliases in `src/types/`.
- **Discriminated Unions & Enums**:
  Use enums or string literal unions for discrete modes (e.g. `Progression`, `MappingViewMode = 'table' | 'flashcard'`).
- **Defensive Null & Undefined Handling**:
  Use optional chaining (`?.`) and nullish coalescing (`??`), and provide sensible default values.
- **Type Casting Rules**:
  Avoid unconstrained `as any`. When typecasting in third-party library boundaries (e.g. `React.isValidElement`), use precise generic shapes:
  ```ts
  const element = firstChild as React.ReactElement<{ children?: React.ReactNode }>;
  ```

---

## 📱 5. Mobile-First & Defensive Responsive Design

- **Mobile Viewport First**:
  Design interfaces to look stunning on 375px–430px screens first, then progressively enhance for `sm:` (640px), `md:` (768px), and `lg:` (1024px+).
- **Dual-Mode Layouts for Complex Data**:
  - On **Mobile (< 768px)**: Render responsive **Study Cards** that display all vital information vertically.
  - On **Desktop (≥ 768px)**: Render the full **Spreadsheet Table**.
- **Defensive Overflow Protection**:
  - Never allow wide markdown tables or KaTeX math formulas to blow out the parent container.
  - Always wrap wide content in an independent scroll container:
    ```tsx
    <div className='overflow-x-auto w-full' style={{ WebkitOverflowScrolling: 'touch' }}>
      <table className='min-w-[480px] w-full'>...</table>
    </div>
    ```
- **Touch Targets**:
  Ensure interactive buttons have a minimum touch target size of **44x44px** on mobile devices.

---

## ⚡ 6. Performance & Rendering Optimization

- **Memoization Where Beneficial**:
  Use `React.memo` for heavy leaf components and `useMemo` for derived dataset filtering/sorting.
- **Code Splitting & Lazy Loading**:
  Heavy modals and secondary pages should be lazily loaded with `React.lazy` and wrapped in `Suspense` fallbacks:
  ```tsx
  const MappingTable = lazy(() => import('@/components/organisms/MappingTable'));
  ```
- **Subtle, High-Performance CSS**:
  Prefer CSS variables for dynamic theming (Dark/Light Mode) to avoid expensive JavaScript layout recalculations.

---

## 📴 7. Resilience, Offline Handling & Error Boundaries

- **Graceful Error Boundaries**:
  Wrap high-level views with `<ErrorBoundary>` to isolate runtime component crashes without breaking the whole application.
- **Optimistic UI with Queue Fallbacks**:
  Apply UI changes optimistically and queue failed server synchronization in local storage for automated retry (`useOfflineUpdateQueue`).
- **Defensive Fallbacks**:
  Always provide clear empty states with helpful call-to-actions when lists or search queries return 0 results.

---

## 🧹 8. Code Cleanliness & Documentation

- **Self-Documenting Code**: Choose descriptive, unambiguous identifiers (`filteredItems`, `handleToggleReveal`, `openTTSInNewTab`).
- **JSDoc on Public Modules**: Add concise JSDoc comments explaining parameters, return types, and context.
- **Atomic Commits & Zero-Warning Builds**:
  Ensure `npm run build` exits with code 0 before finalizing any feature or refactor.

---

## 🏭 9. Factory Design Pattern for Multi-Source Data Providers

When supporting multiple data backends (e.g. **Local Repository** vs. **MongoDB Cloud**):
- **Abstract Interfaces (`src/services/dataProviders/types.ts`)**:
  Define explicit provider contracts (`IFlashcardDataProvider`, `ICategoryDataProvider`) so consumers never know or care whether data comes from local JSON files or remote database queries.
- **Provider Implementations**:
  - `LocalFlashcardProvider` / `LocalCategoryProvider`: Fast, zero-latency, local disk/memory operations.
  - `MongoFlashcardProvider` / `MongoCategoryProvider`: Production MongoDB database connection.
- **Factory Provider (`DataProviderFactory`)**:
  Expose static factory methods to instantiate the correct provider according to the requested `DataSource`:
  ```ts
  const provider = DataProviderFactory.getFlashcardProvider(source);
  const flashcards = await provider.getFlashcards();
  ```

---

## 🚫 10. Zero-Hardcoding Standards & URL Builder Pattern

- **No Magic Strings or Inline String Interpolation**:
  Never hardcode API endpoint strings, storage keys, query parameter names, or configuration values in components or hooks.
- **URL & Query Builder Utility (`src/utils/urlBuilder.ts`)**:
  Always use `buildUrl(basePath, params)` or `UrlBuilder.create(basePath).setParam(k, v).build()` to construct URLs dynamically. Parameters are only appended when non-empty, avoiding trailing `?`, `&`, or empty values:
  ```ts
  // ✅ DO: Dynamic, safe URL building
  buildUrl('/api/searchTemplates', { userId }); // -> '/api/searchTemplates?userId=123' or '/api/searchTemplates'
  ```
- **Centralized Endpoint Registry (`src/constants/endpoints.ts`)**:
  - `API_ENDPOINTS.FLASHCARDS(params)`
  - `API_ENDPOINTS.FLASHCARD_CATEGORIES(params)`
  - `API_ENDPOINTS.SEARCH_TEMPLATES(params)`
  - `API_ENDPOINTS.SEARCH_TEMPLATE_BY_ID(id, params)`
- **Enums Over Raw Literals**:
  Always use strongly-typed enums (e.g. `DataSource.Local`, `DataSource.MongoDB`, `Progression.Good`) instead of raw string literals (`'local'`, `'mongodb'`).

---

## 🎯 11. Single Source of Truth & Deterministic Contracts (No Speculative Multi-Fallbacks)

- **Strict, Single Parameter Channel**:
  Do NOT invent or layer multiple speculative fallback channels (e.g. checking query params $\rightarrow$ checking request body $\rightarrow$ checking headers $\rightarrow$ guessing from ID string patterns $\rightarrow$ guessing from memory cache).
- **Explicit Frontend-Backend Contract**:
  The Frontend must send parameters explicitly through the standardized contract (e.g. `?source=local` via `API_ENDPOINTS`).
- **Deterministic Server Resolution**:
  The backend utility (e.g. `resolveDataSource(request)`) must simply read and validate that single contract parameter, and return a clean default if missing or invalid.
- **Rule for AI Agents**:
  Never hallucinate speculative multi-fallback chains. Investigate and adhere to the explicit API contract directly.

---

## 🧩 12. Component & Hook Decomposition (Keeping Files Lean & Modular)

- **Keep Organism Components Lean (< 300–400 Lines)**:
  When an organism handles multiple UI concerns (such as search bars, category filters, multi-criteria sorting, bulk selection, pagination, and card rendering), never cram all state algorithms and JSX blocks into a single monolithic file.
- **Extract Complex List Logics into Custom Hooks (`src/hooks/`)**:
  - Multi-criteria sorting (e.g. `useFlashcardSort` for recent/progression/alphabetical order) and complex filtering must be encapsulated in dedicated hooks.
  - The organism component simply calls the hook:
    ```ts
    const { sortOption, setSortOption, sortedFlashcards, totalCount } =
      useFlashcardSort(flashcards, filteredFlashcards, isReviewMode);
    ```
- **Extract Sub-Controls into Molecules (`src/components/molecules/`)**:
  - Sub-control bars (such as `FlashcardSortControls`, `BulkActionButtons`, `MappingFilters`) must be extracted into focused molecular components.
  - Wrap molecular controls with `React.memo` and communicate via explicit event props (`onSortChange`, `onFilterChange`) to ensure clean separation of concerns and prevent unnecessary re-renders.

---

## 🔗 Related Documentation
- 📖 **[MAPPING_WORKFLOW.md](./MAPPING_WORKFLOW.md)**: Step-by-step study mapping workflow for AI agents.
- 🗂️ **[FLASHCARD_WORKFLOW.md](./FLASHCARD_WORKFLOW.md)**: Step-by-step local flashcard addition and schema guide.
- 📘 **[AGENTS.md](./AGENTS.md)**: Main operational guide for AI agents and developers.
