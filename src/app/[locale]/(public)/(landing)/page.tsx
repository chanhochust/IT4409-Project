'use client';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import Hero from '../../(private)/home/(components)/Hero';
// eslint-disable-next-line no-restricted-imports
import CategoryStrip from '../../(private)/home/(components)/CategoryStrip';
// eslint-disable-next-line no-restricted-imports
import ProductsGrid from '../../(private)/home/(components)/ProductsGrid';
// eslint-disable-next-line no-restricted-imports
import PromoBanner from '../../(private)/home/(components)/PromoBanner';
// eslint-disable-next-line no-restricted-imports
import Testimonials from '../../(private)/home/(components)/Testimonials';
// eslint-disable-next-line no-restricted-imports
import Newsletter from '../../(private)/home/(components)/Newsletter';

export default function Page() {
  return (
    <div className='bg-background text-foreground min-h-screen'>
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
