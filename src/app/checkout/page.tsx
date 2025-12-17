"use client";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart_actions";
import { useEffect, useMemo, useState } from "react";

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
    <main className="max-w-[800px] mx-auto p-5 text-[15px]">
      <h2 className="text-2xl font-semibold mb-3">Thanh toán</h2>

      {/* Address */}
      <section className="bg-white p-4 rounded-xl border border-[#e9e9e9] mb-4">
        <h3 className="font-bold mb-2">📍 Địa chỉ nhận hàng</h3>
        <div className="leading-[1.4]">
          <p><b>Nguyễn Bảo Ngọc</b> • 096xxxxx</p>
          <p>Hà Nội, Việt Nam</p>
        </div>
        <button className="mt-1.5 text-[#0b74e5] bg-transparent border-0 cursor-pointer">Thay đổi</button>
      </section>

      {/* Items */}
      <section className="bg-white p-4 rounded-xl border border-[#e9e9e9] mb-4">
        <h3 className="font-bold mb-2">🛍 Sản phẩm</h3>
        {selectedItems.map((item) => (
          <div className="flex items-center border-t border-[#eee] py-2.5 gap-2.5" key={item.id}>
            <img src={item.image} alt={item.name} className="w-[60px] h-[60px] rounded" />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-[13px] text-[#777]">x{item.quantity}</p>
            </div>
            <p className="font-bold">{(item.price * item.quantity).toLocaleString()}₫</p>
          </div>
        ))}
      </section>

      {/* Voucher */}
      <section className="bg-white p-4 rounded-xl border border-[#e9e9e9] mb-4">
        <h3 className="font-bold mb-2">🎟 Voucher</h3>
        <div className="flex gap-2.5">
          <input placeholder="Nhập mã..." className="flex-1 h-[35px] px-2 border border-[#ccc] rounded-lg" />
          <button className="px-3 py-1.5 bg-[#0b74e5] text-white rounded-lg border-0">Áp dụng</button>
        </div>
      </section>

      {/* Shipping */}
      <section className="bg-white p-4 rounded-xl border border-[#e9e9e9] mb-4">
        <h3 className="font-bold mb-2">🚚 Vận chuyển</h3>
        {[
          { name: "Nhanh", price: 15000 },
          { name: "Tiết kiệm", price: 0 },
          { name: "Hỏa tốc 2h", price: 25000 },
        ].map((s) => (
          <label className="block my-1.5" key={s.name}>
            <input className="mr-2" type="radio" name="ship" onChange={() => setShipping(s.price)} />
            <span>{s.name} — {s.price.toLocaleString()}₫</span>
          </label>
        ))}
      </section>

      {/* Payment */}
      <section className="bg-white p-4 rounded-xl border border-[#e9e9e9] mb-4">
        <h3 className="font-bold mb-2">💳 Thanh toán</h3>
        {["Momo", "COD", "Ngân hàng"].map((p) => (
          <label className="block my-1.5" key={p}>
            <input className="mr-2" type="radio" name="pay" />
            <span>{p}</span>
          </label>
        ))}
      </section>

      {/* Total */}
      <section className="text-right bg-white p-5 rounded-xl border border-[#e9e9e9] mb-12">
        <p>Tạm tính: <b>{total.toLocaleString()}₫</b></p>
        <p>Voucher: <b>-{discount.toLocaleString()}₫</b></p>
        <p>Phí giao hàng: <b>{shipping.toLocaleString()}₫</b></p>

        <h2 className="mt-2 text-xl font-semibold">Tổng: <span className="text-[#d32f2f] font-bold">{finalTotal.toLocaleString()}₫</span></h2>

        <button className="mt-2 w-full py-3 bg-[#fe4c4c] hover:bg-[#e73535] text-white border-0 rounded-[10px] text-[17px] font-semibold cursor-pointer">Đặt hàng</button>
      </section>
    </main>
  );
}
