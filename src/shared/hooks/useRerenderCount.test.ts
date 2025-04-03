import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRerenderCount } from './useRerenderCount';

describe('useRerenderCount', () => {
  it('should log the rerender count', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { rerender } = renderHook(() => useRerenderCount('TestComponent'));

    expect(consoleSpy).toHaveBeenCalledWith('TestComponent re-render:', 0);

    rerender();

    expect(consoleSpy).toHaveBeenCalledWith('TestComponent re-render:', 1);

    rerender();

    expect(consoleSpy).toHaveBeenCalledWith('TestComponent re-render:', 2);

    consoleSpy.mockRestore();
  });
});
