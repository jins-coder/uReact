# uReact (v2.0.0) ⚛️🚀

> **The Developer-First Framework Built on Top of React 19.**  
> Latest React 19 under the hood. Pure velocity and joy on top.

`uReact` eliminates hook ceremony, dependency array traps, stale closures, and repetitive boilerplate across state management, forms, async tasks, and control flow—while remaining **100% compatible with React 19, Vite, Next.js, and Remix**.

---

## 🌟 Why uReact?

Standard React requires writing significant boilerplate and navigating tricky hook rules:
- `useEffect` dependency array pitfalls and stale closures.
- Clunky immutable updates (`setUser(prev => ({ ...prev, profile: { ...prev.profile, name } }))`).
- Endless form wiring (`value={...}`, `onChange={e => ...}`).
- Clunky JSX ternaries and `.map()` key management.

**uReact** solves this by providing:
1. **React 19 Actions & Optimistic UI (`useAction`, `useActionStatus`)**: Built directly on top of React 19's `useActionState`, `useOptimistic`, and `useFormStatus` with zero boilerplate.
2. **React 19 Native Metadata & Resource Unwrapping (`<Head>`, `usePromise`)**: Leveraging React 19's native document metadata hoisting and `use(Promise)` suspense resolution.
3. **Proxy Reactive Stores (`createStore`, `useStore`)**: Direct mutable syntax (`state.user.name = 'Bob'`, `state.cart.push(item)`) rendered cleanly via React's native `useSyncExternalStore`.
4. **Global Query & SWR Engine (`useQuery`, `useMutation`)**: Automatic global request deduplication, background stale-while-revalidate caching, window focus refetching, and optimistic updates with rollback.
5. **Time-Travel Stores (`createHistoryStore`, `useHistoryStore`)**: Undo/redo history timeline with zero configuration.
6. **Two-Way Form Binding (`useForm`)**: One-line field binding (`form.bind('email')`) with automatic validation, touched tracking, and submit handling.
7. **Zero-Ceremony Async (`useAsync`, `<Await>`)**: Single-line async runner with loading, error states, automatic unmount protection, race-condition safety, and optimistic mutations.
8. **Declarative Control Flow (`<Show>`, `<For>`, `<Switch>`)**: Clean, readable conditional and list rendering without nested ternaries or manual `.map()` empty checks.
9. **Ergonomic Utilities**: `useShortcut`, `useInView`, `useQueryParam`, `useDebounce`, `useToggle`, `useLocalStorage`, `useEventListener`.

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

### Declarative Control Flow
- `<Show when={condition} fallback={<Fallback />}>{children}</Show>`
- `<For each={items} fallback={<Empty />}>{(item, index) => ...}</For>`
- `<Switch fallback={<DefaultState />}><Case when={...}>...</Case><Default>...</Default></Switch>`

---

## 💻 Running the Interactive Playground

```bash
npm run dev
```

Visit `http://localhost:3000` to interact with the live comparison playground.

---

## 📜 License

MIT © uReact Team
