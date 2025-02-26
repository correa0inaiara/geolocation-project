import { pre, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { isUserLocationValid } from '../validations/userLocationValidation';

@pre<UserLocation>('validate', async function (next) {
  let { type } = this;
  const { coordinates } = this;

  if (!type || type != 'Point') {
    type = 'Point';
  }

  isUserLocationValid.call(this, coordinates);

  next();
})
export class UserLocation extends TimeStamps {
  @prop({ required: true, default: 'Point', type: () => String, enum: ['Point'] })
  public type: string;

  @prop({ required: true, default: undefined, type: () => [Number, Number] })
  public coordinates!: [number, number];
}
