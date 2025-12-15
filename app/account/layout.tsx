'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaLock, FaBell, FaShoppingCart, FaChevronRight, FaTachometerAlt } from 'react-icons/fa';
import './global.css'

function LoadingSpinner() {
  return (
    <div className="cart-loading-container">
      <p>Đang tải trang...</p>
    </div>
  )
}

function AccountSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="account-sidebar">
      <div className="sidebar-profile-header">
        <img
          src={user?.avatar || '[https://placehold.co/100x100?text=](https://placehold.co/100x100?text=)...'}
          alt="Avatar"
          className="sidebar-avatar"
        />
        <div className="sidebar-user-info">
          <span>Tài khoản của</span>
          <strong>{user?.email}</strong>
        </div>
      </div>

      <div className="sidebar-section">
        <Link href="/account/profile" className={isActive('/account/profile') ? 'active' : ''}>
          <FaUser /> Hồ Sơ
        </Link>
        {!isAdmin && (
        <>
        <Link href="/orders" className={isActive('/account/orders') ? 'active' : ''}>
          <FaShoppingCart /> Đơn Hàng
        </Link>
        <Link href="/account/payment" className={isActive('/account/payment') ? 'active' : ''}>
          <FaCreditCard /> Ngân Hàng
        </Link>
        <Link href="/account/address" className={isActive('/account/address') ? 'active' : ''}>
          <FaMapMarkerAlt /> Địa Chỉ
        </Link>
        </>
        )}
        <Link href="/account/password" className={isActive('/account/password') ? 'active' : ''}>
          <FaLock /> Đổi Mật Khẩu
        </Link>
        <Link href="/account/notifications" className={isActive('/account/notifications') ? 'active' : ''}>
          <FaBell /> Thông Báo
        </Link>
        {isAdmin && (
          <Link href="/admin">
             <FaTachometerAlt/> Trang Admin
           </Link>
        )}
      </div>
    </nav>
  )
}


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      router.push('auth/signin');
    }
  }, [isLoggedIn, isLoading, router]);


  if (isLoading || !isLoggedIn) {
    return <LoadingSpinner />;
  }
  const getBreadcrumbText = () => {
    if (pathname.endsWith('/profile')) return 'Hồ Sơ Của Tôi';
    if (pathname.endsWith('/payment')) return 'Ngân Hàng';
    if (pathname.endsWith('/address')) return 'Địa Chỉ';
    if (pathname.endsWith('/password')) return 'Mật Khẩu';
    if (pathname.endsWith('/orders')) return 'Đơn Hàng';
    //...
    return 'Tài khoản';
  }


  return (
    <main>
        <nav className="breadcrumb">
          <Link href="/">Trang chủ</Link>
          <FaChevronRight className="breadcrumb-separator" />
          <span>{getBreadcrumbText()}</span>
        </nav>

      <div className="account-page-container" >
        <AccountSidebar />

        <div className="account-content">
          {children}
        </div>

      </div>
    </main>
  );
}