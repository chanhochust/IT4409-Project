export function ProductsGridSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Toolbar Skeleton */}
      <div className='flex items-center justify-between gap-4 py-6'>
        <div className='bg-muted h-8 w-32 animate-pulse rounded' />
        <div className='bg-muted h-9 w-32 animate-pulse rounded' />
      </div>

      {/* Grid Skeleton */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {Array.from({ length: 20 }).map((_, idx) => (
          <div key={idx} className='border-border bg-card space-y-3 rounded-lg border p-3'>
            <div className='bg-muted h-40 animate-pulse rounded' />
            <div className='bg-muted h-4 w-3/4 animate-pulse rounded' />
            <div className='bg-muted h-4 w-1/2 animate-pulse rounded' />
            <div className='flex justify-between pt-2'>
              <div className='bg-muted h-5 w-1/3 animate-pulse rounded' />
              <div className='bg-muted h-5 w-1/4 animate-pulse rounded' />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className='flex items-center justify-center gap-2 py-8'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className='bg-muted h-8 w-8 animate-pulse rounded' />
        ))}
      </div>
    </div>
  );
}
