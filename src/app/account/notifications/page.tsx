'use client';

import React, { useState } from 'react';
import { ShoppingBag, Tag, Gift, CheckCheck, Trash2, BellOff } from 'lucide-react';

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
    <div className='animate-in fade-in overflow-hidden bg-white shadow-sm duration-500'>
      {/* Header trang thông báo: Tối ưu khoảng cách trên Mobile */}
      <div className='flex flex-row  justify-between gap-3 border-b border-slate-100 bg-slate-50/30 px-4 py-5 md:px-8 md:py-6'>
        <h1 className='text-lg font-medium tracking-tight text-[#333] md:text-[1.2rem]'>Thông báo của tôi</h1>
        <button
          onClick={markAllAsRead}
          className='flex cursor-pointer items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#00bcd4] transition-all hover:underline active:scale-95 md:text-xs'>
          <CheckCheck size={14} /> Đánh dấu đã đọc tất cả
        </button>
      </div>

      {/* Tabs lọc: Dàn đều 3 cột trên Mobile */}
      <div className='flex border-b border-slate-50 px-2 md:px-8'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 cursor-pointer px-2 py-4 text-xs font-semibold uppercase transition-all md:flex-none md:px-6 md:text-sm ${
              activeTab === tab.id ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'
            }`}>
            {tab.label}
            {activeTab === tab.id && (
              <div className='absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-sky-600'></div>
            )}
          </button>
        ))}
      </div>

      {/* Danh sách thông báo: Tối ưu padding và gap */}
      <div className='min-h-[400px] divide-y divide-slate-100'>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`group relative flex items-start gap-3 p-4 transition-all hover:bg-sky-50/50 md:gap-6 md:p-8 ${
                !notif.isRead ? 'bg-[#00bcd4]/5' : ''
              }`}>
              {/* Icon: Nhỏ hơn trên Mobile */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm md:h-12 md:w-12 ${
                  notif.type === 'order'
                    ? 'bg-orange-100 text-orange-600'
                    : notif.type === 'voucher'
                      ? 'bg-emerald-100 text-emerald-600'
                      : notif.type === 'product'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-rose-100 text-rose-600'
                }`}>
                {notif.type === 'order' && <ShoppingBag size={18} className='md:h-5 md:w-5' />}
                {notif.type === 'voucher' && <Gift size={18} className='md:h-5 md:w-5' />}
                {['product', 'offer'].includes(notif.type) && <Tag size={18} className='md:h-5 md:w-5' />}
              </div>

              {/* Nội dung thông báo */}
              <div className='min-w-0 flex-1 space-y-1'>
                <div className='flex flex-col justify-between gap-1 md:flex-row md:items-start'>
                  <h3
                    className={`truncate text-sm leading-tight md:whitespace-normal md:text-base md:leading-snug ${!notif.isRead ? 'font-bold text-slate-900' : 'font-bold text-slate-700'}`}>
                    {notif.title}
                  </h3>
                  <span className='whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-slate-400 md:text-[10px]'>
                    {notif.time}
                  </span>
                </div>
                <p
                  className={`line-clamp-2 max-w-2xl text-[12px] leading-relaxed md:line-clamp-none md:text-sm ${!notif.isRead ? 'font-medium text-slate-600' : 'text-slate-500'}`}>
                  {notif.desc}
                </p>

                {/* Nút hành động: Hiển thị rõ ràng trên Mobile (vì không có hover) */}
                <div className='flex gap-4 pt-2 md:pt-3'>
                  <button className='text-[10px] font-bold uppercase tracking-wider text-[#00bcd4] transition-all hover:underline md:text-[11px]'>
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className='flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-all hover:text-rose-500 md:text-[11px] md:opacity-0 md:group-hover:opacity-100'>
                    <Trash2 size={12} /> Xóa
                  </button>
                </div>
              </div>

              {/* Dấu chấm báo chưa đọc: Nhỏ hơn và căn chỉnh lại */}
              {!notif.isRead && (
                <div className='absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#00bcd4] shadow-[0_0_10px_rgba(0,188,212,0.5)] md:right-8 md:h-2.5 md:w-2.5'></div>
              )}
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center space-y-4 p-10 text-center md:p-20'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-200 md:h-20 md:w-20'>
              <BellOff size={32} />
            </div>
            <div>
              <p className='text-xs font-black uppercase tracking-widest text-slate-800 md:text-sm'>Hộp thư trống</p>
              <p className='mt-1 text-[10px] text-slate-400 md:text-xs'>
                Bạn hiện không có thông báo nào trong danh mục này.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className='rounded-xl bg-slate-900 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-slate-800 active:scale-95 md:px-6 md:py-2.5 md:text-xs'>
              Quay lại tất cả
            </button>
          </div>
        )}
      </div>

      {/* Footer trang */}
      <div className='border-t border-slate-50 bg-slate-50/50 p-4 text-center md:p-6'>
        <p className='text-[9px] font-bold uppercase tracking-[0.2em] text-sky-700 md:text-[10px]'>
          Cảm ơn bạn đã đồng hành cùng Tibiki
        </p>
      </div>
    </div>
  );
}
