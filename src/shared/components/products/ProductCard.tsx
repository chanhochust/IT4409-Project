'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { AppBadge } from 'src/shared/components/ui/badge/AppBadge';
import { useCart } from 'src/shared/stores/cart/useCart';
import type { ProductItem } from 'src/shared/types/api/products/product.type';

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.thumbnailUrl || product.images?.[0];
  const discountBadge = product.discount ? `−${product.discount}%` : null;
  const { addItem } = useCart();

  function renderRating() {
    const rating = product.rating || 0;
    const stars = Math.round(rating);

    return (
      <div className='flex items-center gap-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
        <span className='text-muted-foreground text-xs'>({rating.toFixed(1)})</span>
      </div>
    );
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
  }

  return (
    <div className='border-border bg-card hover:border-primary group relative flex h-full flex-col rounded-lg border p-3 transition-all duration-200'>
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className='bg-muted relative mb-3 h-40 w-full overflow-hidden rounded-md'>
          {imageUrl ? (
            <Image
              alt={product.name}
              className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
              fill
              sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 20vw, 16vw'
              src={imageUrl}
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <span className='text-muted-foreground text-xs'>No image</span>
            </div>
          )}

          {/* Discount Badge */}
          {discountBadge && (
            <div className='absolute top-2 right-2'>
              <AppBadge className='text-white' variant='destructive'>
                {discountBadge}
              </AppBadge>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className='mt-auto flex flex-col justify-between'>
        <Link href={`/products/${product.id}`}>
          <div className='flex flex-1 flex-col gap-2'>
            {/* Name */}
            <h3 className='text-foreground line-clamp-2 text-sm font-medium'>{product.name}</h3>

            {/* Rating */}
            <div>{renderRating()}</div>

            {/* Price */}
            <div className='text-primary text-sm font-bold'>${product.price}</div>

            {/* Stock Info */}
            <div className='text-muted-foreground text-xs'>
              {product.stock > 0 ? (
                <span>{product.stock} in stock</span>
              ) : (
                <span className='text-destructive'>Out of stock</span>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          className='bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground mt-2 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed'
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          type='button'>
          <ShoppingCart className='h-3.5 w-3.5' />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
