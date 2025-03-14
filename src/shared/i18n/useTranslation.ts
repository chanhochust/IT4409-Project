import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language);
  };

  return {
    t,
    i18n,
    changeLanguage,
  };
};
