'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, FaBox, FaShoppingBasket, FaUsers, 
  FaCog, FaSignOutAlt, FaHome, FaUser, FaChartBar, FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from 'app/context/AuthContext';
import { ReactNode } from 'react';
import 'app/admin/global.css';

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
    <nav className="admin-sidebar">
      
      {/* Header */}
      <div className="sidebar-header">
        TIBIKI ADMIN
      </div>
      
      {/* User Info */}
      <div className="sidebar-user-info">
        <span>Xin chào,</span>
        <strong title={user?.email}>{user?.name || user?.email || 'Admin'}</strong>
      </div>

      {/* Menu Navigation */}
      <div className="sidebar-nav">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-nav-link ${isActive(item.href) ? 'active' : ''}`}
          >
            <item.icon className="icon" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto">
        <Link 
          href="/" 
          className="sidebar-nav-link"
        >
          <FaHome className="icon" />
          Về trang chủ
        </Link>
        <button
          onClick={logout}
          className="sidebar-logout-btn"
        >
          <FaSignOutAlt className="icon" />
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}