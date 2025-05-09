import { NextFunction, Request, Response } from 'express';
import { QueryBody } from '../classes/Requests';
import { isParameterDefined, parseBoolean } from '../utils';
import { ERROR_STATUS, STATUS } from '../enums';
import { i18n } from '../i18n';
import { log } from '../logs';
import { CustomError } from '../classes/Errors';

export default function QueryBodyMiddleware(req: Request, res: Response, next: NextFunction) {
 
  const queryBody = req.query as QueryBody;
  console.log('queryBody', queryBody);

  const isDefined = isParameterDefined(queryBody.expand);
  console.log('isDefined', isDefined);
  if (isDefined) {
    const bool = parseBoolean(queryBody.expand);
    console.log('bool', bool);
    if (bool == -1) {
      const message = i18n.getTranslatedText('apiUnsupportedQueryParameter');
      const new_error = new CustomError(ERROR_STATUS.NOT_ACCEPTABLE, message, null);
      log.error({ api: new_error });
      return res.status(STATUS.NOT_ACCEPTABLE).json(new_error);
    }
  } else {
    req.query.expand = 'false';
  }

  next();
}
