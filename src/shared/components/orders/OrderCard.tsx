import * as React from 'react';
import { AppBadge } from 'src/shared/components/ui/badge/AppBadge';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AppDialog } from 'src/shared/components/ui/dialog/AppDialog';
import { OrderDetailsDialogContent } from './OrderDetailsDialog';
import type { Order } from 'src/shared/types/api/orders/order.type';

interface OrderCardProps {
  readonly order: Order;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'PENDING':
      return 'secondary';
    case 'PAID':
    case 'SHIPPED':
      return 'default';
    case 'CANCELLED':
      return 'destructive';
    default:
      return 'outline';
  }
}

export function OrderCard({ order }: OrderCardProps) {
  const shortId = React.useMemo(() => order.id.slice(0, 8), [order.id]);
  const itemsPreview = React.useMemo(() => {
    const firstTwo = order.items.slice(0, 2);
    const more = order.items.length - firstTwo.length;
    return { firstTwo, more };
  }, [order.items]);

  const address = order.shippingAddress;
  const addressSummary = address
    ? `${address.name} · ${address.phone} · ${address.street}, ${address.ward}, ${address.district}, ${address.city}`
    : 'No shipping address';

  return (
    <div className='bg-card border-border rounded-lg border p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='text-foreground text-sm font-semibold'>Order #{shortId}</div>
        <AppBadge variant={getStatusVariant(order.status)}>{order.status}</AppBadge>
      </div>

      <div className='grid gap-2 sm:grid-cols-2'>
        <div className='text-muted-foreground text-sm'>
          Created: <span className='text-foreground'>{formatDate(order.createdAt)}</span>
        </div>
        <div className='text-muted-foreground text-sm'>
          Shop: <span className='text-foreground'>{order.shopOwnerId}</span>
        </div>
        <div className='text-muted-foreground text-sm'>
          Payment: <span className='text-foreground'>{order.paymentMethod}</span>
        </div>
        <div className='text-muted-foreground text-sm'>
          Total: <span className='text-foreground font-medium'>{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>

      <div className='border-border my-3 border-t pt-3'>
        <div className='text-muted-foreground mb-1 text-sm'>Items</div>
        <div className='text-foreground text-sm'>
          {itemsPreview.firstTwo.map((it) => (
            <span key={it.productId} className='mr-2'>
              {it.productName} ×{it.quantity}
            </span>
          ))}
          {itemsPreview.more > 0 ? <span className='text-muted-foreground'>+{itemsPreview.more} more</span> : null}
        </div>
      </div>

      <div className='border-border mt-2 border-t pt-3'>
        <div className='text-muted-foreground mb-1 text-sm'>Shipping</div>
        <div className='text-foreground text-sm'>{addressSummary}</div>
      </div>

      <div className='mt-4 flex justify-end'>
        <AppDialog.Root>
          <AppDialog.Trigger asChild>
            <AppButton variant='outline'>View details</AppButton>
          </AppDialog.Trigger>
          <OrderDetailsDialogContent orderId={order.id} />
        </AppDialog.Root>
      </div>
    </div>
  );
}
