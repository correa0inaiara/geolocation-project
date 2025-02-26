import * as app from 'express';
import initDB from './database';
import { userRouter } from './routes/userRoutes';
import { regionRouter } from './routes/regionRoutes';
import * as bodyParser from 'body-parser';
import { regionLocationRouter } from './routes/regionLocationRoutes';
import { log } from './logs';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as YAML from 'yaml';
import i18next from './i18n';
import * as dotenvx from '@dotenvx/dotenvx';

main();

export default async function main() {
  // documentation files
  const file = fs.readFileSync('./src/swagger/swagger.yaml', 'utf8');
  const swaggerDocument = YAML.parse(file);

  // initializing server
  const server = app();
  const base_path = process.env.BASE_API_PATH;
  log.info({ server: i18next.t('serverInit') });

  // initializing database
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const database = initDB;

  // .env config
  dotenvx.config();

  // swagger config
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // server routes config
  server.use(bodyParser.json());
  server.use(base_path + '/users', userRouter);
  server.use(base_path + '/regions', regionRouter);
  server.use(base_path + '/search', regionLocationRouter);

  server.use(app.static('public'));

  server.listen(process.env.PORT, () => {
    log.info({ server: i18next.t('serverHost') });
  });
}
