'use client';

import React, { useState } from 'react';
import { FaShoppingCart, FaTag, FaGift, FaCheckDouble, FaTrash } from 'react-icons/fa';

// Dữ liệu giả lập
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'order',
    title: 'Đơn hàng đang giao',
    desc: 'Đơn hàng #TIBI-88921 đã rời kho và đang đến với bạn. Vui lòng chú ý điện thoại từ shipper.',
    time: '10:45 - 24/12/2024',
    isRead: false,
  },
  {
    id: 2,
    type: 'voucher',
    title: 'Siêu Voucher 100k cho đơn từ 0đ',
    desc: 'Chúc mừng bạn nhận được Voucher đặc quyền giảm 100% (tối đa 100k). Áp dụng cho mọi ngành hàng.',
    time: '08:30 - 24/12/2024',
    isRead: false,
  },
  {
    id: 3,
    type: 'product',
    title: 'Ưu đãi hời: iPhone 16 Pro Max giảm sâu',
    desc: 'Chỉ còn từ 29.xxx.000đ. Trả góp 0% lãi suất. Số lượng có hạn!',
    time: '15:20 - 23/12/2024',
    isRead: true,
  },
  {
    id: 4,
    type: 'order',
    title: 'Xác nhận đơn hàng thành công',
    desc: 'Tibiki đã xác nhận đơn hàng #TIBI-99002. Shop đang chuẩn bị hàng cho bạn.',
    time: '09:10 - 23/12/2024',
    isRead: true,
  },
  {
    id: 5,
    type: 'offer',
    title: 'Giáng sinh an lành - Sale cực mạnh',
    desc: 'Nhập mã GIANGSINH giảm thêm 15% tổng đơn hàng. Khám phá ngay các bộ sưu tập Noel.',
    time: '18:00 - 22/12/2024',
    isRead: true,
  },
  {
    id: 6,
    type: 'voucher',
    title: 'Voucher vận chuyển đã được thêm vào ví',
    desc: '05 mã miễn phí vận chuyển Extra vừa được gửi tới bạn. Hạn dùng đến hết tháng này.',
    time: '14:20 - 22/12/2024',
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'order', label: 'Đơn hàng' },
    { id: 'promotion', label: 'Khuyến mãi' },
  ];

  // Lọc thông báo dựa trên Tab
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'order') return n.type === 'order';
    if (activeTab === 'promotion') return ['voucher', 'offer', 'product'].includes(n.type);
    return true;
  });

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className='animate-in fade-in overflow-hidden bg-white shadow-sm duration-700'>
      {/* Header trang thông báo */}
      <div className='flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/30 px-8 py-6 md:flex-row'>
        <h1 className='text-xl font-bold tracking-tight text-slate-800'>Thông báo của tôi</h1>
        <button
          onClick={markAllAsRead}
          className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00bcd4] transition-all hover:underline'>
          <FaCheckDouble /> Đánh dấu đã đọc tất cả
        </button>
      </div>

      {/* Tabs lọc */}
      <div className='flex border-b border-slate-50 px-8'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 text-sm font-bold transition-all ${
              activeTab === tab.id ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'
            }`}>
            {tab.label}
            {activeTab === tab.id && (
              <div className='absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-sky-600'></div>
            )}
          </button>
        ))}
      </div>

      {/* Danh sách thông báo */}
      <div className='divide-y divide-slate-100'>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`group relative flex items-start gap-6 p-8 transition-all hover:bg-sky-50/50 ${
                !notif.isRead ? 'bg-[#00bcd4]/5' : ''
              }`}>
              {/* Icon đại diện loại thông báo */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                  notif.type === 'order'
                    ? 'bg-orange-100 text-orange-600'
                    : notif.type === 'voucher'
                      ? 'bg-emerald-100 text-emerald-600'
                      : notif.type === 'product'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-rose-100 text-rose-600'
                }`}>
                {notif.type === 'order' && <FaShoppingCart />}
                {notif.type === 'voucher' && <FaGift />}
                {['product', 'offer'].includes(notif.type) && <FaTag />}
              </div>

              {/* Nội dung thông báo */}
              <div className='flex-1 space-y-1'>
                <div className='flex items-start justify-between gap-4'>
                  <h3
                    className={`text-base leading-snug ${!notif.isRead ? 'font-bold text-slate-900' : 'font-bold text-slate-700'}`}>
                    {notif.title}
                  </h3>
                  <span className='whitespace-nowrap pt-1 text-[10px] font-medium uppercase tracking-widest text-slate-400'>
                    {notif.time}
                  </span>
                </div>
                <p
                  className={`max-w-2xl text-sm leading-relaxed ${!notif.isRead ? 'font-medium text-slate-600' : 'text-slate-500'}`}>
                  {notif.desc}
                </p>

                {/* Nút hành động cho từng mục */}
                <div className='flex gap-4 pt-3'>
                  <button className='text-[11px] font-bold uppercase tracking-wider text-[#00bcd4] transition-all hover:underline'>
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className='flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300 opacity-0 transition-all hover:text-rose-500 group-hover:opacity-100'>
                    <FaTrash /> Xóa
                  </button>
                </div>
              </div>

              {/* Dấu chấm báo chưa đọc */}
              {!notif.isRead && (
                <div className='absolute right-8 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#00bcd4] shadow-[0_0_10px_rgba(0,188,212,0.5)]'></div>
              )}
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center space-y-4 p-20 text-center'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-200'>
              <FaShoppingCart />
            </div>
            <div>
              <p className='text-sm font-black uppercase tracking-widest text-slate-800'>Hộp thư trống</p>
              <p className='mt-1 text-xs text-slate-400'>Bạn hiện không có thông báo nào trong danh mục này.</p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className='rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-slate-800 active:scale-95'>
              Quay lại tất cả
            </button>
          </div>
        )}
      </div>

      {/* Footer trang */}
      <div className='border-t border-slate-50 bg-slate-50/50 p-6 text-center'>
        <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700'>
          Cảm ơn bạn đã đồng hành cùng Tibiki
        </p>
      </div>
    </div>
  );
}
