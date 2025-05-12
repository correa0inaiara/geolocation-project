import mongoose from 'mongoose';
import { log } from '../logs';
import { i18n } from '../i18n';
import * as dotenvx from '@dotenvx/dotenvx';
import { CustomError } from '../classes/Errors';
import { ERROR_STATUS } from '../enums';

export async function connectDBForTesting() {
  try {
    log.info({ tests: i18n.getTranslatedText('database.init') });

    // .env config
    dotenvx.config();
    const dbUri = process.env.MONGO_TESTING_URI;

    await mongoose
      .connect(dbUri || '')
      .then(() => {
        log.info({ tests: i18n.getTranslatedText('database.conn') })
      })
      .catch((err: unknown) => {
        log.error({ tests: err })
      });
  } catch (error) {
    const message = i18n.getTranslatedText('database.connError');
    const new_error = new CustomError(ERROR_STATUS.INTERNAL_SERVER_ERROR, message, error);
    log.error({ tests: new_error });
  }
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    const message = i18n.getTranslatedText('database.disconnError');
    const new_error = new CustomError(ERROR_STATUS.INTERNAL_SERVER_ERROR, message, error);
    log.error({ tests: new_error });
  }
}
