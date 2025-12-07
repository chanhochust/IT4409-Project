"use client";

import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

export default function HomePage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <main className="main-home">
      <section className="hero-banner">
        <h2>Khuyến mãi hôm nay!</h2>
      </section>

      <section className="product-section">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list-grid">
          <ProductList products={data} />
        </div>
      </section>
    </main>
  );
}