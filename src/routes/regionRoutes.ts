import * as server from 'express';
import { RegionModel } from '../models/regionModels';
import { STATUS } from '../enums';
import { RegionLocation } from '../models/regionLocationModel';
import { isObjectID, isValid, parseBoolean } from '../utils';
import { log } from '../logs';
import i18next from '../i18n';

export const regionRouter = server.Router();

regionRouter.get('/', async (req, res) => {
  const { page, limit} = req.query;
  let { expand } = req.query

  if (!isValid(expand)) {
    expand = 'false'
  }

  try {

    if (parseBoolean(expand)) {
      const opts = {
        path: 'user'
      }
      const [regions, total] = await Promise
        .all([RegionModel
        .find()
        .populate(opts), 
        RegionModel.count()]);

        return res.status(STATUS.OK).json({
          rows: regions,
          page,
          limit,
          total,
        });
    } else {
      const [regions, total] = await Promise
        .all([RegionModel
        .find(), 
        RegionModel.count()]);
        
        return res.status(STATUS.OK).json({
          rows: regions,
          page,
          limit,
          total,
        });
    }
  } catch (error) {
    
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({message: error});
  }
});

regionRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let { expand } = req.query;
  let region

  if (!isValid(expand)) {
    expand = 'false'
  }

  try {

    if (parseBoolean(expand)) {
      const opts = {
        path: 'user'
      }

      region = await RegionModel.findOne({ _id: id }).populate(opts)

    } else {
      region = await RegionModel.findOne({ _id: id })
    }

    if (!region) {
      const message = i18next.t('apiRegionNotFound')
      log.error({api: message})
      return res.status(STATUS.NOT_FOUND).json({ message });
    }

    return res.status(STATUS.OK).json(region);
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error }); 
  }
});

regionRouter.post('/', async (req, res) => {
  
  try {
    const { name, user, location } = req.body;

    if (!location || !location.coordinates) {
      const message = i18next.t('apiRegionLocationValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message});
    }
    
    const new_location = new RegionLocation();
    new_location.type = 'Polygon';
    new_location.coordinates = location.coordinates;

    const region = new RegionModel({
      name,
      user,
      location: new_location
    });

    await region.save();

    return res.status(STATUS.OK).json(region);
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({error: error?.errors})
  }

});

regionRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const params = req.body;
  params._id = id

  if (!params) {
    const message = i18next.t('apiRegionUpdateParametersMissing')
    log.error({api: message})
    return res.status(STATUS.BAD_REQUEST).json({message})
  }

  try {

    const region = await RegionModel.findOne({ _id: id })

    if (!region) {
      const message = i18next.t('apiRegionNotFound')
      log.error({api: message})
      return res.status(STATUS.NOT_FOUND).json({ message });
    }

    if (params.user && !isObjectID(params.user)) {
      const message = i18next.t('apiRegionUserValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message})
    }

    if (params.location && !params.location.coordinates) {
      const message = i18next.t('apiRegionLocationValidation')
      log.error({api: message})
      return res.status(STATUS.BAD_REQUEST).json({message})
    }

    region._id = params._id

    const name = params.name ? params.name : region.name
    const user = params.user ? params.user : region.user
    let location = region.location ? region.location : null

    if (params.location && params.location.coordinates) {
      const new_location = new RegionLocation();
      new_location.type = 'Polygon';
      new_location.coordinates = params.location.coordinates;
      location = new_location
    }
    
    const new_region = new RegionModel({
      name,
      user,
      location: location
    })

    await new_region.validate()
    await new_region.save();
    return res.status(STATUS.UPDATED).json(new_region)
     
  } catch (err) {
    log.error({api: err})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({error: err?.errors})
  }

});

regionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const region = await RegionModel.deleteOne({ _id: id }).lean()

      if (!region || region?.deletedCount == 0) {
        const message = i18next.t('apiRegionNotFound')
        log.error({api: message})
        return res.status(STATUS.NOT_FOUND).json({ message });
      }
      
      return res.status(STATUS.OK).json(region);
    } catch (error) {
      log.error({api: error})
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error }); 
    }
})