"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart_actions";
import "./addToCart.css";

export default function AddToCartWithQty({ product }: { product: any }) {

  const router = useRouter();
  const add = useCartStore(s => s.onAddToCart);
  const [qty, setQty] = useState(1);

  const increase = () => setQty(v => v + 1);
  const decrease = () => setQty(v => Math.max(1, v - 1));

  const onAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    setQty(1);
  };

  const onBuyNow = () => {

    const selected = [
      {
        id: product.id,
        quantity: qty,
      }
    ];

    router.push(
      "/checkout?items=" + encodeURIComponent(JSON.stringify(selected))
    );
  };

  return (
    <div className="qty-wrapper">

      <div className="item-qty">
        <span className="qty-label">Số lượng</span>

        <button onClick={decrease} className="qty-btn">–</button>

        <span className="qty-number">{qty}</span>

        <button onClick={increase} className="qty-btn">+</button>
      </div>

    <div className="action-row">
      <button className="add-cart-btn" onClick={onAdd}>
        Thêm vào giỏ hàng
      </button>
      </div>

    </div>
  );
}
