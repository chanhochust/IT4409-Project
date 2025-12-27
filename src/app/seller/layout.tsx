'use client';

import React, { useEffect, useState } from 'react';
import { SellerSidebar } from '@/src/app/seller/components/SellerSidebar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/app/context/AuthContext';

/**
 * Layout bảo mật cho Kênh Người Bán
 * Chỉ cho phép người dùng có shopStatus = "active" truy cập
 */
export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn || user?.shopStatus !== 'active') {
      // Nếu không phải seller, thông báo và điều hướng về trang phù hợp
      alert('Khu vực chỉ dành cho người bán!');
      router.push('/');
    } else {
      setIsAuthorized(true);
    }
  }, [isLoggedIn, isLoading, user, router]);

  if (isLoading || !isAuthorized) {
    return (
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-gray-50'>
        <div className='mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
        <p className='font-medium text-gray-600'>Đang xác thực quyền truy cập Shop...</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-[#f4f5f7] font-sans'>
      {/* Sidebar cố định bên trái */}
      <SellerSidebar />

      <main className='ml-[260px] flex-1 p-8'>
        <div className='mx-auto max-w-[1400px]'>{children}</div>
      </main>
    </div>
  );
}
