import { NextFunction, Request, Response } from 'express';
import { QueryBody } from '../classes/Requests';
import { isParameterDefined, parseBoolean } from '../utils';
import { STATUS } from '../enums';
import { QueryMiddlewareResponseError } from '../classes/Errors';

export default function QueryBodyMiddleware(req: Request, res: Response, next: NextFunction) {
 
  const queryBody = req.query as QueryBody;
  console.log('queryBody', queryBody);

  const isDefined = isParameterDefined(queryBody.expand);
  console.log('isDefined', isDefined);
  if (isDefined) {
    const bool = parseBoolean(queryBody.expand);
    console.log('bool', bool);
    if (bool == -1) {
      const error = QueryMiddlewareResponseError.defineResponseAndLog()
      return res.status(STATUS.NOT_ACCEPTABLE).json(error);
    }
  } else {
    req.query.expand = 'false';
  }

  next();
}
