"use client";

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  onAddToCart: (product: Omit<CartItem, "quantity">) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  onAddToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  increase: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
    })),

  remove: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

}));
