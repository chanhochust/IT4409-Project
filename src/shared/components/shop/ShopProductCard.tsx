'use client';

import * as React from 'react';
import Link from 'next/link';
import { ProductItem } from 'src/shared/types/api/product/product.type';

interface ShopProductCardProps {
  product: ProductItem;
  locale: string;
}

export function ShopProductCard({ product, locale }: ShopProductCardProps) {
  const imageSrc =
    product.thumbnailUrl ||
    (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '/images/shopping.png');
  return (
    <div className='bg-card group overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md'>
      <Link href={`/${locale}/products/${product.id}`}>
        <div className='relative aspect-square overflow-hidden'>
          <img
            src={imageSrc}
            alt={product.name}
            className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
          {product.discount > 0 && (
            <span className='absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white'>
              -{product.discount}%
            </span>
          )}
        </div>
        <div className='p-4'>
          <h3 className='text-foreground mb-1 line-clamp-2 font-semibold'>{product.name}</h3>
          <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>{product.description}</p>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              {product.discount > 0 ? (
                <>
                  <span className='text-primary text-lg font-bold'>
                    ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                  </span>
                  <span className='text-muted-foreground text-sm line-through'>${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className='text-primary text-lg font-bold'>${product.price.toFixed(2)}</span>
              )}
            </div>
            <div className='text-muted-foreground text-sm'>
              <span className='font-medium'>Stock:</span> {product.stock}
            </div>
          </div>
          <div className='mt-2 flex items-center justify-between text-xs'>
            <span className='text-muted-foreground capitalize'>{product.category}</span>
            <span className='text-muted-foreground'>⭐ {product.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
