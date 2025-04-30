import app from 'express';
import * as initDB from './database';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import { ENVIRONMENT, HOST, PORT } from './globals';
import server from './serverConfig';
import { RegisterInfoLog } from './services/logService';
import { LogType } from './enums';

const file: string = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file) as JsonObject;

// initializing server
RegisterInfoLog('serverInit', LogType.SERVER)

// initializing database
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = initDB

// swagger config
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start server
server.listen(PORT, HOST, () => {
  // res.end(`Hello ${process.env.HELLO}`)
  RegisterInfoLog('dotenvxHello', LogType.SERVER, { env: ENVIRONMENT })
  RegisterInfoLog('serverHost', LogType.SERVER, { host: HOST, port: PORT })
});

export { server, app };
