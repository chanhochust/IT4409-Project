'use client';

import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { ProductService } from 'src/shared/services/api/services/product.service';
import { useCart } from 'src/shared/stores/cart/useCart';
import { groupCartItemsByShop, type CartProductMeta } from 'src/shared/utils/cartGrouping';
import { CartPreviewItemRow } from './CartPreviewItemRow';

interface CartPreviewPopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartPreviewPopover({ children, isOpen, onOpenChange }: CartPreviewPopoverProps) {
  const { items } = useCart();
  const params = useParams();
  const locale = params.locale as string;
  const cartUrl = `/${locale}${AppRouter.cart}`;

  const productQueries = useQueries({
    queries: items.map((item) => ({
      enabled: isOpen && !!item.productId,
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

  const groupedShops = React.useMemo(() => groupCartItemsByShop(items, productMeta), [items, productMeta]);

  const flatItems = React.useMemo(() => {
    const list: { groupId: string; item: (typeof groupedShops)[number]['items'][number] }[] = [];
    groupedShops.forEach((group) => {
      group.items.forEach((groupItem) => {
        list.push({ groupId: group.shopOwnerId, item: groupItem });
      });
    });
    return list;
  }, [groupedShops]);

  const limitedEntries = flatItems.slice(0, 3);
  const hasMore = flatItems.length > 3;
  const visibleShopIds = new Set(limitedEntries.map((entry) => entry.groupId));

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  }

  if (!isOpen) return <>{children}</>;

  return (
    <>
      {children}
      <div
        className='fixed inset-0 z-[100] bg-black/20'
        onClick={handleOverlayClick}
        onKeyDown={(e) => e.key === 'Escape' && onOpenChange(false)}
        role='button'
        tabIndex={-1}
      />
      <div className='bg-card border-border fixed top-20 right-4 z-[101] w-[380px] rounded-lg border shadow-lg'>
        <div className='border-border flex items-center justify-between border-b px-4 py-3'>
          <h3 className='text-foreground text-base font-semibold'>Cart</h3>
          <button
            className='text-muted-foreground hover:text-foreground text-sm'
            onClick={() => onOpenChange(false)}
            type='button'>
            ✕
          </button>
        </div>

        <div className='max-h-[400px] overflow-y-auto'>
          {items.length === 0 ? (
            <div className='text-muted-foreground px-4 py-8 text-center text-sm'>Your cart is empty</div>
          ) : (
            <>
              <div className='divide-border divide-y'>
                {groupedShops
                  .filter((group) => visibleShopIds.has(group.shopOwnerId))
                  .map((group) => {
                    const groupItems = limitedEntries.filter((entry) => entry.groupId === group.shopOwnerId);

                    return (
                      <div key={group.shopOwnerId}>
                        <div className='text-muted-foreground bg-muted/30 border-border flex items-center gap-2 border-b px-4 py-2 text-[11px] font-semibold tracking-wide uppercase'>
                          Shop: {group.shopOwnerId}
                        </div>
                        {groupItems.map((entry) => (
                          <CartPreviewItemRow key={entry.item.cartItem.productId} item={entry.item} locale={locale} />
                        ))}
                      </div>
                    );
                  })}
              </div>

              {hasMore && (
                <Link
                  className='text-primary hover:text-primary/80 border-border block border-t px-4 py-3 text-center text-sm font-medium'
                  href={cartUrl}
                  onClick={() => onOpenChange(false)}>
                  View more items...
                </Link>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className='border-border border-t px-4 py-3'>
            <Link
              className='bg-primary text-primary-foreground hover:bg-primary/90 block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors'
              href={cartUrl}
              onClick={() => onOpenChange(false)}>
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
