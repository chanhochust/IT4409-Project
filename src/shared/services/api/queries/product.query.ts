import { generateUseQueryHook } from 'src/shared/utils/reactQuery';
import { ProductService } from '../product.service';

/** Type-safe hook for fetching products with pagination */
export const useProductsQuery = generateUseQueryHook(ProductService.getProducts, 'get-products');
