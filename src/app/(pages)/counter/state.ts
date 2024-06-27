import { atomEffect } from 'jotai-effect'
import { atom, createStore } from 'jotai'

export const counterStore = createStore()
export class CounterAtom {
  static readonly count = atom(10)
  static readonly countEven = atom(0)

  static readonly countEffect = atomEffect((get, set) => {
    const count = get(CounterAtom.count)
    console.log('CounterAtom.countEffect', count)

    if (count % 2 === 0) {
      set(CounterAtom.countEven, count)
    }
  })
}

export class CounterAction {
  static increment() {
    counterStore.set(CounterAtom.count, (c) => c + 1)
  }

  static decrement() {
    counterStore.set(CounterAtom.count, (c) => c - 1)
  }
}
