import { AxiosResponse } from "axios";
import i18next from "i18next";
import { LibResponseError } from "../classes/Errors";
import { GeoLocation, Address } from "../classes/Responses";
import { DEFAULT_LANG_MESSAGE } from "../globals";
import { IGeocodeResponse, GeoResult, IAddressResponse, Feature } from "../interfaces/ILibResponse";
import { fetchGeocodeData, sendErrorMessage, fetchAddressData } from "../lib";

export const getCoordinatesFromAddress = async function (address: string): Promise<LibResponseError | GeoLocation[]> {
  const fetchResult = await fetchGeocodeData(address)

  if (fetchResult instanceof LibResponseError) {
    return sendErrorMessage(fetchResult)
  }

  const result = fetchResult as AxiosResponse
  const data = result.data as IGeocodeResponse
  const geolocations: GeoLocation[] = []

  if (!data.results || data.results.length == 0) {
    return sendErrorMessage(null, i18next.t('lib.noResults', DEFAULT_LANG_MESSAGE))
  }

  data.results.forEach((result: GeoResult) => {
    geolocations.push(GeoLocation.fromApiResponse(result))
  })
  return geolocations
};

export const getAddressFromCoordinates = async function (longitude: number, latitude: number): Promise<LibResponseError | Address[]> {
  const fetchResult = await fetchAddressData(longitude, latitude)

  if (fetchResult instanceof LibResponseError) {
    return sendErrorMessage(fetchResult)
  }

  const result = fetchResult as AxiosResponse
  const data = result.data as IAddressResponse
  const addresses: Address[] = []

  if (!data.features || data.features.length == 0) {
    return sendErrorMessage(null, i18next.t('lib.noResults', DEFAULT_LANG_MESSAGE))
  }

  data.features.forEach((feature: Feature) => {

    if (!feature.properties) {
      return sendErrorMessage(null, i18next.t('lib.noResults', DEFAULT_LANG_MESSAGE))
    }

    const properties: GeoResult = feature.properties
    addresses.push(Address.fromApiResponse(properties))
  })
  return addresses
};
