'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useAuth } from '../../context/AuthContext'
import { FaGoogle, FaFacebook } from 'react-icons/fa'


export default function SignInPage() {
  useEffect(() => {
      document.title = "Đăng nhập";
    }, []);

  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 
    setIsLoading(true)
    setError('')

    try {
      // Gọi hàm login với provider là 'credentials'
      await login('credentials', { email, password });
    } catch (err: any) {
      setIsLoading(false);
      setError("Email hoặc mật khẩu không đúng");
    }
  }
  
  // Đăng nhập bằng FB hoặc GG
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Gọi hàm login với tên provider ('google' hoặc 'facebook')
    login(provider); 
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-5 bg-[#f4f5f7]'>
      <form className='p-10 rounded-lg shadow-lg flex flex-col bg-white w-full max-w-[400px] box-border' onSubmit={handleSubmit}>
        <h1 className='text-xl font-bold mb-4 text-center'>Đăng nhập</h1>

        <label className='mb-2 text-base text-[#333]' htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          className='p-2.5 border border-gray-300 rounded-lg w-full mb-4 text-black box-border focus:outline-none focus:border-gray-600'
          placeholder='Nhập email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='mb-2 text-base text-[#333]' htmlFor='password'>Mật khẩu</label>
        <input
          id='password'
          type='password'
          className='p-2.5 border border-gray-300 rounded-lg w-full mb-4 text-black box-border focus:outline-none focus:border-gray-600'
          placeholder='Nhập mật khẩu'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <Link href='' className='text-[#525252] text-right mb-1 hover:underline hover:text-red-500'>Quên mật khẩu?</Link>
        <button
          type="submit"
          className='py-3 bg-blue-600 text-white rounded-lg cursor-pointer transition-colors font-semibold text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className="mt-1 text-center">
          <span>hoặc</span>
        </div>

        <div className="text-center mt-2">Tiếp tục với
          <button
            type="button" 
            className="text-lg pl-1 align-middle"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <Link href='/'><FaGoogle /></Link>
          </button>
          <button
            type="button"
            className="text-lg pl-1 align-middle"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          >
            <Link href='/'><FaFacebook /></Link>
          </button>
        </div>

        <div className='inline-flex justify-center mt-5'>
          <p className='text-base mt-5 text-[#525252] mb-1'>Chưa có tài khoản?</p>
          <Link href='/auth/signup' className='font-bold text-blue-600 text-base hover:underline hover:text-blue-700 mt-5 ml-2.5'>
            Đăng ký
          </Link>
        </div>
        <Link href='/' className='font-bold text-blue-600 text-base hover:underline hover:text-blue-700 mt-2 inline-block'>
          Trang chủ
        </Link>
      </form>
    </div>
  )
}