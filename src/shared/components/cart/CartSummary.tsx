'use client';

import Link from 'next/link';
import React from 'react';
import type { CartGroupedShop } from 'src/shared/utils/cartGrouping';

interface CartSummaryProps {
  isProcessing: boolean;
  itemsCount: number;
  onCheckout: () => Promise<void>;
  onPaymentMethodChange: (method: string) => void;
  onToggleShop: (shopOwnerId: string, checked: boolean) => void;
  paymentMethod: string;
  selectedShops: Record<string, boolean>;
  shippingAddressId: string;
  shippingAddressLabel: string;
  shippingManageUrl: string;
  shopGroups: CartGroupedShop[];
  subtotal: number;
}

export function CartSummary({
  isProcessing,
  itemsCount,
  onCheckout,
  onPaymentMethodChange,
  onToggleShop,
  paymentMethod,
  selectedShops,
  shippingAddressId,
  shippingAddressLabel,
  shippingManageUrl,
  shopGroups,
  subtotal,
}: CartSummaryProps) {
  return (
    <div className='bg-card border-border sticky top-20 rounded-lg border p-6'>
      <h2 className='text-foreground mb-4 text-lg font-semibold'>Order Summary</h2>

      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground text-sm'>Items ({itemsCount})</span>
          <span className='text-foreground text-sm font-medium'>${subtotal.toFixed(2)}</span>
        </div>

        <div className='border-border border-t pt-3'>
          <div className='flex justify-between'>
            <span className='text-foreground font-semibold'>Subtotal</span>
            <span className='text-primary text-lg font-bold'>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {shopGroups.length > 0 && (
          <div className='border-border border-t pt-3'>
            <div className='text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase'>By shop</div>
            <div className='space-y-1'>
              {shopGroups.map((group) => (
                <label
                  className='border-border hover:border-primary/60 flex items-center justify-between gap-3 rounded border px-3 py-2 text-sm transition-colors'
                  key={group.shopOwnerId}>
                  <div className='flex items-center gap-2'>
                    <input
                      checked={selectedShops[group.shopOwnerId] !== false}
                      className='border-border bg-background text-primary focus:ring-primary h-4 w-4 rounded'
                      onChange={(e) => onToggleShop(group.shopOwnerId, e.target.checked)}
                      type='checkbox'
                    />
                    <span className='text-foreground'>Shop: {group.shopOwnerId}</span>
                  </div>
                  <span className='text-foreground font-medium'>${group.groupSubtotal.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='border-border mt-4 space-y-3 border-t pt-4'>
        <div className='space-y-1'>
          <label className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>Payment method</label>
          <select
            className='border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-1'
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            value={paymentMethod}>
            <option value='CASH'>Cash</option>
            <option value='CARD'>Card</option>
            <option value='MOMO'>MoMo</option>
          </select>
        </div>

        <div className='space-y-1'>
          <label className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
            Shipping address
          </label>
          <div className='border-border bg-muted/40 text-foreground flex flex-col gap-1 rounded-md border px-3 py-2 text-sm'>
            <span className='text-foreground font-medium'>{shippingAddressLabel || 'No default address set'}</span>
            {shippingAddressId && <span className='text-muted-foreground text-xs'>ID: {shippingAddressId}</span>}
            <Link
              className='text-primary hover:text-primary/80 text-xs font-semibold underline'
              href={shippingManageUrl}>
              Manage addresses
            </Link>
          </div>
        </div>

        <button
          className='bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground w-full rounded-lg py-3 text-sm font-semibold transition-colors'
          disabled={isProcessing || itemsCount === 0}
          onClick={() => {
            void onCheckout();
          }}
          type='button'>
          {isProcessing ? 'Processing...' : 'Checkout'}
        </button>

        <p className='text-muted-foreground text-center text-xs'>Tax calculated at checkout</p>
      </div>
    </div>
  );
}
