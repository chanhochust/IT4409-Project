import React from 'react';
import { cn } from 'src/shared/utils/className';

type Testimonial = {
  author: string;
  content: string;
  id: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Sarah Jenkins',
    content: 'Tibiki transformed my living space. The quality is unmatched.',
    id: 't1',
    role: 'Verified Customer',
  },
  {
    author: 'Michael Chen',
    content: 'Fast shipping and beautiful packaging. Highly recommend!',
    id: 't2',
    role: 'Tech Enthusiast',
  },
  {
    author: 'Elena Rodriguez',
    content: 'The palette is so calming. I love my Aqua Flow Bottle.',
    id: 't3',
    role: 'Daily Explorer',
  },
];

export default function Testimonials() {
  return (
    <section className={cn('border-border/60 bg-muted/10 border-y py-16 lg:py-24')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('mb-12 text-center')}>
          <h3 className={cn('text-foreground text-xl font-bold')}>What Customers Say</h3>
          <p className={cn('text-muted-foreground text-sm')}>Real voices from the Tibiki community</p>
        </div>
        <div className={cn('grid gap-8 md:grid-cols-3')}>
          {TESTIMONIALS.map((t) => (
            <div className={cn('border-border bg-background/60 rounded-2xl border p-6')} key={t.id}>
              <p className={cn('text-foreground mb-4 text-sm')}>“{t.content}”</p>
              <div className={cn('text-foreground text-sm font-semibold')}>{t.author}</div>
              <div className={cn('text-muted-foreground text-xs')}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
