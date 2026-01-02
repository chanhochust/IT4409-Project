'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/app/context/AuthContext';
import { FaThLarge, FaBox, FaClipboardList, FaCog, FaSignOutAlt, FaStore, FaEye, FaUser } from 'react-icons/fa';

const sellerNavItems = [
  { href: '/seller/dashboard', icon: FaThLarge, label: 'Tổng quan' },
  { href: '/seller/products', icon: FaBox, label: 'Sản phẩm' },
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
    <aside className='fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col bg-white shadow-xl'>
      {/* Brand */}
      <div className='flex items-center gap-3 bg-gradient-to-r from-[#1159a5] to-[#078edd] px-6 py-5 text-white'>
        <div className='rounded-lg bg-white/20 p-2'>
          <FaStore className='text-xl' />
        </div>
        <div>
          <h2 className='text-xl font-black italic leading-none tracking-tight'>Tibiki</h2>
          <p className='text-xs text-blue-100'>Kênh Người Bán</p>
        </div>
      </div>

      {/* Profile */}
      <div className='flex items-center gap-3 bg-[#f5f9ff] p-3'>
        <div className='ml-3 h-10 w-10 overflow-hidden rounded-full border border-[#1A94FF]/30 bg-white'>
          {user?.avatar ? (
            <img src={user.avatar} alt='Avatar' className='h-full w-full object-cover' />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-[#1A94FF]'>
              <FaUser />
            </div>
          )}
        </div>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold text-[#0B74E5]'>{user?.name || 'Đối tác Shop'}</p>
          <p className='truncate text-xs text-slate-500'>{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className='mt-6 flex flex-1 flex-col gap-1 px-3'>
        {sellerNavItems.map((item) => {
          const isActive = activePath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                isActive
                  ? ' bg-[#f0f5ff] font-semibold text-[#0B74E5]'
                  : 'text-[#333333e2] hover:translate-x-1 hover:bg-[#f5f5f5]'
              }`}>
              <item.icon
                className={`text-lg ${isActive ? 'text-[#0B74E5]' : 'text-slate-500 group-hover:text-[#393939]'}`}
              />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='px-4 pb-5'>
        <a
          href='/shop'
          className='mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium text-[#333] transition-colors hover:bg-[#f5f5f5]'>
          <FaEye />
          Xem Gian Hàng
        </a>

        <button
          onClick={logout}
          className='flex w-full cursor-pointer items-center gap-3 rounded-xl bg-[#e8f2ff] px-4 py-3 text-sm font-semibold text-[#0B74E5] transition hover:bg-[#dbeaff]'>
          <FaSignOutAlt />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
