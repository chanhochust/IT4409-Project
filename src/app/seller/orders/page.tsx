'use client';

import React, { useState } from 'react';
import {
  FaSearch,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarker,
  FaUser,
  FaStickyNote,
} from 'react-icons/fa';

const mockOrders: Order[] = [
  {
    id: 'ORD-8821',
    receiverName: 'Nguyễn Văn A',
    receiverPhone: '0901234567',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    addressDetail: '123 Lê Lợi',
    date: '20/12/2024',
    total: 450000,
    status: 'pending',
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
    note: 'Giao hàng giờ hành chính giúp mình.',
    items: [{ name: 'Áo Thun Polo Nam', quantity: 2, price: 225000 }],
  },
  {
    id: 'ORD-8822',
    receiverName: 'Lê Thị B',
    receiverPhone: '0987654321',
    province: 'Đà Nẵng',
    district: 'Quận Hải Châu',
    ward: 'Phường Thạch Thang',
    addressDetail: '456 Bạch Đằng',
    date: '21/12/2024',
    total: 1200000,
    status: 'processing',
    paymentMethod: 'Chuyển khoản ngân hàng',
    items: [{ name: 'Giày Sneaker Thời Trang', quantity: 1, price: 1200000 }],
  },
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const ordersPerPage = 5;

  const filteredByStatus = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);
  const finalFilteredOrders = filteredByStatus.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.receiverName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(finalFilteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const displayedOrders = finalFilteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const formatPrice = (price: number) => price?.toLocaleString('vi-VN') + ' VNĐ';

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-700' };
      case 'processing':
        return { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700' };
      case 'shipped':
        return { label: 'Đang giao', color: 'bg-indigo-100 text-indigo-700' };
      case 'delivered':
        return { label: 'Đã giao', color: 'bg-emerald-100 text-emerald-800' };
      case 'cancelled':
        return { label: 'Đã hủy', color: 'bg-red-100 text-red-700' };
      default:
        return { label: 'Không xác định', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const handleUpdateStatus = (id: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const updated = { ...o, status: newStatus };
          if (selectedOrder && selectedOrder.id === id) setSelectedOrder(updated);
          return updated;
        }
        return o;
      }),
    );
  };

  return (
    <div className='animate-in fade-in space-y-6 p-0 font-sans text-black duration-500'>
      <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='mb-2 border-b border-gray-200 pb-2 text-2xl font-bold uppercase tracking-tight text-gray-800'>
            Quản lý Đơn hàng
          </h1>
          <p className='text-sm font-medium text-gray-500'>Theo dõi thông tin vận chuyển và thanh toán chi tiết.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex flex-wrap gap-2 border-b border-gray-200'>
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-bold transition-all ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}>
            {tab === 'all' ? 'Tất cả đơn' : getStatusInfo(tab as any).label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row'>
        <div className='relative flex-1'>
          <input
            type='text'
            placeholder='Tìm theo Mã đơn hoặc Tên khách...'
            className='w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-400'>
            <FaSearch />
          </div>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-[0.7rem] font-bold uppercase tracking-widest text-gray-500'>
                  Mã Đơn
                </th>
                <th className='px-6 py-4 text-left text-[0.7rem] font-bold uppercase tracking-widest text-gray-500'>
                  Người Nhận
                </th>
                <th className='px-6 py-4 text-left text-[0.7rem] font-bold uppercase tracking-widest text-gray-500'>
                  Ngày Đặt
                </th>
                {/* Đã sửa: Xóa text-left để text-center hoạt động chuẩn xác */}
                <th className='px-6 py-4 text-center text-[0.7rem] font-bold uppercase tracking-widest text-gray-500'>
                  Trạng Thái
                </th>
                <th className='px-6 py-4 text-right text-[0.7rem] font-bold uppercase tracking-widest text-gray-500'>
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {displayedOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className='py-12 text-center font-medium text-gray-400'>
                    Không tìm thấy đơn hàng nào.
                  </td>
                </tr>
              ) : (
                displayedOrders.map((order) => (
                  <tr key={order.id} className='transition-colors hover:bg-gray-50/50'>
                    <td className='px-6 py-4 text-sm font-bold text-blue-600'>{order.id}</td>
                    <td className='px-6 py-4 text-sm font-semibold text-gray-700'>{order.receiverName}</td>
                    <td className='px-6 py-4 text-sm font-medium text-gray-500'>{order.date}</td>
                    <td className='px-6 py-4 text-center'>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-tight ${getStatusInfo(order.status).color}`}>
                        {getStatusInfo(order.status).label}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className='cursor-pointer rounded-lg p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600'>
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
          <span className='font-sans text-xs font-bold uppercase tracking-widest text-gray-400'>
            Trang {currentPage} / {totalPages}
          </span>
          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30'>
              <FaChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30'>
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* Modal Chi tiết đơn hàng */}
      {selectedOrder && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 font-sans backdrop-blur-sm'>
          <div className='animate-in zoom-in-95 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl duration-200'>
            <div className='flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4'>
              <div>
                <h2 className='text-xl font-bold leading-tight text-gray-900'>Thông tin đơn hàng {selectedOrder.id}</h2>
                <p className='mt-1 text-xs text-gray-500'>Đặt ngày: {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className='cursor-pointer p-2 text-gray-400 transition-colors hover:text-gray-900'>
                <FaTimes />
              </button>
            </div>

            <div className='space-y-6 overflow-y-auto p-6'>
              {/* CẬP NHẬT TRẠNG THÁI */}
              <div className='rounded-2xl border border-blue-100 bg-blue-50/50 p-5'>
                <h3 className='mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600'>
                  <FaCheckCircle className='text-green-500' /> Trạng thái xử lý
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleUpdateStatus(selectedOrder.id, val as any)}
                      className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                        selectedOrder.status === val
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                      }`}>
                      {getStatusInfo(val as any).label}
                    </button>
                  ))}
                </div>
              </div>

              {/* THÔNG TIN NGƯỜI NHẬN & ĐỊA CHỈ */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
                  <h3 className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400'>
                    <FaUser /> Thông tin người nhận
                  </h3>
                  <div>
                    <p className='text-sm font-bold text-gray-800'>{selectedOrder.receiverName}</p>
                    <p className='mt-1 text-sm font-medium text-gray-600'>{selectedOrder.receiverPhone}</p>
                  </div>
                  <div className='border-t border-gray-50 pt-2'>
                    <p className='mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-400'>
                      Thanh toán bằng
                    </p>
                    <p className='text-xs font-semibold text-indigo-600'>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                <div className='space-y-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
                  <h3 className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400'>
                    <FaMapMarker /> Địa chỉ giao hàng
                  </h3>
                  <div className='text-sm font-medium leading-relaxed text-gray-700'>
                    <p>{selectedOrder.addressDetail}</p>
                    <p>
                      {selectedOrder.ward}, {selectedOrder.district}
                    </p>
                    <p>{selectedOrder.province}</p>
                  </div>
                </div>
              </div>

              {/* GHI CHÚ ĐƠN HÀNG */}
              {selectedOrder.note && (
                <div className='rounded-xl border border-amber-100 bg-amber-50/50 p-4'>
                  <h3 className='mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-600'>
                    <FaStickyNote /> Ghi chú từ khách hàng
                  </h3>
                  <p className='text-sm font-medium italic leading-relaxed text-gray-700'>"{selectedOrder.note}"</p>
                </div>
              )}

              {/* DANH SÁCH SẢN PHẨM */}
              <div className='space-y-3'>
                <h3 className='text-[11px] font-bold uppercase tracking-widest text-gray-400'>Sản phẩm trong đơn</h3>
                <div className='overflow-hidden rounded-xl border border-gray-100 shadow-sm'>
                  <table className='w-full text-left text-sm'>
                    <thead className='bg-gray-50 text-[10px] font-bold uppercase text-gray-500'>
                      <tr>
                        <th className='px-4 py-2.5'>Sản phẩm</th>
                        <th className='px-4 py-2.5 text-center'>SL</th>
                        <th className='px-4 py-2.5 text-right font-medium'>Đơn giá</th>
                        <th className='px-4 py-2.5 text-right'>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className='px-4 py-3 text-xs font-bold text-gray-800'>{item.name}</td>
                          <td className='px-4 py-3 text-center font-bold text-gray-600'>{item.quantity}</td>
                          <td className='px-4 py-3 text-right font-medium text-gray-500'>{formatPrice(item.price)}</td>
                          <td className='px-4 py-3 text-right font-black text-gray-900'>
                            {formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TỔNG KẾT CHI TIẾT */}
              <div className='flex flex-col items-end gap-2 border-t border-gray-100 pt-4'>
                <div className='flex w-full justify-between text-sm md:w-72'>
                  <span className='font-medium text-gray-500'>Tạm tính (Tiền hàng):</span>
                  <span className='font-bold text-gray-800'>{formatPrice(selectedOrder.total)}</span>
                </div>
                <div className='flex w-full justify-between text-sm md:w-72'>
                  <span className='font-medium text-gray-500'>Phí vận chuyển:</span>
                  <span className='font-bold text-emerald-600'>Miễn phí</span>
                </div>
                <div className='mt-2 flex w-full justify-between border-t border-dashed border-gray-200 pt-2 text-lg font-black text-gray-900 md:w-72'>
                  <span>Tổng thanh toán:</span>
                  <span className='text-red-600'>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-4'>
              <button
                onClick={() => setSelectedOrder(null)}
                className='cursor-pointer rounded-lg px-6 py-2 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-200'>
                Đóng
              </button>
              <button className='cursor-pointer rounded-lg bg-gray-800 px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:bg-black active:scale-95'>
                In hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
