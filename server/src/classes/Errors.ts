import { isValid } from '../utils';
import { LogType } from './Responses';

export type UnknownError = Error | CustomError | object | string | null | undefined | unknown;

export type ErrorStatus = {
  code: number;
  name: string;
};

export class CustomError {
  type: ErrorStatus;
  message?: string | null;
  error?: UnknownError;

  constructor(type: ErrorStatus, message?: string | null, error?: UnknownError) {
    this.type = type;
    this.message = message;
    this.error = isValid(error) ? JSON.stringify(error) : null;
  }
}

export class LibResponseError {
  message: string | null;
  error_status: ErrorStatus;
  error: UnknownError;
  origin: LogType;

  constructor(
    message: string | null,
    error_status: ErrorStatus,
    error: UnknownError,
    origin: LogType,
  ) {
    this.message = message;
    this.error_status = error_status;
    this.error = error;
    this.origin = origin;
  }
}
