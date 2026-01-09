import { useQuery } from '@tanstack/react-query';
import { ShopService } from '../shop.service';

export const SHOP_QUERY_KEYS = {
  myShop: () => ['shop', 'my-shop'] as const,
  myShopProducts: () => ['shop', 'my-shop-products'] as const,
};

export function useMyShopQuery() {
  return useQuery({
    queryKey: SHOP_QUERY_KEYS.myShop(),
    queryFn: () => ShopService.getMyShop(),
    retry: false,
  });
}

export function useMyShopProductsQuery() {
  return useQuery({
    queryKey: SHOP_QUERY_KEYS.myShopProducts(),
    queryFn: () => ShopService.getMyShopProducts(),
  });
}
