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
    <div>
  <h2 className="text-lg font-semibold mb-4">
    Xem thêm sản phẩm khác
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
    {products.map(product => (
      <div key={product.id} className="origin-center scale-90">
        <ProductCard {...product} compact />
      </div>
    ))}
  </div>
</div>

  );
}
