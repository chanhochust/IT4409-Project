'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Store, Clock, TrendingUp, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Tổng người dùng',
      value: '4',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      label: 'Shop đang hoạt động',
      value: '1',
      icon: Store,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      label: 'Chờ duyệt shop',
      value: '1',
      icon: Clock,
      color: 'bg-orange-500',
      change: 'Mới',
    },
    {
      label: 'Doanh thu tháng',
      value: '128M',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+25%',
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='mb-1 text-sm text-gray-600'>{stat.label}</p>
                <p className='text-3xl font-bold text-gray-800'>{stat.value}</p>
                <p className='mt-2 text-sm font-medium text-green-600'>{stat.change}</p>
              </div>
              <div className={`${stat.color} rounded-lg p-4`}>
                <stat.icon className='h-8 w-8 text-white' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-xl font-bold text-gray-800'>Thao tác nhanh</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Link
            href='/admin/shops'
            className='flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 transition-colors hover:bg-orange-100'>
            <Clock className='h-6 w-6 text-orange-600' />
            <div className='text-left'>
              <p className='font-semibold text-gray-800'>Duyệt Shop</p>
              <p className='text-sm text-gray-600'>1 shop chờ xét duyệt</p>
            </div>
          </Link>

          <Link
            href='/admin/users'
            className='flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100'>
            <Users className='h-6 w-6 text-blue-600' />
            <div className='text-left'>
              <p className='font-semibold text-gray-800'>Quản lý Người dùng</p>
              <p className='text-sm text-gray-600'>4 người dùng</p>
            </div>
          </Link>

          <Link
            href='/admin/settings'
            className='flex items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4 transition-colors hover:bg-purple-100'>
            <Settings className='h-6 w-6 text-purple-600' />
            <div className='text-left'>
              <p className='font-semibold text-gray-800'>Cấu hình sàn</p>
              <p className='text-sm text-gray-600'>Điều chỉnh hệ thống</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activities */}
      <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-xl font-bold text-gray-800'>Hoạt động gần đây</h2>
        <div className='space-y-4'>
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
            <div key={index} className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
              <div className='flex items-center gap-3'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    activity.type === 'pending'
                      ? 'bg-orange-500'
                      : activity.type === 'success'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                  }`}
                />
                <div>
                  <p className='font-medium text-gray-800'>{activity.action}</p>
                  <p className='text-sm text-gray-600'>{activity.user}</p>
                </div>
              </div>
              <span className='text-sm text-gray-500'>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
