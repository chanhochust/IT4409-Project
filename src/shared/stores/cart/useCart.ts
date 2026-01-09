import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { cartStore } from './cartStore';

export function useCart() {
  const snap = useSnapshot(cartStore);

  useEffect(() => {
    cartStore.init();
  }, []);

  return {
    addItem: cartStore.addItem.bind(cartStore),
    decrementItem: cartStore.decrementItem.bind(cartStore),
    incrementItem: cartStore.incrementItem.bind(cartStore),
    items: snap.data.items,
    removeItem: cartStore.removeItem.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
  };
}

export function useCartItemsCount() {
  const snap = useSnapshot(cartStore);

  useEffect(() => {
    cartStore.init();
  }, []);

  return snap.data.items.reduce((sum, item) => sum + item.quantity, 0);
}
