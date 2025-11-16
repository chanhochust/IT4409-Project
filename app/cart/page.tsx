"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSpinner } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

function EmptyCart() {
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  return (
    <main>
      <div className="cart-page">
        <div id="cart-empty" className="cart-empty">
          <Image
            src="/empty-cart.png"
            alt="Giỏ hàng trống"
            width={300}
            height={300}
          />
          <div className="cart-text">
            <p>Giỏ hàng của bạn đang trống</p>
            <Link href="/" className="btnShopping"><FaArrowRight />Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function NotLoggedInCart() {
  return (
    <div className="cart-page">
    <div className="cart-empty">
      <Image
            src="/empty-cart.png"
            alt="Giỏ hàng trống"
            width={300}
            height={300}
      />
      <div className="cart-text">
        <p>Vui lòng <Link href="/signin" className="login-link">đăng nhập</Link> để xem giỏ hàng</p>
        <span className="dang-ky">Chưa có tài khoản? <Link href='/signup' className='login-link'>Đăng ký ngay</Link></span>
      </div>
    </div>
    </div>
  );
}

export default function CartPage() {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="cart-loading-container">
        <FaSpinner className="icon-spinner" />
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }
  if (!isLoggedIn) {
    return <NotLoggedInCart />;
  }
  return <EmptyCart />;
}