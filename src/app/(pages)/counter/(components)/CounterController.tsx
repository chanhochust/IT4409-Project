'use client'
import {useSetAtom} from "jotai";
import {CounterAtom} from "src/app/(pages)/counter/state";


export const CounterController = () => {
  const setCount = useSetAtom(CounterAtom.count);

  function increment() {
    setCount((c) => c + 1);
  }

  function decrement() {
    setCount((c) => c - 1);
  }


  return (
    <div className="flex gap-4">
      <button className="bg-red-600" onClick={increment}>Increment</button>
      <button className="bg-red-600" onClick={decrement}>Decrement</button>
    </div>
  );
}