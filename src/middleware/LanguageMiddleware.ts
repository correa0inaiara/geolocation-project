import { Request, Response, NextFunction } from 'express';
import {
  getAllLanguages,
  getValidLangFromAcceptLanguage,
  isAccepLanguageValid,
  isParameterDefined,
  isValid,
} from '../utils';
import { CustomError } from '../classes/Errors';
import { ERROR_STATUS, STATUS } from '../enums';
import { log } from '../logs';
import { i18n } from '../i18n';

export default async function LanguageMiddleware(req: Request, res: Response, next: NextFunction) {

  const acceptLanguage = req.headers['accept-language'];
  const languages = getAllLanguages();

  const isDefined = isParameterDefined(acceptLanguage);
  if (isDefined) {
    const isAcceptLangValid = isAccepLanguageValid(acceptLanguage);
    if (isAcceptLangValid) {
      const firstLang = getValidLangFromAcceptLanguage(acceptLanguage, languages);
      if (!isValid(firstLang)) {
        const message = i18n.getTranslatedText('i18nUnsupportedLangHeader');
        const new_error = new CustomError(ERROR_STATUS.NOT_ACCEPTABLE, message, null);
        log.error({ i18n: new_error });
        return res.status(STATUS.NOT_ACCEPTABLE).json(new_error);
      }

      await i18n.changeLanguage(firstLang)
    } else {
      const message = i18n.getTranslatedText('i18nUnsupportedLangHeader');
      const new_error = new CustomError(ERROR_STATUS.NOT_ACCEPTABLE, message, null);
      log.error({ i18n: new_error });
      return res.status(STATUS.NOT_ACCEPTABLE).json(new_error);
    }
  }

  next();
}
