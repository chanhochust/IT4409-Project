'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard, { ProductCardProps } from '@/src/app/components/ui/ProductCard';

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(`/api/products?search=${q}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }
    if (q) fetchData();
  }, [q]);

  if (!q) return <h2>Vui lòng nhập từ khóa để tìm kiếm.</h2>;
  if (loading) return <h2>Đang tìm kiếm...</h2>;

  return (
    <div className='flex min-h-[calc(100vh-120px)] flex-col items-center justify-start px-4 py-8'>
      <h2 className='mb-4 text-xl font-bold md:text-2xl'>Kết quả cho: “{q}”</h2>
      {results.length === 0 && <p>Không có sản phẩm phù hợp.</p>}

      <div className='grid h-[310px] grid-cols-2 gap-2 px-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5'>
        {results.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            oldPrice={item.oldPrice}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
}
