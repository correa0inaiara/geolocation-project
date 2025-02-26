import axios, { AxiosResponse } from 'axios';
import { UserLocation } from './models/userLocationModel';
import { log } from './logs';
import i18next from './i18n';

export const getCoordinatesFromAddress = async function (address: string) {
  const params = encodeURIComponent(address);
  const config = {
    method: 'get',
    url:
      process.env.GEOAPIFY_BASE_URL + '/search?text=' + params + '&apiKey=' + process.env.API_KEY,
    headers: {},
  };

  return await axios(config)
    .then(async function (response: AxiosResponse) {
      const { data } = response;
      const { features } = data;

      if (features.length == 0) {
        const message = i18next.t('libAddressValidation');
        log.error({ lib: message });
        throw message;
      }

      const lat = features[0].properties.lat;
      const long = features[0].properties.lon;
      const coordinates = [long, lat];

      return coordinates;
    })
    .catch(async function (error) {
      log.error({ lib: error });
      return error;
    });
};

export const getAddressFromCoordinates = async function (location: UserLocation) {
  const long = location.coordinates[0];
  const lat = location.coordinates[1];
  const params = 'lat=' + lat + '&lon=' + long + '&format=json';

  const config = {
    method: 'get',
    url: process.env.GEOAPIFY_BASE_URL + '/reverse?' + params + '&apiKey=' + process.env.API_KEY,
    headers: {},
  };

  return await axios(config)
    .then(async function (response: AxiosResponse) {
      const { data } = response;
      const { results } = data;

      const { address_line1, address_line2 } = results[0];
      const address = address_line1 + ' ' + address_line2;
      return address;
    })
    .catch(async function (error) {
      log.error({ lib: error });
    });
};
