import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

export function LanguageSwitcher() {
  const { i18n, changeLanguage } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      className='bg-background border-input rounded-md border px-3 py-1 text-sm'>
      <option value='en'>English</option>
      <option value='fr'>Français</option>
    </select>
  );
}
