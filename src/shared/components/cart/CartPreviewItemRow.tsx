'use client';

import { Minus, Plus, RotateCcw, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { useCart } from 'src/shared/stores/cart/useCart';
import type { CartGroupedItem } from 'src/shared/utils/cartGrouping';

interface CartPreviewItemRowProps {
  item: CartGroupedItem;
  locale: string;
}

export function CartPreviewItemRow({ item, locale }: CartPreviewItemRowProps) {
  const { decrementItem, incrementItem, removeItem } = useCart();
  const product = item.product;
  const imageUrl = product?.thumbnailUrl || product?.images?.[0];
  const productDetailUrl = product ? `/${locale}${AppRouter.productDetail(product.id)}` : undefined;

  function handleDecrement() {
    if (item.cartItem.quantity <= 1) {
      removeItem(item.cartItem.productId);
    } else {
      decrementItem(item.cartItem.productId);
    }
  }

  function handleIncrement() {
    incrementItem(item.cartItem.productId);
  }

  function handleRemove() {
    removeItem(item.cartItem.productId);
  }

  if (item.isLoading) {
    return (
      <div className='flex gap-3 px-4 py-3'>
        <div className='bg-muted h-16 w-16 animate-pulse rounded' />
        <div className='flex-1 space-y-2'>
          <div className='bg-muted h-4 w-3/4 animate-pulse rounded' />
          <div className='bg-muted h-3 w-1/2 animate-pulse rounded' />
        </div>
      </div>
    );
  }

  if (!product || item.error) {
    return (
      <div className='border-border flex items-center justify-between gap-3 border-b px-4 py-3'>
        <div className='text-foreground text-sm font-medium'>Failed to load item.</div>
        <div className='flex items-center gap-2'>
          <button
            className='text-muted-foreground hover:text-destructive transition-colors'
            onClick={handleRemove}
            type='button'>
            <Trash2 className='h-4 w-4' />
          </button>
          {item.refetch && (
            <button
              className='text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold'
              onClick={() => {
                void item.refetch?.();
              }}
              type='button'>
              <RotateCcw className='h-3 w-3' />
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-3 px-4 py-3'>
      {productDetailUrl ? (
        <Link className='flex-shrink-0' href={productDetailUrl}>
          <div className='bg-muted relative h-16 w-16 overflow-hidden rounded'>
            {imageUrl && <Image alt={product.name} className='object-cover' fill sizes='64px' src={imageUrl} />}
          </div>
        </Link>
      ) : (
        <div className='bg-muted relative h-16 w-16 overflow-hidden rounded'>
          {imageUrl && <Image alt={product.name} className='object-cover' fill sizes='64px' src={imageUrl} />}
        </div>
      )}

      <div className='flex flex-1 flex-col gap-1'>
        {productDetailUrl ? (
          <Link href={productDetailUrl}>
            <div className='text-foreground hover:text-primary line-clamp-2 text-sm font-medium transition-colors'>
              {product.name}
            </div>
          </Link>
        ) : (
          <div className='text-foreground line-clamp-2 text-sm font-medium'>{product.name}</div>
        )}
        <div className='text-primary text-sm font-semibold'>${product.price.toFixed(2)}</div>

        <div className='mt-1 flex items-center justify-between'>
          <div className='border-border flex items-center rounded border'>
            <button
              className='hover:bg-muted flex h-6 w-6 items-center justify-center transition-colors'
              onClick={handleDecrement}
              type='button'>
              <Minus className='h-3 w-3' />
            </button>
            <span className='text-foreground flex h-6 w-8 items-center justify-center text-xs font-medium'>
              {item.cartItem.quantity}
            </span>
            <button
              className='hover:bg-muted flex h-6 w-6 items-center justify-center transition-colors'
              onClick={handleIncrement}
              type='button'>
              <Plus className='h-3 w-3' />
            </button>
          </div>

          <button
            className='text-muted-foreground hover:text-destructive transition-colors'
            onClick={handleRemove}
            type='button'>
            <Trash2 className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
