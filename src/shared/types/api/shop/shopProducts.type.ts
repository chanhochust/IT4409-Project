import { ApiResponse } from '../common';
import { ProductItem } from '../product/product.type';

export interface MyShopProductsData {
  products: ProductItem[];
}

export type MyShopProductsResponse = ApiResponse<MyShopProductsData>;
