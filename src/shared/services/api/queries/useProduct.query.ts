import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { ProductService } from '../services/product.service';
import type { GetProductDetailResponse } from 'src/shared/types/api/products/getProductDetail.type';
import type { GetProductsResponse } from 'src/shared/types/api/products/getProducts.type';

export function useProductDetailQuery(
  productId: string | null | undefined,
): UseQueryResult<GetProductDetailResponse, unknown> {
  return useQuery({
    enabled: !!productId,
    queryFn: () => ProductService.getProductById(productId!),
    queryKey: ['get-product-detail', productId],
  });
}

export function useProductsQuery(params: {
  limit: number;
  page: number;
}): UseQueryResult<GetProductsResponse, unknown> {
  return useQuery({
    queryFn: () => ProductService.getProducts(params),
    queryKey: ['get-products', params.page, params.limit],
  });
}
