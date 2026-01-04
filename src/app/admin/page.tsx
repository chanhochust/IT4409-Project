'use client';

import React, { useState, useEffect } from 'react';
import { Users, Store, Clock, TrendingUp, Settings, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    activeShops: 0,
    pendingShops: 0,
    revenue: '128M',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [usersRes, shopsRes] = await Promise.all([fetch('/api/admin/users'), fetch('/api/admin/shops')]);

        const users = await usersRes.json();
        const shops = await shopsRes.json();

        if (Array.isArray(users) && Array.isArray(shops)) {
          setData({
            totalUsers: users.length,
            activeShops: shops.filter((s: any) => s.status === 'active').length,
            pendingShops: shops.filter((s: any) => s.status === 'pending').length,
            revenue: '128M',
          });
        }
      } catch (error) {
        console.error('Lỗi khi đồng bộ số liệu Dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: 'Tổng người dùng',
      value: data.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      label: 'Shop đang hoạt động',
      value: data.activeShops,
      icon: Store,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      label: 'Chờ duyệt shop',
      value: data.pendingShops,
      icon: Clock,
      color: 'bg-orange-500',
      change: data.pendingShops > 0 ? 'Mới' : 'Trống',
    },
    {
      label: 'Doanh thu tháng',
      value: data.revenue,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+25%',
    },
  ];

  return (
    <div className='space-y-4 md:space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-6'>
            <div className='flex items-center justify-between'>
              <div className='min-w-0 flex-1'>
                <p className='mb-1 truncate text-xs text-gray-600 md:text-sm'>{stat.label}</p>
                {isLoading ? (
                  <div className='h-8 w-12 animate-pulse rounded bg-gray-50 md:h-9'></div>
                ) : (
                  <p className='text-2xl font-bold text-gray-800 md:text-3xl'>{stat.value}</p>
                )}
                <p
                  className={`mt-1 text-xs font-medium md:mt-2 md:text-sm ${stat.label === 'Chờ duyệt shop' && data.pendingShops > 0 ? 'text-orange-500' : 'text-green-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} shrink-0 rounded-lg p-3 md:p-4`}>
                <stat.icon className='h-6 w-6 text-white md:h-8 md:w-8' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-6'>
        <h2 className='mb-3 text-lg font-bold text-gray-800 md:mb-4 md:text-xl'>Thao tác nhanh</h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3'>
          <a
            href='/admin/shops'
            className='flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 no-underline transition-colors hover:bg-orange-100 active:bg-orange-200 md:p-4'>
            <Clock className='h-5 w-5 shrink-0 text-orange-600 md:h-6 md:w-6' />
            <div className='min-w-0 flex-1 text-left'>
              <p className='text-sm font-semibold text-gray-800 md:text-base'>Duyệt Shop</p>
              <p className='truncate text-xs text-gray-600 md:text-sm'>
                {isLoading ? '...' : `${data.pendingShops} shop chờ xét duyệt`}
              </p>
            </div>
          </a>

          <a
            href='/admin/users'
            className='flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 no-underline transition-colors hover:bg-blue-100 active:bg-blue-200 md:p-4'>
            <Users className='h-5 w-5 shrink-0 text-blue-600 md:h-6 md:w-6' />
            <div className='min-w-0 flex-1 text-left'>
              <p className='text-sm font-semibold text-gray-800 md:text-base'>Quản lý Người dùng</p>
              <p className='truncate text-xs text-gray-600 md:text-sm'>
                {isLoading ? '...' : `${data.totalUsers} người dùng`}
              </p>
            </div>
          </a>

          <a
            href='/admin/settings'
            className='flex items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-3 no-underline transition-colors hover:bg-purple-100 active:bg-purple-200 sm:col-span-2 md:p-4 lg:col-span-1'>
            <Settings className='h-5 w-5 shrink-0 text-purple-600 md:h-6 md:w-6' />
            <div className='min-w-0 flex-1 text-left'>
              <p className='text-sm font-semibold text-gray-800 md:text-base'>Cấu hình sàn</p>
              <p className='truncate text-xs text-gray-600 md:text-sm'>Điều chỉnh hệ thống</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activities */}
      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-6'>
        <h2 className='mb-3 text-lg font-bold text-gray-800 md:mb-4 md:text-xl'>Hoạt động gần đây</h2>
        <div className='space-y-3 md:space-y-4'>
          {[
            {
              action: 'Yêu cầu mở shop mới',
              user: 'Nguyễn Bảo Ngọc',
              time: '5 phút trước',
              type: 'pending',
            },
            {
              action: 'Đăng ký tài khoản',
              user: 'Trần Văn A',
              time: '1 giờ trước',
              type: 'success',
            },
            {
              action: 'Cập nhật thông tin shop',
              user: 'Trần Nam',
              time: '2 giờ trước',
              type: 'info',
            },
          ].map((activity, index) => (
            <div key={index} className='flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3 md:p-4'>
              <div className='flex min-w-0 flex-1 items-center gap-2 md:gap-3'>
                <div
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    activity.type === 'pending'
                      ? 'bg-orange-500'
                      : activity.type === 'success'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                  }`}
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-800 md:text-base'>{activity.action}</p>
                  <p className='truncate text-xs text-gray-600 md:text-sm'>{activity.user}</p>
                </div>
              </div>
              <span className='shrink-0 whitespace-nowrap text-xs text-gray-500 md:text-sm'>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
