import * as server from 'express';
import { UserModel } from '../models/userModels';
import { STATUS } from '../enums';
import { UserLocation } from '../models/userLocationModel';
import { log } from '../logs';
import i18next from 'i18next';

export const userRouter = server.Router();

userRouter.get('/', async (req, res) => {
  const { page, limit } = req.query;

  try {
    const [users, total] = await Promise.all([UserModel.find().populate('location'), UserModel.count()]);
    
    return res.status(STATUS.OK).json({
      rows: users.reverse(),
      page,
      limit,
      total,
    });
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error na chamada do servidor. ' + error,
    });
  }
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ _id: id }).populate('location')

    if (!user) {
      const message = i18next.t('apiUserNotFound')
      log.error({api: message})
      return res.status(STATUS.NOT_FOUND).json({ message });
    }
    
    res.status(STATUS.OK).json(user);
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error }); 
  }

});

userRouter.post('/', async (req, res) => {
  
  try {
    const { name, email, address, location } = req.body;

    if (address && location) {
      const message = i18next.t('apiUserSchemaValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message});
    }

    if (!address && !location) {
      const message = i18next.t('apiUserSchemaValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message});
    }

    if (location && !location.coordinates) {
      const message = i18next.t('apiUserLocationValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message});
    }

    let user
    if (location) {
      const new_location = new UserLocation();
      new_location.type = 'Point';
      new_location.coordinates = location.coordinates;

      user = new UserModel({
        name,
        email,
        address: null,
        location: new_location
      });
      await user.populate('location')
    }

    if (address) {

      user = new UserModel({
        name,
        email,
        address,
        location: null
      });
    }

    await user.save();
    return res.status(STATUS.OK).json(user);

  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({error: error?.errors})
  }

});

userRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const params = req.body;
  params._id = id

  if (!params) {
    const message = i18next.t('apiUserUpdateParametersMissing')
    log.error({api: message})
    return res.status(STATUS.BAD_REQUEST).json({message})
  }

  try {

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      const message = i18next.t('apiUserNotFound')
      log.error({api: message})
      return res.status(STATUS.NOT_FOUND).json({ message });
    }

    if (params.address && params.location) {
      const message = i18next.t('apiUserSchemaValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message});
    }

    if (params.location && !params.location.coordinates) {
      const message = i18next.t('apiUserLocationValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message})
    }

    user._id = params._id

    let new_user
    const name = params.name ? params.name : user.name
    const email = params.email ? params.email : user.email
    let address = user.address ? user.address : null
    let location = user.location ? user.location : null

    if (params.location && params.location.coordinates) {
      const new_location = new UserLocation();
      new_location.type = 'Point';
      new_location.coordinates = params.location.coordinates;

      new_user = new UserModel({
        name,
        email,
        address: null,
        location: new_location
      })

      address = new_user.address
      location = new_user.location
    }

    if (params.address) {
      new_user = new UserModel({
        name,
        email,
        address: params.address,
        location: null
      })

      address = new_user.address
      location = new_user.location
    }

    new_user = new UserModel({
      name,
      email,
      address,
      location
    })

    await new_user.validate()
    await new_user.save();
    return res.status(STATUS.UPDATED).json(new_user)
    
  } catch (err) {
    log.error({api: err})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({error: err.errors ? err.errors : err})
  }

});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.deleteOne({ _id: id }).lean()

    if (!user || user?.deletedCount == 0) {
      const message = i18next.t('apiUserNotFound')
      log.error({api: message})
      return res.status(STATUS.NOT_FOUND).json({ message });
    }
    
    return res.status(STATUS.OK).json(user);
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error }); 
  }
})