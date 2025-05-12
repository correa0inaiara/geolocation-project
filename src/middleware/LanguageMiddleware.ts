import { Request, Response, NextFunction } from 'express';
import {
  getAllLanguages,
  getValidLangFromAcceptLanguage,
  isAccepLanguageValid,
  isParameterDefined,
  isValid,
} from '../utils';
import { LangMiddlewareResponseError } from '../classes/Errors';
import { i18n } from '../i18n';
import { STATUS } from '../enums';

export default function LanguageMiddleware(req: Request, res: Response, next: NextFunction) {

  const acceptLanguage = req.headers['accept-language'];
  const languages = getAllLanguages();

  const isDefined = isParameterDefined(acceptLanguage);
  if (isDefined) {
    const isAcceptLangValid = isAccepLanguageValid(acceptLanguage);
    if (isAcceptLangValid) {
      const firstLang = getValidLangFromAcceptLanguage(acceptLanguage, languages);
      if (!isValid(firstLang)) {
        const error = LangMiddlewareResponseError.defineResponseAndLog()
        return res.status(STATUS.NOT_ACCEPTABLE).json(error);
      }

      i18n.changeLanguage(firstLang)
    } else {
      const error = LangMiddlewareResponseError.defineResponseAndLog()
      return res.status(STATUS.NOT_ACCEPTABLE).json(error);
    }
  }

  next();
}
