import { axiosClient } from './axios';
import type { CreateAddressPayload, CreateAddressResponse } from 'src/shared/types/api/address/createAddress.type';
import type { GetMyAddressesResponse } from 'src/shared/types/api/address/getMyAddresses.type';

export class AddressService {
  static async getMyAddresses(this: void): Promise<GetMyAddressesResponse> {
    return axiosClient.get<GetMyAddressesResponse>('/users/addresses').then((res) => res.data);
  }

  static async createAddress(this: void, payload: CreateAddressPayload): Promise<CreateAddressResponse> {
    return axiosClient.post<CreateAddressResponse>('/users/addresses', payload).then((res) => res.data);
  }
}
