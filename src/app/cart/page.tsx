'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaSpinner, FaArrowRight, FaTrash } from 'react-icons/fa';
import { useCartStore } from '@/store/cart_actions';
import { useRouter } from 'next/navigation';

function EmptyCart() {
  useEffect(() => {
    document.title = 'Giỏ hàng';
  }, []);

  return (
    <main className='min-h-screen px-4 py-5'>
      <div className='flex justify-center'>
        <div className='text-center'>
          <Image
            src='/empty-cart.png'
            alt='Giỏ hàng trống'
            width={150}
            height={150}
            className='md:h-[200px] md:w-[200px]'
          />
          <div className='mt-4'>
            <p className='mb-2 text-sm md:text-base'>Giỏ hàng của bạn đang trống</p>
            <Link
              href='/'
              className='inline-flex items-center gap-2 text-sm font-semibold text-[#d70018] hover:underline md:text-base'>
              <FaArrowRight className='mui-ten' /> Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function NotLoggedInCart() {
  return (
    <div className='flex justify-center px-4 py-10'>
      <div className='text-center'>
        <Image
          src='/empty-cart.png'
          alt='Giỏ hàng trống'
          width={150}
          height={150}
          className='mx-auto md:h-[200px] md:w-[200px]'
        />
        <div className='mt-4'>
          <p className='mb-2 text-sm md:text-base'>
            Vui lòng{' '}
            <Link href='/auth/signin' className='font-semibold text-[#d70018] hover:underline'>
              đăng nhập
            </Link>{' '}
            để xem giỏ hàng
          </p>
          <span className='text-sm md:text-base'>
            Chưa có tài khoản?{' '}
            <Link href='/auth/signup' className='font-semibold text-[#d70018] hover:underline'>
              Đăng ký ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function HasCart() {
  const { increase, decrease, remove } = useCartStore();
  const cart = useCartStore((s) => s.cart);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleItem = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    if (selected.length === cart.length) {
      setSelected([]);
    } else {
      setSelected(cart.map((item) => item.id));
    }
  };

  const selectedTotal = cart
    .filter((item) => selected.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='flex justify-center px-2 md:px-4'>
      <div className='w-full max-w-[1200px] rounded-xl bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)] md:m-2.5 md:p-6'>
        <h2 className='mb-3 text-lg font-semibold md:mb-4 md:text-[22px]'>Giỏ hàng của bạn</h2>

        {/* Desktop Header - Ẩn trên mobile */}
        <div className='hidden grid-cols-[1fr_6fr_2fr_2fr_2fr_2fr] border-b-2 border-[#eee] pb-2.5 text-center font-semibold text-[#555] md:grid'>
          <div className='flex items-center gap-1.5'>
            <input
              type='checkbox'
              checked={selected.length === cart.length}
              onChange={toggleAll}
              className='h-[18px] w-[18px]'
            />
          </div>
          <div>Sản phẩm</div>
          <div>Đơn giá</div>
          <div>Số lượng</div>
          <div>Số tiền</div>
          <div>Thao tác</div>
        </div>

        {/* Mobile: Select All */}
        <div className='mb-2 flex items-center gap-2 border-b border-[#eee] pb-2 md:hidden'>
          <input
            type='checkbox'
            checked={selected.length === cart.length}
            onChange={toggleAll}
            className='h-[16px] w-[16px]'
          />
          <label className='text-sm font-medium'>Chọn tất cả ({cart.length})</label>
        </div>

        {/* Items - Desktop Grid & Mobile Card */}
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              {/* Desktop Layout */}
              <div className='hidden grid-cols-[1fr_6fr_2fr_2fr_2fr_2fr] border-b border-[#eee] py-4 md:grid'>
                <div className='flex items-center justify-start'>
                  <input
                    type='checkbox'
                    checked={selected.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className='h-[18px] w-[18px]'
                  />
                </div>

                <div className='flex gap-[30px] text-left'>
                  <Image src={item.image} width={90} height={90} alt={item.name} />
                  <h3 className='flex items-center justify-center font-medium text-[#222]'>{item.name}</h3>
                </div>

                <div className='flex items-center justify-center font-medium text-[#222]'>
                  {item.price.toLocaleString()}₫
                </div>

                <div className='flex items-center justify-center overflow-hidden'>
                  <button
                    onClick={() => decrease(item.id)}
                    className='cursor-pointer border border-gray-300 bg-gray-50 px-3 py-1.5 hover:bg-gray-200'>
                    –
                  </button>
                  <span className='border border-gray-300 px-3 py-1.5'>{item.quantity}</span>
                  <button
                    onClick={() => increase(item.id)}
                    className='cursor-pointer border border-gray-300 bg-gray-50 px-3 py-1.5 hover:bg-gray-200'>
                    +
                  </button>
                </div>

                <div className='flex items-center justify-center text-[15px] font-semibold text-[#d70018]'>
                  {(item.quantity * item.price).toLocaleString()}₫
                </div>

                <div className='flex items-center justify-center'>
                  <button
                    onClick={() => remove(item.id)}
                    className='cursor-pointer rounded-md border-0 bg-[#ffe5e5] px-3 py-1.5 text-[#d70018]'>
                    Xóa
                  </button>
                </div>
              </div>

              {/* Mobile Layout - Card Style */}
              <div className='flex gap-3 border-b border-[#eee] py-3 md:hidden'>
                {/* Checkbox */}
                <div className='flex items-start pt-1'>
                  <input
                    type='checkbox'
                    checked={selected.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className='h-[16px] w-[16px]'
                  />
                </div>

                {/* Image */}
                <div className='flex-shrink-0'>
                  <Image src={item.image} width={70} height={70} alt={item.name} className='rounded' />
                </div>

                {/* Info */}
                <div className='min-w-0 flex-1'>
                  <h3 className='mb-1 line-clamp-2 text-sm font-medium'>{item.name}</h3>
                  <p className='mb-2 text-xs text-gray-500'>Đơn giá: {item.price.toLocaleString()}₫</p>

                  {/* Quantity Controls */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <button
                        onClick={() => decrease(item.id)}
                        className='cursor-pointer border border-gray-300 bg-gray-50 px-2 py-1 text-sm hover:bg-gray-200'>
                        –
                      </button>
                      <span className='border-y border-gray-300 px-3 py-1 text-sm'>{item.quantity}</span>
                      <button
                        onClick={() => increase(item.id)}
                        className='cursor-pointer border border-gray-300 bg-gray-50 px-2 py-1 text-sm hover:bg-gray-200'>
                        +
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button onClick={() => remove(item.id)} className='cursor-pointer p-2 text-red-600'>
                      <FaTrash size={14} />
                    </button>
                  </div>

                  {/* Total Price */}
                  <p className='mt-2 text-sm font-semibold text-[#d70018]'>
                    {(item.quantity * item.price).toLocaleString()}₫
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className='mt-4 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-between'>
          <span className='text-base font-semibold text-[#d70018] md:text-[20px]'>
            Tổng cộng ({selected.length} sản phẩm):{' '}
            <span className='mt-1 block md:mt-0 md:inline'>{selectedTotal.toLocaleString()}₫</span>
          </span>
          <button
            className='w-full cursor-pointer rounded-md border-0 bg-[#d70018] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 md:w-auto md:py-2.5 md:text-[16px]'
            disabled={selected.length === 0}
            onClick={() => router.push('/checkout?items=' + JSON.stringify(selected))}>
            Thanh toán ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const cart = useCartStore((s) => s.cart);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center py-10'>
        <FaSpinner className='h-8 w-8 animate-spin md:h-10 md:w-10' />
        <p className='mt-2 text-sm md:text-base'>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!isLoggedIn) return <NotLoggedInCart />;
  if (cart.length === 0) return <EmptyCart />;

  return <HasCart />;
}
