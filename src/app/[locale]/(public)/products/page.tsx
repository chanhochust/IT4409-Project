'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { ProductGrid } from 'src/shared/components/products/ProductGrid';
import { ProductsGridSkeleton } from 'src/shared/components/products/ProductsGridSkeleton';
import { ProductsPagination } from 'src/shared/components/products/ProductsPagination';
import { ProductsToolbar } from 'src/shared/components/products/ProductsToolbar';
import { useProductsQuery } from 'src/shared/services/api/queries/useProduct.query';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  const { data: productsResponse, isLoading, isError, refetch } = useProductsQuery({ limit, page });
  const products = productsResponse?.data?.products ?? [];
  const total = productsResponse?.data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams();
    params.set('page', String(newPage));
    params.set('limit', String(limit));
    router.push(`/products?${params.toString()}`);
  }

  function handleLimitChange(newLimit: number) {
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('limit', String(newLimit));
    router.push(`/products?${params.toString()}`);
  }

  if (isLoading) {
    return (
      <div className='bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <ProductsGridSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='border-border bg-card space-y-4 rounded-lg border p-8 text-center'>
            <div className='flex justify-center'>
              <AlertCircle className='text-destructive h-12 w-12' />
            </div>
            <h2 className='text-foreground text-xl font-semibold'>Failed to load products</h2>
            <p className='text-muted-foreground'>An error occurred while fetching products. Please try again.</p>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <AppButton onClick={() => refetch()} variant='outline'>
              Retry
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <ProductsToolbar limit={limit} onLimitChange={handleLimitChange} />

        <ProductGrid products={products} />

        {totalPages > 1 && (
          <ProductsPagination currentPage={page} onPageChange={handlePageChange} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
