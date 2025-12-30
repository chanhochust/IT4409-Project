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
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] py-5'>
      <form
        className='box-border flex w-full max-w-[400px] flex-col rounded-lg bg-white p-10 shadow-lg'
        onSubmit={handleSubmit}>
        <h1 className='mb-4 text-center text-xl font-bold'>Đăng nhập</h1>

        <label className='mb-2 text-base text-[#333]' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          type='text'
          className='mb-4 box-border w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-gray-600 focus:outline-none'
          placeholder='Nhập email'
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

        {error && <p className='mb-4 text-center text-sm text-red-500'>{error}</p>}
        <Link href='' className='mb-1 text-right text-[#525252] hover:text-red-500 hover:underline'>
          Quên mật khẩu?
        </Link>
        <button
          type='submit'
          className='cursor-pointer rounded-lg bg-blue-600 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'
          disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className='mt-1 text-center'>
          <span>hoặc</span>
        </div>

        <div className='mt-2 text-center'>
          Tiếp tục với
          <button
            type='button'
            className='pl-1 align-middle text-lg'
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}>
            <Link href='/'>
              <FaGoogle />
            </Link>
          </button>
          <button
            type='button'
            className='pl-1 align-middle text-lg'
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}>
            <Link href='/'>
              <FaFacebook />
            </Link>
          </button>
        </div>

        <div className='inline-flex justify-center'>
          <p className='mb-1 mt-5 text-base text-[#525252]'>Chưa có tài khoản?</p>
          <Link
            href='/auth/signup'
            className='ml-2.5 mt-5 text-base font-bold text-blue-600 hover:text-blue-700 hover:underline'>
            Đăng ký
          </Link>
        </div>
        <Link
          href='/'
          className='block w-full text-center text-base font-bold text-blue-600 hover:text-blue-700 hover:underline'>
          Trang chủ
        </Link>
      </form>
    </div>
  );
}
