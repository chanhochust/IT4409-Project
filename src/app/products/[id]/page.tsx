// src/app/product/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/src/app/components/Breadcrumbs';
import RelatedProducts from '@/src/app/components/RelatedProducts';
import AddToCartWithQty from '@/src/app/components/ui/AddToCart';
import ProductFeedback from '@/src/app/components/ProductFeedback';
import ProductImageGallery from '@/src/app/components/ProductImageGallery'; // Import component mới

interface Product {
  id: string;
  name: string;
  image: string; // Ảnh chính
  galleryImages: string[]; // <-- THÊM TRƯỜNG NÀY VÀO INTERFACE
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

  const productData = await res.json();
  // Giả lập thêm galleryImages nếu API của bạn chưa có
  if (!productData.galleryImages || productData.galleryImages.length === 0) {
    productData.galleryImages = [
      productData.image, // Ảnh chính luôn là ảnh đầu tiên
      'https://via.placeholder.com/600x600/FFD700/FFFFFF?text=Product+View+2', // Ảnh ví dụ
      'https://via.placeholder.com/600x600/ADD8E6/FFFFFF?text=Product+View+3',
      'https://via.placeholder.com/600x600/90EE90/FFFFFF?text=Product+View+4',
    ];
  }
  return productData;
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
    <div className='flex flex-col items-center bg-[#f5f5fa] p-3 min-h-screen'>
      <div className='w-full max-w-5xl flex flex-col gap-4'>
        
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' }, 
            { label: 'Sản phẩm', href: '/products' }, 
            { label: product.name }
          ]}
        />

        {/* PHẦN THÔNG TIN SẢN PHẨM */}
        <div className='grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 rounded-lg bg-white p-5 shadow-sm'>
          {/* Gallery Ảnh sản phẩm */}
          <div className='flex flex-col'>
            <ProductImageGallery images={product.galleryImages} alt={product.name} />
          </div>

          {/* Nội dung bên phải */}
          <div className='flex flex-col'>
            <h1 className='text-[20px] font-semibold text-gray-800 mb-1 leading-tight'>
              {product.name}
            </h1>

            {/* Rating & Price */}
            <div className='flex items-center gap-3 mb-3'>
              {product.rating && (
                <div className='flex items-center text-[14px] text-[#fdd835] border-r pr-3'>
                  {'★'.repeat(Math.round(product.rating))}
                  <span className='ml-1 text-gray-400'>({product.rating.toFixed(1)})</span>
                </div>
              )}
              <span className='text-sm text-blue-600'>Chính hãng</span>
            </div>

            <div className='mb-4 p-3 bg-[#fafafa] rounded flex items-baseline gap-3'>
              <span className='text-[22px] font-bold text-[#ff424e]'>
                {product.price.toLocaleString()}₫
              </span>
              {product.oldPrice && (
                <span className='text-gray-400 line-through text-[14px]'>
                  {product.oldPrice.toLocaleString()}₫
                </span>
              )}
            </div>

            {/* Description */}
            <div className='text-[14px] text-gray-600 mb-4 line-clamp-3 leading-snug'>
              {product.description || "Sản phẩm chất lượng cao, đầy đủ hóa đơn chứng từ..."}
            </div>

            {/* Nút thao tác */}
            <div className='pt-4'>
              <AddToCartWithQty product={product} />
            </div>
          </div>
        </div>

        {/* PHẦN FEEDBACK */}
        <div className='rounded-lg bg-white p-5 shadow-sm'>
          <ProductFeedback productId={id} />
        </div>

        {/* SẢN PHẨM LIÊN QUAN */}
        <div className='mt-2'>
          <h2 className='text-[18px] font-bold mb-4'>Sản phẩm tương tự</h2>
          <RelatedProducts currentId={id} />
        </div>
        
      </div>
    </div>
  );
}