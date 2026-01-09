import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from 'src/shared/utils/className';

export type Product = {
  badge?: string;
  id: string;
  imageUrls: string[];
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [index, setIndex] = React.useState(0);

  const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : ['/images/shopping.png'];

  React.useEffect(() => {
    if (images.length <= 1) return;

    // Random delay between 0-3000ms to desynchronize cards
    const randomDelay = Math.random() * 3000;
    let intervalId: NodeJS.Timeout;

    const delayTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 4500);
    }, randomDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length]);
  return (
    <Link href={`/products/${product.id}`}>
      <div
        className={cn(
          'group border-border bg-background/60 hover:border-primary/40 hover:shadow-primary/5 flex flex-col overflow-hidden rounded-xl border p-3 transition-all hover:shadow-xl',
        )}>
        <div className={cn('bg-muted relative mb-4 aspect-square w-full overflow-hidden rounded-lg')}>
          {(() => {
            const src = images[index] ?? '/images/shopping.png';
            return (
              <Image
                key={src}
                src={src}
                alt={product.name}
                fill
                sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className={cn('object-cover transition-transform duration-500 group-hover:scale-110')}
              />
            );
          })()}
          {images.length > 1 && (
            <div className={cn('absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5')} aria-hidden='true'>
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn('h-1.5 w-1.5 rounded-full bg-white/50', i === index ? 'bg-white' : 'opacity-60')}
                />
              ))}
            </div>
          )}
          {product.badge && (
            <span
              className={cn(
                'bg-primary text-primary-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase',
              )}>
              {product.badge}
            </span>
          )}
        </div>
        <div className={cn('flex flex-1 flex-col')}>
          <div className={cn('mb-1 flex items-center gap-1')}>
            {Array.from({ length: 5 }, (_, i) => i).map((i) => (
              <Star
                className={cn(
                  'h-3 w-3',
                  i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground',
                )}
                key={i}
              />
            ))}
            <span className={cn('text-muted-foreground ml-1 text-xs')}>{product.rating.toFixed(1)}</span>
          </div>
          <h3 className={cn('text-foreground mb-2 line-clamp-1 text-sm font-semibold')}>{product.name}</h3>
          <div className={cn('mt-auto flex items-center justify-between')}>
            <div className={cn('flex flex-col')}>
              {product.originalPrice ? (
                <div className={cn('flex items-baseline gap-2')}>
                  <span className={cn('text-foreground text-sm font-semibold')}>${product.price}</span>
                  <span className={cn('text-muted-foreground text-xs line-through')}>${product.originalPrice}</span>
                </div>
              ) : (
                <span className={cn('text-foreground text-sm font-semibold')}>${product.price}</span>
              )}
            </div>
            <button
              className={cn(
                'bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95',
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to cart logic here
              }}
              type='button'>
              <ShoppingBag className={cn('h-5 w-5')} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
