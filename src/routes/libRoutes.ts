import * as server from 'express';
import { STATUS } from '../enums';
import { IAddress, ICoordinate } from '../interfaces/ILocation';
import { getAddressFromCoordinates, getCoordinatesFromAddress } from '../services/libService';
import { LibResponseError } from '../classes/Errors';
import { Address, GeoLocation } from '../classes/Responses';

export const libRouter = server.Router();

libRouter.post('/coordinates', (req: server.Request, res: server.Response) => {
  const { address } = req.body as IAddress;
  
  try {
    const result = getCoordinatesFromAddress(address)
      .then((value: LibResponseError | GeoLocation[]) => {

        if (result instanceof LibResponseError) {
          return sendCustomError(res, value)
        }

        return res.status(STATUS.OK).json(result);

      })
      .catch((error: unknown) => {
        return sendCustomError(res, error)
      })

  } catch (error: unknown) {
    return sendCustomError(res, error)
  }

});

libRouter.post('/addresses', (req: server.Request, res: server.Response) => {
  const { longitude, latitude } = req.body as ICoordinate;
  
  try {
    const result = getAddressFromCoordinates(longitude, latitude)
      .then((value: LibResponseError | Address[]) => {

        if (result instanceof LibResponseError) {
          return sendCustomError(res, value)
        }

        return res.status(STATUS.OK).json(result);

      })
      .catch((error: unknown) => {
        return sendCustomError(res, error)
      })

  } catch (error: unknown) {
    return sendCustomError(res, error)
  }

});