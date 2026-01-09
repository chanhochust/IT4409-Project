import { ApiResponse } from '../common';

export interface Shop {
  id: string;
  shopName: string;
  bussinessEmail: string;
  warehouseAddress: string;
  logo: string;
  ownerId: string;
  status: 'pending' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopPayload {
  shopName: string;
  bussinessEmail: string;
  warehouseAddress: string;
  logo: File;
}

export interface UpdateShopPayload {
  shopName?: string;
  bussinessEmail?: string;
  warehouseAddress?: string;
  logo?: File;
}

export type ShopResponse = ApiResponse<Shop>;

export type MyShopResponse = ApiResponse<Shop>;

export type CreateShopResponse = ApiResponse<Shop>;

export type UpdateShopResponse = ApiResponse<Shop>;
