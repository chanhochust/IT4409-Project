import React from 'react';
import { LoginForm } from './LoginForm';
import Link from 'next/link';

export const LoginPage: React.FC = () => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-gradient-to-br from-[#172A3A] via-[#004346] to-[#172A3A] px-4 py-12'>
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10'>
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
              <path d='M 40 0 L 0 0 0 40' fill='none' stroke='#09BC8A' strokeWidth='1' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#grid)' />
        </svg>
      </div>

      <div className='relative z-10 w-full max-w-[420px]'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            TiBi<span className='text-primary'>Ki</span>
          </h1>
          <p className='mt-2 text-sm text-gray-400'>Performance driven customer access</p>
        </div>

        <LoginForm />

        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-400'>
            Don't have an account?{' '}
            <Link href='/register' className='text-primary hover:text-primary/80 font-medium transition-colors'>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
