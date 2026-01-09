import Link from 'next/link';
import { cn } from 'src/shared/utils/className';

type Category = {
  icon: string;
  id: string;
  label: string;
};

const CATEGORIES: Category[] = [
  { icon: '🏠', id: 'home', label: 'Living' },
  { icon: '🎧', id: 'tech', label: 'Tech' },
  { icon: '👟', id: 'style', label: 'Style' },
  { icon: '🌿', id: 'eco', label: 'Eco' },
  { icon: '🧘', id: 'wellness', label: 'Wellness' },
  { icon: '🍳', id: 'kitchen', label: 'Kitchen' },
];

export default function CategoryStrip() {
  return (
    <section className={cn('py-12 lg:py-16')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('mb-8 flex items-end justify-between')}>
          <div>
            <h2 className={cn('text-foreground text-xl font-bold')}>Shop by Category</h2>
            <p className={cn('text-muted-foreground text-sm')}>Curated picks across the Tibiki palette</p>
          </div>
          <Link className={cn('text-primary text-sm font-semibold hover:opacity-90')} href='/products'>
            View all
          </Link>
        </div>
        <div className={cn('scrollbar-hide flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:pb-0')}>
          {CATEGORIES.map((c) => (
            <div
              className={cn(
                'group border-border bg-background/60 hover:border-primary/40 flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors',
              )}
              key={c.id}>
              <span className={cn('text-lg')}>{c.icon}</span>
              <span className={cn('text-foreground text-sm font-medium')}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
