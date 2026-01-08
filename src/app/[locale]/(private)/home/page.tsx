'use client';
import React from 'react';
import Hero from './(components)/Hero';
import CategoryStrip from './(components)/CategoryStrip';
import ProductsGrid from './(components)/ProductsGrid';
import PromoBanner from './(components)/PromoBanner';
import Testimonials from './(components)/Testimonials';
import Newsletter from './(components)/Newsletter';

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
