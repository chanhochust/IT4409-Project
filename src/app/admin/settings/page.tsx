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
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-gray-800'>Cấu hình sàn</h1>
        <p className='mt-1 text-gray-600'>Quản lý các thiết lập hệ thống và chính sách</p>
      </div>

      {/* Transaction Fees */}
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h3 className='mb-4 text-lg font-bold text-gray-800'>Phí giao dịch</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
            <div className='flex-1'>
              <p className='font-medium text-gray-800'>Phí người bán</p>
              <p className='text-sm text-gray-600'>Phí cho mỗi giao dịch thành công</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                value={settings.sellerFee}
                onChange={(e) => setSettings({ ...settings, sellerFee: Number(e.target.value) })}
                className='w-24 rounded-lg border border-gray-300 px-3 py-2 text-right outline-none focus:border-transparent focus:ring-2 focus:ring-[#1A94FF]'
              />
              <span className='text-gray-600'>%</span>
            </div>
          </div>

          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
            <div className='flex-1'>
              <p className='font-medium text-gray-800'>Phí vận chuyển tối thiểu</p>
              <p className='text-sm text-gray-600'>Phí ship tối thiểu cho đơn hàng</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                value={settings.minShippingFee}
                onChange={(e) => setSettings({ ...settings, minShippingFee: Number(e.target.value) })}
                className='w-32 rounded-lg border border-gray-300 px-3 py-2 text-right outline-none focus:border-transparent focus:ring-2 focus:ring-[#1A94FF]'
              />
              <span className='text-gray-600'>đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Requirements */}
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h3 className='mb-4 text-lg font-bold text-gray-800'>Yêu cầu mở shop</h3>
        <div className='space-y-4'>
          <label className='flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.requireEmailVerification}
              onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
              className='h-5 w-5 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF]'
            />
            <div>
              <p className='font-medium text-gray-800'>Yêu cầu xác minh email</p>
              <p className='text-sm text-gray-600'>Người bán phải xác minh email trước khi mở shop</p>
            </div>
          </label>

          <label className='flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.requireTaxCode}
              onChange={(e) => setSettings({ ...settings, requireTaxCode: e.target.checked })}
              className='h-5 w-5 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF]'
            />
            <div>
              <p className='font-medium text-gray-800'>Yêu cầu mã số thuế</p>
              <p className='text-sm text-gray-600'>Bắt buộc cung cấp mã số thuế khi đăng ký</p>
            </div>
          </label>

          <label className='flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.autoApproveShop}
              onChange={(e) => setSettings({ ...settings, autoApproveShop: e.target.checked })}
              className='h-5 w-5 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF]'
            />
            <div>
              <p className='font-medium text-gray-800'>Tự động duyệt shop</p>
              <p className='text-sm text-gray-600'>Shop sẽ được duyệt tự động sau khi đăng ký</p>
            </div>
          </label>
        </div>
      </div>

      {/* System Notifications */}
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h3 className='mb-4 text-lg font-bold text-gray-800'>Thông báo hệ thống</h3>
        <div className='space-y-4'>
          <label className='flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.emailOnNewOrder}
              onChange={(e) => setSettings({ ...settings, emailOnNewOrder: e.target.checked })}
              className='h-5 w-5 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF]'
            />
            <div>
              <p className='font-medium text-gray-800'>Email khi có đơn hàng mới</p>
              <p className='text-sm text-gray-600'>Gửi email thông báo cho người bán</p>
            </div>
          </label>

          <label className='flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100'>
            <input
              type='checkbox'
              checked={settings.smsOrderConfirmation}
              onChange={(e) => setSettings({ ...settings, smsOrderConfirmation: e.target.checked })}
              className='h-5 w-5 rounded text-[#1A94FF] focus:ring-2 focus:ring-[#1A94FF]'
            />
            <div>
              <p className='font-medium text-gray-800'>SMS xác nhận đơn hàng</p>
              <p className='text-sm text-gray-600'>Gửi SMS cho khách hàng khi đặt hàng thành công</p>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end gap-3'>
        <button
          onClick={handleReset}
          className='flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50'>
          <RotateCcw className='h-4 w-4' />
          Khôi phục mặc định
        </button>
        <button
          onClick={handleSave}
          className='flex items-center gap-2 rounded-lg bg-[#1A94FF] px-6 py-3 font-medium text-white hover:bg-[#0B74E5]'>
          <Save className='h-4 w-4' />
          Lưu cấu hình
        </button>
      </div>
    </div>
  );
}
