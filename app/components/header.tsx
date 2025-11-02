"use client";

import { useState } from "react";
import {
  FaBell,
  FaGlobe,
  FaMoon,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
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
          {/* Nút thông báo */}
          <button className="btnIcon" aria-label="Xem thông báo">
            <FaBell />
          </button>

          {/* Ngôn ngữ */}
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

          {/* Đổi giao diện */}
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
            <a href="/">
              <img src="/assets/images/logo.png" alt="Logo" />
            </a>
          </div>

          {/* Thanh tìm kiếm */}
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
            <a href="/cart" className="btnIcon" aria-label="Giỏ hàng">
              <FaShoppingCart />
              <span className="cart-count">0</span>
            </a>
            <a href="/login" className="btnIcon" aria-label="Tài khoản">
              <FaUser />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="main-nav">
        <ul id="menuItems">
          <li><a href="/">Trang chủ</a></li>
          <li><a href="/products">Sản phẩm</a></li>
          <li><a href="/sale">Khuyến mãi</a></li>
          <li><a href="/about">Giới thiệu</a></li>
          <li><a href="/contact">Liên hệ</a></li>
          <li><a href="/faq">Hỗ trợ</a></li>
        </ul>
      </nav>
    </header>
  );
}
