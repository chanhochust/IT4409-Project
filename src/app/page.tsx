'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductList from './components/ProductList';

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const featured = data.slice(0, 4);

  return (
    <main className='flex min-h-[calc(100vh-120px)] flex-col items-center justify-start px-4 py-8'>
      <section className='mb-12 flex h-64 w-full max-w-[1120px] items-center justify-center rounded-xl bg-[#dbeafe]'>
        <h2 className='text-center text-[2.5rem] font-bold text-[#189eff]'>Khuyến mãi hôm nay!</h2>
      </section>

      <section className='w-full max-w-[1120px]'>
        <h3 className='mb-6 text-center text-2xl font-bold'>Sản phẩm nổi bật</h3>

        <div className='grid grid-cols-2 gap-6 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]'>
          <ProductList products={featured} />
        </div>

        <div className='mt-6 flex w-full justify-center'>
          <Link href='/products'>
            <button className='active:transform-[scale(0.98)] cursor-pointer rounded-lg border-0 bg-blue-600 px-7 py-3 text-base font-medium text-white transition hover:bg-blue-700'>
              Xem thêm sản phẩm
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
