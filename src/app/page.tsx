"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductList from "./components/ProductList";
import { FaFire, FaRocket, FaChevronRight } from "react-icons/fa"; // Cài react-icons

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  const featured = data.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f5f5fa] flex flex-col items-center pb-12">
      
      {/* 1. HERO BANNER - Nâng cấp với Gradient và Nút bấm */}
      <section className="w-full max-w-[1120px] mt-6 px-4">
        <div className="w-full h-72 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          
          <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm mb-4">Mùa giảm giá 2026</span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-black text-center leading-tight drop-shadow-md">
            SALE ĐẬM CUỐI NĂM!
          </h2>
          <p className="mt-2 text-lg opacity-90">Giảm đến 50% cho tất cả thiết bị điện tử</p>
          <button className="mt-6 bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:shadow-lg transition transform hover:-translate-y-1">
            Săn Deal Ngay
          </button>
        </div>
      </section>

    
      {/* 3. FEATURED PRODUCTS */}
      <section className="w-full max-w-[1120px] mt-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FaFire className="text-red-500 text-2xl" />
            <h3 className="text-2xl font-bold text-gray-800">Sản phẩm nổi bật</h3>
          </div>
          <Link href="/products" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
            Tất cả <FaChevronRight size={12} />
          </Link>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          <ProductList products={featured} />
        </div>

        {/* Nút Xem thêm */}
        <div className="w-full mt-10 flex justify-center">
          <Link href="/products">
            <button className="group relative bg-white border-2 border-blue-600 text-blue-600 py-3 px-10 rounded-xl text-base font-bold cursor-pointer transition overflow-hidden">
              <span className="relative z-10">Khám phá toàn bộ cửa hàng</span>
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}