import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  function changeLanguage(language: string) {
    void i18n.changeLanguage(language);
  }

  return {
    t,
    i18n,
    changeLanguage,
  };
}
