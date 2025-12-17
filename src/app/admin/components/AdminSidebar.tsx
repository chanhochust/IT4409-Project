'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, FaBox, FaShoppingBasket, FaUsers, 
  FaCog, FaSignOutAlt, FaHome, FaUser, FaChartBar, FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '@/src/app/context/AuthContext';
import { ReactNode } from 'react';

const adminNavItems = [
  { href: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
  { href: '/admin/products', icon: FaBox, label: 'Quản lý Sản phẩm' },
  { href: '/admin/orders', icon: FaShoppingBasket, label: 'Quản lý Đơn hàng' },
  { href: '/admin/users', icon: FaUsers, label: 'Quản lý Người dùng' },
  { href: '/admin/settings', icon: FaCog, label: 'Cài đặt' },
  { href: '/account/profile', icon: FaUser, label: 'Hồ sơ cá nhân' }, 
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth(); 

  const isActive = (href: string) => pathname.startsWith(href) && (href !== '/admin' || pathname === '/admin');

  return (
    <nav className="fixed left-0 top-0 h-screen w-[260px] bg-[#011a35] text-white p-5 shadow z-40 flex flex-col overflow-y-auto">
      
      {/* Header */}
      <div className="text-[1.5rem] font-bold text-[#f4fafe] mb-7 pb-2 border-b border-[#343a40]">TIBIKI ADMIN</div>
      
      {/* User Info */}
      <div className="mb-5 pb-4 border-b border-[#343a40]">
        <span className="text-[0.8rem] text-[#adb5bd]">Xin chào,</span>
        <strong className="block text-base font-semibold text-white truncate" title={user?.email}>{user?.name || user?.email || 'Admin'}</strong>
      </div>

      {/* Menu Navigation */}
      <div className="flex flex-col gap-1 grow">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded no-underline text-[#ced4da] transition ${
              isActive(item.href)
                ? 'bg-[#007bff] text-white shadow'
                : 'hover:bg-[#343a40] hover:text-white'
            }`}
          >
            <item.icon />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded no-underline text-[#ced4da] hover:bg-[#343a40] hover:text-white transition"
        >
          <FaHome />
          Về trang chủ
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded text-left text-[#f8d7da] mt-4 border-t border-[#343a40] pt-4 hover:bg-[#343a40] hover:text-[#ffc107] transition"
        >
          <FaSignOutAlt />
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}