'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaLock,
  FaBell,
  FaShoppingCart,
  FaChevronRight,
  FaTachometerAlt,
} from 'react-icons/fa';

function AccountSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;
  const isAdmin = user?.role === 'admin';

  return (
    <nav className='box-border border-r border-[#f0f0f0] pr-5'>
      {/* .sidebar-profile-header */}
      <div className='mb-5 flex items-center gap-[15px] border-b border-[#f0f0f0] p-[10px] pb-5'>
        <img
          src={user?.avatar || 'https://placehold.co/100x100?text=Avatar'}
          alt='Avatar'
          className='h-[50px] w-[50px] rounded-full border-2 border-[#eee] object-cover'
        />
        <div className='flex flex-col'>
          <span className='text-[0.95rem] text-[#333]'>Tài khoản của</span>
          <strong className='max-w-[150px] truncate text-base font-semibold text-[#333]'>{user?.email}</strong>
        </div>
      </div>

      {/* .sidebar-section */}
      <div className='flex flex-col'>
        <Link
          href='/account/profile'
          className={`flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base no-underline transition-colors ${
            isActive('/account/profile')
              ? 'bg-[#f0f5ff] font-semibold text-[#074262]'
              : 'text-[#333] hover:bg-[#f5f5f5]'
          }`}>
          <div className={isActive('/account/profile') ? 'text-[#074262]' : ''}>
            <FaUser />
          </div>{' '}
          Hồ Sơ
        </Link>

        {!isAdmin && (
          <>
            <Link
              href='/orders'
              className={`flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base no-underline transition-colors ${
                isActive('/account/orders')
                  ? 'bg-[#f0f5ff] font-semibold text-[#074262]'
                  : 'text-[#333] hover:bg-[#f5f5f5]'
              }`}>
              <div className={isActive('/account/orders') ? 'text-[#074262]' : ''}>
                <FaShoppingCart />
              </div>{' '}
              Đơn Hàng
            </Link>
            <Link
              href='/account/payment'
              className={`flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base no-underline transition-colors ${
                isActive('/account/payment')
                  ? 'bg-[#f0f5ff] font-semibold text-[#074262]'
                  : 'text-[#333] hover:bg-[#f5f5f5]'
              }`}>
              <div className={isActive('/account/payment') ? 'text-[#074262]' : ''}>
                <FaCreditCard />
              </div>{' '}
              Ngân Hàng
            </Link>
            <Link
              href='/account/address'
              className={`flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base no-underline transition-colors ${
                isActive('/account/address')
                  ? 'bg-[#f0f5ff] font-semibold text-[#074262]'
                  : 'text-[#333] hover:bg-[#f5f5f5]'
              }`}>
              <div className={isActive('/account/address') ? 'text-[#074262]' : ''}>
                <FaMapMarkerAlt />
              </div>{' '}
              Địa Chỉ
            </Link>
          </>
        )}

        <Link
          href='/account/password'
          className={`flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base no-underline transition-colors ${
            isActive('/account/password')
              ? 'bg-[#f0f5ff] font-semibold text-[#074262]'
              : 'text-[#333] hover:bg-[#f5f5f5]'
          }`}>
          <div className={isActive('/account/password') ? 'text-[#074262]' : ''}>
            <FaLock />
          </div>{' '}
          Đổi Mật Khẩu
        </Link>
        <Link
          href='/account/notifications'
          className={`flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base no-underline transition-colors ${
            isActive('/account/notifications')
              ? 'bg-[#f0f5ff] font-semibold text-[#074262]'
              : 'text-[#333] hover:bg-[#f5f5f5]'
          }`}>
          <div className={isActive('/account/notifications') ? 'text-[#074262]' : ''}>
            <FaBell />
          </div>{' '}
          Thông Báo
        </Link>

        {isAdmin && (
          <Link
            href='/admin'
            className='mt-2 flex items-center gap-3 rounded-lg px-[10px] py-3.5 text-base text-[#333] no-underline hover:bg-[#f5f5f5]'>
            <FaTachometerAlt /> Trang Admin
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading || !isLoggedIn) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <p className='font-semibold text-gray-500'>Đang tải trang...</p>
      </div>
    );
  }

  const getBreadcrumbText = () => {
    if (pathname.endsWith('/profile')) return 'Hồ Sơ Của Tôi';
    if (pathname.endsWith('/payment')) return 'Ngân Hàng';
    if (pathname.endsWith('/address')) return 'Địa Chỉ';
    if (pathname.endsWith('/password')) return 'Mật Khẩu';
    if (pathname.endsWith('/orders')) return 'Đơn Hàng';
    return 'Tài khoản';
  };

  return (
    <div className='min-h-screen bg-white font-sans text-black'>
      {/* .breadcrumb */}
      <nav className='mx-auto my-5 box-border flex max-w-[1200px] items-center gap-2 px-[15px] text-base font-[550] text-[#777]'>
        <Link href='/' className='text-[#2563eb] no-underline hover:underline'>
          Trang chủ
        </Link>
        <div className='text-[0.75rem] text-[#999]'>
          <FaChevronRight />
        </div>
        <span>{getBreadcrumbText()}</span>
      </nav>

      <div className='mx-auto my-10 box-border grid max-w-[1200px] grid-cols-1 gap-[30px] px-5 md:grid-cols-[250px_1fr]'>
        <AccountSidebar />

        <div className='min-h-[600px] bg-white'>
          {children || (
            <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-10 text-gray-300'>
              <div className='mb-4 text-4xl'>
                <FaUser />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
