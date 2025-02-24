import { mongoose } from "@typegoose/typegoose";
import { isValid } from "../utils";
import { log } from "../logs";
import i18next from "../i18n";

export const isUserLocationValid = function(this: mongoose.Document, coordinates: [[[number]]]) {
  
  let message: string = ""

  if (!isValid(coordinates)) {
    message = i18next.t('apiUserLocationCoordinatesValidation')
    log.error({api: message})
    this.invalidate('coordinates', message, coordinates)
  }
}