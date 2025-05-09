import i18next, { InitOptions } from 'i18next';
import en from './../locales/en';
import es from './../locales/es';
import pt from './../locales/pt';
import { LANG } from './enums';
import { DEFAULT_LANG, DEFAULT_LANG_MESSAGE } from './globals';
import II18nInstance from './interfaces/II18nInstance ';
import { ResponseError, TLangError } from './interfaces/IError';
import { InternationalizationResponseError } from './classes/Errors';
import { ILocaleParams } from './interfaces/ILocale';

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

function handleError(err: unknown): ResponseError {
  const params: TLangError = { error: err }
  const customError = InternationalizationResponseError.defineResponseAndLog(params)
  console.log('customError', customError)
  return customError
}

async function initializeI18n(): Promise<II18nInstance | ResponseError> {

  if (i18nState.isInitialized) {
    return i18nState
  }

  const result = await i18next
    .init(options)
    .then((res: unknown) => {
      console.log('res', res)
      i18nState.t = i18next.t;
      i18nState.isInitialized = true;
      
      return i18nState
    })
    .catch((err: unknown) => {
      console.log('err', err)
      return handleError(err)
    })

  return result
}

function getInstance(): II18nInstance {
    if (!i18nState.isInitialized) {
      throw new Error('i18n not initialized. Call initializeI18n() first.')
    }
    return i18nState
  }

const i18n = {
  initialize: initializeI18n,
  getTranslatedText,
  changeLanguage
}

async function changeLanguage(lang: string) {
  const { instance } = getInstance()
  await instance.changeLanguage(lang)
}

function getTranslatedText(key: string, params?: ILocaleParams): string {
  const { t } = getInstance()
  if (params) {
    return t(key, DEFAULT_LANG_MESSAGE, params)
  }
  return t(key, DEFAULT_LANG_MESSAGE)
}

// changeLanguage

export { i18n }