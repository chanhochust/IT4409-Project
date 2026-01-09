import React from 'react';
import { cn } from 'src/shared/utils/className';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={cn('relative overflow-hidden pt-12 lg:pt-20')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('grid grid-cols-1 items-center gap-12 lg:grid-cols-2')}>
          <div className={cn('z-10 max-w-xl')}>
            <h1 className={cn('text-foreground mb-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl')}>
              Shopping Everyday Now
            </h1>
            <p className={cn('text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg')}>
              You love shopping, we love to make it easy for you. Discover a wide range of products at unbeatable
              prices. Enjoy seamless shopping experience with fast delivery and excellent customer service.
            </p>
            <div className={cn('flex flex-wrap gap-3')}>
              <Link
                className={cn(
                  'bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90',
                )}
                href='/products'>
                Buying Now
              </Link>
              <Link
                className={cn(
                  'border-border text-foreground hover:border-primary/50 rounded-full border px-6 py-3 text-sm font-bold transition-colors',
                )}
                href='/'>
                Learn More
              </Link>
            </div>
          </div>

          <div className={cn('relative flex items-center justify-center lg:h-[600px]')}>
            <div className={cn('bg-primary/10 absolute -top-10 -right-10 h-72 w-72 rounded-full blur-[100px]')} />
            <div className={cn('bg-primary/5 absolute right-0 -bottom-10 h-64 w-64 rounded-full blur-[80px]')} />
            <div
              className={cn(
                'border-border relative z-10 w-full overflow-hidden rounded-3xl border bg-white shadow-2xl transition-transform hover:scale-[1.02]',
              )}>
              <img
                src='/images/shopping.png'
                alt='Tibiki Shopping Experience'
                className={cn('h-full w-full object-cover')}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://t3.ftcdn.net/jpg/02/71/77/56/360_F_271775672_yo8ZgraN2IHGbfqP2k0PsLjwvmatUNUJ.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
