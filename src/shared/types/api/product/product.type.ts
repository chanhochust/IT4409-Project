import { ApiResponse } from '../common';
export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  thumbnailUrl?: string;
  shopOwnerId: string;
  rating: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: File[];
  thumbnail: File;
  discount: number;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  images?: File[];
  thumbnail?: File;
  discount?: number;
}

export interface ProductsListData {
  products: ProductItem[];
  total: number;
  page: number;
  limit: number;
}

export type ProductsListResponse = ApiResponse<ProductsListData>;
export type CreateProductResponse = ApiResponse<ProductItem>;
export type UpdateProductResponse = ApiResponse<ProductItem>;
