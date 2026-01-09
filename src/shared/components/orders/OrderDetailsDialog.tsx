import * as React from 'react';
import { AppDialog } from 'src/shared/components/ui/dialog/AppDialog';
import { AppBadge } from 'src/shared/components/ui/badge/AppBadge';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { useOrderByIdQuery } from 'src/shared/services/api/queries/useOrder.query';

interface OrderDetailsDialogContentProps {
  readonly orderId: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function formatDate(input: unknown): string {
  if (input === null || input === undefined) return '';
  try {
    if (input instanceof Date) {
      return input.toLocaleString();
    }
    if (typeof input === 'string') {
      const d = new Date(input);
      return isNaN(d.getTime()) ? input : d.toLocaleString();
    }
    if (typeof input === 'number') {
      const d = new Date(input);
      return isNaN(d.getTime()) ? '' : d.toLocaleString();
    }
    return '';
  } catch {
    return '';
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

export function OrderDetailsDialogContent({ orderId }: OrderDetailsDialogContentProps) {
  const query = useOrderByIdQuery(orderId);

  if (query.isLoading) {
    return (
      <AppDialog.Content>
        <AppDialog.Header>
          <AppDialog.Title>Order Details</AppDialog.Title>
          <AppDialog.Description>Loading details...</AppDialog.Description>
        </AppDialog.Header>
        <div className='space-y-2'>
          <div className='bg-muted h-4 w-1/3 rounded' />
          <div className='bg-muted h-3 w-2/3 rounded' />
          <div className='bg-muted h-3 w-1/2 rounded' />
        </div>
      </AppDialog.Content>
    );
  }

  if (query.isError) {
    return (
      <AppDialog.Content>
        <AppDialog.Header>
          <AppDialog.Title>Order Details</AppDialog.Title>
          <AppDialog.Description>Failed to load the order.</AppDialog.Description>
        </AppDialog.Header>
        <div className='flex justify-end'>
          <AppButton variant='outline' onClick={() => void query.refetch()}>
            Retry
          </AppButton>
        </div>
      </AppDialog.Content>
    );
  }

  const order = query.data?.data;
  if (!order) {
    return (
      <AppDialog.Content>
        <AppDialog.Header>
          <AppDialog.Title>Order Details</AppDialog.Title>
          <AppDialog.Description>No data available.</AppDialog.Description>
        </AppDialog.Header>
      </AppDialog.Content>
    );
  }

  const address = order.shippingAddress;
  const status = typeof order.status === 'string' ? order.status : 'PENDING';
  const totalAmount =
    typeof order.totalAmount === 'number'
      ? order.totalAmount
      : typeof order.totalAmount === 'string'
        ? Number(order.totalAmount)
        : 0;

  return (
    <AppDialog.Content>
      <AppDialog.Header>
        <AppDialog.Title>Order #{order.id.slice(0, 8)}</AppDialog.Title>
        <AppDialog.Description>Created {formatDate(order.createdAt)}</AppDialog.Description>
      </AppDialog.Header>

      <div className='mb-3 flex items-center justify-between'>
        <div className='text-muted-foreground text-sm'>
          Shop: <span className='text-foreground'>{order.shopOwnerId}</span>
        </div>
        <AppBadge variant={getStatusVariant(status)}>{status}</AppBadge>
      </div>

      <div className='grid gap-2 sm:grid-cols-2'>
        <div className='text-muted-foreground text-sm'>
          Payment: <span className='text-foreground'>{order.paymentMethod}</span>
        </div>
        <div className='text-muted-foreground text-sm'>
          Total: <span className='text-foreground font-medium'>{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <div className='border-border my-3 border-t pt-3'>
        <div className='text-muted-foreground mb-1 text-sm'>Items</div>
        <div className='space-y-2'>
          {order.items.map((it) => (
            <div key={it.productId} className='text-foreground text-sm'>
              <span className='font-medium'>{it.productName}</span> ×{it.quantity} ·{' '}
              {formatCurrency(
                typeof it.price === 'number' ? it.price : typeof it.price === 'string' ? Number(it.price) : 0,
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='border-border mt-2 border-t pt-3'>
        <div className='text-muted-foreground mb-1 text-sm'>Shipping</div>
        <div className='text-foreground text-sm'>
          {address ? (
            <span>
              {address.name} · {address.phone} · {address.street}, {address.ward}, {address.district}, {address.city}
            </span>
          ) : (
            <span>No shipping address</span>
          )}
        </div>
      </div>

      <AppDialog.Footer />
    </AppDialog.Content>
  );
}
