import axios, { AxiosResponse } from 'axios';
import { LibResponseError } from './classes/Errors';
import { DataSource } from './classes/Responses';
import { isValid } from './utils';
import { ERROR_STATUS, LOGTYPE_VALUE } from './enums';

export const getCoordinatesFromAddress = async function (
  address: string,
): Promise<LibResponseError | Array<DataSource>> {
  const params = encodeURIComponent(address);
  const config = {
    method: 'get',
    url:
      process.env.GEOAPIFY_BASE_URL +
      '/search?text=' +
      params +
      '&apiKey=' +
      process.env.GEOAPIFY_KEY,
    headers: {},
  };

  return await axios(config)
    .then(async function (response: AxiosResponse) {
      const { data } = response;
      const { features } = data;
      console.log('features', features);

      if (!isValid(features)) {
        const libErrorResponse = new LibResponseError(
          'libAddressValidation',
          ERROR_STATUS.BAD_REQUEST,
          null,
          LOGTYPE_VALUE.LIB,
        );
        return libErrorResponse;
      }

      const _features: Array<DataSource> = features.map((feature) => new DataSource(feature));

      return _features;

      // const lat = features[0].properties.lat;
      // const long = features[0].properties.lon;
      // const coordinates = new Coordinates(long, lat)

      // return coordinates;
    })
    .catch(async function (error: Error) {
      const libErrorResponse = new LibResponseError(
        null,
        ERROR_STATUS.BAD_REQUEST,
        error,
        LOGTYPE_VALUE.LIB,
      );
      return libErrorResponse;
    });
};

export const getAddressFromCoordinates = async function (
  longitude: number,
  latitude: number,
): Promise<LibResponseError | Array<DataSource>> {
  const long = longitude;
  const lat = latitude;
  const params = 'lat=' + lat + '&lon=' + long + '&format=json';

  const config = {
    method: 'get',
    url:
      process.env.GEOAPIFY_BASE_URL + '/reverse?' + params + '&apiKey=' + process.env.GEOAPIFY_KEY,
    headers: {},
  };

  return await axios(config)
    .then(async function (response: AxiosResponse) {
      const { data } = response;
      const { results } = data;

      if (!isValid(results)) {
        const libErrorResponse = new LibResponseError(
          'libCoordinatesValidation',
          ERROR_STATUS.BAD_REQUEST,
          null,
          LOGTYPE_VALUE.LIB,
        );
        return libErrorResponse;
      }

      const _results: Array<DataSource> = results.map((result) => new DataSource(result));

      return _results;

      // const { address_line1, address_line2 } = results[0];
      // const address = new Address(address_line1, address_line2)

      // return address;
    })
    .catch(async function (error) {
      const libErrorResponse = new LibResponseError(
        null,
        ERROR_STATUS.BAD_REQUEST,
        error,
        LOGTYPE_VALUE.LIB,
      );
      return libErrorResponse;
    });
};
