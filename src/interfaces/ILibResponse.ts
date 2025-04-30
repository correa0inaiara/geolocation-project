import { IPointCoordinate } from "./ILocation";

interface RankDetails {
  importance?: number;
  popularity?: number;
  confidence?: string;
  confidence_city_level?: string;
  confidence_street_level?: string;
  confidence_building_level?: string;
  match_type?: string;
}

interface Datasource {
  sourcename?: string;
  attribution?: string;
  license?: string;
  url?: string;
}

interface Timezone {
  name?: string;
  name_alt?: string;
  offset_STD?: string;
  offset_STD_seconds?: number;
  offset_DST?: string;
  offset_DST_seconds?: number;
  abbreviation_STD?: string;
  abbreviation_DST?: string;
}

interface ParsedQuery {
  housenumber?: string;
  street?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
  expected_type?: string;
}

interface Query {
  text?: string;
  parsed?: ParsedQuery;
}

export interface GeoResult {
  name?: string;
  country?: string;
  country_code?: string;
  state?: string;
  state_code?: string;
  county?: string;
  county_code?: string;
  postcode?: string;
  city?: string;
  street?: string;
  housenumber?: string;
  lat?: number;
  lon?: number;
  formatted?: string;
  address_line1?: string;
  address_line2?: string;
  result_type?: string;
  distance?: string;
  rank?: RankDetails;
  datasource?: Datasource;
  category?: string;
  timezone?: Timezone;
  place_id?: string;
  plus_code?: string;
  plus_code_short?: string;
}

export interface Feature {
  type?: string;
  properties?: GeoResult;
  geometry?: IPointCoordinate
  bbox?: [number, number, number, number]
}

export interface IGeocodeResponse {
  results?: GeoResult[];
  query?: Query;
}

export interface IAddressResponse {
  type?: string;
  features?: Feature[];
}