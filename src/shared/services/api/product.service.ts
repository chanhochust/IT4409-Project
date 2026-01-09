import { axiosClient } from './axios';
import {
  ProductsListResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
  UpdateProductResponse,
} from 'src/shared/types/api/product/product.type';

export class ProductService {
  static async getProducts(this: void, params?: { page?: number; limit?: number }): Promise<ProductsListResponse> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    return axiosClient.get<ProductsListResponse>('/products', { params: { page, limit } }).then((res) => res.data);
  }

  static async createProduct(this: void, payload: CreateProductPayload): Promise<CreateProductResponse> {
    const form = new FormData();
    form.append('name', payload.name);
    form.append('description', payload.description);
    form.append('price', String(payload.price));
    form.append('category', payload.category);
    form.append('stock', String(payload.stock));
    form.append('discount', String(payload.discount));

    // Append multiple images
    payload.images.forEach((image) => {
      form.append('images', image);
    });

    // Append thumbnail
    form.append('thumbnail', payload.thumbnail);

    return axiosClient
      .post<CreateProductResponse>('/products', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  }

  static async updateProduct(
    this: void,
    productId: string,
    payload: UpdateProductPayload,
  ): Promise<UpdateProductResponse> {
    const form = new FormData();

    if (payload.name !== undefined) {
      form.append('name', payload.name);
    }
    if (payload.description !== undefined) {
      form.append('description', payload.description);
    }
    if (payload.price !== undefined) {
      form.append('price', String(payload.price));
    }
    if (payload.category !== undefined) {
      form.append('category', payload.category);
    }
    if (payload.stock !== undefined) {
      form.append('stock', String(payload.stock));
    }
    if (payload.discount !== undefined) {
      form.append('discount', String(payload.discount));
    }
    if (payload.images !== undefined) {
      payload.images.forEach((image) => {
        form.append('images', image);
      });
    }
    if (payload.thumbnail !== undefined) {
      form.append('thumbnail', payload.thumbnail);
    }

    return axiosClient
      .put<UpdateProductResponse>(`/products/${productId}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  }

  static async deleteProduct(this: void, productId: string): Promise<{ success: boolean; message: string }> {
    return axiosClient.delete<{ success: boolean; message: string }>(`/products/${productId}`).then((res) => res.data);
  }
}
