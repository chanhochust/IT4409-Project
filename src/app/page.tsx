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
    <main className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-start px-4 py-8">
      <section className="w-full max-w-[1120px] h-64 bg-[#dbeafe] flex items-center justify-center rounded-xl mb-12">
        <h2 className="text-[2.5rem] font-bold text-[#189eff] text-center">Khuyến mãi hôm nay!</h2>
      </section>

      <section className="w-full max-w-[1120px]">
          <h3 className="text-2xl font-bold text-center mb-6">Sản phẩm nổi bật</h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            <ProductList products={featured} />
          </div>

            <div className="w-full mt-6 flex justify-center">
            <Link href="/products">
              <button className="bg-blue-600 border-0 text-white py-3 px-7 rounded-lg text-base font-medium cursor-pointer transition hover:bg-blue-700 active:transform-[scale(0.98)]">
                Xem thêm sản phẩm
              </button>
            </Link>
          </div>
        </section>
    </main>
  );
}