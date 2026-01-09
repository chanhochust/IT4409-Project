import { proxy, subscribe } from 'valtio';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartData {
  items: CartItem[];
}

class CartStore {
  data: CartData = {
    items: [],
  };
  isInitialized = false;

  addItem(productId: string, quantity = 1) {
    const normalizedQuantity = Math.max(1, Math.floor(quantity));
    const existingItem = this.data.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += normalizedQuantity;
    } else {
      this.data.items.push({ productId, quantity: normalizedQuantity });
    }

    this.persistToLocalStorage();
  }

  decrementItem(productId: string) {
    const item = this.data.items.find((item) => item.productId === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity - 1);
      this.persistToLocalStorage();
    }
  }

  incrementItem(productId: string) {
    const item = this.data.items.find((item) => item.productId === productId);
    if (item) {
      item.quantity += 1;
      this.persistToLocalStorage();
    }
  }

  init() {
    if (this.isInitialized) return;

    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored) as CartData;
        this.data = parsed;
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }

    this.isInitialized = true;
  }

  persistToLocalStorage() {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('cart', JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to persist cart to localStorage:', error);
    }
  }

  removeItem(productId: string) {
    this.data.items = this.data.items.filter((item) => item.productId !== productId);
    this.persistToLocalStorage();
  }

  updateQuantity(productId: string, quantity: number) {
    const normalizedQuantity = Math.max(1, Math.floor(quantity));
    const item = this.data.items.find((item) => item.productId === productId);

    if (item) {
      item.quantity = normalizedQuantity;
      this.persistToLocalStorage();
    }
  }
}

export const cartStore = proxy(new CartStore());

// Auto-persist on any change
if (typeof window !== 'undefined') {
  subscribe(cartStore.data, () => {
    cartStore.persistToLocalStorage();
  });
}
