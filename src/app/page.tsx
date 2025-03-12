import { AppButton, buttonVariants } from 'src/shared/components/button/AppButton';
import { cn } from 'src/shared/utils/className';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <a className={cn('font-mono font-bold', buttonVariants({ variant: 'default' }))} href='/counter'>
          Counter screen example with Jotai
        </a>
      </div>
    </main>
  );
}
