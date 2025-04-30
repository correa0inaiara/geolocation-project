import * as dotenvx from '@dotenvx/dotenvx';

// .env config
dotenvx.config();

// LANGS
export const DEFAULT_LANG = 'pt';
export const DEFAULT_LANG_MESSAGE = 'i18next error: key not found'

// ENV
export const ENVIRONMENT = process.env.HELLO ?? "development";
// || 'development'

// HOSTS
export const HOST = 'localhost';
export const HOST_TESTS = 'localhost';
export const HOST_FRONT = 'localhost';

// PORTS
export const PORT = 3003;
export const PORT_TESTS = 3001;
// export const PORT_FRONT = 8080 | 5173 | 4173;
export const FRONT_HOSTNAME = /^http(s)?:\/\/localhost:(8080|5173|4173)$/;

// API
export const BASE_PATH = '/api';
