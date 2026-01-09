import type { CartItem } from 'src/shared/stores/cart/cartStore';
import type { ProductItem } from 'src/shared/types/api/products/product.type';

export interface CartProductMeta {
  error?: unknown;
  isLoading: boolean;
  product?: ProductItem;
  refetch?: () => Promise<unknown>;
}

export interface CartGroupedItem {
  cartItem: CartItem;
  error?: unknown;
  isLoading: boolean;
  product?: ProductItem;
  refetch?: () => Promise<unknown>;
}

export interface CartGroupedShop {
  groupSubtotal: number;
  groupTotalQuantity: number;
  items: CartGroupedItem[];
  shopOwnerId: string;
}

export function groupCartItemsByShop(
  cartItems: ReadonlyArray<CartItem>,
  productMeta: Record<string, CartProductMeta>,
): CartGroupedShop[] {
  const groupsMap = new Map<string, CartGroupedShop>();

  cartItems.forEach((cartItem) => {
    const meta = productMeta[cartItem.productId] ?? { isLoading: true };
    const shopOwnerId = meta.product?.shopOwnerId ?? (meta.isLoading ? 'loading' : 'unknown');

    if (!groupsMap.has(shopOwnerId)) {
      groupsMap.set(shopOwnerId, {
        groupSubtotal: 0,
        groupTotalQuantity: 0,
        items: [],
        shopOwnerId,
      });
    }

    const group = groupsMap.get(shopOwnerId)!;
    group.items.push({
      cartItem,
      error: meta.error,
      isLoading: meta.isLoading,
      product: meta.product,
      refetch: meta.refetch,
    });

    if (meta.product && !meta.error) {
      group.groupSubtotal += meta.product.price * cartItem.quantity;
      group.groupTotalQuantity += cartItem.quantity;
    }
  });

  return Array.from(groupsMap.values());
}
