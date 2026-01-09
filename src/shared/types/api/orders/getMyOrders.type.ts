import type { ApiResponse } from 'src/shared/types/api/common';
import type { Order } from './order.type';

export interface GetMyOrdersParams {
  limit: number;
  page: number;
}

export type GetMyOrdersResponse = ApiResponse<{
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}>;
