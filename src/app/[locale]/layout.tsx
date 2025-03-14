import { dir } from 'i18next';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

// Import global styles
import { clientEnvironment } from 'src/shared/environments/client';
import { I18nProviderClient } from 'src/shared/providers/I18nProvider';
import '../globals.css';
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
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className} suppressHydrationWarning={clientEnvironment.suppressHydrationWarning}>
        <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      </body>
    </html>
  );
}
