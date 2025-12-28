'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/app/context/AuthContext';
import { FaThLarge, FaBox, FaClipboardList, FaUser, FaCog, FaSignOutAlt, FaStore, FaEye } from 'react-icons/fa';

const sellerNavItems = [
  { href: '/seller/dashboard', icon: FaThLarge, label: 'Bảng điều khiển' },
  { href: '/seller/products', icon: FaBox, label: 'Quản lý Sản phẩm' },
  { href: '/seller/orders', icon: FaClipboardList, label: 'Đơn hàng' },
  { href: '/seller/setting', icon: FaCog, label: 'Cấu hình Shop' },
];

export function SellerSidebar() {
  const { user, logout } = useAuth();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  return (
    <aside className='fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col bg-[#fafafa] p-6 text-slate-300 shadow-2xl'>
      {/* Brand Header */}
      <div className='mb-8 flex items-center gap-3 border-b border-slate-800 pb-4'>
        <div className='rounded-lg bg-[#1086c5] p-2 text-white'>
          <FaStore />
        </div>
        <div className='overflow-hidden'>
          <h2 className='text-xl font-black italic leading-none tracking-tight text-[#0f79b1]'>Tibiki</h2>
          <p className='text-[9px] font-bold uppercase tracking-widest text-slate-400'>Kênh Người Bán</p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className='mb-8 flex items-center gap-3 bg-[#f5f5f5] p-3'>
        <div className='flex h-10 w-10 overflow-hidden rounded-full border-transparent bg-slate-700 text-lg font-bold text-white'>
          {user?.avatar ? (
            <img src={user.avatar} alt='User Avatar' className='h-full w-full object-cover' />
          ) : (
            <FaUser className='h-5 w-5 text-[#555]' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-bold text-[#056ca4]'>{user?.name || 'Đối tác Shop'}</p>
          <p className='truncate text-xs text-slate-500'>{user?.email}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className='flex flex-1 flex-col gap-1.5'>
        {sellerNavItems.map((item) => {
          const isActive = activePath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? ' bg-[#f0f5ff] font-semibold text-[#074262]'
                  : 'text-[#333] hover:translate-x-1 hover:bg-[#f5f5f5]'
              }`}>
              <span className={isActive ? 'text-[#074262]' : 'text-slate-500 transition-colors group-hover:scale-110'}>
                <item.icon />
              </span>
              <span className='text-sm font-semibold'>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className='mt-auto space-y-2'>
        <a
          href='/shop'
          className='flex items-center gap-3 rounded-xl px-4 py-3 text-[#333] transition-colors hover:translate-x-1 hover:bg-[#f5f5f5]'>
          <FaEye></FaEye>
          <span className='text-sm font-medium'>Xem Gian Hàng</span>
        </a>
        <button
          onClick={logout}
          className='mt-2 flex w-full cursor-pointer items-center gap-3 rounded-xl bg-sky-50 px-4 py-3 pt-4 text-sky-700 transition-colors hover:bg-sky-500/10'>
          <FaSignOutAlt />
          <span className='cursor-pointer text-sm font-bold uppercase tracking-wider'>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
