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
