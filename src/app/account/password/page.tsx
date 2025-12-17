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
    await new Promise(resolve => setTimeout(resolve, 1500)); // Đợi 1.5s

    // Gia lap xu ly kqua
    setIsLoading(false);
    alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="py-2.5">
      <div className="mb-7 pb-5 border-b border-[#f0f0f0]">
        <h2 className="text-[1.2rem] font-medium text-[#333] mb-1">Đổi Mật Khẩu</h2>
        <p className="text-[0.9rem] text-[#777]">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      </div>

      <form className="max-w-[700px]" onSubmit={handleSubmit}>
        
        {/* Mật khẩu hiện tại */}
        <div className="grid grid-cols-[200px_1fr] gap-5 items-center mb-6 relative">
          <label className="text-right text-[#555] text-[0.95rem] font-normal">Mật khẩu hiện tại</label>
          <div className="relative flex items-center">
            <input 
              type={showCurrent ? "text" : "password"} 
              className="w-full py-2.5 pr-10 pl-4 border border-[#e0e0e0] rounded text-[0.9rem] text-[#333] outline-none transition focus:border-[#777] focus:shadow-[0_0_0_1px_#eee]"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button type="button" className="absolute right-2 bg-transparent border-0 text-[#999] cursor-pointer text-[1.1rem] flex items-center justify-center p-1.5 hover:text-[#555]" onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="grid grid-cols-[200px_1fr] gap-5 items-center mb-6 relative">
          <label className="text-right text-[#555] text-[0.95rem] font-normal">Mật khẩu mới</label>
          <div className="relative flex items-center">
            <input 
              type={showNew ? "text" : "password"} 
              className="w-full py-2.5 pr-10 pl-4 border border-[#e0e0e0] rounded text-[0.9rem] text-[#333] outline-none transition focus:border-[#777] focus:shadow-[0_0_0_1px_#eee]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="button" className="absolute right-2 bg-transparent border-0 text-[#999] cursor-pointer text-[1.1rem] flex items-center justify-center p-1.5 hover:text-[#555]" onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="grid grid-cols-[200px_1fr] gap-5 items-center mb-6 relative">
          <label className="text-right text-[#555] text-[0.95rem] font-normal">Xác nhận mật khẩu</label>
          <div className="relative flex items-center">
            <input 
              type={showConfirm ? "text" : "password"} 
              className="w-full py-2.5 pr-10 pl-4 border border-[#e0e0e0] rounded text-[0.9rem] text-[#333] outline-none transition focus:border-[#777] focus:shadow-[0_0_0_1px_#eee]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" className="absolute right-2 bg-transparent border-0 text-[#999] cursor-pointer text-[1.1rem] flex items-center justify-center p-1.5 hover:text-[#555]" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Thông báo lỗi */}
        {error && <span className="text-[#ff424f] text-[0.85rem] ml-[220px] mb-2.5 block">{error}</span>}

        <button type="submit" className="bg-[rgba(25,146,211,1)] text-white border-0 py-2.5 px-8 rounded cursor-pointer text-[0.95rem] font-medium transition-opacity ml-[220px] mt-2.5 hover:bg-[rgb(20,102,147)] disabled:bg-[#ccc] disabled:cursor-not-allowed" disabled={isLoading}>
          {isLoading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
        </button>

        <div className="ml-[220px] mt-[15px] text-[0.85rem]">
          <Link href="#" className="text-[#0b74e5] no-underline hover:underline hover:text-red-500">Quên mật khẩu?</Link>
        </div>

      </form>
    </div>
  );
}