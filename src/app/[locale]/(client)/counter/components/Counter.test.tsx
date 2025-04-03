import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { Counter } from './Counter';
import { StateContext } from '../CounterPage';
import { CounterState } from 'src/shared/stores/counter.store';
import { proxy } from 'valtio';

// Mock useRerenderCount to avoid console logs during tests
vi.mock('src/shared/hooks/useRerenderCount', () => ({
  useRerenderCount: vi.fn(),
}));

describe('Counter', () => {
  it('should render the counter value', () => {
    const state = proxy(new CounterState());
    state.count = 5;

    render(
      <StateContext.Provider value={state}>
        <Counter />
      </StateContext.Provider>,
    );

    // Using a regex with wildcard to handle the text being split across elements
    expect(screen.getByText(/This counter will be reset/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();

    // Alternative approach using queryByText with a function
    const counter = screen.queryByText((content) => {
      return content.includes('5');
    });
    expect(counter).toBeInTheDocument();
  });
});
