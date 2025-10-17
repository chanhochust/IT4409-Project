'use client';

import Link from 'next/link';
import { LanguageSwitcher } from 'src/shared/components/i18n/LanguageSwitcher';
import { LocaleLink } from 'src/shared/components/i18n/LocaleLink';
import { buttonVariants } from 'src/shared/components/ui/button/AppButton';
import { useTranslation } from 'src/shared/hooks/useTranslation';
import { cn } from 'src/shared/utils/className';
export default function HomePage() {
  const { t, locale } = useTranslation();

  const { t: tLanding } = useTranslation('landing');

  return (
    <div className='container mx-auto p-8'>
      <LocaleLink href='/counter' className={cn(buttonVariants({ variant: 'default' }), 'mb-4')}>
        Example Counter with Valtio as a state management
      </LocaleLink>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Welcome to NAMTRAN'S EXERCISES LIST for INTERSHIP</h1>
        <LanguageSwitcher />
      </div>

      <div className='test flex flex-col gap-3'>
        <h2 className='mb-2 text-lg font-semibold'>Exercise Links:</h2>

        <Link href='/exercises/counter'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Counter Exercise</button>
        </Link>

        <Link href='/exercises/props'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Props Exercise</button>
        </Link>

        <Link href='/exercises/shopping-cart'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Shopping Cart Exercise</button>
        </Link>

        <Link href='/exercises/shopping-cart-redux'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            Shopping Cart Exercise(using redux)
          </button>
        </Link>

        <Link href='/exercises/data-fetch'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Data Fetch Exercise</button>
        </Link>

        <Link href='/exercises/quiz-app'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Quiz App Exercise</button>
        </Link>

        <Link href='/exercises/currency-converter'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            Currency Converter Exercise
          </button>
        </Link>

        <Link href='/exercises/image-gallery'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Image Gallery Exercise</button>
        </Link>

        <Link href='/exercises/stopwatch'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Stopwatch Exercise</button>
        </Link>
      </div>

      <div className='mt-8'>
        <Link href={`/${locale}/about`} className='text-blue-500 hover:underline'>
          Go to About Page {tLanding('landing:description')}
        </Link>
      </div>
    </div>
  );
}
