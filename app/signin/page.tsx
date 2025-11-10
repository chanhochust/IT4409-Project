'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

export default function SignInPage() {
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

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Gia lap dang nhap
    if (email === 'admin@test.com' && password === '123') {
      login(email, 'admin') 
      router.push('/') 
    } else if (email === 'customer@test.com' && password === '123') {
      login(email, 'customer') // 
      router.push('/') 
    } else {
      setError('Email/mật khẩu không đúng (Gợi ý: admin@test.com hoặc customer@test.com / 123)')
      setIsLoading(false)
    }
  }

  // Gia lap dang nhap = pthuc khac
  const handleMockOAuthLogin = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    const mockEmail = `${provider}@test.com`;
    login(mockEmail, 'customer');
    router.push('/');
  }
  return (
    <div className='signin-container'>
      <form className='signin-form' onSubmit={handleSubmit}>
        <h1 className='form-title'>Đăng nhập</h1>

        <label className='form-label' htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          className='form-input'
          placeholder='Nhập email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='form-label' htmlFor='password'>Mật khẩu</label>
        <input
          id='password'
          type='password'
          className='form-input'
          placeholder='Nhập mật khẩu'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="form-error">{error}</p>}
        <Link href='' className='forgot-pw'>Quên mật khẩu?</Link>
        <button
          type="submit"
          className='form-button'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <div className="oauth-buttons">Tiếp tục với
          <button
            type="button" 
            className="btn-oauth btn-google"
            onClick={() => handleMockOAuthLogin('google')}
            disabled={isLoading}
          >
            <Link href='/'><FaGoogle /></Link>
          </button>
          <button
            type="button"
            className="btn-oauth btn-facebook"
            onClick={() => handleMockOAuthLogin('facebook')}
            disabled={isLoading}
          >
            <Link href='/'><FaFacebook /></Link>
          </button>
        </div>

        <div className='register'><p className='form-footer-text'>Chưa có tài khoản?</p>
        <Link href='/signup' className='form-link form-link-register'>
          Đăng ký
        </Link></div>
        <Link href='/' className='form-link form-link-home'>
          Trang chủ
        </Link>
      </form>
    </div>
  )
}