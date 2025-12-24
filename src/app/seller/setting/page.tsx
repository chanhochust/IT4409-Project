'use client';

import React, { useState } from 'react';
import { FaStore, FaMapMarkerAlt, FaUniversity, FaSave, FaCamera } from 'react-icons/fa';

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Đã cập nhật cấu hình shop thành công!');
    }, 1000);
  };

  return (
    <div className='animate-in fade-in space-y-6 p-0 font-sans text-black duration-500'>
      {/* Header */}
      <div>
        <h1 className='mb-6 border-b border-gray-200 pb-4 text-2xl font-bold text-gray-800'>Cấu hình Shop</h1>
      </div>

      {/* Tab Navigation */}
      <div className='flex w-fit gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1'>
        <TabBtn id='profile' label='Hồ sơ Shop' active={activeTab} set={setActiveTab} icon={<FaStore />} />
        <TabBtn id='address' label='Địa chỉ lấy hàng' active={activeTab} set={setActiveTab} icon={<FaMapMarkerAlt />} />
        <TabBtn id='bank' label='Thanh toán' active={activeTab} set={setActiveTab} icon={<FaUniversity />} />
      </div>

      {/* Main Form Content */}
      <div className='overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm'>
        <form onSubmit={handleSave} className='space-y-10 p-8'>
          {/* SECTION: HỒ SƠ SHOP */}
          {activeTab === 'profile' && (
            <div className='animate-in slide-in-from-bottom-2 space-y-8 duration-300'>
              <div className='flex flex-col items-start gap-10 border-b border-slate-50 pb-8 md:flex-row'>
                <div className='group relative'>
                  <div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-300 bg-slate-100 text-slate-500 transition-colors group-hover:border-blue-500'>
                    <span className='text-xs font-bold uppercase tracking-widest'>Logo Shop</span>
                  </div>
                  <button
                    type='button'
                    className='absolute -bottom-2 -right-2 cursor-pointer rounded-xl bg-blue-600 p-2.5 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-90'>
                    <FaCamera size={14} />
                  </button>
                </div>
                <div className='w-full flex-1 space-y-6'>
                  <div>
                    <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                      Tên hiển thị của Shop
                    </label>
                    <input
                      type='text'
                      defaultValue='MiniShop'
                      className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                      Mô tả ngắn
                    </label>
                    <textarea
                      rows={3}
                      defaultValue='Chuyên cung cấp các sản phẩm thời trang nam nữ cao cấp, cam kết chất lượng 100%.'
                      className='w-full resize-none rounded-xl border-none bg-slate-50 p-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Email chăm sóc khách hàng
                  </label>
                  <input
                    type='email'
                    defaultValue='support@minishop.vn'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Số điện thoại hỗ trợ
                  </label>
                  <input
                    type='tel'
                    defaultValue='0988 123 456'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ĐỊA CHỈ LẤY HÀNG */}
          {activeTab === 'address' && (
            <div className='animate-in slide-in-from-bottom-2 space-y-8 duration-300'>
              <div className='flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4'>
                <div className='mt-0.5 text-blue-600'>
                  <FaMapMarkerAlt />
                </div>
                <p className='text-xs font-medium leading-relaxed text-blue-800'>
                  Địa chỉ này sẽ được cung cấp cho đơn vị vận chuyển khi bạn có đơn hàng mới. Vui lòng đảm bảo thông tin
                  chính xác để bưu tá liên hệ.
                </p>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='md:col-span-2'>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Họ tên người liên hệ tại kho
                  </label>
                  <input
                    type='text'
                    defaultValue='Nguyễn Văn Admin'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Tỉnh / Thành phố
                  </label>
                  <select className='w-full cursor-pointer rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'>
                    <option>TP. Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                  </select>
                </div>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Quận / Huyện
                  </label>
                  <input
                    type='text'
                    defaultValue='Quận 1'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Địa chỉ chi tiết (Số nhà, tên đường)
                  </label>
                  <input
                    type='text'
                    defaultValue='123 Lê Lợi, Phường Bến Nghé'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: THANH TOÁN */}
          {activeTab === 'bank' && (
            <div className='animate-in slide-in-from-bottom-2 space-y-8 duration-300'>
              <div className='rounded-2xl border border-emerald-100 bg-emerald-50 p-6'>
                <h3 className='mb-2 text-sm font-bold text-emerald-800'>Số dư hiện tại: 4,500,000 đ</h3>
                <p className='text-[11px] font-medium italic text-emerald-600'>
                  Tiền doanh thu sẽ được đối soát và chuyển vào tài khoản dưới đây định kỳ hàng tuần.
                </p>
              </div>
              <div className='space-y-6'>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Tên ngân hàng
                  </label>
                  <input
                    type='text'
                    defaultValue='Vietcombank (VCB)'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Số tài khoản
                  </label>
                  <input
                    type='text'
                    defaultValue='0071000123456'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500'>
                    Tên chủ tài khoản (Viết không dấu)
                  </label>
                  <input
                    type='text'
                    defaultValue='NGUYEN VAN ADMIN'
                    className='w-full rounded-xl border-none bg-slate-50 p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className='flex justify-end border-t border-slate-100 pt-8'>
            <button
              type='submit'
              disabled={isSaving}
              className='flex cursor-pointer items-center gap-2 rounded-2xl bg-blue-600 px-10 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-95 disabled:bg-slate-300'>
              {isSaving ? (
                'Đang lưu...'
              ) : (
                <>
                  <FaSave /> Lưu cấu hình
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Component Nút Tab
const TabBtn = ({ id, label, active, set, icon }: any) => {
  const isActive = active === id;
  return (
    <button
      type='button'
      onClick={() => set(id)}
      className={`flex cursor-pointer items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black transition-all ${
        isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-600'
      }`}>
      <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>{icon}</span>
      <span className='uppercase tracking-widest'>{label}</span>
    </button>
  );
};
