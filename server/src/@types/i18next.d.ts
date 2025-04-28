import 'i18next';
import en from './../../locales/en';
import es from './../../locales/es';
import pt from './../../locales/pt';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
      es: typeof es;
      pt: typeof pt;
    };
  }
  interface i18n {
    languages: readonly string[];
  }
}
