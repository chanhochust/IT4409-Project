import { AppBadge } from 'src/shared/components/ui/badge/AppBadge';
import type { ProductItem } from 'src/shared/types/api/products/product.type';

interface ProductInfoProps {
  product: ProductItem;
}

export function ProductInfo({ product }: ProductInfoProps) {
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  }

  return (
    <div className='space-y-6'>
      {/* Name */}
      <div>
        <h1 className='text-foreground mb-2 text-3xl font-bold'>{product.name}</h1>
        <p className='text-muted-foreground text-sm'>Product ID: {product.id}</p>
      </div>

      {/* Category Badge */}
      <div className='flex flex-wrap gap-2'>
        <AppBadge variant='default'>{product.category}</AppBadge>
        {product.discount ? <AppBadge variant='secondary'>{product.discount}% OFF</AppBadge> : null}
      </div>

      {/* Price */}
      <div className='border-border border-t border-b py-4'>
        <p className='text-muted-foreground mb-1 text-sm'>Price</p>
        <p className='text-primary text-3xl font-bold'>{formatPrice(product.price)}</p>
      </div>

      {/* Stock Status */}
      <div>
        <p className='text-muted-foreground mb-2 text-sm'>Availability</p>
        {product.stock > 0 ? (
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-green-500' />
            <p className='text-foreground font-medium'>In Stock ({product.stock} available)</p>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-red-500' />
            <p className='text-destructive font-medium'>Out of Stock</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <h2 className='text-foreground mb-3 text-lg font-semibold'>Description</h2>
        <p className='text-muted-foreground leading-relaxed'>{product.description}</p>
      </div>

      {/* Additional Info */}
      {product.rating ? (
        <div className='border-border border-t pt-4'>
          <p className='text-muted-foreground text-sm'>
            Customer Rating: <span className='text-foreground font-semibold'>{product.rating.toFixed(1)}/5</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
