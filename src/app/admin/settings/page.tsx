'use client';

import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    sellerFee: 5,
    minShippingFee: 15000,
    requireEmailVerification: true,
    requireTaxCode: true,
    autoApproveShop: false,
    emailOnNewOrder: true,
    smsOrderConfirmation: true,
  });

  const handleSave = () => {
    alert('Đã lưu cấu hình thành công!');
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    if (confirm('Bạn có chắc muốn khôi phục cài đặt mặc định?')) {
      setSettings({
        sellerFee: 5,
        minShippingFee: 15000,
        requireEmailVerification: true,
        requireTaxCode: true,
        autoApproveShop: false,
        emailOnNewOrder: true,
        smsOrderConfirmation: true,
      });
    }
  };

  return (
    <div className='animate-in fade-in space-y-6 duration-500'>
      {/* Header */}
      <div>
        <h1 className='text-xl font-bold text-gray-800 md:text-2xl'>Cấu hình sàn</h1>
        <p className='mt-1 text-sm text-gray-600 md:text-base'>Quản lý các thiết lập hệ thống và chính sách</p>
      </div>

      {/* Transaction Fees */}
      <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6'>
        <h3 className='mb-4 text-base font-bold text-gray-800 md:text-lg'>Phí giao dịch</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
            <div className='flex-1 pr-2'>
              <p className='text-sm font-medium text-gray-800 md:text-base'>Phí người bán</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Phí cho mỗi giao dịch thành công</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                value={settings.sellerFee}
                onChange={(e) => setSettings({ ...settings, sellerFee: Number(e.target.value) })}
                className='w-16 rounded-lg border border-gray-300 px-2 py-1.5 text-center text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1A94FF] md:w-20 md:px-3 md:py-2 md:text-base'
              />
              <span className='text-sm text-gray-600 md:text-base'>%</span>
            </div>
          </div>

          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
            <div className='flex-1 pr-2'>
              <p className='text-sm font-medium text-gray-800 md:text-base'>Phí vận chuyển tối thiểu</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Phí ship tối thiểu cho đơn hàng</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                value={settings.minShippingFee}
                onChange={(e) => setSettings({ ...settings, minShippingFee: Number(e.target.value) })}
                className='md:w-30 w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-center text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1A94FF] md:px-3 md:py-2 md:text-base'
              />
              <span className='text-sm text-gray-600 md:text-base'>đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Requirements */}
      <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6'>
        <h3 className='mb-4 text-base font-bold text-gray-800 md:text-lg'>Yêu cầu mở shop</h3>
        <div className='space-y-4'>
          <label className='flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.requireEmailVerification}
              onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
              className='mt-1 h-4 w-4 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF] md:h-5 md:w-5'
            />
            <div>
              <p className='text-sm font-medium text-gray-800 md:text-base'>Yêu cầu xác minh email</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Người bán phải xác minh email trước khi mở shop</p>
            </div>
          </label>

          <label className='flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.requireTaxCode}
              onChange={(e) => setSettings({ ...settings, requireTaxCode: e.target.checked })}
              className='mt-1 h-4 w-4 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF] md:h-5 md:w-5'
            />
            <div>
              <p className='text-sm font-medium text-gray-800 md:text-base'>Yêu cầu mã số thuế</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Bắt buộc cung cấp mã số thuế khi đăng ký</p>
            </div>
          </label>

          <label className='flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.autoApproveShop}
              onChange={(e) => setSettings({ ...settings, autoApproveShop: e.target.checked })}
              className='mt-1 h-4 w-4 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF] md:h-5 md:w-5'
            />
            <div>
              <p className='text-sm font-medium text-gray-800 md:text-base'>Tự động duyệt shop</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Shop sẽ được duyệt tự động sau khi đăng ký</p>
            </div>
          </label>
        </div>
      </div>

      {/* System Notifications */}
      <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6'>
        <h3 className='mb-4 text-base font-bold text-gray-800 md:text-lg'>Thông báo hệ thống</h3>
        <div className='space-y-4'>
          <label className='flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.emailOnNewOrder}
              onChange={(e) => setSettings({ ...settings, emailOnNewOrder: e.target.checked })}
              className='mt-1 h-4 w-4 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF] md:h-5 md:w-5'
            />
            <div>
              <p className='text-sm font-medium text-gray-800 md:text-base'>Email khi có đơn hàng mới</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Gửi email thông báo cho người bán</p>
            </div>
          </label>

          <label className='flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.smsOrderConfirmation}
              onChange={(e) => setSettings({ ...settings, smsOrderConfirmation: e.target.checked })}
              className='mt-1 h-4 w-4 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF] md:h-5 md:w-5'
            />
            <div>
              <p className='text-sm font-medium text-gray-800 md:text-base'>SMS xác nhận đơn hàng</p>
              <p className='text-[11px] text-gray-500 md:text-sm'>Gửi SMS cho khách hàng khi đặt hàng thành công</p>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
        <button
          onClick={handleReset}
          className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95 md:text-sm'>
          <RotateCcw className='h-4 w-4' />
          Khôi phục mặc định
        </button>
        <button
          onClick={handleSave}
          className='flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1A94FF] px-6 py-3 text-xs font-medium text-white transition-all hover:bg-[#0B74E5] active:scale-95 md:text-sm'>
          <Save className='h-4 w-4' />
          Lưu cấu hình
        </button>
      </div>
    </div>
  );
}
