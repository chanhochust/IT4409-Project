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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Giả lập đăng ký thành công:', { email, password });
    setIsLoading(false);
    setSuccess('Đăng ký thành công! Sẽ chuyển đến trang đăng nhập sau 2 giây...');

    setTimeout(() => {
      router.push('/signin');
    }, 2000);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] py-5'>
      <form
        className='box-border flex w-full max-w-[400px] flex-col rounded-lg bg-white p-10 shadow-lg'
        onSubmit={handleSubmit}>
        <h1 className='mb-4 text-center text-xl font-bold'>Đăng ký tài khoản</h1>

        <label className='mb-2 text-base text-[#333]' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          type='email'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-gray-600 focus:outline-none'
          placeholder='Nhập email của bạn'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='mb-2 text-base text-[#333]' htmlFor='password'>
          Mật khẩu
        </label>
        <input
          id='password'
          type='password'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-gray-600 focus:outline-none'
          placeholder='Nhập mật khẩu'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className='mb-2 text-base text-[#333]' htmlFor='confirmPassword'>
          Xác nhận mật khẩu
        </label>
        <input
          id='confirmPassword'
          type='password'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-gray-600 focus:outline-none'
          placeholder='Nhập lại mật khẩu'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className='mb-4 text-center text-sm text-red-500'>{error}</p>}
        {success && <p className='mb-4 text-center text-sm text-green-600'>{success}</p>}

        <button
          type='submit'
          className='cursor-pointer rounded-lg bg-blue-600 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'
          disabled={isLoading}>
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <div className='mt-4 flex flex-col items-center'>
          <p className='mb-1 mt-5 text-base text-[#525252]'>Đã có tài khoản?</p>
          <Link
            href='/auth/signin'
            className='inline-block text-base font-bold text-blue-600 hover:text-blue-700 hover:underline'>
            Đăng nhập ngay
          </Link>
        </div>
      </form>
      <div className='mt-8 flex w-full max-w-[600px] flex-col items-center'>
        <div className='mb-6 flex w-full items-center'>
          <div className='h-[1px] flex-1 bg-gray-300'></div>
          <span className='px-3 text-xs font-medium uppercase text-gray-500'>Bạn là doanh nghiệp?</span>
          <div className='h-[1px] flex-1 bg-gray-300'></div>
        </div>

        <div className='w-full rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm'>
          <h3 className='mb-2 text-base font-bold text-[#111]'>Bắt đầu bán hàng cùng Tibiki</h3>
          <p className='mb-6 whitespace-nowrap text-sm leading-relaxed text-[#555]'>
            Tiếp cận hàng triệu khách hàng và phát triển doanh nghiệp của bạn một cách bền vững.
          </p>
          <a
            href='/auth/business-signup'
            className='inline-block rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#111] shadow-sm transition-colors hover:bg-gray-50'>
            Tạo tài khoản người bán chuyên nghiệp
          </a>
        </div>

        <a href='/' className='mt-6 text-sm font-medium text-blue-700 hover:text-orange-700 hover:underline'>
          Quay lại Trang chủ
        </a>
      </div>
    </div>
  );
}
