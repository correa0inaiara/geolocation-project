import { Response } from 'express';
import { CustomError, ErrorStatus } from '../classes/Errors';
import { log } from '../logs';
import i18next from '../i18n';
import { LogType } from '../enums';
import { DEFAULT_LANG_MESSAGE } from '../globals';
import * as server from 'express';


export default function handleErrorResponse(
  key: string | null,
  error_status: ErrorStatus,
  error: unknown,
  origin: LogType,
  res: Response,
) {
  const message = i18next.t(key ?? '', DEFAULT_LANG_MESSAGE);
  const new_error = new CustomError(error_status, message, error);
  const loggerObj = {};
  loggerObj[origin] = new_error;
  log.error(loggerObj);
  return res.status(error_status.code).json(new_error);
}

export const sendCustomError = (res: server.Response, error: unknown, message?: string) => {
  return handleErrorResponse(
    message ?? null,
    ERROR_STATUS.INTERNAL_SERVER_ERROR,
    error ?? null,
    LogType.API,
    res,
  );
}
