import Link from 'next/link';
import { LanguageSwitcher } from 'src/shared/components/i18n/LanguageSwitcher';
import { getServerTranslation } from 'src/shared/i18n/i18nServer';

export default async function AboutPage({ params }: { readonly params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await getServerTranslation(locale, ['landing', 'translation']);

  return (
    <div className='container mx-auto p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>About Page</h1>
        <LanguageSwitcher />
      </div>

      <div className='rounded-lg border p-6 shadow-sm'>
        <h1>{t('landing:description')}</h1>
        <h2 className='mb-4 text-xl font-semibold'>
          {t('hello')} - {locale}
        </h2>
        <p className='mb-4'>{t('welcome')}</p>
      </div>

      <div className='mt-8'>
        <Link href={`/${locale}`} className='text-blue-500 hover:underline'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
