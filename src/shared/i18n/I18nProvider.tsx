'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

interface I18nProviderProps {
  readonly children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure i18n is initialized
    if (i18n.isInitialized) {
      setIsInitialized(true);
      return;
    }

    const handleInitialized = () => {
      setIsInitialized(true);
    };

    i18n.on('initialized', handleInitialized);

    return () => {
      i18n.off('initialized', handleInitialized);
    };
  }, []);

  if (!isInitialized) {
    // You could show a loading indicator here
    return children;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
