import { atom, createStore } from 'jotai';

export const counterStore = createStore();
export class CounterAtom {
  static readonly count = atom(10);
}

export class CounterAction {
  static decrement() {
    counterStore.set(CounterAtom.count, (c) => c - 1);
  }

  static increment() {
    counterStore.set(CounterAtom.count, (c) => c + 1);
  }
}
