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
import * as history from 'connect-history-api-fallback';
// import * as i18next from 'i18next'
// import middleware from 'i18next-http-middleware'

const file = fs.readFileSync('./src/swagger/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// const HOST = '127.0.0.1';
const server = app();
const base_path = process.env.BASE_API_PATH;
log.info({
  server: i18next.t('serverInit')
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = initDB;
main();
export default async function main() {
  // i18n config
  // i18next.use(middleware.LanguageDetector).init({
  //   preload: ['en', 'pt']
  // })

  // view engine config
  // server.engine('.hbs', engine({ extname: '.hbs' }));
  // server.set('view engine', '.hbs');
  // server.set('views', path.join(__dirname, 'views'));
  // server.get('/', HomeController)

  // swagger config
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // server routes config
  server.use(bodyParser.json());
  server.use(base_path + '/users', userRouter);
  server.use(base_path + '/regions', regionRouter);
  server.use(base_path + '/search', regionLocationRouter);

  // html5 history api middleware config
  const staticFileMiddleware = app.static(__dirname);
  console.log("__dirname", __dirname);
  server.use(history({
    index: '/dist/index3.html'
  }));
  server.use(app.static("public"));
  server.use(staticFileMiddleware);
  server.listen(process.env.PORT, () => {
    log.info({
      server: i18next.t('serverHost')
    });
  });
}
