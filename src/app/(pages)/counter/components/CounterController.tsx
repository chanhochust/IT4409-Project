'use client';
import { CounterAction } from 'src/app/(pages)/counter/state';
import { AppButton } from 'src/shared/components/button/AppButton';

export const CounterController = () => {
  return (
    <div className='mb-4 flex gap-4'>
      <AppButton onClick={CounterAction.increment}>Increment</AppButton>
      <AppButton onClick={CounterAction.decrement}>Decrement</AppButton>
    </div>
  );
};
