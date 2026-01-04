'use client';

import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

export default function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    document.title = 'Sản Phẩm';
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <main className='flex min-h-[calc(100vh-120px)] flex-col items-center justify-start px-3 py-6 md:px-4 md:py-10'>
      <section className='w-full max-w-[1120px]'>
        {/* Tiêu đề chỉnh font-semibold cho nhẹ nhàng */}
        <h3 className='mb-6 text-center text-xl font-semibold text-slate-800 md:text-2xl'>Sản phẩm</h3>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-6'>
          <ProductList products={data} />
        </div>
      </section>
    </main>
  );
}
