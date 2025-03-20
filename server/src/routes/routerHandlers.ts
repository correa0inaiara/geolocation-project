import { Request, Response } from 'express';
import { CustomError, ErrorStatus, UnknownError } from '../classes/Errors';
import { log } from '../logs';
import { LogType } from '../classes/Responses';

export default function handleErrorResponse(
  key: string | null,
  error_status: ErrorStatus,
  error: UnknownError,
  origin: LogType,
  req: Request,
  res: Response,
) {
  const message = req.i18n.t(key);
  const new_error = new CustomError(error_status, message, error);
  const loggerObj = {};
  loggerObj[origin] = new_error;
  log.error(loggerObj);
  return res.status(error_status.code).json(new_error);
}
