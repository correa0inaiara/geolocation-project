import 'reflect-metadata';

import * as mongoose from 'mongoose';
import { pre, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { isUserLocationValid } from '../validations/userLocationValidation';
import ObjectId = mongoose.Types.ObjectId;

@pre<UserLocation>('validate', async function (next) {
  let { type } = this;
  const { coordinates } = this;

  if (!type || type != 'Point') {
    type = 'Point';
  }

  isUserLocationValid.call(this, coordinates);

  next();
})
class Base extends TimeStamps {
  @prop({ required: true, type: () => String, default: () => new ObjectId().toString() })
  _id: string;
}

// class CoordinatesReturn {
//   @prop()
//   public coordinates: [number, number] | Coordinates
// }

// let coordinates: [number, number] | Coordinates
// type coordinates = [number, number] | Coordinates
export class UserLocation extends Base {
  @prop({ required: true, default: 'Point', type: () => String, enum: ['Point'] })
  public type: string;

  @prop({ required: true, type: () => [Number, Number] })
  public coordinates: [number, number];
}
