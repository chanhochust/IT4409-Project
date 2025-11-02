"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartPage() {
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
          <div>
            <p>
              <strong>Giỏ hàng của bạn đang trống</strong>
            </p>
            <Link href="/" className="btnShopping">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
