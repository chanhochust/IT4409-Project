import { Menu, Search, ShoppingBag, Star, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from 'src/shared/utils/className';

type Product = {
  badge?: string;
  id: string;
  imageColor: string;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
};

type Category = {
  icon: string;
  id: string;
  label: string;
};

type Testimonial = {
  author: string;
  content: string;
  id: string;
  role: string;
};

const CATEGORIES: Category[] = [
  { icon: '🏠', id: 'home', label: 'Living' },
  { icon: '🎧', id: 'tech', label: 'Tech' },
  { icon: '👟', id: 'style', label: 'Style' },
  { icon: '🌿', id: 'eco', label: 'Eco' },
  { icon: '🧘', id: 'wellness', label: 'Wellness' },
  { icon: '🍳', id: 'kitchen', label: 'Kitchen' },
];

const PRODUCTS: Product[] = [
  { badge: 'New', id: '1', imageColor: '#09BC8A', name: 'Tibiki Echo Headphones', price: 299, rating: 4.8 },
  {
    badge: '-20%',
    id: '2',
    imageColor: '#75DDDD',
    name: 'Aqua Flow Bottle',
    originalPrice: 45,
    price: 36,
    rating: 4.5,
  },
  { id: '3', imageColor: '#508991', name: 'Pacific Desk Mat', price: 59, rating: 4.2 },
  { id: '4', imageColor: '#004346', name: 'Dark Teal Hoodie', price: 85, rating: 4.9 },
  { badge: 'Limited', id: '5', imageColor: '#172A3A', name: 'Deep Space Watch', price: 450, rating: 5.0 },
  { id: '6', imageColor: '#09BC8A', name: 'Mint Leaf Planter', price: 24, rating: 4.4 },
  { badge: 'Popular', id: '7', imageColor: '#75DDDD', name: 'Cyan Breeze Fan', price: 120, rating: 4.1 },
  { id: '8', imageColor: '#508991', name: 'Minimalist Wallet', price: 45, rating: 4.6 },
  { id: '9', imageColor: '#004346', name: 'Sleek Laptop Sleeve', price: 39, rating: 4.3 },
  { badge: 'New', id: '10', imageColor: '#172A3A', name: 'Night Sky Lamp', price: 79, rating: 4.7 },
  { id: '11', imageColor: '#09BC8A', name: 'Greenery Tote', price: 18, rating: 4.5 },
  { id: '12', imageColor: '#75DDDD', name: 'Ocean Mist Fragrance', price: 65, rating: 4.8 },
];

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

function Header() {
  return (
    <header className={cn('border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md')}>
      <div className={cn('mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8')}>
        <div className={cn('flex items-center gap-4')}>
          <button className={cn('lg:hidden')}>
            <Menu className={cn('text-muted-foreground h-6 w-6')} />
          </button>
          <Link className={cn('text-primary text-2xl font-black tracking-tighter')} href='/'>
            TIBIKI
          </Link>
        </div>
        <div className={cn('hidden max-w-md flex-1 px-8 lg:block')}>
          <div className={cn('relative')}>
            <Search className={cn('text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2')} />
            <input
              className={cn(
                'border-border bg-background/50 text-foreground focus:border-primary focus:ring-primary w-full rounded-full border py-2 pr-4 pl-10 text-sm focus:ring-1 focus:outline-none',
              )}
              placeholder='Explore Tibiki...'
              type='text'
            />
          </div>
        </div>
        <div className={cn('flex items-center gap-2 sm:gap-4')}>
          <Link className={cn('hidden sm:block')} href='/'>
            <User className={cn('text-muted-foreground hover:text-primary h-5 w-5')} />
          </Link>
          <Link className={cn('relative')} href='/'>
            <ShoppingBag className={cn('text-muted-foreground hover:text-primary h-5 w-5')} />
          </Link>
          <Link
            className={cn(
              'bg-primary text-primary-foreground hidden rounded-full px-5 py-2 text-sm font-bold transition-opacity hover:opacity-90 md:block',
            )}
            href='/'>
            Shop Now
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
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

function CategoryStrip() {
  return (
    <section className={cn('py-12 lg:py-16')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('mb-8 flex items-end justify-between')}>
          <div>
            <h2 className={cn('text-foreground text-xl font-bold')}>Shop by Category</h2>
            <p className={cn('text-muted-foreground text-sm')}>Curated picks across the Tibiki palette</p>
          </div>
          <Link className={cn('text-primary text-sm font-semibold hover:opacity-90')} href='/'>
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

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={cn(
        'group border-border bg-background/60 hover:border-primary/40 hover:shadow-primary/5 flex flex-col overflow-hidden rounded-xl border p-3 transition-all hover:shadow-xl',
      )}>
      <div className={cn('bg-muted relative mb-4 aspect-square w-full overflow-hidden rounded-lg')}>
        <div
          className={cn('h-full w-full transition-transform duration-500 group-hover:scale-110')}
          style={{ backgroundColor: product.imageColor, opacity: 0.8 }}
        />
        {product.badge && (
          <span
            className={cn(
              'bg-primary text-primary-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase',
            )}>
            {product.badge}
          </span>
        )}
      </div>
      <div className={cn('flex flex-1 flex-col')}>
        <div className={cn('mb-1 flex items-center gap-1')}>
          {[...Array(5)].map((_, i) => (
            <Star
              className={cn(
                'h-3 w-3',
                i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground',
              )}
              key={i}
            />
          ))}
          <span className={cn('text-muted-foreground ml-1 text-xs')}>{product.rating.toFixed(1)}</span>
        </div>
        <h3 className={cn('text-foreground mb-2 line-clamp-1 text-sm font-semibold')}>{product.name}</h3>
        <div className={cn('mt-auto flex items-center justify-between')}>
          <div className={cn('flex flex-col')}>
            {product.originalPrice ? (
              <div className={cn('flex items-baseline gap-2')}>
                <span className={cn('text-foreground text-sm font-semibold')}>${product.price}</span>
                <span className={cn('text-muted-foreground text-xs line-through')}>${product.originalPrice}</span>
              </div>
            ) : (
              <span className={cn('text-foreground text-sm font-semibold')}>${product.price}</span>
            )}
          </div>
          <Link
            className={cn(
              'bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95',
            )}
            href='/'>
            <ShoppingBag className={cn('h-5 w-5')} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsGrid() {
  return (
    <section className={cn('py-16')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('mb-8 flex items-end justify-between')}>
          <div>
            <h2 className={cn('text-foreground text-xl font-bold')}>Featured Products</h2>
            <p className={cn('text-muted-foreground text-sm')}>Best of the season</p>
          </div>
          <Link className={cn('text-primary text-sm font-semibold hover:opacity-90')} href='/'>
            Explore
          </Link>
        </div>
        <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className={cn('py-12 lg:py-24')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div
          className={cn(
            'border-border from-primary/15 via-background to-background relative overflow-hidden rounded-3xl border bg-gradient-to-r p-8 sm:p-16',
          )}>
          <div className={cn('mx-auto max-w-3xl text-center')}>
            <h3 className={cn('text-foreground mb-3 text-2xl font-bold sm:text-3xl')}>Refresh Your Everyday</h3>
            <p className={cn('text-muted-foreground mb-6 text-sm sm:text-base')}>
              Calm colors. Quiet confidence. Designed to last.
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

function Testimonials() {
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

function Newsletter() {
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

function Footer() {
  return (
    <footer className={cn('border-border bg-background border-t pt-16 pb-8')}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <div className={cn('grid gap-12 sm:grid-cols-2 lg:grid-cols-4')}>
          <div>
            <div className={cn('text-primary mb-3 text-xl font-black tracking-tighter')}>TIBIKI</div>
            <p className={cn('text-muted-foreground text-sm')}>Premium essentials for a calmer, brighter everyday.</p>
          </div>
          <div>
            <div className={cn('text-foreground mb-2 text-sm font-semibold')}>Shop</div>
            <ul className={cn('text-muted-foreground space-y-1 text-sm')}>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <div className={cn('text-foreground mb-2 text-sm font-semibold')}>Company</div>
            <ul className={cn('text-muted-foreground space-y-1 text-sm')}>
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <div className={cn('text-foreground mb-2 text-sm font-semibold')}>Support</div>
            <ul className={cn('text-muted-foreground space-y-1 text-sm')}>
              <li>Help Center</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
        </div>
        <div className={cn('border-border text-muted-foreground mt-16 border-t pt-8 text-center text-xs')}>
          © {new Date().getFullYear()} Tibiki Group Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className={cn('bg-background text-foreground min-h-screen')}>
      <Header />
      <main>
        <Hero />
        <CategoryStrip />
        <ProductsGrid />
        <PromoBanner />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
