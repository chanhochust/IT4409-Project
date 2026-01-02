'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaSpinner, FaArrowRight, FaTrashAlt } from 'react-icons/fa';
import { useCartStore } from '@/store/cart_actions';
import { useRouter } from 'next/navigation';

const GRID_LAYOUT = "grid grid-cols-[50px_1fr_150px_150px_150px_100px] items-center gap-4";

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
    <div className='flex justify-center bg-[#f5f5fa] min-h-screen py-8'>
      <div className='w-full max-w-[1200px] px-4'>
        <div className='bg-white rounded-xl p-6 shadow-sm'>
          <h2 className='mb-6 text-xl font-bold text-gray-800'>Giỏ hàng của bạn</h2>

          {/* Header - Sử dụng GRID_LAYOUT */}
          <div className={`${GRID_LAYOUT} border-b border-gray-200 pb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider`}>
            <div className='flex justify-center'>
              <input
                type='checkbox'
                checked={selected.length === cart.length && cart.length > 0}
                onChange={toggleAll}
                className='h-5 w-5 cursor-pointer'
              />
            </div>
            <div className='text-left ml-4'>Sản phẩm</div>
            <div className='text-center'>Đơn giá</div>
            <div className='text-center'>Số lượng</div>
            <div className='text-center'>Số tiền</div>
            <div className='text-center'>Thao tác</div>
          </div>

          {/* Items List */}
          <div className='divide-y divide-gray-100'>
            {cart.map((item) => (
              <div className={`${GRID_LAYOUT} py-5 hover:bg-gray-50 transition-colors`} key={item.id}>
                {/* Checkbox */}
                <div className='flex justify-center'>
                  <input
                    type='checkbox'
                    checked={selected.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className='h-5 w-5 cursor-pointer'
                  />
                </div>

                {/* Sản phẩm */}
                <div className='flex items-center gap-4'>
                  <div className='relative h-20 w-20 shrink-0 rounded-md overflow-hidden'>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className='object-contain p-1'
                    />
                  </div>
                  <Link href={`/products/${item.id}`} className='hover:text-red-600 transition-colors'>
                    <h3 className='font-medium line-clamp-2'>{item.name}</h3>
                  </Link>
                </div>

                {/* Đơn giá */}
                <div className='text-center font-medium text-gray-700'>
                  {item.price.toLocaleString()}₫
                </div>

                {/* Số lượng */}
                <div className='flex justify-center'>
                  <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
                    <button
                      onClick={() => decrease(item.id)}
                      className='px-3 py-1 bg-gray-50 hover:bg-gray-200 text-lg transition-colors border-r border-gray-300'>
                      –
                    </button>
                    <span className='px-4 py-1 bg-white text-sm font-semibold'>{item.quantity}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className='px-3 py-1 bg-gray-50 hover:bg-gray-200 text-lg transition-colors border-l border-gray-300'>
                      +
                    </button>
                  </div>
                </div>

                {/* Tổng tiền item */}
                <div className='text-center font-bold text-red-600'>
                  {(item.quantity * item.price).toLocaleString()}₫
                </div>

                {/* Thao tác */}
                <div className='flex justify-center'>
                  <button
                    onClick={() => remove(item.id)}
                    className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                    title="Xóa sản phẩm"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Thanh toán */}
          <div className='mt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-6 gap-4'>
            <div className='text-lg'>
              Tổng cộng ({selected.length} sản phẩm): 
              <span className='ml-2 text-2xl font-bold text-red-600'>
                {selectedTotal.toLocaleString()}₫
              </span>
            </div>
            <button
              className='w-full md:w-auto px-10 py-3 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-95'
              disabled={selected.length === 0}
              onClick={() => router.push('/checkout?items=' + JSON.stringify(selected))}>
              Tiến hành thanh toán
            </button>
          </div>
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
