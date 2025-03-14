'use client';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import { Counter } from 'src/app/[locale]/(client)/counter/components/Counter';
import { CounterController } from 'src/app/[locale]/(client)/counter/components/CounterController';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { useConstant } from 'src/shared/hooks/useConstant';
import { useExampleTodoMutation } from 'src/shared/services/api/mutations/useExampleTodo.mutation';
import { useExampleTodosQuery } from 'src/shared/services/api/queries/useExampleTodo.query';
import { CounterState, counterStore } from 'src/shared/stores/counter.store';
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
      <ExampleTodo />
    </StateContext.Provider>
  );
};

function GlobalCounter() {
  const state = useSnapshot(counterStore);
  return <div>This counter is global and will not be reset on client-side navigation: {state.count}</div>;
}

function ExampleTodo() {
  const { data: todos } = useExampleTodosQuery();

  const { mutate: updateTodo, data: updatedTodo } = useExampleTodoMutation();
  return (
    <div className='mt-10'>
      TODO example with tanstack query
      <pre>{JSON.stringify(todos, null, 2)}</pre>
      <AppButton onClick={() => updateTodo({ id: 1, title: `New title ${new Date().toISOString()}`, completed: true })}>
        Run update todo mutation
      </AppButton>
      <pre>{JSON.stringify(updatedTodo, null, 2)}</pre>
    </div>
  );
}
