import ProductCard, {ProductCardProps} from "./ui/ProductCard";
import { FC } from "react";

interface ProductListProps {
  products: ProductCardProps[];
  onAddToCart?: (id: string) => void;
}

const ProductList: FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
