'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  useEffect(() => {
    document.title = 'Đăng ký';
  }, []);

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Hàm "Giả lập" đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu quá ngắn! Vui lòng nhập ít nhất 6 ký tự.');
      setIsLoading(false);
      return;
    }

    try {
      // Gọi API đăng ký đã cấu hình trước đó
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Đăng ký thành công! Đang chuyển hướng sang đăng nhập...');

        // Xóa form sau khi thành công
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      } else {
        setError(data.error || 'Có lỗi xảy ra trong quá trình đăng ký.');
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ Tibiki. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] px-4 py-5 md:px-0'>
      <form
        className='box-border flex w-full max-w-[400px] flex-col rounded-lg bg-white p-6 shadow-lg md:p-10'
        onSubmit={handleSubmit}>
        <h1 className='mb-4 text-center text-lg font-bold md:text-xl'>Đăng ký tài khoản</h1>

        <label className='mb-2 text-sm text-[#333] md:text-base' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          type='email'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2 text-sm text-black focus:border-gray-600 focus:outline-none md:p-2.5 md:text-base'
          placeholder='Nhập email của bạn'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='mb-2 text-sm text-[#333] md:text-base' htmlFor='password'>
          Mật khẩu
        </label>
        <input
          id='password'
          type='password'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2 text-sm text-black focus:border-gray-600 focus:outline-none md:p-2.5 md:text-base'
          placeholder='Nhập mật khẩu (tối thiểu 6 ký tự)'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className='mb-2 text-sm text-[#333] md:text-base' htmlFor='confirmPassword'>
          Xác nhận mật khẩu
        </label>
        <input
          id='confirmPassword'
          type='password'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2 text-sm text-black focus:border-gray-600 focus:outline-none md:p-2.5 md:text-base'
          placeholder='Nhập lại mật khẩu'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className='mb-4 text-center text-xs text-red-500 md:text-sm'>{error}</p>}
        {success && <p className='mb-4 text-center text-xs text-green-600 md:text-sm'>{success}</p>}

        <button
          type='submit'
          className='cursor-pointer rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 md:py-3 md:text-base'
          disabled={isLoading}>
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <div className='mt-4 flex flex-col items-center gap-1 md:mt-5 md:gap-2'>
          <p className='text-xs text-[#525252] md:text-sm'>Đã có tài khoản?</p>
          <Link
            href='/auth/signin'
            className='inline-block text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline md:text-base'>
            Đăng nhập ngay
          </Link>
        </div>

        <Link
          href='/'
          className='mt-3 block w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline md:text-base'>
          Trang chủ
        </Link>
      </form>
    </div>
  );
}
