import { axiosClient } from './axios';
import {
  CreateShopPayload,
  CreateShopResponse,
  MyShopResponse,
  UpdateShopPayload,
  UpdateShopResponse,
} from 'src/shared/types/api/shop/shop.type';
import { MyShopProductsResponse } from 'src/shared/types/api/shop/shopProducts.type';

export class ShopService {
  static async createShop(this: void, payload: CreateShopPayload): Promise<CreateShopResponse> {
    const form = new FormData();
    form.append('shopName', payload.shopName);
    form.append('bussinessEmail', payload.bussinessEmail);
    form.append('warehouseAddress', payload.warehouseAddress);
    form.append('logo', payload.logo);

    // Debug: Log what we're sending
    console.log('Creating shop with payload:', {
      shopName: payload.shopName,
      bussinessEmail: payload.bussinessEmail,
      warehouseAddress: payload.warehouseAddress,
      logo: payload.logo.name,
    });

    // Debug: Log form data
    for (const pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }

    return axiosClient
      .post<CreateShopResponse>('/users/shops', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  }

  static async getMyShop(this: void): Promise<MyShopResponse> {
    return axiosClient.get<MyShopResponse>('/users/shops/my-shop').then((res) => res.data);
  }

  static async updateShop(this: void, shopId: string, payload: UpdateShopPayload): Promise<UpdateShopResponse> {
    const form = new FormData();

    if (payload.shopName !== undefined) {
      form.append('shopName', payload.shopName);
    }
    if (payload.bussinessEmail !== undefined) {
      form.append('bussinessEmail', payload.bussinessEmail);
    }
    if (payload.warehouseAddress !== undefined) {
      form.append('warehouseAddress', payload.warehouseAddress);
    }
    if (payload.logo !== undefined) {
      form.append('logo', payload.logo);
    }

    return axiosClient
      .put<UpdateShopResponse>(`/users/shops/${shopId}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  }

  static async getMyShopProducts(this: void): Promise<MyShopProductsResponse> {
    return axiosClient.get<MyShopProductsResponse>('/products/my-shop').then((res) => res.data);
  }
}
