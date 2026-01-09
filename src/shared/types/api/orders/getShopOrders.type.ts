import type { ApiResponse } from 'src/shared/types/api/common';
import type { Order } from './order.type';

export interface GetShopOrdersParams {
  limit: number;
  page: number;
}

export type GetShopOrdersResponse = ApiResponse<{
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}>;
