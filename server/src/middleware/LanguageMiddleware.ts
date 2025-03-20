import { Request, Response, NextFunction } from 'express';
import {
  getValidLangFromAcceptLanguage,
  isAccepLanguageValid,
  isParameterDefined,
  isValid,
} from '../utils';
import { CustomError } from '../classes/Errors';
import { ERROR_STATUS, STATUS } from '../enums';
import { log } from '../logs';
import { DEFAULT_LANG } from '../globals';

export default async function LanguageMiddleware(req: Request, res: Response, next: NextFunction) {
  /*
   Identifica se o cabeçalho accept-language está definido
   - se está
      - verifica se é um valor válido
          - se for
              - verifica se contém um ou mais dos idiomas aceitáveis
                  - se contém
                      - verifica a ordem
                          - se o primeiro for o default
                              - mantém
                          - senão
                              - troca
                  - senão (definir isso no front tbm)
                      - retorna um erro, informando que o idioma não é suportado
          - senão (definir isso no front tbm)
              - retorna um erro, informando que o cabeçalho não é válido
  - senão
      - exibe no idioma default

  */

  const acceptLanguage = req.headers['accept-language'];

  const isDefined = isParameterDefined(acceptLanguage);
  if (isDefined) {
    const isAcceptLangValid = isAccepLanguageValid(acceptLanguage);
    if (isAcceptLangValid) {
      const firstLang = getValidLangFromAcceptLanguage(acceptLanguage, req.languages);
      if (!isValid(firstLang)) {
        const message = req.i18n.t('i18nUnsupportedLangHeader');
        const new_error = new CustomError(ERROR_STATUS.NOT_ACCEPTABLE, message, null);
        log.error({ i18n: new_error });
        return res.status(STATUS.NOT_ACCEPTABLE).json(new_error);
      }

      if (firstLang != DEFAULT_LANG) {
        req.i18n.changeLanguage(firstLang);
      }
    } else {
      const message = req.i18n.t('i18nUnsupportedLangHeader');
      const new_error = new CustomError(ERROR_STATUS.NOT_ACCEPTABLE, message, null);
      log.error({ i18n: new_error });
      return res.status(STATUS.NOT_ACCEPTABLE).json(new_error);
    }
  }

  next();
}
