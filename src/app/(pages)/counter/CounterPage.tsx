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
/**
 * Read more at the docs/Valtio.md file for more information on when to use Valtio for each usecase
 * @returns
 */
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
