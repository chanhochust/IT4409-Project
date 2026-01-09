'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { OrdersSkeleton } from 'src/shared/components/orders/OrdersSkeleton';
import { OrdersPagination } from 'src/shared/components/orders/OrdersPagination';
import { MyOrdersToolbar } from 'src/shared/components/orders/MyOrdersToolbar';
import { MyShopOrderCard } from 'src/shared/components/orders/MyShopOrderCard';
import { ShopRegistrationForm } from 'src/shared/components/shop/ShopRegistrationForm';
import { ShopProductCard } from 'src/shared/components/shop/ShopProductCard';
import { ProductFormDialog } from 'src/shared/components/products/ProductFormDialog';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { useShopOrdersQuery } from 'src/shared/services/api/queries/useOrder.query';
import { useMyShopQuery, useMyShopProductsQuery } from 'src/shared/services/api/queries/shop.query';

export default function MyShopPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get('page') ?? 1);
  const initialLimit = Number(searchParams.get('limit') ?? 10);

  const [page, setPage] = React.useState<number>(Number.isNaN(initialPage) ? 1 : initialPage);
  const [limit, setLimit] = React.useState<number>(Number.isNaN(initialLimit) ? 10 : initialLimit);
  const [isProductDialogOpen, setIsProductDialogOpen] = React.useState(false);

  // Check if user has a shop
  const myShopQuery = useMyShopQuery();
  const myShopProductsQuery = useMyShopProductsQuery();

  React.useEffect(() => {
    const p = Number(searchParams.get('page') ?? 1);
    const l = Number(searchParams.get('limit') ?? limit);
    if (!Number.isNaN(p) && p !== page) setPage(p);
    if (!Number.isNaN(l) && l !== limit) setLimit(l);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Check if user has a shop and fetch orders
  const query = useShopOrdersQuery({ page, limit });

  const total = query.data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  function updateSearchParams(nextPage: number, nextLimit: number) {
    const usp = new URLSearchParams(Array.from(searchParams.entries()));
    usp.set('page', String(nextPage));
    usp.set('limit', String(nextLimit));
    router.replace(`/${locale}/my-shop?${usp.toString()}`);
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

  // Show loading state while checking for shop
  if (myShopQuery.isLoading) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <h1 className='text-foreground mb-1 text-3xl font-bold'>My Shop</h1>
        <p className='text-muted-foreground mb-4'>Loading shop information...</p>
        <OrdersSkeleton count={3} />
      </div>
    );
  }

  // Show registration form if shop doesn't exist
  if (myShopQuery.isError || myShopQuery.data?.success === false) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <h1 className='text-foreground mb-6 text-center text-3xl font-bold'>Welcome to My Shop</h1>
        <p className='text-muted-foreground mb-8 text-center'>
          You haven&apos;t registered a shop yet. Create your shop to start selling!
        </p>
        <ShopRegistrationForm onSuccess={() => void myShopQuery.refetch()} />
      </div>
    );
  }

  if (query.isLoading) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <h1 className='text-foreground mb-1 text-3xl font-bold'>My Shop</h1>
        <p className='text-muted-foreground mb-4'>Orders placed in your shop</p>
        <MyOrdersToolbar limit={limit} onLimitChange={handleLimitChange} />
        <OrdersSkeleton count={limit} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-foreground mb-1 text-3xl font-bold'>My Shop</h1>
          <p className='text-muted-foreground mb-6'>Failed to load shop orders. Please try again.</p>
          <AppButton onClick={() => void query.refetch()} variant='outline'>
            Retry
          </AppButton>
        </div>
      </div>
    );
  }

  const orders = query.data?.data?.orders ?? [];
  const shop = myShopQuery.data?.data;
  const products = myShopProductsQuery.data?.data?.products ?? [];

  if (orders.length === 0) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* Shop Details */}
        {shop && (
          <div className='mb-8'>
            <div className='bg-card rounded-lg border p-6 shadow-sm'>
              <div className='flex items-start gap-6'>
                {shop.logo && <img src={shop.logo} alt={shop.shopName} className='size-24 rounded-lg object-cover' />}
                <div className='flex-1'>
                  <h2 className='text-foreground mb-2 text-2xl font-bold'>{shop.shopName}</h2>
                  <div className='text-muted-foreground space-y-1 text-sm'>
                    <p>
                      <span className='font-medium'>Email:</span> {shop.bussinessEmail}
                    </p>
                    <p>
                      <span className='font-medium'>Warehouse:</span> {shop.warehouseAddress}
                    </p>
                    <p>
                      <span className='font-medium'>Status:</span>{' '}
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          shop.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : shop.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                        {shop.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='text-center'>
          <h1 className='text-foreground mb-1 text-3xl font-bold'>My Shop Orders</h1>
          <p className='text-muted-foreground mb-8'>No orders yet.</p>
          <AppButton asChild>
            <Link href={productsUrl}>Browse products</Link>
          </AppButton>
        </div>

        {/* Products Section */}
        <div className='mt-12'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-foreground text-2xl font-bold'>My Products</h2>
            {shop?.status === 'active' && (
              <AppButton onClick={() => setIsProductDialogOpen(true)}>Add Product</AppButton>
            )}
          </div>
          {products.length > 0 ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {products.map((product) => (
                <ShopProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          ) : (
            <div className='bg-muted/50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12'>
              <p className='text-muted-foreground mb-4'>No products yet. Create your first product!</p>
              {shop?.status === 'active' && (
                <AppButton onClick={() => setIsProductDialogOpen(true)}>Create Product</AppButton>
              )}
              {shop?.status === 'pending' && (
                <p className='text-muted-foreground text-sm'>Your shop is pending approval</p>
              )}
            </div>
          )}
        </div>

        <ProductFormDialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen} />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      {/* Shop Details */}
      {shop && (
        <div className='mb-8'>
          <div className='bg-card rounded-lg border p-6 shadow-sm'>
            <div className='flex items-start gap-6'>
              {shop.logo && <img src={shop.logo} alt={shop.shopName} className='size-24 rounded-lg object-cover' />}
              <div className='flex-1'>
                <h2 className='text-foreground mb-2 text-2xl font-bold'>{shop.shopName}</h2>
                <div className='text-muted-foreground space-y-1 text-sm'>
                  <p>
                    <span className='font-medium'>Email:</span> {shop.bussinessEmail}
                  </p>
                  <p>
                    <span className='font-medium'>Warehouse:</span> {shop.warehouseAddress}
                  </p>
                  <p>
                    <span className='font-medium'>Status:</span>{' '}
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        shop.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : shop.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                      {shop.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className='text-foreground mb-1 text-3xl font-bold'>Shop Orders</h1>
      <p className='text-muted-foreground mb-4'>Orders placed in your shop</p>

      <MyOrdersToolbar limit={limit} onLimitChange={handleLimitChange} />

      <div className='space-y-4'>
        {orders.map((order) => (
          <MyShopOrderCard key={order.id} order={order} />
        ))}
      </div>

      <OrdersPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />

      {/* Products Section */}
      <div className='mt-12'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-foreground text-2xl font-bold'>My Products</h2>
          {shop?.status === 'active' && (
            <AppButton asChild>
              <Link href={`/${locale}/my-shop/products/create`}>Add Product</Link>
            </AppButton>
          )}
        </div>
        {products.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className='bg-muted/50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12'>
            <p className='text-muted-foreground mb-4'>No products yet. Create your first product!</p>
            {shop?.status === 'active' && (
              <AppButton onClick={() => setIsProductDialogOpen(true)}>Create Product</AppButton>
            )}
            {shop?.status === 'pending' && (
              <p className='text-muted-foreground text-sm'>Your shop is pending approval</p>
            )}
          </div>
        )}
      </div>

      <ProductFormDialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen} />
    </div>
  );
}
