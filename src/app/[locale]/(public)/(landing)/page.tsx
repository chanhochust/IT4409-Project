'use client';
import React from 'react';
import { cn } from 'src/shared/utils/className';
import Hero from '../../(private)/home/(components)/Hero';
import CategoryStrip from '../../(private)/home/(components)/CategoryStrip';
import ProductsGrid from '../../(private)/home/(components)/ProductsGrid';
import PromoBanner from '../../(private)/home/(components)/PromoBanner';
import Testimonials from '../../(private)/home/(components)/Testimonials';
import Newsletter from '../../(private)/home/(components)/Newsletter';

export default function Page() {
  return (
    <div className={cn('bg-background text-foreground min-h-screen')}>
      <main>
        <Hero />
        <CategoryStrip />
        <ProductsGrid />
        <PromoBanner />
        <Testimonials />
        <Newsletter />
      </main>
    </div>
  );
}
