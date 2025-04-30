export const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  NOT_ACCEPTABLE: 406,
  INTERNAL_SERVER_ERROR: 500,
  DEFAULT_ERROR: 418,
};

export const ERROR_STATUS = {
  BAD_REQUEST: { code: 400, name: 'Bad Request' },
  NOT_ACCEPTABLE: { code: 406, name: 'Not Acceptable' },
  NOT_FOUND: { code: 404, name: 'Not Found' },
  INTERNAL_SERVER_ERROR: { code: 500, name: 'Internal Server Error' },
};

export const LANG = {
  PT: 'pt',
  ES: 'es',
  EN: 'en',
  ALL: '*',
};

export enum LogType {
  SERVER = 'SERVER',
  API = 'API',
  TESTS = 'TESTS',
  DATABASE = 'DATABASE',
  LANG = 'LANG',
  LIB = 'LIB',
  OTHER = 'OTHER'
}