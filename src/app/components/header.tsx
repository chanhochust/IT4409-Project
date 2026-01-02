'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';
import { useRouter } from 'next/navigation';
import { NotiDropdown } from './NotiDropdown';
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCartStore } from '@/store/cart_actions';

export function Header() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { isLoggedIn, user, isLoading } = useAuth();

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSellerChannelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/auth/signin');
      return;
    }

    // Kiểm tra trạng thái cửa hàng của Customer
    const shopStatus = user?.shopStatus;

    switch (shopStatus) {
      case 'active':
        // Shop đã được duyệt -> Cho vào Dashboard
        router.push('/seller/dashboard'); // ✅ Đã thêm dấu /
        break;

      case 'pending':
        // Shop đang chờ duyệt -> Hiển thị thông báo
        alert('Hồ sơ đăng ký bán hàng của bạn đang trong quá trình kiểm duyệt. Vui lòng đợi trong 24h!');
        // Có thể redirect về trang profile để xem trạng thái
        // router.push('/account/profile');
        break;

      case 'rejected':
        // Shop bị từ chối -> Cho phép gửi lại hồ sơ
        if (confirm('Hồ sơ của bạn đã bị từ chối. Bạn có muốn gửi lại hồ sơ không?')) {
          router.push('/auth/business-signup');
        }
        break;

      default:
        // Trường hợp 'none' hoặc chưa có shopStatus -> Redirect đăng ký
        router.push('/auth/business-signup');
        break;
    }
  };

  const renderAuthStatus = () => {
    if (isLoading) return <div className="w-6 h-6" />;
    if (isLoggedIn && user) return <UserMenu user={user} />;
    return (
      <Link href='/auth/signin' className='text-[24px] text-[#555] hover:text-sky-500 transition-colors'>
        <FaUser />
      </Link>
    );
  };

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Khuyến mãi', href: '/sale' },
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
    { name: 'Hỗ trợ', href: '/faq' },
  ];

  return (
    <header className="w-full bg-white border-b border-[#ddd] sticky top-0 z-50">
      {/* KHỐI HEADER CHÍNH (Gộp Top + Main) */}
      <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-[8%]">
        <div className="flex items-center justify-between gap-4 md:gap-10">
          
          {/* 1. Nhóm Logo & Menu Mobile */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="md:hidden text-2xl text-[#333]" onClick={() => setIsMenuOpen(true)}>
              <FaBars />
            </button>
            <Link href="/" className="shrink-0">
              <img src="/assets/images/logo.png" alt="Logo" className="h-8 md:h-[55px]" />
            </Link>
          </div>

          {/* 2. Thanh Tìm Kiếm (Nằm giữa) */}
          <div className="hidden md:flex flex-1 items-center">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="h-[45px] w-full rounded-l-[10px] border border-[#ccc] px-4 text-[16px] focus:border-[rgb(25,122,173)] outline-none"
            />
            <button
              onClick={handleSearch}
              className="flex h-[45px] items-center justify-center rounded-r-[10px] border border-[#ccc] bg-sky-500 px-5 text-white hover:bg-sky-700 transition-colors"
            >
              <FaSearch />
            </button>
          </div>

          {/* 3. Nhóm Icon & Actions */}
          <div className="flex items-center gap-5 md:gap-7 shrink-0">
            {/* Nút Kênh người bán chuyển xuống đây */}
            <button
              onClick={handleSellerChannelClick}
              className="hidden lg:block text-[15px] font-semibold text-[#555] hover:text-sky-600 transition-colors"
            >
              Kênh người bán
            </button>

            {/* Thông báo */}
            <div className="text-[24px] text-[#333] hover:text-sky-500 transition-colors cursor-pointer">
              <NotiDropdown />
            </div>

            {/* Giỏ hàng */}
            <Link href="/cart" className="relative flex items-center text-[24px] text-[#333] hover:text-sky-500 bg-transparent p-2 transition-all -right-2">
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span className='absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[8px] font-black text-white shadow-sm'>
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Tài khoản */}
            <div className="flex items-center">
              {renderAuthStatus()}
            </div>
          </div>
        </div>

        {/* Thanh Search cho Mobile */}
        <div className="md:hidden mt-2 pb-1">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="h-10 flex-1 rounded-l-lg border border-[#ccc] px-4 text-sm outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button onClick={handleSearch} className="bg-sky-500 text-white px-4 h-10 rounded-r-lg">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Desktop */}
      <nav className="hidden md:block">
        <ul className='m-0 flex list-none flex-row items-center justify-center gap-4 lg:gap-[60px] bg-[rgba(200,236,255,0.4)]'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)] transition-all'
                href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Mobile giữ nguyên... */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-5 border-b flex justify-between items-center text-sky-700 font-bold">
               <span>DANH MỤC</span>
               <FaTimes className="cursor-pointer text-xl" onClick={() => setIsMenuOpen(false)} />
            </div>
            <ul className="flex flex-col list-none p-0 overflow-y-auto">
               {navLinks.map((link) => (
                 <li key={link.name} className="border-b">
                   <Link href={link.href} className="block px-6 py-4 font-semibold text-[#333]" onClick={() => setIsMenuOpen(false)}>
                     {link.name}
                   </Link>
                 </li>
               ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}