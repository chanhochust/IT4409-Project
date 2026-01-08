'use client';
import { Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { cn } from 'src/shared/utils/className';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { UserMenu } from 'src/shared/components/ui/user/UserMenu';

function Header() {
  const { data: session } = useSession();

  return (
    <header className={cn('border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md')}>
      <div className={cn('mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8')}>
        <div className={cn('flex items-center gap-4')}>
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
          <Link className={cn('relative')} href='/'>
            <ShoppingBag className={cn('text-muted-foreground hover:text-primary h-5 w-5')} />
          </Link>
          {session?.user ? (
            <div className={cn('hidden sm:block')}>
              <UserMenu />
            </div>
          ) : (
            <div className={cn('hidden items-center gap-2 md:flex')}>
              <Link
                className={cn(
                  'border-border text-foreground hover:bg-muted/20 rounded-full border px-4 py-1.5 text-sm font-semibold',
                )}
                href={AppRouter.login}>
                Login
              </Link>
              <Link
                className={cn(
                  'bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-bold transition-opacity hover:opacity-90',
                )}
                href={AppRouter.register}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('bg-background text-foreground min-h-screen')}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
