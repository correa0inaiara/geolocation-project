import 'reflect-metadata';

import * as mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { pre, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from './userModels';

import ObjectId = mongoose.Types.ObjectId;
import { isRegionValid } from '../validations/regionValidations';
import { RegionLocation } from './regionLocationModel';

@pre<Region>('validate', async function (next) {
  const { name, user, location } = this;

  isRegionValid.call(this, name, user, location);

  next();
})
class Base extends TimeStamps {
  @prop({ required: true, type: () => String, default: () => new ObjectId().toString() })
  _id: string;
}

@modelOptions({ schemaOptions: { validateBeforeSave: true } })
export class Region extends Base {
  @prop({ required: true, type: () => String })
  public name!: string;

  @prop({ required: true, ref: () => User, type: () => User })
  public user!: mongoose.Types.ObjectId;

  @prop({ required: true, type: () => RegionLocation, index: '2dsphere' })
  public location!: RegionLocation;
}

export const RegionModel = getModelForClass(Region);
