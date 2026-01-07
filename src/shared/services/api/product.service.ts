import { axiosClient } from './axios';
import { ProductsListResponse } from 'src/shared/types/api/product/product.type';

export class ProductService {
  static async getProducts(this: void, params?: { page?: number; limit?: number }): Promise<ProductsListResponse> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    return axiosClient.get<ProductsListResponse>('/products', { params: { page, limit } }).then((res) => res.data);
  }
}
