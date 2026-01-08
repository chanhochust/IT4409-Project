import { ApiResponse } from '../common';
import type { Address } from './address.type';

export interface GetMyAddressesData {
  addresses: Address[];
}

export type GetMyAddressesResponse = ApiResponse<GetMyAddressesData>;
