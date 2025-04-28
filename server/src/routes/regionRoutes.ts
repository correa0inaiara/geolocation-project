import * as server from 'express';
import { RegionModel } from '../models/regionModels';
import { ERROR_STATUS, LOGTYPE_VALUE, STATUS } from '../enums';
import { RegionLocation } from '../models/regionLocationModel';
import { isObjectID, isValid, parseBoolean } from '../utils';
import handleErrorResponse from './routerHandlers';

export const regionRouter = server.Router();

regionRouter.get('/', async (req, res) => {
  const { page, limit } = req.query;
  let { expand } = req.query;

  if (!isValid(expand)) {
    expand = 'false';
  }

  try {
    if (parseBoolean(expand)) {
      const opts = {
        path: 'user',
      };
      const [regions, total] = await Promise.all([
        RegionModel.find().populate(opts),
        RegionModel.count(),
      ]);

      return res.status(STATUS.OK).json({
        rows: regions,
        page,
        limit,
        total,
      });
    } else {
      const [regions, total] = await Promise.all([RegionModel.find(), RegionModel.count()]);

      return res.status(STATUS.OK).json({
        rows: regions,
        page,
        limit,
        total,
      });
    }
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

regionRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let { expand } = req.query;
  let region;

  if (!isValid(expand)) {
    expand = 'false';
  }

  try {
    if (parseBoolean(expand)) {
      const opts = {
        path: 'user',
      };

      region = await RegionModel.findOne({ _id: id }).populate(opts);
    } else {
      region = await RegionModel.findOne({ _id: id });
    }

    if (!region) {
      return handleErrorResponse(
        'apiRegionNotFound',
        ERROR_STATUS.NOT_FOUND,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    return res.status(STATUS.OK).json(region);
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

regionRouter.post('/', async (req, res) => {
  try {
    const { name, user, location } = req.body;

    if (!location || !location.coordinates) {
      return handleErrorResponse(
        'apiRegionLocationValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    const new_location = new RegionLocation();
    new_location.type = 'Polygon';
    new_location.coordinates = location.coordinates;

    const region = new RegionModel({
      name,
      user,
      location: new_location,
    });

    await region.save();

    return res.status(STATUS.OK).json(region);
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

regionRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const params = req.body;
  params._id = id;

  if (!params) {
    return handleErrorResponse(
      'apiRegionUpdateParametersMissing',
      ERROR_STATUS.BAD_REQUEST,
      null,
      LOGTYPE_VALUE.API,
      req,
      res,
    );
  }

  try {
    const region = await RegionModel.findOne({ _id: id });

    if (!region) {
      return handleErrorResponse(
        'apiRegionNotFound',
        ERROR_STATUS.NOT_FOUND,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    if (params.user && !isObjectID(params.user)) {
      return handleErrorResponse(
        'apiRegionUserValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    if (params.location && !params.location.coordinates) {
      return handleErrorResponse(
        'apiRegionLocationValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    region._id = params._id;

    const name = params.name ? params.name : region.name;
    const user = params.user ? params.user : region.user;
    let location = region.location ? region.location : null;

    if (params.location && params.location.coordinates) {
      const new_location = new RegionLocation();
      new_location.type = 'Polygon';
      new_location.coordinates = params.location.coordinates;
      location = new_location;
    }

    const new_region = new RegionModel({
      name,
      user,
      location: location,
    });

    await new_region.validate();
    await new_region.save();
    return res.status(STATUS.UPDATED).json(new_region);
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

regionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const region = await RegionModel.deleteOne({ _id: id }).lean();

    if (!region || region?.deletedCount == 0) {
      return handleErrorResponse(
        'apiRegionNotFound',
        ERROR_STATUS.NOT_FOUND,
        null,
        LOGTYPE_VALUE.API,
        req,
        res,
      );
    }

    return res.status(STATUS.OK).json(region);
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
