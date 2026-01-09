import { useQuery } from '@tanstack/react-query';
import { generateUseQueryHook } from 'src/shared/utils/reactQuery';
import type { GetMyOrdersParams, GetMyOrdersResponse } from 'src/shared/types/api/orders/getMyOrders.type';
import type { GetOrderDetailResponse } from 'src/shared/types/api/orders/getOrderDetail.type';
import type { GetShopOrdersParams, GetShopOrdersResponse } from 'src/shared/types/api/orders/getShopOrders.type';
import { OrderService } from '../services/order.services';

/** Quick hook using the shared generator (object params are part of the key) */
export const useMyOrdersQuery = generateUseQueryHook(OrderService.getMyOrders, 'get-my-orders');

/**
 * Alternative typed hook ensuring page/limit are split into the key for windowed pagination.
 * Keeps the same behavior while matching the desired query key shape.
 */
export function useMyOrdersQueryWithKey(
  params: GetMyOrdersParams,
  options?: Parameters<typeof useQuery<GetMyOrdersResponse>>[0],
) {
  return useQuery<GetMyOrdersResponse>({
    queryKey: ['get-my-orders', params.page, params.limit],
    queryFn: () => OrderService.getMyOrders(params),
    ...(options ?? {}),
  });
}

export function useOrderByIdQuery(id: string | null | undefined) {
  return useQuery<GetOrderDetailResponse>({
    queryKey: ['get-order-detail', id],
    queryFn: () => OrderService.getOrderById(id as string),
    enabled: !!id,
  });
}

/** Shop owner's incoming orders for their shop */
export function useShopOrdersQuery(
  params: GetShopOrdersParams,
  options?: Parameters<typeof useQuery<GetShopOrdersResponse>>[0],
) {
  return useQuery<GetShopOrdersResponse>({
    queryKey: ['get-shop-orders', params.page, params.limit],
    queryFn: () => OrderService.getShopOrders(params),
    ...(options ?? {}),
  });
}
