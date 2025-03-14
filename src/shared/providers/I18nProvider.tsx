'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/shared/i18n/i18n';

export function I18nProviderClient({
  children,
  locale,
}: {
  readonly children: React.ReactNode;
  readonly locale: string;
}) {
  useEffect(() => {
    // Change language when locale param changes
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
