'use client';
import Link from 'next/link';
import { buttonVariants } from 'src/shared/components/ui/button/AppButton';
import { cn } from 'src/shared/utils/className';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <Link href='/counter' className={cn('font-mono font-bold', buttonVariants({ variant: 'default' }))}>
          Counter screen example with Valtio
        </Link>
      </div>
    </main>
  );
}
