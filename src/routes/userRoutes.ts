import { Request, Response, Router } from 'express';
import { UserModel } from '../models/userModels';
import { ERROR_STATUS, LogType, STATUS } from '../enums';
import { log } from '../logs';
import { isValid } from '../utils';
import { i18n } from '../i18n';
import handleErrorResponse from './routerHandlers';
import { DEFAULT_LANG_MESSAGE } from '../globals';

export const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
  try {
    const [users, total] = Promise.all([
      UserModel.find().populate('location').exec(),
      UserModel.count(),
    ]);

    return res.status(STATUS.OK).json({
      rows: users.reverse(),
      total,
    });
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LogType.API,
      res,
    );
  }
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id }).populate('location').exec();

    console.log('user', user);
    if (!user) {
      return handleErrorResponse(
        'apiUserNotFound',
        ERROR_STATUS.NOT_FOUND,
        null,
        LogType.API,
        req,
        res,
      );
    }

    res.status(STATUS.OK).json(user);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LogType.API,
      req,
      res,
    );
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, address, location } = req.body;

    if (isValid(address) && isValid(location)) {
      return handleErrorResponse(
        'apiUserSchemaValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LogType.API,
        req,
        res,
      );
    }

    if (!isValid(address) && !isValid(location)) {
      return handleErrorResponse(
        'apiUserSchemaValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LogType.API,
        req,
        res,
      );
    }

    if (isValid(location) && !isValid(location.coordinates)) {
      return handleErrorResponse(
        'apiUserLocationValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LogType.API,
        req,
        res,
      );
    }

    let user;
    if (isValid(location)) {
      console.log('location', location);
      const new_location = new UserLocation();
      console.log('new_location', new_location);
      new_location.type = 'Point';
      new_location.coordinates = location.coordinates;
      console.log('new_location', new_location);

      user = new UserModel({
        name,
        email,
        address: null,
        location: new_location,
      });
      console.log('user', user);

      await user.populate('location');
    }

    if (isValid(address)) {
      user = new UserModel({
        name,
        email,
        address,
        location: null,
      });
    }

    await user.save();
    return res.status(STATUS.OK).json(user);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LogType.API,
      req,
      res,
    );
  }
});

userRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const params = req.body;
  params._id = id;

  if (!params) {
    const message = i18n.getTranslatedText('apiUserUpdateParametersMissing');
    log.error({ api: message });
    return res.status(STATUS.BAD_REQUEST).json({ message });
  }

  try {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return handleErrorResponse(
        'apiUserNotFound',
        ERROR_STATUS.NOT_FOUND,
        null,
        LogType.API,
        req,
        res,
      );
    }

    if (params.address && params.location) {
      return handleErrorResponse(
        'apiUserSchemaValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LogType.API,
        req,
        res,
      );
    }

    if (params.location && !params.location.coordinates) {
      return handleErrorResponse(
        'apiUserLocationValidation',
        ERROR_STATUS.BAD_REQUEST,
        null,
        LogType.API,
        req,
        res,
      );
    }

    user._id = params._id;

    let new_user;
    const name = params.name ? params.name : user.name;
    const email = params.email ? params.email : user.email;
    let address = user.address ? user.address : null;

    if (params.location && params.location.coordinates) {
      const new_location = new UserLocation();
      new_location.type = 'Point';
      new_location.coordinates = params.location.coordinates;

      new_user = new UserModel({
        name,
        email,
        address: null,
        location: new_location,
      });

      address = new_user.address;
      location = new_user.location;
    }

    if (params.address) {
      new_user = new UserModel({
        name,
        email,
        address: params.address,
        location: null,
      });

      address = new_user.address;
      location = new_user.location;
    }

    new_user = new UserModel({
      name,
      email,
      address,
      location,
    });

    await new_user.validate();
    await new_user.save();
    return res.status(STATUS.UPDATED).json(new_user);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LogType.API,
      req,
      res,
    );
  }
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.deleteOne({ _id: id }).lean();

    if (!user || user?.deletedCount == 0) {
      return handleErrorResponse(
        'apiUserNotFound',
        ERROR_STATUS.NOT_FOUND,
        null,
        LogType.API,
        req,
        res,
      );
    }

    return res.status(STATUS.OK).json(user);
  } catch (error) {
    return handleErrorResponse(
      null,
      ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error,
      LogType.API,
      req,
      res,
    );
  }
});
