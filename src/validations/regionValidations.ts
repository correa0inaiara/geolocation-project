import { mongoose } from '@typegoose/typegoose';
import { isObjectID, isValid } from '../utils';
import { log } from '../logs';
import i18next from '../i18n';
import { DEFAULT_LANG_MESSAGE } from '../globals';

export const isRegionValid = function (
  this: mongoose.Document,
  name: string,
  user: mongoose.Types.ObjectId,
  location: mongoose.Types.ObjectId,
) {
  let message: string = '';

  if (!isValid(name)) {
    message = i18next.t('apiRegionNameRequired', DEFAULT_LANG_MESSAGE);
    log.error({ api: message });
    this.invalidate('name', message, name);
  }

  if (!isObjectID(user)) {
    message = i18next.t('apiRegionUserRequired', DEFAULT_LANG_MESSAGE);
    log.error({ api: message });
    this.invalidate('user', message, user);
  }

  if (!isObjectID(location)) {
    message = i18next.t('apiRegionLocationRequired', DEFAULT_LANG_MESSAGE);
    log.error({ api: message });
    this.invalidate('location', message, location);
  }
};
