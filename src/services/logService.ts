import { CustomResponseError } from "../classes/Errors";
import { LogType } from "../enums";
import { i18n } from "../i18n";
import { LocaleReturn, ILocaleParams } from "../interfaces/ILocale";
import { log } from "../logs";

export function RegisterInfoLog (localeKey: string, origin: LogType, params?: ILocaleParams): void {
  let info: LocaleReturn
  if (!params) {
    info = {
      [origin]: i18n.getTranslatedText(localeKey)
    }
  } else {
    info = {
      [origin]: i18n.getTranslatedText(localeKey, params)
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