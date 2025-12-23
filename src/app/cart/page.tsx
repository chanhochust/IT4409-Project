'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaSpinner, FaArrowRight } from 'react-icons/fa';
import { useCartStore } from '@/store/cart_actions';
import { useRouter } from 'next/navigation';

function EmptyCart() {
  useEffect(() => {
    document.title = 'Giỏ hàng';
  }, []);

  return (
    <main className='min-h-screen py-5'>
      <div className='flex justify-center'>
        <div className='text-center'>
          <Image src='/empty-cart.png' alt='Giỏ hàng trống' width={200} height={200} />
          <div>
            <p>Giỏ hàng của bạn đang trống</p>
            <Link href='/' className='inline-flex items-center gap-2 font-semibold text-[#d70018]'>
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
    <div className='flex justify-center'>
      <div className='text-center'>
        <Image src='/empty-cart.png' alt='Giỏ hàng trống' width={200} height={200} />
        <div>
          <p>
            Vui lòng{' '}
            <Link href='/auth/signin' className='font-semibold text-[#d70018]'>
              đăng nhập
            </Link>{' '}
            để xem giỏ hàng
          </p>
          <span>
            Chưa có tài khoản?{' '}
            <Link href='/auth/signup' className='font-semibold text-[#d70018]'>
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
  const router = useRouter(); // Next.js router

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
    <div className='flex justify-center'>
      <div className='m-2.5 w-[1200px] rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]'>
        <h2 className='mb-4 text-[22px] font-semibold'>Giỏ hàng của bạn</h2>

        {/* Header */}
        <div className='grid grid-cols-[1fr_6fr_2fr_2fr_2fr_2fr] border-b-2 border-[#eee] pb-2.5 text-center font-semibold text-[#555]'>
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

        {/* Item */}
        <div>
          {cart.map((item) => (
            <div className='grid grid-cols-[1fr_6fr_2fr_2fr_2fr_2fr] border-b border-[#eee] py-4' key={item.id}>
              <div className='flex items-center justify-start'>
                <input
                  type='checkbox'
                  checked={selected.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className='h-[18px] w-[18px]'
                />
              </div>

              <div className='flex items-center justify-center gap-[30px]'>
                <Image src={item.image} width={90} height={90} alt={item.name} />
                <h3>{item.name}</h3>
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
          ))}
        </div>

        {/* Payment */}
        <div className='mt-6 flex items-center justify-between'>
          <span className='text-[20px] font-semibold text-[#d70018]'>
            Tổng cộng ({selected.length} sản phẩm): {selectedTotal.toLocaleString()}₫
          </span>
          <button
            className='cursor-pointer rounded-md border-0 bg-[#d70018] px-5 py-2.5 text-[16px] font-semibold text-white disabled:opacity-50'
            disabled={selected.length === 0}
            onClick={() => router.push('/checkout?items=' + JSON.stringify(selected))}>
            Thanh toán
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
        <FaSpinner className='h-10 w-10 animate-spin' />
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!isLoggedIn) return <NotLoggedInCart />;
  if (cart.length === 0) return <EmptyCart />;

  return <HasCart />;
}
