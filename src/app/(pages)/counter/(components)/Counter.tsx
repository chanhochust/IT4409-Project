'use client'
import {useAtomValue} from "jotai";
import {CounterAtom} from "src/app/(pages)/counter/state";
import {useAtom} from "jotai";

export const Counter = () => {
  useAtom(CounterAtom.countEffect);
  const count = useAtomValue(CounterAtom.count);
  const countEven = useAtomValue(CounterAtom.countEven);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <h3>Even Counter: {countEven}</h3>
    </div>
  );
}