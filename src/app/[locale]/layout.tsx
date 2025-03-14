import React, { use } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dir } from 'i18next';

// Import global styles
import '../globals.css';
import { I18nProviderClient } from 'src/shared/providers/I18nProvider';
import { clientEnvironment } from 'src/shared/environments/client';
import { initReactI18next } from 'react-i18next/initReactI18next'
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js i18n App',
  description: 'Next.js app with i18n support',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning={clientEnvironment.suppressHydrationWarning}>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      </body>
    </html>
  );
}
