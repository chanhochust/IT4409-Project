"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSpinner, FaArrowRight } from "react-icons/fa";
import { useCartStore } from "@/store/cart_actions";

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
            width={200}
            height={200}
          />
          <div className="cart-text">
            <p>Giỏ hàng của bạn đang trống</p>
            <Link href="/" className="btnShopping"><FaArrowRight className="mui-ten"/>Tiếp tục mua sắm
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
            width={200}
            height={200}
      />
      <div className="cart-text">
        <p>Vui lòng <Link href="/signin" className="login-link">đăng nhập</Link> để xem giỏ hàng</p>
        <span className="dang-ky">Chưa có tài khoản? <Link href='/signup' className='login-link'>Đăng ký ngay</Link></span>
      </div>
    </div>
    </div>
  );
}

function HasCart() {
  const cart = useCartStore((s) => s.cart);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">

        <h2>Giỏ hàng của bạn</h2>

        {cart.length === 0 ? (
          <p>Chưa có sản phẩm nào trong giỏ</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="item">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.quantity} × {item.price.toLocaleString()}₫</p>
                </div>
                <p className="item-price">
                  {(item.quantity * item.price).toLocaleString()}₫
                </p>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-payment">
            <span className="total-price">
              Tổng: {totalPrice.toLocaleString()}₫
            </span>
            <button className="checkout-btn">
              Thanh toán
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CartPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const cart = useCartStore((s) => s.cart);

  if (isLoading) {
    return (
      <div className="cart-loading-container">
        <FaSpinner className="icon-spinner" />
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!isLoggedIn) return <NotLoggedInCart />;
  if (cart.length === 0) return <EmptyCart />;

  return <HasCart />;
}
