'use client';

import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

export default function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <main className='flex min-h-[calc(100vh-120px)] flex-col items-center justify-start px-4 py-8'>
      <section className='w-full max-w-[1120px]'>
        <h3 className='mb-6 text-center text-2xl font-bold'>Sản phẩm</h3>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6'>
          <ProductList products={data} />
        </div>
      </section>
    </main>
  );
}
