// import express from 'express';
// import { userRouter } from '../routes/userRoutes';
// import { regionRouter } from '../routes/regionRoutes';
// import { searchRouter } from '../routes/searchRoutes';
// import cors from 'cors'
// import bodyParser from 'body-parser'
import { log } from '../logs';
// import * as middleware from 'i18next-http-middleware'
// import LanguageMiddleware from '../middleware/LanguageMiddleware';
import { HOST_TESTS, PORT_TESTS } from '../globals';
import server from '../serverConfig';
import { i18n } from '../i18n';
import { Server } from 'http';

const app = server;
let test_server: Server;

export function startServer(): Server {
  // initializing server
  log.info({ tests: i18n.getTranslatedText('tests.server.init') });

  test_server = app.listen(PORT_TESTS, HOST_TESTS, () => {
    log.info({ tests: i18n.getTranslatedText('tests.server.host', { host: HOST_TESTS, port: PORT_TESTS }) });
  });

  return test_server;
}

export function closeServer(server: Server) {
  return server.close();
}
