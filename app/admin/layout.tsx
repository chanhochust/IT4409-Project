'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from './components/AdminSidebar';
import { FaSpinner } from 'react-icons/fa';
import 'app/admin/global.css';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50">
      <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
      <p className="text-gray-600 font-medium">Đang kiểm tra quyền truy cập Admin...</p>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn || user?.role !== 'admin') {
      alert("Bạn không có quyền truy cập trang này!");
      router.push('/'); 
    } else {
      setIsAuthorized(true);
    }
  }, [isLoggedIn, isLoading, user, router]);

  if (isLoading || !isAuthorized) {
    return <LoadingSpinner />;
  }
  
  // Layout Admin
  return (
    <div className="admin-app-wrapper">
      <AdminSidebar /> 

      <div className="admin-content-area">
        <div className="admin-main-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}