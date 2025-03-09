import mongoose from 'mongoose';
import { log } from './logs';
import i18next from './i18n';
import * as dotenvx from '@dotenvx/dotenvx';
import { CustomError } from './classes/Errors';
import { ERROR_STATUS } from './enums';

const init = async function () {
  log.info({ database: i18next.t('databaseInit') });

  // .env config
  dotenvx.config();

  try {
    await mongoose
      .connect(process.env.MONGO_URI || '')
      .then(() => log.info({ database: i18next.t('databaseConn') }))
      .catch((err) => log.error({ database: err }));
  } catch (err) {
    const message = i18next.t('databaseConnError');
    const new_error = new CustomError(ERROR_STATUS.INTERNAL_SERVER_ERROR, message, err);
    log.error({ database: new_error });
  }
};

export default init();
