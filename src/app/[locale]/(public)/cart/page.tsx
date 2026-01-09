'use client';

import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { CartItemRow } from 'src/shared/components/cart/CartItemRow';
import { CartSummary } from 'src/shared/components/cart/CartSummary';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { useCreateOrderMutation } from 'src/shared/services/api/mutations/useOrder.mutation';
import { useAddressByIdQuery } from 'src/shared/services/api/queries/address.query';
import { useProfileQuery } from 'src/shared/services/api/queries/profile.query';
import { ProductService } from 'src/shared/services/api/services/product.service';
import { useCart } from 'src/shared/stores/cart/useCart';
import { groupCartItemsByShop, type CartGroupedShop, type CartProductMeta } from 'src/shared/utils/cartGrouping';

export default function CartPage() {
  const { items, removeItem } = useCart();
  const params = useParams();
  const locale = params.locale as string;
  const createOrderMutation = useCreateOrderMutation();
  const { data: profileData } = useProfileQuery();
  const [paymentMethod, setPaymentMethod] = React.useState<'CASH' | 'CARD' | 'MOMO' | (string & {})>('CASH');
  const [shippingAddressId, setShippingAddressId] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedShops, setSelectedShops] = React.useState<Record<string, boolean>>({});

  const productsUrl = `/${locale}${AppRouter.products}`;
  const addressManageUrl = `/${locale}/address`;

  const defaultAddressId = profileData?.data?.defaultAddressId ?? '';
  const { data: addressData } = useAddressByIdQuery(defaultAddressId);

  type SuccessfulGroup = {
    items: { productId: string; quantity: number }[];
    orderId: string;
    shopOwnerId: string;
  };
  const productQueries = useQueries({
    queries: items.map((item) => ({
      enabled: !!item.productId,
      queryFn: () => ProductService.getProductById(item.productId),
      queryKey: ['get-product-detail', item.productId],
    })),
  });

  const productMeta = React.useMemo(() => {
    const meta: Record<string, CartProductMeta> = {};

    items.forEach((item, index) => {
      const query = productQueries[index];
      meta[item.productId] = {
        error: query?.error,
        isLoading: query?.isLoading ?? false,
        product: query?.data?.data,
        refetch: () => query?.refetch() ?? Promise.resolve(),
      };
    });

    return meta;
  }, [items, productQueries]);

  const groupedShops: CartGroupedShop[] = React.useMemo(
    () => groupCartItemsByShop(items, productMeta),
    [items, productMeta],
  );

  React.useEffect(() => {
    if (defaultAddressId && shippingAddressId !== defaultAddressId) {
      setShippingAddressId(defaultAddressId);
    }
  }, [defaultAddressId, shippingAddressId]);

  React.useEffect(() => {
    setSelectedShops((prev) => {
      let changed = false;
      const next = { ...prev };

      groupedShops.forEach((group) => {
        if (next[group.shopOwnerId] === undefined) {
          next[group.shopOwnerId] = true;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [groupedShops]);

  const shippingAddressLabel = React.useMemo(() => {
    if (!defaultAddressId) return 'No default address set';
    const addr = addressData?.data;
    if (!addr) return 'Loading default address...';
    return `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`;
  }, [addressData?.data, defaultAddressId]);

  const { itemsCount, subtotal } = React.useMemo(() => {
    let total = 0;
    let count = 0;

    groupedShops.forEach((group) => {
      total += group.groupSubtotal;
      count += group.groupTotalQuantity;
    });

    return { itemsCount: count, subtotal: total };
  }, [groupedShops]);

  function extractErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Something went wrong';
  }

  async function handleCheckout() {
    if (isProcessing) return;

    const selectableGroups = groupedShops.filter((group) => selectedShops[group.shopOwnerId] !== false);
    if (selectableGroups.length === 0) {
      toast.error('Select at least one shop to checkout.');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    if (!shippingAddressId) {
      toast.error('Please set a default shipping address in your profile.');
      return;
    }

    setIsProcessing(true);

    const results = await Promise.allSettled(
      selectableGroups.map(async (group) => {
        const validItems = group.items
          .filter((item) => item.product && !item.error)
          .map((item) => ({
            productId: item.cartItem.productId,
            quantity: item.cartItem.quantity,
          }));

        if (validItems.length === 0) {
          throw new Error('No valid items to checkout for this shop');
        }

        const response = await createOrderMutation.mutateAsync({
          items: validItems,
          paymentMethod,
        });

        return { orderId: response.data.id, shopOwnerId: group.shopOwnerId, items: validItems };
      }),
    );

    const successfulGroups: SuccessfulGroup[] = [];
    const failedGroups: Array<{ reason: string; shopOwnerId: string }> = [];

    results.forEach((result, index) => {
      const group = selectableGroups[index];
      if (!group) return;
      if (result.status === 'fulfilled') {
        successfulGroups.push(result.value);
      } else {
        failedGroups.push({
          reason: extractErrorMessage(result.reason),
          shopOwnerId: group.shopOwnerId,
        });
      }
    });

    successfulGroups.forEach((group) => {
      group.items.forEach((item) => {
        removeItem(item.productId);
      });
    });

    if (successfulGroups.length > 0) {
      toast.success(
        `Created ${successfulGroups.length} order${successfulGroups.length > 1 ? 's' : ''}: ${successfulGroups
          .map((g) => `${g.orderId} (${g.shopOwnerId})`)
          .join(', ')}`,
      );
    }

    if (failedGroups.length > 0) {
      toast.error(
        `Failed for ${failedGroups.length} shop${failedGroups.length > 1 ? 's' : ''}: ${failedGroups
          .map((f) => `${f.shopOwnerId} (${f.reason})`)
          .join('; ')}`,
      );
    }

    setIsProcessing(false);
  }

  if (items.length === 0) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-foreground mb-4 text-3xl font-bold'>Your Cart is Empty</h1>
          <p className='text-muted-foreground mb-8'>Add items to your cart to see them here.</p>
          <Link
            className='bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-colors'
            href={productsUrl}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='text-foreground mb-6 text-3xl font-bold'>Shopping Cart</h1>

      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <div className='space-y-4'>
            {groupedShops.map((group) => (
              <div className='bg-card border-border rounded-lg border' key={group.shopOwnerId}>
                <div className='border-border bg-muted/30 flex items-center justify-between border-b px-4 py-3'>
                  <div className='text-foreground text-sm font-semibold'>Shop: {group.shopOwnerId}</div>
                  <div className='text-muted-foreground text-xs'>
                    {group.groupTotalQuantity} item{group.groupTotalQuantity !== 1 ? 's' : ''} · $
                    {group.groupSubtotal.toFixed(2)}
                  </div>
                </div>
                {group.items.map((groupItem) => (
                  <CartItemRow key={groupItem.cartItem.productId} item={groupItem} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className='lg:col-span-1'>
          <CartSummary
            isProcessing={isProcessing}
            itemsCount={itemsCount}
            onCheckout={handleCheckout}
            onPaymentMethodChange={(method) => setPaymentMethod(method)}
            onToggleShop={(shopOwnerId, checked) => setSelectedShops((prev) => ({ ...prev, [shopOwnerId]: checked }))}
            paymentMethod={paymentMethod}
            selectedShops={selectedShops}
            shippingAddressId={shippingAddressId}
            shippingAddressLabel={shippingAddressLabel}
            shippingManageUrl={addressManageUrl}
            shopGroups={groupedShops}
            subtotal={subtotal}
          />
        </div>
      </div>
    </div>
  );
}
