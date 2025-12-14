"use client";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart_actions";
import { useEffect, useMemo, useState } from "react";
import "./checkout.css";

export default function CheckoutPage() {
  const params = useSearchParams();
  const selected = JSON.parse(params.get("items") || "[]");
  const cart = useCartStore((s) => s.cart);

  const selectedItems = useMemo(
    () => cart.filter((item) => selected.includes(item.id)),
    [cart, selected]
  );

  const [shipping, setShipping] = useState(15000);
  const [discount, setDiscount] = useState(0);

  const total = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const finalTotal = total + shipping - discount;

  return (
    <main className="checkout-page">
      <h2>Thanh toán</h2>

      {/* Address */}
      <section className="checkout-box">
        <h3>📍 Địa chỉ nhận hàng</h3>
        <div className="address-detail">
          <p><b>Nguyễn Bảo Ngọc</b> • 096xxxxx</p>
          <p>Hà Nội, Việt Nam</p>
        </div>
        <button className="change-btn">Thay đổi</button>
      </section>

      {/* Items */}
      <section className="checkout-box">
        <h3>🛍 Sản phẩm</h3>
        {selectedItems.map((item) => (
          <div className="checkout-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <p className="name">{item.name}</p>
              <p className="qty">x{item.quantity}</p>
            </div>
            <p className="price">{(item.price * item.quantity).toLocaleString()}₫</p>
          </div>
        ))}
      </section>

      {/* Voucher */}
      <section className="checkout-box">
        <h3>🎟 Voucher</h3>
        <div className="voucher-row">
          <input placeholder="Nhập mã..." />
          <button className="apply-btn">Áp dụng</button>
        </div>
      </section>

      {/* Shipping */}
      <section className="checkout-box">
        <h3>🚚 Vận chuyển</h3>
        {[
          { name: "Nhanh", price: 15000 },
          { name: "Tiết kiệm", price: 0 },
          { name: "Hỏa tốc 2h", price: 25000 },
        ].map((s) => (
          <label className="radio-opt" key={s.name}>
            <input type="radio" name="ship" onChange={() => setShipping(s.price)} />
            <span>{s.name} — {s.price.toLocaleString()}₫</span>
          </label>
        ))}
      </section>

      {/* Payment */}
      <section className="checkout-box">
        <h3>💳 Thanh toán</h3>
        {["Momo", "COD", "Ngân hàng"].map((p) => (
          <label className="radio-opt" key={p}>
            <input type="radio" name="pay" />
            <span>{p}</span>
          </label>
        ))}
      </section>

      {/* Total */}
      <section className="checkout-total">
        <p>Tạm tính: <b>{total.toLocaleString()}₫</b></p>
        <p>Voucher: <b>-{discount.toLocaleString()}₫</b></p>
        <p>Phí giao hàng: <b>{shipping.toLocaleString()}₫</b></p>

        <h2>Tổng: <span>{finalTotal.toLocaleString()}₫</span></h2>

        <button className="pay-btn">Đặt hàng</button>
      </section>
    </main>
  );
}
