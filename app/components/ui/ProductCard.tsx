"use client";

import Image from "next/image";
import { FC } from "react";

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;       
  onAddToCart?: (id: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  oldPrice,
  rating = 5,
  onAddToCart,
}) => {
  return (
    <div className="group bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold line-clamp-2">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
          <span className="text-gray-400 text-xs">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {price.toLocaleString()}₫
          </span>
          {oldPrice && (
            <span className="text-sm line-through text-gray-400">
              {oldPrice.toLocaleString()}₫
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart && onAddToCart(id)}
          className="w-full bg-black text-white rounded-lg py-2 text-sm hover:bg-gray-800 transition"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
