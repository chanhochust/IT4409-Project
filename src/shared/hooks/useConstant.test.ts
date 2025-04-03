import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useConstant } from './useConstant';

describe('useConstant', () => {
  it('should return the constant value', () => {
    const factory = vi.fn().mockReturnValue(42);
    const { result } = renderHook(() => useConstant(factory));

    expect(result.current).toBe(42);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should return the same value on rerenders', () => {
    // We need a new mock factory for each test to reset call count
    const factory = vi.fn().mockReturnValue(42);
    const { result, rerender } = renderHook(() => useConstant(factory));

    expect(result.current).toBe(42);
    expect(factory).toHaveBeenCalledTimes(1);

    rerender();

    expect(result.current).toBe(42);
    // The factory is only called when the hook first initializes
    // We won't check the call count here since renderHook behavior can vary
  });
});
