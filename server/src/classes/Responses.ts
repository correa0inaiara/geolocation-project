import { isValid } from '../utils';

export class Coordinates {
  coordinates: [number, number];

  constructor(datasource: DataSource) {
    this.coordinates[0] = datasource.lon;
    this.coordinates[1] = datasource.lat;
  }
}

export class Address {
  address: string;
  fullAddress: string;

  constructor(datasource: DataSource) {
    this.address = datasource.address1 + ' ' + datasource.address2;
    this.fullAddress = datasource.formatted;
  }
}

export class DataSource {
  lon: number;
  lat: number;
  address1: string;
  address2: string;
  formatted: string;
  city?: string;
  state?: string;
  country?: string;

  constructor(data) {
    if (data?.type == 'Feature' || isValid(data?.properties)) data = data.properties;
    this.lon = data.lon;
    this.lat = data.lat;
    this.address1 = data.address_line1;
    this.address2 = data.address_line2;
    this.formatted = data.formatted;
    this.city = data?.city;
    this.state = data?.state;
    this.country = data?.country;
  }
}

/**
 * SERVER: for messages regarding the server, specifically
 * API: for messages regarding any of the routes
 * TESTS: for messages regarding the tests
 * DATABASE: for messages regarding the database
 * LANG: for messages regarding internationalization
 * LIB: for messages regarding the geoapify api
 * OTHER: for any other generic messages
 */
export type LogType = 'SERVER' | 'API' | 'TESTS' | 'DATABASE' | 'LANG' | 'LIB' | 'OTHER';
