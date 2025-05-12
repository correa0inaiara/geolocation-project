import mongoose from 'mongoose';
import { log } from './logs';
import { DBResponseError } from './classes/Errors';
import { LogType } from './enums';
import { RegisterInfoLog } from './services/logService';
import { TError } from './interfaces/IError';

const init = async function () {
  RegisterInfoLog('database.init', LogType.DATABASE)

  try {
    await mongoose
      .connect(process.env.MONGO_URI ?? '')
      .then(() => {
        RegisterInfoLog('database.conn', LogType.DATABASE)
      })
      .catch((err: unknown) => {
        log.error({ database: err })
      });
  } catch (err) {
    const params: TError = {
      key: 'database.connError',
      error: err
    }
    DBResponseError.defineResponseAndLog(params)
  }
};

export default init;
