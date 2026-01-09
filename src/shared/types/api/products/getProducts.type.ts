import { ApiResponse } from '../common';
import type { ProductItem } from './product.type';

export interface GetProductsData {
  limit: number;
  page: number;
  products: ProductItem[];
  total: number;
}
export type GetProductsResponse = ApiResponse<GetProductsData>;
