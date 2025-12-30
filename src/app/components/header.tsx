'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';
import { useRouter } from 'next/navigation';
import { NotiDropdown } from './NotiDropdown';
import { FaGlobe, FaMoon, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCartStore } from '@/store/cart_actions';

export function Header() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  // cho phép Enter để tìm kiếm
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const cart = useCartStore((state) => state.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { isLoggedIn, user, isLoading } = useAuth();
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
    if (isLoading) {
      return (
        <div
          className='flex items-center justify-center text-[#555]'
          style={{ width: '24px', height: '24px' }}
          aria-label='Đang tải...'></div>
      );
    }

    if (isLoggedIn && user) {
      return <UserMenu user={user} />;
    }

    return (
      <Link
        href='/auth/signin'
        className='flex items-center justify-center text-[24px] text-[#555] hover:text-sky-500'
        aria-label='Tài khoản'>
        <FaUser />
      </Link>
    );
  };

  return (
    <header>
      {/* Header Top */}
      <div className='flex items-center justify-between border-b border-[#e6e6e6] bg-[#f8f8f8] px-[8%] py-2 text-[1em] text-[#555]'>
        <div className='flex items-center'>
          <img src='/freeship.png' alt='Miễn phí ship logo' className='mr-2 h-6' />
          <p className='m-0 text-[#555]'>
            <b className='mr-1 text-sky-700'>Miễn phí ship</b>đơn chỉ từ 45k
          </p>
        </div>
        <div className='flex items-center gap-3.5'>
          <div
            className='flex cursor-pointer items-center justify-center border-0 bg-transparent text-[24px] text-[#555] hover:text-sky-500'
            aria-label='Xem thông báo'>
            <NotiDropdown />
          </div>
          <button
            onClick={handleSellerChannelClick}
            className='flex cursor-pointer items-center gap-0.5 text-[1em] text-[#555] hover:text-sky-600'>
            Kênh người bán
          </button>
        </div>
      </div>

      {/* Header Main */}
      <div className='border-b border-[#ddd] bg-white'>
        <div className='mx-auto my-5 flex max-w-full items-center justify-between px-5'>
          {/* Logo */}
          <div className='mr-[60px]'>
            <Link href='/'>
              <img src='/assets/images/logo.png' alt='Logo' className='h-[60px]' />
            </Link>
          </div>

          {/* Search Bar */}
          <div className='mx-5 flex flex-1 scale-90 items-center'>
            <label htmlFor='search' className='sr-only'></label>
            <input
              type='text'
              id='search'
              placeholder='Tìm kiếm sản phẩm...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={onKeyDown}
              className='h-[45px] w-full rounded-l-[10px] border border-[#ccc] px-4 text-[18px] focus:border-[rgb(25,122,173)] focus:outline-none'
            />
            <button
              id='btnSearch'
              aria-label='Tìm kiếm'
              onClick={handleSearch}
              className='flex h-[45px] items-center justify-center rounded-r-[10px] border border-[#ccc] bg-sky-500 px-4 text-white hover:bg-sky-700'>
              <FaSearch />
            </button>
          </div>

          {/* Các nút biểu tượng */}
          <div className='flex items-center gap-8'>
            <Link
              href='/cart'
              className='relative flex items-center text-[24px] text-[#333] no-underline'
              aria-label='Giỏ hàng'>
              <FaShoppingCart className='hover:text-sky-500' />
              <span className='absolute -right-2.5 -top-1.5 rounded-full bg-red-600 px-1.5 py-0.5 text-[11px] font-bold text-white'>
                {totalQuantity}
              </span>
            </Link>
            {renderAuthStatus()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <ul
          id='menuItems'
          className='m-0 flex list-none flex-row items-center justify-center gap-[70px] bg-[rgba(200,236,255,0.4)] font-sans'>
          <li>
            <Link
              className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)]'
              href='/'>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)]'
              href='/products'>
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link
              className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)]'
              href='/sale'>
              Khuyến mãi
            </Link>
          </li>
          <li>
            <Link
              className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)]'
              href='/about'>
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link
              className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)]'
              href='/contact'>
              Liên hệ
            </Link>
          </li>
          <li>
            <Link
              className='block px-5 py-[15px] font-semibold text-[rgb(1,62,95)] no-underline hover:bg-[rgb(163,218,248)]'
              href='/faq'>
              Hỗ trợ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
