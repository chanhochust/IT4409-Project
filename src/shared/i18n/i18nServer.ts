'use server';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

async function initI18next(lang: string, ns: string | string[]) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`../../../public/locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
}

export async function getServerTranslation(
  lang: string,
  namespace?: string | string[],
  options?: { keyPrefix?: string },
) {
  const i18nextInstance = await initI18next(lang, namespace || 'translation');
  return {
    i18n: i18nextInstance,
    t: i18nextInstance.getFixedT(lang, Array.isArray(namespace) ? namespace[0] : namespace, options?.keyPrefix),
  };
}
