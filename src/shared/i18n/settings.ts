import { AppLanguage } from 'src/shared/types/language';
export const fallbackLanguage: AppLanguage = 'en';
export const appLanguages: AppLanguage[] = [fallbackLanguage, 'vi'];
export const cookieLanguageKey = 'i18next';
export const defaultTranslationNamespace = 'translation';
export function getOptions(lang: string = fallbackLanguage, namespace: string | string[]) {
  return {
    defaultNS: defaultTranslationNamespace,
    fallbackLng: fallbackLanguage,
    fallbackNS: defaultTranslationNamespace,
    lng: lang,
    ns: namespace,
    // debug: true,
    supportedLngs: appLanguages,
    cookieName: cookieLanguageKey,
  };
}
