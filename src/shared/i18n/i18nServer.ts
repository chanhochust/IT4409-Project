'use server';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { I18nNamespaces } from 'src/shared/i18n/i18next';
import { defaultTranslationNamespace, getOptions } from './settings';

type Namespace = keyof I18nNamespaces | Array<keyof I18nNamespaces>;
async function initI18next(lang: string, namespace: Namespace) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return import(`./locales/${language}/${namespace}.json`);
      }),
    )
    .init(getOptions(lang, namespace));
  return i18nInstance;
}

export async function getServerTranslation(lang: string, namespace?: Namespace) {
  const i18nextInstance = await initI18next(lang, namespace || defaultTranslationNamespace);
  return {
    i18n: i18nextInstance,
    t: i18nextInstance.getFixedT(lang, namespace),
  };
}
