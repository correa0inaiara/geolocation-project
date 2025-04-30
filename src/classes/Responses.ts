import { GeoResult } from '../interfaces/ILibResponse'

export class Coordinates {
  constructor(public lat?: number, public lon?: number) {}

  static fromApiResponse(data: GeoResult): Coordinates {
    return new Coordinates(
      data.lon,
      data.lat
    )
  }

  hasCoordinates(): boolean {
    return this.lon !== undefined && this.lat !== undefined
  }
}

export class Address {
  constructor(
    public address_1: string,
    public address_2: string,
  ) {}

  static fromApiResponse(data: GeoResult): Address {
    return new Address(
      data.address_line1 ?? '',
      data.address_line2 ?? ''
    )
  }

  hasAddress(): boolean {
    return this.address_1 !== '' && this.address_2 !== ''
  }
}

export class GeoLocation {
  constructor(
    public lon?: number,
    public lat?: number,
    public address1?: string,
    public address2?: string,
    public formatted?: string,
    public city?: string,
    public state?: string,
    public country?: string
  ) {}

  static fromApiResponse(data: GeoResult): GeoLocation {
    return new GeoLocation(
      data.lon,
      data.lat,
      data.address_line1,
      data.address_line2,
      data.formatted,
      data.city,
      data.state,
      data.country
    )
  }
}


// https://apidocs.geoapify.com/docs/geocoding/forward-geocoding/