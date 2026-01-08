import React from 'react';
import { cn } from 'src/shared/utils/className';
import Link from 'next/link';
export default function PromoBanner() {
  return (
    <section className={cn('py-12 lg:py-24')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div
          className={cn(
            'border-border from-primary/15 via-background to-background relative overflow-hidden rounded-3xl border bg-gradient-to-r p-8 sm:p-16',
          )}>
          <div className={cn('mx-auto max-w-3xl text-center')}>
            <h3 className={cn('text-foreground mb-3 text-2xl font-bold sm:text-3xl')}>Become a Shop Owner</h3>
            <p className={cn('text-muted-foreground mb-6 text-sm sm:text-base')}>
              Sell your products on Tibiki and reach a wider audience. Join our community of sellers and start growing
              your business today!
            </p>
            <Link
              className={cn(
                'bg-primary text-primary-foreground inline-flex rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90',
              )}
              href='/'>
              Get Started
            </Link>
          </div>
          <div
            className={cn(
              'bg-primary/10 pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-2xl',
            )}
          />
        </div>
      </div>
    </section>
  );
}
