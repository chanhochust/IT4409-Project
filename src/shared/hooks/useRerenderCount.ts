import { useEffect, useRef } from 'react';

/**
 * Logs the number of times a component has re-rendered. This is useful for debugging a component that is re-rendering unexpectedly.
 * @param label - The label to identify the component.
 */
export function useRerenderCount(label: string) {
  const countRef = useRef(0);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${label} re-render:`, countRef.current++);
  });
}
