import { mongoose } from "@typegoose/typegoose";
import { isValid } from "../utils";
import { log } from "../logs";
import i18next from "../i18n";

export const isRegionLocationValid = function(this: mongoose.Document, coordinates: [[[number, number]]]) {

  let message: string = ""

  if (!isValid(coordinates)) {
    message = i18next.t('apiRegionLocationCoordinatesValidation')
    log.error({api: message})
    this.invalidate('coordinates', message, coordinates)
    return
  }

  for (const polygons of coordinates) {
    if (polygons.length < 4) {
      message = i18next.t('apiRegionLocationCoordinatesInvalid')
      log.error({api: message})
      this.invalidate('coordinates', message, coordinates)
      return
    }
    const size = polygons.length
    if ((polygons[0][0] != polygons[size-1][0]) ||
      (polygons[0][1] != polygons[size-1][1])
    ) {
      message = i18next.t('apiRegionLocationPolygonCoordinatesInvalid')
      log.error({api: message})
      this.invalidate('coordinates', message, coordinates)
      return
    }

    for (const polygon of polygons) {
      if (polygon.length != 2) {
        message = i18next.t('apiRegionLocationCoordinatesOrder')
        log.error({api: message})
        this.invalidate('coordinates', message, coordinates)
        return
      }

      if (typeof polygon[0] != 'number' || typeof polygon[1] != 'number') {
        message = i18next.t('apiRegionLocationCoordinatesInformation')
        log.error({api: message})
        this.invalidate('coordinates', message, coordinates)
        return
      }
    }
  }

}