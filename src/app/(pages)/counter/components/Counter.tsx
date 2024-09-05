'use client';
import { useAtom, useAtomValue } from 'jotai';
import { CounterAtom } from 'src/app/(pages)/counter/state';

export const Counter = () => {
  const count = useAtomValue(CounterAtom.count);
  return (
    <div>
      <h1>
        Counter:
        {count}
      </h1>
    </div>
  );
};
