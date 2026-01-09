import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShopService } from '../shop.service';
import { CreateShopPayload, UpdateShopPayload } from 'src/shared/types/api/shop/shop.type';
import { SHOP_QUERY_KEYS } from '../queries/shop.query';

export function useCreateShopMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateShopPayload) => ShopService.createShop(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SHOP_QUERY_KEYS.myShop() });
    },
  });
}

export function useUpdateShopMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, payload }: { shopId: string; payload: UpdateShopPayload }) =>
      ShopService.updateShop(shopId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SHOP_QUERY_KEYS.myShop() });
    },
  });
}
