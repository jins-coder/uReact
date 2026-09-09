# 🗺️ uReact Architecture, Completed Milestones & Next-Gen Roadmap

> **The Developer-First Framework Built on React.**  
> Eliminating boilerplate, solving React's architectural gaps, and delivering pure fine-grained reactivity.

---

## 📌 Table of Contents
1. [The 7 Critical Features React Missed (Why uReact Exists)](#-the-7-critical-features-react-missed-why-ureact-exists)
2. [Completed Architecture & Milestones (What We Have Done)](#-completed-architecture--milestones-what-we-have-done)
   - [v1.0 – v2.0: Core Foundation & React 19 Native](#v10--v20-core-foundation--react-19-native)
   - [v2.1.0: Concurrent State, Direct Binding & SWR Cache](#v210-concurrent-state-direct-binding--swr-cache)
   - [v2.2.0-next (Current Canary): Signals v2, Live Sandbox & Beast Tooling](#v220-next-current-canary-signals-v2-live-sandbox--beast-tooling)
3. [What We Need to Take Next (Strategic Roadmap to v3.0)](#-what-we-need-to-take-next-strategic-roadmap-to-v30)
   - [Milestone 1: Ahead-of-Time Zero-Runtime Compiler (Babel/Vite)](#milestone-1-ahead-of-time-zero-runtime-compiler-babelvite)
   - [Milestone 2: Built-in Scoped Styling (`<style scoped>`)](#milestone-2-built-in-scoped-styling-style-scoped)
   - [Milestone 3: RSC Flight Stream Store Synchronization](#milestone-3-rsc-flight-stream-store-synchronization)
   - [Milestone 4: Resumable Islands Architecture (`<Island>`)](#milestone-4-resumable-islands-architecture-island)
   - [Milestone 5: Visual Reactive State Graph DevTools Extension](#milestone-5-visual-reactive-state-graph-devtools-extension)
4. [Version Comparison Matrix](#-version-comparison-matrix)

---

## ⚡ The 7 Critical Features React Missed (Why uReact Exists)

Despite React's dominance, developers across the community have spent the last decade fighting the same foundational limitations. uReact was created to solve these gaps natively:

### 1. Fine-Grained Reactive DOM Updates (No VDOM Diffing)
* **The React Problem:** `setState()` re-executes the **entire component function from top to bottom**, regenerating the Virtual DOM tree and cascading through children unless shielded with manual `React.memo`, `useMemo`, and `useCallback`.
* **uReact Solution:** **Signals v2**. Scalar `signal()` updates mutate only the specific DOM text node binding. The component function does not re-run, eliminating stale closures and dependency array bugs.

### 2. Built-in Form Two-Way Auto-Binding (`v-model` / `$bind`)
* **The React Problem:** Controlled forms require manual `value={state}` and `onChange={e => setState(e.target.value)}` on every single element, leading to massive boilerplate for multi-field forms.
* **uReact Solution:** **Proxy `$bind`**. Simply spread `{...store.$bind.fieldName}`. uReact wires `value`, `checked`, and `onChange` automatically without handlers.

### 3. Property-Level Store Subscriptions (Solving Context Re-render Hell)
* **The React Problem:** `React.createContext` triggers a re-render on **every consumer component** whenever any property in the context changes, forcing developers to adopt third-party libraries (Zustand, Redux, Jotai).
* **uReact Solution:** **`createStore` & `view()`**. Deep reactive proxy tracking subscribes components *only* to the specific properties they read during render.

### 4. Client-Side Top-Level `await` / Native Async Components
* **The React Problem:** React disallows `async function Component()`. You must maintain 3 separate state variables (`loading`, `data`, `error`) inside `useEffect` or wrap everything in `<Suspense>`.
* **uReact Solution:** **Declarative `<Fetch>` & `usePromise`**. Seamlessly unwrap promises directly in JSX with built-in fallback and error slots.

### 5. Built-in Request Cache & SWR (Deduplication out of the box)
* **The React Problem:** Sibling components requesting the same API key fire duplicate network waterfalls unless TanStack Query or SWR is added.
* **uReact Solution:** **Core SWR Engine**. `useQuery()` provides automatic global request deduplication, memory caching, and window focus revalidation in under 1.8KB.

### 6. Declarative Control Flow (No Nested Ternary Hell)
* **The React Problem:** Conditional rendering in JSX forces unreadable nested ternaries (`condition ? (cond2 ? <div> : null) : <div>`) and IIFEs.
* **uReact Solution:** **`<Show>`, `<When>`, `<For>`**. Clean declarative tags that eliminate ternary operators and `.map()` boilerplate.

### 7. Resumability & Partial Hydration (Zero JS by Default)
* **The React Problem:** React sends static HTML, then ships the full JS bundle to hydrate every element from scratch.
* **uReact Roadmap:** Moving toward island-based hydration where static sections ship 0KB of JavaScript.

---

## 🏆 Completed Architecture & Milestones (What We Have Done)

### v1.0 – v2.0: Core Foundation & React 19 Native
- [x] **Deep Proxy Reactivity**: `createStore`, `useStore`, `useLocalStore`, `batch`.
- [x] **Universal Form Binding**: `store.$bind.property` with automated input synchronization.
- [x] **Time-Travel Debugging**: `createHistoryStore` with snapshot rollback and Undo/Redo stacks.
- [x] **Declarative Flow**: `<Show>`, `<When>`, `<For>`, `<Fetch>` primitives.
- [x] **React 19 Native Action Hooks**:
  - `useAction`: Unified `useActionState` + `useOptimistic` with typed input and rollback.
  - `useActionStatus`: Safe `useFormStatus` abstraction.
  - `useFormReset`: Native React 19 `requestFormReset` execution.
  - `usePromise`: Direct unwrapping of async promises inside `<Suspense>`.
  - `<Head>`: Native document title and meta hoisting.

### v2.1.0: Concurrent State, Direct Binding & SWR Cache
- [x] **Concurrent React 18/19 Batching**: Automatic tearing-free state synchronization via `useSyncExternalStore`.
- [x] **Global SWR Query Cache**: `useQuery` and `useMutation` with global key deduplication and optimistic rollbacks.
- [x] **Complete Hooks Reference**: 19 comprehensive hooks with interactive API and example switchers.
- [x] **Light/Dark Mode Theme Contrast**: Pure CSS variables conforming to the authentic `react.dev` palette.

### v2.2.0: Signals v2, Live Sandbox & Beast Tooling
- [x] **Signals v2 Reactivity Engine**:
  - `signal<T>(initial)`: Scalar reactive atom with `.value`, `.peek()`, and automatic subscriber tracking.
  - `computed<T>(getter)`: Lazily evaluated, memoized computed signal with auto-dependency subscription.
  - `createSignalEffect(fn)`: Reaction runner that auto-subscribes to all accessed signals with automatic cleanup.
  - `useSignal()` & `useComputed()`: Seamless JSX component hooks with zero sibling re-renders.
- [x] **Interactive In-Browser Live Code Playground (`/docs/playground`)**:
  - 4 interactive presets: Signals v2, Form `$bind`, React 19 `<ActionForm>`, and Declarative Control Flow.
  - Live editable code block with instant in-browser preview and real-time state inspector.
- [x] **React.dev-Style Version Switcher**:
  - Interactive channel selector dropdown in top header: `v2.3.0` (Latest), `v2.2.0` (Stable), `v2.1.0` (LTS).
  - Next Version Roadmap Modal (`RoadmapModal.tsx`) & dedicated doc view (`/docs/roadmap`).
- [x] **Command Palette v3.0 Search Hub (<kbd>Ctrl</kbd>+<kbd>K</kbd>)**:
  - Raycast-style split preview pane with instant hook code snippet copy (<kbd>Ctrl</kbd>+<kbd>C</kbd>).
  - Zero-allocation pre-indexed search across all 19 hooks and 15 documentation pages.
  - Live expression calculator (type `= 50 * 4` or `calc 1024 / 8` for instant real-time results).
- [x] **Beast Mode CodeBlock Engine (`ReactDevCodeBlock.tsx` & `CodeBlock.tsx`)**:
  - Word wrap toggle (<kbd>WrapText</kbd>) for horizontal scroll vs soft wrapping.
  - 3-step font size zoomer (<kbd>A-</kbd> / <kbd>A</kbd> / <kbd>A+</kbd>).
  - Interactive line pinning & selection on click.
  - Native git diff line rendering (`+` green and `-` red).
  - One-click source file download (<kbd>Download</kbd> `.tsx` / `.ts`).
  - Fullscreen focus modal (<kbd>Maximize2</kbd> / <kbd>Esc</kbd>).
  - Single-line compact badges and titles preventing awkward wrapping.

### v2.3.0 (Latest Release): Developer-Requested Features Engine
- [x] **Built-in Scoped CSS Engine (`<Scoped>` & `useScopedCSS`)**:
  - Component-level scoped stylesheets without Tailwind, CSS Modules, or CSS-in-JS runtime bloat.
  - Automatic selector isolation via unique `[data-scope="us-..."]` injection into `<head>`.
  - Reference-counted mounting and unmounting for zero memory leaks.
- [x] **Reactive Form Store & Validation (`createFormStore` & `rules`)**:
  - Declarative built-in validation rules: `rules.required()`, `rules.email()`, `rules.minLength()`, `rules.pattern()`, `rules.custom()`.
  - Automatic `$bind` integration, dirty checking (`isDirty`), touch tracking (`touched`), error signals (`errors`), and validity (`isValid`).
  - Type-safe `handleSubmit(async (values) => ...)` with automatic preventDefault and touch marking.
- [x] **Universal Reactive State Watcher (`watch` & `useWatchReactive`)**:
  - Clean `(newValue, oldValue)` observation on signals, stores, or reactive getter functions.
  - Runs outside or inside React components without stale closures or `useEffect` dependency warning traps.
- [x] **Built-in DevTools HUD (`<DevTools />` & `registerDevTools`)**:
  - Floating in-browser HUD accessible via keyboard shortcut (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>) or bottom-right pill.
  - Live Store & Signal Inspector with JSON tree exploration.
  - Real-time mutation timeline log with timestamps and rollback telemetry.
  - Reactivity metrics and subscriber health stats.
- [x] **Dedicated Documentation & Interactive Demos**:
  - New `/docs/dev-features` page detailing all 4 developer-requested capabilities with live interactive previews.
  - Scoped CSS & Form Store preset added to `/docs/playground`.

---

## 🚀 What We Need to Take Next (Strategic Roadmap to v3.0)

The next phase of uReact focuses on build-time compiler optimizations, server-client boundary synchronization, and zero-JS hydration:

```
v2.3.0 (Latest)
  │
  ├──► Milestone 1: Ahead-of-Time Zero-Runtime Compiler (RFC-01)
  │
  ├──► Milestone 2: React Server Component (RSC) Direct Flight Stream Sync
  │
  ├──► Milestone 3: Resumable Islands Architecture (<Island client:visible>)
  │
  ├──► Milestone 4: Edge Mutators & Streaming Action RPC
  │
  └──► Milestone 5: Official Chrome / Edge WebExtension DevTools
```

---


### Milestone 1: Ahead-of-Time Zero-Runtime Compiler (Babel/Vite)
* **Goal:** Eliminate runtime Proxy overhead by compiling direct property mutations into optimized atom updates at build time.
* **How it will work:**
  ```tsx
  // What you write (clean, pure JavaScript):
  store.count++;
  store.user.name = "Alex";

  // What the uReact compiler outputs (zero-runtime signal patch):
  store.__patch(['count'], v => v + 1);
  store.__patch(['user', 'name'], () => "Alex");
  ```
* **Developer Advantage:** 100% native object performance with zero garbage collection overhead.

---

### Milestone 2: Built-in Scoped Styling (`<style scoped>`)
* **Goal:** Solve React's styling fragmentation without CSS-in-JS runtime bloat or Tailwind class soup.
* **How it will work:**
  ```tsx
  export function Button({ children }) {
    return (
      <button className="btn">
        {children}
        <style scoped>{`
          .btn {
            background: var(--accent-cyan);
            padding: 8px 16px;
            border-radius: 8px;
            transition: transform 0.15s ease;
          }
          .btn:hover { transform: translateY(-1px); }
        `}</style>
      </button>
    );
  }
  ```
* **Developer Advantage:** Zero configuration, zero CSS collisions, automatic dead-code elimination, and full SSR compatibility.

---

### Milestone 3: RSC Flight Stream Store Synchronization
* **Goal:** Bridge the React Server Component (RSC) boundary seamlessly with client proxy stores.
* **How it will work:**
  ```tsx
  // Server Action:
  export async function updateCart(formData: FormData) {
    'use server';
    return patchStore(cartStore, { items: [...newItems] });
  }

  // Client Component:
  // Automatically hydrates server patches into client proxy stores without manual state synchronization!
  ```
* **Developer Advantage:** Zero client hydration lag, no duplicate fetch requests, and automatic optimistic rollbacks.

---

### Milestone 4: Resumable Islands Architecture (`<Island>`)
* **Goal:** Ship 0KB of JavaScript for static layout and only hydrate interactive components when needed.
* **How it will work:**
  ```tsx
  // Static content: 0KB JS sent to browser
  <Header />
  <HeroSection />

  // Interactive island: only hydrates on user interaction or visibility
  <Island client:visible>
    <InteractiveCalculator />
  </Island>
  ```
* **Developer Advantage:** Perfect 100/100 Lighthouse performance scores and sub-50ms Time-to-Interactive (TTI).

---

### Milestone 5: Visual Reactive State Graph DevTools Extension
* **Goal:** An official Chrome & Edge DevTools extension providing deep observability into uReact reactive state trees.
* **Features:**
  - **Live Dependency Graph**: Visual node tree showing which components read which signals.
  - **Mutation Timeline**: Step-by-step playback of state changes with time-travel scrubbing.
  - **Flamechart Profiler**: Highlights exactly which DOM nodes updated and warns against redundant renders.

---

## 📊 Version Comparison Matrix

| Capability | Standard React 19 | Redux / Zustand | uReact v2.2 (Current) | uReact v3.0 (Planned) |
| :--- | :---: | :---: | :---: | :---: |
| **Fine-Grained Signals** | ❌ No | ❌ Selector-based | ✅ `signal()` / `computed()` | ✅ Ahead-of-Time Compiled |
| **Two-Way Form Binding** | ❌ Manual `onChange` | ❌ Action dispatchers | ✅ Direct `store.$bind` | ✅ Native Type-Safe Forms |
| **Context Rerender Isolation** | ❌ Cascades to all | ⚠️ Requires selectors | ✅ Automatic Proxy Tracking | ✅ Micro-Atom Tracking |
| **Built-in SWR Query Engine** | ❌ External dependency | ❌ External dependency | ✅ Core `useQuery` cache | ✅ RSC Streaming Cache |
| **Declarative Control Flow** | ❌ Nested ternaries | ❌ N/A | ✅ `<Show>`, `<When>`, `<For>` | ✅ Virtualized `<For>` |
| **Component Scoped Styles** | ❌ None | ❌ None | ⚠️ CSS Modules / Vanilla | ✅ Native `<style scoped>` |
| **Interactive Code Playground** | ❌ External (CodeSandbox) | ❌ None | ✅ In-Browser Live Sandbox | ✅ WebContainer Sandbox |
| **Command Palette Search** | ❌ None | ❌ None | ✅ Raycast-style v3.0 Hub | ✅ AI Natural Language Query |
| **JavaScript Hydration Tax** | ❌ Hydrates all nodes | ❌ Full bundle hydration | ⚠️ Standard hydration | ✅ Resumable Islands (0KB JS) |

---

*Authored by the uReact Core Team · Maintained in repository root as `ROADMAP.md`.*
