import 'reflect-metadata';

import * as mongoose from 'mongoose';
import { getModelForClass, prop } from '@typegoose/typegoose';

class UserLocation {
  @prop({
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true
  })
  public type!: string

  @prop({
    type: [Number],
    required: true
  })
  public coordinates!: [number, number]
}

export class User {
  @prop({ default: () => new mongoose.Types.ObjectId() })
  _id!: string;

  @prop({ required: true, type: () => [String], match: /^([a-zA-Z ])*$/ })
  public name!: string;

  @prop({
    required: true,
    type: () => String,
    unique: true,
    match: /^([a-zA-Z.0-9_])*@{1}([a-zA-Z.0-9])*.{1}([a-zA-Z])*$/,
  })
  public email!: string;

  @prop({ type: () => [String] })
  public address!: string;

  @prop({ required: true, _id: false })
  public location!: UserLocation;
}

const UserModel = getModelForClass(User);

UserModel.schema.index({ location: '2dsphere' });

export { UserModel }
