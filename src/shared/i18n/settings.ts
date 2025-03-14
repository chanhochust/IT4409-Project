import { AppLanguage } from 'src/shared/types/language';
export const fallbackLanguage: AppLanguage = 'en';
export const appLanguages: AppLanguage[] = [fallbackLanguage, 'vi'];
export const cookieLanguageKey = 'currentLanguage';
export const defaultTranslationNamespace = 'translation';
export function getOptions(
  lang: string = fallbackLanguage,
  namespace: string | string[] = defaultTranslationNamespace,
) {
  return {
    defaultNS: defaultTranslationNamespace,
    fallbackLng: fallbackLanguage,
    fallbackNS: namespace,
    lng: lang,
    ns: namespace,
    // debug: true,
    supportedLngs: appLanguages,
  };
}
