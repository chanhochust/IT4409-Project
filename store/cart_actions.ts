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
}));
