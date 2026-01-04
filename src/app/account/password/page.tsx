'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ChangePasswordPage() {
  // State form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State hiển thị/ẩn mật khẩu
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // State lỗi/loading
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    // Giả lập gọi API đổi mật khẩu
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Đợi 1.5s

    setIsLoading(false);
    alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');

    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className='py-2.5'>
      <div className='mb-7 border-b border-[#f0f0f0] pb-5 text-left'>
        <h2 className='mb-1 text-[1.2rem] font-medium text-[#333]'>Đổi Mật Khẩu</h2>
        <p className='text-[0.9rem] text-[#777]'>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>

      <form className='max-w-[700px]' onSubmit={handleSubmit}>
        {/* Mật khẩu hiện tại */}
        <div className='relative mb-6 flex flex-col gap-2 md:grid md:grid-cols-[200px_1fr] md:items-center md:gap-5'>
          <label className='text-left text-[0.95rem] font-normal text-[#555] md:text-right'>Mật khẩu hiện tại</label>
          <div className='relative flex items-center'>
            <input
              type={showCurrent ? 'text' : 'password'}
              className='w-full rounded border border-[#e0e0e0] py-2.5 pl-4 pr-10 text-[0.9rem] text-[#333] outline-none transition focus:border-[#777] focus:shadow-[0_0_0_1px_#eee]'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute right-2 flex cursor-pointer items-center justify-center border-0 bg-transparent p-1.5 text-[1.1rem] text-[#999] hover:text-[#555]'
              onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className='relative mb-6 flex flex-col gap-2 md:grid md:grid-cols-[200px_1fr] md:items-center md:gap-5'>
          <label className='text-left text-[0.95rem] font-normal text-[#555] md:text-right'>Mật khẩu mới</label>
          <div className='relative flex items-center'>
            <input
              type={showNew ? 'text' : 'password'}
              className='w-full rounded border border-[#e0e0e0] py-2.5 pl-4 pr-10 text-[0.9rem] text-[#333] outline-none transition focus:border-[#777] focus:shadow-[0_0_0_1px_#eee]'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute right-2 flex cursor-pointer items-center justify-center border-0 bg-transparent p-1.5 text-[1.1rem] text-[#999] hover:text-[#555]'
              onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className='relative mb-6 flex flex-col gap-2 md:grid md:grid-cols-[200px_1fr] md:items-center md:gap-5'>
          <label className='text-left text-[0.95rem] font-normal text-[#555] md:text-right'>Xác nhận mật khẩu</label>
          <div className='relative flex items-center'>
            <input
              type={showConfirm ? 'text' : 'password'}
              className='w-full rounded border border-[#e0e0e0] py-2.5 pl-4 pr-10 text-[0.9rem] text-[#333] outline-none transition focus:border-[#777] focus:shadow-[0_0_0_1px_#eee]'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute right-2 flex cursor-pointer items-center justify-center border-0 bg-transparent p-1.5 text-[1.1rem] text-[#999] hover:text-[#555]'
              onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Thông báo lỗi */}
        {error && <span className='mb-2.5 block text-[0.85rem] text-[#ff424f] md:ml-[220px]'>{error}</span>}

        <button
          type='submit'
          className='mt-2.5 w-full cursor-pointer rounded border-0 bg-[rgba(25,146,211,1)] px-8 py-2.5 text-[0.95rem] font-medium text-white transition-opacity hover:bg-[rgb(20,102,147)] disabled:cursor-not-allowed disabled:bg-[#ccc] md:ml-[220px] md:w-auto'
          disabled={isLoading}>
          {isLoading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
        </button>
      </form>
    </div>
  );
}
