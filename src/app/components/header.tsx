"use client";
import Link from 'next/link'; 
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';
import { useRouter } from "next/navigation";

import {
  FaBell,
  FaGlobe,
  FaMoon,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useCartStore } from "@/store/cart_actions";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  // cho phép Enter để tìm kiếm
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const cart = useCartStore((state) => state.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { isLoggedIn, user, isLoading } = useAuth();

  const renderAuthStatus = () => {
    if (isLoading) {
      return <div className="text-[#555] flex items-center justify-center" style={{ width: '24px', height: '24px' }} aria-label="Đang tải..."></div>;
    }

    if (isLoggedIn && user) {
      return <UserMenu user={user} />;
    }

    return (
      <Link href="/auth/signin" className="text-[24px] text-[#555] hover:text-sky-500 flex items-center justify-center" aria-label="Tài khoản">
        <FaUser />
      </Link>
    );
  };

  return (
    <header>
      {/* Header Top */}
      <div className="bg-[#f8f8f8] border-b border-[#e6e6e6] text-[#555] text-[1em] flex items-center justify-between px-[8%] py-2">
         <div className="flex items-center">
           <img src="/freeship.png" alt="Miễn phí ship logo" className="h-6 mr-2" />
           <p className="m-0 text-[#555]"><b className="text-sky-700 mr-1">Miễn phí ship</b>đơn chỉ từ 45k</p>
         </div>
         <div className="flex items-center gap-3.5">
           <button className="border-0 bg-transparent cursor-pointer text-[#555] flex items-center justify-center hover:text-sky-500 text-[24px]" aria-label="Xem thông báo">
             <FaBell />
           </button>
           <div className="flex items-center gap-0.5 text-[#555] text-[0.9em]">
             <label htmlFor="langSelect" className="sr-only"></label>
             <button className="border-0 bg-transparent cursor-pointer text-[#555] flex items-center justify-center hover:text-sky-500 text-[24px]" aria-label="Chọn ngôn ngữ">
               <FaGlobe />
             </button>
             <select id="langSelect" className="border border-[#ccc] rounded bg-[#f8f8f8] outline-none cursor-pointer" defaultValue="vi" aria-label="Ngôn ngữ">
               <option value="vi">VN</option>
               <option value="en">EN</option>
             </select>
           </div>
           <button
            id="btnTheme"
            className="border-0 bg-transparent cursor-pointer text-[#555] flex items-center justify-center hover:text-sky-500 text-[24px]"
            onClick={toggleTheme}
            aria-label="Chuyển chế độ sáng / tối"
           >
             <FaMoon />
           </button>
         </div>
      </div>

      {/* Header Main */}
        <div className="bg-white border-b border-[#ddd]">
        <div className="max-w-full mx-auto my-5 px-5 flex items-center justify-between">
          {/* Logo */}
          <div className="mr-[60px]">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="Logo" className="h-[60px]" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center flex-1 mx-5 scale-90">
        <label htmlFor="search" className="sr-only"></label>
        <input
          type="text"
          id="search"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={onKeyDown}  
          className="h-[45px] w-full px-4 border border-[#ccc] rounded-l-[10px] text-[18px] focus:outline-none focus:border-[rgb(25,122,173)]"
        />
        <button id="btnSearch" aria-label="Tìm kiếm" onClick={handleSearch} className="bg-sky-500 h-[45px] border border-[#ccc] px-4 rounded-r-[10px] text-white flex items-center justify-center hover:bg-sky-700">
          <FaSearch />
        </button>
      </div>

          {/* Các nút biểu tượng */}
          <div className="flex items-center gap-8">
            <Link href="/cart" className="relative text-[24px] text-[#333] no-underline flex items-center" aria-label="Giỏ hàng">
              <FaShoppingCart />
              <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[11px] font-bold rounded-full px-1.5 py-0.5">{totalQuantity}</span>              
            </Link>
            {renderAuthStatus()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <ul id="menuItems" className="list-none flex flex-row justify-center items-center m-0 bg-[rgba(200,236,255,0.4)] gap-[70px] font-sans">
          <li><Link className="text-[rgb(1,62,95)] no-underline px-5 py-[15px] font-semibold block hover:bg-[rgb(163,218,248)]" href="/">Trang chủ</Link></li>
          <li><Link className="text-[rgb(1,62,95)] no-underline px-5 py-[15px] font-semibold block hover:bg-[rgb(163,218,248)]" href="/products">Sản phẩm</Link></li>
          <li><Link className="text-[rgb(1,62,95)] no-underline px-5 py-[15px] font-semibold block hover:bg-[rgb(163,218,248)]" href="/sale">Khuyến mãi</Link></li>
          <li><Link className="text-[rgb(1,62,95)] no-underline px-5 py-[15px] font-semibold block hover:bg-[rgb(163,218,248)]" href="/about">Giới thiệu</Link></li>
          <li><Link className="text-[rgb(1,62,95)] no-underline px-5 py-[15px] font-semibold block hover:bg-[rgb(163,218,248)]" href="/contact">Liên hệ</Link></li>
          <li><Link className="text-[rgb(1,62,95)] no-underline px-5 py-[15px] font-semibold block hover:bg-[rgb(163,218,248)]" href="/faq">Hỗ trợ</Link></li>
        </ul>
      </nav>
    </header>
  );
}