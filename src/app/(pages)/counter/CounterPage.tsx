'use client';
import { Counter } from 'src/app/(pages)/counter/components/Counter';
import { CounterController } from 'src/app/(pages)/counter/components/CounterController';
import { counterStore } from 'src/app/(pages)/counter/state';
import { useRouter } from 'next/navigation';
import { Provider } from 'jotai';

export const CounterPage = () => {
  const router = useRouter();

  return (
    <Provider store={counterStore}>
      <Counter />
      <CounterController />
      <button onClick={() => router.push('/')}>Navigate to homepage</button>
    </Provider>
  );
};
