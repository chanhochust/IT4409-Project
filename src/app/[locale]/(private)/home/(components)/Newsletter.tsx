import React from 'react';
import { cn } from 'src/shared/utils/className';

export default function Newsletter() {
  return (
    <section className={cn('py-20 lg:py-32')}>
      <div className={cn('mx-auto max-w-3xl px-4 text-center')}>
        <h2 className={cn('text-foreground mb-4 text-3xl font-bold')}>The Tibiki Journal</h2>
        <p className={cn('text-muted-foreground mb-8')}>
          Subscribe for early access to drops, member-only discounts, and minimalist lifestyle tips.
        </p>
        <form className={cn('flex flex-col gap-3 sm:flex-row')}>
          <input
            className={cn(
              'border-border bg-background/50 text-foreground focus:border-primary flex-1 rounded-full border px-6 py-4 focus:outline-none',
            )}
            placeholder='your@email.com'
            type='email'
          />
          <button
            className={cn(
              'bg-primary text-primary-foreground rounded-full px-6 py-4 text-sm font-bold transition-opacity hover:opacity-90',
            )}
            type='button'>
            Join Now
          </button>
        </form>
        <p className={cn('text-muted-foreground mt-4 text-xs')}>
          By joining, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
