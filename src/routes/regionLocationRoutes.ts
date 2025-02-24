import * as server from 'express';
import { STATUS } from '../enums';
import { RegionModel } from '../models/regionModels';
import { log } from '../logs';
export const regionLocationRouter = server.Router();

regionLocationRouter.post('/distance', async function (req, res) {
  const params = req.body;

  try {
    const regions = await RegionModel
      .find()
      .where('location')
      .within()
      .geometry(params)

    return res.status(STATUS.OK).json(regions);
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error }); 
  }
})

regionLocationRouter.post('/point', async function (req, res) {
  const params = req.body;

  try {
    const regions = await RegionModel
      .where('location')
      .intersects()
      .geometry(params)

    return res.status(STATUS.OK).json(regions);
    
  } catch (error) {
    log.error({api: error})
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error }); 
  }
});