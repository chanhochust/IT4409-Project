'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSession } from 'next-auth/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function SignInPage() {
  useEffect(() => {
    document.title = 'Đăng nhập';
  }, []);

  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Gọi hàm login từ AuthContext
      await login('credentials', { email, password });

      // 2. Lấy session mới nhất để kiểm tra vai trò (Role)
      const session = await getSession();

      if (session?.user) {
        const userRole = (session.user as any).role;
        // 3. Logic điều hướng thông minh
        if (userRole === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      setError('Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  // Đăng nhập bằng FB hoặc GG
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Gọi hàm login với tên provider ('google' hoặc 'facebook')
    login(provider);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] px-4 py-5 md:px-0'>
      <form
        className='box-border flex w-full max-w-[400px] flex-col rounded-lg bg-white p-6 shadow-lg md:p-10'
        onSubmit={handleSubmit}>
        <h1 className='mb-4 text-center text-lg font-bold md:text-xl'>Đăng nhập</h1>

        <label className='mb-2 text-sm text-[#333] md:text-base' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          type='text'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2 text-sm text-black focus:border-gray-600 focus:outline-none md:p-2.5 md:text-base'
          placeholder='Nhập email'
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
          placeholder='Nhập mật khẩu'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className='mb-4 text-center text-xs text-red-500 md:text-sm'>{error}</p>}

        <Link href='' className='mb-1 text-right text-xs text-[#525252] hover:text-red-500 hover:underline md:text-sm'>
          Quên mật khẩu?
        </Link>

        <button
          type='submit'
          className='cursor-pointer rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 md:py-3 md:text-base'
          disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className='mt-3 text-center text-xs text-gray-600 md:mt-4 md:text-sm'>
          <span>hoặc</span>
        </div>

        <div className='mt-2 flex items-center justify-center text-sm md:text-base'>
          <span className='text-gray-600'>Tiếp tục với</span>
          <button
            type='button'
            className='flex cursor-pointer items-center justify-center p-2 text-xl text-red-500 transition-colors md:text-2xl'
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            aria-label='Đăng nhập bằng Google'>
            <FaGoogle />
          </button>
          <button
            type='button'
            className='flex cursor-pointer items-center justify-center text-xl text-blue-600 transition-colors md:text-2xl'
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            aria-label='Đăng nhập bằng Facebook'>
            <FaFacebook />
          </button>
        </div>

        <div className='mt-4 flex items-center justify-center text-xs md:mt-5 md:text-sm'>
          <p className='text-[#525252]'>Chưa có tài khoản?</p>
          <Link href='/auth/signup' className='ml-2 font-bold text-blue-600 hover:text-blue-700 hover:underline'>
            Đăng ký
          </Link>
        </div>

        <Link
          href='/'
          className='mt-2 block w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline md:text-sm'>
          Trang chủ
        </Link>
      </form>
    </div>
  );
}
