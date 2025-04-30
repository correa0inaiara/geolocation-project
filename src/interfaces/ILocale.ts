import { LogType } from "../enums"

export interface ILocaleParams {
  [key: string]: string | number | boolean | Date
}

// export type ILocaleMessage = {
//   [key in LogType]: string;
// }

// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//   return obj[key];
// }

export type ILocaleOrigin = keyof typeof LogType;

/** Fix proposto pelo DeepSeek para resolver o retorno 'never' da biblioteca i18next */
export type FixNever<T, Fallback = string> = [T] extends [never] ? Fallback : T;
export type NeverReturn = never
export type LocaleReturnFix = FixNever<NeverReturn>

// export type LocaleReturn<K extends LogType = LogType> = {
//   [key in K]: string;
// };

export type LocaleReturn = {
  [key in ILocaleOrigin]?: LocaleReturnFix;
};