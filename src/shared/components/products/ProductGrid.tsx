import { ProductCard } from './ProductCard';
import type { ProductItem } from 'src/shared/types/api/products/product.type';

interface ProductGridProps {
  products: ProductItem[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className='border-border bg-card flex min-h-96 flex-col items-center justify-center rounded-lg border p-8 text-center'>
        <h2 className='text-foreground mb-2 text-xl font-semibold'>No products found</h2>
        <p className='text-muted-foreground'>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
