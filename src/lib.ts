import axios, { AxiosResponse } from 'axios';
import { LibResponseError } from './classes/Errors';
import { IAddressResponse, IGeocodeResponse } from './interfaces/ILibResponse';

export function sendErrorMessage(error?: unknown, message?: string): LibResponseError {
  return new LibResponseError(
    message ?? null,
    error ?? null
  ) 
}

export async function fetchGeocodeData(address: string): Promise<LibResponseError | IGeocodeResponse> {
  const params = encodeURIComponent(address);
  const config = {
    method: 'get',
    url: `${process.env.GEOAPIFY_BASE_URL ?? ''}/search?text=${params}&apiKey=${process.env.GEOAPIFY_KEY ?? ''}`,
    headers: {},
  };

  return await axios(config)
  .then((response: AxiosResponse): IGeocodeResponse => {
    return response.data as IGeocodeResponse
  })
  .catch((error: unknown): LibResponseError => {
    return sendErrorMessage(error)
  });
}

export async function fetchAddressData(longitude: number, latitude: number): Promise<LibResponseError | IAddressResponse> {
  const long = encodeURIComponent(longitude);
  const lat = encodeURIComponent(latitude);
  const params = `lat=${lat}&lon=${long}&format=json`;

  const config = {
    method: 'get',
    url: `${process.env.GEOAPIFY_BASE_URL ?? ''}/reverse?${params}&apiKey=${process.env.GEOAPIFY_KEY ?? ''}`,
    headers: {},
  };

  return await axios(config)
  .then((response: AxiosResponse): IAddressResponse => {
    return response.data as IAddressResponse
  })
  .catch((error: unknown): LibResponseError => {
    return sendErrorMessage(error)
  });
}
