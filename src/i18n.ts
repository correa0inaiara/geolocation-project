import i18next, { InitOptions } from 'i18next';
import en from './../locales/en';
import es from './../locales/es';
import pt from './../locales/pt';
import { LANG } from './enums';
import { DEFAULT_LANG } from './globals';
import II18nInstance from './interfaces/II18nInstance ';
import { TLangError } from './interfaces/IError';
import { InternationalizationResponseError } from './classes/Errors';

const i18nState: II18nInstance = {
  instance: i18next,
  t: i18next.t,
  isInitialized: false
}

const options: InitOptions = {
  fallbackLng: [LANG.PT, LANG.ES, LANG.EN],
  supportedLngs: [LANG.PT, LANG.ES, LANG.EN],
  preload: [LANG.PT, LANG.ES, LANG.EN],
  lng: DEFAULT_LANG,
  debug: false,
  load: 'languageOnly',
  resources: {
    en,
    es,
    pt,
  },
  detection: {
    lookupHeader: 'accept-language',
    lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
    ignoreCase: true,
  },
}

function handleError(err: unknown) {
  const params: TLangError = { error: err }
  const customError = InternationalizationResponseError.defineResponseAndLog(params)
  console.log('customError', customError)
  // return customError
}

export function initializeI18n(): II18nInstance {

  if (i18nState.isInitialized) {
    return i18nState
  }

  i18next
    .init(options)
    .then((res: unknown) => {
      console.log('res', res)
      i18nState.t = i18next.t;
      i18nState.isInitialized = true;
    })
    .catch((err: unknown) => {
      console.log('err', err)
      handleError(err)
    })

  return i18nState

}

export default {
  initialize: initializeI18n,
  getInstance: (): II18nInstance => {
    if (!i18nState.isInitialized) {
      throw new Error('i18n not initialized. Call initializeI18n() first.')
    }
    return i18nState
  }
}