import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

const i18nOptions: InitOptions = {
  fallbackLng: 'en',
  debug: false,
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
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`);
    }),
  )
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init(i18nOptions);

export default i18n;
