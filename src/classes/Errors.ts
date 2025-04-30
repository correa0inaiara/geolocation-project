import { ERROR_STATUS, LogType } from '../enums';
import { DEFAULT_LANG_MESSAGE } from '../globals';
import i18next from '../i18n';
import { IError, ResponseError, TError } from '../interfaces/IError';
import { RegisterErrorLog } from '../services/logService';
import { isValid } from '../utils';

export interface ErrorStatus {
  code: number;
  name: string;
};

/**
 * 
 * 
 * 
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

 * 
 * 
 */

export class CustomResponseError {
  type: ErrorStatus;
  message?: string | null;
  error?: unknown;

  constructor(type: ErrorStatus, message?: string | null, error?: unknown) {
    this.type = type;
    this.message = message;
    this.error = isValid(error) ? JSON.stringify(error) : null;
  }
}

export class CustomError {
  constructor(
    public key: string | null,
    public error_status: ErrorStatus,
    public error: unknown,
    public origin: LogType
  ) {}

  static defineResponseAndLog(params: IError): ResponseError {
    const message = i18next.t(params.key, DEFAULT_LANG_MESSAGE);
    const error = isValid(params.error) ? JSON.stringify(params.error) : null;

    const customResError = new CustomResponseError(params.error_status, message, error)

    RegisterErrorLog(params.origin, customResError)

    const res_error: ResponseError = {
      code: params.error_status.code,
      error: customResError
    }

    return res_error;
  }
}

export class InternalServerError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key, ERROR_STATUS.INTERNAL_SERVER_ERROR, error, LogType.API);
  }

  static defineResponseAndLog(params: TError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.error_status = ERROR_STATUS.INTERNAL_SERVER_ERROR
    super_params.origin = LogType.API
    return super.defineResponseAndLog(super_params)
  }
}

export class BadRequestError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key, ERROR_STATUS.BAD_REQUEST, error, LogType.API);
  }

  static defineResponseAndLog(params: TError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.error_status = ERROR_STATUS.BAD_REQUEST
    super_params.origin = LogType.API
    return super.defineResponseAndLog(super_params)
  }
}

export class NotAcceptableError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key, ERROR_STATUS.NOT_ACCEPTABLE, error, LogType.API);
  }

  static defineResponseAndLog(params: TError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.error_status = ERROR_STATUS.NOT_ACCEPTABLE
    super_params.origin = LogType.API
    return super.defineResponseAndLog(super_params)
  }
}

export class NotFoundError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key, ERROR_STATUS.NOT_FOUND, error, LogType.API);
  }

  static defineResponseAndLog(params: TError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.error_status = ERROR_STATUS.NOT_FOUND
    super_params.origin = LogType.API
    return super.defineResponseAndLog(super_params)
  }
}

export class LibResponseError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key, ERROR_STATUS.INTERNAL_SERVER_ERROR, error, LogType.LIB);
  }

  static defineResponseAndLog(params: TError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.error_status = ERROR_STATUS.INTERNAL_SERVER_ERROR
    super_params.origin = LogType.LIB
    return super.defineResponseAndLog(super_params)
  }
}

export class DBResponseError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key, ERROR_STATUS.INTERNAL_SERVER_ERROR, error, LogType.DATABASE);
  }

  static defineResponseAndLog(params: TError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.error_status = ERROR_STATUS.INTERNAL_SERVER_ERROR
    super_params.origin = LogType.DATABASE
    return super.defineResponseAndLog(super_params)
  }
}
