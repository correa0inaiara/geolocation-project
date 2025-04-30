import { mongoose } from '@typegoose/typegoose';
import { isValid } from '../utils';
import { log } from '../logs';
import i18next from '../i18n';
import { DEFAULT_LANG_MESSAGE } from '../globals';

export const isUserLocationValid = function (this: mongoose.Document, coordinates: [[[number]]]) {
  let message: string = '';

  if (!isValid(coordinates)) {
    message = i18next.t('apiUserLocationCoordinatesValidation', DEFAULT_LANG_MESSAGE);
    log.error({ api: message });
    this.invalidate('coordinates', message, coordinates);
  }
};
