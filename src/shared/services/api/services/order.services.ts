import { axiosClient } from '../axios';
import type { CreateOrderPayload, CreateOrderResponse } from 'src/shared/types/api/orders/createOrder.type';
import type { GetMyOrdersParams, GetMyOrdersResponse } from 'src/shared/types/api/orders/getMyOrders.type';
import type { GetOrderDetailResponse } from 'src/shared/types/api/orders/getOrderDetail.type';
import type { GetShopOrdersParams, GetShopOrdersResponse } from 'src/shared/types/api/orders/getShopOrders.type';

export class OrderService {
  static async createOrder(this: void, payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    return axiosClient.post<CreateOrderResponse>('/orders', payload).then((res) => res.data);
  }

  static async getMyOrders(this: void, params: GetMyOrdersParams): Promise<GetMyOrdersResponse> {
    const { page, limit } = params;
    return axiosClient
      .get<GetMyOrdersResponse>('/orders/my-orders', { params: { page, limit } })
      .then((res) => res.data);
  }

  static async getOrderById(this: void, id: string): Promise<GetOrderDetailResponse> {
    return axiosClient.get<GetOrderDetailResponse>(`/orders/${id}`).then((res) => res.data);
  }

  static async getShopOrders(this: void, params: GetShopOrdersParams): Promise<GetShopOrdersResponse> {
    const { page, limit } = params;
    return axiosClient.get<GetShopOrdersResponse>('/orders/shop', { params: { page, limit } }).then((res) => res.data);
  }
}
