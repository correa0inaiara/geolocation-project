import { pre, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { isUserLocationValid } from '../validations/userLocationValidation';
import { Coordinates } from '../classes/Responses';

@pre<UserLocation>('validate', async function (next) {
  let { type } = this;
  const { coordinates } = this;

  if (!type || type != 'Point') {
    type = 'Point';
  }

  isUserLocationValid.call(this, coordinates);

  next();
})

// class CoordinatesReturn {
//   @prop()
//   public coordinates: [number, number] | Coordinates
// }

// let coordinates: [number, number] | Coordinates
// type coordinates = [number, number] | Coordinates
export class UserLocation extends TimeStamps {
  @prop({ required: true, default: 'Point', type: () => String, enum: ['Point'] })
  public type: string;

  @prop({ required: true, default: undefined, type: () => Coordinates })
  public coordinates!: Coordinates;
}
