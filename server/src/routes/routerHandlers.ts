import { Request, Response } from 'express';
import { CustomError, ErrorStatus, UnknownError } from '../classes/Errors';
import { log } from '../logs';
import { LogType } from '../classes/Responses';
import i18next from '../i18n';

export default function handleErrorResponse(
  key: string | null,
  error_status: ErrorStatus,
  error: UnknownError,
  origin: LogType,
  req: Request,
  res: Response,
) {
  const message = i18next.t(key);
  const new_error = new CustomError(error_status, message, error);
  const loggerObj = {};
  loggerObj[origin] = new_error;
  log.error(loggerObj);
  return res.status(error_status.code).json(new_error);
}
