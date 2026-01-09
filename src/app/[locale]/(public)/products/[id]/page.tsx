'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, ChevronRight, Home } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { ProductGallery } from 'src/shared/components/products/ProductGallery';
import { ProductInfo } from 'src/shared/components/products/ProductInfo';
import { ProductPurchasePanel } from 'src/shared/components/products/ProductPurchasePanel';
import { ProductSkeleton } from 'src/shared/components/products/ProductSkeleton';
import { useProductDetailQuery } from 'src/shared/services/api/queries/useProduct.query';

export default function ProductPage() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : (params.id ?? null);

  const { data: productResponse, isLoading, isError, refetch } = useProductDetailQuery(productId);
  const product = productResponse?.data ?? null;

  if (isLoading) {
    return (
      <div className='bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
        <ProductSkeleton />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className='bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          {/* Breadcrumb */}
          <nav className='text-muted-foreground mb-8 flex items-center gap-2 text-sm'>
            <Link className='hover:text-foreground transition-colors' href='/'>
              <Home className='h-4 w-4' />
            </Link>
            <span>Home</span>
            <ChevronRight className='h-4 w-4' />
            <Link className='hover:text-foreground transition-colors' href='/products'>
              Products
            </Link>
          </nav>

          {/* Error State */}
          <div className='bg-card border-border space-y-4 rounded-lg border p-8 text-center'>
            <div className='flex justify-center'>
              <AlertCircle className='text-destructive h-12 w-12' />
            </div>
            <h2 className='text-foreground text-xl font-semibold'>Product Not Found</h2>
            <p className='text-muted-foreground'>
              We couldn't load the product details. The product might not exist or has been removed.
            </p>
            <div className='flex justify-center gap-3 pt-4'>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <AppButton onClick={() => refetch()} variant='outline'>
                Try Again
              </AppButton>
              <AppButton asChild variant='default'>
                <Link href='/products'>Back to Products</Link>
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        {/* Breadcrumb */}
        <nav className='text-muted-foreground mb-8 flex items-center gap-2 text-sm'>
          <Link className='hover:text-foreground transition-colors' href='/'>
            <Home className='h-4 w-4' />
          </Link>
          <span>Home</span>
          <ChevronRight className='h-4 w-4' />
          <Link className='hover:text-foreground transition-colors' href='/products'>
            Products
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-foreground truncate'>{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Left: Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Info + Purchase Panel */}
          <div className='space-y-8'>
            <ProductInfo product={product} />
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
