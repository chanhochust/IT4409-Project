export function AddressSkeleton() {
  return (
    <div className='border-border bg-card space-y-3 rounded-lg border p-4'>
      <div className='bg-muted h-5 w-24 animate-pulse rounded' />
      <div className='bg-muted h-4 w-32 animate-pulse rounded' />
      <div className='space-y-2'>
        <div className='bg-muted h-4 w-full animate-pulse rounded' />
        <div className='bg-muted h-4 w-3/4 animate-pulse rounded' />
      </div>
      <div className='flex justify-between pt-2'>
        <div className='bg-muted h-6 w-20 animate-pulse rounded' />
        <div className='bg-muted h-8 w-16 animate-pulse rounded' />
      </div>
    </div>
  );
}
