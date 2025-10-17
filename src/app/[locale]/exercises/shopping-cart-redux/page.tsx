'use client';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch } from 'src/shared/stores/store.shoppingcart';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  type Product,
  type CartItem,
} from 'src/shared/stores/shopSlice.shoppingcart';
import { selectProducts, selectCart, selectTotal } from 'src/shared/stores/selectors.shoppingcart';
import Link from 'next/link';
/* =========================
   Helpers
========================= */
function formatVND(n: number): string {
  return n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

/* =========================
   UI Components
========================= */
interface ProductCardProps {
  product: Product;
  remaining: number;
  onAdd: (id: number) => void;
}

function ProductCard(props: ProductCardProps) {
  function handleAdd(): void {
    props.onAdd(props.product.id);
  }

  var disabled = props.remaining <= 0;

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{props.product.name}</div>
      <div style={{ marginBottom: 4 }}>{formatVND(props.product.price)}</div>
      <div style={{ marginBottom: 8, fontSize: 13, color: '#374151' }}>
        Tồn còn: <strong>{props.remaining}</strong> / {props.product.stock}
      </div>
      <button
        onClick={handleAdd}
        disabled={disabled}
        style={{
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid #d1d5db',
          background: disabled ? '#f3f4f6' : '#111827',
          color: disabled ? '#9ca3af' : '#fff',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}>
        {disabled ? 'Hết hàng' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
}

interface CartItemRowProps {
  item: CartItem;
  onDecrease: (id: number) => void;
  onIncrease: (id: number) => void;
  onInputChange: (id: number, value: number) => void;
  onRemove: (id: number) => void;
}

function CartItemRow(props: CartItemRowProps) {
  function handleDecrease(): void {
    props.onDecrease(props.item.id);
  }
  function handleIncrease(): void {
    props.onIncrease(props.item.id);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    var value = parseInt(e.target.value || '0', 10);
    if (isNaN(value)) value = 0;
    props.onInputChange(props.item.id, value);
  }
  function handleRemove(): void {
    props.onRemove(props.item.id);
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 140px 120px',
        alignItems: 'center',
        gap: 8,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 12,
      }}>
      <div>
        <div style={{ fontWeight: 600 }}>{props.item.name}</div>
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Giá: {formatVND(props.item.price)} — Tồn: {props.item.stock}
        </div>
      </div>

      <div style={{ fontWeight: 600 }}>{formatVND(props.item.price * props.item.quantity)}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={handleDecrease}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer' }}>
          −
        </button>
        <input
          type='number'
          min={0}
          max={props.item.stock}
          value={props.item.quantity}
          onChange={handleChange}
          style={{ width: 60, padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        <button
          onClick={handleIncrease}
          disabled={props.item.quantity >= props.item.stock}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            cursor: props.item.quantity >= props.item.stock ? 'not-allowed' : 'pointer',
            background: props.item.quantity >= props.item.stock ? '#f3f4f6' : undefined,
          }}>
          +
        </button>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={handleRemove}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #ef4444',
            color: '#ef4444',
            background: '#fff',
            cursor: 'pointer',
          }}>
          Xoá
        </button>
      </div>
    </div>
  );
}

function ShoppingCartPage() {
  var dispatch = useDispatch<AppDispatch>();
  var products = useSelector(selectProducts);
  var cart = useSelector(selectCart);
  var total = useSelector(selectTotal);

  function qtyInCart(productId: number): number {
    var found = cart.find(function (c) {
      return c.id === productId;
    });
    return found ? found.quantity : 0;
  }

  function handleAdd(productId: number): void {
    dispatch(addToCart(productId));
  }
  function handleRemove(productId: number): void {
    dispatch(removeFromCart(productId));
  }
  function handleUpdateQuantity(productId: number, quantity: number): void {
    dispatch(updateQuantity({ id: productId, quantity: quantity }));
  }
  function handleDecrease(productId: number): void {
    var current = qtyInCart(productId);
    dispatch(updateQuantity({ id: productId, quantity: current - 1 }));
  }
  function handleIncrease(productId: number): void {
    var current = qtyInCart(productId);
    dispatch(updateQuantity({ id: productId, quantity: current + 1 }));
  }

  function renderProduct(p: Product) {
    var remaining = p.stock - qtyInCart(p.id);
    return <ProductCard key={p.id} product={p} remaining={remaining} onAdd={handleAdd} />;
  }

  function renderCartItem(item: CartItem) {
    return (
      <CartItemRow
        key={item.id}
        item={item}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        onInputChange={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    );
  }
  const locale = 'en';
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: 16 }}>Shopping Cart (Redux)</h1>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Sản phẩm</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {products.map(renderProduct)}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>Giỏ hàng</h2>
        {cart.length === 0 ? (
          <div style={{ color: '#6b7280' }}>Chưa có sản phẩm nào trong giỏ.</div>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {cart.map(renderCartItem)}

            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <strong>Tổng cộng:</strong>
              <strong>{formatVND(total)}</strong>
            </div>
          </div>
        )}
      </section>
      <Link href={`/${locale}`} className='text-blue-500 hover:underline'>
        Back to Home
      </Link>
    </div>
  );
}

export default function ShoppingCartExercise() {
  return (
    <Provider store={store}>
      <ShoppingCartPage />
    </Provider>
  );
}
