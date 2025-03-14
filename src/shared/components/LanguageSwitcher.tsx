'use client';
import React from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useTranslation } from 'src/shared/hooks/useTranslation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const { changeLanguage } = useTranslation();

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    // Navigate to the same path but with the new locale
    changeLanguage(newLocale);
    router.push(`/${newLocale}${pathWithoutLocale}`);
  }

  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      className='bg-background border-input rounded-md border px-3 py-1 text-sm'>
      <option value='en'>English</option>
      <option value='vi'>Tiếng Việt</option>
    </select>
  );
}
