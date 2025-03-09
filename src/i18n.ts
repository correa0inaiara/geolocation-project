import * as i18next from 'i18next';
import en from './../locales/en';
import es from './../locales/es';
import pt from './../locales/pt';
import { log } from './logs';
import { LANG } from './enums';
import * as middleware from 'i18next-http-middleware';
import { DEFAULT_LANG } from './globals';

i18next.use(middleware.LanguageDetector).init(
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
    console.log('err i18next', err);
    if (err) {
      log.error({ i18n: err });
      return console.error(err);
    }
  },
);

// async function changeLangSetting(language) {
//   return await i18next.changeLanguage(language, (err, t) => {
//     let message
//     if (err) {
//       message = t('i18nLangChangeError', {lang: language})
//       log.error({i18n: message})
//       return false
//     }
//     message = t('i18nLangChanged', {lang: language})
//     log.info({i18n: message})
//     return true
//   });
// }

// export async function detectLangSetting (param) {
//   if (!isValid(param)) return false
//   if (typeof param != 'string') return false
//   param = param.toLowerCase()
//   if (param != LANG.EN || param != LANG.ES || param != LANG.PT) return false
//   if (param != DEFAULT_LANG) {
//     const retorno = await changeLangSetting(param)
//     console.log('retorno', retorno)
//     return -1
//   }
//   return true
// }

export default i18next;
