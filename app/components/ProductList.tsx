"use client";

import { FC } from "react";
import ProductCard, { ProductCardProps } from "./ui/ProductCard";

interface ProductListProps {
  products: ProductCardProps[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          image={p.image}
          price={p.price}
          oldPrice={p.oldPrice}
          rating={p.rating}
        />
      ))}
    </>
  );
};

export default ProductList;
