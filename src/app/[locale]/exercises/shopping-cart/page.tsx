'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Trà gừng', price: 35000, stock: 8 },
  { id: 2, name: 'Mật ong rừng', price: 120000, stock: 5 },
  { id: 3, name: 'Tinh dầu sả', price: 89000, stock: 3 },
  { id: 4, name: 'Ngải cứu khô', price: 45000, stock: 10 },
];

function formatVND(n: number) {
  return n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function ShoppingCartExercise() {
  const locale = 'en';
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  const qtyInCart = (productId: number) => cart.find((c) => c.id === productId)?.quantity ?? 0;

  function addToCart(productId: number) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId);
      const current = existing?.quantity ?? 0;
      if (current >= product.stock) return prev;

      if (existing) {
        return prev.map((c) => (c.id === productId ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((c) => c.id !== productId));
  }

  function updateQuantity(productId: number, nextQty: number) {
    setCart((prev) =>
      prev.flatMap((c) => {
        if (c.id !== productId) return [c];
        const clamped = Math.max(0, Math.min(nextQty, c.stock));
        if (clamped === 0) return [];
        return [{ ...c, quantity: clamped }];
      }),
    );
  }

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <div className='mx-auto max-w-4xl p-6 font-sans'>
      <h1 className='mb-4 text-2xl font-semibold'>Shopping Cart Exercise</h1>

      <section className='mb-6'>
        <h2 className='mb-3 text-lg font-medium'>Sản phẩm</h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((p) => {
            const remaining = p.stock - qtyInCart(p.id);
            const disabled = remaining <= 0;
            return (
              <div key={p.id} className='rounded-lg border border-gray-200 p-4'>
                <div className='mb-1 font-semibold'>{p.name}</div>
                <div className='mb-1'>{formatVND(p.price)}</div>
                <div className='mb-3 text-sm text-gray-600'>
                  Tồn kho còn: <strong>{remaining}</strong> / {p.stock}
                </div>
                <button
                  onClick={() => addToCart(p.id)}
                  disabled={disabled}
                  className='rounded-md border border-gray-300 bg-gray-900 px-3 py-2 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'>
                  {disabled ? 'Hết hàng' : 'Thêm vào giỏ'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className='mb-3 text-lg font-medium'>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className='text-gray-500'>Chưa có sản phẩm nào trong giỏ.</div>
        ) : (
          <div className='grid gap-3'>
            {cart.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between'>
                <div className='min-w-0 flex-1'>
                  <div className='font-semibold'>{item.name}</div>
                  <div className='text-sm text-gray-600'>
                    Giá: {formatVND(item.price)} — Tồn: {item.stock}
                  </div>
                </div>

                <div className='flex items-center gap-2 sm:order-none'>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className='rounded-md border border-gray-300 px-3 py-1'>
                    −
                  </button>
                  <input
                    type='number'
                    min={0}
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 0)}
                    className='w-16 rounded-md border border-gray-300 px-2 py-1 text-center'
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className='rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:bg-gray-100'>
                    +
                  </button>
                </div>

                <div className='min-w-[120px] shrink-0 text-right font-medium'>
                  {formatVND(item.price * item.quantity)}
                </div>

                <div className='min-w-[96px] shrink-0 text-right'>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='rounded-md border border-red-500 px-3 py-2 text-red-500'>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className='mt-3 flex items-center justify-between border-t border-gray-200 px-1 pt-3'>
              <strong>Pay:</strong>
              <strong>{formatVND(total)}</strong>
            </div>
          </div>
        )}
      </section>
      <div className='mt-8'>
        <Link href={`/${locale}`} className='text-blue-500 hover:underline'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
