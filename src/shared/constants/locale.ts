import React from 'react';
import USFlagIcon from 'src/shared/components/ui/icons/USFlagIcon';
import VNFlagIcon from 'src/shared/components/ui/icons/VNFlagIcon';

export enum AppLanguage {
  En = 'en',
  Vn = 'vi',
}

const localeMap = {
  [AppLanguage.En]: 'en-US',
  [AppLanguage.Vn]: 'vi-VN',
} as const;

type LanguageTranslationKey = 'languages.english' | 'languages.vietnamese';
interface LanguageObject {
  icon: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
  longLabel: string;
  shortLabel: string;
  translationKey: LanguageTranslationKey;
  locale: (typeof localeMap)[keyof typeof localeMap];
  value: AppLanguage;
}

export const languageMap: Record<AppLanguage, LanguageObject> = {
  [AppLanguage.En]: {
    icon: USFlagIcon,
    longLabel: 'English',
    shortLabel: AppLanguage.En.toUpperCase(),
    translationKey: 'languages.english',
    locale: localeMap[AppLanguage.En],
    value: AppLanguage.En,
  },
  [AppLanguage.Vn]: {
    icon: VNFlagIcon,
    longLabel: 'Vietnamese',
    shortLabel: AppLanguage.Vn.toUpperCase(),
    translationKey: 'languages.vietnamese',
    locale: localeMap[AppLanguage.Vn],
    value: AppLanguage.Vn,
  },
};

export const DEFAULT_LOCALE = AppLanguage.En;
