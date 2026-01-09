'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import type { ProductItem } from 'src/shared/types/api/products/product.type';

interface ProductPurchasePanelProps {
  product: ProductItem;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock === 0;

  function handleQuantityChange(delta: number) {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  }

  function handleAddToCart() {
    if (!isOutOfStock) {
      // UI only - no actual cart logic implemented yet
      console.log(`Added ${quantity} ${product.name} to cart`);
    }
  }

  function handleBuyNow() {
    if (!isOutOfStock) {
      // UI only - no actual checkout logic implemented yet
      console.log(`Proceeding to checkout with ${quantity} ${product.name}`);
    }
  }

  return (
    <div className='border-border bg-card sticky top-24 space-y-6 rounded-lg border p-6'>
      {/* Price Display */}
      <div>
        <p className='text-muted-foreground mb-1 text-sm'>Price</p>
        <p className='text-primary text-2xl font-bold'>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(product.price)}
        </p>
      </div>

      {/* Stock Status */}
      <div>
        <p className='text-muted-foreground mb-2 text-sm'>Availability</p>
        {product.stock > 0 ? (
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-green-500' />
            <p className='text-foreground font-medium'>{product.stock} in stock</p>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-red-500' />
            <p className='text-destructive font-medium'>Out of Stock</p>
          </div>
        )}
      </div>

      {/* Quantity Stepper */}
      {!isOutOfStock && (
        <div>
          <p className='text-muted-foreground mb-3 text-sm'>Quantity</p>
          <div className='border-border flex items-center gap-3 rounded-lg border p-2'>
            <button
              className='text-foreground hover:text-primary p-1 disabled:opacity-50'
              disabled={quantity === 1}
              onClick={() => handleQuantityChange(-1)}
              type='button'>
              <Minus className='h-4 w-4' />
            </button>
            <span className='text-foreground min-w-8 text-center font-semibold'>{quantity}</span>
            <button
              className='text-foreground hover:text-primary p-1 disabled:opacity-50'
              disabled={quantity >= product.stock}
              onClick={() => handleQuantityChange(1)}
              type='button'>
              <Plus className='h-4 w-4' />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className='space-y-3 pt-4'>
        <AppButton
          className='flex w-full items-center justify-center gap-2'
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          size='lg'>
          <ShoppingCart className='h-5 w-5' />
          Add to Cart
        </AppButton>
        <AppButton
          className='flex w-full items-center justify-center gap-2'
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          size='lg'
          variant='outline'>
          <Zap className='h-5 w-5' />
          Buy Now
        </AppButton>
      </div>

      {/* Disclaimer */}
      {isOutOfStock && (
        <p className='text-destructive pt-2 text-center text-sm'>This product is currently out of stock</p>
      )}
    </div>
  );
}
