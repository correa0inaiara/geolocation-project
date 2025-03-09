import { LogType } from './classes/Responses';

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

/**
 * SERVER: for messages regarding the server, specifically
 * API: for messages regarding any of the routes
 * TESTS: for messages regarding the tests
 * DATABASE: for messages regarding the database
 * LANG: for messages regarding internationalization
 * LIB: for messages regarding the geoapify api
 * OTHER: for any other generic messages
 */
export const LOGTYPE_VALUE = {
  SERVER: 'SERVER' as LogType,
  API: 'API' as LogType,
  TESTS: 'TESTS' as LogType,
  DATABASE: 'DATABASE' as LogType,
  LANG: 'LANG' as LogType,
  LIB: 'LIB' as LogType,
  OTHER: 'OTHER' as LogType,
};
