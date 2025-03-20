import 'reflect-metadata';

import * as mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { pre, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import ObjectId = mongoose.Types.ObjectId;
import { isUserValid } from '../validations/userValidations';
import { UserLocation } from './userLocationModel';
// import { getAddressFromCoordinates, getCoordinatesFromAddress } from '../lib';
// import { isValid } from '../utils';
// import { log } from '../logs';
// import { Error } from '../classes/Error';

@pre<User>('validate', async function (next) {
  const { address, location } = this;
  isUserValid.call(this, address, location);

  next();
})

// @pre<User>('save', async function (next) {
//   const { name, email, address, location } = this;

//   let new_user;
//   if (!location) {
//     try {
//       const coordinates = await getCoordinatesFromAddress(address);

//       if (!isValid(coordinates) || coordinates instanceof Error) {
//         console.log('coordinates', coordinates)
//         // next(coordinates)
//       } else {
//         const new_location = new UserLocation();
//         new_location.type = 'Point';
//         new_location.coordinates = coordinates;

//         new_user = new UserModel({
//           name,
//           email,
//           address,
//           location: new_location,
//         })
//       }

//     } catch (error) {
//       console.log('error', error)
//       log.error({ api: error });
//       next(error);
//     }
//   }

//   if (!isValid(address)) {
//     try {
//       const new_address = await getAddressFromCoordinates(this.location);

//       new_user = new UserModel({
//         name,
//         email,
//         address: new_address,
//         location,
//       });

//     } catch (error) {
//       log.error({ api: error });
//       next(error);
//     }
//   }

//   this.name = new_user.name;
//   this.email = new_user.email;
//   this.address = new_user.address;
//   this.location = new_user.location;

//   console.log('this.location', this.location)

//   await this.populate('location');

//   next();
// })
class Base extends TimeStamps {
  @prop({ required: true, type: () => String, default: () => new ObjectId().toString() })
  _id: string;
}

@modelOptions({ options: { customName: 'User' }, schemaOptions: { validateBeforeSave: true } })
export class User extends Base {
  @prop({ required: true, type: () => [String], match: /^([a-zA-Z ])*$/ })
  public name!: string;

  @prop({
    required: true,
    type: () => String,
    match: /^([a-zA-Z.0-9_])*@{1}([a-zA-Z.0-9])*.{1}([a-zA-Z])*$/,
  })
  public email!: string;

  @prop({ type: () => [String] })
  public address: string;

  @prop({ type: () => UserLocation })
  public location: UserLocation;
}

export const UserModel = getModelForClass(User);
