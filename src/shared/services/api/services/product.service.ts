import { axiosClient } from '../axios';
import type { GetProductDetailResponse } from 'src/shared/types/api/products/getProductDetail.type';
import type { GetProductsResponse } from 'src/shared/types/api/products/getProducts.type';

export class ProductService {
  static async getProducts(this: void, params?: { limit?: number; page?: number }): Promise<GetProductsResponse> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    return axiosClient.get<GetProductsResponse>('/products', { params: { page, limit } }).then((res) => res.data);
  }

  static async getProductById(this: void, id: string): Promise<GetProductDetailResponse> {
    return axiosClient.get<GetProductDetailResponse>(`/products/${id}`).then((res) => res.data);
  }
}
