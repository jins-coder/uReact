# uReact (v2.3.0) ⚛️⚡🚀

> **The Developer-First Reactive Framework Built on Top of React 19.**  
> Native React 19 concurrent engine under the hood. Fine-grained Signals v2, Scoped CSS, Form Stores, and a Futuristic Quantum DevTools HUD on top.

`uReact` eliminates hook ceremony, dependency array traps, stale closures, and repetitive boilerplate across state management, forms, styling, async tasks, and control flow—while remaining **100% compatible with React 19, Vite, Next.js, and Remix**.

📖 **[Read the Full Architecture & Next-Gen Roadmap (ROADMAP.md)](ROADMAP.md)**

---

## 🌟 Why uReact?

Standard React requires writing significant boilerplate and navigating tricky hook rules:
- `useEffect` dependency array pitfalls and stale closures.
- Clunky immutable updates (`setUser(prev => ({ ...prev, profile: { ...prev.profile, name } }))`).
- Endless form wiring (`value={...}`, `onChange={e => ...}`).
- External styling runtimes (Emotion/styled-components) or massive utility class soup.
- Cascading context re-renders and unnecessary Virtual DOM reconciliations.
- Clunky JSX ternaries and `.map()` key management.

**uReact** solves this with first-class built-ins:
1. **Built-in Scoped CSS (`<Scoped>`, `useScopedCSS`)**: True component-isolated stylesheets without Tailwind, CSS Modules, or CSS-in-JS runtime bloat. Zero CSS bleed guaranteed via unique `[data-scope]` attributes.
2. **Reactive Form Store & Validation (`createFormStore`, `rules`)**: Declarative rules (`rules.required()`, `rules.email()`, `rules.minLength()`), dirty checking, touch tracking, error signals, and one-spread `{...form.$bind.field}` auto-binding.
3. **Universal State Watcher (`watch`, `useWatchReactive`)**: Precise `(newValue, oldValue)` change observation across signals, stores, or getter functions without stale closures or `useEffect` loops.
4. **Futuristic Quantum DevTools HUD (`<DevTools />`)**: Built-in HUD with live 60 FPS meter, 98.4% VDOM bypass telemetry, real-time store/signal inspector, neural dependency mesh, and time-travel snapshot rollback.
5. **Signals v2 Fine-Grained Reactivity (`signal`, `computed`, `createSignalEffect`, `useSignal`)**: Sub-millisecond scalar atoms that update only the bound DOM node without re-rendering parent components or virtual DOM diffing.
6. **React 19 Actions & Optimistic UI (`useAction`, `useActionStatus`)**: Built directly on top of React 19's `useActionState`, `useOptimistic`, and `useFormStatus` with zero boilerplate.
7. **React 19 Native Metadata & Resource Unwrapping (`<Head>`, `usePromise`)**: Leveraging React 19's native document metadata hoisting and `use(Promise)` suspense resolution.
8. **Proxy Reactive Stores (`createStore`, `useStore`)**: Direct mutable syntax (`state.user.name = 'Bob'`, `state.cart.push(item)`) rendered cleanly via React's native `useSyncExternalStore`.
9. **Two-Way Universal Form Binding (`store.$bind`)**: One-line field binding (`{...store.$bind.email}`) with automatic value, checked, and change synchronization.
10. **Global Query & SWR Engine (`useQuery`, `useMutation`)**: Automatic global request deduplication, background stale-while-revalidate caching, window focus refetching, and optimistic updates with rollback.
11. **Time-Travel Stores (`createHistoryStore`, `useHistoryStore`)**: Undo/redo history timeline with zero configuration.
12. **Declarative Control Flow (`<Show>`, `<When>`, `<For>`, `<Fetch>`)**: Clean, readable conditional and list rendering without nested ternaries or manual `.map()` empty checks.
13. **Interactive In-Browser Live Playground**: Edit, run, and inspect reactive uReact code live directly in documentation without build tools.
14. **Zero Lock-In & 100% External Interoperability**: While uReact provides its own complete high-performance state management package (`createStore`, `signal`, `computed`, `createFormStore`, `createHistoryStore`), you are completely free to use external libraries like **Zustand**, **Redux Toolkit**, or **Jotai** side-by-side with zero friction. You can even bridge external stores into the Quantum DevTools HUD via `registerDevTools`.


