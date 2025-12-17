import "@/app/products/[id]/products.css";
import ProductCard from "./ui/ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
}

async function getRelatedProducts(currentId: string): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const products: Product[] = await res.json();

  return products
    .filter(p => p.id !== currentId)
    .slice(0, 6);
}

export default async function RelatedProducts({
  currentId,
}: {
  currentId: string;
}) {
  const products = await getRelatedProducts(currentId);

  if (products.length === 0) return null;

  return (
    <div className="related-products-section">
  <h2 className="text-lg font-semibold mb-4">
    Xem thêm sản phẩm khác
  </h2>

  <div className="related-grid">
    {products.map(product => (
      <div key={product.id} className="related-card">
        <ProductCard {...product} />
      </div>
    ))}
  </div>
</div>

  );
}
