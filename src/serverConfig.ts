import app from 'express';
import cors from 'cors';
import { BASE_PATH, DEFAULT_LANG_MESSAGE, FRONT_HOSTNAME } from './globals';
import { userRouter } from './routes/userRoutes';
import { regionRouter } from './routes/regionRoutes';
import { searchRouter } from './routes/searchRoutes';
import * as bodyParser from 'body-parser';
import LanguageMiddleware from './middleware/LanguageMiddleware';
import i18next from './i18n';
import QueryBodyMiddleware from './middleware/QueryBodyMiddleware';
import { NextHandleFunction } from 'connect';


// init i18next middleware
i18next.t('serverInit', DEFAULT_LANG_MESSAGE);

// initializing server
const server = app();

// config cors
server.use(
  cors({
    origin: FRONT_HOSTNAME,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Accept-Language', 'Content-Type', 'Content-Language'],
  }),
);

// config language and query body middlewares
server.use(LanguageMiddleware);
server.use(QueryBodyMiddleware);

// config json
const bodyParserJSON: NextHandleFunction = bodyParser.json()
server.use(app.json());
server.use(bodyParserJSON);

// server routes config
server.use(BASE_PATH + '/users', userRouter);
server.use(BASE_PATH + '/regions', regionRouter);
server.use(BASE_PATH + '/search', searchRouter);

server.use(app.static('public'));
server.use(app.static('locales'));

export default server;
