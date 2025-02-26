import mongoose from 'mongoose';
import { log } from './logs';
import i18next from './i18n';

const init = async function () {
  log.info({ database: i18next.t('databaseInit') });
  try {
    await mongoose
      .connect(process.env.MONGO_URI || '')
      .then(() => log.info({ database: i18next.t('databaseConn') }))
      .catch((err) => log.error({ database: err }));
  } catch (err) {
    log.error({ database: err });
  }
};

export default init();
