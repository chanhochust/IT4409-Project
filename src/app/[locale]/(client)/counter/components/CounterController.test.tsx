import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { CounterController } from './CounterController';
import { StateContext } from '../CounterPage';
import { CounterState } from 'src/shared/stores/counter.store';

// Mock useRerenderCount to avoid console logs during tests
vi.mock('src/shared/hooks/useRerenderCount', () => ({
  useRerenderCount: vi.fn(),
}));

// Mock the counter store to prevent global state changes
vi.mock('src/shared/stores/counter.store', () => {
  const CounterState = vi.fn().mockImplementation(() => ({
    count: 0,
    increment: vi.fn(),
    decrement: vi.fn(),
  }));

  return {
    CounterState,
    counterStore: {
      increment: vi.fn(),
      decrement: vi.fn(),
    },
  };
});

describe('CounterController', () => {
  it('should render increment and decrement buttons', () => {
    const state = new CounterState();

    render(
      <StateContext.Provider value={state}>
        <CounterController />
      </StateContext.Provider>,
    );

    expect(screen.getByText('Increment')).toBeInTheDocument();
    expect(screen.getByText('Decrement')).toBeInTheDocument();
    expect(screen.getByText('Increment global counter')).toBeInTheDocument();
    expect(screen.getByText('Decrement global counter')).toBeInTheDocument();
  });

  it('should call increment when increment button is clicked', () => {
    const state = new CounterState();
    state.increment = vi.fn();

    render(
      <StateContext.Provider value={state}>
        <CounterController />
      </StateContext.Provider>,
    );

    fireEvent.click(screen.getByText('Increment'));
    expect(state.increment).toHaveBeenCalledTimes(1);
  });

  it('should call decrement when decrement button is clicked', () => {
    const state = new CounterState();
    state.decrement = vi.fn();

    render(
      <StateContext.Provider value={state}>
        <CounterController />
      </StateContext.Provider>,
    );

    fireEvent.click(screen.getByText('Decrement'));
    expect(state.decrement).toHaveBeenCalledTimes(1);
  });
});