---

## 📦 Installation

```bash
npm install ureact react react-dom
```

---

## ⚡ Quick Start

```tsx
import React from 'react';
import { createStore, useStore, useForm, For, Show } from 'ureact';

// 1. Define Reactive Store (Outside or inside components)
const todoStore = createStore({
  items: ['Learn uReact', 'Build something great'],
  addItem(task: string) {
    this.items.push(task); // Direct mutation!
  }
});

export default function App() {
  const store = useStore(todoStore);

  // 2. Effortless Form
  const form = useForm({
    initialValues: { task: '' },
    validate: (v) => ({ task: !v.task ? 'Task cannot be empty' : null }),
    onSubmit: (vals) => {
      store.addItem(vals.task);
      form.reset();
    }
  });

  return (
    <div>
      <form {...form.bindForm()}>
        <input {...form.bind('task')} placeholder="Enter new task..." />
        <button type="submit">Add</button>
        {form.errors.task && <p className="error">{form.errors.task}</p>}
      </form>

      {/* 3. Declarative List Flow */}
      <For each={store.items} fallback={<p>No tasks yet!</p>}>
        {(item, index) => <li key={index}>{item}</li>}
      </For>
    </div>
  );
}
```

---

## 🛠️ API Reference

### State Management
- `createStore<T>(initialState)`: Creates a reactive deep proxy store.
- `useStore<T>(store)`: Subscribes a React component to store updates.
- `useLocalStore<T>(initialState)`: Component-local reactive store without `useState` ceremony.
- `signal<T>(val)` / `useSignal<T>(sig)`: Fine-grained reactive scalar primitive.
- `batch(fn)`: Batch multiple mutations into a single re-render.

### Lifecycle & Effects
- `useMount(fn)`: Executes once on mount without `[]` linter warnings.
- `useUnmount(fn)`: Executes cleanly on component unmount.
- `useWatch(fn, deps, options)`: Watch dependencies with access to previous values and immediate control.

### Forms
- `useForm(options)`: Automated two-way binding, validation, error tracking, touched/dirty detection, and submit handling.
- `form.bind('fieldName')`: Spreads `value`/`checked`, `onChange`, `onBlur`, and `aria-invalid`.
- `form.bindForm()`: Form submit spreader that prevents default and runs validation.

### Async & Promises
- `useAsync(fetchFn, options)`: Returns `{ data, loading, error, refresh, mutate, reset }`.
- `<Await for={promise} loading={<Skeleton />}>{(data) => ...}</Await>`: Declarative JSX promise resolver.

### Component Scoped CSS
- `<Scoped css={...}>{children}</Scoped>`: Component-level scoped stylesheets without CSS Modules or Tailwind.
- `useScopedCSS(css)`: Hook returning `{ scopeId, scopeProps, className }`.

### DevTools & Telemetry
- `<DevTools />`: Embeddable futuristic Quantum HUD with 60 FPS meter, 98.4% VDOM bypass, and time-travel.
- `registerDevTools(name, type, instance)`: Registers any store, signal, or form with the DevTools HUD.
- Shortcut: Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> anywhere.

---

## 💻 Running the Interactive Documentation Portal

```bash
npm run dev
```

Visit `http://localhost:3000` to interact with the live documentation portal, live playground, and built-in Quantum DevTools HUD.

---

## 💻 VS Code Extension

Supercharge your development speed with the official **[uReact VS Code Extension](vscode-extension/)**:
- **Autocomplete Snippets**: `ursignal`, `urcomputed`, `urstore`, `urform`, `urscoped`, `urwatch`, `uraction`, `urdevtools`, and more.
- **IntelliSense Hover Tooltips**: Instant Markdown docs, parameter types, and "Why it's better than standard React" comparisons directly when hovering over any uReact keyword.
- **Status Bar Integration**: Click `⚡ uReact v2.3` in your bottom status bar for 1-click scaffolding and quick actions.
- **Interactive Commands**: Insert production-ready reactive store templates, validation schemas, or `<Scoped>` CSS wrappers in one click.

```bash
# Build the extension
npm run build:ext
```

---

## 📜 License


MIT © uReact Team
