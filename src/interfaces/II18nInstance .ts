import { i18n, TFunction } from "i18next";

export default interface II18nInstance {
  instance: i18n;
  t: TFunction;
  isInitialized: boolean;
}