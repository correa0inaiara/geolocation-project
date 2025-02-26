import { pre, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { isRegionLocationValid } from '../validations/regionLocationValidation';

@pre<RegionLocation>('validate', async function (next) {
  let { type } = this;
  const { coordinates } = this;

  if (!type || type != 'Polygon') {
    type = 'Polygon';
  }

  isRegionLocationValid.call(this, coordinates);

  next();
})
export class RegionLocation extends TimeStamps {
  @prop({ required: true, default: 'Polygon', type: () => String, enum: ['Polygon'] })
  public type: string;

  @prop({ required: true, default: undefined, type: () => [[[Number, Number]]] })
  public coordinates!: [[[number, number]]];
}
