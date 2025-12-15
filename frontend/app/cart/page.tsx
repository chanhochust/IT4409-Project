"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSpinner, FaArrowRight } from "react-icons/fa";
import { useCartStore } from "@/store/cart_actions";
import { useRouter } from 'next/navigation'; 
import "./cart.css";

function EmptyCart() {
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  return (
    <main className="main">
      <div className="cart-page">
        <div className="cart-empty">
          <Image src="/empty-cart.png" alt="Giỏ hàng trống" width={200} height={200} />
          <div className="cart-text">
            <p>Giỏ hàng của bạn đang trống</p>
            <Link href="/" className="btnShopping">
              <FaArrowRight className="mui-ten" /> Tiếp tục mua sắm
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
        <Image src="/empty-cart.png" alt="Giỏ hàng trống" width={200} height={200} />
        <div className="cart-text">
          <p>
            Vui lòng{" "}
            <Link href="/signin" className="login-link">
              đăng nhập
            </Link>{" "}
            để xem giỏ hàng
          </p>
          <span className="dang-ky">
            Chưa có tài khoản?{" "}
            <Link href="/signup" className="login-link">
              Đăng ký ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function HasCart() {
  const { increase, decrease, remove } = useCartStore();
  const cart = useCartStore((s) => s.cart);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter(); // Next.js router

  const toggleItem = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === cart.length) {
      setSelected([]);
    } else {
      setSelected(cart.map((item) => item.id));
    }
  };

  const selectedTotal = cart
    .filter((item) => selected.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="title">Giỏ hàng của bạn</h2>

        {/* Header */}
        <div className="cart-header">
          <div className="checkbox-all">
            <input
              type="checkbox"
              checked={selected.length === cart.length}
              onChange={toggleAll}
            />
              </div>
          <div>Sản phẩm</div>
          <div>Đơn giá</div>
          <div>Số lượng</div>
          <div>Số tiền</div>
          <div>Thao tác</div>
        </div>

        {/* Item */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="item" key={item.id}>
              <div className="item-check">
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                />
              </div>

              <div className="item-product">
                <Image src={item.image} width={90} height={90} alt={item.name} />
                <h3>{item.name}</h3>
              </div>

              <div className="item-price-single">
                {item.price.toLocaleString()}₫
              </div>

              <div className="item-qty">
                <button onClick={() => decrease(item.id)} className="qty-btn">
                  –
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button onClick={() => increase(item.id)} className="qty-btn">
                  +
                </button>
              </div>

              <div className="item-total">
                {(item.quantity * item.price).toLocaleString()}₫
              </div>

              <div className="item-action">
                <button onClick={() => remove(item.id)} className="remove-btn">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div className="cart-payment">
          <span className="total-price">
            Tổng cộng ({selected.length} sản phẩm): {selectedTotal.toLocaleString()}₫
          </span>
          <button className="checkout-btn" disabled={selected.length === 0} onClick={() => router.push('/checkout?items=' + JSON.stringify(selected))}

>
            Thanh toán
          </button>
        </div>
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
