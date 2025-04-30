import { CustomResponseError } from "../classes/Errors";
import { LogType } from "../enums";
import { DEFAULT_LANG_MESSAGE } from "../globals";
import i18next from "../i18n";
import { LocaleReturn, ILocaleParams } from "../interfaces/ILocale";
import { log } from "../logs";

export function RegisterInfoLog (localeKey: string, origin: LogType, params?: ILocaleParams): void {
  let info: LocaleReturn
  if (!params) {
    info = {
      [origin]: i18next.t(localeKey, DEFAULT_LANG_MESSAGE)
    }
  } else {
    info = {
      [origin]: i18next.t(localeKey, DEFAULT_LANG_MESSAGE, params)
    }
  }
  log.info(info)
}

export function RegisterErrorLog (origin: LogType, customResError: CustomResponseError): void {
  const err = {
    [origin]: customResError,
  }
  log.error(err)
}