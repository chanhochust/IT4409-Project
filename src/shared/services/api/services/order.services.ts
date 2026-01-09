import { axiosClient } from '../axios';
import type { CreateOrderPayload, CreateOrderResponse } from 'src/shared/types/api/orders/createOrder.type';

export class OrderService {
  static async createOrder(this: void, payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    return axiosClient.post<CreateOrderResponse>('/orders', payload).then((res) => res.data);
  }
}
