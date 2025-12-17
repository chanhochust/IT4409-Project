"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductList from "./components/ProductList";

export default function HomePage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  const featured = data.slice(0, 4);

  return (
    <main className="main-home">
      <section className="hero-banner">
        <h2>Khuyến mãi hôm nay!</h2>
      </section>

      <section className="product-section">
          <h3>Sản phẩm nổi bật</h3>

          <div className="product-list-grid">
            <ProductList products={featured} />
          </div>

          <div className="more-btn-wrap">
            <Link href="/products">
              <button className="more-btn">
                Xem thêm sản phẩm
              </button>
            </Link>
          </div>
        </section>
    </main>
  );
}