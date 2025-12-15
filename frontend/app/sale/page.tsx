"use client";

import { useEffect, useState } from "react";
import ProductList from "@/app/components/ProductList";
import VoucherList from "../components/VoucherList";

export default function SalePage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <main className="page-container">
    <section className="voucher-section">
        <h3>HOT COUPON!!!</h3>
        <div className="voucher-list-grid">
        <VoucherList
          vouchers={[
            {
              id: "1",
              title: "Giảm 20K cho đơn từ 200K",
              code: "SAVE20",
              discount: "20K",
              type: "KH mới",
              expiresAt: "2025-12-30",
              minOrder: 200000,
              onApply: (code) => navigator.clipboard.writeText(code),
            },
            {
              id: "2",
              title: "Freeship toàn quốc",
              code: "SHIP0",
              discount: "Freeship",
              type: "KH mới",
              expiresAt: "2025-12-30",
              onApply: (code) => alert(`Áp dụng mã: ${code}`),
            },
          ]}
        />
        </div>
      </section>

      <section className="product-section">
        <h3>SĂN DEAL SẬP SÀN</h3>
        <div className="product-list-grid">
          <ProductList products={data} />
        </div>
      </section>
    </main>
  );
}