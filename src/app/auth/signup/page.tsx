'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 

export default function SignUpPage() {
  useEffect(() => {
        document.title = "Đăng ký";
  }, []);

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('') 

  // Hàm "Giả lập" đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!')
      setIsLoading(false)
      return 
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); 

    console.log("Giả lập đăng ký thành công:", { email, password });
    setIsLoading(false)
    setSuccess('Đăng ký thành công! Sẽ chuyển đến trang đăng nhập sau 2 giây...')

    setTimeout(() => {
      router.push('/signin');
    }, 2000);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-5 bg-[#f4f5f7]'>
      <form className='p-10 rounded-lg shadow-lg flex flex-col bg-white w-full max-w-[400px] box-border' onSubmit={handleSubmit}>
        <h1 className='text-xl font-bold mb-4 text-center'>Đăng ký tài khoản</h1>

        <label className='mb-2 text-base text-[#333]' htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          className='p-2.5 border border-gray-300 rounded-lg w-full mb-4 text-black box-border focus:outline-none focus:border-gray-600'
          placeholder='Nhập email của bạn'
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

        <label className='mb-2 text-base text-[#333]' htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
        <input
          id='confirmPassword'
          type='password'
          className='p-2.5 border border-gray-300 rounded-lg w-full mb-4 text-black box-border focus:outline-none focus:border-gray-600'
          placeholder='Nhập lại mật khẩu'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

        <button
          type="submit"
          className='py-3 bg-blue-600 text-white rounded-lg cursor-pointer transition-colors font-semibold text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <div className='flex flex-col items-center mt-4'>
        <p className='text-base mt-5 text-[#525252] mb-1'>Đã có tài khoản?</p>
        <Link href='/auth/signin' className='inline-block font-bold text-blue-600 text-base hover:underline hover:text-blue-700'>
          Đăng nhập ngay
        </Link>
        </div>
      </form>
    </div>
  )
}