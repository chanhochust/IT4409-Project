export function ProductSkeleton() {
  return (
    <div className='space-y-6 py-8'>
      {/* Gallery Skeleton */}
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='bg-muted h-96 animate-pulse rounded-lg' />
        <div className='space-y-4'>
          {/* Title Skeleton */}
          <div className='space-y-2'>
            <div className='bg-muted h-8 w-3/4 animate-pulse rounded' />
            <div className='bg-muted h-6 w-1/2 animate-pulse rounded' />
          </div>

          {/* Badge Skeleton */}
          <div className='flex gap-2'>
            <div className='bg-muted h-6 w-20 animate-pulse rounded-full' />
            <div className='bg-muted h-6 w-20 animate-pulse rounded-full' />
          </div>

          {/* Description Skeleton */}
          <div className='space-y-2 pt-4'>
            <div className='bg-muted h-4 w-full animate-pulse rounded' />
            <div className='bg-muted h-4 w-full animate-pulse rounded' />
            <div className='bg-muted h-4 w-2/3 animate-pulse rounded' />
          </div>

          {/* Purchase Panel Skeleton */}
          <div className='border-border bg-card mt-6 space-y-4 rounded-lg border p-4'>
            <div className='bg-muted h-10 w-1/2 animate-pulse rounded' />
            <div className='bg-muted h-6 w-1/3 animate-pulse rounded' />
            <div className='bg-muted h-10 w-full animate-pulse rounded' />
            <div className='bg-muted h-10 w-full animate-pulse rounded' />
          </div>
        </div>
      </div>
    </div>
  );
}
