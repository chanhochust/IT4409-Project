'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, LayoutDashboard, Users, Store, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from 'src/app/context/AuthContext';

const navigation = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Người dùng', href: '/admin/users', icon: Users },
  { name: 'Duyệt Shop', href: '/admin/shops', icon: Store },
  { name: 'Cấu hình', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  // Chặn khi chưa login hoặc không phải admin
  if (isLoading) return null;

  if (!user || user.role !== 'admin') {
    router.replace('/');
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-gradient-to-r from-[#1159a5] to-[#078edd] text-white shadow-lg'>
        <div className='mx-auto max-w-7xl px-6 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link href='/admin' className='flex items-center gap-3'>
              <ShoppingBag className='h-8 w-8' />
              <div>
                <h1 className='text-2xl font-bold'>Tibiki Admin</h1>
                <p className='text-sm text-blue-100'>Quản trị hệ thống</p>
              </div>
            </Link>

            {/* Navigation CENTER */}
            <nav className='absolute left-1/2 -translate-x-1/2'>
              <div className='flex gap-8'>
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2 border-b-2 px-2 py-2 transition-colors ${
                        isActive
                          ? 'border-white text-white'
                          : 'border-transparent text-blue-100 hover:scale-105 hover:text-white'
                      }`}>
                      <item.icon className='h-5 w-5' />
                      <span className='font-medium'>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* User menu */}
            <div className='flex items-center gap-4'>
              <div className='text-right'>
                <p className='text-sm font-medium'>{user.name || 'Admin'}</p>
                <p className='text-xs text-blue-100'>{user.email}</p>
              </div>

              <img
                src={user.avatar || 'https://i.pravatar.cc/150?u=admin'}
                alt='Avatar'
                className='h-10 w-10 rounded-full border-2 border-white'
              />

              <button
                onClick={logout}
                title='Đăng xuất'
                className='cursor-pointer rounded-full p-2 transition hover:scale-105 hover:bg-white/20'>
                <LogOut className='h-6 w-6 text-white' />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className='mx-auto max-w-7xl px-6 py-8'>{children}</main>
    </div>
  );
}
