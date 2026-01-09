'use client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CartIconButton } from 'src/shared/components/cart/CartIconButton';
import { MobileUserMenu } from 'src/shared/components/ui/user/MobileUserMenu';
import { UserMenu } from 'src/shared/components/ui/user/UserMenu';
import { AppRouter } from 'src/shared/constants/appRouter.constant';
import { cn } from 'src/shared/utils/className';

function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const returnTo = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`;
  const loginUrl = `${AppRouter.login}?returnTo=${encodeURIComponent(returnTo)}`;
  const registerUrl = `${AppRouter.register}?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <header className='border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {session?.user && <MobileUserMenu />}
        <div className='hidden max-w-md flex-1 px-8 lg:block'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <input
              className='border-border bg-background/50 text-foreground focus:border-primary focus:ring-primary w-full rounded-full border py-2 pr-4 pl-10 text-sm focus:ring-1 focus:outline-none'
              placeholder='Explore Tibiki...'
              type='text'
            />
          </div>
        </div>
        <div
          className={cn('flex w-full items-center gap-2 sm:gap-4', session?.user ? 'justify-end' : 'justify-between')}>
          <Link className='text-primary text-2xl font-black tracking-tighter' href='/'>
            TIBIKI
          </Link>
          <CartIconButton />
          {session?.user ? (
            <div className='hidden sm:block'>
              <UserMenu />
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link
                className={cn(
                  'border-border text-foreground hover:bg-muted/20 rounded-full border px-4 py-1.5 text-sm font-semibold',
                )}
                href={loginUrl}>
                Login
              </Link>
              <Link
                className={cn(
                  'bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-bold transition-opacity hover:opacity-90',
                )}
                href={registerUrl}>
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
    <footer className='border-border bg-background border-t pt-16 pb-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <div className='text-primary mb-3 text-xl font-black tracking-tighter'>TIBIKI</div>
            <p className='text-muted-foreground text-sm'>Premium essentials for a calmer, brighter everyday.</p>
          </div>
          <div>
            <div className='text-foreground mb-2 text-sm font-semibold'>Shop</div>
            <ul className='text-muted-foreground space-y-1 text-sm'>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <div className='text-foreground mb-2 text-sm font-semibold'>Company</div>
            <ul className='text-muted-foreground space-y-1 text-sm'>
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <div className='text-foreground mb-2 text-sm font-semibold'>Support</div>
            <ul className='text-muted-foreground space-y-1 text-sm'>
              <li>Help Center</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
        </div>
        <div className='border-border text-muted-foreground mt-16 border-t pt-8 text-center text-xs'>
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
