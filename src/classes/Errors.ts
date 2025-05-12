import { ERROR_STATUS, LogType } from '../enums';
import { i18n } from '../i18n';
import { IError, ResponseError, TError, TLangError } from '../interfaces/IError';
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
  const message = i18n.getTranslatedText(key);
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
    public readonly key: string | null,
    public readonly error_status: ErrorStatus,
    public readonly error: unknown,
    public readonly origin: LogType
  ) {}

  static defineResponseAndLog(params: IError): ResponseError {
    let message: string = params.key

    if (params.origin != LogType.LANG)
      message = i18n.getTranslatedText(params.key);

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

export class LangResponseError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    super(key ?? 'Language Error', ERROR_STATUS.INTERNAL_SERVER_ERROR, error, LogType.LANG);
  }

  static defineResponseAndLog(params: TLangError): ResponseError {
    const super_params: IError = params as IError
    
    super_params.key = 'Language Error'
    super_params.error_status = ERROR_STATUS.INTERNAL_SERVER_ERROR
    super_params.origin = LogType.LANG
    return super.defineResponseAndLog(super_params)
  }
}

export class LangMiddlewareChangeLangResponseError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    const _key = i18n.getTranslatedText('i18n.langChangedError');
    super(_key, ERROR_STATUS.INTERNAL_SERVER_ERROR, null, LogType.API);
  }

  static defineResponseAndLog(): ResponseError {
    const super_params: IError = {
      error: null,
      key: i18n.getTranslatedText('i18n.langChangedError'),
      error_status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
      origin: LogType.API
    }
    return super.defineResponseAndLog(super_params)
  }
}


export class LangMiddlewareResponseError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    const _key = i18n.getTranslatedText('api.headers.unsupportedLang');
    super(_key, ERROR_STATUS.NOT_ACCEPTABLE, null, LogType.API);
  }

  static defineResponseAndLog(): ResponseError {
    const super_params: IError = {
      error: null,
      key: i18n.getTranslatedText('api.headers.unsupportedLang'),
      error_status: ERROR_STATUS.NOT_ACCEPTABLE,
      origin: LogType.API
    }
    return super.defineResponseAndLog(super_params)
  }
}


export class QueryMiddlewareResponseError extends CustomError {
  constructor(
    public key: string | null,
    public error: unknown
  ) {
    const _key = i18n.getTranslatedText('api.query.unsupported');
    super(_key, ERROR_STATUS.NOT_ACCEPTABLE, null, LogType.API);
  }

  static defineResponseAndLog(): ResponseError {
    const super_params: IError = {
      error: null,
      key: i18n.getTranslatedText('api.query.unsupported'),
      error_status: ERROR_STATUS.NOT_ACCEPTABLE,
      origin: LogType.API
    }
    return super.defineResponseAndLog(super_params)
  }
}
