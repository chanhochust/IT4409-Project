'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartItemsCount } from 'src/shared/stores/cart/useCart';
import { CartPreviewPopover } from './CartPreviewPopover';

export function CartIconButton() {
  const [isOpen, setIsOpen] = useState(false);
  const itemsCount = useCartItemsCount();

  return (
    <CartPreviewPopover isOpen={isOpen} onOpenChange={setIsOpen}>
      <button className='relative' onClick={() => setIsOpen(true)} type='button'>
        <ShoppingCart className='text-muted-foreground hover:text-primary h-5 w-5 transition-colors' />
        {itemsCount > 0 && (
          <span className='bg-primary text-primary-foreground absolute top-0 right-0 flex h-4 min-w-4 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full px-1 text-[10px] font-bold'>
            {itemsCount > 99 ? '99+' : itemsCount}
          </span>
        )}
      </button>
    </CartPreviewPopover>
  );
}
