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
    <main className='page-container'>
      <section className='product-section'>
        <h3>Sản phẩm</h3>
        <div className='product-list-grid'>
          <ProductList products={data} />
        </div>
      </section>
    </main>
  );
}
