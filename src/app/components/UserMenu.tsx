'use client';

import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth, MockUser } from '../context/AuthContext';

export function UserMenu({ user }: { user: MockUser }) {
  const { logout } = useAuth();

  return (
    <div className='group relative inline-block'>
      <div
        className='flex cursor-pointer items-center justify-center text-[24px] text-[#555] hover:text-sky-500'
        aria-label='Tài khoản'>
        <div className='border-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-transparent bg-gray-200 shadow-sm group-hover:border-[#08c2f5]'>
          {user?.avatar ? (
            <img src={user.avatar} alt='User Avatar' className='h-full w-full object-cover' />
          ) : (
            <FaUser className='h-5 w-5 text-[#555]' />
          )}
        </div>
      </div>

      <div className='z-100 absolute right-0 top-full hidden w-[250px] rounded-lg border border-[#eee] bg-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.1)] group-hover:block'>
        <p className='mt-0 border-b border-[#f0f0f0] pb-2 font-semibold'>Chào, {user.email}!</p>
        <ul className='mt-2 list-none p-0'>
          <li>
            <Link
              className='block w-full rounded p-2 text-left text-[#333] no-underline hover:bg-[#f5f5f5]'
              href='/account/profile'>
              Thông tin tài khoản
            </Link>
          </li>
          {user.role === 'customer' && (
            <li>
              <Link
                className='block w-full rounded p-2 text-left text-[#333] no-underline hover:bg-[#f5f5f5]'
                href='/orders'>
                Đơn hàng của tôi
              </Link>
            </li>
          )}

          {user.role === 'admin' && (
            <li>
              <Link
                className='block w-full rounded p-2 text-left text-[#333] no-underline hover:bg-[#f5f5f5]'
                href='/admin'>
                Trang Admin
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={logout}
              className='block w-full cursor-pointer rounded border-0 bg-transparent p-2 text-left text-[#333] hover:bg-[#f5f5f5]'>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
