import "i18next";
import en from './../../public/locales/en/ns.json';
import pt from './../../public/locales/pt/ns.json';

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
      pt: typeof pt;
    };
  }
}