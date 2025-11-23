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
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Giỏ hàng của bạn</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Chưa có sản phẩm nào trong giỏ</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                  <p className="text-gray-600 mt-1">
                    {item.quantity} × {item.price.toLocaleString()}₫
                  </p>
                </div>
                <p className="font-bold text-red-600">
                  {(item.quantity * item.price).toLocaleString()}₫
                </p>
              </div>
            ))}
          </div>

          {/* Tổng tiền & thanh toán */}
          <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-lg font-semibold text-gray-800">
              Tổng: {totalPrice.toLocaleString()}₫
            </span>
            <button className="mt-3 sm:mt-0 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
              Thanh toán
            </button>
          </div>
        </>
      )}
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
