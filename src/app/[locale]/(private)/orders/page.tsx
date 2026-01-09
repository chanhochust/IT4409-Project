'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { OrderCard } from 'src/shared/components/orders/OrderCard';
import { OrdersSkeleton } from 'src/shared/components/orders/OrdersSkeleton';
import { OrdersPagination } from 'src/shared/components/orders/OrdersPagination';
import { MyOrdersToolbar } from 'src/shared/components/orders/MyOrdersToolbar';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { useMyOrdersQueryWithKey } from 'src/shared/services/api/queries/useOrder.query';

export default function MyOrdersPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get('page') ?? 1);
  const initialLimit = Number(searchParams.get('limit') ?? 10);

  const [page, setPage] = React.useState<number>(Number.isNaN(initialPage) ? 1 : initialPage);
  const [limit, setLimit] = React.useState<number>(Number.isNaN(initialLimit) ? 10 : initialLimit);

  React.useEffect(() => {
    const p = Number(searchParams.get('page') ?? 1);
    const l = Number(searchParams.get('limit') ?? limit);
    if (!Number.isNaN(p) && p !== page) setPage(p);
    if (!Number.isNaN(l) && l !== limit) setLimit(l);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const query = useMyOrdersQueryWithKey({ page, limit });

  const total = query.data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  function updateSearchParams(nextPage: number, nextLimit: number) {
    const usp = new URLSearchParams(Array.from(searchParams.entries()));
    usp.set('page', String(nextPage));
    usp.set('limit', String(nextLimit));
    router.replace(`/${locale}/orders?${usp.toString()}`);
  }

  function handlePageChange(next: number) {
    const clamped = Math.min(Math.max(1, next), totalPages);
    setPage(clamped);
    updateSearchParams(clamped, limit);
  }

  function handleLimitChange(next: number) {
    setLimit(next);
    setPage(1);
    updateSearchParams(1, next);
  }

  const productsUrl = `/${locale}${AppRouter.products}`;

  if (query.isLoading) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <h1 className='text-foreground mb-4 text-3xl font-bold'>My Orders</h1>
        <MyOrdersToolbar limit={limit} onLimitChange={handleLimitChange} />
        <OrdersSkeleton count={limit} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-foreground mb-4 text-3xl font-bold'>My Orders</h1>
          <p className='text-muted-foreground mb-6'>Failed to load your orders. Please try again.</p>
          <AppButton onClick={() => void query.refetch()} variant='outline'>
            Retry
          </AppButton>
        </div>
      </div>
    );
  }

  const orders = query.data?.data?.orders ?? [];

  if (orders.length === 0) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-foreground mb-4 text-3xl font-bold'>My Orders</h1>
          <p className='text-muted-foreground mb-8'>No orders yet.</p>
          <AppButton asChild>
            <Link href={productsUrl}>Browse products</Link>
          </AppButton>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='text-foreground mb-4 text-3xl font-bold'>My Orders</h1>

      <MyOrdersToolbar limit={limit} onLimitChange={handleLimitChange} />

      <div className='space-y-4'>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <OrdersPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
