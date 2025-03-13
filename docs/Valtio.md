# Using Valtio Proxy State to Manage State Correctly

Valtio is a state management library that leverages JavaScript proxies to provide fine-grained reactivity. This document describes two approaches to manage state using Valtio:

1. Component-Level State Management (Local State)
2. Global State Management

---

## 1. Component-Level State Management with React Context

When you need state that is local to a component and should be reset when the component is unmounted, you can define the Valtio proxy inside the parent component or along with React Context.

### Example:
```tsx
import React, { createContext, useContext } from 'react';
import { proxy, useSnapshot } from 'valtio';

// Define the shape of local state
type LocalState = {
  count: number;
};

// Create a context to hold the proxy state
const LocalStateContext = createContext<ReturnType<typeof createLocalState> | null>(null);

// Function to create a new local proxy state
function createLocalState() {
  return proxy<LocalState>({ count: 0 });
}

export const ParentComponent: React.FC = () => {
  // Define the state inside the component so it resets on unmount
  const localState = createLocalState();

  return (
    <LocalStateContext.Provider value={localState}>
      <ChildComponent />
    </LocalStateContext.Provider>
  );
};

const ChildComponent: React.FC = () => {
  const localState = useContext(LocalStateContext);
  if (!localState) {
    throw new Error('LocalStateContext must be provided');
  }
  const snap = useSnapshot(localState);

  return (
    <div>
      <p>Count: {snap.count}</p>
      <button onClick={() => localState.count++}>Increment</button>
    </div>
  );
};
```

**Explanation:**
In this example, the local Valtio state is created inside the `ParentComponent` and provided via `LocalStateContext`. This ensures that whenever `ParentComponent` is unmounted, the state resets to its initial value.

---

## 2. Global State Management

For application-wide state that should persist across client navigation and remain constant even when components unmount, define the Valtio proxy outside of any React component.

### Example:
```tsx
import React from 'react';
import { proxy, useSnapshot } from 'valtio';

// Define the shape of global state
type GlobalState = {
  todos: string[];
};

// Define global state outside the component tree so it persists across client navigations
export const globalState = proxy<GlobalState>({ todos: [] });

export const TodoApp: React.FC = () => {
  const snap = useSnapshot(globalState);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {snap.todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <button onClick={() => globalState.todos.push(`New Todo ${snap.todos.length + 1}`)}>
        Add Todo
      </button>
    </div>
  );
};
```

**Explanation:**
By defining `globalState` outside of any component, the state remains persistent across component mounts and unmounts. This approach is ideal for scenarios where you need long-lived state in your application.

---

## 3. Next.js Counter Page Example

The following example demonstrates how to use Valtio in a Next.js page by combining both component-level and global state management. In this example, the local state is created within the component using a custom hook (useConstant) and provided via React Context, ensuring the state resets on component unmount. The global state is imported from a separate store (counterStore), making it persistent across client-side navigation.

```tsx
'use client';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import { Counter } from 'src/app/(pages)/counter/components/Counter';
import { CounterController } from 'src/app/(pages)/counter/components/CounterController';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { useConstant } from 'src/shared/hooks/useConstant';
import { CounterState, counterStore } from 'src/shared/store/counter.store';
import { proxy, useSnapshot } from 'valtio';

export const StateContext = createContext<CounterState>({} as CounterState);

export const CounterPage = () => {
  const router = useRouter();
  const state = useConstant(() => proxy(new CounterState()));

  return (
    <StateContext.Provider value={state}>
      <Counter />
      <CounterController />
      <GlobalCounter />
      <AppButton onClick={() => router.push('/')} className='mt-3'>
        Navigate to homepage
      </AppButton>
    </StateContext.Provider>
  );
};

function GlobalCounter() {
  const state = useSnapshot(counterStore);
  return <div>This counter is global and will not be reset on client-side navigation: {state.count}</div>;
}

## Best Practices for Structuring Proxy State

While you can use nested proxy states at multiple levels, it is recommended to keep your state structure flat. Instead of nesting proxies, consider creating a single object that aggregates different pieces of state. This approach reduces complexity and ensures that each key-value pair is individually reactive.

Alternatively, you can use a class to encapsulate both states and actions. For example:

```tsx
class CounterState {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export const counterState = proxy(new CounterState());
```

This pattern helps organize your state management logic by grouping state properties and their associated actions in a single, maintainable structure. More on https://valtio.dev/docs/how-tos/how-to-organize-actions

## Advanced Use-Cases

For more advanced state management scenarios, including performance optimizations and fine-grained reactivity, please refer to the official Valtio documentation:

[Valtio Getting Started](https://valtio.dev/docs/introduction/getting-started)

---

This document provides guidelines for choosing between local component-level state management using React Context and global state management with Valtio. Choose the approach that best fits your application's requirements.
