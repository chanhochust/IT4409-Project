import React from 'react';
import { cn } from 'src/shared/utils/className';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className={cn('relative overflow-hidden pt-12 lg:pt-20')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('grid grid-cols-1 items-center gap-12 lg:grid-cols-2')}>
          <div className={cn('z-10 max-w-xl')}>
            <p
              className={cn(
                'border-primary/30 bg-primary/10 text-primary mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold',
              )}>
              Minimalist Essentials
            </p>
            <h1 className={cn('text-foreground mb-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl')}>
              Elevate Everyday Living
            </h1>
            <p className={cn('text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg')}>
              Timeless pieces in a calming palette designed for clarity, comfort, and focus.
            </p>
            <div className={cn('flex flex-wrap gap-3')}>
              <Link
                className={cn(
                  'bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90',
                )}
                href='/'>
                Browse Collection
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
          <div className={cn('relative lg:h-[600px]')}>
            <div className={cn('bg-primary/10 absolute -top-20 -right-20 h-96 w-96 rounded-full blur-[100px]')} />
            <div className={cn('bg-primary/5 absolute right-0 -bottom-20 h-64 w-64 rounded-full blur-[80px]')} />
            <div
              className={cn(
                'border-border from-primary/10 via-background to-background h-80 w-full rounded-3xl border bg-gradient-to-br',
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
