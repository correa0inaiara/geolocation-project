import { mongoose } from '@typegoose/typegoose';
import { LANG } from './enums';

// validate accept language header parameter
export const getValidLangFromAcceptLanguage = function (
  acceptLanguage: string | undefined | null,
  languagesArr: Array<string>,
) {
  let lng = '';

  if (acceptLanguage) {
    acceptLanguage = acceptLanguage.replaceAll(/\s*/g, '');
    const langsArr = acceptLanguage.split(';');
    const supportedLangs = [...languagesArr, LANG.ALL];

    let allLangs: string[] = [];
    for (const item of langsArr) {
      const new_arr = item.split(',');
      allLangs = allLangs.concat(new_arr);
    }
    allLangs = allLangs.filter((item) => supportedLangs.includes(item));

    // define the first language on the client's list
    if (isValid(allLangs)) {
      lng = allLangs[0];
    }
  }
  return lng;
};

export const isAccepLanguageValid = function (acceptLanguage: string | null | undefined | unknown) {
  if (!isValid(acceptLanguage)) return false;
  if (typeof acceptLanguage != 'string') return false;
  return true;
};

export const isParameterDefined = function (param: string | null | undefined | unknown) {
  const type = typeof param;
  console.log('param', param);
  if (type == null || param == undefined || param == '') return false;
  return true;
};

export const getAllLanguages = function () {
  const languages = [LANG.PT, LANG.ES, LANG.EN];
  return languages;
};

// validate coordinates
export const isCoordinate = function (param) {
  const _param = param + '';
  const regex = /^([-]?[\d]{1,3}\.{1}[\d]+)|([-]?[\d]{1,3})$/;
  const arr = regex.exec(_param);
  if (!isArray(arr)) return false;
  return true;
};

export const isLongitude = function (param) {
  if (!isValid(param)) return false;
  if (!isCoordinate(param)) return false;
  if (param < -180 || param > 180) return false;
  return true;
};

export const isLatitude = function (param) {
  if (!isValid(param)) return false;
  if (!isCoordinate(param)) return false;
  if (param < -90 || param > 90) return false;
  return true;
};

// validate model's id
export const isObjectID = function (param) {
  if (mongoose.Types.ObjectId.isValid(param)) {
    return true;
  }
  return false;
};

// validate variable types
export const isBoolean = function (param: string | null | undefined | unknown) {
  if (!isValid(param)) return false;
  if (typeof param == 'boolean') return true;
  return false;
};

export const isString = function (param: string | null | undefined | unknown) {
  if (!isValid(param)) return false;
  if (typeof param == 'string') return true;
  return false;
};

export const parseBoolean = function (param: string | null | undefined | unknown) {
  let _param = '';

  if (isBoolean(param)) return param;

  if (isString(param)) {
    _param = param as string;
    const regex = /^true|false$/i;
    const match = regex.exec(_param);
    console.log('match', match);
    if (isArray(match)) {
      const bool = JSON.parse(_param);
      return bool;
    }
    return -1;
  }
  return -1;
};

export const isValid = function (param) {
  if (
    !param ||
    param == null ||
    param == undefined ||
    param == '' ||
    JSON.stringify(param) == '{}' ||
    JSON.stringify(param) == '[]'
  ) {
    return false;
  }
  return true;
};

export const isArray = function (param) {
  if (!isValid(param)) return false;
  if (!(param instanceof Array)) return false;
  return true;
};
