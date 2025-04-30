import 'reflect-metadata';

import * as mongoose from 'mongoose';
import * as typegoose from '@typegoose/typegoose'
import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './userModels';

class RegionLocation {
  @prop({
    type: String,
    enum: ['Polygon'],
    default: 'Polygon',
    required: true
  })
  public type!: string

  @prop({
    type: [Number],
    required: true
  })
  public coordinates!: [[[number, number], [number, number], [number, number], [number, number], ...[number, number][]]]
}

export class Region {
  @prop({ default: () => new mongoose.Types.ObjectId() })
  _id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, ref: () => User })
  public user!: typegoose.Ref<User>

  @prop({ required: true, _id: false })
  public location!: RegionLocation;
}

const RegionModel = getModelForClass(Region);

RegionModel.schema.index({ location: '2dsphere' });

export { RegionModel }
