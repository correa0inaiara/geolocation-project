import { Router, Request, Response } from 'express';
import { STATUS, ERROR_STATUS, LOGTYPE_VALUE } from '../enums';
import { RegionModel } from '../models/regionModels';
import { getAddressFromCoordinates, getCoordinatesFromAddress } from '../lib';
import { isValid } from '../utils';
import { LibResponseError } from '../classes/Errors';
import { PointBody, PolygonBody } from '../classes/Requests';
import { validatePointBody, validatePolygonBody } from '../validations/searchValidations';
import handleErrorResponse from './routerHandlers';

export const searchRouter = Router();

searchRouter.post('/distance', async function (req: Request, res: Response) {
  try {
    const params = req.body as PolygonBody;
    const isPolygonValid = validatePolygonBody(params);

    if (!isPolygonValid) {
      return handleErrorResponse(
        'libPolygonValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    const regions = await RegionModel.find().where('location').within().geometry(params);

    const result = !isValid(regions) ? { results: [] } : regions;

    return res.status(STATUS.OK).json(result);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LOGTYPE_VALUE.API,
      req,
      res,
    );
  }
});

searchRouter.post('/point', async function (req: Request, res: Response) {
  try {
    const params = req.body as PointBody;
    const isPointValid = validatePointBody(params);

    if (!isPointValid) {
      return handleErrorResponse(
        'libPointValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    const regions = await RegionModel.where('location').intersects().geometry(params);

    const result = !isValid(regions) ? { results: [] } : regions;

    return res.status(STATUS.OK).json(result);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LOGTYPE_VALUE.API,
      req,
      res,
    );
  }
});

// to search for coordinates from address
searchRouter.post('/coordinates', async function (req, res) {
  const { address } = req.body;

  try {
    if (!isValid(address)) {
      return handleErrorResponse(
        'libAddressValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    const resultLibCall = await getCoordinatesFromAddress(address);
    console.log('resultLibCall', resultLibCall);
    if (resultLibCall instanceof LibResponseError) {
      return handleErrorResponse(
        resultLibCall.message,
        resultLibCall.error_status,
        resultLibCall.error,
        resultLibCall.origin,
        req,
        res,
      );
    }

    return res.status(STATUS.OK).json(resultLibCall);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LOGTYPE_VALUE.API,
      req,
      res,
    );
  }
});

// to search for address from coordinates
searchRouter.post('/address', async function (req, res) {
  const { longitude, latitude } = req.body;

  try {
    if (!isValid(longitude) || !isValid(latitude)) {
      return handleErrorResponse(
        'libCoordinatesValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    const resultLibCall = await getAddressFromCoordinates(longitude, latitude);
    console.log('resultLibCall', resultLibCall);
    if (resultLibCall instanceof LibResponseError) {
      return handleErrorResponse(
        resultLibCall.message,
        resultLibCall.error_status,
        resultLibCall.error,
        resultLibCall.origin,
        req,
        res,
      );
    }

    return res.status(STATUS.OK).json(resultLibCall);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LOGTYPE_VALUE.API,
      req,
      res,
    );
  }
});
