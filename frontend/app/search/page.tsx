"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ui/ProductCard";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
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
    <div className="page-container">
      <h2>Kết quả cho: “{q}”</h2>
      {results.length === 0 && <p>Không có sản phẩm phù hợp.</p>}

      <div className="product-grid">
  {results.map(item => (
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
