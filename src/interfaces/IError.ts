import { CustomResponseError, ErrorStatus } from "../classes/Errors";
import { LogType } from "../enums";

export interface IError {
  key: string,
  error_status: ErrorStatus,
  error: unknown,
  origin: LogType
}

export type TError = Omit<IError, 'error_status' | 'origin'>

export type TLangError = Omit<IError, 'error_status' | 'origin' | 'key'>

export interface ResponseError {
  code: number;
  error: CustomResponseError
}