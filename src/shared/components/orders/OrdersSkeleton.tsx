import * as React from 'react';

interface OrdersSkeletonProps {
  readonly count?: number;
}

export function OrdersSkeleton({ count = 3 }: OrdersSkeletonProps) {
  const items = Array.from({ length: count });
  return (
    <div className='space-y-3'>
      {items.map((_, idx) => (
        <div key={idx} className='bg-card border-border animate-pulse rounded-lg border p-4'>
          <div className='bg-muted mb-2 h-4 w-1/3 rounded' />
          <div className='bg-muted mb-2 h-3 w-1/4 rounded' />
          <div className='bg-muted mb-2 h-3 w-1/2 rounded' />
          <div className='bg-muted h-3 w-2/3 rounded' />
        </div>
      ))}
    </div>
  );
}
