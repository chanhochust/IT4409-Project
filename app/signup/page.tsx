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
    <div className='signin-container'>
      <form className='signin-form' onSubmit={handleSubmit}>
        <h1 className='form-title'>Đăng ký tài khoản</h1>

        <label className='form-label' htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          className='form-input'
          placeholder='Nhập email của bạn'
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

        <label className='form-label' htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
        <input
          id='confirmPassword'
          type='password'
          className='form-input'
          placeholder='Nhập lại mật khẩu'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <button
          type="submit"
          className='form-button'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <p className='form-footer-text'>Đã có tài khoản?</p>
        <Link href='/signin' className='form-link'>
          Đăng nhập ngay
        </Link>
      </form>
    </div>
  )
}