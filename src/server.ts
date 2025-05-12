import app from 'express';
import initDB from './database';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import { ENVIRONMENT, HOST, PORT } from './globals';
import server from './serverConfig';
import { RegisterInfoLog } from './services/logService';
import { LogType } from './enums';
import { i18n } from './i18n';

// initializing database with top-level await
await initDB();
await i18n.initialize()

const file: string = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file) as JsonObject;

// initializing server
RegisterInfoLog('server.init', LogType.SERVER)

// swagger config
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start server
server.listen(PORT, HOST, () => {
  // res.end(`Hello ${process.env.HELLO}`)
  RegisterInfoLog('server.dotenv', LogType.SERVER, { env: ENVIRONMENT })
  RegisterInfoLog('server.host', LogType.SERVER, { host: HOST, port: PORT })
});

export { server, app };
