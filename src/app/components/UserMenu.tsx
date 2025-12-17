'use client'; 

import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth, MockUser } from '../context/AuthContext'; 

export function UserMenu({ user }: { user: MockUser }) {
  const { logout } = useAuth(); 

  return (
    <div className="relative inline-block group">
      
      <div className="text-[24px] text-[#555] hover:text-sky-500 flex items-center justify-center cursor-pointer" aria-label="Tài khoản">
        <FaUser />
      </div>

      <div className="hidden group-hover:block absolute right-0 top-full bg-white border border-[#eee] shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-lg p-4 w-[250px] z-100">
        <p className="font-semibold mt-0 border-b border-[#f0f0f0] pb-2">Chào, {user.email}!</p> 
        <ul className="list-none p-0 mt-2">
          <li><Link className="block w-full text-left p-2 no-underline text-[#333] rounded hover:bg-[#f5f5f5]" href="/account/profile">Thông tin tài khoản</Link></li>
          {user.role === 'customer' && (
            <li><Link className="block w-full text-left p-2 no-underline text-[#333] rounded hover:bg-[#f5f5f5]" href="/orders">Đơn hàng của tôi</Link></li>
          )}
          
          {user.role === 'admin' && (
            <li><Link className="block w-full text-left p-2 no-underline text-[#333] rounded hover:bg-[#f5f5f5]" href="/admin">Trang Admin</Link></li>
          )}

          <li>
            <button onClick={logout} className="block w-full text-left p-2 text-[#333] rounded hover:bg-[#f5f5f5] bg-transparent border-0 cursor-pointer">
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}