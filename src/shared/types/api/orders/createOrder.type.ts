import type { ApiResponse } from 'src/shared/types/api/common';
import type { Address } from 'src/shared/types/api/address/address.type';
import type { Order } from './order.type';

export interface CreateOrderItemPayload {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: CreateOrderItemPayload[];
  paymentMethod: 'CASH' | 'CARD' | 'MOMO' | (string & {});
}

export type CreateOrderResponse = ApiResponse<Order>;
