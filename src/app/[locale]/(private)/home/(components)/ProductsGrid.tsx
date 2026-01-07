import React from 'react';
import Link from 'next/link';
import { cn } from 'src/shared/utils/className';
import ProductCard, { Product } from './ProductCard';
import { useProductsQuery } from 'src/shared/services/api/queries/product.query';

export default function ProductsGrid() {
  const { data, isLoading, isError, refetch } = useProductsQuery({ page: 1, limit: 12 });
  const apiProducts = data?.data.products ?? [];

  return (
    <section className={cn('py-16')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('mb-8 flex items-end justify-between')}>
          <div>
            <h2 className={cn('text-foreground text-xl font-bold')}>Featured Products</h2>
            <p className={cn('text-muted-foreground text-sm')}>Best of the season</p>
          </div>
          <Link className={cn('text-primary text-sm font-semibold hover:opacity-90')} href='/'>
            Explore
          </Link>
        </div>
        {isLoading && <p className={cn('text-muted-foreground')}>Loading products...</p>}
        {isError && (
          <div className={cn('flex items-center gap-3')}>
            <p className={cn('text-destructive')}>Failed to load products.</p>
            <button
              onClick={() => {
                void refetch();
              }}
              className={cn('text-primary underline')}>
              Retry
            </button>
          </div>
        )}
        {!isLoading && !isError && (
          <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
            {apiProducts.map((p) => {
              const uiProduct: Product = {
                id: p.id,
                name: p.name,
                price: p.price,
                rating: p.rating ?? 0,
                imageUrls: (p.images && p.images.length > 0 ? p.images : ['/images/shopping.png']).filter(Boolean),
                badge: p.discount > 0 ? `-${p.discount}%` : undefined,
              };
              return <ProductCard key={p.id} product={uiProduct} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
