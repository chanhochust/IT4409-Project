"use client";
import Link from 'next/link'; 
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';
import {
  FaBell,
  FaGlobe,
  FaMoon,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const { isLoggedIn, user, isLoading } = useAuth();

  const renderAuthStatus = () => {
    if (isLoading) {
      return <div className="btnIcon" style={{ width: '24px', height: '24px' }} aria-label="Đang tải..."></div>;
    }

    if (isLoggedIn && user) {
      return <UserMenu user={user} />;
    }

    return (
      <Link href="/signin" className="btnIcon" aria-label="Tài khoản">
        <FaUser />
      </Link>
    );
  };

  return (
    <header className="main-header">
      {/* Header Top */}
      <div className="header-top">
         <div className="header-news">
           <img src="/freeship.png" alt="Miễn phí ship logo" />
           <p>
             <b>Miễn phí ship</b> đơn chỉ từ 45k
           </p>
         </div>
         <div className="header-top-actions">
           <button className="btnIcon" aria-label="Xem thông báo">
             <FaBell />
           </button>
           <div className="lang-wrapper">
             <label htmlFor="langSelect" className="visually-hidden">
             </label>
             <button className="btnIcon" aria-label="Chọn ngôn ngữ">
               <FaGlobe />
             </button>
             <select id="langSelect" className="lang-select" defaultValue="vi" aria-label="Ngôn ngữ">
               <option value="vi">VN</option>
               <option value="en">EN</option>
             </select>
           </div>
           <button
            id="btnTheme"
            className="btnIcon"
            onClick={toggleTheme}
            aria-label="Chuyển chế độ sáng / tối"
           >
             <FaMoon />
           </button>
         </div>
      </div>

      {/* Header Main */}
      <div className="header-main">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
             <label htmlFor="search" className="visually-hidden">
             </label>
             <input
               type="text"
               id="search"
               placeholder="Tìm kiếm sản phẩm..."
             />
             <button id="btnSearch" aria-label="Tìm kiếm">
               <FaSearch />
             </button>
          </div>

          {/* Các nút biểu tượng */}
          <div className="header-icon">
            <Link href="/cart" className="btnIcon" aria-label="Giỏ hàng">
              <FaShoppingCart />
              <span className="cart-count">0</span>
            </Link>
            {renderAuthStatus()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="main-nav">
        <ul id="menuItems">
          <li><Link href="/">Trang chủ</Link></li>
          <li><Link href="/products">Sản phẩm</Link></li>
          <li><Link href="/sale">Khuyến mãi</Link></li>
          <li><Link href="/about">Giới thiệu</Link></li>
          <li><Link href="/contact">Liên hệ</Link></li>
          <li><Link href="/faq">Hỗ trợ</Link></li>
        </ul>
      </nav>
    </header>
  );
}