'use client';

import React from 'react';
import {
  FaMoneyBillWave,
  FaShoppingBasket,
  FaStar,
  FaUsers,
  FaExclamationCircle,
  FaArrowRight,
  FaChartLine,
} from 'react-icons/fa';

export default function SellerDashboardPage() {
  return (
    <div className='animate-in fade-in space-y-8 font-sans text-black duration-500'>
      {/* Tiêu đề trang */}
      <div>
        <h1 className='text-3xl font-black tracking-tight text-slate-900'>Tổng quan kinh doanh</h1>
        <p className='mt-1 font-medium italic text-slate-500'>Cập nhật lúc: 24/12/2024 - 16:58</p>
      </div>

      {/* Các Thẻ Thống kê Chính */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Doanh thu hôm nay'
          value='12,450,000 đ'
          trend='+12.5%'
          icon={<FaMoneyBillWave size={24} />}
          color='blue'
        />
        <StatCard title='Đơn hàng mới' value='18' trend='+3 đơn' icon={<FaShoppingBasket size={24} />} color='green' />
        <StatCard
          title='Đánh giá Shop'
          value='4.9 / 5'
          trend='98% hài lòng'
          icon={<FaStar size={24} />}
          color='amber'
        />
        <StatCard title='Lượt truy cập' value='1,204' trend='+15%' icon={<FaUsers size={24} />} color='indigo' />
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* BIỂU ĐỒ HIỆU SUẤT (Placeholder) */}
        <div className='flex h-full min-h-[400px] flex-col rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm lg:col-span-2'>
          <div className='mb-8 flex items-center justify-between'>
            <div>
              <h2 className='flex items-center gap-2 text-xl font-bold text-slate-800'>
                <FaChartLine className='text-blue-600' />
                Hiệu suất doanh số
              </h2>
              <p className='text-xs font-medium text-slate-400'>Biểu đồ tăng trưởng theo thời gian</p>
            </div>
            <select className='cursor-pointer rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 outline-none transition-colors hover:bg-slate-100'>
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
              <option>Tháng này</option>
            </select>
          </div>

          <div className='flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30 text-slate-300'>
            <FaChartLine size={48} className='opacity-20' />
            <span className='text-xs font-bold uppercase tracking-widest opacity-50'>
              Dữ liệu biểu đồ đang được tổng hợp...
            </span>
          </div>
        </div>

        {/* KHU VỰC: VIỆC CẦN LÀM NGAY */}
        <div className='relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 p-8 text-white shadow-xl'>
          <div className='relative z-10'>
            <h2 className='mb-8 flex items-center gap-2 text-xl font-bold'>
              <FaExclamationCircle className='animate-pulse text-red-500' />
              Việc cần làm ngay
            </h2>

            <div className='space-y-4'>
              <TodoItem
                label='Đơn hàng chờ xác nhận'
                count={5}
                urgency='high'
                description='Khách đang chờ bạn duyệt đơn'
                link='/seller/orders'
              />
              <TodoItem
                label='Đơn hàng chưa xử lý'
                count={12}
                urgency='medium'
                description='Cần đóng gói và giao vận chuyển'
                link='/seller/orders'
              />
              <TodoItem
                label='Sản phẩm sắp hết hàng'
                count={3}
                urgency='warning'
                description='Kho còn dưới 5 sản phẩm'
                link='/seller/products'
              />
            </div>

            <a href='/seller/orders'>
              <button className='group mt-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/40 transition-all hover:bg-blue-500 active:scale-95'>
                Xử lý toàn bộ đơn hàng
                <FaArrowRight className='transition-transform group-hover:translate-x-1' />
              </button>
            </a>
          </div>

          {/* Họa tiết nền trang trí */}
          <div className='absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl'></div>
        </div>
      </div>
    </div>
  );
}

// Component Thẻ thống kê nhỏ
const StatCard = ({ title, value, trend, icon, color }: any) => {
  const bgColors: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };
  return (
    <div className='group relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
      <div className='relative z-10 mb-4 flex items-start justify-between'>
        <div className={`rounded-2xl p-3 ${bgColors[color]} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <span className='rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-tighter text-slate-600'>
          {trend}
        </span>
      </div>
      <div className='relative z-10'>
        <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>{title}</p>
        <h3 className='mt-1 text-2xl font-black text-slate-900'>{value}</h3>
      </div>
    </div>
  );
};

// Component Mục việc cần làm
const TodoItem = ({ label, count, urgency, description, link }: any) => {
  const urgencyStyles: any = {
    high: { dot: 'bg-red-500', shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]' },
    medium: { dot: 'bg-blue-500', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
    warning: { dot: 'bg-amber-500', shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]' },
  };

  const style = urgencyStyles[urgency];

  return (
    <a
      href={link}
      className='group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800 bg-slate-800/20 p-4 transition-all hover:border-slate-700 hover:bg-slate-800/50'>
      <div className='flex items-center gap-4'>
        <div className={`h-2.5 w-2.5 rounded-full ${style.dot} ${style.shadow}`}></div>
        <div>
          <p className='text-sm font-bold text-slate-100 transition-colors group-hover:text-white'>{label}</p>
          <p className='mt-0.5 text-[10px] font-medium text-slate-500'>{description}</p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <span className='rounded-lg bg-slate-800 px-3 py-1 text-xs font-black text-white transition-colors group-hover:bg-slate-700'>
          {count}
        </span>
        <span className='text-slate-700 transition-colors group-hover:text-slate-400'>
          <FaArrowRight size={14} />
        </span>
      </div>
    </a>
  );
};
