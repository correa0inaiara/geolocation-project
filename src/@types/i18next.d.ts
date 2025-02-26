import "i18next";
import en from './../../locales/en/ns.json';
import pt from './../../locales/pt/ns.json';

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
      pt: typeof pt;
    };
  }
}