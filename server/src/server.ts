import app from 'express';
import * as initDB from './database';
import { log } from './logs';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import i18next from './i18n';
import { HOST, PORT } from './globals';
import server from './serverConfig';

const file = fs.readFileSync('./swagger/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// initializing server
log.info({ server: i18next.t('serverInit') });

// initializing database
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = initDB;

// swagger config
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start server
server.listen(PORT, HOST, () => {
  log.info({ server: i18next.t('serverHost', { host: HOST, port: PORT }) });
});

export { server, app };
