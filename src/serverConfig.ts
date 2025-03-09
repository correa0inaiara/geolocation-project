import app from 'express';
import cors from 'cors';
import { BASE_PATH, HOST_FRONT, PORT_FRONT } from './globals';
import { userRouter } from './routes/userRoutes';
import { regionRouter } from './routes/regionRoutes';
import { searchRouter } from './routes/searchRoutes';
import bodyParser from 'body-parser';
import LanguageMiddleware from './middleware/LanguageMiddleware';
import i18next from './i18n';
import * as middleware from 'i18next-http-middleware';
import QueryBodyMiddleware from './middleware/QueryBodyMiddleware';

// initializing server
const server = app();

// config cors
server.use(
  cors({
    origin: `${HOST_FRONT}:${PORT_FRONT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Accept-Language', 'Content-Type', 'Content-Language'],
  }),
);

// load lang enums

// config i18next middleware
server.use(middleware.handle(i18next.default));
server.use(LanguageMiddleware);
server.use(QueryBodyMiddleware);

// config json
server.use(app.json());
server.use(bodyParser.json());

// server routes config
server.use(BASE_PATH + '/users', userRouter);
server.use(BASE_PATH + '/regions', regionRouter);
server.use(BASE_PATH + '/search', searchRouter);

server.use(app.static('public'));
server.use(app.static('locales'));

export default server;
