import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/src/app/components/Breadcrumbs';
import RelatedProducts from '@/src/app/components/RelatedProducts';
import AddToCartWithQty from '@/src/app/components/ui/AddToCart';
import ProductFeedback from '@/src/app/components/ProductFeedback';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  stock: number;
  status: string;
  description?: string;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className='flex flex-col justify-center gap-6 bg-[#f5f5fa] p-4'>
      <Breadcrumb
        items={[{ label: 'Trang chủ', href: '/' }, { label: 'Sản phẩm', href: '/products' }, { label: product.name }]}
      />
      <div className='flex justify-center'>
        <div className='max-w-3/4 mx-auto grid grid-cols-[400px_1fr_260px] gap-6 rounded-lg bg-white p-6'>
          <div className='relative aspect-square rounded-md border border-[#eee]'>
            <Image src={product.image} alt={product.name} fill className='object-contain' />
          </div>

          <div>
            <h1 className='mb-2 text-[22px] font-semibold'>{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className='mb-3 text-[18px] text-[#fdd835]'>
                {'★'.repeat(Math.round(product.rating))}
                <span className='ml-1.5 text-[#555]'>{product.rating.toFixed(1)}</span>
              </div>
            )}

            {/* Price */}
            <div className='mb-4 flex items-center gap-3'>
              <span className='text-[24px] font-bold text-[#ff424e]'>{product.price.toLocaleString()}₫</span>
              {product.oldPrice && (
                <span className='text-[#999] line-through'>{product.oldPrice.toLocaleString()}₫</span>
              )}
            </div>

            <ul className='mb-5 list-none p-0'>
              <li className='mb-1.5 text-sm'>✔ Chính hãng 100%</li>
              <li className='mb-1.5 text-sm'>✔ Giao nhanh 2h</li>
              <li className='mb-1.5 text-sm'>✔ Đổi trả 7 ngày</li>
            </ul>
          </div>

          <AddToCartWithQty product={product} />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='my-8 w-[800px] rounded-lg bg-white p-6'>
          <ProductFeedback productId={id} />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='max-w-3/4 mx-auto my-8'>
          <RelatedProducts currentId={id} />
        </div>
      </div>
    </div>
  );
}
