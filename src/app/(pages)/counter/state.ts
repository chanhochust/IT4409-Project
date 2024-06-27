import {atom} from "jotai";
import {atomEffect} from "jotai-effect";
import {jotaiStore} from "src/lib/providers/jotaiStoreProvider";


export class CounterAtom {
  static readonly count = atom(0);
  static readonly countEven = atom(0);


  static readonly countEffect = atomEffect(
    (get, set) => {
      const count = get(CounterAtom.count);
      console.log("CounterAtom.countEffect", count);

      if (count % 2 === 0) {
        set(CounterAtom.countEven, count);
      }
    },
  );

}

export class CounterAction {
  static increment() {
    jotaiStore.set(CounterAtom.count, (c) => c + 1);
  }

  static decrement() {
    jotaiStore.set(CounterAtom.count, (c) => c - 1);
  }
}