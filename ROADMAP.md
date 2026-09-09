# 🗺️ uReact Version Roadmap & Release Plan

This document outlines the strategic version roadmap for **uReact**—the developer-first framework built directly on top of React.

---

## 📌 Release Summary & Future Milestones

```
v1.0.0 (Foundation) ──> v1.1.0 (Productivity) ──> v1.2.0 (Query & Cache) ──> v1.3.0 (Router & Head) ──> v1.4.0 (Motion & Virtual) ──> v1.5.0 (Realtime) ──> v2.0.0 (RSC & React 19)
```

---

## ✅ v1.0.0 — The Core Foundation *(Released)*
- **Deep Proxy Reactivity**: `createStore`, `useStore`, `useLocalStore`, `signal`, `useSignal`, `batch`.
- **Zero-Boilerplate Forms**: `useForm` with automated two-way binding (`form.bind('field')`), validation, touched tracking, and `bindForm()`.
- **Async Safety**: `useAsync` with race-condition prevention, unmount safety, automatic retry, and optimistic mutations.
- **Declarative Control Flow**: `<Show>`, `<For>`, `<Switch>`, `<Case>`, `<Default>`, `<Await>`.
- **Essential Utility Hooks**: `useToggle`, `useLocalStorage`, `useDebounce`, `useEventListener`, `useInterval`.
- **Interactive Showcase & Docs**: Live side-by-side comparison app demonstrating ~68% boilerplate reduction.

---

## ✅ v1.1.0 — Time-Travel & Productivity *(Released)*
- **Time-Travel State**: `createHistoryStore` & `useHistoryStore` with built-in Undo / Redo stacks, history snapshots, and reset.
- **Declarative Keyboard Shortcuts**: `useShortcut` supporting multi-key combinations (`mod+z`, `ctrl+y`, `cmd+k`, `escape`).
- **Viewport Intersection**: `useInView` for effortless scroll-based animations and lazy loading.
- **Interactive Time-Travel Canvas**: Live visual playground for testing undo/redo history stacks.

---

## 🚀 v1.2.0 — Global Query & Stale-While-Revalidate (SWR) *(Next Up)*
*Goal: Eliminate external dependencies like TanStack Query / SWR for 95% of applications.*

- **`createQuery(key, fetcher, options)` / `useQuery`**:
  - Global query deduplication (if 3 components request the same data, only 1 network call fires).
  - Stale-While-Revalidate caching strategy with configurable `staleTime` and `cacheTime`.
  - Automatic background refetch on browser window focus and network reconnect.
- **`useMutation`**:
  - Optimistic updates with automatic rollback on network failure.
  - Automatic query cache invalidation (e.g., `invalidateQueries(['todos'])`).
- **`createResource`**:
  - React Suspense-compatible resource loaders.

---

## 🌐 v1.3.0 — URL State, Navigation & Head Management
*Goal: Eliminate URL synchronization ceremony and meta tag manipulation.*

- **`useQueryParam<T>(key, defaultValue)`**:
  - Two-way reactive synchronization between component state and browser URL query parameters:
    ```tsx
    const [tab, setTab] = useQueryParam('tab', 'overview');
    // Calling setTab('billing') automatically updates the URL without page reloads!
    ```
- **`useHead` / `<Meta>`**:
  - Declarative page titles, OpenGraph, and Twitter cards without needing heavy libraries:
    ```tsx
    useHead({ title: 'Dashboard — My App', meta: [{ name: 'description', content: '...' }] });
    ```
- **Lightweight Micro-Router (`<Router>`, `<Route>`, `<Link>`)**:
  - Ultra-light (under 2KB) client-side routing for SPAs that do not need heavy 50KB routing setups.

---

## 🎨 v1.4.0 — Motion, Gestures & List Virtualization
*Goal: High-performance animations and massive dataset rendering out of the box.*

- **Virtualized `<For>` (`<For virtualized each={...} itemHeight={48}>`)**:
  - Smoothly render 50,000+ rows at 60 FPS with zero DOM bloat.
- **`<Transition>` & `<Animate>` Primitives**:
  - Declarative enter / exit CSS transitions when components appear or unmount (without Framer Motion overhead).
- **`useDrag` / `usePinch` Gestures**:
  - Pointer and touch gesture handling with inertia and bounds calculation.

---

## ⚡ v1.5.0 — Real-Time, AI Streaming & Offline Sync
*Goal: Modern AI-era real-time interactivity and resilient offline capabilities.*

- **`useSSE` (Server-Sent Events)**:
  - Built-in streaming hook optimized for LLM token streaming (ChatGPT-like interfaces):
    ```tsx
    const { stream, status } = useSSE('/api/ai/generate');
    ```
- **`useWebSocket`**:
  - Auto-reconnecting, heartbeat-monitored WebSocket hook with typed message dispatch.
- **Offline Mutation Queue**:
  - Automatically captures actions when offline and replays them sequentially once the connection restores.

---

## 💎 v2.0.0 — React 19 Compiler & Full-Stack Evolution
*Goal: Major architectural evolution aligned with modern React 19 standards.*

- **React 19 Actions & `useActionState` Alignment**: Native interoperability with React 19 server actions.
- **Optional Zero-Cost Babel / Vite Compiler Plugin**: Compile-time reactivity analysis that generates fine-grained signals automatically.
- **RSC (React Server Component) Hydration Bridges**: Stream proxy state from server to client with zero serialization boilerplate.
- **`ureact/native`**: First-class support for React Native with optimized mobile touch primitives.
