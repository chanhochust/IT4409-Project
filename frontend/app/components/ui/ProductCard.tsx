"use client";

import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart_actions";
import "./ProductCard.css";

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;       
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  oldPrice,
  rating = 5,
}) => {
  const onAddToCart = useCartStore((state) => state.onAddToCart);

 const discountPercent = oldPrice
  ? Math.round(((oldPrice - price) / oldPrice) * 100)
  : null; 

  return (
    <div className="product-card">
      <Link href={`/products/${id}`} className="product-link">
        <div className="product-image-wrap">
          {discountPercent && (
            <span className="discount-badge">
              -{discountPercent}%
            </span>
          )}
          <Image
            src={image}
            alt={name}
            fill
            className="product-image"
          />
        </div>

        <div className="product-content">
          <p className="product-title">
            {name}
          </p>

          {/* Rating */}
          <div className="product-rating">
            {Array.from({ length: rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            <span className="rating-sold">(Đã bán 1k+)</span>
          </div>

          {/* Price */}
          <div className="product-price-row">
            <span className="product-price">
              {price.toLocaleString()}₫
            </span>
            {oldPrice && (
              <span className="product-old-price">
                {oldPrice.toLocaleString()}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
