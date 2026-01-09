import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '../product.service';
import { CreateProductPayload, UpdateProductPayload } from 'src/shared/types/api/product/product.type';
import { SHOP_QUERY_KEYS } from '../queries/shop.query';

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => ProductService.createProduct(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SHOP_QUERY_KEYS.myShopProducts() });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: UpdateProductPayload }) =>
      ProductService.updateProduct(productId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SHOP_QUERY_KEYS.myShopProducts() });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => ProductService.deleteProduct(productId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SHOP_QUERY_KEYS.myShopProducts() });
    },
  });
}
