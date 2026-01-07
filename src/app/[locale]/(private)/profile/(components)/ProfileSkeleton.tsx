import React from 'react';

export function ProfileSkeleton() {
  return (
    <div className='grid animate-pulse gap-8 lg:grid-cols-12'>
      <div className='lg:col-span-4'>
        <div className='border-border bg-card-bg flex flex-col items-center rounded-lg border p-8'>
          <div className='bg-muted/20 mb-6 h-32 w-32 rounded-full' />
          <div className='bg-muted/20 mb-2 h-6 w-32 rounded' />
          <div className='bg-muted/20 mb-6 h-4 w-20 rounded' />
          <div className='flex gap-2'>
            <div className='bg-muted/20 h-6 w-16 rounded-full' />
            <div className='bg-muted/20 h-6 w-16 rounded-full' />
          </div>
        </div>
      </div>
      <div className='lg:col-span-8'>
        <div className='border-border bg-card-bg rounded-lg border p-8'>
          <div className='space-y-8'>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className='flex gap-4'>
                <div className='bg-muted/20 h-10 w-10 rounded-lg' />
                <div className='space-y-2'>
                  <div className='bg-muted/20 h-3 w-20 rounded' />
                  <div className='bg-muted/20 h-4 w-48 rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
