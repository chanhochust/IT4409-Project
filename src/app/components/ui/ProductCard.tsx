"use client";

import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart_actions";
 

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;       
  category: string;
  compact?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  oldPrice,
  rating = 5,
  category, // Nhận prop category
  compact = false,
}) => {
  const onAddToCart = useCartStore((state) => state.onAddToCart);

 const discountPercent = oldPrice
  ? Math.round(((oldPrice - price) / oldPrice) * 100)
  : null; 

  return (
    <div className="bg-white overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition duration-200 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:scale-[1.05] rounded">
      <Link href={`/products/${id}`} className="group block no-underline text-inherit">
        <div className="relative w-full aspect-square overflow-hidden">
          {discountPercent && (
            <span className="absolute top-2 right-2 z-5 bg-white text-blue-600 text-sm font-semibold px-1.5 py-1 rounded leading-none">
              -{discountPercent}%
            </span>
          )}
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className={`flex flex-col gap-0.5 p-1.5 ${compact ? 'gap-0' : ''}`}>
          <p className={`overflow-hidden min-h-10 ${compact ? 'text-[11px] font-medium' : 'text-base font-semibold'}`}>
            {name}
          </p>

          {/* Rating */}
          <div className={`flex items-center ${compact ? 'text-yellow-400 text-sm' : 'text-yellow-400 text-sm'}`}>
            {Array.from({ length: rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            <span className="text-gray-400 ml-1">(Đã bán 1k+)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5">
            <span className={`${compact ? 'text-[13px]' : 'text-lg'} font-semibold text-red-600`}>
              {price.toLocaleString()}₫
            </span>
            {oldPrice && (
              <span className="text-[13px] line-through text-gray-400">
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
