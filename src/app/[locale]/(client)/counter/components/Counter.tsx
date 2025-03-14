'use client';
import { useContext } from 'react';
import { StateContext } from 'src/app/[locale]/(client)/counter/CounterPage';
import { useRerenderCount } from 'src/shared/hooks/useRerenderCount';
import { useSnapshot } from 'valtio';

export const Counter = () => {
  const state = useContext(StateContext);
  const stateSnapshot = useSnapshot(state);
  useRerenderCount('Counter');
  return (
    <div>
      <h1>
        This counter will be reset on component un-mount:
        {stateSnapshot.count}
      </h1>
    </div>
  );
};
