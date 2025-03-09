// import express from 'express';
// import { userRouter } from '../routes/userRoutes';
// import { regionRouter } from '../routes/regionRoutes';
// import { searchRouter } from '../routes/searchRoutes';
// import cors from 'cors'
// import bodyParser from 'body-parser'
import { log } from '../logs';
import i18next from '../i18n';
// import * as middleware from 'i18next-http-middleware'
// import LanguageMiddleware from '../middleware/LanguageMiddleware';
import { HOST_TESTS, PORT_TESTS } from '../globals';
import server from '../serverConfig';

const app = server;
let test_server;

export async function startServer() {
  // initializing server
  log.info({ tests: i18next.t('testsServerInit') });

  test_server = app.listen(PORT_TESTS, HOST_TESTS, () => {
    log.info({ tests: i18next.t('testsServerHost', { host: HOST_TESTS, port: PORT_TESTS }) });
  });

  return test_server;
}

export async function closeServer(server) {
  return server.close();
}
