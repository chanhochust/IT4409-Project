import { describe, expect, it } from 'vitest';
import { CounterState, counterStore } from './counter.store';

describe('CounterState', () => {
  it('should initialize with count 0', () => {
    const state = new CounterState();
    expect(state.count).toBe(0);
  });

  it('should increment count', () => {
    const state = new CounterState();
    state.increment();
    expect(state.count).toBe(1);
  });

  it('should decrement count', () => {
    const state = new CounterState();
    state.decrement();
    expect(state.count).toBe(-1);
  });
});

describe('counterStore', () => {
  it('should be an instance of CounterState', () => {
    expect(counterStore).toBeInstanceOf(CounterState);
  });

  it('should start with count 0', () => {
    expect(counterStore.count).toBe(0);
  });

  it('should increment count', () => {
    const initialCount = counterStore.count;
    counterStore.increment();
    expect(counterStore.count).toBe(initialCount + 1);

    // Reset for other tests
    counterStore.count = 0;
  });

  it('should decrement count', () => {
    const initialCount = counterStore.count;
    counterStore.decrement();
    expect(counterStore.count).toBe(initialCount - 1);

    // Reset for other tests
    counterStore.count = 0;
  });
});
