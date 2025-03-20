import { NextFunction, Request, Response } from 'express';
import { QueryBody } from '../classes/Requests';
import { isParameterDefined, parseBoolean } from '../utils';
import { ERROR_STATUS, STATUS } from '../enums';
import i18next from '../i18n';
import { log } from '../logs';
import { CustomError } from '../classes/Errors';

export default function QueryBodyMiddleware(req: Request, res: Response, next: NextFunction) {
  /**
   * Verifica se possui parâmetros definidos na requisição
   * Se possuir
   *  - verifica se o valor é válido, no caso, boolean
   *    - se for, trás o valor correspondente
   *    - senão, exibe erro 406, query não aceito
   * Senão
   *  - segue com o valor default do parâmetro
   */

  const queryBody = req.query as QueryBody;

  const isDefined = isParameterDefined(queryBody.expand);
  if (isDefined) {
    const bool = parseBoolean(queryBody.expand);
    if (bool == -1) {
      const message = i18next.t('apiUnsupportedQueryParameter');
      const new_error = new CustomError(ERROR_STATUS.NOT_ACCEPTABLE, message, null);
      log.error({ api: new_error });
      return res.status(STATUS.NOT_ACCEPTABLE).json(new_error);
    }
  } else {
    req.query.expand = 'false';
  }

  next();
}
