import { ApiResponse } from '../common';
import type { Address } from './address.type';

export interface CreateAddressPayload {
  city: string;
  district: string;
  name: string;
  phone: string;
  street: string;
  type: 'home' | 'office' | 'other';
  ward: string;
}

export type CreateAddressResponse = ApiResponse<Address>;
