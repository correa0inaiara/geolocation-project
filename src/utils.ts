import { mongoose } from '@typegoose/typegoose';

export const isValid = function (param) {
  if (
    !param ||
    param == null ||
    param == undefined ||
    param == '' ||
    Object.keys(param).length == 0
  ) {
    return false;
  }
  return true;
};

export const isObjectID = function (param) {
  if (mongoose.Types.ObjectId.isValid(param)) {
    return true;
  }
  return false;
};

export const parseBoolean = function (param) {
  let paramBool = param;
  try {
    if (typeof param == 'string') {
      paramBool = param.toLowerCase();
      paramBool = JSON.parse(paramBool);
    }
    if (typeof paramBool == 'boolean') {
      return paramBool;
    } else {
      throw 'Expand query parameter needs to be true ou false';
    }
  } catch (err) {
    throw 'Expand query parameter needs to be true ou false. ' + err;
  }
};
