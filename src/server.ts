import app from 'express';
import * as initDB from './database';
// import { userRouter } from './routes/userRoutes';
// import { regionRouter } from './routes/regionRoutes';
// import bodyParser from 'body-parser';
// import { searchRouter } from './routes/searchRoutes';
import { log } from './logs';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import i18next from './i18n';
// import cors from 'cors'
// import * as middleware from 'i18next-http-middleware'
// import LanguageMiddleware from './middleware/LanguageMiddleware';
import { HOST, PORT } from './globals';
import server from './serverConfig';

const file = fs.readFileSync('./swagger/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// initializing server
// const server = app();
log.info({ server: i18next.t('serverInit') });

// initializing database
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = initDB;

// // config cors
// server.use(cors({
//   origin: `${HOST_FRONT}:${PORT_FRONT}`,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Accept', 'Accept-Language', 'Content-Type', 'Content-Language']
// }))

// // config i18next middleware
// server.use(middleware.handle(i18next.default))
// server.use(LanguageMiddleware)

// // config json
// server.use(app.json())
// server.use(bodyParser.json());

// swagger config
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // server routes config
// server.use(BASE_PATH + '/users', userRouter);
// server.use(BASE_PATH + '/regions', regionRouter);
// server.use(BASE_PATH + '/search', searchRouter);

// server.use(app.static('public'));
// server.use(app.static('locales'));
server.listen(PORT, HOST, () => {
  log.info({ server: i18next.t('serverHost', { host: HOST, port: PORT }) });
});

export { server, app };
