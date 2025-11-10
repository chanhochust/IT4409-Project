'use client'; 

import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth, MockUser } from '../context/AuthContext'; 

export function UserMenu({ user }: { user: MockUser }) {
  const { logout } = useAuth(); 

  return (
    <div className="user-menu-hover-container">
      
      <div className="btnIcon" aria-label="Tài khoản">
        <FaUser />
      </div>

      <div className="user-dropdown-menu">
        <p>Chào, {user.email}!</p> 
        <ul>
          <li><Link href="/account">Tài khoản của tôi</Link></li>
          <li><Link href="/orders">Đơn hàng</Link></li>
          
          {user.role === 'admin' && (
            <li><Link href="/admin">Trang Admin</Link></li>
          )}

          <li>
            <button onClick={logout} className="logout-button">
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}