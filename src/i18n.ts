import * as i18next from 'i18next';
import en from './../locales/en';
import es from './../locales/es';
import pt from './../locales/pt';
import { log } from './logs';
import { LANG } from './enums';
import { DEFAULT_LANG } from './globals';

i18next.init(
  {
    fallbackLng: [LANG.PT, LANG.ES, LANG.EN],
    supportedLngs: [LANG.PT, LANG.ES, LANG.EN],
    preload: [LANG.PT, LANG.ES, LANG.EN],
    lng: DEFAULT_LANG,
    debug: false,
    load: 'languageOnly',
    resources: {
      en: en,
      es: es,
      pt: pt,
    },
    detection: {
      lookupHeader: 'accept-language',
      lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
      ignoreCase: true,
    },
  },
  (err) => {
    if (err) {
      log.error({ i18n: err });
      return false;
    }
  },
);

export default i18next;
