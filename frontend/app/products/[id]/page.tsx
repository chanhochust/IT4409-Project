import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/Breadcrumbs";
import RelatedProducts from "@/app/components/RelatedProducts";
import AddToCartWithQty from "@/app/components/ui/AddToCart";
import ProductFeedback from "@/app/components/ProductFeedback";
import "./products.css"

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  stock: number;
  status: string;
  description?: string;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(
    `http://localhost:3000/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {

const { id } = await params;
const product = await getProduct(id);

  return (
    <div className="detail-page">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="detail-main">
        <div className="detail-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="img"
          />
        </div>

        <div className="detail-info">
          <h1 className="title">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="rating">
              {"★".repeat(Math.round(product.rating))}
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Price */}
          <div className="price-box">
            <span className="price">
              {product.price.toLocaleString()}₫
            </span>
            {product.oldPrice && (
              <span className="old-price">
                {product.oldPrice.toLocaleString()}₫
              </span>
            )}
          </div>

          <ul className="features">
            <li>✔ Chính hãng 100%</li>
            <li>✔ Giao nhanh 2h</li>
            <li>✔ Đổi trả 7 ngày</li>
          </ul>

  <AddToCartWithQty product={product} />
        </div>

        <div className="ship-info">
          <h3>Thông tin vận chuyển</h3>
        </div>
      </div>

      <div className="feedback-wrapper">
      <ProductFeedback productId={id} />
      </div>

      <div className="related-products">
      <RelatedProducts currentId={id} />
      </div>
    </div>
  );
}