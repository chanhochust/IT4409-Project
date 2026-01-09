import React from 'react';

export function CartSkeleton() {
  return (
    <div className='flex gap-4 px-6 py-4'>
      <div className='bg-muted h-24 w-24 animate-pulse rounded' />
      <div className='flex-1 space-y-3'>
        <div className='bg-muted h-5 w-3/4 animate-pulse rounded' />
        <div className='bg-muted h-4 w-1/2 animate-pulse rounded' />
        <div className='bg-muted h-4 w-1/4 animate-pulse rounded' />
      </div>
    </div>
  );
}
