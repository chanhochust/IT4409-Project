import { ApiResponse } from '../common';
export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  shopOwnerId: string;
  rating: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsListData {
  products: ProductItem[];
  total: number;
  page: number;
  limit: number;
}

export type ProductsListResponse = ApiResponse<ProductsListData>;
