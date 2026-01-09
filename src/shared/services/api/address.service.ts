import { axiosClient } from './axios';
import type { CreateAddressPayload, CreateAddressResponse } from 'src/shared/types/api/address/createAddress.type';
import type { GetMyAddressesResponse } from 'src/shared/types/api/address/getMyAddresses.type';
import type { ApiResponse } from 'src/shared/types/api/common';
import type { Address } from 'src/shared/types/api/address/address.type';

export type DeleteAddressResponse = { success: boolean; message: string };
export type GetAddressByIdResponse = ApiResponse<Address>;

export class AddressService {
  static async getMyAddresses(this: void): Promise<GetMyAddressesResponse> {
    return axiosClient.get<GetMyAddressesResponse>('/users/addresses').then((res) => res.data);
  }

  static async getAddressById(this: void, id: string): Promise<GetAddressByIdResponse> {
    return axiosClient.get<GetAddressByIdResponse>(`/users/addresses/${id}`).then((res) => res.data);
  }

  static async createAddress(this: void, payload: CreateAddressPayload): Promise<CreateAddressResponse> {
    return axiosClient.post<CreateAddressResponse>('/users/addresses', payload).then((res) => res.data);
  }

  static async updateAddress(this: void, id: string, payload: CreateAddressPayload): Promise<CreateAddressResponse> {
    return axiosClient.put<CreateAddressResponse>(`/users/addresses/${id}`, payload).then((res) => res.data);
  }

  static async deleteAddress(this: void, id: string): Promise<DeleteAddressResponse> {
    return axiosClient.delete<DeleteAddressResponse>(`/users/addresses/${id}`).then((res) => res.data);
  }
}
