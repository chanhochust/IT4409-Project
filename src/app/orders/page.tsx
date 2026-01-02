'use client';

import React, { useState } from 'react';
import { FaStore, FaTruck, FaCheck, FaTimes, FaComment, FaEye, FaShieldAlt } from 'react-icons/fa';

// Dữ liệu giả lập
const MOCK_ORDERS = [
  {
    id: 'TIBI-88921',
    shopName: 'MiniShop Official Store',
    status: 'delivered',
    statusText: 'Đã giao',
    purchaseDate: '2025-12-10',
    totalPrice: 245000,
    items: [
      {
        name: 'Áo Thun Cotton Basic - Màu Trắng - Size L',
        oldPrice: 250000,
        price: 150000,
        quantity: 1,
        image: 'https://placehold.co/80x80?text=Ao+Thun',
      },
      {
        name: 'Tất cổ cao thể thao - Đen',
        oldPrice: 120000,
        price: 95000,
        quantity: 1,
        image: 'https://placehold.co/80x80?text=Tat',
      },
    ],
  },
  {
    id: 'TIBI-99002',
    shopName: 'Thời Trang Hè',
    status: 'shipping',
    statusText: 'Đang giao hàng',
    purchaseDate: '2025-12-24',
    totalPrice: 320000,
    items: [
      {
        name: 'Quần Short Jean Nữ - Màu Xanh Nhạt',
        oldPrice: 450000,
        price: 320000,
        quantity: 1,
        image: 'https://placehold.co/80x80?text=Shorts',
      },
    ],
  },
  {
    id: 'TIBI-12034',
    shopName: 'Gia Dụng Luxury',
    status: 'cancelled',
    statusText: 'Đã hủy',
    purchaseDate: '2025-12-15',
    totalPrice: 1250000,
    items: [
      {
        name: 'Máy pha cà phê Espresso mini 2024',
        oldPrice: 1550000,
        price: 1250000,
        quantity: 1,
        image: 'https://placehold.co/80x80?text=Coffee',
      },
    ],
  },
];
const CANCEL_REASONS = [
  'Tôi muốn thay đổi địa chỉ nhận hàng/số điện thoại.',
  'Tôi muốn thay đổi phương thức thanh toán.',
  'Tôi muốn đổi size, màu sắc hoặc phân loại sản phẩm.',
  'Tìm thấy giá rẻ hơn ở chỗ khác.',
  'Đổi ý không mua nữa.',
  'Lý do khác.',
];
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'preparing', label: 'Chờ lấy hàng' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'returned', label: 'Trả hàng' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

  // Co the tra hang trong vong 30 ngay
  const canReturn = (dateStr: string) => {
    const purchaseDate = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const filteredOrders = activeTab === 'all' ? MOCK_ORDERS : MOCK_ORDERS.filter((o) => o.status === activeTab);

  return (
    <div className='animate-in fade-in mx-auto mt-4 max-w-[1100px] space-y-4 pb-10 font-sans text-black duration-500'>
      {/* Tabs Navigation */}
      <div className='sticky top-0 z-20 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm'>
        <div className='scrollbar-hide flex overflow-x-auto whitespace-nowrap'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 cursor-pointer px-6 py-4 text-[15px] font-medium transition-all ${
                activeTab === tab.id ? 'text-[#09a0d2]' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab.label}
              {activeTab === tab.id && (
                <div className='absolute bottom-0 left-0 right-0 mx-4 h-[3px] rounded-full bg-[#09a0d2]'></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className='space-y-4'>
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className='overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:shadow-md'>
            {/* Header: Shop & Status */}
            <div className='flex items-center justify-between border-b border-gray-50 bg-white px-6 py-3'>
              <div className='flex items-center gap-3'>
                <div className='group flex cursor-pointer items-center gap-1.5'>
                  <div className='text-[#074262]'>
                    <FaStore />
                  </div>
                  <span className='text-[13px] font-black uppercase tracking-tight text-gray-800 transition-colors group-hover:text-[#00bcd4]'>
                    {order.shopName}
                  </span>
                </div>
                <div className='ml-1 flex items-center gap-2'>
                  <button className='flex cursor-pointer items-center gap-1 rounded bg-sky-500 px-3 py-1 text-[10px] font-black uppercase text-white shadow-sm transition-colors hover:bg-sky-600 active:scale-95'>
                    <FaComment /> Chat
                  </button>
                  <button className='flex cursor-pointer items-center gap-1 rounded border border-gray-200 px-3 py-1 text-[10px] font-bold uppercase text-gray-500 transition-all hover:bg-gray-50 active:scale-95'>
                    <FaEye /> Xem Shop
                  </button>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <div
                  className={
                    order.status === 'delivered'
                      ? 'text-[#029b3f]'
                      : order.status === 'cancelled'
                        ? 'text-rose-500'
                        : 'text-orange-500'
                  }>
                  {order.status === 'delivered' ? (
                    <FaCheck />
                  ) : order.status === 'cancelled' ? (
                    <FaTimes />
                  ) : (
                    <FaTruck />
                  )}
                </div>
                <span
                  className={`text-[11px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'text-[#0c9c45]' : order.status === 'cancelled' ? 'text-rose-500' : 'text-orange-500'}`}>
                  {order.statusText}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className='divide-y divide-gray-200 px-6'>
              {order.items.map((item, idx) => (
                <div key={idx} className='flex gap-4 py-5'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='h-20 w-20 shrink-0 rounded-xl border border-gray-400 object-cover'
                  />
                  <div className='flex flex-1 flex-col justify-between overflow-hidden py-1'>
                    <div className='space-y-0.5'>
                      <h3 className='line-clamp-1 text-[15px] font-bold leading-snug text-gray-800'>{item.name}</h3>
                      <p className='mt-1 text-[13px] font-black text-gray-700'>x{item.quantity}</p>
                    </div>
                    <div className='flex items-center justify-end gap-2 text-right'>
                      <span className='text-[12px] text-gray-400 line-through'>
                        {(item.oldPrice || 0).toLocaleString()} đ
                      </span>
                      <span className='text-[16px] font-bold italic text-[#077bbe]'>
                        {item.price.toLocaleString()} đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer: Summary & Actions */}
            <div className='border-t border-gray-200 bg-[#fffcf5]/40 px-6 py-5'>
              <div className='mb-4 flex items-center justify-end gap-3'>
                <div className='flex items-center gap-1 text-[#074262] opacity-70'>
                  <FaShieldAlt />
                  <span className='text-[11px] font-bold uppercase tracking-tight'>Thành tiền:</span>
                </div>
                <span className='text-lg font-extrabold tracking-tight text-[#077bbe]'>
                  {order.totalPrice.toLocaleString()} đ
                </span>
              </div>

              {/* Actions Row - Chỉ giữ các nút chính, bỏ Liên Hệ */}
              <div className='flex flex-wrap items-center justify-end gap-3'>
                {order.status === 'pending' && (
                  <button
                    onClick={() => setCancelOrderId(order.id)}
                    className='flex-1 cursor-pointer rounded-xl border-2 border-rose-200 bg-white px-8 py-2.5 text-xs font-black uppercase text-rose-500 transition-all hover:bg-rose-50 sm:flex-none'>
                    Hủy mua hàng
                  </button>
                )}

                {order.status === 'delivered' && (
                  <div>
                    <button className='mr-4 flex-1 cursor-pointer rounded-xl border border-gray-300 bg-white px-8 py-2.5 text-[13px] font-bold text-gray-500 transition-all hover:bg-gray-50 sm:flex-none'>
                      Xem chi tiết
                    </button>
                    <button className='mr-4 flex-1 cursor-pointer rounded-xl bg-sky-500 px-10 py-3 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-sky-100 transition-all hover:bg-sky-600 active:scale-95 sm:flex-none'>
                      Mua Lại
                    </button>
                    <button className='flex-1 cursor-pointer rounded-xl border-2 border-[#00bcd4]/20 bg-white px-8 py-3 text-[13px] font-black text-[#077bbe] transition-all hover:bg-cyan-50 active:scale-95 sm:flex-none'>
                      Đánh Giá
                    </button>
                  </div>
                )}

                {(order.status === 'cancelled' || order.status === 'returned') && (
                  <button className='flex-1 cursor-pointer rounded-xl border border-gray-300 bg-white px-8 py-2.5 text-[13px] font-bold text-gray-500 shadow-sm transition-all hover:bg-gray-50 sm:flex-none'>
                    Xem Chi Tiết
                  </button>
                )}

                {order.status === 'cancelled' && (
                  <button className='flex-1 cursor-pointer rounded-xl bg-sky-500 px-10 py-3 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-sky-100 transition-all hover:bg-sky-600 sm:flex-none'>
                    Mua Lại
                  </button>
                )}

                {/* Chỉ hiện nút Theo dõi cho đơn đang giao/chuẩn bị */}
                {(order.status === 'shipping' || order.status === 'preparing') && (
                  <button className='flex-1 cursor-pointer rounded-xl bg-sky-500 px-10 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-sky-100 transition-all hover:bg-sky-600 sm:flex-none'>
                    Theo Dõi
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL HỦY ĐƠN */}
      {cancelOrderId && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
          <div
            className='animate-in fade-in absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
            onClick={() => {
              setCancelOrderId(null);
              setCancelReason('');
            }}></div>
          <div className='animate-in zoom-in-95 relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl duration-200'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b border-slate-100 px-8 py-6'>
              <h2 className='text-xl font-black text-gray-900'>Lý do hủy đơn hàng</h2>
              <button
                onClick={() => {
                  setCancelOrderId(null);
                  setCancelReason('');
                }}
                className='text-gray-400 hover:text-gray-600'>
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className='space-y-2 p-8'>
              <div className='mb-4 border-l-4 border-amber-400 bg-amber-50 p-4'>
                <p className='text-xs font-medium italic leading-relaxed text-amber-700'>
                  Lưu ý: Bạn chỉ có thể hủy đơn hàng 01 lần duy nhất cho mỗi đơn hàng. Quyết định hủy đơn sẽ không thể
                  hoàn tác.
                </p>
              </div>

              <div className='flex flex-col gap-1'>
                {CANCEL_REASONS.map((reason, index) => (
                  <label
                    key={index}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all ${
                      cancelReason === reason
                        ? 'border-[#0885a8] bg-cyan-50/50'
                        : 'border-transparent hover:bg-slate-50'
                    }`}>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                        cancelReason === reason ? 'border-[#068cb8]' : 'border-slate-300'
                      }`}>
                      {cancelReason === reason && <div className='h-2.5 w-2.5 rounded-full bg-[#0681ab]'></div>}
                    </div>
                    <input
                      type='radio'
                      name='cancel_reason'
                      className='hidden'
                      value={reason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                    <span
                      className={`text-[14px] font-semibold ${cancelReason === reason ? 'text-[#0172a2]' : 'text-gray-700'}`}>
                      {reason}
                    </span>
                  </label>
                ))}
              </div>

              {/* Ô nhập lý do khác nếu chọn Lý do khác */}
              {cancelReason === 'Lý do khác.' && (
                <div className='animate-in slide-in-from-top-2 mt-4 duration-200'>
                  <textarea
                    className='min-h-[100px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-black outline-none transition-all focus:ring-4 focus:ring-sky-200'
                    placeholder='Vui lòng chia sẻ thêm lý do của bạn...'></textarea>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className='flex gap-3 px-8 pb-8 pt-4'>
              <button
                onClick={() => {
                  setCancelOrderId(null);
                  setCancelReason('');
                }}
                className='flex-1 cursor-pointer rounded-2xl bg-slate-200 py-4 text-sm font-bold text-slate-600 transition-all active:scale-95'>
                Hủy bỏ
              </button>
              <button
                disabled={!cancelReason}
                className='flex-1 cursor-pointer rounded-2xl bg-rose-500 py-4 text-sm font-black uppercase text-white shadow-lg shadow-rose-100 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none'>
                Hủy đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
