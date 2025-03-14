import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import type { InitOptions } from 'i18next';

const i18nOptions: InitOptions = {
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  backend: {
    // path where resources get loaded from
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  detection: {
    // order and from where user language should be detected
    order: ['path', 'cookie', 'navigator'],
    // lookupFromPathIndex: 0 is the default
    // cache user language in cookies
    caches: ['cookie'],
  },
};

void i18n
  // Load translations from backend
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init(i18nOptions);

export default i18n;
