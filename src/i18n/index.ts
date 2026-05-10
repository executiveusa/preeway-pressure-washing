import { en } from './en';
import { es } from './es';

export type Lang = 'en' | 'es';

const translations = { en, es } as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = translations[lang];
    for (const k of keys) {
      if (result === undefined || result === null) break;
      result = result[k];
    }
    if (result === undefined) {
      // fallback to en
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = translations['en'];
      for (const k of keys) {
        if (fallback === undefined || fallback === null) break;
        fallback = fallback[k];
      }
      return typeof fallback === 'string' ? fallback : key;
    }
    return typeof result === 'string' ? result : key;
  };
}

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export { en, es };
