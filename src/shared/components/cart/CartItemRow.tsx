'use client';

import { Minus, Plus, RotateCcw, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { useCart } from 'src/shared/stores/cart/useCart';
import type { CartGroupedItem } from 'src/shared/utils/cartGrouping';

interface CartItemRowProps {
  item: CartGroupedItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { decrementItem, incrementItem, removeItem } = useCart();
  const params = useParams();
  const locale = params.locale as string;
  const product = item.product;
  const imageUrl = product?.thumbnailUrl || product?.images?.[0];
  const lineTotal = product ? product.price * item.cartItem.quantity : 0;
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
      <div className='border-border flex gap-4 border-b px-6 py-4'>
        <div className='bg-muted h-24 w-24 animate-pulse rounded' />
        <div className='flex-1 space-y-3'>
          <div className='bg-muted h-5 w-3/4 animate-pulse rounded' />
          <div className='bg-muted h-4 w-1/2 animate-pulse rounded' />
          <div className='bg-muted h-4 w-1/4 animate-pulse rounded' />
        </div>
      </div>
    );
  }

  if (!product || item.error) {
    return (
      <div className='border-border flex items-center justify-between gap-4 border-b px-6 py-4'>
        <div>
          <div className='text-foreground text-base font-semibold'>Item unavailable</div>
          <div className='text-muted-foreground text-sm'>
            We could not load this product. You can retry or remove it.
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {item.refetch && (
            <button
              className='text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold'
              onClick={() => {
                void item.refetch?.();
              }}
              type='button'>
              <RotateCcw className='h-4 w-4' />
              Retry
            </button>
          )}
          <button
            className='text-muted-foreground hover:text-destructive transition-colors'
            onClick={handleRemove}
            type='button'>
            <Trash2 className='h-5 w-5' />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='border-border flex gap-4 border-b px-6 py-4'>
      {productDetailUrl ? (
        <Link className='flex-shrink-0' href={productDetailUrl}>
          <div className='bg-muted relative h-24 w-24 overflow-hidden rounded'>
            {imageUrl && <Image alt={product.name} className='object-cover' fill sizes='96px' src={imageUrl} />}
          </div>
        </Link>
      ) : (
        <div className='bg-muted relative h-24 w-24 overflow-hidden rounded'>
          {imageUrl && <Image alt={product.name} className='object-cover' fill sizes='96px' src={imageUrl} />}
        </div>
      )}

      <div className='flex flex-1 flex-col gap-2'>
        {productDetailUrl ? (
          <Link href={productDetailUrl}>
            <h3 className='text-foreground hover:text-primary line-clamp-2 text-base font-medium transition-colors'>
              {product.name}
            </h3>
          </Link>
        ) : (
          <h3 className='text-foreground line-clamp-2 text-base font-medium'>{product.name}</h3>
        )}

        <div className='text-muted-foreground text-sm'>{product.category}</div>

        <div className='mt-auto flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='text-primary text-lg font-semibold'>${product.price.toFixed(2)}</div>

            <div className='border-border flex items-center rounded border'>
              <button
                className='hover:bg-muted flex h-8 w-8 items-center justify-center transition-colors'
                onClick={handleDecrement}
                type='button'>
                <Minus className='h-4 w-4' />
              </button>
              <span className='text-foreground flex h-8 w-12 items-center justify-center text-sm font-medium'>
                {item.cartItem.quantity}
              </span>
              <button
                className='hover:bg-muted flex h-8 w-8 items-center justify-center transition-colors'
                onClick={handleIncrement}
                type='button'>
                <Plus className='h-4 w-4' />
              </button>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-foreground text-lg font-semibold'>${lineTotal.toFixed(2)}</div>
            <button
              className='text-muted-foreground hover:text-destructive transition-colors'
              onClick={handleRemove}
              type='button'>
              <Trash2 className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
